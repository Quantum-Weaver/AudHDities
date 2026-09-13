// app/api/auth/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe } from '@/lib/stripe/server';
import {
  recurrenceOf,
  stripePriceIdOf,
  supportEndsAtOf,
  supportHasEnded,
} from '@/lib/economics/recurrence';
import type { User } from '@supabase/supabase-js';

interface CheckoutRequest {
  wareId?: string;
  workId?: string;
  productId?: string; // legacy alias, accepted for older callers
  quantity?: number;
  amount?: number; // pay_what_you_want offers
}

const PLATFORM_FEE_PERCENT = 10;

type Supabase = Awaited<ReturnType<typeof createServerSupabase>>;

/** One shape for the two things the Exchange can carry across. */
interface Subject {
  kind: 'ware' | 'work';
  id: string;
  name: string;
  description: string | null;
  coverUrl: string | null;
  currency: string;
  price: number | null;
  pricingModel: string;
  residualPoolPercent: number | null;
  quantityAvailable: number | null;
  billingInterval: string | null;
  stripePriceId: string | null;
  supportEndsAt: string | null;
}

/** calculate_sovereign_price returns Json — extract a price defensively. */
function extractPrice(result: unknown, fallback: number): { amount: number; detail: unknown } {
  if (typeof result === 'number' && result > 0) return { amount: result, detail: result };
  if (result && typeof result === 'object') {
    const r = result as Record<string, unknown>;
    for (const key of ['final_price', 'price', 'amount', 'final_amount']) {
      const v = r[key];
      if (typeof v === 'number' && v > 0) return { amount: v, detail: result };
    }
  }
  return { amount: fallback, detail: result ?? null };
}

/** The vessel's own Stripe Customer, read from user_financial or opened once and stored. */
async function customerIdFor(supabase: Supabase, user: User): Promise<string> {
  const { data: row } = await supabase
    .from('user_financial')
    .select('id, stripe_customer_id')
    .eq('created_by', user.id)
    .maybeSingle();

  if (row?.stripe_customer_id) return row.stripe_customer_id;

  const customer = await getStripe().customers.create({
    email: user.email ?? undefined,
    metadata: { user_id: user.id },
  });

  if (row) {
    await supabase
      .from('user_financial')
      .update({ stripe_customer_id: customer.id })
      .eq('id', row.id);
  } else {
    await supabase
      .from('user_financial')
      .insert({ id: crypto.randomUUID(), created_by: user.id, stripe_customer_id: customer.id });
  }

  return customer.id;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body: CheckoutRequest = await request.json();
    const wareId = body.wareId || body.productId;
    const workId = body.workId;
    const quantity = body.quantity ?? 1;

    if (!wareId && !workId) {
      return NextResponse.json({ error: 'Ware ID required' }, { status: 400 });
    }

    let subject: Subject;

    if (wareId) {
      const { data: ware, error: wareError } = await supabase
        .from('wares')
        .select('*')
        .eq('id', wareId)
        .eq('status', 'published')
        .single();

      if (wareError || !ware) {
        return NextResponse.json({ error: 'Ware not found or unavailable' }, { status: 404 });
      }

      subject = {
        kind: 'ware',
        id: ware.id,
        name: ware.name,
        description: ware.description,
        coverUrl: ware.cover_url,
        currency: ware.currency || 'usd',
        price: ware.price,
        pricingModel: ware.pricing_model,
        residualPoolPercent: ware.residual_pool_percent,
        quantityAvailable: ware.quantity_available,
        billingInterval: ware.billing_interval,
        stripePriceId: ware.stripe_price_id,
        supportEndsAt: supportEndsAtOf(ware),
      };
    } else {
      const { data: work, error: workError } = await supabase
        .from('works')
        .select('*')
        .eq('id', workId as string)
        .eq('status', 'published')
        .single();

      if (workError || !work) {
        return NextResponse.json({ error: 'Work not found or unavailable' }, { status: 404 });
      }

      subject = {
        kind: 'work',
        id: work.id,
        name: work.name,
        description: work.description,
        coverUrl: work.cover_url,
        currency: work.currency || 'usd',
        price: work.price,
        pricingModel: work.pricing_model,
        residualPoolPercent: work.residual_pool_percent,
        quantityAvailable: null,
        billingInterval: null,
        stripePriceId: null,
        supportEndsAt: null,
      };
    }

    const thing = subject.kind === 'ware' ? 'ware' : 'work';

    if (subject.pricingModel === 'free') {
      return NextResponse.json({ error: `This ${thing} is free — no checkout needed` }, { status: 400 });
    }
    if (subject.pricingModel === 'patronage_only') {
      return NextResponse.json({ error: `This ${thing} is available through patronage` }, { status: 400 });
    }
    if (subject.quantityAvailable !== null && subject.quantityAvailable <= 0) {
      return NextResponse.json({ error: 'This ware is sold out' }, { status: 400 });
    }

    let baseAmount = subject.price ?? 0;
    if (subject.pricingModel === 'pay_what_you_want' && typeof body.amount === 'number') {
      baseAmount = Math.max(body.amount, subject.price ?? 0);
    }
    if (!baseAmount || baseAmount <= 0) {
      return NextResponse.json({ error: `This ${thing} is not for sale` }, { status: 400 });
    }

    const { data: priceResult, error: priceError } = await supabase.rpc('calculate_sovereign_price', {
      p_base_price: baseAmount,
      p_user_id: user.id,
    });
    if (priceError) {
      console.error('calculate_sovereign_price failed; using base price:', priceError);
    }
    const { amount: finalAmount, detail: priceDetail } = extractPrice(priceResult, baseAmount);

    const grossAmount = finalAmount * quantity;
    const netAmount = grossAmount * (1 - PLATFORM_FEE_PERCENT / 100);

    const { data: exchange, error: exchangeError } = await supabase
      .from('exchanges')
      .insert({
        buyer_id: user.id,
        ware_id: subject.kind === 'ware' ? subject.id : null,
        work_id: subject.kind === 'work' ? subject.id : null,
        gross_amount: grossAmount,
        net_amount: netAmount,
        currency: subject.currency,
        platform_fee_percent: PLATFORM_FEE_PERCENT,
        adjustments: (priceDetail ?? null) as never,
        status: 'pending',
      })
      .select()
      .single();

    if (exchangeError || !exchange) {
      console.error('Error creating exchange record:', exchangeError);
      return NextResponse.json({ error: 'Failed to create exchange record' }, { status: 500 });
    }

    const carried: Record<string, string> = {
      subjectKind: subject.kind,
      subjectId: subject.id,
      userId: user.id,
      exchangeId: exchange.id,
      subjectName: subject.name,
      // This one's own pledge, 0 when it has none (the standing default).
      residualPoolPercent: subject.residualPoolPercent?.toString() ?? '0',
    };
    if (subject.kind === 'ware') carried.wareId = subject.id;
    if (subject.kind === 'work') carried.workId = subject.id;

    // Both session modes share these fields; the customer is read from user_financial or opened at Stripe.
    const common = {
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/bazaar/checkout/success?session_id={CHECKOUT_SESSION_ID}&exchange_id=${exchange.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/bazaar/checkout/cancel`,
      metadata: carried,
      client_reference_id: user.id,
      customer: await customerIdFor(supabase, user),
    };

    const recurrence = recurrenceOf({
      billing_interval: subject.billingInterval,
      stripe_price_id: subject.stripePriceId,
      support_ends_at: subject.supportEndsAt,
    });
    let session;
    if (recurrence) {
      const priceId = stripePriceIdOf({
        billing_interval: subject.billingInterval,
        stripe_price_id: subject.stripePriceId,
      });
      if (!priceId) {
        return NextResponse.json(
          { error: 'This rung has no Stripe price behind it yet.' },
          { status: 409 },
        );
      }
      if (supportHasEnded(recurrence, Math.floor(Date.now() / 1000))) {
        return NextResponse.json(
          { error: `This rung's standing support ended on ${recurrence.endsAt}.` },
          { status: 409 },
        );
      }
      // Carries the end on the subscription's metadata as supportEndsAt and cancelAt.
      const carriedWithEnd = recurrence.endsAt
        ? { ...carried, supportEndsAt: recurrence.endsAt, cancelAt: String(recurrence.cancelAt) }
        : carried;
      session = await getStripe().checkout.sessions.create({
        ...common,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        subscription_data: { metadata: carriedWithEnd },
      });
    } else {
      session = await getStripe().checkout.sessions.create({
        ...common,
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: subject.currency,
            product_data: {
              name: subject.name,
              description: subject.description || undefined,
              images: subject.coverUrl ? [subject.coverUrl] : undefined,
            },
            unit_amount: Math.round(finalAmount * 100),
          },
          quantity,
        }],
        mode: 'payment',
      });
    }

    await supabase
      .from('exchanges')
      .update({ stripe_session_id: session.id })
      .eq('id', exchange.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      exchangeId: exchange.id,
      plateAmount: baseAmount,
      chargedAmount: finalAmount,
      residualPoolPercent: subject.residualPoolPercent ?? 0,
      recurring: Boolean(recurrence),
      supportEndsAt: recurrence?.endsAt ?? null,
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

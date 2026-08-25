// app/api/auth/checkout/route.ts
// Rewritten 2026-07-18 for the evolved commerce schema: products/sales
// became wares/exchanges, and tiered pricing (community/ally/corporate +
// bigot tax) became the calculate_sovereign_price database function — the
// kindness is enforced in the schema now, not re-derived per client. The
// checkout inserts ONE pending exchange; the Stripe webhook completes that
// same row by session id (the old flow double-inserted).
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe } from '@/lib/stripe/server';

interface CheckoutRequest {
  wareId?: string;
  productId?: string; // legacy alias, accepted for older callers
  quantity?: number;
  amount?: number; // pay_what_you_want offers
}

const PLATFORM_FEE_PERCENT = 10;

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

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body: CheckoutRequest = await request.json();
    const wareId = body.wareId || body.productId;
    const quantity = body.quantity ?? 1;

    if (!wareId) {
      return NextResponse.json({ error: 'Ware ID required' }, { status: 400 });
    }

    const { data: ware, error: wareError } = await supabase
      .from('wares')
      .select('*')
      .eq('id', wareId)
      .eq('status', 'published')
      .single();

    if (wareError || !ware) {
      return NextResponse.json({ error: 'Ware not found or unavailable' }, { status: 404 });
    }

    if (ware.pricing_model === 'free') {
      return NextResponse.json({ error: 'This ware is free — no checkout needed' }, { status: 400 });
    }
    if (ware.pricing_model === 'patronage_only') {
      return NextResponse.json({ error: 'This ware is available through patronage' }, { status: 400 });
    }
    if (ware.quantity_available !== null && ware.quantity_available <= 0) {
      return NextResponse.json({ error: 'This ware is sold out' }, { status: 400 });
    }

    let baseAmount = ware.price ?? 0;
    if (ware.pricing_model === 'pay_what_you_want' && typeof body.amount === 'number') {
      baseAmount = Math.max(body.amount, ware.price ?? 0);
    }
    if (!baseAmount || baseAmount <= 0) {
      return NextResponse.json({ error: 'Ware has no valid price' }, { status: 400 });
    }

    // The sovereign price: solidarity adjustments computed by the database,
    // with the raw result preserved on the exchange as provenance.
    const { data: priceResult, error: priceError } = await supabase.rpc('calculate_sovereign_price', {
      p_base_price: baseAmount,
      p_user_id: user.id,
    });
    if (priceError) {
      console.error('calculate_sovereign_price failed; using base price:', priceError);
    }
    const { amount: finalAmount, detail: priceDetail } = extractPrice(priceResult, baseAmount);

    const amountInCents = Math.round(finalAmount * quantity * 100);
    const grossAmount = finalAmount * quantity;
    const netAmount = grossAmount * (1 - PLATFORM_FEE_PERCENT / 100);

    const { data: exchange, error: exchangeError } = await supabase
      .from('exchanges')
      .insert({
        buyer_id: user.id,
        ware_id: ware.id,
        gross_amount: grossAmount,
        net_amount: netAmount,
        currency: ware.currency || 'usd',
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

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: ware.currency || 'usd',
          product_data: {
            name: ware.name,
            description: ware.description || undefined,
            images: ware.cover_url ? [ware.cover_url] : undefined,
          },
          unit_amount: Math.round(finalAmount * 100),
        },
        quantity,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/bazaar/checkout/success?session_id={CHECKOUT_SESSION_ID}&exchange_id=${exchange.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/bazaar/checkout/cancel`,
      metadata: {
        wareId: ware.id,
        userId: user.id,
        exchangeId: exchange.id,
        wareName: ware.name,
        // This ware's own pledge, 0 when it has none (the standing default).
        residualPoolPercent: ware.residual_pool_percent?.toString() ?? '0',
      },
      client_reference_id: user.id,
      customer_email: user.email,
    });

    await supabase
      .from('exchanges')
      .update({ stripe_session_id: session.id })
      .eq('id', exchange.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      exchangeId: exchange.id,
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

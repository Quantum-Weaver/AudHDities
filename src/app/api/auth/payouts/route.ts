// src/app/api/auth/payouts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe } from '@/lib/stripe/server';

type Supabase = Awaited<ReturnType<typeof createServerSupabase>>;

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function siteOrigin(request: NextRequest): string {
  return process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
}

async function financialRow(supabase: Supabase, uid: string) {
  const { data } = await supabase
    .from('user_financial')
    .select('id, stripe_account_id, payout_method, payout_details, payout_schedule')
    .eq('created_by', uid)
    .maybeSingle();
  return data;
}

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return fail('Authentication required', 401);

    const row = await financialRow(supabase, user.id);
    if (!row?.stripe_account_id) {
      return NextResponse.json({ success: true, data: { connected: false } });
    }

    const account = await getStripe().accounts.retrieve(row.stripe_account_id);
    return NextResponse.json({
      success: true,
      data: {
        connected: true,
        accountId: account.id,
        payoutsEnabled: Boolean(account.payouts_enabled),
        chargesEnabled: Boolean(account.charges_enabled),
        detailsSubmitted: Boolean(account.details_submitted),
        currentlyDue: account.requirements?.currently_due ?? [],
        schedule: account.settings?.payouts?.schedule?.interval ?? null,
      },
    });
  } catch (error) {
    console.error('Payouts status error:', error);
    return fail('Failed to read the payout account', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return fail('Authentication required', 401);

    const body = (await request.json().catch(() => ({}))) as { action?: unknown };
    const stripe = getStripe();
    const row = await financialRow(supabase, user.id);

    if (body.action === 'manage') {
      if (!row?.stripe_account_id) return fail('No payout account yet', 404);
      const link = await stripe.accounts.createLoginLink(row.stripe_account_id);
      return NextResponse.json({ success: true, data: { url: link.url } });
    }

    if (body.action !== 'connect') return fail('Unknown action', 400);

    let accountId = row?.stripe_account_id ?? null;
    if (!accountId) {
      const account = await stripe.accounts.create({
        controller: {
          stripe_dashboard: { type: 'express' },
          fees: { payer: 'application' },
          losses: { payments: 'application' },
          requirement_collection: 'stripe',
        },
        email: user.email ?? undefined,
        metadata: { user_id: user.id },
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      accountId = account.id;

      const stamp = { stripe_account_id: accountId, payout_method: 'stripe_connect' };
      const { error } = row
        ? await supabase.from('user_financial').update(stamp).eq('id', row.id)
        : await supabase.from('user_financial').insert({ id: crypto.randomUUID(), created_by: user.id, ...stamp });
      if (error) throw error;
    }

    const origin = siteOrigin(request);
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${origin}/vessel/sanctum?payouts=refresh`,
      return_url: `${origin}/vessel/sanctum?payouts=return`,
      type: 'account_onboarding',
    });
    return NextResponse.json({ success: true, data: { url: link.url } });
  } catch (error) {
    console.error('Payouts connect error:', error);
    return fail('The payout account could not be opened', 500);
  }
}

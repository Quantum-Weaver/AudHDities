// src/app/api/auth/billing-portal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe } from '@/lib/stripe/server';

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function siteOrigin(request: NextRequest): string {
  return process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
}

/** Opens Stripe's own billing portal for the vessel's stored Customer. */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return fail('Authentication required', 401);

    const { data: row } = await supabase
      .from('user_financial')
      .select('stripe_customer_id')
      .eq('created_by', user.id)
      .maybeSingle();

    if (!row?.stripe_customer_id) {
      return fail('Nothing standing to end — no payment has been made from this vessel yet.', 404);
    }

    const body = (await request.json().catch(() => ({}))) as { returnTo?: unknown };
    const returnTo = typeof body.returnTo === 'string' && body.returnTo.startsWith('/')
      ? body.returnTo
      : '/bazaar/wares';

    const portal = await getStripe().billingPortal.sessions.create({
      customer: row.stripe_customer_id,
      return_url: `${siteOrigin(request)}${returnTo}`,
    });

    return NextResponse.json({ success: true, data: { url: portal.url } });
  } catch (error) {
    console.error('Billing portal error:', error);
    return fail('The billing room could not be opened', 500);
  }
}

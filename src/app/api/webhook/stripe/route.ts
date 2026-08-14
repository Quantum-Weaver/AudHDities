// app/api/webhook/stripe/route.ts
// Rewritten 2026-07-18 for the evolved commerce schema. The checkout route
// inserts ONE pending exchange; this webhook COMPLETES that same row by
// stripe_session_id (the old flow inserted a second sales record here,
// duplicating every purchase). Residual-pool distribution happens
// downstream from completed exchanges, not inline.
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe } from '@/lib/stripe/server';

const PLATFORM_FEE_PERCENT = 10;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('No stripe-signature header');
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createServerSupabase();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
      const netAmount = amountTotal * (1 - PLATFORM_FEE_PERCENT / 100);

      const { data: exchange, error: updateError } = await supabase
        .from('exchanges')
        .update({
          status: 'completed',
          gross_amount: amountTotal,
          net_amount: netAmount,
          stripe_payment_intent: (session.payment_intent as string) ?? null,
        })
        .eq('stripe_session_id', session.id)
        .select()
        .maybeSingle();

      if (updateError) {
        console.error('Failed to complete exchange:', session.id, updateError);
      } else if (!exchange) {
        console.error('No pending exchange found for session:', session.id, session.metadata);
      } else {
        console.log('Exchange completed:', {
          exchangeId: exchange.id,
          wareId: exchange.ware_id,
          buyerId: exchange.buyer_id,
          grossAmount: amountTotal,
          netAmount,
        });
      }
      break;
    }

    case 'checkout.session.expired':
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      const { error: failError } = await supabase
        .from('exchanges')
        .update({ status: 'failed' })
        .eq('stripe_session_id', session.id)
        .eq('status', 'pending');
      if (failError) {
        console.error(`Failed to mark exchange failed for session ${session.id}:`, failError);
      } else {
        console.log(`Session ${session.id} ${event.type} — pending exchange marked failed`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

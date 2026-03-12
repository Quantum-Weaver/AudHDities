import { createServerSupabase } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle checkout completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const { productId, userId, tier } = session.metadata!;
    
    const supabase = await createServerSupabase();
    
    // Create sale record (triggers residual calculation)
    const { error: saleError } = await supabase
      .from('sales')
      .insert({
        product_id: productId,
        buyer_id: userId,
        tier_applied: tier,
        gross_amount: (session.amount_total || 0) / 100,
        payment_processor_fee: ((session.amount_total || 0) - (session.amount_subtotal || 0)) / 100,
        payment_status: 'completed'
      });

    if (saleError) {
      console.error('Failed to record sale:', saleError);
      return NextResponse.json({ error: 'Failed to record sale' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
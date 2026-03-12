import { createServerSupabase } from '@/lib/supabase/server';
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
    
    // Get the product to know platform fee
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
      
    if (productError) {
      console.error('Failed to fetch product:', productError);
      return NextResponse.json({ error: 'Product not found' }, { status: 500 });
    }
    
    // Calculate amounts in CENTS (as your schema uses amount_cents)
    const amountCents = session.amount_total || 0; // Already in cents!
    const grossAmount = amountCents / 100; // For your gross_amount field
    const processorFeeCents = ((session.amount_total || 0) - (session.amount_subtotal || 0));
    const platformFeeCents = Math.round(amountCents * (product.residual_pool_percent || 30) / 100);
    const creatorEarningsCents = amountCents - platformFeeCents - processorFeeCents;
    
    // Create sale record matching YOUR schema
    const { error: saleError } = await supabase
      .from('sales')
      .insert({
        product_id: productId,
        buyer_id: userId,
        tier_applied: tier as any, // Type assertion for enum
        amount_cents: amountCents,
        gross_amount: grossAmount,
        payment_processor_fee: processorFeeCents / 100, // Back to dollars for this field
        platform_fee_cents: platformFeeCents,
        creator_earnings_cents: creatorEarningsCents,
        payment_status: 'completed',
        // Optional fields
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent as string || null,
        net_amount: (amountCents - processorFeeCents) / 100,
        to_creator_immediate: creatorEarningsCents / 100,
        to_infrastructure: platformFeeCents / 100,
        to_residual_pool: platformFeeCents / 100, // Assuming platform fee = residual pool
        nd_price_applied: false,
        bigot_tax_applied: false
      });

    if (saleError) {
      console.error('Failed to record sale:', saleError);
      return NextResponse.json({ error: 'Failed to record sale' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
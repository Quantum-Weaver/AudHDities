// app/api/webhook/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('No stripe-signature header');
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const supabase = await createServerSupabase();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const productId = session.metadata?.product_id;
      const userId = session.metadata?.user_id;
      const tier = session.metadata?.tier;
      
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
      
      if (!productId || !userId || !tier) {
        console.error('Missing metadata in checkout session', { 
          productId, userId, tier, sessionId: session.id 
        });
        break;
      }

      // Validate tier is one of the allowed values
      const validTiers = ['community', 'ally', 'corporate', 'council'] as const;
      const validTier = validTiers.includes(tier as any) ? tier as 'community' | 'ally' | 'corporate' | 'council' : 'ally';

      // Get product details
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError || !product) {
        console.error('Product not found:', productId, productError);
        break;
      }

      // Calculate splits (all in dollars for numeric fields)
      const amount = amountTotal;
      const platformFeePercent = 30;
      const platformFee = amount * (platformFeePercent / 100);
      const creatorEarnings = amount - platformFee;
      
      const residualPercent = product.residual_pool_percent ?? 30;
      const residualPool = platformFee * (residualPercent / 100);
      const infrastructure = platformFee - residualPool;

      // Insert sale record - match your exact table structure
      const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert({
          product_id: productId,
          buyer_id: userId,
          amount_cents: Math.round(amount * 100),
          platform_fee_cents: Math.round(platformFee * 100),
          creator_earnings_cents: Math.round(creatorEarnings * 100),
          tier_applied: validTier,
          gross_amount: amount,
          payment_processor_fee: 0,
          net_amount: amount,
          to_residual_pool: residualPool,
          to_infrastructure: infrastructure,
          to_creator_immediate: creatorEarnings,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
          payment_status: 'completed',
          nd_price_applied: tier === 'community',
          bigot_tax_applied: false,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (saleError) {
        console.error('Failed to insert sale:', saleError);
      } else {
        console.log('Sale recorded successfully:', { 
          saleId: sale.id, 
          productId, 
          userId, 
          amount 
        });
      }

      break;
    }

    case 'checkout.session.expired':
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Session ${session.id} ${event.type}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
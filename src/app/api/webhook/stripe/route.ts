// app/api/webhook/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe, verifyWebhookSignature } from '@/lib/stripe/server';

// Platform fee is 10% (industry standard is 30-50%)
const PLATFORM_FEE_PERCENT = 10;

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

  let event;

  try {
    const stripe = getStripe();
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
      const session = event.data.object;
      
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

      const validTiers = ['community', 'ally', 'corporate', 'council'] as const;
      const validTier = validTiers.includes(tier as any) ? tier as 'community' | 'ally' | 'corporate' | 'council' : 'ally';

      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('products_id', productId)
        .single();

      if (productError || !product) {
        console.error('Product not found:', productId, productError);
        break;
      }

      const amount = amountTotal;
      const platformFee = amount * (PLATFORM_FEE_PERCENT / 100);
      const creatorEarnings = amount - platformFee;
      
      const residualPercent = product.residual_pool_percent ?? 30;
      const residualPool = platformFee * (residualPercent / 100);
      const infrastructure = platformFee - residualPool;

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
          saleId: sale.sales_id, 
          productId, 
          userId, 
          amount,
          platformFee,
          creatorEarnings,
          residualPool
        });
      }

      break;
    }

    case 'checkout.session.expired':
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      console.log(`Session ${session.id} ${event.type}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
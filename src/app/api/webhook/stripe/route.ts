// src/app/api/webhook/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerSupabase } from '@/lib/supabase/server';

// Disable Next.js body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper to read raw body
async function readRawBody(request: NextRequest): Promise<Buffer> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('No body reader');

  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) chunks.push(value);
    done = readerDone;
  }

  return Buffer.concat(chunks);
}

export async function POST(request: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await readRawBody(request);
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Initialize Supabase
    const supabase = await createServerSupabase();

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract metadata
        const productId = session.metadata?.product_id;
        const userId = session.metadata?.user_id;
        const tier = session.metadata?.tier || 'ally';
        
        if (!productId || !userId) {
          console.error('Missing metadata in checkout session:', session.id);
          break;
        }

        // Fetch product details
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (productError) {
          console.error('Product not found:', productError);
          break;
        }

        // Determine price based on tier
        let amountCents = 0;
        let ndPriceApplied = false;
        let bigotTaxApplied = false;

        switch (tier) {
          case 'community':
            amountCents = product.price_community ? Math.round(product.price_community * 100) : Math.round(product.price_ally * 100);
            ndPriceApplied = true;
            break;
          case 'corporate':
            amountCents = product.price_corporate ? Math.round(product.price_corporate * 100) : Math.round(product.price_ally * 100);
            break;
          default:
            amountCents = Math.round(product.price_ally * 100);
        }

        // Add bigot tax if applicable (example: corporate tier gets +10% humor tax)
        if (tier === 'corporate' && product.bigot_tax_cents) {
          amountCents += product.bigot_tax_cents;
          bigotTaxApplied = true;
        }

        // Calculate platform fee (30% of sale)
        const platformFeeCents = Math.round(amountCents * 0.3);
        const creatorEarningsCents = amountCents - platformFeeCents;

        // Create sale record
        const { data: sale, error: saleError } = await supabase
          .from('sales')
          .insert({
            product_id: productId,
            buyer_id: userId,
            amount_cents: amountCents,
            platform_fee_cents: platformFeeCents,
            creator_earnings_cents: creatorEarningsCents,
            nd_price_applied: ndPriceApplied,
            bigot_tax_applied: bigotTaxApplied,
            tier_applied: tier,
            gross_amount: amountCents / 100,
            payment_processor_fee: (amountCents * 0.029 + 30) / 100, // Stripe fees
            stripe_payment_intent: session.payment_intent as string,
            stripe_session_id: session.id,
            payment_status: 'completed',
          })
          .select()
          .single();

        if (saleError) {
          console.error('Failed to create sale record:', saleError);
          break;
        }

        // Update creator profile stats
        const { data: creatorProfile } = await supabase
          .from('creator_profiles')
          .select('total_sales, total_earnings')
          .eq('id', product.creator_id)
          .single();

        if (creatorProfile) {
          await supabase
            .from('creator_profiles')
            .update({
              total_sales: (creatorProfile.total_sales || 0) + 1,
              total_earnings: (creatorProfile.total_earnings || 0) + (creatorEarningsCents / 100),
            })
            .eq('id', product.creator_id);
        }

        // Create admin log for transparency
        await supabase
          .from('admin_logs')
          .insert({
            admin_id: userId, // Using user as admin for transparency (this is the buyer)
            action: 'purchase',
            target_type: 'sale',
            target_id: sale.id,
            public_note: `Purchase of "${product.title}" by ${session.customer_email}`,
            metadata: {
              amount: amountCents / 100,
              tier,
              product_title: product.title,
            },
          });

        console.log(`Sale recorded: ${product.title} - $${amountCents / 100}`);
        break;
      }

      case 'checkout.session.expired':
      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session ${session.id} failed or expired`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
import { createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { productId, tier } = await request.json();
    const supabase = await createServerSupabase();
    
    // Get user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get product with all needed fields
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Determine price with null handling
    let price: number | null = null;
    switch (tier) {
      case 'community':
        price = product.price_community_cents;
        break;
      case 'ally':
        price = product.price_ally_cents;
        break;
      case 'corporate':
        price = product.price_corporate_cents;
        break;
      default:
        price = product.price_ally_cents;
    }

    // Handle null price - maybe default to ally price or return error
    if (price === null || price === undefined) {
      // Try fallback to ally price
      price = product.price_ally_cents;
      
      // If still null, return error
      if (price === null || price === undefined) {
        return NextResponse.json(
          { error: `No price configured for ${tier} tier` },
          { status: 400 }
        );
      }
    }

    // Convert to cents (Dollars to cents: multiply by 100)
    const unitAmountCents = Math.round(price * 100);

    // Free checkout - skip Stripe
    if (unitAmountCents === 0) {
      // Calculate cents values for free product
      const amountCents = 0;
      const platformFeeCents = 0;
      const creatorEarningsCents = 0;
      
      // Create sale record directly matching YOUR schema
      const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert({
          product_id: productId,
          buyer_id: user.id,
          tier_applied: tier as any,
          amount_cents: amountCents,
          gross_amount: 0,
          payment_processor_fee: 0,
          platform_fee_cents: platformFeeCents,
          creator_earnings_cents: creatorEarningsCents,
          payment_status: 'completed',
          net_amount: 0,
          to_creator_immediate: 0,
          to_infrastructure: 0,
          to_residual_pool: 0,
          nd_price_applied: false,
          bigot_tax_applied: false
        })
        .select()
        .single();

      if (saleError) throw saleError;

      return NextResponse.json({ 
        success: true, 
        free: true,
        saleId: sale.id 
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: `${tier} tier access`,
            },
            unit_amount: unitAmountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/cure/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cure/tickets?canceled=true`,
      metadata: {
        productId,
        userId: user.id,
        tier,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}
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

    // Get product
    const { data: product } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Determine price
    let unitAmount = 0;
    switch (tier) {
      case 'community': unitAmount = Math.round(product.price_community * 100); break;
      case 'ally': unitAmount = Math.round(product.price_ally * 100); break;
      case 'corporate': unitAmount = Math.round(product.price_corporate * 100); break;
      default: unitAmount = Math.round(product.price_ally * 100);
    }

    // Free checkout - skip Stripe
    if (unitAmount === 0) {
      // Create sale record directly
      const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert({
          product_id: productId,
          buyer_id: user.id,
          tier_applied: tier,
          gross_amount: 0,
          payment_processor_fee: 0,
          payment_status: 'completed'
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
            unit_amount: unitAmount,
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
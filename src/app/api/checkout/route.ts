// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import Stripe from 'stripe';
import type { Product } from '@/types/supabase/tables/products';
import type { Profile } from '@/types/supabase/tables/profiles';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

interface CheckoutRequest {
  productId: string;
  tier: 'community' | 'ally' | 'corporate';
  quantity?: number;
}

// Helper to determine if bigot tax should apply
function shouldApplyBigotTax(profile: Profile, tier: string): boolean {
  // Apply for corporate tier
  if (tier === 'corporate') return true;
  
  // Apply for certain email domains
  const corporateDomains = ['.gov', '.mil', '.edu', 'corp', 'inc', 'llc'];
  const emailDomain = profile.email?.split('@')[1]?.toLowerCase() || '';
  return corporateDomains.some(domain => emailDomain.includes(domain));
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // 1. Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // 2. Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // 3. Parse request body
    const body = await request.json();
    const { productId, tier = 'ally', quantity = 1 }: CheckoutRequest = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      );
    }

    // 4. Validate tier against user's actual tier
    const userTier = profile.user_tier as 'community' | 'ally' | 'corporate' | 'council' | null;
    
    if (tier === 'community' && userTier !== 'community' && userTier !== 'council') {
      return NextResponse.json(
        { error: 'Community tier is only available for neurodivergent community members' },
        { status: 403 }
      );
    }

    // 5. Fetch product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('is_published', true)
      .eq('active', true)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found or unavailable' },
        { status: 404 }
      );
    }

    // 6. Determine base price based on tier
    let baseAmount: number | null = null;

    switch (tier) {
      case 'community':
        baseAmount = product.price_community;
        break;
      case 'ally':
        baseAmount = product.price_ally;
        break;
      case 'corporate':
        baseAmount = product.price_corporate;
        break;
    }

    // Fallback to ally tier if selected tier has no price
    if (baseAmount === null || baseAmount <= 0) {
      baseAmount = product.price_ally;
    }

    if (!baseAmount || baseAmount <= 0) {
      return NextResponse.json(
        { error: 'Product has no valid price' },
        { status: 400 }
      );
    }

    // 7. Apply bigot tax for corporate tier or certain domains
    const applyBigotTax = shouldApplyBigotTax(profile, tier);
    let finalAmount = baseAmount;
    let bigotTaxApplied = false;
    
    if (applyBigotTax && product.bigot_tax_cents) {
      finalAmount = baseAmount + (product.bigot_tax_cents / 100);
      bigotTaxApplied = true;
    }

    // Convert to cents for Stripe
    const amountInCents = Math.round(finalAmount * 100);

    // 8. Create sales record first
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        product_id: product.id,
        buyer_id: user.id,
        amount_cents: amountInCents,
        gross_amount: finalAmount,
        tier_applied: tier as 'community' | 'ally' | 'corporate',
        nd_price_applied: tier === 'community',
        bigot_tax_applied: bigotTaxApplied,
        platform_fee_cents: Math.round(amountInCents * 0.3), // 30% platform fee
        creator_earnings_cents: Math.round(amountInCents * 0.7), // 70% creator earnings
        payment_status: 'pending',
      })
      .select()
      .single();

    if (saleError) {
      console.error('Error creating sales record:', saleError);
      return NextResponse.json(
        { error: 'Failed to create sales record' },
        { status: 500 }
      );
    }

    // 9. Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description || undefined,
              images: product.preview_image ? [product.preview_image] : [],
            },
            unit_amount: amountInCents,
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&sale_id=${sale.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      metadata: {
        productId: product.id,
        userId: user.id,
        saleId: sale.id,
        tier,
        productTitle: product.title,
        creatorId: product.creator_id,
        residualPoolPercent: product.residual_pool_percent?.toString() || '30',
        bigotTaxApplied: bigotTaxApplied.toString(),
      },
      client_reference_id: user.id,
      customer_email: user.email,
    });

    // 10. Update sales record with Stripe session ID
    await supabase
      .from('sales')
      .update({ stripe_session_id: session.id })
      .eq('id', sale.id);

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url,
      saleId: sale.id 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
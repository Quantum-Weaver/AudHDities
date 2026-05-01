// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe} from '@/lib/stripe/server';
import type { ProfilesFormData } from '@/types/generated/hestia-core/profiles';

interface CheckoutRequest {
  productId: string;
  tier: 'community' | 'ally' | 'corporate';
  quantity?: number;
}

function shouldApplyBigotTax(profile: ProfilesFormData, tier: string): boolean {
  if (tier === 'corporate') return true;
  const corporateDomains = ['.gov', '.mil', '.edu', 'corp', 'inc', 'llc'];
  const emailDomain = profile.email?.split('@')[1]?.toLowerCase() || '';
  return corporateDomains.some(domain => emailDomain.includes(domain));
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('profiles_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    const body = await request.json();
    const { productId, tier = 'ally', quantity = 1 }: CheckoutRequest = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const userTier = profile.user_tier as 'community' | 'ally' | 'corporate' | 'council' | null;
    if (tier === 'community' && userTier !== 'community' && userTier !== 'council') {
      return NextResponse.json({ error: 'Community tier is only available for neurodivergent community members' }, { status: 403 });
    }

    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('products_id', productId)
      .eq('is_published', true)
      .eq('active', true)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found or unavailable' }, { status: 404 });
    }

    let baseAmount: number | null = null;
    switch (tier) {
      case 'community': baseAmount = product.price_community; break;
      case 'ally': baseAmount = product.price_ally; break;
      case 'corporate': baseAmount = product.price_corporate; break;
    }

    if (baseAmount === null || baseAmount <= 0) {
      baseAmount = product.price_ally;
    }

    if (!baseAmount || baseAmount <= 0) {
      return NextResponse.json({ error: 'Product has no valid price' }, { status: 400 });
    }

    const applyBigotTax = shouldApplyBigotTax(profile, tier);
    let finalAmount = baseAmount;
    let bigotTaxApplied = false;
    
    if (applyBigotTax && product.bigot_tax_cents) {
      finalAmount = baseAmount + (product.bigot_tax_cents / 100);
      bigotTaxApplied = true;
    }

    const amountInCents = Math.round(finalAmount * 100);
    const PLATFORM_FEE_PERCENT = 10;
    const platformFeeCents = Math.round(amountInCents * (PLATFORM_FEE_PERCENT / 100));
    const creatorEarningsCents = amountInCents - platformFeeCents;

    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        product_id: product.products_id,
        buyer_id: user.id,
        amount_cents: amountInCents,
        gross_amount: finalAmount,
        tier_applied: tier as 'community' | 'ally' | 'corporate',
        nd_price_applied: tier === 'community',
        bigot_tax_applied: bigotTaxApplied,
        platform_fee_cents: platformFeeCents,
        creator_earnings_cents: creatorEarningsCents,
        payment_status: 'pending',
      })
      .select()
      .single();

    if (saleError) {
      console.error('Error creating sales record:', saleError);
      return NextResponse.json({ error: 'Failed to create sales record' }, { status: 500 });
    }

    const stripe = getStripe();
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            description: product.description || undefined,
            images: product.media_urls ? [] : [],
          },
          unit_amount: amountInCents,
        },
        quantity,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&sale_id=${sale.sales_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      metadata: {
        productId: product.products_id,
        userId: user.id,
        saleId: sale.sales_id,
        tier,
        productTitle: product.title,
        creatorId: product.creator_id,
        residualPoolPercent: product.residual_pool_percent?.toString() || '30',
        bigotTaxApplied: bigotTaxApplied.toString(),
      },
      client_reference_id: user.id,
      customer_email: user.email,
    });

    await supabase
      .from('sales')
      .update({ stripe_session_id: session.id })
      .eq('sales_id', sale.sales_id);

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url,
      saleId: sale.sales_id 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productId,
      productTitle,
      productDescription,
      price,
      tier,
      userId,
      imageUrl,
    } = body;

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productTitle,
              description: productDescription,
              images: imageUrl ? [imageUrl] : undefined,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      metadata: {
        product_id: productId,
        user_id: userId,
        tier,
      },
      client_reference_id: userId,
    });

    // Return the URL to redirect to
    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    });
    
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
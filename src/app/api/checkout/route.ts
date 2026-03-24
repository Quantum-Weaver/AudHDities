// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe/server';

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

    if (!productId || !productTitle || !price || !tier || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine success and cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/checkout/cancel`;

    const session = await createCheckoutSession({
      productId,
      productTitle,
      productDescription,
      price,
      successUrl,
      cancelUrl,
      userId,
      tier,
      imageUrl,
    });

    return NextResponse.json({ sessionId: session.id });
    
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
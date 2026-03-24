// lib/stripe/server.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export interface CreateCheckoutSessionParams {
  productId: string;
  productTitle: string;
  productDescription?: string;
  price: number;
  successUrl: string;
  cancelUrl: string;
  userId: string;
  tier: 'community' | 'ally' | 'corporate';
  imageUrl?: string;
}

export async function createCheckoutSession({
  productId,
  productTitle,
  productDescription,
  price,
  successUrl,
  cancelUrl,
  userId,
  tier,
  imageUrl,
}: CreateCheckoutSessionParams) {
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
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      product_id: productId,
      user_id: userId,
      tier,
    },
  });

  return session;
}
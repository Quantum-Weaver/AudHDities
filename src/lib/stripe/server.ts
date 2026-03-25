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
  // Convert price to cents for Stripe
  const unitAmount = Math.round(price * 100);
  
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
            metadata: {
              product_id: productId,
            },
          },
          unit_amount: unitAmount,
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
    client_reference_id: userId,
  });

  return session;
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
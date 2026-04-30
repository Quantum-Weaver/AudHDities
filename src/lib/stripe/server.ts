// src/lib/stripe/server.ts
import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-04-22.dahlia',
    });
  }
  return stripeInstance;
}

export { getStripe as stripe };

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

export async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  const stripe = getStripe();
  const unitAmount = Math.round(params.price * 100);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: params.productTitle,
          description: params.productDescription,
          images: params.imageUrl ? [params.imageUrl] : undefined,
          metadata: { product_id: params.productId },
        },
        unit_amount: unitAmount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      product_id: params.productId,
      user_id: params.userId,
      tier: params.tier,
    },
    client_reference_id: params.userId,
  });

  return session;
}

export function verifyWebhookSignature(
  payload: Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
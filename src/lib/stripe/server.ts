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

export function verifyWebhookSignature(
  payload: Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
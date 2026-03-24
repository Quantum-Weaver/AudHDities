// hooks/useCheckout.ts
'use client';

import { useState } from 'react';
import { getStripe } from '@/lib/stripe/client';

interface CheckoutOptions {
  productId: string;
  productTitle: string;
  productDescription?: string;
  price: number;
  tier: 'community' | 'ally' | 'corporate';
  userId: string;
  imageUrl?: string;
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async (options: CheckoutOptions) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading, error };
}
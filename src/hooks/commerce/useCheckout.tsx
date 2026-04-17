// hooks/commerce/useCheckout.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';  // FIXED: correct import path

interface CheckoutParams {
  id: string;
  product: string;
  tier?: 'community' | 'ally' | 'corporate';
  quantity?: number;
}

interface UseCheckoutReturn {
  initiateCheckout: (params: CheckoutParams) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useCheckout(): UseCheckoutReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();

  const initiateCheckout = useCallback(async (params: CheckoutParams) => {
    const { id, tier = 'ally', quantity = 1 } = params;

    if (!user) {
      sessionStorage.setItem('pendingPurchase', JSON.stringify({ id, tier, quantity }));
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch product details using generated types
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (productError || !product) {
        throw new Error('Product not found');
      }

      if (!product.is_published || !product.active) {
        throw new Error('This product is no longer available');
      }

      // Determine price based on tier
      let price: number | null = null;
      switch (tier) {
        case 'community':
          price = product.price_community ?? null;
          break;
        case 'corporate':
          price = product.price_corporate ?? null;
          break;
        default:
          price = product.price_ally ?? null;
          break;
      }

      if (!price || price <= 0) {
        throw new Error('This product is not available for purchase');
      }

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          tier,
          quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (!data.url) {
        throw new Error('No checkout URL returned');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;

    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [user, router, supabase]);

  return { initiateCheckout, loading, error };
}

export function usePendingPurchase() {
  const [pendingPurchase, setPendingPurchase] = useState<Omit<CheckoutParams, 'product'> | null>(null);
  const { user } = useAuth();
  const { initiateCheckout } = useCheckout();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (user && pendingPurchase && !processed) {
      setProcessed(true);
      initiateCheckout({ ...pendingPurchase, product: pendingPurchase.id });
      sessionStorage.removeItem('pendingPurchase');
    }
  }, [user, pendingPurchase, initiateCheckout, processed]);

  useEffect(() => {
    const stored = sessionStorage.getItem('pendingPurchase');
    if (stored) {
      try {
        setPendingPurchase(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem('pendingPurchase');
      }
    }
  }, []);

  return { pendingPurchase };
}
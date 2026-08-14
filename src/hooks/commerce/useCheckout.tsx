// hooks/commerce/useCheckout.ts
// Wares edition (2026-07-18): the server owns all pricing now — the route
// validates availability and calls calculate_sovereign_price, so this hook
// no longer prefetches the ware or chooses a tier. It also posts to the
// route's real path (/api/auth/checkout — the old '/api/checkout' was a
// silent 404).
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface CheckoutParams {
  id: string;
  quantity?: number;
  amount?: number; // pay_what_you_want offers (floor enforced server-side)
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

  const initiateCheckout = useCallback(async (params: CheckoutParams) => {
    const { id, quantity = 1, amount } = params;

    if (!user) {
      sessionStorage.setItem('pendingPurchase', JSON.stringify({ id, quantity, amount }));
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const checkoutResponse = await fetch('/api/auth/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wareId: id, quantity, amount }),
      });

      const checkoutData = await checkoutResponse.json();

      if (!checkoutResponse.ok) {
        throw new Error(checkoutData.error || 'Failed to create checkout session');
      }
      if (!checkoutData.url) {
        throw new Error('No checkout URL returned');
      }

      window.location.href = checkoutData.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [user, router]);

  return { initiateCheckout, loading, error };
}

export function usePendingPurchase() {
  const [pendingPurchase, setPendingPurchase] = useState<CheckoutParams | null>(null);
  const { user } = useAuth();
  const { initiateCheckout } = useCheckout();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (user && pendingPurchase && !processed) {
      setProcessed(true);
      initiateCheckout(pendingPurchase);
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

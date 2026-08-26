// hooks/commerce/useCheckout.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface CheckoutParams {
  id: string;
  quantity?: number;
  amount?: number; // pay_what_you_want offers (floor enforced server-side)
}

/**
 * THE ADJUSTED-PRICE SCREEN (SPEC §3⑥).
 *
 * Until 2026-08-25 this hook sent the vessel straight to Stripe with whatever
 * came back, so where the acid test moved the number a vessel read one price on
 * the plate and met another at the till with no screen in between — and law 7
 * says the buyer sees the split AT THE MOMENT OF PURCHASE.
 *
 * The crossing is held ONLY when the number changed. Where it did not, this is
 * null and the road is exactly what it was.
 */
export interface HeldCrossing {
  url: string;
  plateAmount: number;
  chargedAmount: number;
  residualPoolPercent: number;
}

interface UseCheckoutReturn {
  initiateCheckout: (params: CheckoutParams) => Promise<void>;
  loading: boolean;
  error: string | null;
  heldCrossing: HeldCrossing | null;
  goOnToPayment: () => void;
  notNow: () => void;
}

export function useCheckout(): UseCheckoutReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heldCrossing, setHeldCrossing] = useState<HeldCrossing | null>(null);
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

      const plate = typeof checkoutData.plateAmount === 'number' ? checkoutData.plateAmount : null;
      const charged = typeof checkoutData.chargedAmount === 'number' ? checkoutData.chargedAmount : null;
      const moved =
        plate !== null && charged !== null &&
        Math.round(plate * 100) !== Math.round(charged * 100);

      if (moved) {
        setHeldCrossing({
          url: checkoutData.url,
          plateAmount: plate as number,
          chargedAmount: charged as number,
          residualPoolPercent: Number(checkoutData.residualPoolPercent ?? 0),
        });
        return;
      }

      window.location.href = checkoutData.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [user, router]);

  const goOnToPayment = useCallback(() => {
    if (heldCrossing) window.location.href = heldCrossing.url;
  }, [heldCrossing]);

  const notNow = useCallback(() => setHeldCrossing(null), []);

  return { initiateCheckout, loading, error, heldCrossing, goOnToPayment, notNow };
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

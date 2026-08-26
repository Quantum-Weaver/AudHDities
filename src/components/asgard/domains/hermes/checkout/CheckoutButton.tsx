// components/asgard/domains/hermes/checkout/CheckoutButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCheckout } from '@/hooks/commerce/useCheckout';
import { Button } from '@/components/yggdrasil/Button';
import { PriceBreakdown } from '@/components/asgard/domains/hermes/checkout/PriceBreakdown';
import { formatMinorUnits } from '@/lib/economics/split';
import { recurrenceOf, intervalPhrase } from '@/lib/economics/recurrence';
import { Loader2, CreditCard } from 'lucide-react';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WaresRow = Tables<'wares'>;

interface CheckoutButtonProps {
  product: WaresRow;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({
  product, variant = 'primary', size = 'md', className = '', children
}: CheckoutButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { initiateCheckout, loading, error, heldCrossing, goOnToPayment, notNow } = useCheckout();
  const [localError, setLocalError] = useState<string | null>(null);

  const price = product.price;
  const inStock = product.quantity_available === null || product.quantity_available > 0;
  const purchasable = product.pricing_model === 'fixed' || product.pricing_model === 'pay_what_you_want';
  const isAvailable = product.status === 'published' && inStock && purchasable && price !== null && price > 0;

  const handleCheckout = async () => {
    setLocalError(null);
    if (!isAvailable) { setLocalError('This one is not on the stall right now.'); return; }
    if (!user) {
      sessionStorage.setItem('pendingPurchase', JSON.stringify({ id: product.id, quantity: 1 }));
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    await initiateCheckout({ id: product.id, quantity: 1 });
  };

  const displayError = error || localError;
  const recurrence = recurrenceOf(product);

  if (heldCrossing) {
    return (
      <div className="space-y-4 text-left" role="status">
        <p className="text-star-dust font-semibold">The price for you is lower.</p>
        <p className="text-sm text-star-dust/60">
          The stall says {formatMinorUnits(Math.round(heldCrossing.plateAmount * 100))}. Solidarity
          pricing has been applied and{' '}
          {formatMinorUnits(Math.round(heldCrossing.chargedAmount * 100))} is what you would be
          charged. The split below is the real one.
        </p>
        <PriceBreakdown
          subtotal={heldCrossing.chargedAmount}
          showResidualPool={heldCrossing.residualPoolPercent > 0}
          residualPoolPercent={heldCrossing.residualPoolPercent}
        />
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={goOnToPayment} variant="primary" size={size}>Go on to payment</Button>
          <button
            type="button"
            onClick={notNow}
            className="text-sm text-star-dust/60 hover:text-star-dust focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark rounded"
          >
            Not now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleCheckout} disabled={loading || !isAvailable} variant={variant} size={size} className={className}>
        {loading ? (<><Loader2 size={18} className="mr-2 animate-spin" />Crossing…</>) : (<><CreditCard size={18} className="mr-2" />{children || (recurrence
          ? (price ? `Stand with it — ${formatMinorUnits(Math.round(price * 100))} ${intervalPhrase(recurrence.interval)}` : 'Stand with it')
          : (price ? `Bring home ${formatMinorUnits(Math.round(price * 100))}` : 'Bring home'))}</>)}
      </Button>
      {displayError && <p className="text-sm text-error">{displayError}</p>}
      {!isAvailable && !displayError && <p className="text-sm text-star-dust/60">This one is not on the stall right now.</p>}
    </div>
  );
}

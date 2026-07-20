// components/asgard/domains/hermes/checkout/CheckoutButton.tsx
// Wares edition (2026-07-18): one base price + pricing_model; the tier prop
// died with the products table — solidarity pricing happens server-side.
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCheckout } from '@/hooks/commerce/useCheckout';
import { Button } from '@/components/yggdrasil/Button';
import { Loader2, CreditCard } from 'lucide-react';
import type { Tables } from '@/types/supabase/database.helpers.js';

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
  const { initiateCheckout, loading, error } = useCheckout();
  const [localError, setLocalError] = useState<string | null>(null);

  const price = product.price;
  const inStock = product.quantity_available === null || product.quantity_available > 0;
  const purchasable = product.pricing_model === 'fixed' || product.pricing_model === 'pay_what_you_want';
  const isAvailable = product.status === 'published' && inStock && purchasable && price !== null && price > 0;

  const handleCheckout = async () => {
    setLocalError(null);
    if (!isAvailable) { setLocalError('This ware is not available'); return; }
    if (!user) {
      sessionStorage.setItem('pendingPurchase', JSON.stringify({ id: product.id, quantity: 1 }));
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    await initiateCheckout({ id: product.id, quantity: 1 });
  };

  const displayError = error || localError;

  return (
    <div className="space-y-2">
      <Button onClick={handleCheckout} disabled={loading || !isAvailable} variant={variant} size={size} className={className}>
        {loading ? (<><Loader2 size={18} className="mr-2 animate-spin" />Processing...</>) : (<><CreditCard size={18} className="mr-2" />{children || (price ? `Bring home $${price.toFixed(2)}` : 'Bring home')}</>)}
      </Button>
      {displayError && <p className="text-sm text-error">{displayError}</p>}
      {!isAvailable && !displayError && <p className="text-sm text-warning">This ware is currently not available</p>}
    </div>
  );
}

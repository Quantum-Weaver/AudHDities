// components/commerce/CheckoutButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCheckout } from '@/hooks/commerce/useCheckout';
import { Button } from '@/components/ui/Button';
import { Loader2, CreditCard } from 'lucide-react';
import type { ProductsRow } from '@/types/generated/plutus-economics/products';  // FIXED: correct type

interface CheckoutButtonProps {
  product: ProductsRow;  // FIXED: use ProductsRow instead of ProductsFormData
  variant?: 'outline' | 'ghost' | 'secondary' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  tier?: 'community' | 'ally' | 'corporate';
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({ 
  product, 
  variant = 'primary', 
  size = 'md',
  tier = 'ally',
  className = '',
  children 
}: CheckoutButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { initiateCheckout, loading, error } = useCheckout();
  const [localError, setLocalError] = useState<string | null>(null);

  // Determine price based on tier
  const getPrice = (): number | null => {
    switch (tier) {
      case 'community':
        return product.price_community ?? null;
      case 'corporate':
        return product.price_corporate ?? null;
      default:
        return product.price_ally ?? null;
    }
  };

  const price = getPrice();
  const isAvailable = product.is_published && product.active && price !== null && price > 0;

  const handleCheckout = async () => {
    setLocalError(null);

    if (!isAvailable) {
      setLocalError('This product is not available for purchase');
      return;
    }

    if (!user) {
      sessionStorage.setItem('pendingPurchase', JSON.stringify({
        id: product.id,
        tier,
        quantity: 1,
      }));
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    await initiateCheckout({
      id: product.id,
      product: product.id,
      tier,
      quantity: 1,
    });
  };

  const displayError = error || localError;

  return (
    <div className="space-y-2">
      <Button
        onClick={handleCheckout}
        disabled={loading || !isAvailable}
        variant={variant}
        size={size}
        className={className}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard size={18} className="mr-2" />
            {children || (price ? `Purchase $${price.toFixed(2)}` : 'Purchase')}
          </>
        )}
      </Button>
      
      {displayError && (
        <p className="text-sm text-red-400">{displayError}</p>
      )}
      
      {!isAvailable && !displayError && (
        <p className="text-sm text-yellow-400">
          This product is currently not available for purchase
        </p>
      )}
    </div>
  );
}
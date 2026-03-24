// src/components/checkout/CheckoutButton.tsx
'use client';

import { useState } from 'react';
import { getStripe } from '@/lib/stripe/client';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  productId: string;
  productTitle: string;
  productDescription?: string;
  price: number;
  tier: 'community' | 'ally' | 'corporate';
  userId: string;
  imageUrl?: string;
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({
  productId,
  productTitle,
  productDescription,
  price,
  tier,
  userId,
  imageUrl,
  className,
  children,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          productTitle,
          productDescription,
          price,
          tier,
          userId,
          imageUrl,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      await stripe.redirectToCheckout({ sessionId });
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        children || `Purchase $${price}`
      )}
    </Button>
  );
}
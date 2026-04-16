// app/(hermes)/checkout/page.tsx
// The Exchange - Checkout page
// Feeling: Secure, intentional, transparent

import { Page } from '@/components/arrchive/layout/Page';
import { CheckoutForm } from '@/components/bazaar/CheckoutForm';
import { TierSelector } from '@/components/bazaar/TierSelector';
import { PaymentMethods } from '@/components/bazaar/PaymentMethods';
import { OrderSummary } from '@/components/bazaar/OrderSummary';
import { ConfirmationModal } from '@/components/bazaar/ConfirmationModal';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface CheckoutPageProps {
  searchParams: Promise<{
    product?: string;
    tier?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const session = await auth();
  
  if (!session) {
    redirect(`/enter?redirect=/bazaar/checkout?product=${params.product}&tier=${params.tier}`);
  }
  
  if (!params.product) {
    redirect('/bazaar');
  }

  return (
    <Page 
      variant={1}
      environment="invitation"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Exchange
            </h1>
            <p className="text-white/60">
              Complete your transaction with full transparency
            </p>
          </div>

          {/* Checkout Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <TierSelector productId={params.product} selectedTier={params.tier} />
              <CheckoutForm productId={params.product} />
              <PaymentMethods />
            </div>
            
            {/* Right Column - Order Summary */}
            <div>
              <OrderSummary productId={params.product} tier={params.tier} />
            </div>
          </div>

          {/* Confirmation Modal (shown after successful purchase) */}
          <ConfirmationModal />
        </div>
      </main>
    </Page>
  );
}
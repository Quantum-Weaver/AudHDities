// app/(hermes)/bazaar/checkout/page.tsx
// The Exchange - Checkout, payment flow
// Feeling: Secure, smooth, completing

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Exchange | Sovereign Sanctuary',
  description: 'Complete your journey'
};

export default async function CheckoutPage() {
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}
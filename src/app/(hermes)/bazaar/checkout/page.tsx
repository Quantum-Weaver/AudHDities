// src/app/(hermes)/bazaar/checkout/page.tsx
// The Exchange — Checkout hub
// Feeling: Secure, smooth, completing

import { Page } from '@/components/bifrost/Page';
import { CheckoutHub } from '@/components/asgard/domains/hermes/checkout/CheckoutHub';

export const metadata = {
  title: 'The Exchange | Sovereign Sanctuary',
  description: 'Complete your journey',
};

export default function CheckoutPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CheckoutHub />
    </Page>
  );
}
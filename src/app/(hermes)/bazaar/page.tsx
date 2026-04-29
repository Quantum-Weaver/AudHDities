// src/app/(hermes)/bazaar/page.tsx
import { Page } from '@/components/bifrost/Page';
import { BazaarHub } from '@/components/asgard/domains/hermes/bazaar/BazaarHub';

export const metadata = {
  title: 'The Bazaar | Sovereign Sanctuary',
  description: 'Discover creations from sovereign souls',
};

export default function BazaarPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BazaarHub />
    </Page>
  );
}
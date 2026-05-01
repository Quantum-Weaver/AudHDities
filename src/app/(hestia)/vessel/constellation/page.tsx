// src/app/(hestia)/vessel/constellation/page.tsx
// The Constellation — Your web of sovereign connections
// Feeling: Cosmic, Visionary, Connected

import { Page } from '@/components/bifrost/Page';
import { ConstellationContent } from '@/components/asgard/domains/hestia/constellation/ConstellationContent';

export const metadata = {
  title: 'Constellation | Sovereign Sanctuary',
  description: 'Your web of sovereign connections',
};

export default function ConstellationPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ConstellationContent />
    </Page>
  );
}
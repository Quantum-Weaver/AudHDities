// src/app/(prometheus)/studio/page.tsx
// The Loom — Creative tools hub
// Feeling: Generative, fluid, sovereign, unbounded

import { Page } from '@/components/bifrost/Page';
import { StudioHub } from '@/components/asgard/domains/prometheus/studio/StudioHub';

export const metadata = {
  title: 'The Loom | Sovereign Sanctuary',
  description: 'Every creation begins with a single thread',
};

export default function StudioPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioHub />
    </Page>
  );
}
// src/app/(hermes)/bazaar/studio/page.tsx
// The Loom — Create a new product
// Feeling: Generative, sovereign, creative

import { Page } from '@/components/bifrost/Page';
import { StudioCreate } from '@/components/asgard/domains/hermes/studio/StudioCreate';

export const metadata = {
  title: 'The Loom | Sovereign Sanctuary',
  description: 'Every creation begins with a single thread',
};

export default function StudioPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioCreate />
    </Page>
  );
}
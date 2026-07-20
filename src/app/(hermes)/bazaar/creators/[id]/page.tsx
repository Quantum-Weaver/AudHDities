// src/app/(hermes)/bazaar/creators/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CreatorDetail } from '@/components/asgard/domains/hermes/creators/CreatorDetail';

export const metadata = {
  title: 'Weaver | The Weavers | Sovereign Sanctuary',
  description: 'A sovereign journey',
};

export default function CreatorDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CreatorDetail />
    </Page>
  );
}
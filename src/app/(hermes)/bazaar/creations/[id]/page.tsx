// src/app/(hermes)/bazaar/creations/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CreationDetail } from '@/components/asgard/domains/hermes/creations/CreationDetail';

export const metadata = {
  title: 'Work | The Tapestry | Sovereign Sanctuary',
  description: 'A sovereign offering',
};

export default function CreationDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CreationDetail />
    </Page>
  );
}
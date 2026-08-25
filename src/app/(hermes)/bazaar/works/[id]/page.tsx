// src/app/(hermes)/bazaar/works/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { WorkDetail } from '@/components/asgard/domains/hermes/works/WorkDetail';

export const metadata = {
  title: 'A work | The Tapestry | Sovereign Sanctuary',
  description: 'A work, here because it was made',
};

export default function WorkDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <WorkDetail />
    </Page>
  );
}

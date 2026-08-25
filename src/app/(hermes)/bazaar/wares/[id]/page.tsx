// src/app/(hermes)/bazaar/wares/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { WareDetail } from '@/components/asgard/domains/hermes/wares/WareDetail';

export const metadata = {
  title: 'Work | The Tapestry | Sovereign Sanctuary',
  description: 'A sovereign offering',
};

export default function WareDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <WareDetail />
    </Page>
  );
}
// src/app/(hestia)/vessel/constellation/[id]/page.tsx

import { Page } from '@/components/bifrost/Page';
import { ConstellationDetail } from '@/components/asgard/domains/hestia/constellation/ConstellationDetail';

export const metadata = {
  title: 'Connection | Constellation | Sovereign Sanctuary',
  description: 'A thread in your sovereign web',
};

export default function ConstellationDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ConstellationDetail />
    </Page>
  );
}
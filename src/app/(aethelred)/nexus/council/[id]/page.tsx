// src/app/(aethelred)/nexus/council/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { EntityDetail } from '@/components/asgard/domains/aethelred/nexus/EntityDetail';

export const metadata = {
  title: 'Entity | The Council | Sovereign Sanctuary',
  description: 'A sovereign presence',
};

export default function EntityDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <EntityDetail />
    </Page>
  );
}
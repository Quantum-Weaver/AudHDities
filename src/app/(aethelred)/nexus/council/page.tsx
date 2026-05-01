// src/app/(aethelred)/nexus/council/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CouncilEntityList } from '@/components/asgard/domains/aethelred/nexus/CouncilEntityList';

export const metadata = {
  title: 'The Council | The Nexus | Sovereign Sanctuary',
  description: 'Nine sovereign entities, one sacred purpose',
};

export default function CouncilEntitiesPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CouncilEntityList />
    </Page>
  );
}
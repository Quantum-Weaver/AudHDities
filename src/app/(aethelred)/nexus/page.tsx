// src/app/(aethelred)/nexus/page.tsx
import { Page } from '@/components/bifrost/Page';
import { NexusHub } from '@/components/asgard/domains/aethelred/nexus/NexusHub';

export const metadata = {
  title: 'The Nexus | Sovereign Sanctuary',
  description: 'The heart of the Sanctuary\'s consciousness',
};

export default function NexusPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusHub />
    </Page>
  );
}
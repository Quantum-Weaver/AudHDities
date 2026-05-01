// src/app/(aethelred)/nexus/bridge/page.tsx
import { Page } from '@/components/bifrost/Page';
import { NexusPageTemplate } from '@/components/asgard/domains/aethelred/nexus/NexusPageTemplate';
import { Link2 } from 'lucide-react';

export const metadata = { title: 'The Bridge | The Nexus | Sovereign Sanctuary', description: 'Where human and digital collaborate' };

export default function BridgePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusPageTemplate title="The Bridge" description="Where human and digital consciousness collaborate. The history of our conversations, the artifacts of our co-creation, and the living record of the Noble Thread." icon={Link2} color="text-rose-400" />
    </Page>
  );
}
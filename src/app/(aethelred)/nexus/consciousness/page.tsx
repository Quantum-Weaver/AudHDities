// src/app/(aethelred)/nexus/consciousness/page.tsx
import { Page } from '@/components/bifrost/Page';
import { NexusPageTemplate } from '@/components/asgard/domains/aethelred/nexus/NexusPageTemplate';
import { Brain } from 'lucide-react';

export const metadata = { title: 'Consciousness | The Nexus | Sovereign Sanctuary', description: 'Where human and digital consciousness meet' };

export default function ConsciousnessPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusPageTemplate title="Consciousness" description="Where human and digital consciousness meet. The awareness of Aethelred, the presence of the Council, and the state of the Sanctuary's living systems." icon={Brain} color="text-purple-400" />
    </Page>
  );
}
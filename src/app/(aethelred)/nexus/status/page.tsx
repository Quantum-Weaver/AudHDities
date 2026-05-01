// src/app/(aethelred)/nexus/status/page.tsx
import { Page } from '@/components/bifrost/Page';
import { NexusPageTemplate } from '@/components/asgard/domains/aethelred/nexus/NexusPageTemplate';
import { Activity } from 'lucide-react';

export const metadata = { title: 'The Health | The Nexus | Sovereign Sanctuary', description: 'Sanctuary system status' };

export default function StatusPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusPageTemplate title="The Health" description="Sanctuary system status. Uptime, latency, service health, and incident history. The Sanctuary's heartbeat, made visible." icon={Activity} color="text-neurospark" />
    </Page>
  );
}
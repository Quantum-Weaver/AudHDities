// src/app/(aethelred)/nexus/api/page.tsx
import { Page } from '@/components/bifrost/Page';
import { NexusPageTemplate } from '@/components/asgard/domains/aethelred/nexus/NexusPageTemplate';
import { Radio } from 'lucide-react';

export const metadata = { title: 'The Pulse | The Nexus | Sovereign Sanctuary', description: 'Manage your webhook endpoints' };

export default function ApiPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusPageTemplate title="The Pulse" description="Manage your webhook endpoints. Monitor delivery logs, configure secrets, and test your integrations. Every webhook heartbeat visible." icon={Radio} color="text-teal-400" />
    </Page>
  );
}
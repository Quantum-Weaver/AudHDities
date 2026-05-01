// src/app/(aethelred)/nexus/integrations/page.tsx
import { Page } from '@/components/bifrost/Page';
import { NexusPageTemplate } from '@/components/asgard/domains/aethelred/nexus/NexusPageTemplate';
import { PlugZap } from 'lucide-react';

export const metadata = { title: 'Integrations | The Nexus | Sovereign Sanctuary', description: 'Connect your external services' };

export default function IntegrationsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusPageTemplate title="Integrations" description="Connect your external services. Stripe for payments, GitHub for code, Supabase for data, Resend for emails, Vercel for deployment — all visible, all transparent." icon={PlugZap} color="text-emerald-400" />
    </Page>
  );
}
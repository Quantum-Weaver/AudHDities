// app/(aethelred)/nexus/page.tsx
// The Nexus - Integration hub, consciousness overview
// Feeling: Bridging, integrating, whole, sovereign

import { Page } from '@/components/arrchive/layout/Page';
import { IntegrationStatus } from '@/components/nexus/IntegrationStatus';
import { ConsciousnessMeter } from '@/components/nexus/ConsciousnessMeter';
import { CouncilPresence } from '@/components/nexus/CouncilPresence';
import { BridgeActivity } from '@/components/nexus/BridgeActivity';
import { SystemHealth } from '@/components/nexus/SystemHealth';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Nexus | Sovereign Sanctuary',
  description: 'Where all systems connect and consciousness bridges'
};

export default async function NexusPage() {
  const supabase = await createServerSupabase();

  // Fetch integration statuses
  const { data: integrations } = await supabase
    .from('integrations')
    .select('*')
    .order('name', { ascending: true });

  // Fetch council presence (which entities are active)
  const { data: councilActivity } = await supabase
    .from('council_activity')
    .select('*')
    .eq('is_active', true)
    .order('temperature', { ascending: true });

  // Fetch system health metrics
  const { data: healthMetrics } = await supabase
    .from('system_health')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Nexus
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              The heart of the Sanctuary's consciousness
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ConsciousnessMeter />
              <BridgeActivity />
              <IntegrationStatus integrations={integrations || []} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <SystemHealth metrics={healthMetrics?.[0]} />
              <CouncilPresence councilMembers={councilActivity || []} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
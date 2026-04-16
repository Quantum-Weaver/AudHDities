// app/(aethelred)/nexus/status/page.tsx
// The Health - System status, health metrics
// Feeling: Secure, transparent, reliable

import { Page } from '@/components/arrchive/layout/Page';
import { SystemMetrics } from '@/components/nexus/SystemMetrics';
import { ServiceStatus } from '@/components/nexus/ServiceStatus';
import { IncidentHistory } from '@/components/nexus/IncidentHistory';
import { UptimeDisplay } from '@/components/nexus/UptimeDisplay';
import { AlertSettings } from '@/components/nexus/AlertSettings';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Health | Sovereign Sanctuary',
  description: 'System status and health metrics'
};

export default async function StatusPage() {
  const supabase = await createServerSupabase();

  const { data: services } = await supabase
    .from('service_status')
    .select('*')
    .order('name', { ascending: true });

  const { data: incidents } = await supabase
    .from('incidents')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const { data: metrics } = await supabase
    .from('system_metrics')
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
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Health
            </h1>
            <p className="text-white/60">
              Sanctuary system status
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <SystemMetrics metrics={metrics?.[0]} />
              <IncidentHistory incidents={incidents || []} />
            </div>
            <div className="space-y-8">
              <UptimeDisplay />
              <ServiceStatus services={services || []} />
              <AlertSettings />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
// app/(hestia)/vessel/page.tsx

import { Page } from '@/components/bifrost/Page';
import { VesselContent } from '@/components/asgard/domains/hestia/vessel/VesselContent';
import VelkominGreeting from '@/components/asgard/auth/VelkominGreeting';

export const metadata = {
  title: 'The Vessel | Sovereign Sanctuary',
  description: 'Your sovereign self'
};

export default function VesselPage() {
  return (
    <Page
      showForeground={false}
      showContinuityBeam={true}
    >
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* THE THRESHOLDS). /vessel is AUTH_ROUTES.DASHBOARD's honest      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <VelkominGreeting />
      <main className="min-h-screen py-12 ">
        <div className="container max-w-4xl mx-auto px-6">
          <VesselContent />
        </div>
      </main>
    </Page>
  );
}
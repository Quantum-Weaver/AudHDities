// app/(hestia)/vessel/page.tsx
// The Vessel - User profile, sovereignty, contributions
// Feeling: Reflective, sovereign, whole

import { Page } from '@/components/bifrost/Page';
import { VesselContent } from '@/components/asgard/domains/hestia/vessel/VesselContent';

export const metadata = {
  title: 'The Vessel | Sovereign Sanctuary',
  description: 'Your sovereign self'
};

export default function VesselPage() {
  return (
    <Page 
      variant={2}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <VesselContent />
        </div>
      </main>
    </Page>
  );
}
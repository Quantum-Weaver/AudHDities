// app/(hestia)/vessel/page.tsx
// The Vessel - User profile, sovereignty, contributions
// Feeling: Reflective, sovereign, whole

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Vessel | Sovereign Sanctuary',
  description: 'Your sovereign self'
};

export default async function VesselPage() {
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
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}
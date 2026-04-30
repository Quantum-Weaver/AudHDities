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
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12 ">
        <div className="min-h-auto relative">
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'var(--gradient-weaver)',
              opacity: 0.75
            }} 
          />
            <div className="relative z-10 container max-w-4xl mx-auto px-6">
            <VesselContent />
          </div>
        </div>
      </main>
    </Page>
  );
}
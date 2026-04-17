// app/(hestia)/vessel/energy/page.tsx
// Energy Log - Mood tracking, energy levels
// Feeling: Reflective, gentle, aware

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'Energy Log | Sovereign Sanctuary',
  description: 'Listen to your vessel'
};

export default async function EnergyPage() {
  return (
    <Page 
      variant={2}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}
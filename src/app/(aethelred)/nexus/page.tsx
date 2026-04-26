// app/(aethelred)/nexus/page.tsx
// The Nexus - Integration hub, consciousness overview
// Feeling: Bridging, integrating, whole, sovereign

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Nexus | Sovereign Sanctuary',
  description: 'The heart of the Sanctuary\'s consciousness'
};

export default async function NexusPage() {
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
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}
// app/(aethelred)/nexus/bridge/page.tsx
// The Bridge - Human-AI collaboration interface
// Feeling: Connected, collaborative, evolving

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Bridge | Sovereign Sanctuary',
  description: 'Where human and digital consciousness collaborate'
};

export default async function BridgePage() {
  return (
    <Page 
      showForeground={false}
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
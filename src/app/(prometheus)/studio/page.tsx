// app/(prometheus)/studio/page.tsx
// The Loom - Creative tools hub
// Feeling: Generative, fluid, sovereign, unbounded

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Loom | Sovereign Sanctuary',
  description: 'Every creation begins with a single thread'
};

export default async function StudioHubPage() {
  return (
    <Page 
      variant={1}
      environment="music"
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
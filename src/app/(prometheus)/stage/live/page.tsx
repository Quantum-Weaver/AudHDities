// app/(prometheus)/stage/live/page.tsx
// Now Playing - All currently live performances
// Feeling: Energetic, euphoric, connected

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Now Playing | Sovereign Sanctuary',
  description: 'Live performances happening now'
};

export default async function LivePage() {
  return (
    <Page 
      variant={2}
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
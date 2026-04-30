// app/(prometheus)/stage/page.tsx
// The Stage - Live performances hub
// Feeling: Energetic, creative, flowing, euphoric

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Stage | Sovereign Sanctuary',
  description: 'Where sovereign souls share their gifts'
};

export default async function StagePage() {
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
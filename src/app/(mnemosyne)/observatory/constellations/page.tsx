// app/(mnemosyne)/observatory/constellations/page.tsx
// Constellations - Connection web, collaboration map
// Feeling: Cosmic, interconnected, beautiful

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'Constellations | Sovereign Sanctuary',
  description: 'The web of connection'
};

export default async function ConstellationsPage() {
  return (
    <Page 
      variant={2}
      environment="observatory"
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
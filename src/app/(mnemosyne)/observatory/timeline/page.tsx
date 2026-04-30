// app/(mnemosyne)/observatory/timeline/page.tsx
// The Spiral - Personal journey timeline
// Feeling: Reflective, dimensional, revealing

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Spiral | Sovereign Sanctuary',
  description: 'Your journey through time'
};

export default async function TimelinePage() {
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
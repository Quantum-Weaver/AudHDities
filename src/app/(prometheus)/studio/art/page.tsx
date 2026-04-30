// app/(prometheus)/studio/art/page.tsx
// Art Studio - Draw, paint, design
// Feeling: Creative, fluid, expressive

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Art Studio | Sovereign Sanctuary',
  description: 'Paint your reality'
};

export default async function ArtStudioPage() {
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
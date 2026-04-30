// app/(prometheus)/studio/animation/page.tsx
// Animation Studio - Frame-by-frame, motion graphics
// Feeling: Generative, fluid, magical

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Animation Studio | Sovereign Sanctuary',
  description: 'Bring your imagination to life'
};

export default async function AnimationStudioPage() {
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
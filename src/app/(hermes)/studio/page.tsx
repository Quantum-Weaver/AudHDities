// app/(hermes)/bazaar/studio/page.tsx
// The Loom - Create new product/service
// Feeling: Generative, fluid, sovereign

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Loom | Sovereign Sanctuary',
  description: 'Create your offering'
};

export default async function StudioPage() {
  return (
    <Page 
      variant={1}
      environment="music"
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
// app/(hermes)/bazaar/creators/page.tsx
// Creators - Directory of sovereign creators
// Feeling: Inspiring, connected, diverse

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Creators | Sovereign Sanctuary',
  description: 'Meet the weavers'
};

export default async function CreatorsPage() {
  return (
    <Page 
      variant={2}
      environment="community"
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
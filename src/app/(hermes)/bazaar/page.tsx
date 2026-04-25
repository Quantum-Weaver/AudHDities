// app/(hermes)/bazaar/page.tsx
// The Bazaar - Marketplace hub
// Feeling: Abundant, curious, playful, connected

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Bazaar | Sovereign Sanctuary',
  description: 'Discover creations from sovereign souls'
};

export default async function BazaarPage() {
  return (
    <Page 
      variant={1}
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
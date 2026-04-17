// app/(mnemosyne)/observatory/origin/page.tsx
// The Origin - Beginning of all journeys
// Feeling: Sacred, awakening, primordial

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Origin | Sovereign Sanctuary',
  description: 'Where it all began'
};

export default async function OriginPage() {
  return (
    <Page 
      variant={1}
      environment="origin"
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
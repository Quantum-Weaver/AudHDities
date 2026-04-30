// app/(mnemosyne)/observatory/ancestors/page.tsx
// Ancestors - Honoring past contributors
// Feeling: Sacred, honoring, connected

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Ancestors | Sovereign Sanctuary',
  description: 'Those who came before'
};

export default async function AncestorsPage() {
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
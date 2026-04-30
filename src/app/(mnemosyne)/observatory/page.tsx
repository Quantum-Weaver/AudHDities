// app/(mnemosyne)/observatory/page.tsx
// The Observatory - Memory and vision hub
// Feeling: Awe-inspiring, reflective, cosmic, visionary

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Observatory | Sovereign Sanctuary',
  description: 'Where memory meets vision'
};

export default async function ObservatoryPage() {
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
// app/(prometheus)/studio/effects/page.tsx

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Effects Lab | Sovereign Sanctuary',
  description: 'Weave magic into your creations'
};

export default async function EffectsLabPage() {
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
        </div>
      </main>
    </Page>
  );
}
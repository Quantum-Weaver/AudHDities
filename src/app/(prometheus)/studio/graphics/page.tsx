// app/(prometheus)/studio/graphics/page.tsx

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Graphics Lab | Sovereign Sanctuary',
  description: 'Weave magic into your creations'
};

export default async function GraphicsLabPage() {
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
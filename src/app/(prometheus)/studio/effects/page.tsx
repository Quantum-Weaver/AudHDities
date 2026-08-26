// app/(cosmic)/effects/page.tsx

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Grimoire | Sovereign Sanctuary',
  description: 'Ancient effects for the modern weaver'
};

export default async function EffectsPage() {
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
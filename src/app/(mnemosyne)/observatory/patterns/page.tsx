// app/(mnemosyne)/observatory/patterns/page.tsx
// Pattern Recognition - Insights from data
// Feeling: Revealing, intelligent, illuminating

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Pattern Recognition | Sovereign Sanctuary',
  description: 'See what emerges'
};

export default async function PatternsPage() {
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
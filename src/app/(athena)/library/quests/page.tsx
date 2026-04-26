// app/(athena)/library/quests/page.tsx
// The Path - All available quests
// Feeling: Adventurous, purposeful, rewarding

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Path | Sovereign Sanctuary',
  description: 'Your journey awaits'
};

export default async function QuestsPage() {
  return (
    <Page 
      variant={2}
      environment="library"
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
// app/(prometheus)/stage/schedule/page.tsx
// The Calendar - Upcoming performance schedule
// Feeling: Anticipatory, organized, community-driven

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Calendar | Sovereign Sanctuary',
  description: 'Upcoming performances'
};

export default async function SchedulePage() {
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
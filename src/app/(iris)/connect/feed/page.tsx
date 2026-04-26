// app/(iris)/connect/feed/page.tsx
// The Pulse - Social feed, activity stream
// Feeling: Alive, connected, informed

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Pulse | Sovereign Sanctuary',
  description: 'What\'s resonating in the Sanctuary'
};

export default async function FeedPage() {
  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}
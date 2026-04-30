// app/(themis)/council/voting/page.tsx
// The Vote - Active voting opportunities
// Feeling: Engaged, empowered, responsible

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Vote | Sovereign Sanctuary',
  description: 'Your voice shapes the Sanctuary'
};

export default async function VotingPage() {
  return (
    <Page 
      showForeground={false}
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
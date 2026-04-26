// app/(prometheus)/stage/comedy/page.tsx
// The Comedy Hearth - Comedy performances hub
// Feeling: Playful, intimate, joyful

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Comedy Hearth | Sovereign Sanctuary',
  description: 'Where laughter heals'
};

export default async function ComedyPage() {
  return (
    <Page 
      variant={1}
      environment="lounge"
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
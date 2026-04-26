// app/(prometheus)/stage/recordings/page.tsx
// The Echo - Past performance recordings
// Feeling: Nostalgic, reflective, celebratory

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Echo | Sovereign Sanctuary',
  description: 'Past performances live on'
};

export default async function RecordingsPage() {
  return (
    <Page 
      variant={2}
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
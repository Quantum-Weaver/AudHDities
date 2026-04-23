// app/(hermes)/bazaar/creators/[id]/page.tsx
// Creator Sanctuary - Single creator profile
// Feeling: Honoring, inspiring, connected

import { Page } from '@/components/shared/Page';

interface CreatorSanctuaryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CreatorSanctuaryPageProps) {
  const { id } = await params;
  return {
    title: `Creator ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Their sovereign journey'
  };
}

export default async function CreatorSanctuaryPage({ params }: CreatorSanctuaryPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Creator ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
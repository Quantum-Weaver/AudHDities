// app/(prometheus)/stage/schedule/[id]/page.tsx
// Event Detail - Single scheduled event view
// Feeling: Anticipatory, excited, prepared

import { Page } from '@/components/bifrost/Page';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { id } = await params;
  return {
    title: `Event ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A moment to anticipate'
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Event ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
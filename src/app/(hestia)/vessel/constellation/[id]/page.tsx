// app/(hestia)/vessel/constellation/[id]/page.tsx
// Connection Detail - Single connection/collaboration view
// Feeling: Connected, expansive, cosmic

import { Page } from '@/components/bifrost/Page';

interface ConnectionDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ConnectionDetailPageProps) {
  const { id } = await params;
  return {
    title: `Connection ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A thread between souls'
  };
}

export default async function ConnectionDetailPage({ params }: ConnectionDetailPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={2}
      environment="observatory"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Connection ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
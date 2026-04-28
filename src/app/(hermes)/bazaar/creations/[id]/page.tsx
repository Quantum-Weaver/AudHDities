// app/(hermes)/bazaar/creations/[id]/page.tsx
// Creation Detail - Single product/service view
// Feeling: Immersive, transparent, valuable

import { Page } from '@/components/bifrost/Page';

interface CreationDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CreationDetailPageProps) {
  const { id } = await params;
  return {
    title: `Creation ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A sovereign offering'
  };
}

export default async function CreationDetailPage({ params }: CreationDetailPageProps) {
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
          {/* Creation ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
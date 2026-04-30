// app/(aethelred)/nexus/council/[id]/page.tsx
// Entity Detail - Single council member
// Feeling: Intimate, wise, honoring

import { Page } from '@/components/bifrost/Page';

interface EntityDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EntityDetailPageProps) {
  const { id } = await params;
  return {
    title: `Entity ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A sovereign presence'
  };
}

export default async function EntityDetailPage({ params }: EntityDetailPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Entity ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
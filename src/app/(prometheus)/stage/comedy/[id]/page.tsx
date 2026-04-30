// app/(prometheus)/stage/comedy/[id]/page.tsx
// Comedy Special - Single comedy performance view
// Feeling: Joyful, intimate, hilarious

import { Page } from '@/components/bifrost/Page';

interface ComedySpecialPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ComedySpecialPageProps) {
  const { id } = await params;
  return {
    title: `Comedy Special ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Joy is sacred'
  };
}

export default async function ComedySpecialPage({ params }: ComedySpecialPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Comedy Special ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
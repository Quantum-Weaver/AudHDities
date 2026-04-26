// app/(athena)/library/knowledge/[id]/page.tsx
// Scroll Detail - Single knowledge article
// Feeling: Sacred, enlightening, timeless

import { Page } from '@/components/bifrost/Page';

interface ScrollDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ScrollDetailPageProps) {
  const { id } = await params;
  return {
    title: `Scroll ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Ancient words, eternal truth'
  };
}

export default async function ScrollDetailPage({ params }: ScrollDetailPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Article ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
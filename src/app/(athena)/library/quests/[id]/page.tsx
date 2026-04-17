// app/(athena)/library/quests/[id]/page.tsx
// Quest Detail - Single quest view
// Feeling: Challenging, rewarding, transformative

import { Page } from '@/components/shared/Page';

interface QuestDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: QuestDetailPageProps) {
  const { id } = await params;
  return {
    title: `Quest ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A step toward sovereignty'
  };
}

export default async function QuestDetailPage({ params }: QuestDetailPageProps) {
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
          {/* Quest ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
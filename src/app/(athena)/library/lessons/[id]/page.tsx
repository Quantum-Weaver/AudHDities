// app/(athena)/library/lessons/[id]/page.tsx
// The Lesson - Single lesson content
// Feeling: Focused, absorbing, enlightening

import { Page } from '@/components/shared/Page';

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { id } = await params;
  return {
    title: `Lesson ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Wisdom unfolds'
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
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
          {/* Lesson ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
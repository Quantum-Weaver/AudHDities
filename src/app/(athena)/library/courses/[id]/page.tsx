// app/(athena)/library/courses/[id]/page.tsx
// Course View - Single course with lessons
// Feeling: Structured, progressive, empowering

import { Page } from '@/components/shared/Page';

interface CourseViewPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CourseViewPageProps) {
  const { id } = await params;
  return {
    title: `Course ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Your learning path'
  };
}

export default async function CourseViewPage({ params }: CourseViewPageProps) {
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
          {/* Course ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
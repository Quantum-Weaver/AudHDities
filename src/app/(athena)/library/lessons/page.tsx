// app/(athena)/library/lessons/page.tsx
// The Lesson Path - All lessons across all courses
// Feeling: Structured, progressive, empowering

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Lesson Path | Sovereign Sanctuary',
  description: 'Every lesson is a step toward mastery'
};

export default async function LessonsPage() {
  return (
    <Page 
      variant={2}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}
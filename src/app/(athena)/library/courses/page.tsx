// app/(athena)/library/courses/page.tsx
// The Curriculum - Structured learning paths
// Feeling: Organized, progressive, empowering

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Curriculum | Sovereign Sanctuary',
  description: 'Structured wisdom'
};

export default async function CoursesPage() {
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
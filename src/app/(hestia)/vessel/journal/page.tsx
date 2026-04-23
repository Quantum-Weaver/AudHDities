// app/(hestia)/vessel/journal/page.tsx
// The Scroll - Personal journal, reflections
// Feeling: Peaceful, reflective, sacred

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Scroll | Sovereign Sanctuary',
  description: 'Your words, your story, your truth'
};

export default async function JournalPage() {
  return (
    <Page 
      variant={2}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}
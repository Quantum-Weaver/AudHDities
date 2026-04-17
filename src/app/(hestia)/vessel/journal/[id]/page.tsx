// app/(hestia)/vessel/journal/[id]/page.tsx
// Journal Entry - Single journal entry view
// Feeling: Peaceful, reflective, sacred

import { Page } from '@/components/shared/Page';

interface JournalEntryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: JournalEntryPageProps) {
  const { id } = await params;
  return {
    title: `Journal Entry ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A page from your story'
  };
}

export default async function JournalEntryPage({ params }: JournalEntryPageProps) {
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
          {/* Journal entry ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
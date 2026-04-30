// app/(prometheus)/stage/recordings/[id]/page.tsx
// Recording - Single recorded performance view
// Feeling: Intimate, warm, reflective

import { Page } from '@/components/bifrost/Page';

interface RecordingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: RecordingPageProps) {
  const { id } = await params;
  return {
    title: `Recording ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A moment preserved'
  };
}

export default async function RecordingPage({ params }: RecordingPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Recording ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
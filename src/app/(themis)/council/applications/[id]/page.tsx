// app/(themis)/council/applications/[id]/page.tsx
// Application Detail - Single application view
// Feeling: Detailed, hopeful, transparent

import { Page } from '@/components/shared/Page';

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ApplicationDetailPageProps) {
  const { id } = await params;
  return {
    title: `Application ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Your journey begins here'
  };
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={1}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Application ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
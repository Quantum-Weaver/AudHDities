// app/(themis)/council/applications/[id]/page.tsx

import { Page } from '@/components/bifrost/Page';

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
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Application ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
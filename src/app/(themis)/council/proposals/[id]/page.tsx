// app/(themis)/council/proposals/[id]/page.tsx
// Proposal Detail - Single proposal view
// Feeling: Contemplative, engaged, empowered

import { Page } from '@/components/shared/Page';

interface ProposalDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProposalDetailPageProps) {
  const { id } = await params;
  return {
    title: `Proposal ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A voice in the collective'
  };
}

export default async function ProposalDetailPage({ params }: ProposalDetailPageProps) {
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
          {/* Proposal ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
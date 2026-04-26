// app/(iris)/connect/support/[id]/page.tsx
// Support Thread - Individual support conversation
// Feeling: Safe, responsive, caring

import { Page } from '@/components/bifrost/Page';

interface SupportThreadPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SupportThreadPageProps) {
  const { id } = await params;
  return {
    title: `Support Thread ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Your voice matters'
  };
}

export default async function SupportThreadPage({ params }: SupportThreadPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={2}
      environment="support"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Support Ticket ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
// app/(iris)/connect/messages/[id]/page.tsx
// Conversation - Single message thread
// Feeling: Intimate, connected, flowing

import { Page } from '@/components/shared/Page';

interface ConversationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ConversationPageProps) {
  const { id } = await params;
  return {
    title: `Conversation ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A thread between souls'
  };
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Conversation ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
// app/(iris)/connect/channels/[id]/page.tsx
// Channel View - Single channel view
// Feeling: Connected, engaged, communal

import { Page } from '@/components/bifrost/Page';

interface ChannelViewPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ChannelViewPageProps) {
  const { id } = await params;
  return {
    title: `Channel ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A space for connection'
  };
}

export default async function ChannelViewPage({ params }: ChannelViewPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={2}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Channel ID: {id} */}
        </div>
      </main>
    </Page>
  );
}
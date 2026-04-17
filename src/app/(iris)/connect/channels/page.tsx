// app/(iris)/connect/channels/page.tsx
// Channels - Public and private channels
// Feeling: Communal, organized, discoverable

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'Channels | Sovereign Sanctuary',
  description: 'Find your community'
};

export default async function ChannelsPage() {
  return (
    <Page 
      variant={1}
      environment="community"
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
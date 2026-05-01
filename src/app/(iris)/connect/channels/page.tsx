// src/app/(iris)/connect/channels/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ChannelsGallery } from '@/components/asgard/domains/iris/channels/ChannelsGallery';

export const metadata = {
  title: 'Channels | The Bridge | Sovereign Sanctuary',
  description: 'Find your community',
};

export default function ChannelsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ChannelsGallery />
    </Page>
  );
}
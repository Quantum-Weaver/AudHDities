// src/app/(iris)/connect/channels/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ChannelView } from '@/components/asgard/domains/iris/channels/ChannelView';

export const metadata = {
  title: 'Channel | The Bridge | Sovereign Sanctuary',
  description: 'A space for connection',
};

export default function ChannelDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ChannelView />
    </Page>
  );
}
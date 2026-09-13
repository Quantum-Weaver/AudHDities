// src/app/(prometheus)/studio/video/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { Video } from 'lucide-react';

export const metadata = {
  title: 'Video Studio | The Loom | Sovereign Sanctuary',
  description: 'Where moments become eternal',
};

export default function VideoStudioRoomPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="Video Studio"
        description="This room will be where a vessel cuts and assembles moving pictures."
        icon={Video}
        color="text-rose-400"
        backHref="/studio"
        backLabel="Return to the Loom"
        standing="Nothing is built in this room yet."
      />
    </Page>
  );
}

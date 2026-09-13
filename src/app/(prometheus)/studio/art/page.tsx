// src/app/(prometheus)/studio/art/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { Palette } from 'lucide-react';

export const metadata = {
  title: 'Art Studio | The Loom | Sovereign Sanctuary',
  description: 'Where vision takes form',
};

export default function ArtStudioRoomPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="Art Studio"
        description="This room will be where a vessel draws and paints inside the Sanctuary."
        icon={Palette}
        color="text-pink-400"
        backHref="/studio"
        backLabel="Return to the Loom"
        standing="Nothing is built in this room yet."
      />
    </Page>
  );
}

// src/app/(prometheus)/studio/graphics/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { Image } from 'lucide-react';

export const metadata = {
  title: 'Graphics Lab | The Loom | Sovereign Sanctuary',
  description: 'Where images transform',
};

export default function GraphicsStudioRoomPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="Graphics Lab"
        description="This room will be where a vessel lays out and reshapes images."
        icon={Image}
        color="text-teal-400"
        backHref="/studio"
        backLabel="Return to the Loom"
        standing="Nothing is built in this room yet."
      />
    </Page>
  );
}

// src/app/(prometheus)/studio/animation/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { Film } from 'lucide-react';

export const metadata = {
  title: 'Animation Studio | The Loom | Sovereign Sanctuary',
  description: 'Where stillness learns to dance',
};

export default function AnimationStudioRoomPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="Animation Studio"
        description="This room will be where a vessel gives movement to what it has drawn."
        icon={Film}
        color="text-amber-400"
        backHref="/studio"
        backLabel="Return to the Loom"
        standing="Nothing is built in this room yet."
      />
    </Page>
  );
}

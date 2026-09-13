// src/app/(prometheus)/studio/effects/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { Wand2 } from 'lucide-react';

export const metadata = {
  title: 'Effects Lab | The Loom | Sovereign Sanctuary',
  description: 'Where magic is engineered',
};

export default function EffectsStudioRoomPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="Effects Lab"
        description="This room will be where a vessel lays the Sanctuary's visual effects over its own work."
        icon={Wand2}
        color="text-violet-400"
        backHref="/studio"
        backLabel="Return to the Loom"
        standing="Nothing is built in this room yet."
      />
    </Page>
  );
}

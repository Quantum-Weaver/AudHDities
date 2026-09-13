// src/app/(prometheus)/studio/audio/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { Mic } from 'lucide-react';

export const metadata = {
  title: 'Audio Studio | The Loom | Sovereign Sanctuary',
  description: 'Where silence finds its voice',
};

export default function AudioStudioRoomPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="Audio Studio"
        description="This room will be where a vessel records and shapes sound."
        icon={Mic}
        color="text-emerald-400"
        backHref="/studio"
        backLabel="Return to the Loom"
        standing="Nothing is built in this room yet."
      />
    </Page>
  );
}

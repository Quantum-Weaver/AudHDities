// src/app/(prometheus)/studio/writing/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { PenTool } from 'lucide-react';

export const metadata = {
  title: 'Writing Studio | The Loom | Sovereign Sanctuary',
  description: 'Where words weave worlds',
};

export default function WritingStudioRoomPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="Writing Studio"
        description="This room will be where a vessel writes and shapes a manuscript."
        icon={PenTool}
        color="text-cyan-400"
        backHref="/studio"
        backLabel="Return to the Loom"
        standing="Nothing is built in this room yet."
      />
    </Page>
  );
}

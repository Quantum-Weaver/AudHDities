// src/app/(prometheus)/studio/export/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { Download } from 'lucide-react';

export const metadata = {
  title: 'The Gateway | The Loom | Sovereign Sanctuary',
  description: 'Where creations enter the world',
};

export default function ExportStudioRoomPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="The Gateway"
        description="This room will be where a finished creation leaves the Loom for the Bazaar or for the vessel's own keeping."
        icon={Download}
        color="text-neurospark"
        backHref="/studio"
        backLabel="Return to the Loom"
        standing="Nothing is built in this room yet."
      />
    </Page>
  );
}

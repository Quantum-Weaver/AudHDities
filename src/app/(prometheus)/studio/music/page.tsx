// src/app/(prometheus)/studio/music/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioPageTemplate } from '@/components/asgard/domains/prometheus/studio/StudioPageTemplate';
import { Music } from 'lucide-react';

export const metadata = { title: 'Music Studio | The Loom | Sovereign Sanctuary', description: 'Where sound becomes substance' };

export default function MusicStudioPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioPageTemplate
        title="Music Studio"
        description="Where sound becomes substance. Compose, record, mix, and master your sovereign sound."
        icon={Music}
        color="text-purple-400"
        backHref="/studio"
        backLabel="Return to the Loom"
      />
    </Page>
  );
}
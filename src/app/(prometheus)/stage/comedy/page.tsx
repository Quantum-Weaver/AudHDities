// src/app/(prometheus)/stage/comedy/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ComedyGallery } from '@/components/asgard/domains/prometheus/stage/ComedyGallery';

export const metadata = {
  title: 'The Comedy Hearth | The Stage | Sovereign Sanctuary',
  description: 'Where laughter heals',
};

export default function ComedyPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ComedyGallery />
    </Page>
  );
}
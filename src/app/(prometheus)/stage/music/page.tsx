// src/app/(prometheus)/stage/music/page.tsx
import { Page } from '@/components/bifrost/Page';
import { MusicGallery } from '@/components/asgard/domains/prometheus/stage/MusicGallery';

export const metadata = {
  title: 'The Music Realm | The Stage | Sovereign Sanctuary',
  description: 'Where sound becomes substance',
};

export default function MusicPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <MusicGallery />
    </Page>
  );
}
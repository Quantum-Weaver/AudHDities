// src/app/(prometheus)/stage/music/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { MusicDetail } from '@/components/asgard/domains/prometheus/stage/MusicDetail';

export default function MusicDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <MusicDetail />
    </Page>
  );
}
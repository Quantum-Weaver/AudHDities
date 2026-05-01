// src/app/(prometheus)/stage/live/page.tsx
import { Page } from '@/components/bifrost/Page';
import { LiveGallery } from '@/components/asgard/domains/prometheus/stage/LiveGallery';

export const metadata = {
  title: 'Now Playing | The Stage | Sovereign Sanctuary',
  description: 'Live performances happening now',
};

export default function LivePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <LiveGallery />
    </Page>
  );
}
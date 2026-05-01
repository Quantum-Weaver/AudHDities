// src/app/(prometheus)/stage/live/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { LiveDetail } from '@/components/asgard/domains/prometheus/stage/LiveDetail';

export default function LiveDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <LiveDetail />
    </Page>
  );
}
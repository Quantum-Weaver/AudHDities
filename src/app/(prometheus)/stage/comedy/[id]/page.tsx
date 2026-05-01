// src/app/(prometheus)/stage/comedy/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ComedyDetail } from '@/components/asgard/domains/prometheus/stage/ComedyDetail';

export default function ComedyDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ComedyDetail />
    </Page>
  );
}
// src/app/(prometheus)/stage/recordings/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { RecordingDetail } from '@/components/asgard/domains/prometheus/stage/RecordingDetail';

export default function RecordingDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <RecordingDetail />
    </Page>
  );
}
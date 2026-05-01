// src/app/(prometheus)/stage/schedule/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { EventDetail } from '@/components/asgard/domains/prometheus/stage/EventDetail';

export default function EventDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <EventDetail />
    </Page>
  );
}
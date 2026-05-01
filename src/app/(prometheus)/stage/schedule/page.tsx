// src/app/(prometheus)/stage/schedule/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ScheduleGallery } from '@/components/asgard/domains/prometheus/stage/ScheduleGallery';

export const metadata = {
  title: 'The Calendar | The Stage | Sovereign Sanctuary',
  description: 'Upcoming performances',
};

export default function SchedulePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ScheduleGallery />
    </Page>
  );
}
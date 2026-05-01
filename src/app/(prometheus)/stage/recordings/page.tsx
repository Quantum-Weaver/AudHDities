// src/app/(prometheus)/stage/recordings/page.tsx
import { Page } from '@/components/bifrost/Page';
import { RecordingsGallery } from '@/components/asgard/domains/prometheus/stage/RecordingsGallery';

export const metadata = {
  title: 'The Echo | The Stage | Sovereign Sanctuary',
  description: 'Past performances live on',
};

export default function RecordingsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <RecordingsGallery />
    </Page>
  );
}
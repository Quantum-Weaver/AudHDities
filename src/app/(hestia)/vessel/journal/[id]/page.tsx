// src/app/(hestia)/vessel/journal/[id]/page.tsx

import { Page } from '@/components/bifrost/Page';
import { JournalDetail } from '@/components/asgard/domains/hestia/journal/JournalDetail';

export const metadata = {
  title: 'The Scroll | Sovereign Sanctuary',
  description: 'Your words, your story, your truth',
};

export default function JournalDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <JournalDetail />
    </Page>
  );
}
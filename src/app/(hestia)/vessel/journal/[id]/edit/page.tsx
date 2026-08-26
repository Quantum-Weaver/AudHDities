// src/app/(hestia)/vessel/journal/[id]/edit/page.tsx

import { Page } from '@/components/bifrost/Page';
import { JournalEdit } from '@/components/asgard/domains/hestia/journal/JournalEdit';

export const metadata = {
  title: 'Edit Entry | The Scroll | Sovereign Sanctuary',
  description: 'Refine your thread',
};

export default function JournalEditPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <JournalEdit />
    </Page>
  );
}
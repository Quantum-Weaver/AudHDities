// src/app/(hestia)/vessel/journal/page.tsx

import { Page } from '@/components/bifrost/Page';
import  { JournalList } from '@/components/asgard/domains/hestia/journal/JournalList';

export const metadata = {
  title: 'The Scroll | Sovereign Sanctuary',
  description: 'Your words, your story, your truth',
};

export default function JournalPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <JournalList />
    </Page>
  );
}
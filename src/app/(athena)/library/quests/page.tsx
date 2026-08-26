// src/app/(athena)/library/quests/page.tsx

import { Page } from '@/components/bifrost/Page';
import { QuestsGallery } from '@/components/asgard/domains/athena/quests/QuestsGallery';

export const metadata = {
  title: 'The Path | Sovereign Sanctuary',
  description: 'Your journey awaits',
};

export default function QuestsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <QuestsGallery />
    </Page>
  );
}
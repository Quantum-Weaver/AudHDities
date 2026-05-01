// src/app/(athena)/library/quests/[slug]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { QuestDetail } from '@/components/asgard/domains/athena/quests/QuestDetail';

export const metadata = {
  title: 'Quest | The Path | Sovereign Sanctuary',
  description: 'A step toward sovereignty',
};

export default function QuestDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <QuestDetail />
    </Page>
  );
}
// src/app/(athena)/library/badges/[slug]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { BadgeDetail } from '@/components/asgard/domains/athena/badges/BadgeDetail';

export const metadata = {
  title: 'Badge | The Honors | Sovereign Sanctuary',
  description: 'A mark of sovereignty',
};

export default function BadgeDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BadgeDetail />
    </Page>
  );
}
// src/app/(athena)/library/badges/page.tsx
import { Page } from '@/components/bifrost/Page';
import { BadgesGallery } from '@/components/asgard/domains/athena/badges/BadgesGallery';

export const metadata = {
  title: 'The Honors | Sovereign Sanctuary',
  description: 'Badges earned through sovereignty',
};

export default function BadgesPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BadgesGallery />
    </Page>
  );
}
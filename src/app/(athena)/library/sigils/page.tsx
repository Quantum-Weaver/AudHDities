// src/app/(athena)/library/sigils/page.tsx
import { Page } from '@/components/bifrost/Page';
import { SigilsGallery } from '@/components/asgard/domains/athena/sigils/SigilsGallery';

export const metadata = {
  title: 'The Honors | Sovereign Sanctuary',
  description: 'Sigils earned through sovereignty',
};

export default function SigilsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <SigilsGallery />
    </Page>
  );
}

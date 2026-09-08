// src/app/(athena)/library/sigils/[slug]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { SigilDetail } from '@/components/asgard/domains/athena/sigils/SigilDetail';

export const metadata = {
  title: 'Sigil | The Honors | Sovereign Sanctuary',
  description: 'A mark of sovereignty',
};

export default function SigilDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <SigilDetail />
    </Page>
  );
}

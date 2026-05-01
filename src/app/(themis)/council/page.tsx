// src/app/(themis)/council/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CouncilHub } from '@/components/asgard/domains/themis/council/CouncilHub';

export const metadata = {
  title: 'The Council Chamber | Sovereign Sanctuary',
  description: 'Where sovereign voices shape the Sanctuary',
};

export default function CouncilPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CouncilHub />
    </Page>
  );
}
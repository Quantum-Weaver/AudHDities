// src/app/(cosmic)/environments/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { BeingThere } from '@/components/asgard/domains/cosmic/environments/BeingThere';

export const metadata = {
  title: 'Being There | Sovereign Sanctuary',
  description: 'The room is the place',
};

export default function EnvironmentDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BeingThere />
    </Page>
  );
}
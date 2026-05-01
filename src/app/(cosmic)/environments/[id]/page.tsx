// src/app/(cosmic)/environments/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { EnvironmentDetail } from '@/components/asgard/domains/cosmic/environments/EnvironmentDetail';

export const metadata = {
  title: 'Realm Detail | Sovereign Sanctuary',
  description: 'Experience the environment',
};

export default function EnvironmentDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <EnvironmentDetail />
    </Page>
  );
}
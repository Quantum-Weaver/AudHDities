// src/app/(cosmic)/environments/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CrossingHall } from '@/components/asgard/domains/cosmic/environments/CrossingHall';

export const metadata = {
  title: 'The Crossing Hall | Sovereign Sanctuary',
  description: 'Step through a doorway and the sky changes',
};

export default function EnvironmentsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CrossingHall />
    </Page>
  );
}
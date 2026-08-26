// app/(hestia)/vessel/home/page.tsx
import { Page } from '@/components/bifrost/Page';
import SceneRenderer from '@/components/asgard/domains/hestia/vessel/scene/SceneRenderer';

export const metadata = {
  title: 'The Vessel Home | Sovereign Sanctuary',
  description: 'Your home within the Sanctuary — everything stays as you left it',
};

export default function VesselHomePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <SceneRenderer />
    </Page>
  );
}

// app/(hestia)/vessel/home/page.tsx
import { Page } from '@/components/bifrost/Page';
import SceneRenderer from '@/components/asgard/domains/hestia/vessel/scene/SceneRenderer';
import { InteriorDress } from '@/components/asgard/domains/hestia/vessel/scene/InteriorDress';

export const metadata = {
  title: 'The Vessel Home | Sovereign Sanctuary',
  description: 'Your home within the Sanctuary — everything stays as you left it',
};

export default function VesselHomePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <InteriorDress />
      <SceneRenderer />
    </Page>
  );
}

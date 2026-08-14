// app/(hestia)/vessel/home/page.tsx
// THE VESSEL HOME — the majority experience the audiences loved most and the
// build never made (REALM-BOOK, Hestia), given its door by the finishing
// session of THE-FRONTEND-REIMAGINING, 2026-07-29. The scene renderer stands
// here: rooms as composed modules, decorations as placed objects, the garden
// on its own clock — over the database KP built for exactly this.
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

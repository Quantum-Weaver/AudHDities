// src/app/(prometheus)/stage/studio/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StreamSetup } from '@/components/asgard/domains/prometheus/stage/StreamSetup';

export const metadata = {
  title: 'The Studio | The Stage | Sovereign Sanctuary',
  description: 'Prepare your performance',
};

export default function StageStudioPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StreamSetup />
    </Page>
  );
}

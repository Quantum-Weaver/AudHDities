// src/app/(cosmic)/theater/page.tsx
import { Page } from '@/components/bifrost/Page';
import { MovingStage } from './MovingStage';

export const metadata = {
  title: 'The Theater | Sovereign Sanctuary',
  description: 'The moving stylesheets, each effect on a sample',
};

export default function TheaterPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <MovingStage />
    </Page>
  );
}

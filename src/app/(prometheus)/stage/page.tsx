// src/app/(prometheus)/stage/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StageHub } from '@/components/asgard/domains/prometheus/stage/StageHub';

export const metadata = {
  title: 'The Stage | Sovereign Sanctuary',
  description: 'Where sovereign souls share their gifts',
};

export default function StagePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StageHub />
    </Page>
  );
}
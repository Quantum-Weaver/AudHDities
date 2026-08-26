// src/app/(hermes)/bazaar/studio/page.tsx
import { Page } from '@/components/bifrost/Page';
import { StudioShelf } from '@/components/asgard/domains/hermes/studio/StudioShelf';

export const metadata = {
  title: 'Your loom | Sovereign Sanctuary',
  description: 'Everything you have made',
};

export default function StudioPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioShelf />
    </Page>
  );
}

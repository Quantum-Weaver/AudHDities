// src/app/(hermes)/bazaar/creators/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CreatorsGallery } from '@/components/asgard/domains/hermes/creators/CreatorsGallery';

export const metadata = {
  title: 'The Weavers | Sovereign Sanctuary',
  description: 'Meet the creators of the Sanctuary',
};

export default function CreatorsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CreatorsGallery />
    </Page>
  );
}
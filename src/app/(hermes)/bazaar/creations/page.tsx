// src/app/(hermes)/bazaar/creations/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CreationsGallery } from '@/components/asgard/domains/hermes/creations/CreationsGallery';

export const metadata = {
  title: 'The Tapestry | Sovereign Sanctuary',
  description: 'Discover creations from sovereign souls',
};

export default function CreationsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CreationsGallery />
    </Page>
  );
}
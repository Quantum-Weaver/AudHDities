// src/app/(hermes)/bazaar/artisans/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ArtisanDetail } from '@/components/asgard/domains/hermes/artisans/ArtisanDetail';

export const metadata = {
  title: 'Weaver | The Weavers | Sovereign Sanctuary',
  description: 'A sovereign journey',
};

export default function ArtisanDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ArtisanDetail />
    </Page>
  );
}
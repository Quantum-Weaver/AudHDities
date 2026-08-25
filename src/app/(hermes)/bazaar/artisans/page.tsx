// src/app/(hermes)/bazaar/artisans/page.tsx
import { Suspense } from 'react';
import { Page } from '@/components/bifrost/Page';
import { ArtisansGallery } from '@/components/asgard/domains/hermes/artisans/ArtisansGallery';

export const metadata = {
  title: 'The Weavers | Sovereign Sanctuary',
  description: 'Meet the artisans of the Sanctuary',
};

export default function CreatorsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      {/* Suspense boundary required by Next 16 for useSearchParams (B5) */}
      <Suspense fallback={
        <div className="text-center py-12">
          <div className="animate-pulse text-star-dust/40">Loading...</div>
        </div>
      }>
        <ArtisansGallery />
      </Suspense>
    </Page>
  );
}
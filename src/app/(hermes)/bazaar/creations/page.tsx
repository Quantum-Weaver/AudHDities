// src/app/(hermes)/bazaar/creations/page.tsx
import { Suspense } from 'react';
import { Page } from '@/components/bifrost/Page';
import { CreationsGallery } from '@/components/asgard/domains/hermes/creations/CreationsGallery';

export const metadata = {
  title: 'The Tapestry | Sovereign Sanctuary',
  description: 'Discover works from sovereign souls',
};

export default function CreationsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      {/* Suspense boundary required by Next 16 for useSearchParams (B5) */}
      <Suspense fallback={
        <div className="text-center py-12">
          <div className="animate-pulse text-star-dust/40">Loading...</div>
        </div>
      }>
        <CreationsGallery />
      </Suspense>
    </Page>
  );
}
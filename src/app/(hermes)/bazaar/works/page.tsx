// src/app/(hermes)/bazaar/works/page.tsx
import { Suspense } from 'react';
import { Page } from '@/components/bifrost/Page';
import { WorksGallery } from '@/components/asgard/domains/hermes/works/WorksGallery';

export const metadata = {
  title: 'The works | Sovereign Sanctuary',
  description: 'The things sovereign souls have made',
};

export default function WorksPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      {/* Suspense boundary required by Next 16 for useSearchParams (B5) */}
      <Suspense fallback={
        <div className="text-center py-12">
          <div className="animate-pulse text-star-dust/40">Loading...</div>
        </div>
      }>
        <WorksGallery />
      </Suspense>
    </Page>
  );
}

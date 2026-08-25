// src/app/(hermes)/bazaar/studio/work/page.tsx
// One of the Loom's two doors. Both open the SAME form with the kind already
// set; there is exactly one form component in this realm.
import { Suspense } from 'react';
import { Page } from '@/components/bifrost/Page';
import { StudioForm } from '@/components/asgard/domains/hermes/studio/StudioForm';

export const metadata = {
  title: 'A new work | The Loom | Sovereign Sanctuary',
  description: 'Every work begins with a single thread',
};

export default function NewWorkPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      {/* Suspense boundary required by Next 16 for useSearchParams (B5) */}
      <Suspense fallback={
        <div className="text-center py-12">
          <div className="animate-pulse text-star-dust/40">Loading...</div>
        </div>
      }>
        <StudioForm initialKind="work" />
      </Suspense>
    </Page>
  );
}

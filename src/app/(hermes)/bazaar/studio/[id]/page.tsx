// src/app/(hermes)/bazaar/studio/[id]/page.tsx
// The Loom — Edit an existing product
// Feeling: Reflective, refining, sovereign

import { Page } from '@/components/bifrost/Page';
import { StudioEdit } from '@/components/asgard/domains/hermes/studio/StudioEdit';

export const metadata = {
  title: 'Edit Creation | The Loom | Sovereign Sanctuary',
  description: 'Refine your offering',
};

export default function StudioEditPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioEdit />
    </Page>
  );
}
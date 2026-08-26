// src/app/(hermes)/bazaar/studio/[id]/page.tsx

import { Page } from '@/components/bifrost/Page';
import { StudioEdit } from '@/components/asgard/domains/hermes/studio/StudioEdit';

export const metadata = {
  title: 'Refine a Work | The Loom | Sovereign Sanctuary',
  description: 'Refine your work',
};

export default function StudioEditPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <StudioEdit />
    </Page>
  );
}
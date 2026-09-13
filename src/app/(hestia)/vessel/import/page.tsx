// src/app/(hestia)/vessel/import/page.tsx

import { Page } from '@/components/bifrost/Page';
import { BringItIn } from '@/components/asgard/domains/hestia/import/BringItIn';

export const metadata = {
  title: 'Bring It In | Sovereign Sanctuary',
  description: 'Your export file from a sovereign app, landed in your vessel',
};

export default function ImportPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BringItIn />
    </Page>
  );
}

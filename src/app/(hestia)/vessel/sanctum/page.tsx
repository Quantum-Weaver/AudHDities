// app/(hestia)/vessel/sanctum/page.tsx

import { Page } from '@/components/bifrost/Page';
import { SanctumContent } from '@/components/asgard/domains/hestia/sanctum/SanctumContent';

export const metadata = {
  title: 'Sanctum | Sovereign Sanctuary',
  description: 'Your private sanctuary within the Sanctuary'
};

export default function SanctumPage() {
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <SanctumContent />
    </Page>
  );
}
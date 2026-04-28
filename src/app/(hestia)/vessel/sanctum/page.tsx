// app/(hestia)/vessel/sanctum/page.tsx
// Sanctum - Settings, privacy, preferences
// Feeling: Safe, protected, personal

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
      animated={true}
      showContinuityBeam={true}
    >
      <SanctumContent />
    </Page>
  );
}
// src/app/(hermes)/bazaar/vendors/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { VendorDetail } from '@/components/asgard/domains/hermes/vendors/VendorDetail';

export const metadata = {
  title: 'Merchant | The Guild | Sovereign Sanctuary',
  description: 'A sovereign business',
};

export default function VendorDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <VendorDetail />
    </Page>
  );
}
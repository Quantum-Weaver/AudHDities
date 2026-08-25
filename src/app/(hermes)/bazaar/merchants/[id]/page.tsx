// src/app/(hermes)/bazaar/merchants/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { MerchantDetail } from '@/components/asgard/domains/hermes/merchants/MerchantDetail';

export const metadata = {
  title: 'Merchant | The Guild | Sovereign Sanctuary',
  description: 'A sovereign business',
};

export default function MerchantDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <MerchantDetail />
    </Page>
  );
}
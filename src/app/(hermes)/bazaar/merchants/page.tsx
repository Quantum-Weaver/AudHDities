// src/app/(hermes)/bazaar/merchants/page.tsx
import { Page } from '@/components/bifrost/Page';
import { MerchantsGallery } from '@/components/asgard/domains/hermes/merchants/MerchantsGallery';

export const metadata = {
  title: 'The Guild | Sovereign Sanctuary',
  description: 'Meet the merchants of the Sanctuary',
};

export default function VendorsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <MerchantsGallery />
    </Page>
  );
}
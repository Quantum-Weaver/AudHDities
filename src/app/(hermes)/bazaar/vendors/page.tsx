// src/app/(hermes)/bazaar/vendors/page.tsx
import { Page } from '@/components/bifrost/Page';
import { VendorsGallery } from '@/components/asgard/domains/hermes/vendors/VendorsGallery';

export const metadata = {
  title: 'The Guild | Sovereign Sanctuary',
  description: 'Meet the vendors of the Sanctuary',
};

export default function VendorsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <VendorsGallery />
    </Page>
  );
}
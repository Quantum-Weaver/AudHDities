// src/app/(themis)/council/curators/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CuratorsGallery } from '@/components/asgard/domains/themis/curators/CuratorsGallery';

export const metadata = {
  title: 'Curators | The Council | Sovereign Sanctuary',
  description: 'Trusted voices guiding the Sanctuary',
};

export default function CuratorsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CuratorsGallery />
    </Page>
  );
}
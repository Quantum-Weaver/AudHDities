// src/app/(themis)/council/proposals/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ProposalsGallery } from '@/components/asgard/domains/themis/proposals/ProposalsGallery';

export const metadata = {
  title: 'Proposals | The Council | Sovereign Sanctuary',
  description: 'Shape the future of the Sanctuary',
};

export default function ProposalsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ProposalsGallery />
    </Page>
  );
}
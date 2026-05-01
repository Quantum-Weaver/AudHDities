// src/app/(themis)/council/proposals/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ProposalDetail } from '@/components/asgard/domains/themis/proposals/ProposalDetail';

export const metadata = {
  title: 'Proposal | The Council | Sovereign Sanctuary',
  description: 'A voice in the collective',
};

export default function ProposalDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ProposalDetail />
    </Page>
  );
}
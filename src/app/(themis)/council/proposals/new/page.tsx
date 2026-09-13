// src/app/(themis)/council/proposals/new/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ProposalForm } from '@/components/asgard/domains/themis/proposals/ProposalForm';

export const metadata = {
  title: 'New Proposal | The Council | Sovereign Sanctuary',
  description: 'Open a proposal for the Council to weigh',
};

export default function NewProposalPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ProposalForm />
    </Page>
  );
}

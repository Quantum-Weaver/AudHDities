// src/app/(themis)/council/voting/page.tsx
import { Page } from '@/components/bifrost/Page';
import { VotingHub } from '@/components/asgard/domains/themis/voting/VotingHub';

export const metadata = {
  title: 'Voting | The Council | Sovereign Sanctuary',
  description: 'Your voice shapes the Sanctuary',
};

export default function VotingPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <VotingHub />
    </Page>
  );
}
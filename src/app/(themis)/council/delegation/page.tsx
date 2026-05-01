// src/app/(themis)/council/delegation/page.tsx
import { Page } from '@/components/bifrost/Page';
import { DelegationHub } from '@/components/asgard/domains/themis/delegation/DelegationHub';

export const metadata = {
  title: 'Delegation | The Council | Sovereign Sanctuary',
  description: 'Trust your voice to those who share your values',
};

export default function DelegationPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <DelegationHub />
    </Page>
  );
}
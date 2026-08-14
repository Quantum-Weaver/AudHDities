// src/app/(themis)/council/ledger/page.tsx
import { Page } from '@/components/bifrost/Page';
import { LedgerHub } from '@/components/asgard/domains/themis/ledger/LedgerHub';

export const metadata = {
  title: 'The Ledger | The Council | Sovereign Sanctuary',
  description: 'Complete transparency, every exchange visible',
};

export default function LedgerPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <LedgerHub />
    </Page>
  );
}
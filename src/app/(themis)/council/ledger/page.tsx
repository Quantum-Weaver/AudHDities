// src/app/(themis)/council/ledger/page.tsx
import { Page } from '@/components/bifrost/Page';
import { LedgerHub } from '@/components/asgard/domains/themis/ledger/LedgerHub';

export const metadata = {
  title: 'The Ledger | The Council | Sovereign Sanctuary',
  description: 'Every entry, one line each, in the order they were written.',
};

export default function LedgerPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <LedgerHub />
    </Page>
  );
}
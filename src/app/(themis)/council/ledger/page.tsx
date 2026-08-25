// src/app/(themis)/council/ledger/page.tsx
import { Page } from '@/components/bifrost/Page';
import { LedgerHub } from '@/components/asgard/domains/themis/ledger/LedgerHub';

// 2026-08-24, board ④ of the Forge canvas. KP ⚛ ruled the two transparency
// surfaces by choosing the option: keep the public one, and the council
// links to it. This room is the entries themselves; /transparency keeps the
// lifetime totals. The description moves with the page's own line.
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
// src/app/(athena)/library/dailies/page.tsx
//
// The seventh hall of the Library, born 2026-08-24 at KP's ⚛ word — the
// dailies sitting the conducting line reserved for a fresh window.
//
// The shelf is read HERE, on the server, without a cookie, and handed down
// whole. See src/lib/dailies/shelf.ts for why that is not an optimisation
// but a law: the vessel's browser never asks for a particular puzzle, so no
// per-puzzle request exists to be logged, at any layer, by anyone.

import { Page } from '@/components/bifrost/Page';
import { DailiesHall } from '@/components/asgard/domains/athena/dailies/DailiesHall';
import { readShelf } from '@/lib/dailies/shelf';

// The puzzles are public, published, and identical for everyone; they change
// only when KP seeds more. A shared cache is the honest shape here, and it
// keeps the read off the vessel's own path entirely.
export const revalidate = 3600;

export const metadata = {
  title: 'The Dailies | Sovereign Sanctuary',
  description: 'Word puzzles drawn from the Resonance Grammar. No streaks, no clock.',
};

export default async function DailiesPage() {
  const puzzles = await readShelf('word-scramble');

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <DailiesHall puzzles={puzzles} />
    </Page>
  );
}

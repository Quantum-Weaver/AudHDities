// src/app/(athena)/library/dailies/page.tsx

import { Page } from '@/components/bifrost/Page';
import { DailiesHall } from '@/components/asgard/domains/athena/dailies/DailiesHall';
import { readShelf } from '@/lib/dailies/shelf';

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

// src/app/(athena)/library/dailies/page.tsx

import { Page } from '@/components/bifrost/Page';
import { DailiesCarousel } from '@/components/asgard/domains/athena/dailies/DailiesCarousel';
import { readShelf } from '@/lib/dailies/shelf';

export const revalidate = 3600;

export const metadata = {
  title: 'The Dailies | Sovereign Sanctuary',
  description: 'Three games on one rail. No streaks, no clock.',
};

export default async function DailiesPage() {
  const puzzles = await readShelf('word-scramble');

  return (
    <Page showForeground={false} showContinuityBeam={true} className="w-full">
      <DailiesCarousel puzzles={puzzles} />
    </Page>
  );
}

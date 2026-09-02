// src/app/(athena)/library/dailies/sudoku/page.tsx
//
// Landed from resonance-void/intake/daily-sudoku/app/library/dailies/sudoku/page.tsx
// by KP's word (2026-09-02). Written by Kimi. Reshaped to the site's own page
// convention (the Page wrapper every other library route uses — see
// library/badges/page.tsx) rather than the intake's bare version; the game
// itself is untouched.

import { Page } from '@/components/bifrost/Page';
import { SudokuGame } from '@/components/asgard/domains/athena/dailies/SudokuGame';

export const metadata = {
  title: 'The Daily Number | Sovereign Sanctuary',
  description:
    'A daily sudoku drawn from the same sky for everyone. No streaks, no clock — settle it at your own pace.',
};

export default function DailySudokuPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <SudokuGame />
    </Page>
  );
}

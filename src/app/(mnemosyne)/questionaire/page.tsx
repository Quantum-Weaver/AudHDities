// src/app/(mnemosyne)/questionaire/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { AcidTestLoader } from '@/components/asgard/domains/mnemosyne/assessment/AcidTestLoader';

// MNE-4 — THE ACID TEST AS WELCOME, NOT GATEKEEPING (Shuttle Run 08, Phase
// 5, Movement III). Provenance: desk/realm-proposals/mnemosyne.md, Haiku's
// MNE-4 — "the test is how the house learns to welcome you, not a wall."
// The description dropped "that determines your access tier" — tier/access
// framing is the gate the house no longer names; what remains is the
// welcome underneath it.
export const metadata: Metadata = {
  title: 'The Acid Test | Sovereign Sanctuary',
  description: 'A playful, gentle survey. No judgment. No labels. Just recognition.',
};

export default function QuestionairePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-20 px-6">
        <div className="container max-w-4xl mx-auto">
          <AcidTestLoader />
        </div>
      </main>
    </Page>
  );
}
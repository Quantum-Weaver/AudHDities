// src/app/(mnemosyne)/questionaire/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { AcidTestLoader } from '@/components/asgard/domains/mnemosyne/assessment/AcidTestLoader';

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
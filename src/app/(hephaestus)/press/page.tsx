// app/(hephaestus)/press/page.tsx
// Feeling: Professional, informative, accessible
// ─────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────

import { Page } from '@/components/bifrost/Page';
import { PressContact } from '@/components/asgard/domains/hephaestus/press/PressContact';
import { InterviewRequests } from '@/components/asgard/domains/hephaestus/press/InterviewRequests';

export const metadata = {
  title: 'The Scroll | Sovereign Sanctuary',
  description: 'Resources for media and storytellers'
};

export default function PressPage() {
  return (
    <Page showForeground={false} animated={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-star-dust mb-2">
              The Scroll
            </h1>
            <p className="text-star-dust/70">
              Resources for media and storytellers
            </p>
          </div>
          <div className="space-y-8">
            <PressContact />
            <InterviewRequests />
          </div>
        </div>
      </main>
    </Page>
  );
}

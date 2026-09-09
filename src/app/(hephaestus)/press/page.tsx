// app/(hephaestus)/press/page.tsx
// Feeling: Professional, informative, accessible
// ─────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────

import { Page } from '@/components/bifrost/Page';
import { cn } from '@/lib/utils';
import { reliefPanelVariants, reliefGlossVariants } from '@/lib/constants/components/asgard/relief.variants';
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
          <div className={cn(reliefPanelVariants(), 'text-center mb-12 py-16 px-6')}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
            <div className={reliefGlossVariants()} />
            <div className="relative z-10">
            <h1 className="text-3xl font-bold text-star-dust mb-2">
              The Scroll
            </h1>
            <p className="text-star-dust/70">
              Resources for media and storytellers
            </p>
            </div>
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

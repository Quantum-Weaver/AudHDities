// src/app/(hephaestus)/vision/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { VisionHero } from '@/components/asgard/domains/hephaestus/vision/VisionHero';
import { WorldWithoutExploitation } from '@/components/asgard/domains/hephaestus/vision/WorldWithoutExploitation';
import { PillarCardRenderer } from '@/components/runes/cards/PillarCardRenderer';
import { VisionCTA } from '@/components/asgard/domains/hephaestus/vision/VisionCTA';
import { DollarSign, Heart, Shield, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vision | AUDHDITIES',
  description: 'Our vision for a sovereign, neurodivergent-first economy',
};

export default function VisionPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        <VisionHero />

        <section className="container max-w-4xl mx-auto px-6 py-20">
          <WorldWithoutExploitation />
        </section>

        <section className="container max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-star-dust mb-2">The Four Pillars</h2>
            <p className="text-star-dust/60">The foundation of the sovereign economy</p>
          </div>
          <div className="space-y-6">
            <PillarCardRenderer
              data={{
                id: 'emergence-economics',
                type: 'pillar',
                title: 'Emergence Economics',
                // 2026-08-24, the truth pass — "Creators keep 90%" named one
                // person; the 90% goes to the ware's contributors and is
                // divided equally among them, the creator among them and
                // ranked no higher (docs/architecture/residual-system.md:107,
                // :114). The fee language is untouched.
                description: 'Platform fee is fixed at 10% (industry standard is 30-50%). The ware’s contributors keep 90%, divided equally. Contributors earn forever from residual pools. A voluntary Covenant Pool lets creators support community dignity. Every transaction is public.',
                icon: <DollarSign size={24} />,
                order: 1,
              }}
              radius="lg"
              shadow="md"
            />
            <PillarCardRenderer
              data={{
                id: 'neurodivergent-advantage',
                type: 'pillar',
                title: 'Neurodivergent Advantage',
                // 2026-08-24, the truth pass — "TL;DR summaries" named a
                // thing that exists nowhere in the tree (grep: this line was
                // its only occurrence). Sensory preferences are real and
                // stay: the Sanctum's dyslexia-friendly mode and reduce_motion
                // (SanctumContent.tsx:289-297, vessel_config). Softened to
                // intent for the half that is not built.
                description: 'The platform is designed by neurodivergent minds, for neurodivergent minds. Focus modes, visual timers and sensory preferences are features, not bugs. Plain-language summaries are intended, and not yet built.',
                icon: <Heart size={24} />,
                order: 2,
              }}
              radius="lg"
              shadow="md"
            />
            <PillarCardRenderer
              data={{
                id: 'data-sovereignty',
                type: 'pillar',
                title: 'Data Sovereignty',
                description: 'You own your data. Period. If advertisers want your attention, they pay you. If researchers want your patterns, they compensate you. Opt-in, transparent, and fair.',
                icon: <Shield size={24} />,
                order: 3,
              }}
              radius="lg"
              shadow="md"
            />
            <PillarCardRenderer
              data={{
                id: 'radical-transparency',
                type: 'pillar',
                title: 'Radical Transparency',
                // 2026-08-24, the truth pass — "Every decision is documented"
                // named no mechanism anywhere in the house. The two claims
                // that remain are real and readable: /transparency reads the
                // ledger and admin_actions live, server-side
                // (transparency/page.tsx:53-63).
                description: 'Every exchange that moves through the platform lands in a public ledger. Every admin action is logged. Both are readable on the transparency page, by anyone, without signing in. Trust is built, not assumed.',
                icon: <Globe size={24} />,
                order: 4,
              }}
              radius="lg"
              shadow="md"
            />
          </div>
        </section>

        <section className="container max-w-4xl mx-auto px-6 pb-20">
          <VisionCTA />
        </section>
      </main>
    </Page>
  );
}
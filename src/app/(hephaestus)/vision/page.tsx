// src/app/(contents)/vision/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/shared/Page';
import { VisionHero } from '@/components/hephaestus/supporting/vision/VisionHero';
import { WorldWithoutExploitation } from '@/components/hephaestus/supporting/vision/WorldWithoutExploitation';
import { PillarCard } from '@/components/hephaestus/supporting/vision/PillarCard';
import { BigotTaxCard } from '@/components/hephaestus/supporting/vision/BigotTaxCard';
import { VisionCTA } from '@/components/hephaestus/supporting/vision/VisionCTA';
import { DollarSign, Heart, Shield, Globe, TrendingUp, HandCoins } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vision | AUDHDITIES',
  description: 'Our vision for a sovereign, neurodivergent-first economy',
};

export default function VisionPage() {
  return (
    <Page 
      variant={1}
      environment="vision"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    >
      <main className="min-h-screen">
        
        {/* Hero */}
        <VisionHero />

        {/* Core Vision */}
        <section className="container max-w-4xl mx-auto px-6 py-20">
          <WorldWithoutExploitation />
        </section>

        {/* Pillars */}
        <section className="container max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">The Four Pillars</h2>
            <p className="text-white/60">The foundation of the sovereign economy</p>
          </div>
          
          <div className="space-y-6">
            <PillarCard
              icon={<DollarSign size={24} />}
              title="Emergence Economics"
              description="Platform fee is fixed at 10% (industry standard is 30-50%). Creators keep 90%. Contributors earn forever from residual pools. A voluntary Covenant Pool lets creators support community dignity. Every transaction is public."
              color="cyan"
              delay={0}
            />
            <PillarCard
              icon={<Heart size={24} />}
              title="Neurodivergent Advantage"
              description="The platform is designed by neurodivergent minds, for neurodivergent minds. Focus modes, visual timers, TL;DR summaries, and sensory preferences are features, not bugs."
              color="purple"
              delay={0.1}
            />
            <PillarCard
              icon={<Shield size={24} />}
              title="Data Sovereignty"
              description="You own your data. Period. If advertisers want your attention, they pay you. If researchers want your patterns, they compensate you. Opt-in, transparent, and fair."
              color="pink"
              delay={0.2}
            />
            <PillarCard
              icon={<Globe size={24} />}
              title="Radical Transparency"
              description="Every dollar that moves through the platform is visible in a public ledger. Every admin action is logged. Every decision is documented. Trust is built, not assumed."
              color="orange"
              delay={0.3}
            />
          </div>
        </section>

        {/* Bigot Tax */}
        <section className="container items-center max-w-4xl mx-auto px-6 py-20">
          <BigotTaxCard />
        </section>

        {/* Call to Action */}
        <section className="container items-center max-w-4xl mx-auto px-6 pb-20">
          <VisionCTA />
        </section>
      </main>
    </Page>
  );
}
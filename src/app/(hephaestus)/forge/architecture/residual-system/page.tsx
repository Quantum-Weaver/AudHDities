// src/app/(content)/docs/architecture/residual-system/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { ResidualHero } from '@/components/asgard/domains/plutus/residual/ResidualHero';
import { FlowDiagram } from '@/components/asgard/domains/plutus/residual/FlowDiagram';
import { ContributionBreakdown } from '@/components/asgard/domains/plutus/residual/ContributionBreakdown';
import { ExampleSale } from '@/components/asgard/domains/plutus/residual/ExampleSale';
import { ResidualFAQ } from '@/components/asgard/domains/plutus/residual/ResidualFAQ';
import { SourceAttribution } from '@/components/asgard/domains/plutus/residual/SourceAttribution';
import { Card } from '@/components/runes/Card';
import { Heart, Shield, Infinity, HandCoins, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Residual System | AUDHDITIES Architecture',
  description: 'A new economy where value circulates and dignity is guaranteed',
};

export default function ResidualSystemPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        <ResidualHero />
        
        <div className="container text-center max-w-5xl mx-auto px-6 pb-20 space-y-20">
          
          {/* Philosophy Section */}
          <section className="text-center max-w-3xl mx-auto">
            <Heart className="text-pink-400 mx-auto mb-4" size={40} />
            <h2 className="text-3xl font-bold text-star-dust mb-4">The Philosophy</h2>
            <p className="text-xl text-star-dust/70">
              Value should flow to everyone who helped create it. If you contributed code, design, 
              ideas, or testing to a product, you deserve ongoing payment—not just a one-time fee.
            </p>
            <p className="text-lg text-star-dust/60 mt-4">
              And creators who choose to share their success with the community through the <span className="text-green-400">Covenant Pool</span> ensure dignity for all.
            </p>
          </section>
          
          {/* Flow Diagram */}
          <section>
            <h2 className="text-2xl font-bold text-star-dust text-center mb-8">How the Value Flows</h2>
            <FlowDiagram />
          </section>
          
          {/* The Two Pools */}
          <section>
            <h2 className="text-2xl font-bold text-star-dust text-center mb-8">Two Pools, One Sanctuary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                data={{ id: 'residual-pool-card', type: 'value', title: 'Residual Pool', value: '0-50%' }}
                variant="ghost"
                radius="lg"
                shadow="md"
                className="p-6 border-l-4 border-l-pink-400"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <TrendingUp size={16} className="text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-star-dust">Residual Pool</h3>
                </div>
                <p className="text-star-dust/70 text-sm mb-3">
                  <span className="text-pink-400 font-medium">Source:</span> 0-50% of the platform fee (creator chooses per product)
                </p>
                <p className="text-star-dust/70 text-sm mb-3">
                  <span className="text-pink-400 font-medium">Purpose:</span> Reward contributors who helped create the product
                </p>
                <p className="text-star-dust/70 text-sm">
                  <span className="text-pink-400 font-medium">Distribution:</span> Split according to contribution percentages set by creator
                </p>
              </Card>
              <Card 
                data={{ id: 'covenant-pool-card', type: 'value', title: 'Covenant Pool', value: '0-50%' }}
                variant="ghost"
                radius="lg"
                shadow="md"
                className="p-6 border-l-4 border-l-green-400"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <HandCoins size={16} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-star-dust">Covenant Pool</h3>
                </div>
                <p className="text-star-dust/70 text-sm mb-3">
                  <span className="text-green-400 font-medium">Source:</span> 0-50% of creator earnings (voluntary, set in profile)
                </p>
                <p className="text-star-dust/70 text-sm mb-3">
                  <span className="text-green-400 font-medium">Purpose:</span> Support community dignity fund for all active members
                </p>
                <p className="text-star-dust/70 text-sm">
                  <span className="text-green-400 font-medium">Distribution:</span> Equal share to all active community members
                </p>
              </Card>
            </div>
          </section>
          
          {/* Contribution Types */}
          <section>
            <ContributionBreakdown />
          </section>
          
          {/* Interactive Example */}
          <section>
            <h2 className="text-2xl font-bold text-star-dust text-center mb-8">See It In Action</h2>
            <ExampleSale />
          </section>
          
          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-star-dust text-center mb-8">Common Questions</h2>
            <ResidualFAQ />
          </section>
          
          {/* Technical Details */}
          <section>
            <h2 className="text-2xl font-bold text-star-dust text-center mb-8">Under the Hood</h2>
            <SourceAttribution />
          </section>
          
          {/* Economics Summary */}
          <section className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-green-500/10 rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-star-dust text-center mb-6">The Economics at a Glance</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-neurospark mb-2">10%</div>
                <div className="text-star-dust font-medium">Platform Fee</div>
                <div className="text-star-dust/40 text-sm">Fixed, industry-low</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
                <div className="text-star-dust font-medium">Creator Share</div>
                <div className="text-star-dust/40 text-sm">Your work, your value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">0-50%</div>
                <div className="text-star-dust font-medium">Covenant Pledge</div>
                <div className="text-star-dust/40 text-sm">Voluntary community support</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-star-dust/50 text-sm">
                Residual pool: 0-50% of platform fee (creator chooses per product)<br />
                Covenant pool: 0-50% of creator earnings (creator chooses in profile)
              </p>
            </div>
          </section>
          
          {/* Security Footer */}
          <section className="text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 bg-white/5 rounded-full">
              <Infinity size={14} className="text-neurospark" />
              <span className="text-sm text-star-dust/60">Only product creators can add contributors</span>
              <span className="text-star-dust/30">•</span>
              <span className="text-sm text-star-dust/60">Percentages must sum to ≤100</span>
              <span className="text-star-dust/30">•</span>
              <span className="text-sm text-star-dust/60">Covenant pledge is voluntary and changeable</span>
              <span className="text-star-dust/30">•</span>
              <span className="text-sm text-star-dust/60">All transactions visible in public ledger</span>
            </div>
          </section>
        </div>
      </main>
    </Page>
  );
}
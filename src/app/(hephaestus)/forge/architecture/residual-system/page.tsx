// src/app/(content)/forge/architecture/residual-system/page.tsx
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
              And any vessel who chooses to pass on part of their own share through the <span className="text-green-400">Covenant Pool</span> holds the dignity floor open for everyone.
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
                  <span className="text-pink-400 font-medium">Source:</span> 30% of every sale&apos;s platform fee, always &mdash; plus the residual pledge, 0-50% of a ware&apos;s profit, set per ware by its main artisan (default 0)
                </p>
                <p className="text-star-dust/70 text-sm mb-3">
                  <span className="text-pink-400 font-medium">Purpose:</span> Pay every artisan on the platform &mdash; anyone who has ever stood as an artisan or on a contributor roster
                </p>
                <p className="text-star-dust/70 text-sm">
                  <span className="text-pink-400 font-medium">Distribution:</span> Equal shares to all of them, at intervals, arriving whole
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
                  <span className="text-green-400 font-medium">Source:</span> 0-50% of a vessel&apos;s own share of a sale, set once in the Sanctum (default 0)
                </p>
                <p className="text-star-dust/70 text-sm mb-3">
                  <span className="text-green-400 font-medium">Purpose:</span> The dignity floor &mdash; held for every user of the Sanctuary
                </p>
                <p className="text-star-dust/70 text-sm">
                  <span className="text-green-400 font-medium">Distribution:</span> Equal shares to every user who has opted in to be identified, at intervals, arriving whole
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

          {/* The Collaborators' Half */}
          <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-star-dust mb-4">The Collaborators&apos; Half</h2>
            <p className="text-star-dust/70 mb-3">
              When a ware carries a licence (the-sphragis, drawn once and never re-argued as prose),
              its artisan&apos;s share may itself be divided among the people who made the work — the
              the-merismos grammar&apos;s columns, never a sentence in a contract. Basis points, summing
              to 10000; a role in the maker&apos;s own words; a yes, and the moment it was given, or the
              honest absence of one.
            </p>
            <p className="text-star-dust/70 mb-3">
              <code className="text-sm text-neurospark">combine(house, merismos)</code> is the picture the
              residual pool reads from: the platform&apos;s ten, the artist&apos;s ninety, and that ninety
              divided by the parts — numbers to read, computed from the shares each collaborator was
              given, never a number this page promises on its own account. The 90/10 stays schema, not
              promise, the same law the licence itself holds to.
            </p>
            <p className="text-star-dust/50 text-sm">
              No cents move here. What arrives at a collaborator, and when, is the contributions
              ledger&apos;s residual pool — schema elsewhere, not modelled by this grammar and not
              modelled by this page. Opt-in always: a share without consent is named, every time, never
              assumed.
            </p>
          </section>

          {/* Economics Summary */}
          <section className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-green-500/10 rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-star-dust text-center mb-6">The Economics at a Glance</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-neurospark mb-2">10%</div>
                <div className="text-star-dust font-medium">Platform Fee</div>
                <div className="text-star-dust/40 text-sm">Fixed &mdash; 30% of it returns to the residual pool, 70% funds the machine</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
                <div className="text-star-dust font-medium">Artisan Profit</div>
                <div className="text-star-dust/40 text-sm">The ware&apos;s own &mdash; divided equally among its contributors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">0-50%</div>
                <div className="text-star-dust font-medium">The Two Dials</div>
                <div className="text-star-dust/40 text-sm">Residual pledge per ware, covenant per vessel &mdash; both default 0</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-star-dust/50 text-sm">
                Residual pledge: 0-50% of this ware&apos;s profit &mdash; the 90% after the fee &mdash; set per ware by its main artisan, default 0. The residual pool receives it, and 30% of every sale&apos;s fee besides.<br />
                Covenant pledge: 0-50% of your own share of a sale, set once in the Sanctum, default 0. Neither dial ever touches a pool payout.
              </p>
            </div>
          </section>
          
          {/* Security Footer */}
          <section className="text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 bg-white/5 rounded-full">
              <Infinity size={14} className="text-neurospark" />
              <span className="text-sm text-star-dust/60">Only a ware&apos;s main artisan can add contributors</span>
              <span className="text-star-dust/30">•</span>
              <span className="text-sm text-star-dust/60">Contributors divide equally &mdash; no roles, no ranking</span>
              <span className="text-star-dust/30">•</span>
              <span className="text-sm text-star-dust/60">Both dials are voluntary and changeable at any time</span>
              <span className="text-star-dust/30">•</span>
              <span className="text-sm text-star-dust/60">All transactions visible in public ledger</span>
            </div>
          </section>
        </div>
      </main>
    </Page>
  );
}
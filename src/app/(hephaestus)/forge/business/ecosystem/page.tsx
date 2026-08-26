// app/(hepaestus)/forge/business/ecosystem/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { FinancialEcosystemHero } from '@/components/asgard/domains/plutus/business/FinancialEcosystemHero';
import { TwoStreamFlow } from '@/components/asgard/domains/plutus/business/TwoStreamFlow';
import { ResidualDistribution } from '@/components/asgard/domains/plutus/business/ResidualDistribution';
import { TransparencyLedger } from '@/components/asgard/domains/plutus/business/TransparencyLedger';
import { SustainabilityMetrics } from '@/components/asgard/domains/plutus/business/SustainabilityMetrics';
import { DignityFloor } from '@/components/asgard/domains/plutus/business/DignityFloor';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { ArrowRight, Shield, Users, DollarSign, Heart, TrendingUp, HandCoins } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financial Ecosystem | AUDHDITIES',
  description: 'How value flows through the sanctuary—granular, transparent, and designed for dignity',
};

export default function FinancialEcosystemPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        <FinancialEcosystemHero />
        
        <div id="financial-content" className="container max-w-6xl mx-auto px-6 py-20 space-y-24">
          
          {/* Overview: Two Streams */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-4">
                <span className="text-neurospark text-sm">✦ The Architecture</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
                Two Streams, One Sanctuary
              </h2>
              <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
                Value enters through two doors. It leaves through one principle: <span className="text-neurospark">circulation, not extraction</span>.
              </p>
            </div>
            <TwoStreamFlow />
          </section>
          
          {/* Advertising Stream Deep Dive */}
          <section className="bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl p-6 md:p-8 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Shield className="text-neurospark" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-star-dust">Advertising Stream</h3>
                <p className="text-star-dust/40">The Vetting Shield</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-neurospark text-sm mb-2">Phase 1</div>
                <div className="text-star-dust font-bold mb-1">Vetting</div>
                <p className="text-star-dust/40 text-sm">Every advertiser screened. No hate, no oppression, no harmful practices. Only values-aligned partners.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-neurospark text-sm mb-2">Phase 2</div>
                <div className="text-star-dust font-bold mb-1">Revenue</div>
                <p className="text-star-dust/40 text-sm">Advertiser pays for placement. Funds cover operational costs first.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-neurospark text-sm mb-2">Phase 3</div>
                <div className="text-star-dust font-bold mb-1">Distribution</div>
                <p className="text-star-dust/40 text-sm">Remaining funds distributed equally to all opt-in vessels. No competition. No performance metrics. Just dignity.</p>
              </div>
            </div>
            
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
              <p className="text-star-dust/60 text-sm flex items-center gap-2">
                <span className="text-neurospark">✦</span>
                Vessels choose to opt in. Their attention is sovereign. Their time is valued. Even inactive members receive their share.
              </p>
            </div>
          </section>
          
          {/* Sales Stream Deep Dive */}
          <section className="bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl p-6 md:p-8 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <DollarSign className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-star-dust">Sales Stream</h3>
                <p className="text-star-dust/40">The Circulation Engine</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-5 gap-3 mb-8">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">1</div>
                <div className="text-star-dust text-sm">Purchase</div>
                <div className="text-star-dust/40 text-xs">Tiered pricing based on Acid Test</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">2</div>
                <div className="text-star-dust text-sm">Platform Fee</div>
                <div className="text-star-dust/40 text-xs">Fixed at 10%</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">3</div>
                <div className="text-star-dust text-sm">Artisan Profit</div>
                <div className="text-star-dust/40 text-xs">90% of sale</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">4</div>
                <div className="text-star-dust text-sm">Residual Pool</div>
                <div className="text-star-dust/40 text-xs">30% of the fee always, plus 0-50% pledged from the profit</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">5</div>
                <div className="text-star-dust text-sm">Covenant Pool</div>
                <div className="text-star-dust/40 text-xs">0-50% of a vessel&apos;s own share of the sale</div>
              </div>
            </div>
            
            <ResidualDistribution />
          </section>
          
          {/* The Dignity Floor */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-pink-500/10 px-4 py-2 rounded-full mb-4">
                <Heart size={14} className="text-pink-400" />
                <span className="text-pink-400 text-sm">The Dignity Floor</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
                What No Other Platform Measures
              </h2>
              <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
                We don't measure extraction. We measure circulation.
              </p>
            </div>
            <DignityFloor />
          </section>
          
          {/* Transparency Ledger */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
                Every Dollar Visible
              </h2>
              <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
                The public ledger shows exactly where value flows.
              </p>
            </div>
            <TransparencyLedger />
          </section>
          
          {/* Sustainability Metrics */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
                Sustainability, Not Growth
              </h2>
              <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
                We don't need to grow forever. We need to sustain forever.
              </p>
            </div>
            <SustainabilityMetrics />
          </section>
          
          {/* Granular Flow Visualization */}
          <section className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-star-dust text-center mb-8">The Complete Circulation</h3>
            <div className="relative overflow-x-auto pb-8">
              <div className="min-w-[800px] flex flex-col items-center space-y-6">
                {/* Top: Sources */}
                <div className="flex justify-center gap-12">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-2">
                      <Shield className="text-neurospark" size={28} />
                    </div>
                    <div className="text-neurospark font-bold">Advertising</div>
                    <div className="text-star-dust/40 text-xs">Vetted Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="text-purple-400" size={28} />
                    </div>
                    <div className="text-purple-400 font-bold">Sales</div>
                    <div className="text-star-dust/40 text-xs">Artisan Products</div>
                  </div>
                </div>
                
                {/* Arrow down */}
                <div className="text-star-dust/30">▼</div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center mx-auto mb-2 border border-white/20">
                    <Heart className="text-pink-400" size={32} />
                  </div>
                  <div className="text-star-dust font-bold">The Sanctuary</div>
                  <div className="text-star-dust/40 text-xs">Where value meets purpose</div>
                </div>
                
                {/* Arrow down */}
                <div className="text-star-dust/30">▼</div>
                
                {/* First Split: Platform Fee (10%) vs Artisan (90%) */}
                <div className="flex justify-center gap-8 flex-wrap w-full">
                  <div className="text-center min-w-[120px]">
                    <div className="text-neurospark font-bold text-xl">10%</div>
                    <div className="text-star-dust/60 text-sm">Platform Fee</div>
                  </div>
                  <div className="text-center min-w-[120px]">
                    <div className="text-purple-400 font-bold text-xl">90%</div>
                    <div className="text-star-dust/60 text-sm">Artisan Profit</div>
                  </div>
                </div>
                
                {/* Arrow down */}
                <div className="text-star-dust/30">▼</div>
                
                {/* Platform Fee Split */}
                <div className="flex justify-center gap-8 flex-wrap w-full">
                  <div className="text-center min-w-[100px]">
                    <div className="text-neurospark font-bold">Operations</div>
                    <div className="text-star-dust/40 text-xs">70% of fee — the only money that leaves</div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-pink-400 font-bold">Residual Pool</div>
                    <div className="text-star-dust/40 text-xs">30% of fee, always</div>
                  </div>
                </div>
                
                {/* Arrow down */}
                <div className="text-star-dust/30">▼</div>
                
                {/* The Profit's Own Split — the residual pledge, then equal division */}
                <div className="flex justify-center gap-8 flex-wrap w-full">
                  <div className="text-center min-w-[120px]">
                    <div className="text-pink-400 font-bold">Residual Pledge</div>
                    <div className="text-star-dust/40 text-xs">0-50% of the profit, default 0 → the pool</div>
                  </div>
                  <div className="text-center min-w-[120px]">
                    <div className="text-purple-400 font-bold">The Contributors</div>
                    <div className="text-star-dust/40 text-xs">What is left, divided equally — then each vessel&apos;s own covenant dial</div>
                  </div>
                </div>
                
                {/* Arrow down */}
                <div className="text-star-dust/30">▼</div>
                
                {/* Final Distribution */}
                <div className="flex justify-center gap-8 flex-wrap">
                  <div className="text-center min-w-[100px]">
                    <div className="text-neurospark font-bold">Servers & Tools</div>
                    <div className="text-star-dust/40 text-xs">7% of the sale</div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-purple-400 font-bold">This Ware&apos;s Contributors</div>
                    <div className="text-star-dust/40 text-xs">Equal shares, main artisan among them</div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-pink-400 font-bold">All Artisans</div>
                    <div className="text-star-dust/40 text-xs">The residual pool, equally, forever</div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-green-400 font-bold">All Opted-In Users</div>
                    <div className="text-star-dust/40 text-xs">The covenant pool, equally</div>
                  </div>
                </div>
                
                {/* Arrow down */}
                <div className="text-star-dust/30">▼</div>
                
                <div className="bg-white/5 rounded-full px-6 py-3">
                  <p className="text-neurospark text-sm flex items-center gap-2">
                    <span>⟳</span> Value Returns to the Community
                    <span>⟳</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Economic Summary */}
          <section className="bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-2xl p-6 md:p-8 border border-green-500/20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full mb-4">
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-green-400 text-sm">The Numbers</span>
              </div>
              <h3 className="text-2xl font-bold text-star-dust mb-2">One Sale. Many Recipients.</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-neurospark">10%</div>
                <div className="text-star-dust/60 text-sm">Platform Fee</div>
                <div className="text-star-dust/30 text-xs">Fixed — 70% machine, 30% to the pool</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-purple-400">90%</div>
                <div className="text-star-dust/60 text-sm">Artisan Profit</div>
                <div className="text-star-dust/30 text-xs">Divided equally among the ware&apos;s contributors</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-pink-400">0-50%</div>
                <div className="text-star-dust/60 text-sm">of the profit → residual pool</div>
                <div className="text-star-dust/30 text-xs">You choose per ware, default 0</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-green-400">0-50%</div>
                <div className="text-star-dust/60 text-sm">of your own share → covenant pool</div>
                <div className="text-star-dust/30 text-xs">You choose in the Sanctum, default 0</div>
              </div>
            </div>
          </section>
          
          <section className="text-center">
            <Card 
              data={{ id: 'ecosystem-cta', type: 'value', title: 'See It in Action', value: 'Ledger' }}
              variant="glass"
              radius="2xl"
              shadow="lg"
              className="p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
                See It in Action
              </h2>
              <p className="text-xl text-star-dust/60 max-w-2xl mx-auto mb-8">
                The public ledger is always visible. Every transaction, every payout, every residual, every covenant distribution.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/transparency">
                  <Button size="lg">
                    View Public Ledger
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/questionnaire">
                  <Button size="lg">
                    Take the Acid Test
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>   
              </div>
              <p className="text-sm text-star-dust/40 mt-8">
                Platform fee: <span className="text-neurospark">10%</span> (industry standard is 30-50%) — 70% of it funds the machine, 30% returns to the residual pool<br />
                Artisan profit: <span className="text-purple-400">90%</span>, divided equally among the ware&apos;s contributors<br />
                Residual pledge: <span className="text-pink-400">0-50%</span> of a ware&apos;s profit (you choose per ware, default 0)<br />
                Covenant pledge: <span className="text-green-400">0-50%</span> of your own share of a sale (you choose in the Sanctum, default 0)<br />
                No hidden fees. No dark patterns. Just truth.
                <br />
                This is what an economy looks like when it serves life, not extraction.
              </p>
            </Card>
          </section>
        </div>
      </main>
    </Page>
  );
}
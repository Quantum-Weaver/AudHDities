// app/(content)/docs/business/financial-ecosystem/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { FinancialEcosystemHero } from '@/components/business/FinancialEcosystemHero';
import { TwoStreamFlow } from '@/components/business/TwoStreamFlow';
import { ResidualDistribution } from '@/components/business/ResidualDistribution';
import { TransparencyLedger } from '@/components/business/TransparencyLedger';
import { SustainabilityMetrics } from '@/components/business/SustainabilityMetrics';
import { DignityFloor } from '@/components/business/DignityFloor';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Shield, Users, DollarSign, Heart } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financial Ecosystem | AUDHDITIES',
  description: 'How value flows through the sanctuary—granular, transparent, and designed for dignity',
};

export default function FinancialEcosystemPage() {
  return (
    <Page 
      title='Financial Ecosystem | AUDHDITIES'
      description="How value flows through the sanctuary—granular, transparent, and designed for dignity"
      variant={1}
      environment="business"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    > 
      <main className="min-h-screen">
        <FinancialEcosystemHero />
        
        <div id="financial-content" className="container max-w-6xl mx-auto px-6 py-20 space-y-24">
          
          {/* Overview: Two Streams */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-4">
                <span className="text-cyan-400 text-sm">✦ The Architecture</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Two Streams, One Sanctuary
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Value enters through two doors. It leaves through one principle: <span className="text-cyan-400">circulation, not extraction</span>.
              </p>
            </div>
            <TwoStreamFlow />
          </section>
          
          {/* Advertising Stream Deep Dive */}
          <section className="bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl p-6 md:p-8 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Shield className="text-cyan-400" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Advertising Stream</h3>
                <p className="text-white/40">The Vetting Shield</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-cyan-400 text-sm mb-2">Phase 1</div>
                <div className="text-white font-bold mb-1">Vetting</div>
                <p className="text-white/40 text-sm">Every advertiser screened. No hate, no oppression, no harmful practices. Only values-aligned partners.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-cyan-400 text-sm mb-2">Phase 2</div>
                <div className="text-white font-bold mb-1">Revenue</div>
                <p className="text-white/40 text-sm">Advertiser pays for placement. Funds cover operational costs first.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-cyan-400 text-sm mb-2">Phase 3</div>
                <div className="text-white font-bold mb-1">Distribution</div>
                <p className="text-white/40 text-sm">Remaining funds distributed equally to all opt-in users. No competition. No performance metrics. Just dignity.</p>
              </div>
            </div>
            
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
              <p className="text-white/60 text-sm flex items-center gap-2">
                <span className="text-cyan-400">✦</span> 
                Users choose to opt in. Their attention is sovereign. Their time is valued. Even inactive members receive their share.
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
                <h3 className="text-2xl font-bold text-white">Sales Stream</h3>
                <p className="text-white/40">The Circulation Engine</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">1</div>
                <div className="text-white text-sm">Purchase</div>
                <div className="text-white/40 text-xs">Tiered pricing based on Acid Test</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">2</div>
                <div className="text-white text-sm">Creator</div>
                <div className="text-white/40 text-xs">Immediate payment (50-70%)</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">3</div>
                <div className="text-white text-sm">Platform Fee</div>
                <div className="text-white/40 text-xs">Fixed, covers operations</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <div className="text-purple-400 font-bold text-xl mb-1">4</div>
                <div className="text-white text-sm">Residual Pool</div>
                <div className="text-white/40 text-xs">0-50% adjustable by creator</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What No Other Platform Measures
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                We don't measure extraction. We measure circulation.
              </p>
            </div>
            <DignityFloor />
          </section>
          
          {/* Transparency Ledger */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Every Dollar Visible
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                The public ledger shows exactly where value flows.
              </p>
            </div>
            <TransparencyLedger />
          </section>
          
          {/* Sustainability Metrics */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sustainability, Not Growth
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                We don't need to grow forever. We need to sustain forever.
              </p>
            </div>
            <SustainabilityMetrics />
          </section>
          
          {/* Granular Flow Visualization */}
          <section className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white text-center mb-8">The Complete Circulation</h3>
            <div className="relative overflow-x-auto pb-8">
              <div className="min-w-[800px] flex flex-col items-center space-y-6">
                {/* Top: Sources */}
                <div className="flex justify-center gap-12">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-2">
                      <Shield className="text-cyan-400" size={28} />
                    </div>
                    <div className="text-cyan-400 font-bold">Advertising</div>
                    <div className="text-white/40 text-xs">Vetted Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="text-purple-400" size={28} />
                    </div>
                    <div className="text-purple-400 font-bold">Sales</div>
                    <div className="text-white/40 text-xs">Creator Products</div>
                  </div>
                </div>
                
                {/* Arrow down */}
                <div className="text-white/30">▼</div>
                
                {/* Merge Point: Sanctuary */}
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center mx-auto mb-2 border border-white/20">
                    <Heart className="text-pink-400" size={32} />
                  </div>
                  <div className="text-white font-bold">Sanctuary Treasury</div>
                  <div className="text-white/40 text-xs">Where value meets purpose</div>
                </div>
                
                {/* Arrow down */}
                <div className="text-white/30">▼</div>
                
                {/* Distribution */}
                <div className="flex justify-center gap-8 flex-wrap">
                  <div className="text-center min-w-[100px]">
                    <div className="text-cyan-400 font-bold">Operations</div>
                    <div className="text-white/40 text-xs">Servers, Tools, Development</div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-purple-400 font-bold">Creators</div>
                    <div className="text-white/40 text-xs">Immediate & Residual</div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-pink-400 font-bold">Contributors</div>
                    <div className="text-white/40 text-xs">Paid Forever</div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-green-400 font-bold">Community</div>
                    <div className="text-white/40 text-xs">Dignity Share</div>
                  </div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-yellow-400 font-bold">Future Fund</div>
                    <div className="text-white/40 text-xs">Grants & Reserves</div>
                  </div>
                </div>
                
                {/* Arrow down */}
                <div className="text-white/30">▼</div>
                
                {/* Return to Circulation */}
                <div className="bg-white/5 rounded-full px-6 py-3">
                  <p className="text-cyan-400 text-sm flex items-center gap-2">
                    <span>⟳</span> Value Returns to the Community
                    <span>⟳</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="text-center">
            <Card className="p-12 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-white/20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                See It in Action
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
                The public ledger is always visible. Every transaction, every payout, every residual.
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
              <p className="text-sm text-white/40 mt-8">
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
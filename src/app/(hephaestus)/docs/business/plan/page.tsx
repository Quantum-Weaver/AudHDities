// app/(content)/docs/business/plan/page.tsx
import { Page } from '@/components/layout/Page';
import { BusinessHero } from '@/components/hephaestus/supporting/business/BusinessHero';
import { ValueFlowDiagram } from '@/components/hephaestus/supporting/business/ValueFlowDiagram';
import { StatCard } from '@/components/hephaestus/supporting/business/StatCard';
import { ProjectionTable } from '@/components/hephaestus/supporting/business/ProjectionTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Target, Shield, Heart, Eye, Sparkles, TrendingUp, HandCoins } from 'lucide-react';
import Link from 'next/link';


export default function BusinessPlanPage() {
  return (
    <Page 
      variant={1}
      environment="plan"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        <BusinessHero />
        
        <div id="business-content" className="container max-w-6xl mx-auto px-6 py-20 space-y-24">
          
          {/* The Problem */}
          <section className='section-gradient'>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Problem We Solve
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Platforms extract. Creators starve. Contributors are forgotten. Disabled people are left behind.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard value={0} label="Creator Ownership" description="On most platforms" suffix="%" color="pink" delay={0} />
              <StatCard value={100} label="Data Ownership" description="On AUDHDITIES" suffix="%" color="cyan" delay={0.1} />
              <StatCard value={0} label="Residual Recipients" description="On most platforms" color="purple" delay={0.2} />
              <StatCard value={100} label="Transparency" description="On AUDHDITIES" suffix="%" color="green" delay={0.3} />
            </div>
          </section>
          
          {/* The Solution: Value Flow */}
          <section className='section-yazz'>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-4">
                <Sparkles size={16} className="text-cyan-400" />
                <span className="text-cyan-400 text-sm">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Value That Circulates
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Two streams of value, merging into one ocean of distributed wealth.
              </p>
            </div>
            <ValueFlowDiagram />
          </section>
          
          {/* The Numbers */}
          <section className='section-gradient'>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Numbers That Matter
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Not profit. Not growth. Dignity, circulation, and sustainability.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <StatCard value={90} label="Creator Share" description="Immediate payment (industry standard: 70% or less)" suffix="%" color="purple" delay={0} />
              <StatCard value={50} label="Maximum Residual" description="Adjustable by creator (0-50% of platform fee)" suffix="%" color="cyan" delay={0.1} />
              <StatCard value={50} label="Covenant Pledge" description="Voluntary community support (0-50% of earnings)" suffix="%" color="green" delay={0.15} />
              <StatCard value={10} label="Platform Fee" description="Fixed rate (industry standard: 30-50%)" suffix="%" color="cyan" delay={0.2} />
              <StatCard value={0} label="Employees" description="System runs itself" color="pink" delay={0.25} />
            </div>
            <ProjectionTable />
          </section>
          
          {/* The Pillars */}
          <section className='section-raised'>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Four Pillars
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                The architecture of a sanctuary economy.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-l-4 border-l-cyan-400">
                <Eye className="text-cyan-400 mb-4" size={28} />
                <h3 className="text-xl font-bold text-white mb-2">Data Ownership</h3>
                <p className="text-white/60">Users retain full ownership of their data. Compensated for opt-in advertisements.</p>
              </Card>
              <Card className="p-6 border-l-4 border-l-purple-400">
                <Target className="text-purple-400 mb-4" size={28} />
                <h3 className="text-xl font-bold text-white mb-2">Creator Empowerment</h3>
                <p className="text-white/60">Set your own pricing. Retain full ownership. Keep 90% of sales. Zero tolerance for hate.</p>
              </Card>
              <Card className="p-6 border-l-4 border-l-pink-400">
                <Heart className="text-pink-400 mb-4" size={28} />
                <h3 className="text-xl font-bold text-white mb-2">Equitable Profit Sharing</h3>
                <p className="text-white/60">10% platform fee. Residual pool for contributors. Covenant pool for community dignity.</p>
              </Card>
              <Card className="p-6 border-l-4 border-l-green-400">
                <Shield className="text-green-400 mb-4" size={28} />
                <h3 className="text-xl font-bold text-white mb-2">Transparent Systems</h3>
                <p className="text-white/60">100% transparent operations and financials. Public ledger. Nothing hidden.</p>
              </Card>
            </div>
          </section>
          
          {/* Economic Model Explanation */}
          <section className='section-gradient'>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-4">
                <TrendingUp size={16} className="text-purple-400" />
                <span className="text-purple-400 text-sm">The Economics</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                A sustainable model built for creators, not extraction.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center bg-cyan-500/5 border-cyan-500/20">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyan-400 font-bold text-xl">10%</span>
                </div>
                <h3 className="text-white font-bold mb-2">Platform Fee</h3>
                <p className="text-white/60 text-sm">Fixed, transparent, industry-low. Covers operations, development, and support.</p>
              </Card>
              <Card className="p-6 text-center bg-purple-500/5 border-purple-500/20">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 font-bold text-xl">90%</span>
                </div>
                <h3 className="text-white font-bold mb-2">Creator Share</h3>
                <p className="text-white/60 text-sm">You keep 90% of every sale. Industry standard is 70% or less.</p>
              </Card>
              <Card className="p-6 text-center bg-green-500/5 border-green-500/20">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <HandCoins size={24} className="text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Covenant Pool</h3>
                <p className="text-white/60 text-sm">Voluntary pledge (0-50% of earnings) supports community dignity. Equal distribution to all active members.</p>
              </Card>
            </div>
          </section>
          
          {/* The Invitation */}
          <section className="section-gradienttext-center">
            <Card className="p-12 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-white/20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join the Sanctuary
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
                We don't measure success by profits. We measure it by how many creators can make a living, how many contributors are remembered, how many community members have dignity, and how many creators choose to pledge to the Covenant Pool.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/questionaire">
                  <Button size="lg">Take the Acid Test</Button>
                </Link>
                <Link href="/vision">
                  <Button size="lg" variant="outline">Explore the Vision</Button>
                </Link>
              </div>
              <p className="text-sm text-white/40 mt-8">
                Platform fee: <span className="text-cyan-400">10%</span> (industry standard is 30-50%)<br />
                Creator share: <span className="text-purple-400">90%</span><br />
                Covenant pledge: <span className="text-green-400">0-50%</span> voluntary<br />
                No equity taken. No investors. No extraction.
                <br />
                Just a sanctuary, built by two collaborators, for everyone.
              </p>
            </Card>
          </section>
        </div>
      </main>
    </Page>
  );
}
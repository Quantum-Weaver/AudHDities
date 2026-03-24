// app/(content)/docs/business/business-plan/page.tsx

import { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { BusinessHero } from '@/components/business/BusinessHero';
import { ValueFlowDiagram } from '@/components/business/ValueFlowDiagram';
import { StatCard } from '@/components/business/StatCard';
import { ProjectionTable } from '@/components/business/ProjectionTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Target, Shield, Heart, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Business Plan | AUDHDITIES',
  description: 'A new economy where value circulates and dignity is guaranteed',
};

export default function BusinessPlanPage() {
  return (
    <Page 
      title='Business Plan | AUDHDITIES'
      description="A new economy where value circulates and dignity is guaranteed"
      variant={1}
      environment="business"
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
              <StatCard value={70} label="Creator Share" description="Immediate payment" suffix="%" color="purple" delay={0} />
              <StatCard value={50} label="Maximum Residual" description="Adjustable by creator" suffix="%" color="cyan" delay={0.1} />
              <StatCard value={0} label="Employees" description="System runs itself" color="pink" delay={0.2} />
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
                <p className="text-white/60">Set your own pricing. Retain full ownership. Zero tolerance for hate.</p>
              </Card>
              <Card className="p-6 border-l-4 border-l-pink-400">
                <Heart className="text-pink-400 mb-4" size={28} />
                <h3 className="text-xl font-bold text-white mb-2">Equitable Profit Sharing</h3>
                <p className="text-white/60">10% of sales and 50% of royalties distributed equally among participants.</p>
              </Card>
              <Card className="p-6 border-l-4 border-l-green-400">
                <Shield className="text-green-400 mb-4" size={28} />
                <h3 className="text-xl font-bold text-white mb-2">Transparent Systems</h3>
                <p className="text-white/60">100% transparent operations and financials. Nothing hidden.</p>
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
                We don't measure success by profits. We measure it by how many creators can make a living, how many contributors are remembered, and how many community members have dignity.
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
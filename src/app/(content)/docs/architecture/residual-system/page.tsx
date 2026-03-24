// app/(content)/docs/architecture/residual-system/page.tsx

import { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { ResidualHero } from '@/components/residual/ResidualHero';
import { FlowDiagram } from '@/components/residual/FlowDiagram';
import { ContributionBreakdown } from '@/components/residual/ContributionBreakdown';
import { ExampleSale } from '@/components/residual/ExampleSale';
import { ResidualFAQ } from '@/components/residual/ResidualFAQ';
import { SourceAttribution } from '@/components/residual/SourceAttribution';
import { Card } from '@/components/ui/Card';
import { Heart, Shield, Infinity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Residual System | AUDHDITIES Architecture',
  description: 'A new economy where value circulates and dignity is guaranteed',
};

export default async function ResidualSystemPage() {
  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        <ResidualHero />
        
        <div className="container max-w-5xl mx-auto px-6 pb-20 space-y-20">
          
          {/* Philosophy Section */}
          <section className="text-center max-w-3xl mx-auto">
            <Heart className="text-pink-400 mx-auto mb-4" size={40} />
            <h2 className="text-3xl font-bold text-white mb-4">The Philosophy</h2>
            <p className="text-xl text-white/70">
              Value should flow to everyone who helped create it. If you contributed code, design, 
              ideas, or testing to a product, you deserve ongoing payment—not just a one-time fee.
            </p>
          </section>
          
          {/* Flow Diagram */}
          <section>
            <h2 className="text-2xl font-bold text-white text-center mb-8">How the Value Flows</h2>
            <Card className="p-8">
              <FlowDiagram />
            </Card>
          </section>
          
          {/* Contribution Types */}
          <section>
            <Card className="p-8">
              <ContributionBreakdown />
            </Card>
          </section>
          
          {/* Interactive Example */}
          <section>
            <h2 className="text-2xl font-bold text-white text-center mb-8">See It In Action</h2>
            <Card className="p-8">
              <ExampleSale />
            </Card>
          </section>
          
          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-white text-center mb-8">Common Questions</h2>
            <Card className="p-8">
              <ResidualFAQ />
            </Card>
          </section>
          
          {/* Technical Details */}
          <section>
            <h2 className="text-2xl font-bold text-white text-center mb-8">Under the Hood</h2>
            <Card className="p-8">
              <div className="mb-6 text-center">
                <Shield className="text-cyan-400 mx-auto mb-2" size={32} />
                <p className="text-white/60 max-w-2xl mx-auto">
                  All transactions are automated by database triggers. When a sale happens, 
                  the system instantly calculates and records payments for everyone involved.
                </p>
              </div>
              <SourceAttribution />
            </Card>
          </section>
          
          {/* Security Footer */}
          <section className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full">
              <Infinity size={14} className="text-cyan-400" />
              <span className="text-sm text-white/60">Only product creators can add contributors</span>
              <span className="text-white/30">•</span>
              <span className="text-sm text-white/60">Percentages must sum to ≤100</span>
              <span className="text-white/30">•</span>
              <span className="text-sm text-white/60">All transactions visible in public ledger</span>
            </div>
          </section>
        </div>
      </main>
    </Page>
  );
}
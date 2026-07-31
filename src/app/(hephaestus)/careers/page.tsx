// src/app/(hephaestus)/careers/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CultureDeck } from '@/components/asgard/domains/hephaestus/careers/CultureDeck';
import { BenefitsList } from '@/components/asgard/domains/hephaestus/careers/BenefitsList';
import { TeamStories } from '@/components/asgard/domains/hephaestus/careers/TeamStories';
import { Card } from '@/components/runes/Card';
import { Infinity, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'The Calling | Sovereign Sanctuary',
  description: 'The Sanctuary is self-perpetuating — every role is filled by the ecosystem itself',
};

export default function CareersPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-star-dust mb-2">
              The Calling
            </h1>
            <p className="text-star-dust/60 max-w-2xl mx-auto">
              The Sanctuary is designed to be self-perpetuating. Every role emerges organically 
              from the ecosystem. There are no traditional jobs here — only callings that find 
              the people meant to fulfill them.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CultureDeck />
              <TeamStories />
            </div>
            <div className="space-y-8">
              <BenefitsList />
              
              {/* Self-Perpetuating Ecosystem Card */}
              <Card 
                data={{ id: 'ecosystem-self', type: 'value', title: 'Self-Perpetuating', value: 'Ecosystem' }}
                variant="glass"
                radius="lg"
                shadow="md"
                className="p-6 text-center"
              >
                <Infinity className="text-neurospark mx-auto mb-3" size={28} />
                <h3 className="text-star-dust font-bold mb-2">No Applications Needed</h3>
                <p className="text-star-dust/60 text-sm mb-4">
                  The residual system, covenant pool, and creator economy are designed to sustain 
                  everyone who contributes. There are no job listings because the ecosystem itself 
                  is the job — and everyone who participates earns from it.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-star-dust/40">
                  <Sparkles size={12} className="text-neurospark" />
                  <span>Value flows to those who create value</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
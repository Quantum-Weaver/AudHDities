// src/app/(hephaestus)/sanctuary/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { SanctuaryHero } from '@/components/asgard/domains/hephaestus/sanctuary/SanctuaryHero';
import { SanctuaryProblem } from '@/components/asgard/domains/hephaestus/sanctuary/SanctuaryProblem';
import { SanctuaryPillars } from '@/components/asgard/domains/hephaestus/sanctuary/SanctuaryPillars';
import { SanctuaryEconomics } from '@/components/asgard/domains/hephaestus/sanctuary/SanctuaryEconomics';
import { SanctuaryAcidTest } from '@/components/asgard/domains/hephaestus/sanctuary/SanctuaryAcidTest';
import { SanctuaryPathways } from '@/components/asgard/domains/hephaestus/sanctuary/SanctuaryPathways';
import { SanctuaryTransparency } from '@/components/asgard/domains/hephaestus/sanctuary/SanctuaryTransparency';
import { SanctuaryFooter } from '@/components/asgard/domains/hephaestus/sanctuary/SanctuaryFooter';

export const metadata: Metadata = {
  title: 'The Sanctuary | AUDHDITIES',
  description: 'Where neurodivergent minds build the future. A platform where creators keep 70%, contributors earn forever, and every community member shares in the abundance.',
};

export default function SanctuaryPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        <SanctuaryHero />
        <SanctuaryProblem />
        <SanctuaryPillars />
        <SanctuaryEconomics />
        <SanctuaryAcidTest />
        <SanctuaryPathways />
        <SanctuaryTransparency />
        <SanctuaryFooter />
      </main>
    </Page>
  );
}
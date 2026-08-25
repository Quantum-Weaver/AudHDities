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
import VelkominGreeting from '@/components/asgard/auth/VelkominGreeting';

export const metadata: Metadata = {
  title: 'The Sanctuary | AUDHDITIES',
  // 2026-08-24, the truth pass — the last clause read "and every community
  // member shares in the abundance." Trued to the model's two rosters, in
  // step with SanctuaryHero.tsx.
  description: 'Where neurodivergent minds build the future. A platform where 90% of everything circulates, every contributor is paid an equal share, and the abundance reaches every artisan who has ever pitched in and every user who opts in.',
};

export default function SanctuaryPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        <VelkominGreeting visitors />
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
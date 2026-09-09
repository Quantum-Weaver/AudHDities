// app/(hephaestus)/accessibility/page.tsx
import { Page } from '@/components/bifrost/Page';
import { cn } from '@/lib/utils';
import { reliefPanelVariants, reliefGlossVariants } from '@/lib/constants/components/asgard/relief.variants';
import { ScreenReaderInfo } from '@/components/asgard/domains/hephaestus/accessibility/ScreenReaderInfo';
import { KeyboardShortcuts } from '@/components/asgard/domains/hephaestus/accessibility/KeyboardShortcuts';
import { FontSizer } from '@/components/asgard/domains/hephaestus/accessibility/FontSizer';
import { FeatureList } from '@/components/asgard/domains/hephaestus/accessibility/FeatureList';
import { ContrastToggle } from '@/components/asgard/domains/hephaestus/accessibility/ContrastToggle';

export const metadata = {
  title: 'The Welcome | Sovereign Sanctuary',
  description: 'Everyone belongs here'
};

export default function AccessibilityPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6 space-y-8">
          <div className={cn(reliefPanelVariants(), 'text-center mb-12 py-16 px-6')}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
            <div className={reliefGlossVariants()} />
            <div className="relative z-10">
            <h1 className="text-3xl font-bold text-star-dust mb-4">The Welcome</h1>
            <p className="text-lg text-star-dust/60 max-w-2xl mx-auto">
              Every nervous system is welcome here. The Sanctuary adapts to you — not the other way around.
            </p>
            </div>
          </div>

          <FeatureList />
          <ScreenReaderInfo />
          <KeyboardShortcuts />
          <FontSizer />
          <ContrastToggle />
        </div>
      </main>
    </Page>
  );
}
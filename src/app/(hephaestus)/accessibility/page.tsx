// app/(supporting)/accessibility/page.tsx
// The Welcome - Accessibility statement, accommodations
// Feeling: Welcoming, inclusive, caring

'use client';

import { Page } from '@/components/arrchive/layout/Page';
import { FeatureList } from '@/components/supporting/FeatureList';
import { ScreenReaderInfo } from '@/components/supporting/ScreenReaderInfo';
import { KeyboardShortcuts } from '@/components/supporting/KeyboardShortcuts';
import { ContrastToggle } from '@/components/supporting/ContrastToggle';
import { FontSizer } from '@/components/supporting/FontSizer';

export const metadata = {
  title: 'The Welcome | Sovereign Sanctuary',
  description: 'Accessibility for all'
};

export default function AccessibilityPage() {
  return (
    <Page 
      variant={1}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Welcome
            </h1>
            <p className="text-white/60">
              Everyone belongs here
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <FeatureList />
              <ScreenReaderInfo />
            </div>
            <div className="space-y-8">
              <KeyboardShortcuts />
              <ContrastToggle />
              <FontSizer />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
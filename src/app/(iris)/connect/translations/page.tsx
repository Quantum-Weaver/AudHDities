// app/(iris)/connect/translations/page.tsx
// The Voice - Language settings, translations
// Feeling: Understood, welcomed, global

'use client';

import { Page } from '@/components/arrchive/layout/Page';
import { LanguageSelector } from '@/components/connect/LanguageSelector';
import { TranslationToggle } from '@/components/connect/TranslationToggle';
import { ContributeButton } from '@/components/connect/ContributeButton';
import { ProgressIndicator } from '@/components/connect/ProgressIndicator';

export const metadata = {
  title: 'The Voice | Sovereign Sanctuary',
  description: 'Choose your language and help translate'
};

export default function TranslationsPage() {
  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Voice
            </h1>
            <p className="text-white/60">
              Every language, every voice, welcome here
            </p>
          </div>

          <div className="space-y-8">
            <LanguageSelector />
            <TranslationToggle />
            <ProgressIndicator />
            <ContributeButton />
          </div>
        </div>
      </main>
    </Page>
  );
}
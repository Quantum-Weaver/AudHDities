// app/(supporting)/terms/page.tsx
// The Agreement - Terms of service, community guidelines
// Feeling: Fair, clear, protective

'use client';

import { Page } from '@/components/arrchive/layout/Page';
import { TermsSections } from '@/components/supporting/TermsSections';
import { AcceptButton } from '@/components/supporting/AcceptButton';
import { PrintView } from '@/components/supporting/PrintView';
import { VersionHistory } from '@/components/supporting/VersionHistory';

export const metadata = {
  title: 'The Agreement | Sovereign Sanctuary',
  description: 'Terms of service and community guidelines'
};

export default function TermsPage() {
  return (
    <Page 
      variant={1}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                The Agreement
              </h1>
              <p className="text-white/60">
                Last updated: April 15, 2026
              </p>
            </div>
            <PrintView />
          </div>

          <TermsSections />

          <div className="mt-8 flex justify-between items-center pt-8 border-t border-white/10">
            <VersionHistory />
            <AcceptButton />
          </div>
        </div>
      </main>
    </Page>
  );
}
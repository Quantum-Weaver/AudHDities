// app/(supporting)/privacy/page.tsx
// The Covenant - Privacy policy, data sovereignty
// Feeling: Safe, respectful, empowering

'use client';

import { useState } from 'react';
import { Page } from '@/components/arrchive/layout/Page';
import { PolicySections } from '@/components/supporting/PolicySections';
import { DataControls } from '@/components/supporting/DataControls';
import { OptInToggle } from '@/components/supporting/OptInToggle';
import { ExportButton } from '@/components/supporting/ExportButton';
import { DeleteAccount } from '@/components/supporting/DeleteAccount';

export const metadata = {
  title: 'The Covenant | Sovereign Sanctuary',
  description: 'Our commitment to your data sovereignty'
};

export default function PrivacyPage() {
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    personalized: true,
  });

  return (
    <Page 
      variant={2}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Covenant
            </h1>
            <p className="text-white/60">
              Your data is yours. Always.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PolicySections />
            </div>
            <div className="space-y-8">
              <DataControls />
              <OptInToggle 
                preferences={preferences}
                onChange={setPreferences}
              />
              <ExportButton />
              <DeleteAccount />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
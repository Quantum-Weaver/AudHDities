// app/(supporting)/donate/page.tsx
// The Offering - Donation tiers, impact calculator
// Feeling: Generous, impactful, grateful

'use client';

import { useState } from 'react';
import { Page } from '@/components/bifrost/Page';
import { DonationTiers } from '@/components/hephaestus/supporting/DonationTiers';
import { ImpactCalculator } from '@/components/hephaestus/supporting/ImpactCalculator';
import { RecurringOptions } from '@/components/hephaestus/supporting/RecurringOptions';
import { ThankYouNote } from '@/components/hephaestus/supporting/ThankYouNote';
import { TaxReceipt } from '@/components/hephaestus/supporting/TaxReceipt';

export const metadata = {
  title: 'The Offering | Sovereign Sanctuary',
  description: 'Support the Sanctuary'
};
export default function DonatePage() {
  const [donationComplete, setDonationComplete] = useState(false);
  const [amount, setAmount] = useState(0);

  if (donationComplete) {
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
            <ThankYouNote amount={amount} />
            <TaxReceipt amount={amount} />
          </div>
        </main>
      </Page>
    );
  }

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
              The Offering
            </h1>
            <p className="text-white/60">
              Your contribution keeps the Sanctuary alive
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <DonationTiers onSelectAmount={setAmount} />
            <div className="space-y-8">
              <ImpactCalculator amount={amount} />
              <RecurringOptions />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
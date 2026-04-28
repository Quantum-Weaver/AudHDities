// app/(hephaestus)/donate/page.tsx
// The Offering - Donation tiers, impact calculator
// Feeling: Generous, impactful, grateful

'use client';

import { useState } from 'react';
import { Page } from '@/components/bifrost/Page';
import { DonationTiers } from '@/components/asgard/domains/hephaestus/donations/DonationTiers';
import { ImpactCalculator } from '@/components/asgard/domains/hephaestus/donations/ImpactCalculator';
import { RecurringOptions } from '@/components/asgard/domains/hephaestus/donations/RecurringOptions';
import { ThankYouNote } from '@/components/asgard/domains/hephaestus/donations/ThankYouNote';
import { TaxReceipt } from '@/components/asgard/domains/hephaestus/donations/TaxReceipt';

export default function DonatePage() {
  const [donationComplete, setDonationComplete] = useState(false);
  const [amount, setAmount] = useState(0);

  if (donationComplete) {
    return (
      <Page showForeground={false} showContinuityBeam={true}>
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
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-star-dust mb-2">
              The Offering
            </h1>
            <p className="text-star-dust/60">
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
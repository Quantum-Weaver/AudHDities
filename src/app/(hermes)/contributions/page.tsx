// app/(hermes)/contributions/page.tsx
// Contributions Ledger - View all contributions and residuals
// Feeling: Transparent, rewarding, motivating

import { Page } from '@/components/arrchive/layout/Page';
import { ContributionTable } from '@/components/bazaar/ContributionTable';
import { EarningSummary } from '@/components/bazaar/EarningSummary';
import { PayoutHistory } from '@/components/bazaar/PayoutHistory';
import { ResidualChart } from '@/components/bazaar/ResidualChart';
import { ExportButton } from '@/components/bazaar/ExportButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ContributionsPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header with Export */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Contributions Ledger
              </h1>
              <p className="text-white/60">
                Your impact, tracked transparently
              </p>
            </div>
            <ExportButton />
          </div>

          {/* Earning Summary */}
          <div className="mb-8">
            <EarningSummary userId={session.user.id} />
          </div>

          {/* Residual Chart */}
          <div className="mb-8">
            <ResidualChart userId={session.user.id} />
          </div>

          {/* Tabs for Details */}
          <Tabs defaultValue="contributions">
            <TabsList className="w-full">
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
              <TabsTrigger value="payouts">Payout History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contributions" className="mt-6">
              <ContributionTable userId={session.user.id} />
            </TabsContent>
            
            <TabsContent value="payouts" className="mt-6">
              <PayoutHistory userId={session.user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Page>
  );
}
// app/(supporting)/transparency/page.tsx
// The Ledger - Financial transparency, value flow
// Feeling: Transparent, trustworthy, accountable

import { Page } from '@/components/arrchive/layout/Page';
import { FinancialTable } from '@/components/supporting/FinancialTable';
import { RevenueChart } from '@/components/supporting/RevenueChart';
import { ExpenseBreakdown } from '@/components/supporting/ExpenseBreakdown';
import { DonationImpact } from '@/components/supporting/DonationImpact';
import { DownloadReports } from '@/components/supporting/DownloadReports';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Ledger | Sovereign Sanctuary',
  description: 'Complete financial transparency'
};

export default async function TransparencyPage() {
  const supabase = await createServerSupabase();

  const { data: transactions } = await supabase
    .from('public_transactions')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: monthlyStats } = await supabase
    .from('monthly_financials')
    .select('*')
    .order('month', { ascending: false })
    .limit(12);

  return (
    <Page 
      variant={1}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Ledger
            </h1>
            <p className="text-white/60">
              Every transaction visible. Every decision transparent.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <RevenueChart data={monthlyStats || []} />
            <ExpenseBreakdown data={monthlyStats || []} />
          </div>

          <div className="mb-12">
            <DonationImpact />
          </div>

          <div className="mb-8 flex justify-end">
            <DownloadReports />
          </div>

          <FinancialTable transactions={transactions || []} />
        </div>
      </main>
    </Page>
  );
}
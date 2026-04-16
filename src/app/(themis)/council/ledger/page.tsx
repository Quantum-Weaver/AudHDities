// app/(themis)/council/ledger/page.tsx
// The Ledger - Transparent financial and value ledger
// Feeling: Transparent, accountable, trustworthy

import { Page } from '@/components/arrchive/layout/Page';
import { TransactionTable } from '@/components/council/TransactionTable';
import { BalanceSummary } from '@/components/council/BalanceSummary';
import { FilterControls } from '@/components/council/FilterControls';
import { VisualChart } from '@/components/council/VisualChart';
import { ExportButton } from '@/components/council/ExportButton';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Ledger | Sovereign Sanctuary',
  description: 'Complete financial and value transparency'
};

interface LedgerPageProps {
  searchParams: Promise<{
    type?: string;
    start?: string;
    end?: string;
  }>;
}

export default async function LedgerPage({ searchParams }: LedgerPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();

  const typeFilter = params.type || '';
  const startDate = params.start || '';
  const endDate = params.end || '';

  let query = supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (typeFilter) {
    query = query.eq('type', typeFilter);
  }
  if (startDate) {
    query = query.gte('created_at', startDate);
  }
  if (endDate) {
    query = query.lte('created_at', endDate);
  }

  const { data: transactions } = await query;

  // Get balance summary
  const { data: balance } = await supabase
    .from('balance_summary')
    .select('*')
    .single();

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
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                The Ledger
              </h1>
              <p className="text-white/60">
                Complete transparency, every transaction visible
              </p>
            </div>
            <ExportButton />
          </div>

          <BalanceSummary balance={balance} />

          <div className="mb-8">
            <VisualChart transactions={transactions || []} />
          </div>

          <FilterControls 
            currentType={typeFilter}
            startDate={startDate}
            endDate={endDate}
          />

          <TransactionTable transactions={transactions || []} />
        </div>
      </main>
    </Page>
  );
}
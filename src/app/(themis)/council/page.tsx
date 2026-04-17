// app/(themis)/council/page.tsx
// The Council Chamber - Governance hub
// Feeling: Transparent, just, collaborative, wise

import { Page } from '@/components/layout/Page';
import { ProposalList } from '@/components/council/ProposalList';
import { VotingSummary } from '@/components/council/VotingSummary';
import { DelegateInfo } from '@/components/council/DelegateInfo';
import { TransparencyLedger } from '@/components/council/TransparencyLedger';
import { MeetingCalendar } from '@/components/council/MeetingCalendar';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Council Chamber | Sovereign Sanctuary',
  description: 'Governance, proposals, and collective wisdom'
};

export default async function CouncilPage() {
  const supabase = await createServerSupabase();

  // Fetch active proposals
  const { data: activeProposals } = await supabase
    .from('proposals')
    .select('*, proposer:proposer_id(*)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch recent votes summary
  const { data: voteSummary } = await supabase
    .from('vote_summary')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // Fetch delegate count
  const { count: delegateCount } = await supabase
    .from('delegations')
    .select('*', { count: 'exact', head: true });

  // Fetch transparency entries
  const { data: transparencyEntries } = await supabase
    .from('public_transparency')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

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
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Council Chamber
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Where sovereign voices shape the Sanctuary
            </p>
          </div>

          {/* Voting Summary */}
          <div className="mb-8">
            <VotingSummary summary={voteSummary || []} />
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content - Active Proposals */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-4">
                Active Proposals
              </h2>
              <ProposalList proposals={activeProposals || []} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <DelegateInfo delegateCount={delegateCount || 0} />
              <MeetingCalendar />
            </div>
          </div>

          {/* Transparency Ledger */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Transparency Ledger
            </h2>
            <TransparencyLedger entries={transparencyEntries || []} />
          </div>
        </div>
      </main>
    </Page>
  );
}
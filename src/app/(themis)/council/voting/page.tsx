// app/(themis)/council/voting/page.tsx
// The Vote - Active voting opportunities
// Feeling: Engaged, empowered, responsible

import { Page } from '@/components/arrchive/layout/Page';
import { ActiveProposals } from '@/components/council/ActiveProposals';
import { VoteButtons } from '@/components/council/VoteButtons';
import { WeightDisplay } from '@/components/council/WeightDisplay';
import { DeadlineTimer } from '@/components/council/DeadlineTimer';
import { ConfirmationModal } from '@/components/council/ConfirmationModal';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Vote | Sovereign Sanctuary',
  description: 'Cast your vote on active proposals'
};

export default async function VotingPage() {
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: activeProposals } = await supabase
    .from('proposals')
    .select('*, proposer:proposer_id(*)')
    .eq('status', 'active')
    .order('deadline', { ascending: true });

  // Get user's voting weight (based on sovereignty score)
  let votingWeight = 1;
  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('sovereignty_score')
      .eq('id', session.user.id)
      .single();
    votingWeight = Math.floor((profile?.sovereignty_score || 0) / 100) + 1;
  }

  return (
    <Page 
      variant={2}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Vote
            </h1>
            <p className="text-white/60">
              Your voice shapes the Sanctuary
            </p>
          </div>

          {session && (
            <div className="mb-8 p-4 bg-cyan-500/10 rounded-lg text-center">
              <WeightDisplay weight={votingWeight} />
            </div>
          )}

          <ActiveProposals proposals={activeProposals || []} />

          {(!activeProposals || activeProposals.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🗳️</div>
              <h3 className="text-xl font-bold text-white mb-2">No Active Votes</h3>
              <p className="text-white/60">
                Check back when new proposals are created
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}
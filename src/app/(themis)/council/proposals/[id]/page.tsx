// app/(themis)/council/proposals/[id]/page.tsx
// Proposal Detail - Single proposal view
// Feeling: Contemplative, engaged, empowered

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { ProposalText } from '@/components/council/ProposalText';
import { DiscussionThread } from '@/components/council/DiscussionThread';
import { VoteButtons } from '@/components/council/VoteButtons';
import { ResultsChart } from '@/components/council/ResultsChart';
import { CommentSection } from '@/components/council/CommentSection';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface ProposalDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProposalDetailPage({ params }: ProposalDetailPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: proposal } = await supabase
    .from('proposals')
    .select('*, proposer:proposer_id(*)')
    .eq('id', id)
    .single();

  if (!proposal) {
    notFound();
  }

  // Check if user has voted
  let hasVoted = false;
  let userVote = null;
  if (session) {
    const { data: vote } = await supabase
      .from('votes')
      .select('*')
      .eq('proposal_id', id)
      .eq('user_id', session.user.id)
      .single();
    hasVoted = !!vote;
    userVote = vote;
  }

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
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                proposal.status === 'active' ? 'bg-green-500/20 text-green-400' :
                proposal.status === 'passed' ? 'bg-blue-500/20 text-blue-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {proposal.status}
              </span>
              <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
                {proposal.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {proposal.title}
            </h1>
            <ProposalText content={proposal.content} />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <DiscussionThread proposalId={proposal.id} />
              <CommentSection proposalId={proposal.id} />
            </div>

            <div className="space-y-8">
              {proposal.status === 'active' && (
                <VoteButtons 
                  proposalId={proposal.id} 
                  hasVoted={hasVoted}
                  userVote={userVote}
                />
              )}
              <ResultsChart proposalId={proposal.id} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
// src/components/asgard/domains/themis/voting/VotingHub.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Vote, ThumbsUp, ThumbsDown, Clock, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface Proposal {
  proposals_id: string;
  title: string;
  description: string;
  status: string;
  votes_for: number;
  votes_against: number;
  deadline: string;
  category: string;
}

export function VotingHub() {
  const { profile } = useAuth();
  const [activeProposals, setActiveProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/generated/themis-governance/proposals?status=active&order=created_at.desc')
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setActiveProposals(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (proposalId: string, vote: 'for' | 'against') => {
    setVotingId(proposalId);
    await new Promise((r) => setTimeout(r, 600));
    setActiveProposals((prev) =>
      prev.map((p) =>
        p.proposals_id === proposalId
          ? { ...p, votes_for: vote === 'for' ? p.votes_for + 1 : p.votes_for, votes_against: vote === 'against' ? p.votes_against + 1 : p.votes_against }
          : p
      )
    );
    setVotingId(null);
  };

  const getVotePercent = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes;
    return total === 0 ? 0 : Math.round((forVotes / total) * 100);
  };

  const formatDeadline = (dateStr: string) => {
    if (!dateStr) return 'No deadline';
    const days = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Ending soon';
    if (days === 1) return '1 day remaining';
    return `${days} days remaining`;
  };

  const isCouncilTier = profile?.user_tier === 'council' || profile?.is_admin === true;

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-6">
            {[1,2,3].map((i) => (<Skeleton key={i} variant="card" className="h-64" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Council
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Voting</h1>
          <p className="text-sm text-star-dust/40 mt-1">Your voice shapes the Sanctuary</p>
        </div>

        {!isCouncilTier && (
          <Card
            data={{ id: 'voting-tier', type: 'value', title: 'Council Tier Required', value: '' }}
            variant="glass"
            radius="lg"
            shadow="sm"
            className="p-6 mb-8 text-center"
          >
            <Shield className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <p className="text-star-dust/60 text-sm">
              Voting requires Council tier. Reach 500 sovereignty to unlock your voice in governance.
            </p>
          </Card>
        )}

        {activeProposals.length === 0 ? (
          <div className="text-center py-20">
            <Vote className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">No active proposals to vote on</p>
            <p className="text-star-dust/30 text-sm">When proposals are created, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeProposals.map((proposal) => {
              const cardData: CardData = {
                id: proposal.proposals_id,
                type: 'proposal',
                title: proposal.title,
                description: proposal.description,
                status: 'active' as any,
                votesFor: proposal.votes_for,
                votesAgainst: proposal.votes_against,
              };
              const votePercent = getVotePercent(proposal.votes_for, proposal.votes_against);

              return (
                <Card key={proposal.proposals_id} data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" size="sm" className="text-[10px] bg-emerald-500/20 text-emerald-400">Active</Badge>
                        {proposal.category && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{proposal.category}</Badge>}
                      </div>
                      <Link href={`/council/proposals/${proposal.proposals_id}`} className="text-lg font-semibold text-star-dust hover:text-neurospark transition-colors">
                        {proposal.title}
                      </Link>
                      <p className="text-sm text-star-dust/50 mt-2 line-clamp-2">{proposal.description}</p>
                    </div>
                  </div>

                  {/* Vote Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="flex items-center gap-1 text-emerald-400"><ThumbsUp size={12} />{proposal.votes_for} for</span>
                      <span className="flex items-center gap-1 text-red-400"><ThumbsDown size={12} />{proposal.votes_against} against</span>
                      <span className="flex items-center gap-1 text-star-dust/30"><Clock size={12} />{formatDeadline(proposal.deadline)}</span>
                    </div>
                    <Progress value={votePercent} max={100} variant="default" size="sm" />
                  </div>

                  {/* Vote Buttons */}
                  {isCouncilTier && (
                    <div className="flex gap-3">
                      <Button
                        variant="primary" size="sm"
                        onClick={() => handleVote(proposal.proposals_id, 'for')}
                        loading={votingId === proposal.proposals_id}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />Vote For
                      </Button>
                      <Button
                        variant="ghost" size="sm"
                        onClick={() => handleVote(proposal.proposals_id, 'against')}
                        loading={votingId === proposal.proposals_id}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />Vote Against
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Covenant Note */}
        <Card
          data={{ id: 'voting-covenant', type: 'value', title: 'Voting Covenant', value: '' }}
          variant="glass"
          radius="lg"
          shadow="sm"
          className="mt-12 p-6 text-center"
        >
          <Sparkles className="h-5 w-5 text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            Every vote is recorded on the public ledger. Your voice is permanent. Vote with intention.
          </p>
        </Card>
      </div>
    </main>
  );
}
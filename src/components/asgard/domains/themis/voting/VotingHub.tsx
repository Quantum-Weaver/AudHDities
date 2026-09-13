// src/components/asgard/domains/themis/voting/VotingHub.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, Vote, ThumbsUp, ThumbsDown, MinusCircle, Clock, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { statusColor, statusLabel } from '@/components/asgard/domains/themis/status';
import {
  castVote,
  isVotable,
  readOwnVotes,
  type VoteChoice,
} from '@/components/asgard/domains/themis/voting/vote';
import type { ProposalsRow } from '@/lib/generated/types/themis-governance/proposals';
import type { CardData } from '@/types/components/runes/card.types';

export function VotingHub() {
  const { user, roles, isLoading } = useUser();
  const [proposals, setProposals] = useState<ProposalsRow[]>([]);
  const [ownVotes, setOwnVotes] = useState<Record<string, VoteChoice>>({});
  const [now, setNow] = useState(0);
  const [reading, setReading] = useState(true);
  const [fault, setFault] = useState<string | null>(null);
  const [votingId, setVotingId] = useState<string | null>(null);

  const isCouncil = roles.includes('council');

  useEffect(() => {
    if (isLoading) return;
    let alive = true;

    const read = async () => {
      const params = new URLSearchParams({ sort: 'created_at', order: 'desc', limit: '50' });
      try {
        const response = await fetch(`/api/generated/themis-governance/proposals?${params.toString()}`);
        const result = await response.json();
        if (!alive) return;
        const rows: ProposalsRow[] = result.success ? (result.data?.data ?? []) : [];
        const moment = Date.now();
        const open = rows.filter((row) => isVotable(row, moment));
        setProposals(open);
        setNow(moment);
        if (!result.success) setFault(result.error || 'The proposals did not answer.');
        if (user && open.length > 0) {
          const cast = await readOwnVotes(open.map((row) => row.id), user.id);
          if (alive) setOwnVotes(cast);
        }
      } catch {
        if (alive) setFault('The proposals did not answer.');
      } finally {
        if (alive) setReading(false);
      }
    };

    void read();
    return () => { alive = false; };
  }, [isLoading, user]);

  const vote = useCallback(async (proposalId: string, choice: VoteChoice) => {
    if (!user) return;
    setVotingId(proposalId);
    setFault(null);
    const result = await castVote(proposalId, user.id, choice);
    if (result.error) {
      setFault(result.error);
    } else {
      setOwnVotes((prev) => ({ ...prev, [proposalId]: choice }));
      const counts = result.counts;
      if (counts) {
        setProposals((prev) =>
          prev.map((row) => (row.id === proposalId ? { ...row, ...counts } : row))
        );
      }
    }
    setVotingId(null);
  }, [user]);

  const votePercent = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes;
    return total === 0 ? 0 : Math.round((forVotes / total) * 100);
  };

  const formatDeadline = (dateStr: string | null) => {
    if (!dateStr || !now) return 'No deadline';
    const days = Math.ceil((new Date(dateStr).getTime() - now) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Ending soon';
    if (days === 1) return '1 day remaining';
    return `${days} days remaining`;
  };

  if (isLoading || reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (<Skeleton key={i} variant="card" className="h-64" />))}
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

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

        {!isCouncil && (
          <Card
            data={{ id: 'voting-tier', type: 'value', title: 'The Council Casts the Vote', value: '' }}
            variant="glass"
            radius="lg"
            shadow="sm"
            className="p-6 mb-8 text-center"
          >
            <Shield className="h-8 w-8 text-hearth-gold mx-auto mb-3" />
            <p className="text-star-dust/60 text-sm">
              The vote is held by the Council role. The proposals and their standing counts are open to everyone.
            </p>
          </Card>
        )}

        {proposals.length === 0 ? (
          <div className="text-center py-20">
            <Vote className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">No proposals are open for a vote</p>
            <p className="text-star-dust/30 text-sm">When a proposal opens, it will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {proposals.map((proposal) => {
              const cardData: CardData = {
                id: proposal.id,
                type: 'value',
                title: proposal.name,
                value: proposal.status,
                description: proposal.description ?? undefined,
              };
              const percent = votePercent(proposal.votes_for, proposal.votes_against);
              const cast = ownVotes[proposal.id];

              return (
                <Card key={proposal.id} data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" size="sm" className={cn('text-[10px]', statusColor(proposal.status))}>
                          {statusLabel(proposal.status)}
                        </Badge>
                        {proposal.proposal_type && (
                          <Badge variant="outline" size="sm" className="text-[10px] capitalize">{proposal.proposal_type}</Badge>
                        )}
                      </div>
                      <Link href={`/council/proposals/${proposal.id}`} className="text-lg font-semibold text-star-dust hover:text-neurospark transition-colors">
                        {proposal.name}
                      </Link>
                      {proposal.description && (
                        <p className="text-sm text-star-dust/50 mt-2 line-clamp-2">{proposal.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="flex items-center gap-1 text-sanctuary-green"><ThumbsUp size={12} />{proposal.votes_for} for</span>
                      <span className="flex items-center gap-1 text-fire-base"><ThumbsDown size={12} />{proposal.votes_against} against</span>
                      <span className="flex items-center gap-1 text-star-dust/30"><Clock size={12} />{formatDeadline(proposal.voting_ends_at)}</span>
                    </div>
                    <Progress value={percent} max={100} variant="default" size="sm" />
                  </div>

                  {isCouncil && (
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant={cast === 'for' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => vote(proposal.id, 'for')}
                        loading={votingId === proposal.id}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />Vote For
                      </Button>
                      <Button
                        variant={cast === 'against' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => vote(proposal.id, 'against')}
                        loading={votingId === proposal.id}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />Vote Against
                      </Button>
                      <Button
                        variant={cast === 'abstain' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => vote(proposal.id, 'abstain')}
                        loading={votingId === proposal.id}
                      >
                        <MinusCircle className="h-4 w-4 mr-2" />Abstain
                      </Button>
                      {cast && (
                        <span className="text-xs text-star-dust/40">Your voice is recorded as {cast}.</span>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        <Card
          data={{ id: 'voting-covenant', type: 'value', title: 'Voting Covenant', value: '' }}
          variant="glass"
          radius="lg"
          shadow="sm"
          className="mt-12 p-6 text-center"
        >
          <Sparkles className="h-5 w-5 text-mood-creative mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            One member, one living vote. A vote may change until the deadline closes, and every change is kept.
          </p>
        </Card>
      </div>
    </main>
  );
}

// src/components/asgard/domains/themis/proposals/ProposalDetail.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, ThumbsUp, ThumbsDown, MinusCircle, Clock, Users, Shield } from 'lucide-react';
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

export function ProposalDetail() {
  const params = useParams();
  const { user, roles, isLoading } = useUser();
  const [proposal, setProposal] = useState<ProposalsRow | null>(null);
  const [ownVote, setOwnVote] = useState<VoteChoice | null>(null);
  const [now, setNow] = useState(0);
  const [reading, setReading] = useState(true);
  const [fault, setFault] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);

  const id = typeof params.id === 'string' ? params.id : '';
  const isCouncil = roles.includes('council');

  useEffect(() => {
    if (isLoading || !id) return;
    let alive = true;

    const read = async () => {
      try {
        const response = await fetch(`/api/generated/themis-governance/proposals/${id}`);
        const result = await response.json();
        if (!alive) return;
        if (result.success) {
          setProposal(result.data);
          setNow(Date.now());
          if (user) {
            const cast = await readOwnVotes([id], user.id);
            if (alive) setOwnVote(cast[id] ?? null);
          }
        } else {
          setFault(result.error || 'This proposal could not be read.');
        }
      } catch {
        if (alive) setFault('This proposal could not be read.');
      } finally {
        if (alive) setReading(false);
      }
    };

    void read();
    return () => { alive = false; };
  }, [id, isLoading, user]);

  const vote = useCallback(async (choice: VoteChoice) => {
    if (!proposal || !user) return;
    setVoting(true);
    setFault(null);
    const result = await castVote(proposal.id, user.id, choice);
    if (result.error) {
      setFault(result.error);
    } else {
      setOwnVote(choice);
      const counts = result.counts;
      if (counts) setProposal((prev) => (prev ? { ...prev, ...counts } : prev));
    }
    setVoting(false);
  }, [proposal, user]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });

  if (isLoading || reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  if (!proposal) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/40">{fault ?? 'This proposal has been withdrawn.'}</p>
          <Link href="/council/proposals" className="text-neurospark hover:underline mt-4 inline-block">Return to Proposals</Link>
        </div>
      </main>
    );
  }

  const totalVotes = proposal.votes_for + proposal.votes_against;
  const forPercent = totalVotes > 0 ? Math.round((proposal.votes_for / totalVotes) * 100) : 0;
  const open = isVotable(proposal, now);
  const canVote = open && isCouncil;

  const cardData: CardData = {
    id: proposal.id,
    type: 'value',
    title: proposal.name,
    value: proposal.status,
    description: proposal.description ?? undefined,
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/council/proposals" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to Proposals
        </Link>

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" size="sm" className={cn('text-[10px]', statusColor(proposal.status))}>
              {statusLabel(proposal.status)}
            </Badge>
            {proposal.proposal_type && (
              <Badge variant="outline" size="sm" className="text-[10px] capitalize">
                {proposal.proposal_type}
              </Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-4">{proposal.name}</h1>
          {proposal.description && (
            <p className="text-star-dust/70 leading-relaxed mb-8 whitespace-pre-line">{proposal.description}</p>
          )}

          <div className="bg-white/5 rounded-xl p-6 mb-8">
            <h2 className="text-sm font-medium text-star-dust/60 mb-4">Vote Results</h2>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-sanctuary-green" />
                <span className="text-sanctuary-green font-bold text-lg">{proposal.votes_for}</span>
                <span className="text-xs text-star-dust/40">for</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsDown className="h-5 w-5 text-fire-base" />
                <span className="text-fire-base font-bold text-lg">{proposal.votes_against}</span>
                <span className="text-xs text-star-dust/40">against</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Users className="h-4 w-4 text-star-dust/40" />
                <span className="text-star-dust/40 text-sm">{totalVotes} total votes</span>
              </div>
            </div>
            <Progress value={forPercent} max={100} variant="default" size="md" />
          </div>

          {proposal.voting_ends_at && (
            <div className="flex items-center gap-2 text-sm text-star-dust/40 mb-8">
              <Clock size={14} />
              <span>Voting ends: {formatDate(proposal.voting_ends_at)}</span>
            </div>
          )}

          {canVote && (
            <div className="flex flex-wrap items-center gap-3">
              <Button variant={ownVote === 'for' ? 'primary' : 'outline'} size="md" onClick={() => vote('for')} loading={voting}>
                <ThumbsUp className="h-4 w-4 mr-2" />Vote For
              </Button>
              <Button variant={ownVote === 'against' ? 'primary' : 'outline'} size="md" onClick={() => vote('against')} loading={voting}>
                <ThumbsDown className="h-4 w-4 mr-2" />Vote Against
              </Button>
              <Button variant={ownVote === 'abstain' ? 'primary' : 'ghost'} size="md" onClick={() => vote('abstain')} loading={voting}>
                <MinusCircle className="h-4 w-4 mr-2" />Abstain
              </Button>
              {ownVote && (
                <span className="text-xs text-star-dust/40">Your voice is recorded as {ownVote}.</span>
              )}
            </div>
          )}

          {!canVote && open && (
            <div className="flex items-center gap-2 text-sm text-hearth-gold bg-hearth-gold/10 rounded-xl px-4 py-3">
              <Shield size={14} />
              <span>The vote is held by the Council role.</span>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}

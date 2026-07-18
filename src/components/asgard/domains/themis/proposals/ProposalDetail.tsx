// src/components/asgard/domains/themis/proposals/ProposalDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, ThumbsUp, ThumbsDown, Clock, Users, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface Proposal {
  proposals_id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  votes_for: number;
  votes_against: number;
  deadline: string;
  proposer_id: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  passed: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  draft: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export function ProposalDetail() {
  const params = useParams();
  const router = useRouter();
  const { profile, roles } = useUser();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    fetch(`/api/generated/themis-governance/proposals/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setProposal(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleVote = async (vote: 'for' | 'against') => {
    if (!proposal || voting) return;
    setVoting(true);
    try {
      // In production, this would call the voting API
      await new Promise((r) => setTimeout(r, 500));
      setProposal((prev) => prev ? {
        ...prev,
        votes_for: vote === 'for' ? prev.votes_for + 1 : prev.votes_for,
        votes_against: vote === 'against' ? prev.votes_against + 1 : prev.votes_against,
      } : null);
    } catch (err) {
      console.error('Vote failed:', err);
    } finally {
      setVoting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'No deadline';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  };

  if (loading) {
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
          <p className="text-star-dust/40">This proposal has been withdrawn.</p>
          <Link href="/council/proposals" className="text-neurospark hover:underline mt-4 inline-block">Return to Proposals</Link>
        </div>
      </main>
    );
  }

  const totalVotes = proposal.votes_for + proposal.votes_against;
  const forPercent = totalVotes > 0 ? Math.round((proposal.votes_for / totalVotes) * 100) : 0;
  const isCouncilTier = roles.includes('council') || roles.includes('admin');
  const canVote = proposal.status === 'active' && isCouncilTier;

  const cardData: CardData = {
    id: proposal.proposals_id,
    type: 'proposal',
    title: proposal.title,
    description: proposal.description,
    status: proposal.status as any,
    votesFor: proposal.votes_for,
    votesAgainst: proposal.votes_against,
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/council/proposals" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to Proposals
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          {/* Status + Category */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', STATUS_COLORS[proposal.status] || '')}>
              {proposal.status}
            </Badge>
            {proposal.category && (
              <Badge variant="outline" size="sm" className="text-[10px] capitalize">
                {proposal.category}
              </Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-4">{proposal.title}</h1>
          <p className="text-star-dust/70 leading-relaxed mb-8">{proposal.description}</p>

          {/* Vote Stats */}
          <div className="bg-white/5 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-medium text-star-dust/60 mb-4">Vote Results</h3>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-lg">{proposal.votes_for}</span>
                <span className="text-xs text-star-dust/40">for</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsDown className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-bold text-lg">{proposal.votes_against}</span>
                <span className="text-xs text-star-dust/40">against</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Users className="h-4 w-4 text-star-dust/40" />
                <span className="text-star-dust/40 text-sm">{totalVotes} total votes</span>
              </div>
            </div>
            <Progress value={forPercent} max={100} variant="default" size="md" />
          </div>

          {/* Deadline */}
          {proposal.deadline && (
            <div className="flex items-center gap-2 text-sm text-star-dust/40 mb-8">
              <Clock size={14} />
              <span>Voting ends: {formatDate(proposal.deadline)}</span>
            </div>
          )}

          {/* Vote Buttons */}
          {canVote && (
            <div className="flex gap-3">
              <Button variant="primary" size="md" onClick={() => handleVote('for')} loading={voting}>
                <ThumbsUp className="h-4 w-4 mr-2" />Vote For
              </Button>
              <Button variant="ghost" size="md" onClick={() => handleVote('against')} loading={voting}>
                <ThumbsDown className="h-4 w-4 mr-2" />Vote Against
              </Button>
            </div>
          )}

          {!canVote && proposal.status === 'active' && (
            <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-500/10 rounded-xl px-4 py-3">
              <Shield size={14} />
              <span>Council tier required to vote. Reach 500 sovereignty to participate.</span>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
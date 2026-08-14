// src/components/asgard/domains/themis/proposals/ProposalsGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, ScrollText, Search, Plus, Clock, Users } from 'lucide-react';
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

const CATEGORY_LABELS: Record<string, string> = {
  governance: 'Governance',
  economic: 'Economic',
  community: 'Community',
  technical: 'Technical',
  cultural: 'Cultural',
};

export function ProposalsGallery() {
  const { user, profile, roles } = useUser();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('/api/generated/themis-governance/proposals?order=created_at.desc');
        const result = await response.json();
        if (result.success) {
          setProposals(result.data?.data || result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch proposals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, []);

  const statuses = useMemo(() => {
    const set = new Set<string>();
    proposals.forEach((p) => set.add(p.status));
    return Array.from(set);
  }, [proposals]);

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !selectedStatus || p.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [proposals, searchTerm, selectedStatus]);

  const isCouncilTier = roles.includes('council') || roles.includes('admin');

  const formatDate = (dateStr: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getVotePercentage = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes;
    if (total === 0) return 0;
    return Math.round((forVotes / total) * 100);
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (<Skeleton key={i} variant="card" className="h-56" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
              <ArrowLeft className="h-4 w-4" />Return to the Council
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">Proposals</h1>
            <p className="text-sm text-star-dust/40 mt-1">Ideas that deserve consideration</p>
          </div>
          {isCouncilTier && (
            <Link href="/council/proposals/new">
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Proposal
              </Button>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
            <input type="text" placeholder="Search proposals..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedStatus(null)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', !selectedStatus ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
            >All</button>
            {statuses.map((s) => (
              <button key={s} onClick={() => setSelectedStatus(selectedStatus === s ? null : s)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border capitalize', STATUS_COLORS[s] || 'bg-white/5', selectedStatus === s ? 'ring-1 ring-current' : '')}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProposals.length === 0 && (
          <div className="text-center py-20">
            <ScrollText className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">
              {searchTerm ? 'No proposals match your search' : 'No proposals yet'}
            </p>
            <p className="text-star-dust/30 text-sm">
              {isCouncilTier ? 'Be the first to propose a change.' : 'Proposals will appear here when created by Council members.'}
            </p>
          </div>
        )}

        {/* Proposals Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProposals.map((proposal) => {
            const cardData: CardData = {
              id: proposal.proposals_id,
              type: 'proposal',
              title: proposal.title,
              description: proposal.description,
              status: proposal.status as any,
              votesFor: proposal.votes_for,
              votesAgainst: proposal.votes_against,
            };

            const votePercent = getVotePercentage(proposal.votes_for, proposal.votes_against);
            const isActive = proposal.status === 'active';

            return (
              <Link key={proposal.proposals_id} href={`/council/proposals/${proposal.proposals_id}`}>
                <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', STATUS_COLORS[proposal.status] || '')}>
                      {proposal.status}
                    </Badge>
                    {proposal.category && (
                      <Badge variant="outline" size="sm" className="text-[10px]">
                        {CATEGORY_LABELS[proposal.category] || proposal.category}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-star-dust mb-2">{proposal.title}</h3>
                  <p className="text-sm text-star-dust/50 line-clamp-2 mb-4">{proposal.description}</p>

                  {/* Vote Progress */}
                  {(proposal.votes_for > 0 || proposal.votes_against > 0) && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-emerald-400">{proposal.votes_for} for</span>
                        <span className="text-red-400">{proposal.votes_against} against</span>
                      </div>
                      <Progress value={votePercent} max={100} variant="default" size="sm" />
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center gap-3 mt-auto text-xs text-star-dust/40">
                    {proposal.deadline && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(proposal.deadline)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {proposal.votes_for + proposal.votes_against} votes
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
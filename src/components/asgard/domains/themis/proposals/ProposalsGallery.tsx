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
import { statusColor, statusLabel } from '@/components/asgard/domains/themis/status';
import type { ProposalsRow } from '@/lib/generated/types/themis-governance/proposals';
import type { CardData } from '@/types/components/runes/card.types';

export function ProposalsGallery() {
  const { roles, isLoading } = useUser();
  const [proposals, setProposals] = useState<ProposalsRow[]>([]);
  const [reading, setReading] = useState(true);
  const [fault, setFault] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const canPropose = roles.includes('council') || roles.includes('admin');

  useEffect(() => {
    let alive = true;

    const read = async () => {
      const params = new URLSearchParams({ sort: 'created_at', order: 'desc', limit: '50' });
      try {
        const response = await fetch(`/api/generated/themis-governance/proposals?${params.toString()}`);
        const result = await response.json();
        if (!alive) return;
        if (result.success) setProposals(result.data?.data ?? []);
        else setFault(result.error || 'The proposals did not answer.');
      } catch {
        if (alive) setFault('The proposals did not answer.');
      } finally {
        if (alive) setReading(false);
      }
    };

    void read();
    return () => { alive = false; };
  }, []);

  const statuses = useMemo(() => {
    const set = new Set<string>();
    proposals.forEach((p) => set.add(p.status));
    return Array.from(set);
  }, [proposals]);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return proposals.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(term) || (p.description ?? '').toLowerCase().includes(term);
      const matchesStatus = !selectedStatus || p.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [proposals, searchTerm, selectedStatus]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const votePercent = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes;
    return total === 0 ? 0 : Math.round((forVotes / total) * 100);
  };

  if (isLoading || reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (<Skeleton key={i} variant="card" className="h-56" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
              <ArrowLeft className="h-4 w-4" />Return to the Council
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">Proposals</h1>
            <p className="text-sm text-star-dust/40 mt-1">Ideas that deserve consideration</p>
          </div>
          {canPropose && (
            <Link href="/council/proposals/new">
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Proposal
              </Button>
            </Link>
          )}
        </div>

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

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
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', statusColor(s), selectedStatus === s ? 'ring-1 ring-current' : '')}
              >{statusLabel(s)}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <ScrollText className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">
              {searchTerm ? 'No proposals match your search' : 'No proposals yet'}
            </p>
            <p className="text-star-dust/30 text-sm">
              {canPropose ? 'Be the first to propose a change.' : 'Proposals will appear here when created by Council members.'}
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proposal) => {
            const cardData: CardData = {
              id: proposal.id,
              type: 'value',
              title: proposal.name,
              value: proposal.status,
              description: proposal.description ?? undefined,
            };
            const percent = votePercent(proposal.votes_for, proposal.votes_against);

            return (
              <Link key={proposal.id} href={`/council/proposals/${proposal.id}`}>
                <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" size="sm" className={cn('text-[10px]', statusColor(proposal.status))}>
                      {statusLabel(proposal.status)}
                    </Badge>
                    {proposal.proposal_type && (
                      <Badge variant="outline" size="sm" className="text-[10px] capitalize">
                        {proposal.proposal_type}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-star-dust mb-2">{proposal.name}</h3>
                  {proposal.description && (
                    <p className="text-sm text-star-dust/50 line-clamp-2 mb-4">{proposal.description}</p>
                  )}

                  {(proposal.votes_for > 0 || proposal.votes_against > 0) && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-sanctuary-green">{proposal.votes_for} for</span>
                        <span className="text-fire-base">{proposal.votes_against} against</span>
                      </div>
                      <Progress value={percent} max={100} variant="default" size="sm" />
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-auto text-xs text-star-dust/40">
                    {proposal.voting_ends_at && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(proposal.voting_ends_at)}
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

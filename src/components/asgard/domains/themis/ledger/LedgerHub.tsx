// src/components/asgard/domains/themis/ledger/LedgerHub.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, FileText, Eye, DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface LedgerEntry {
  ledger_id: string;
  entry_type: string;
  description: string;
  amount_cents: number;
  from_entity: string;
  to_entity: string;
  from_profile_id: string | null;
  to_profile_id: string | null;
  public_note: string | null;
  created_at: string;
}

const ENTRY_COLORS: Record<string, string> = {
  sale: 'bg-neurospark/20 text-neurospark border-neurospark/30',
  platform_fee: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  residual_payout: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  covenant_distribution: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  infrastructure: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export function LedgerHub() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/themis-governance/ledger?order=created_at.desc&limit=50')
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setEntries(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const totalVolume = entries.reduce((sum, e) => sum + e.amount_cents, 0);
    const salesCount = entries.filter((e) => e.entry_type === 'sale').length;
    const payoutCount = entries.filter((e) => e.entry_type === 'residual_payout' || e.entry_type === 'covenant_distribution').length;
    return { totalVolume, salesCount, payoutCount };
  }, [entries]);

  const formatCents = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1,2,3].map((i) => (<Skeleton key={i} variant="card" className="h-24" />))}
          </div>
          <div className="space-y-3">
            {[1,2,3,4,5].map((i) => (<Skeleton key={i} variant="card" className="h-20" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Council
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Ledger</h1>
          <p className="text-sm text-star-dust/40 mt-1">Complete transparency, every transaction visible</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card data={{ id: 'stat-volume', type: 'stat', title: 'Total Volume', value: formatCents(stats.totalVolume) }}
            variant="glass" radius="lg" shadow="sm" className="p-4 text-center">
            <DollarSign className="h-5 w-5 text-neurospark mx-auto mb-1" />
            <p className="text-neurospark font-bold text-lg">{formatCents(stats.totalVolume)}</p>
            <p className="text-xs text-star-dust/40">Total Volume</p>
          </Card>
          <Card data={{ id: 'stat-sales', type: 'stat', title: 'Sales', value: stats.salesCount.toString() }}
            variant="glass" radius="lg" shadow="sm" className="p-4 text-center">
            <TrendingUp className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-emerald-400 font-bold text-lg">{stats.salesCount}</p>
            <p className="text-xs text-star-dust/40">Transactions</p>
          </Card>
          <Card data={{ id: 'stat-payouts', type: 'stat', title: 'Payouts', value: stats.payoutCount.toString() }}
            variant="glass" radius="lg" shadow="sm" className="p-4 text-center">
            <Activity className="h-5 w-5 text-purple-400 mx-auto mb-1" />
            <p className="text-purple-400 font-bold text-lg">{stats.payoutCount}</p>
            <p className="text-xs text-star-dust/40">Distributions</p>
          </Card>
        </div>

        {/* Empty State */}
        {entries.length === 0 && (
          <div className="text-center py-20">
            <FileText className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">The ledger awaits its first entry</p>
            <p className="text-star-dust/30 text-sm">Transactions will appear here when the economy begins to flow.</p>
          </div>
        )}

        {/* Ledger Entries */}
        <div className="space-y-2">
          {entries.map((entry) => {
            const cardData: CardData = { id: entry.ledger_id, type: 'value', title: entry.description, value: formatCents(entry.amount_cents) };
            return (
              <Card key={entry.ledger_id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', ENTRY_COLORS[entry.entry_type] || '')}>
                      {entry.entry_type?.replace(/_/g, ' ')}
                    </Badge>
                    <div>
                      <p className="text-sm text-star-dust">{entry.description}</p>
                      {entry.public_note && <p className="text-xs text-star-dust/40">{entry.public_note}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn('text-sm font-mono font-bold', entry.entry_type === 'sale' ? 'text-neurospark' : 'text-star-dust/60')}>
                      {formatCents(entry.amount_cents)}
                    </p>
                    <p className="text-[10px] text-star-dust/30">{formatDate(entry.created_at)}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Covenant */}
        <Card data={{ id: 'ledger-covenant', type: 'value', title: 'Transparency Covenant', value: '' }}
          variant="glass" radius="lg" shadow="sm" className="mt-8 p-6 text-center">
          <Eye className="h-5 w-5 text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            Every transaction is public. Every fee is visible. Every payout is recorded. This is the covenant of transparency.
          </p>
        </Card>
      </div>
    </main>
  );
}
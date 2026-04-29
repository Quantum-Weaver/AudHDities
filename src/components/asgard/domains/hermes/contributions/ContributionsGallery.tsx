// src/components/asgard/domains/hermes/contributions/ContributionsGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, HandCoins, Search, Percent } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import type { CardData } from '@/types/components/runes/card.types';

interface ContributionItem {
  id: string; product_id: string; contributor_id: string;
  contribution_type: string; percent_share: number;
  is_residual_eligible: boolean | null; is_one_time: boolean | null;
}

const TYPE_COLORS: Record<string, string> = {
  concept: 'bg-purple-500/20 text-purple-400', code: 'bg-cyan-500/20 text-cyan-400',
  design: 'bg-pink-500/20 text-pink-400', content: 'bg-emerald-500/20 text-emerald-400',
  testing: 'bg-amber-500/20 text-amber-400', promotion: 'bg-rose-500/20 text-rose-400',
  infrastructure: 'bg-slate-500/20 text-slate-400',
};

export function ContributionsGallery() {
  const { user } = useAuth();
  const [items, setItems] = useState<ContributionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/generated/plutus-economics/contributions?contributor_id=${user.id}&order=created_at.desc`)
      .then(r => r.json()).then(result => { if (result.success) setItems(result.data?.data || result.data || []); })
      .catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const filtered = useMemo(() => items.filter(i => i.contribution_type.toLowerCase().includes(searchTerm.toLowerCase())), [items, searchTerm]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-32" />)}</div></div></main>);

  if (!user) return (<main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6 text-center"><p className="text-star-dust/60">Sign in to view your contributions.</p></div></main>);

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8"><Link href="/bazaar" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to the Bazaar</Link><h1 className="text-2xl font-bold text-star-dust">Contributions Ledger</h1><p className="text-sm text-star-dust/40 mt-1">Your impact, recorded forever</p></div>
      <div className="relative mb-8"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} /><input type="text" placeholder="Filter by type..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none" /></div>
      {filtered.length === 0 && (<div className="text-center py-20"><HandCoins className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">{searchTerm ? 'No contributions match' : 'Your contributions will appear here'}</p></div>)}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(i => {
          const cd: CardData = { id: i.id, type: 'value', title: i.contribution_type, value: `${i.percent_share}%` };
          return (
            <Card key={i.id} data={cd} variant="glass" radius="lg" shadow="sm" className="p-5 h-full">
              <div className="flex items-center justify-between mb-3"><Badge variant="outline" size="sm" className={`text-[10px] capitalize ${TYPE_COLORS[i.contribution_type] || ''}`}>{i.contribution_type}</Badge><span className="flex items-center gap-1 text-neurospark font-bold"><Percent size={14} />{i.percent_share}%</span></div>
              <p className="text-sm text-star-dust/50">Product: {i.product_id}</p>
              <div className="flex gap-2 mt-3">{i.is_residual_eligible && <Badge variant="outline" size="sm" className="text-[10px] bg-emerald-500/20 text-emerald-400">Residual</Badge>}{i.is_one_time && <Badge variant="outline" size="sm" className="text-[10px] bg-amber-500/20 text-amber-400">One-Time</Badge>}</div>
            </Card>
          );
        })}
      </div>
    </div></main>
  );
}
// src/components/asgard/domains/athena/badges/BadgesGallery.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Award, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSigilsList } from '@/hooks/generated/athena-gamification/sigils';
import type { CardData } from '@/types/components/runes/card.types';

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const RARITY_GLOW: Record<string, string> = {
  common: 'none',
  rare: '0 0 12px rgba(9,132,227,0.3)',
  epic: '0 0 16px rgba(108,92,231,0.4)',
  legendary: '0 0 20px rgba(253,203,110,0.5)',
  mythic: '0 0 24px rgba(34,211,238,0.6)',
};

// Stable params — the generated list hooks refetch on params IDENTITY
// (the StatusBar pattern); an inline object here would loop the fetch.
const SIGILS_PARAMS = {
  filters: { status: 'published' },
  sort: 'display_order',
  order: 'asc' as const,
  limit: 100,
};

export function BadgesGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);

  const { data: sigils, loading } = useSigilsList(SIGILS_PARAMS);

  const rarities = useMemo(() => {
    const set = new Set<string>();
    sigils.forEach((s) => { if (s.rarity) set.add(s.rarity); });
    return Array.from(set);
  }, [sigils]);

  const filteredSigils = useMemo(() => {
    return sigils.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = !selectedRarity || s.rarity === selectedRarity;
      return matchesSearch && matchesRarity;
    });
  }, [sigils, searchTerm, selectedRarity]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} variant="card" className="h-44" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/library" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />
            Return to the Library
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Honors</h1>
          <p className="text-sm text-star-dust/40 mt-1">Sigils earned through sovereignty</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
            <input
              type="text" placeholder="Search sigils..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRarity(null)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all', !selectedRarity ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10 hover:text-star-dust hover:border-white/20')}
            >
              All Rarities
            </button>
            {rarities.map((r) => (
              <button key={r} onClick={() => setSelectedRarity(selectedRarity === r ? null : r)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize', RARITY_COLORS[r] || 'bg-white/5', selectedRarity === r ? 'ring-1 ring-current' : '')}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {filteredSigils.length === 0 && (
          <div className="text-center py-20">
            <Award className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">{searchTerm ? 'No sigils match your search' : 'The honors await those who walk the path'}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSigils.map((sigil) => {
            const cardData: CardData = { id: sigil.id, type: 'value', title: sigil.name, value: sigil.rarity || '' };
            const glow = sigil.rarity ? RARITY_GLOW[sigil.rarity] : 'none';
            return (
              <Link key={sigil.id} href={`/library/badges/${sigil.slug}`}>
                <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full"
                  style={{ boxShadow: glow || 'none' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-white/5 border-2 border-white/10">
                      {sigil.icon_emoji || '🪶'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-star-dust mb-1">{sigil.name}</h3>
                      <p className="text-sm text-star-dust/50 line-clamp-2 mb-3">{sigil.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {sigil.rarity && <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[sigil.rarity] || '')}>{sigil.rarity}</Badge>}
                        {sigil.category && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{sigil.category}</Badge>}
                      </div>
                    </div>
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

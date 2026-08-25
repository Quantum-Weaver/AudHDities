// src/components/asgard/domains/athena/bubbles/BubblesGallery.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Droplets, Play, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBubblesList } from '@/lib/generated/hooks/athena-gamification/bubbles';
import { useCollectionSetsList } from '@/lib/generated/hooks/hestia-core/collection_sets';
import type { CardData } from '@/types/components/runes/card.types';

// The evolved bubbles table derives what it dropped: points and colors come
// from rarity, collections resolve through collection_sets (the game's own
// pattern, BubblePopGame.tsx).
const RARITY_POINTS: Record<string, number> = {
  common: 1, rare: 3, epic: 5, legendary: 10, mythic: 25,
};

const RARITY_FILL: Record<string, { color: string; glow: string }> = {
  common: { color: '#94a3b8', glow: '#94a3b855' },
  rare: { color: '#22d3ee', glow: '#22d3ee55' },
  epic: { color: '#a855f7', glow: '#a855f755' },
  legendary: { color: '#f59e0b', glow: '#f59e0b55' },
  mythic: { color: '#f43f5e', glow: '#f43f5e55' },
};

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

// Stable params — the generated list hooks refetch on params IDENTITY
// (the StatusBar pattern); an inline object here would loop the fetch.
const BUBBLES_PARAMS = {
  filters: { status: 'published' },
  sort: 'display_order',
  order: 'asc' as const,
  limit: 200,
};
const SETS_PARAMS = { limit: 100 };

export function BubblesGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const { data: bubbles, loading } = useBubblesList(BUBBLES_PARAMS);
  const { data: sets } = useCollectionSetsList(SETS_PARAMS);

  const setNames = useMemo(
    () => new Map(sets.map(s => [s.id, s.name || 'Collection'])),
    [sets]
  );

  const rarities = useMemo(() => {
    const set = new Set<string>();
    bubbles.forEach(b => { if (b.rarity) set.add(b.rarity); });
    return Array.from(set);
  }, [bubbles]);

  const collections = useMemo(() => {
    const set = new Set<string>();
    bubbles.forEach(b => { if (b.collection_id) set.add(setNames.get(b.collection_id) || 'Collection'); });
    return Array.from(set).sort();
  }, [bubbles, setNames]);

  const filteredBubbles = useMemo(() => {
    return bubbles.filter(b => {
      const collectionName = b.collection_id ? (setNames.get(b.collection_id) || 'Collection') : null;
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = !selectedRarity || b.rarity === selectedRarity;
      const matchesCollection = !selectedCollection || collectionName === selectedCollection;
      return matchesSearch && matchesRarity && matchesCollection;
    });
  }, [bubbles, searchTerm, selectedRarity, selectedCollection, setNames]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (<Skeleton key={i} variant="card" className="h-44" />))}
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
            <ArrowLeft className="h-4 w-4" />Return to the Library
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-star-dust">The Floating Stars</h1>
              <p className="text-sm text-star-dust/40 mt-1">Collect bubbles and earn sovereignty</p>
            </div>
            {/* KP's ⚛ word, 2026-08-25, verbatim: "the floating stars currently
                has no entry to "/play"". The gallery room had no door to the
                pop room (BubblePopGame.tsx lives at /library/bubbles/play but
                nothing linked to it) — this is that door. Words carried from
                the room's own header, :371-372. */}
            <Link
              href="/library/bubbles/play"
              className="inline-flex flex-col gap-0.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-star-dust transition-colors hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Play className="h-4 w-4" />Pop the Stars
              </span>
              <span className="text-xs text-star-dust/40">Tap bubbles to collect them</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
            <input type="text" placeholder="Search bubbles..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedRarity(null)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', !selectedRarity ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
            >All Rarities</button>
            {rarities.map(r => (
              <button key={r} onClick={() => setSelectedRarity(selectedRarity === r ? null : r)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border capitalize', RARITY_COLORS[r] || 'bg-white/5', selectedRarity === r ? 'ring-1 ring-current' : '')}
              >{r}</button>
            ))}
          </div>
          {collections.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedCollection(null)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', !selectedCollection ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
              >All Collections</button>
              {collections.map(c => (
                <button key={c} onClick={() => setSelectedCollection(selectedCollection === c ? null : c)}
                  className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', selectedCollection === c ? 'ring-1 ring-current bg-white/10 text-star-dust' : 'bg-white/5 text-star-dust/50 border-white/10')}
                >{c}</button>
              ))}
            </div>
          )}
        </div>

        {filteredBubbles.length === 0 && (
          <div className="text-center py-20">
            <Droplets className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">{searchTerm ? 'No bubbles match' : 'The floating stars will appear when the Sanctuary is ready'}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBubbles.map(bubble => {
            const fill = RARITY_FILL[bubble.rarity || 'common'] || RARITY_FILL.common;
            const points = RARITY_POINTS[bubble.rarity || 'common'] || 1;
            const collectionName = bubble.collection_id ? setNames.get(bubble.collection_id) : null;
            const cardData: CardData = { id: bubble.id, type: 'value', title: bubble.name, value: bubble.rarity || '' };
            return (
              <Link key={bubble.id} href={`/library/bubbles/${bubble.slug}`}>
                <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full text-center"
                  style={{ boxShadow: `0 0 20px ${fill.glow}` }}
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${fill.glow}, ${fill.color})`, boxShadow: `0 0 16px ${fill.glow}` }}
                  />
                  <h3 className="font-semibold text-star-dust mb-1">{bubble.name}</h3>
                  {bubble.description && <p className="text-xs text-star-dust/50 line-clamp-2 mb-3">{bubble.description}</p>}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {bubble.rarity && <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[bubble.rarity] || '')}>{bubble.rarity}</Badge>}
                    <span className="text-xs text-neurospark font-medium">+{points}</span>
                  </div>
                  {collectionName && (
                    <p className="text-[10px] text-star-dust/30 mt-2">{collectionName}</p>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

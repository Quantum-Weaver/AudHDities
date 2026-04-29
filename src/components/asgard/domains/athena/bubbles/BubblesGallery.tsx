// src/components/asgard/domains/athena/bubbles/BubblesGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Droplets, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface BubbleItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  rarity: string;
  color: string;
  glow_color: string | null;
  points_value: number;
  collection_name: string | null;
  is_active: boolean;
}

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const COLLECTION_COLORS: Record<string, string> = {
  'Star Dust': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  'The Hearth Collection': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Cosmic Current': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'The Council Collection': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'The Elemental Set': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Quantum Weave': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Neurospark': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'The Cosmic Set': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'The Ninth Chair': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'The Ancient Ones': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

export function BubblesGallery() {
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  useEffect(() => {
    const fetchBubbles = async () => {
      try {
        const response = await fetch('/api/generated/athena-gamification/bubbles?is_active=true&order=rarity.desc,collection_name.asc,collection_order.asc');
        const result = await response.json();
        if (result.success) {
          setBubbles(result.data?.data || result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch bubbles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBubbles();
  }, []);

  const rarities = useMemo(() => {
    const set = new Set<string>();
    bubbles.forEach((b) => set.add(b.rarity));
    return Array.from(set);
  }, [bubbles]);

  const collections = useMemo(() => {
    const set = new Set<string>();
    bubbles.forEach((b) => { if (b.collection_name) set.add(b.collection_name); });
    return Array.from(set).sort();
  }, [bubbles]);

  const filteredBubbles = useMemo(() => {
    return bubbles.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = !selectedRarity || b.rarity === selectedRarity;
      const matchesCollection = !selectedCollection || b.collection_name === selectedCollection;
      return matchesSearch && matchesRarity && matchesCollection;
    });
  }, [bubbles, searchTerm, selectedRarity, selectedCollection]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (<Skeleton key={i} variant="card" className="h-44" />))}
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
          <h1 className="text-2xl font-bold text-star-dust">The Floating Stars</h1>
          <p className="text-sm text-star-dust/40 mt-1">Collect bubbles and earn sovereignty</p>
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
            {rarities.map((r) => (
              <button key={r} onClick={() => setSelectedRarity(selectedRarity === r ? null : r)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border capitalize', RARITY_COLORS[r] || 'bg-white/5', selectedRarity === r ? 'ring-1 ring-current' : '')}
              >{r}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedCollection(null)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', !selectedCollection ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
            >All Collections</button>
            {collections.map((c) => (
              <button key={c} onClick={() => setSelectedCollection(selectedCollection === c ? null : c)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', COLLECTION_COLORS[c] || 'bg-white/5', selectedCollection === c ? 'ring-1 ring-current' : '')}
              >{c}</button>
            ))}
          </div>
        </div>

        {filteredBubbles.length === 0 && (
          <div className="text-center py-20">
            <Droplets className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">{searchTerm ? 'No bubbles match' : 'The floating stars will appear when the Sanctuary is ready'}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBubbles.map((bubble) => {
            const cardData: CardData = { id: bubble.id, type: 'value', title: bubble.name, value: bubble.rarity };
            return (
              <Card key={bubble.id} data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full text-center"
                style={{ boxShadow: bubble.glow_color ? `0 0 20px ${bubble.glow_color}` : 'none' }}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${bubble.glow_color || bubble.color}, ${bubble.color})`, boxShadow: bubble.glow_color ? `0 0 16px ${bubble.glow_color}` : `0 0 8px ${bubble.color}40` }}
                />
                <h3 className="font-semibold text-star-dust mb-1">{bubble.name}</h3>
                {bubble.description && <p className="text-xs text-star-dust/50 line-clamp-2 mb-3">{bubble.description}</p>}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[bubble.rarity] || '')}>{bubble.rarity}</Badge>
                  <span className="text-xs text-neurospark font-medium">+{bubble.points_value}</span>
                </div>
                {bubble.collection_name && (
                  <p className="text-[10px] text-star-dust/30 mt-2">{bubble.collection_name}</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
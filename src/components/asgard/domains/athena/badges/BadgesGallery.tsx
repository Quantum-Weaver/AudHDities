// src/components/asgard/domains/athena/badges/BadgesGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Award, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface BadgeItem {
  badges_id: string;
  name: string;
  slug: string;
  description: string;
  badge_type: string;
  rarity: string;
  tier: string | null;
  house: string | null;
  color: string | null;
  icon: string | null;
  is_active: boolean;
}

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const TIER_COLORS: Record<string, string> = {
  initiate: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  adept: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  master: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const RARITY_GLOW: Record<string, string> = {
  common: 'none',
  rare: '0 0 12px rgba(9,132,227,0.3)',
  epic: '0 0 16px rgba(108,92,231,0.4)',
  legendary: '0 0 20px rgba(253,203,110,0.5)',
  mythic: '0 0 24px rgba(34,211,238,0.6)',
};

export function BadgesGallery() {
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch('/api/generated/athena-gamification/badges?is_active=true&order=name.asc');
        const result = await response.json();
        if (result.success) {
          setBadges(result.data?.data || result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch badges:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBadges();
  }, []);

  const rarities = useMemo(() => {
    const set = new Set<string>();
    badges.forEach((b) => set.add(b.rarity));
    return Array.from(set);
  }, [badges]);

  const filteredBadges = useMemo(() => {
    return badges.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = !selectedRarity || b.rarity === selectedRarity;
      return matchesSearch && matchesRarity;
    });
  }, [badges, searchTerm, selectedRarity]);

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
          <p className="text-sm text-star-dust/40 mt-1">Badges earned through sovereignty</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
            <input
              type="text" placeholder="Search badges..." value={searchTerm}
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

        {filteredBadges.length === 0 && (
          <div className="text-center py-20">
            <Award className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">{searchTerm ? 'No badges match your search' : 'The honors await those who walk the path'}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => {
            const cardData: CardData = { id: badge.badges_id, type: 'value', title: badge.name, value: badge.rarity };
            return (
              <Link key={badge.badges_id} href={`/library/badges/${badge.slug}`}>
                <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full"
                  style={{ boxShadow: RARITY_GLOW[badge.rarity] || 'none' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ backgroundColor: badge.color ? `${badge.color}20` : 'rgba(255,255,255,0.05)', border: `2px solid ${badge.color || 'rgba(255,255,255,0.1)'}` }}
                    >
                      {badge.icon || '🪶'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-star-dust mb-1">{badge.name}</h3>
                      <p className="text-sm text-star-dust/50 line-clamp-2 mb-3">{badge.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[badge.rarity] || '')}>{badge.rarity}</Badge>
                        {badge.tier && <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', TIER_COLORS[badge.tier] || '')}>{badge.tier}</Badge>}
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
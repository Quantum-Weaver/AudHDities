// src/components/asgard/domains/athena/badges/BadgeDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface BadgeItem {
  id: string; name: string; slug: string; description: string;
  badge_type: string; rarity: string; tier: string | null;
  house: string | null; color: string | null; icon: string | null;
}

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const RARITY_GLOW: Record<string, string> = {
  common: 'none', rare: '0 0 12px rgba(9,132,227,0.3)', epic: '0 0 16px rgba(108,92,231,0.4)',
  legendary: '0 0 20px rgba(253,203,110,0.5)', mythic: '0 0 24px rgba(34,211,238,0.6)',
};

export function BadgeDetail() {
  const params = useParams();
  const router = useRouter();
  const [badge, setBadge] = useState<BadgeItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/athena-gamification/badges?slug=eq.${params.slug}&limit=1`)
      .then((r) => r.json())
      .then((result) => {
        const items = result.data?.data || result.data || [];
        if (items.length > 0) setBadge(items[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </main>
    );
  }

  if (!badge) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Award className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40">This honor has not been forged yet.</p>
          <Link href="/library/badges" className="text-neurospark hover:underline mt-4 inline-block">Return to the Honors</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: badge.id, type: 'value', title: badge.name, value: badge.rarity };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/library/badges" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Honors
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center"
          style={{ boxShadow: RARITY_GLOW[badge.rarity] || 'none' }}
        >
          <div className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl"
            style={{ backgroundColor: badge.color ? `${badge.color}20` : 'rgba(255,255,255,0.05)', border: `3px solid ${badge.color || 'rgba(255,255,255,0.1)'}` }}
          >
            {badge.icon || '🪶'}
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-2">{badge.name}</h1>
          <p className="text-star-dust/60 mb-6 max-w-lg mx-auto">{badge.description}</p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[badge.rarity] || '')}>{badge.rarity}</Badge>
            {badge.tier && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{badge.tier}</Badge>}
            {badge.house && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{badge.house.replace(/_/g, ' ')}</Badge>}
          </div>

          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </Card>
      </div>
    </main>
  );
}
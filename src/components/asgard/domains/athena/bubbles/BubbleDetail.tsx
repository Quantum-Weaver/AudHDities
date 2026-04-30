// src/components/asgard/domains/athena/bubbles/BubbleDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Droplets, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface BubbleItem {
  bubbles_id: string; name: string; slug: string; description: string | null;
  rarity: string; color: string; glow_color: string | null;
  points_value: number; collection_name: string | null; collection_order: number | null;
}

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

export function BubbleDetail() {
  const params = useParams();
  const router = useRouter();
  const [bubble, setBubble] = useState<BubbleItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/athena-gamification/bubbles?slug=eq.${params.slug}&limit=1`)
      .then((r) => r.json())
      .then((result) => {
        const items = result.data?.data || result.data || [];
        if (items.length > 0) setBubble(items[0]);
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

  if (!bubble) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Droplets className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40">This star has floated beyond view.</p>
          <Link href="/library/bubbles" className="text-neurospark hover:underline mt-4 inline-block">Return to the Floating Stars</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: bubble.bubbles_id, type: 'value', title: bubble.name, value: bubble.rarity };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/library/bubbles" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Floating Stars
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center"
          style={{ boxShadow: bubble.glow_color ? `0 0 28px ${bubble.glow_color}` : `0 0 12px ${bubble.color}40` }}
        >
          <div className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${bubble.glow_color || bubble.color}, ${bubble.color})`,
              boxShadow: bubble.glow_color ? `0 0 32px ${bubble.glow_color}` : `0 0 16px ${bubble.color}40`,
            }}
          />

          <h1 className="text-2xl font-bold text-star-dust mb-2">{bubble.name}</h1>
          {bubble.description && <p className="text-star-dust/60 mb-6 max-w-lg mx-auto">{bubble.description}</p>}

          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[bubble.rarity] || '')}>{bubble.rarity}</Badge>
            <span className="flex items-center gap-1 text-neurospark">
              <Star size={14} />+{bubble.points_value} points
            </span>
          </div>

          {bubble.collection_name && (
            <p className="text-xs text-star-dust/40 mb-6">
              Part of <span className="text-star-dust/60">{bubble.collection_name}</span>
              {bubble.collection_order && <span> (#{bubble.collection_order})</span>}
            </p>
          )}

          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </Card>
      </div>
    </main>
  );
}
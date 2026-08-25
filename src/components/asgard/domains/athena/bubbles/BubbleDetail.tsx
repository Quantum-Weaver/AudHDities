// src/components/asgard/domains/athena/bubbles/BubbleDetail.tsx
'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBubblesList } from '@/lib/generated/hooks/athena-gamification/bubbles';
import { useCollectionSetsList } from '@/lib/generated/hooks/hestia-core/collection_sets';
import type { CardData } from '@/types/components/runes/card.types';
import { paintStar, readStarColours } from './starPaint';

// Colors derive from rarity; collections resolve through collection_sets
// (the evolved dialect — the game's own pattern). The five values are the
// app's own cosmic tokens, adopted 2026-08-25: common void.light · rare
// neurospark · epic quantum.light · legendary hearth.gold · mythic
// entity.curator. The mythic move is the one law — #f43f5e is rose-500, and
// the app moved mythic off exactly that colour on 2026-08-10 ("no red
// anywhere", resonance-bubbles/CLAUDE.md:34).
//
// The points that used to be printed here (+N points) are gone: the app
// never shows a star's price, and a shelf is not a till.
const RARITY_FILL: Record<string, { color: string; glow: string }> = {
  common: { color: '#B2BEC3', glow: '#B2BEC355' },
  rare: { color: '#22D3EE', glow: '#22D3EE55' },
  epic: { color: '#7D6CEA', glow: '#7D6CEA55' },
  legendary: { color: '#FDCB6E', glow: '#FDCB6E55' },
  mythic: { color: '#E84393', glow: '#E8439355' },
};

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-void-light/20 text-void-light border-void-light/30',
  rare: 'bg-neurospark/20 text-neurospark border-neurospark/30',
  epic: 'bg-quantum-light/20 text-quantum-light border-quantum-light/30',
  legendary: 'bg-hearth-gold/20 text-hearth-gold border-hearth-gold/30',
  mythic: 'bg-entity-curator/20 text-entity-curator border-entity-curator/30',
};

// Stable catalog params (module-level — identity never changes).
const SETS_PARAMS = { limit: 100 };

export function BubbleDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // Params memoized on the slug — the generated hooks refetch on params
  // identity (the StatusBar pattern); an inline object would loop the fetch.
  const bubbleParams = useMemo(() => ({ filters: { slug }, limit: 1 }), [slug]);
  const { data: bubbles, loading } = useBubblesList(bubbleParams);
  const bubble = bubbles[0] ?? null;
  const { data: sets } = useCollectionSetsList(SETS_PARAMS);

  const collectionName = useMemo(() => {
    if (!bubble?.collection_id) return null;
    return sets.find(s => s.id === bubble.collection_id)?.name || 'Collection';
  }, [bubble, sets]);

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

  const fill = RARITY_FILL[bubble.rarity || 'common'] || RARITY_FILL.common;
  // The star's own colours, when the row carries them (bubbles.palette /
  // bubbles.ring — docs/sql/025, KP's hand). Null today, and a star with no
  // palette simply wears its rarity, as it always has.
  const orb = paintStar(fill, readStarColours(bubble), 112);
  const cardData: CardData = { id: bubble.id, type: 'value', title: bubble.name, value: bubble.rarity || '' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/library/bubbles" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Floating Stars
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center"
          style={{ boxShadow: `0 0 28px ${fill.glow}` }}
        >
          <div className="w-28 h-28 rounded-full mx-auto mb-6"
            style={{ background: orb.background, boxShadow: orb.boxShadow }}
            aria-hidden="true"
          />

          <h1 className="text-2xl font-bold text-star-dust mb-2">{bubble.name}</h1>
          {bubble.description && <p className="text-star-dust/60 mb-6 max-w-lg mx-auto">{bubble.description}</p>}

          <div className="flex items-center justify-center gap-3 mb-6">
            {bubble.rarity && <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[bubble.rarity] || '')}>{bubble.rarity}</Badge>}
          </div>

          {collectionName && (
            <p className="text-xs text-star-dust/70 mb-6">
              Part of <span className="text-star-dust/82">{collectionName}</span>
            </p>
          )}

          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </Card>
      </div>
    </main>
  );
}

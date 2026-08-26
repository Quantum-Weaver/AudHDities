// src/components/asgard/domains/athena/badges/BadgeDetail.tsx
'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSigilsList } from '@/lib/generated/hooks/athena-gamification/sigils';
import type { CardData } from '@/types/components/runes/card.types';

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-entity-curator/20 text-entity-curator border-entity-curator/30',
};

const RARITY_GLOW: Record<string, string> = {
  common: 'none', rare: '0 0 12px rgba(9,132,227,0.3)', epic: '0 0 16px rgba(108,92,231,0.4)',
  legendary: '0 0 20px rgba(253,203,110,0.5)', mythic: '0 0 24px rgba(34,211,238,0.6)',
};

export function BadgeDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // Memoized on the slug — the generated hooks refetch on params identity.
  const sigilParams = useMemo(() => ({ filters: { slug }, limit: 1 }), [slug]);
  const { data: sigils, loading } = useSigilsList(sigilParams);
  const sigil = sigils[0] ?? null;

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

  if (!sigil) {
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

  const cardData: CardData = { id: sigil.id, type: 'value', title: sigil.name, value: sigil.rarity || '' };
  const glow = sigil.rarity ? RARITY_GLOW[sigil.rarity] : 'none';

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/library/badges" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Honors
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center"
          style={{ boxShadow: glow || 'none' }}
        >
          <div className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl bg-white/5 border-2 border-white/10">
            {sigil.icon_emoji || '🪶'}
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-2">{sigil.name}</h1>
          <p className="text-star-dust/60 mb-6 max-w-lg mx-auto">{sigil.description}</p>

          <div className="flex items-center justify-center gap-3 mb-6">
            {sigil.rarity && <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[sigil.rarity] || '')}>{sigil.rarity}</Badge>}
            {sigil.category && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{sigil.category.replace(/_/g, ' ')}</Badge>}
          </div>

          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </Card>
      </div>
    </main>
  );
}

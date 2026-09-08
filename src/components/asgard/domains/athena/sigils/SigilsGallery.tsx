// src/components/asgard/domains/athena/badges/BadgesGallery.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE HONORS — earned only                                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
//     a number does)
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Award, AlertCircle } from 'lucide-react';
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

type EarnedState = 'idle' | 'loading' | 'ready' | 'unread';

export function BadgesGallery() {
  const { user, isLoading: authLoading } = useUser();
  const { data: sigils, loading } = useSigilsList(SIGILS_PARAMS);

  const [earnedIds, setEarnedIds] = useState<Set<string>>(new Set());
  const [earnedState, setEarnedState] = useState<EarnedState>('idle');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!user) { setEarnedState('idle'); return; }
    let alive = true;
    setEarnedState('loading');
    fetch(`/api/generated/hestia-core/vessel_sigils?user_id=${user.id}&limit=100`)
      .then(r => r.json())
      .then((res) => {
        if (!alive) return;
        const rows: Array<{ sigil_id: string }> = res?.success ? (res.data?.data ?? res.data ?? []) : [];
        if (!res?.success) { setEarnedState('unread'); return; }
        if (!Array.isArray(rows) || rows.length === 0) { setEarnedState('unread'); return; }
        setEarnedIds(new Set(rows.map(r => r.sigil_id)));
        setEarnedState('ready');
      })
      .catch(() => { if (alive) setEarnedState('unread'); });
    return () => { alive = false; };
  }, [user, attempt]);

  const earnedSigils = useMemo(
    () => sigils.filter((s) => earnedIds.has(s.id)),
    [sigils, earnedIds]
  );

  if (loading || authLoading) {
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
          <Link href="/library" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors motion-reduce:transition-none text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />
            Return to the Library
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Honors</h1>
          <p className="text-sm text-star-dust/78 mt-1">Sigils earned through sovereignty</p>
        </div>

        {!user && (
          <div className="text-center py-20">
            <Award className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/78 text-lg mb-2">The honors await those who walk the path</p>
          </div>
        )}

        {user && earnedState === 'unread' && (
          <div className="py-16 text-center">
            <AlertCircle className="mx-auto mb-4 block h-10 w-10 text-star-dust/40" aria-hidden="true" />
            <p className="text-lg text-star-dust">Your honors could not be read just now</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-star-dust/78">
              This is not a page saying you have none — it is a page that did
              not get an answer. Nothing has been lost.
            </p>
            <button
              type="button"
              onClick={() => setAttempt((n) => n + 1)}
              className="mt-6 rounded-lg border border-star-dust/20 px-4 py-2 text-sm text-star-dust transition-colors motion-reduce:transition-none hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
            >
              Try again
            </button>
          </div>
        )}

        {user && earnedState === 'ready' && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedSigils.map((sigil) => {
              const cardData: CardData = { id: sigil.id, type: 'value', title: sigil.name, value: sigil.rarity || '' };
              const glow = sigil.rarity ? RARITY_GLOW[sigil.rarity] : 'none';
              return (
                <Link
                  key={sigil.id}
                  href={`/library/badges/${sigil.slug}`}
                  className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
                >
                  <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full"
                    style={{ boxShadow: glow || 'none' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-white/5 border-2 border-white/10">
                        {sigil.icon_emoji || '🪶'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-star-dust mb-1">{sigil.name}</h3>
                        <p className="text-sm text-star-dust/78 line-clamp-2 mb-3">{sigil.description}</p>
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
        )}
      </div>
    </main>
  );
}

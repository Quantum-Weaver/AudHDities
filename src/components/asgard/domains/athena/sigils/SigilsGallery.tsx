// src/components/asgard/domains/athena/sigils/SigilsGallery.tsx
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

// The generated list hooks refetch on params identity; this object stays stable.
const SIGILS_PARAMS = {
  filters: { status: 'published' },
  sort: 'display_order',
  order: 'asc' as const,
  limit: 100,
};

const EMPTY_IDS = new Set<string>();

const CHIP =
  'px-3 py-1.5 rounded-full text-xs font-medium border transition-all motion-reduce:transition-none capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';
const CHIP_ON = 'bg-neurospark/20 text-neurospark border-neurospark/40';
const CHIP_OFF = 'bg-white/5 text-star-dust/60 border-white/10 hover:text-star-dust hover:border-white/20';

type EarnedState = 'idle' | 'loading' | 'ready' | 'unread';

export function SigilsGallery() {
  const { user, isLoading: authLoading } = useUser();
  const { data: sigils, loading } = useSigilsList(SIGILS_PARAMS);

  const [attempt, setAttempt] = useState(0);
  const [earned, setEarned] = useState<{ key: string; ids: Set<string> } | null>(null);
  const [walled, setWalled] = useState<{ key: string } | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [onlyYours, setOnlyYours] = useState(false);

  const key = user ? `${user.id}:${attempt}` : null;

  useEffect(() => {
    if (!user) return;
    const readKey = `${user.id}:${attempt}`;
    let alive = true;
    fetch(`/api/generated/hestia-core/vessel_sigils?user_id=${encodeURIComponent(user.id)}&limit=100`)
      .then((r) => r.json())
      .then((res) => {
        if (!alive) return;
        if (!res?.success) { setWalled({ key: readKey }); return; }
        const rows: Array<{ sigil_id: string }> = res.data?.data ?? res.data ?? [];
        setEarned({ key: readKey, ids: new Set(Array.isArray(rows) ? rows.map((r) => r.sigil_id) : []) });
      })
      .catch(() => { if (alive) setWalled({ key: readKey }); });
    return () => { alive = false; };
  }, [user, attempt]);

  const earnedState: EarnedState = !key
    ? 'idle'
    : walled?.key === key
      ? 'unread'
      : earned?.key === key
        ? 'ready'
        : 'loading';
  const earnedIds = earnedState === 'ready' && earned ? earned.ids : EMPTY_IDS;
  const showYours = onlyYours && earnedState === 'ready';

  const categories = useMemo(() => {
    const set = new Set<string>();
    sigils.forEach((s) => { if (s.category) set.add(s.category); });
    return Array.from(set).sort();
  }, [sigils]);

  const shown = useMemo(
    () => sigils.filter((s) => (!category || s.category === category) && (!showYours || earnedIds.has(s.id))),
    [sigils, category, showYours, earnedIds]
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
          <p className="text-sm text-star-dust/70 mt-3 max-w-xl">
            Every mark on these shelves is shown. None is bought and none is a rank.{' '}
            {user ? 'The ones that are yours are lit.' : 'Sign in and the ones that are yours are lit.'}
          </p>
        </div>

        {earnedState === 'unread' && (
          <div role="status" className="mb-8 flex items-start gap-3 rounded-lg border border-star-dust/15 bg-white/5 p-4 text-sm text-star-dust/80">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-star-dust/50" aria-hidden="true" />
            <div>
              <p className="text-star-dust">Which of these are yours could not be read just now.</p>
              <p className="mt-1">The shelves still stand. Nothing has been lost.</p>
              <button
                type="button"
                onClick={() => setAttempt((n) => n + 1)}
                className="mt-3 rounded-lg border border-star-dust/20 px-3 py-1.5 text-xs text-star-dust transition-colors motion-reduce:transition-none hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {(categories.length > 0 || earnedState === 'ready') && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button type="button" onClick={() => { setCategory(null); setOnlyYours(false); }} aria-pressed={!category && !showYours} className={cn(CHIP, !category && !showYours ? CHIP_ON : CHIP_OFF)}>
              All marks
            </button>
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setCategory(category === c ? null : c)} aria-pressed={category === c} className={cn(CHIP, category === c ? CHIP_ON : CHIP_OFF)}>
                {c.replace(/[-_]/g, ' ')}
              </button>
            ))}
            {earnedState === 'ready' && (
              <button type="button" onClick={() => setOnlyYours((v) => !v)} aria-pressed={showYours} className={cn(CHIP, showYours ? CHIP_ON : CHIP_OFF)}>
                Yours
              </button>
            )}
          </div>
        )}

        {shown.length === 0 && (
          <div className="text-center py-20">
            <Award className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/78 text-lg mb-2">
              {showYours ? 'None of these is yours yet' : 'The honors are still being forged'}
            </p>
            <p className="text-star-dust/70 text-sm">
              {showYours ? 'The shelves stay open, and nothing here keeps count.' : 'Marks arrive at their own pace.'}
            </p>
          </div>
        )}

        {shown.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((sigil) => {
              const isYours = earnedIds.has(sigil.id);
              const cardData: CardData = { id: sigil.id, type: 'value', title: sigil.name, value: sigil.rarity || '' };
              const glow = isYours && sigil.rarity ? RARITY_GLOW[sigil.rarity] : 'none';
              return (
                <Link
                  key={sigil.id}
                  href={`/library/sigils/${sigil.slug}`}
                  aria-label={isYours ? `${sigil.name}, yours` : sigil.name}
                  className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
                >
                  <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full" style={{ boxShadow: glow || 'none' }}>
                    <div className={cn('flex items-start gap-4 transition-opacity motion-reduce:transition-none', user && !isYours && 'opacity-60')}>
                      <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-white/5 border-2', isYours ? 'border-neurospark/40' : 'border-white/10')}>
                        {sigil.icon_emoji || '🪶'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-star-dust mb-1">{sigil.name}</h3>
                        <p className="text-sm text-star-dust/78 line-clamp-2 mb-3">{sigil.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {isYours && <Badge variant="outline" size="sm" className="text-[10px] text-neurospark border-neurospark/40">yours</Badge>}
                          {sigil.rarity && <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[sigil.rarity] || '')}>{sigil.rarity}</Badge>}
                          {sigil.category && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{sigil.category.replace(/[-_]/g, ' ')}</Badge>}
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

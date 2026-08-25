// src/components/asgard/domains/athena/badges/BadgesGallery.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE HONORS — earned only                                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// MENDED 2026-08-25 (refine/athena-2026-08-25). The ruling, as the brief
// records it (not KP's own sentence), ruled with his ⚛ "bazaar and library
// go", 2026-08-24: "mend the two law-failing rooms (Honors shows only earned
// sigils; the 3/6 sidebar goes)".
//
// Until today this room fetched the whole published catalog with NO vessel
// filter at all — ten sigils, shown to everyone, whether or not a single one
// was theirs. That is promise-before, and E4 named it a law-failing built
// room by name.
//
// WHAT IS DELIBERATELY ABSENT, and must stay absent:
//   · the full catalog · silhouettes of the unearned (declined and drawn:
//     design/declined/DeclinedSilhouettes.dc.html — a silhouette is a hole
//     with a label on it, and it performs the subtraction more sharply than
//     a number does)
//   · "3 of 10" · a completion ring · "you are 1 away" · a rarest-sigil
//     showcase · any comparison with another vessel · a shareable card
//   · anything at all between the last card and the end of the page. Below
//     the earned sigils this page simply ends.
//
// The rarity WORD stays on the card and the glow stays with it — rarity as
// shimmer, which is what it is allowed to be. The search field and the
// rarity chips RETIRE with the catalog: filtering three earned things by
// rarity is browsing furniture.
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
  // entity.curator, not rose: no red anywhere in this realm
  // (resonance-bubbles/CLAUDE.md:34; dress.ts:39-40).
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

  // THE PER-VESSEL READ. There is no generated hook for `vessel_sigils` —
  // src/lib/generated/hooks/hestia-core/ holds fourteen and that table is
  // not among them — so this room calls the generated DOOR directly, in
  // CourseDetail.tsx:53-67's shape, which reads `path_lessons` the same way
  // for the same reason. Nothing is written into src/lib/generated/: that
  // root is GAIA's output and heals only by regeneration (CLAUDE.md
  // §Essential Rules). Whether gaia_config should be taught to generate a
  // hook for this table is unwritten — his to rule.
  //
  // No paging loop here: the ceiling on this read is the number of sigils
  // that exist (ten today), well under auth.ts:142-149's silent clamp of
  // 100. The gallery of stars pages; this room cannot need to.
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
        // THE FALSE-EMPTY, named rather than asserted away. `vessel_sigils`
        // carries no select policy anywhere in docs/sql/*, so a walled read
        // and a genuinely empty one are indistinguishable from here
        // (009-library-doors-for-anyone.sql:9-16; the new-table skill). A
        // signed-in vessel is never told they have earned nothing on the
        // strength of a read this room cannot vouch for.
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

        {/* SIGNED OUT — a visitor has no earned sigils, so the honest room is
            the empty room. The sentence is KEPT to the word. */}
        {!user && (
          <div className="text-center py-20">
            <Award className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/78 text-lg mb-2">The honors await those who walk the path</p>
          </div>
        )}

        {/* COULD NOT BE READ — its own state, with a retry, never the empty
            one. These words are this build's own and are named in the
            seam-note for KP's strike; the sentence the record wants here is
            unwritten — his to rule (SPEC §11). */}
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
        {/* And then the page ends. No grid of grey, no "7 more", no faint
            outline, no count anywhere. That is the design, not a gap in it. */}
      </div>
    </main>
  );
}

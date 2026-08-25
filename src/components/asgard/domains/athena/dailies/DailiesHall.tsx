// src/components/asgard/domains/athena/dailies/DailiesHall.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE DAILIES — word scramble, the first of KP's comfort blend           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Born 2026-08-24. KP's roster, verbatim (2026-07-30): "crossword, word find,
// word scramble, even sudoku if possible... word games were my warm place,
// but i like words, not everyone is a poet, so i think we find a way to blend
// all the comfort game concepts."
//
// The form is the Grammar's own molecule, WordScramble: "One word disarranged,
// its definition standing as the hint." The words ARE the Grammar's atoms and
// the clues ARE their definitions, masked. Play here is the Grammar made
// visible — which is the whole reason the dailies were ever put in this realm.
//
// WHAT IS DELIBERATELY ABSENT, and must stay absent (the refusal column,
// THE-UX-PLAY-PLAN.md; athena's own gates, (athena)/REALM-BUS.md:164-170):
//   · no streak, no calendar, no countdown, no "come back tomorrow"
//   · no score, no points, no XP, no level, no rank
//   · no timer, shown or hidden
//   · no completion percentage, no "12 of 140", no progress bar
//   · no marks on the shelf — an index of rows with some ticked is a
//     missing-slot silhouette drawn in time, and the vessel is never handed
//     arithmetic about themselves to perform
//   · NO WRONG STATE. There is no red, no shake, no error. An answer is
//     either right or not-yet, and not-yet says nothing at all. The puzzle
//     carries its own proof (Montessori's control of error, Ximenean
//     fairness) — so the house needs no judge, and installs none.
//   · no penalty on "show me". Being shown is a way of meeting a word too.
//
// A daily here is a gift: it keeps, it does not count you, and it is complete
// in itself (play study, round 3 close). Nothing expires, so nothing is missed
// — which is why there is no date anywhere in this file or in its table.

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shuffle, Sparkles, Eye } from 'lucide-react';
import { useDailies } from '@/lib/hooks/useDailies';
import type { Puzzle } from '@/lib/dailies/shelf';

interface Props {
  puzzles: Puzzle[];
}

function useReducedMotion(): boolean {
  // The global CSS guard in globals.css kills CSS animation and transition
  // durations, but it cannot reach anything driven from JS. This hall asks
  // directly, and flattens to instant. Motion is content, so it needs consent.
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function DailiesHall({ puzzles }: Props) {
  const { meet, hasMet, met, purge, ready } = useDailies();
  const reduced = useReducedMotion();

  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // FOCUS AT THE THREE TRANSITIONS (2026-08-25, refine/athena). inputRef was
  // created and attached and never called: opening a puzzle left focus on a
  // card that had just unmounted, solving disabled the focused input under
  // the hand, and closing returned to a shelf holding no focus at all.
  const solvedRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const lastOpenedRef = useRef<string | null>(null);

  const open = useMemo(
    () => puzzles.find((p) => p.slug === openSlug) ?? null,
    [puzzles, openSlug],
  );

  // Right, or not yet. Those are the only two states this game has.
  const solved = !!open && typed.trim().toLowerCase() === open.solution.toLowerCase();

  useEffect(() => {
    if (solved && open) meet(open.slug);
  }, [solved, open, meet]);

  // 1 · open — the input takes the focus the card just gave up.
  useEffect(() => {
    if (openSlug) inputRef.current?.focus();
  }, [openSlug]);

  // 2 · solve — focus moves to the announcement rather than being stranded
  //     on an input that disables in the same breath.
  useEffect(() => {
    if (solved) solvedRef.current?.focus();
  }, [solved]);

  const openPuzzle = useCallback((slug: string) => {
    lastOpenedRef.current = slug;
    setOpenSlug(slug);
    setTyped('');
    setRevealed(false);
  }, []);

  const handMeOne = useCallback(() => {
    // One the vessel has not met, if there is one; otherwise any of them,
    // because meeting a word twice is a good afternoon, not a failure.
    const fresh = puzzles.filter((p) => !met.includes(p.slug));
    const pool = fresh.length ? fresh : puzzles;
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    openPuzzle(pick.slug);
  }, [puzzles, met, openPuzzle]);

  const close = useCallback(() => {
    const returning = lastOpenedRef.current;
    setOpenSlug(null);
    setTyped('');
    setRevealed(false);
    // 3 · close — the shelf card that was pressed takes the focus back.
    if (returning) {
      requestAnimationFrame(() => cardRefs.current.get(returning)?.focus());
    }
  }, []);

  // ─── The shelf has not come through ────────────────────────────────────
  if (!puzzles.length) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Dailies</h1>
          {/* shelf.ts returns an empty shelf three ways — no keys (:61), a
              refused read (:82), a thrown one (:84-86). With 140 rows
              standing, the old sentence named the one cause it is no
              longer likely to be. */}
          <p className="text-lg text-star-dust/60">
            The shelf has not come through yet. The words are drawn from the
            Grammar, and they will be here when the shelf opens.
          </p>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 mt-8 text-sm text-neurospark hover:underline"
          >
            <ArrowLeft size={14} /> Back to the Library
          </Link>
        </div>
      </main>
    );
  }

  // ─── One puzzle, open ──────────────────────────────────────────────────
  if (open) {
    const tiles = open.scrambled.toUpperCase().split('');
    const seenBefore = ready && hasMet(open.slug) && !solved;

    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <button
            type="button"
            onClick={close}
            className="inline-flex items-center gap-2 text-sm text-star-dust/60 hover:text-neurospark mb-8"
          >
            <ArrowLeft size={14} /> The shelf
          </button>

          <div className="rounded-2xl border border-star-dust/10 bg-star-dust/[0.03] p-8">
            {seenBefore && (
              <p className="text-xs text-star-dust/70 mb-4">
                You have met this one before.
              </p>
            )}

            {/* The letters. Display only — the answer is never here. */}
            <div
              role="group"
              className="flex flex-wrap justify-center gap-2 mb-8"
              aria-label={`The letters, disarranged: ${tiles.join(', ')}`}
            >
              {tiles.map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  aria-hidden="true"
                  className={`w-12 h-12 rounded-lg bg-neurospark/10 border border-neurospark/20
                              flex items-center justify-center text-xl font-semibold text-star-dust
                              ${reduced ? '' : 'transition-colors'}`}
                >
                  {ch}
                </span>
              ))}
            </div>

            {/* The clue is the Grammar's own definition, masked. */}
            <p className="text-center text-lg text-star-dust/80 leading-relaxed mb-2">
              {open.source_emoji ? <span className="mr-2">{open.source_emoji}</span> : null}
              {open.clue}
            </p>
            <p className="text-center text-xs text-star-dust/70 mb-8">
              {open.solution.length} letters
            </p>

            <label htmlFor="dailies-answer" className="sr-only">
              Your answer
            </label>
            <input
              id="dailies-answer"
              ref={inputRef}
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              disabled={solved}
              placeholder="the word"
              className="w-full rounded-xl bg-deep-space/40 border border-star-dust/15 px-5 py-4
                         text-center text-xl tracking-widest text-star-dust
                         placeholder:text-star-dust/25 focus:border-neurospark/50
                         focus:outline-none disabled:opacity-70"
            />

            {/* The only announcement this game makes. Nothing speaks on
                not-yet, because not-yet is not an event. */}
            <div
              ref={solvedRef}
              tabIndex={-1}
              aria-live="polite"
              className="min-h-[5rem] mt-6 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space rounded-lg"
            >
              {solved && (
                <div>
                  <p className="inline-flex items-center gap-2 text-neurospark text-lg">
                    <Sparkles size={16} /> {open.solution}
                  </p>
                  <p className="text-sm text-star-dust/50 mt-2">
                    A word of the Grammar, and now one of yours.
                  </p>
                </div>
              )}
              {!solved && revealed && (
                <div>
                  <p className="text-lg text-star-dust">{open.solution}</p>
                  <p className="text-sm text-star-dust/50 mt-2">
                    Being shown is a way of meeting a word too.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {!solved && !revealed && (
                <button
                  type="button"
                  onClick={() => {
                    setRevealed(true);
                    meet(open.slug);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-star-dust/15
                             px-4 py-2 text-sm text-star-dust/70 hover:text-star-dust"
                >
                  <Eye size={14} /> Show me
                </button>
              )}
              <button
                type="button"
                onClick={handMeOne}
                className="inline-flex items-center gap-2 rounded-lg bg-neurospark/10
                           border border-neurospark/20 px-4 py-2 text-sm text-neurospark"
              >
                <Shuffle size={14} /> Another
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-star-dust/70 mt-8">
            Nothing here expires. Nothing here is counted. Come back whenever,
            or don&apos;t.
          </p>
        </div>
      </main>
    );
  }

  // ─── The shelf ─────────────────────────────────────────────────────────
  // No marks, no ticks, no tally. Every puzzle looks exactly like every
  // other puzzle, because none of them is owed.
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Dailies</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">Word Scramble</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            One word disarranged, its meaning standing as the hint. Every word
            is drawn from the Resonance Grammar, and every clue is its own
            definition.
          </p>
          <button
            type="button"
            onClick={handMeOne}
            className="inline-flex items-center gap-2 mt-6 rounded-lg bg-neurospark/10
                       border border-neurospark/20 px-5 py-2.5 text-sm text-neurospark"
          >
            <Shuffle size={14} /> Hand me one
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {puzzles.map((p) => (
            <button
              key={p.slug}
              ref={(el) => {
                if (el) cardRefs.current.set(p.slug, el);
                else cardRefs.current.delete(p.slug);
              }}
              type="button"
              onClick={() => openPuzzle(p.slug)}
              className="text-left rounded-xl border border-star-dust/10 bg-star-dust/[0.03]
                         p-5 hover:border-neurospark/30
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-hearth-gold focus-visible:ring-offset-2
                         focus-visible:ring-offset-deep-space"
            >
              <div className="flex items-center gap-2 mb-3">
                {p.source_emoji ? <span>{p.source_emoji}</span> : null}
                <span className="text-xs text-star-dust/70">
                  {p.solution.length} letters
                </span>
              </div>
              <p className="text-sm text-star-dust/70 leading-relaxed line-clamp-3">
                {p.clue}
              </p>
            </button>
          ))}
        </div>

        {ready && met.length > 0 && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={purge}
              className="text-xs text-star-dust/70 hover:text-star-dust underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
            >
              Forget which ones I have met
            </button>
            <p className="text-xs text-star-dust/70 mt-2">
              Kept on this device only. Never sent anywhere, never counted.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Carousel, Procession, type CarouselStop } from '@/components/shapes';
import type { Room, Section } from '@/lib/procession';
import type { Difficulty } from '@/lib/sudoku';
import type { Puzzle } from '@/lib/dailies/shelf';
import { useDailies } from '@/lib/hooks/useDailies';
import { SudokuGame } from './SudokuGame';
import { cn } from '@/lib/utils';

type Game = 'scramble' | 'number' | 'bubbles';

interface DailyStop extends CarouselStop {
  id: Game;
  says: string;
}

const STOPS: readonly DailyStop[] = [
  {
    id: 'scramble',
    title: 'Word Scramble',
    form: 'the dailies',
    says: 'One word disarranged, its meaning standing as the hint.',
  },
  {
    id: 'number',
    title: 'The Daily Number',
    form: 'the dailies',
    says: 'Nine digits, quietly disarranged — the same sky for everyone.',
  },
  {
    id: 'bubbles',
    title: 'The Floating Stars',
    form: 'the dailies',
    says: 'Stars drift past. Pop what catches your eye.',
  },
];

const DEPTHS: ReadonlyArray<{ id: Difficulty; name: string; says: string }> = [
  { id: 'gentle', name: 'Gentle', says: 'more lanterns lit' },
  { id: 'steady', name: 'Steady', says: 'the usual sky' },
  { id: 'deep', name: 'Deep', says: 'fewer lanterns' },
];

const DEPTH_SECTIONS: readonly Section[] = DEPTHS.map((d) => ({
  id: d.id,
  title: d.name,
  rooms: [{ id: d.id, name: d.name, line: 'depth', story: d.says }],
}));

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

const DOOR =
  'inline-flex min-h-[44px] items-center justify-center rounded-full border px-5! text-sm ' +
  FOCUS_RING;

const QUIET = cn(DOOR, 'border-white/10 bg-white/5 text-star-dust hover:bg-white/10');
const LIT = cn(
  DOOR,
  'border-hearth-gold/50 bg-hearth-gold/10 text-hearth-gold hover:bg-hearth-gold/20',
);

interface Props {
  puzzles: Puzzle[];
}

export function DailiesCarousel({ puzzles }: Props) {
  const { meet, hasMet, met, purge, ready } = useDailies();

  const [open, setOpen] = useState<Game | null>(null);
  const [answered, setAnswered] = useState(0);
  const [head, setHead] = useState(0);
  const [jump, setJump] = useState(0);
  const [typed, setTyped] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [board, setBoard] = useState<Difficulty | null>(null);

  const rail = useRef<HTMLDivElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);

  const byId = useMemo(() => new Map(puzzles.map((p) => [p.slug, p])), [puzzles]);

  const ordered = useMemo(
    () => (head === 0 ? puzzles : [...puzzles.slice(head), ...puzzles.slice(0, head)]),
    [puzzles, head],
  );

  const wordSections = useMemo<readonly Section[]>(
    () =>
      ordered.map((p) => ({
        id: p.slug,
        title: p.clue,
        rooms: [{ id: p.slug, name: p.clue }],
      })),
    [ordered],
  );

  // A press answers in view: what it opened is carried up under the header.
  useEffect(() => {
    if (answered === 0) return;
    panel.current?.scrollIntoView({ block: 'start' });
  }, [answered]);

  const openStop = useCallback((stop: DailyStop) => {
    setOpen(stop.id);
    setAnswered((n) => n + 1);
  }, []);

  const shut = useCallback(() => {
    setOpen(null);
    rail.current?.scrollIntoView({ block: 'start' });
  }, []);

  const handMeOne = useCallback(() => {
    const fresh = puzzles.filter((p) => !met.includes(p.slug));
    const pool = fresh.length ? fresh : puzzles;
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const at = puzzles.findIndex((p) => p.slug === pick.slug);
    setHead(at < 0 ? 0 : at);
    setJump((n) => n + 1);
    setTyped({});
    setRevealed({});
    setAnswered((n) => n + 1);
  }, [puzzles, met]);

  const answer = useCallback(
    (p: Puzzle, value: string) => {
      setTyped((t) => ({ ...t, [p.slug]: value }));
      if (value.trim().toLowerCase() === p.solution.toLowerCase()) meet(p.slug);
    },
    [meet],
  );

  const show = useCallback(
    (p: Puzzle) => {
      setRevealed((r) => ({ ...r, [p.slug]: true }));
      meet(p.slug);
    },
    [meet],
  );

  const wordFace = useCallback(
    (room: Room) => {
      const p = byId.get(room.id);
      if (!p) return null;
      const mine = typed[p.slug] ?? '';
      const solved = mine.trim().toLowerCase() === p.solution.toLowerCase();
      const shown = !!revealed[p.slug];
      const before = ready && hasMet(p.slug) && !solved && !shown;
      const tiles = p.scrambled.toUpperCase().split('');

      return (
        <div className="flex flex-col gap-4">
          {before && <p className="text-xs text-star-dust/70">You have met this one before.</p>}

          <div
            role="group"
            aria-label={`The letters, disarranged: ${tiles.join(', ')}`}
            className="flex flex-wrap justify-center gap-2"
          >
            {tiles.map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neurospark/20 bg-neurospark/10 text-lg font-semibold text-star-dust"
              >
                {ch}
              </span>
            ))}
          </div>

          <p className="text-center text-base text-star-dust/80">
            {p.source_emoji ? <span className="mr-2!">{p.source_emoji}</span> : null}
            {p.clue}
          </p>
          <p className="text-center text-xs text-star-dust/70">{p.solution.length} letters</p>

          <label htmlFor={`word-${p.slug}`} className="sr-only">
            Your answer
          </label>
          <input
            id={`word-${p.slug}`}
            type="text"
            value={mine}
            onChange={(e) => answer(p, e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={solved}
            placeholder="the word"
            className={cn(
              'w-full rounded-xl border border-star-dust/15 bg-deep-space/40 px-5! py-3!',
              'text-center text-lg tracking-widest text-star-dust placeholder:text-star-dust/25',
              'focus:border-neurospark/50 focus:outline-none disabled:opacity-70',
            )}
          />

          <div aria-live="polite" className="min-h-[3rem] text-center">
            {solved && (
              <>
                <p className="text-lg text-neurospark">{p.solution}</p>
                <p className="mt-1! text-sm text-star-dust/50">
                  A word of the Grammar, and now one of yours.
                </p>
              </>
            )}
            {!solved && shown && (
              <>
                <p className="text-lg text-star-dust">{p.solution}</p>
                <p className="mt-1! text-sm text-star-dust/50">
                  Being shown is a way of meeting a word too.
                </p>
              </>
            )}
            {!solved && !shown && (
              <button type="button" onClick={() => show(p)} className={QUIET}>
                show me
              </button>
            )}
          </div>
        </div>
      );
    },
    [byId, typed, revealed, ready, hasMet, answer, show],
  );

  const openTitle = STOPS.find((s) => s.id === open)?.title;

  return (
    <main className="w-full min-h-screen py-12!">
      <div className="mx-auto! w-full max-w-5xl px-6!">
        <header className="mb-8! text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-star-dust/50">The Dailies</p>
          <h1 className="mt-2! text-3xl font-bold text-star-dust">Three games, one rail</h1>
          <p className="mt-2! text-sm text-star-dust/70">
            No streaks, no clock. Walk the rail and press the one you want.
          </p>
        </header>

        <div ref={rail} className="scroll-mt-[120px]">
          <Carousel stops={STOPS} label="the dailies, one game at a time" onSelect={openStop}>
            {(stop, face) => (
              <>
                <span className="block text-base font-semibold">{stop.title}</span>
                <span className="mt-1! block text-xs text-star-dust/70">{stop.says}</span>
                {open === stop.id ? (
                  <span className="mt-3! block text-[10px] uppercase tracking-wide text-hearth-gold">
                    open below
                  </span>
                ) : face.focused ? (
                  <span className="mt-3! block text-[10px] uppercase tracking-wide text-hearth-gold">
                    press to open
                  </span>
                ) : null}
              </>
            )}
          </Carousel>
        </div>

        {open && (
          <section
            ref={panel}
            data-testid="dailies-panel"
            data-open={open}
            className="mt-10! scroll-mt-[120px]"
            aria-label="the game in view"
          >
            <div className="mb-4! flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-star-dust">{openTitle}</h2>
              <button type="button" onClick={shut} data-testid="dailies-shut" className={QUIET}>
                the dailies
              </button>
            </div>

            {open === 'scramble' &&
              (puzzles.length === 0 ? (
                <p className="py-12! text-center text-sm text-star-dust/70">
                  The shelf has not come through yet. The words are drawn from the Grammar, and they
                  will be here when the shelf opens.
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handMeOne}
                      data-testid="dailies-hand-me-one"
                      className={LIT}
                    >
                      hand me one
                    </button>
                    <span className="text-xs text-star-dust/70">
                      Jumps the walk to a word you have not met.
                    </span>
                  </div>

                  <Procession
                    key={`scramble:${jump}`}
                    sections={wordSections}
                    label="the words, one at a time"
                  >
                    {(room) => wordFace(room)}
                  </Procession>

                  {ready && met.length > 0 && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={purge}
                        className={cn(
                          'rounded text-xs text-star-dust/70 underline hover:text-star-dust',
                          FOCUS_RING,
                        )}
                      >
                        forget
                      </button>
                      <p className="mt-2! text-xs text-star-dust/70">
                        Which ones you have met is kept on this device only, and never counted.
                      </p>
                    </div>
                  )}
                </div>
              ))}

            {open === 'number' &&
              (board === null ? (
                <Procession sections={DEPTH_SECTIONS} label="the three depths">
                  {(room) => {
                    const depth = DEPTHS.find((d) => d.id === room.id);
                    if (!depth) return null;
                    return (
                      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                        <h3 className="text-2xl font-semibold text-star-dust">{depth.name}</h3>
                        <p className="text-sm text-star-dust/70">{depth.says}</p>
                        <button
                          type="button"
                          data-testid={`dailies-settle-${depth.id}`}
                          onClick={() => {
                            setBoard(depth.id);
                            setAnswered((n) => n + 1);
                          }}
                          className={LIT}
                        >
                          settle here
                        </button>
                      </div>
                    );
                  }}
                </Procession>
              ) : (
                <div className="flex flex-col gap-4" data-testid="dailies-board" data-depth={board}>
                  <div className="flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => setBoard(null)} className={QUIET}>
                      the depths
                    </button>
                    <span className="text-xs text-star-dust/70">
                      The board opened at {DEPTHS.find((d) => d.id === board)?.name}.
                    </span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5">
                    <SudokuGame key={board} depth={board} />
                  </div>
                </div>
              ))}

            {open === 'bubbles' && (
              <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6!">
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/library/bubbles/play" data-testid="dailies-play" className={LIT}>
                    play
                  </Link>
                  <Link
                    href="/library/bubbles"
                    data-testid="dailies-collection"
                    className={QUIET}
                  >
                    the collection
                  </Link>
                </div>
                <p className="text-sm text-star-dust/70">
                  Play sends the stars drifting past. The collection holds the ones you caught, and
                  keeps its own gallery to sift them.
                </p>
              </div>
            )}
          </section>
        )}

        <p className="mt-12! text-center text-xs text-star-dust/70">
          Nothing here expires. Nothing here is counted. Come back whenever, or don&apos;t.
        </p>
      </div>
    </main>
  );
}

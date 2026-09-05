// src/components/asgard/domains/athena/dailies/SudokuGame.tsx

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  generateDailyPuzzle,
  findConflicts,
  todayKey,
  type DailyPuzzle,
  type Difficulty,
} from '@/lib/sudoku';

const DIFFICULTIES: Array<{ id: Difficulty; label: string; blurb: string }> = [
  { id: 'gentle', label: 'Gentle', blurb: 'more lanterns lit' },
  { id: 'steady', label: 'Steady', blurb: 'the usual sky' },
  { id: 'deep', label: 'Deep', blurb: 'fewer lanterns' },
];

const storeKey = (dateKey: string, difficulty: Difficulty) =>
  `sanctuary-sudoku:${dateKey}:${difficulty}`;

interface SavedProgress {
  entries: number[];
  notes: number[][];
  completed: boolean;
}

interface SudokuGameProps {
  /** The depth the board opens at. */
  depth?: Difficulty;
}

export function SudokuGame({ depth = 'steady' }: SudokuGameProps) {
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [dateLabel, setDateLabel] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(depth);
  const [puzzle, setPuzzle] = useState<DailyPuzzle | null>(null);

  const [entries, setEntries] = useState<number[]>(() => Array(81).fill(0));
  const [notes, setNotes] = useState<number[][]>(() => Array.from({ length: 81 }, () => []));
  const [selected, setSelected] = useState<number | null>(null);
  const [notesMode, setNotesMode] = useState(false);
  const [checkOn, setCheckOn] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [resetArmed, setResetArmed] = useState(false);
  const [announce, setAnnounce] = useState('');

  const cellRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hydrated = useRef(false);

  /* ---- date key is local-time, so compute it after mount ---- */
  useEffect(() => {
    const now = new Date();
    setDateKey(todayKey(now));
    setDateLabel(
      now.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    );
  }, []);

  /* ---- generate (deterministic) + restore saved progress ---- */
  useEffect(() => {
    if (!dateKey) return;
    const p = generateDailyPuzzle(dateKey, difficulty);
    setPuzzle(p);
    hydrated.current = false;

    try {
      const raw = window.localStorage.getItem(storeKey(dateKey, difficulty));
      const saved: SavedProgress | null = raw ? JSON.parse(raw) : null;
      if (saved && Array.isArray(saved.entries) && saved.entries.length === 81) {
        setEntries(saved.entries);
        setNotes(
          Array.isArray(saved.notes) && saved.notes.length === 81
            ? saved.notes.map((n) => (Array.isArray(n) ? n : []))
            : Array.from({ length: 81 }, () => [])
        );
        setCompleted(!!saved.completed);
        setOverlayOpen(!!saved.completed);
      } else {
        setEntries(Array(81).fill(0));
        setNotes(Array.from({ length: 81 }, () => []));
        setCompleted(false);
        setOverlayOpen(false);
      }
    } catch {
      setEntries(Array(81).fill(0));
      setNotes(Array.from({ length: 81 }, () => []));
    }
    setSelected(null);
    setNotesMode(false);
    setCheckOn(false);
    hydrated.current = true;
  }, [dateKey, difficulty]);

  /* ---- persist progress (a refresh should never steal anyone's work) ---- */
  useEffect(() => {
    if (!dateKey || !hydrated.current) return;
    try {
      const payload: SavedProgress = { entries, notes, completed };
      window.localStorage.setItem(storeKey(dateKey, difficulty), JSON.stringify(payload));
    } catch {
      /* private mode etc. — playing without memory is fine */
    }
  }, [dateKey, difficulty, entries, notes, completed]);

  const givensFlat = useMemo(() => (puzzle ? puzzle.givens.flat() : []), [puzzle]);
  const solutionFlat = useMemo(() => (puzzle ? puzzle.solution.flat() : []), [puzzle]);

  const values = useMemo(
    () => givensFlat.map((g, i) => g || entries[i]),
    [givensFlat, entries]
  );

  const conflicts = useMemo(
    () => (checkOn ? findConflicts(values) : new Set<number>()),
    [checkOn, values]
  );

  const placedCounts = useMemo(() => {
    const counts = Array(10).fill(0);
    values.forEach((v) => {
      if (v) counts[v]++;
    });
    return counts;
  }, [values]);

  /* ---- completion: gentle, no fanfare timers, no streaks ---- */
  useEffect(() => {
    if (!puzzle || completed) return;
    const done = values.every((v, i) => v !== 0 && v === solutionFlat[i]);
    if (done) {
      setCompleted(true);
      setOverlayOpen(true);
      setAnnounce('Settled. The constellation holds.');
    }
  }, [values, puzzle, completed, solutionFlat]);

  const say = useCallback((msg: string) => setAnnounce(msg), []);

  const placeDigit = useCallback(
    (n: number) => {
      if (selected === null || !puzzle) return;
      if (givensFlat[selected] !== 0) return; // a lantern — it stays
      const r = Math.floor(selected / 9) + 1;
      const c = (selected % 9) + 1;

      if (notesMode) {
        setNotes((prev) => {
          const next = prev.map((arr) => [...arr]);
          next[selected] = next[selected].includes(n)
            ? next[selected].filter((x) => x !== n)
            : [...next[selected], n].sort((a, b) => a - b);
          return next;
        });
        say(`Note ${n} at row ${r}, column ${c}`);
        return;
      }

      setEntries((prev) => {
        const next = [...prev];
        next[selected] = next[selected] === n ? 0 : n; // pressing again lifts it back out
        return next;
      });
      setNotes((prev) => {
        const next = prev.map((arr) => [...arr]);
        next[selected] = [];
        return next;
      });
      say(`${n} at row ${r}, column ${c}`);
    },
    [selected, puzzle, givensFlat, notesMode, say]
  );

  const erase = useCallback(() => {
    if (selected === null || !puzzle || givensFlat[selected] !== 0) return;
    setEntries((prev) => {
      const next = [...prev];
      next[selected] = 0;
      return next;
    });
    setNotes((prev) => {
      const next = prev.map((arr) => [...arr]);
      next[selected] = [];
      return next;
    });
    say('Cleared');
  }, [selected, puzzle, givensFlat, say]);

  /** A nudge fills one cell correctly. Unlimited — help is not a scarce resource. */
  const nudge = useCallback(() => {
    if (!puzzle) return;
    const openIdx = entries
      .map((v, i) => ({ v, i }))
      .filter(({ v, i }) => v === 0 && givensFlat[i] === 0)
      .map(({ i }) => i);
    const target =
      selected !== null && givensFlat[selected] === 0 && entries[selected] === 0
        ? selected
        : openIdx[0];
    if (target === undefined) return;
    setEntries((prev) => {
      const next = [...prev];
      next[target] = solutionFlat[target];
      return next;
    });
    setSelected(target);
    const r = Math.floor(target / 9) + 1;
    const c = (target % 9) + 1;
    say(`A nudge: ${solutionFlat[target]} at row ${r}, column ${c}`);
  }, [puzzle, entries, givensFlat, selected, solutionFlat, say]);

  const reset = useCallback(() => {
    if (!resetArmed) {
      setResetArmed(true);
      window.setTimeout(() => setResetArmed(false), 2500);
      return;
    }
    setEntries(Array(81).fill(0));
    setNotes(Array.from({ length: 81 }, () => []));
    setCompleted(false);
    setOverlayOpen(false);
    setResetArmed(false);
    say('The sky is clear again');
  }, [resetArmed, say]);

  const moveSelection = useCallback(
    (from: number, dr: number, dc: number) => {
      const r = Math.min(8, Math.max(0, Math.floor(from / 9) + dr));
      const c = Math.min(8, Math.max(0, (from % 9) + dc));
      const next = r * 9 + c;
      setSelected(next);
      cellRefs.current[next]?.focus();
    },
    []
  );

  const onGridKeyDown = (e: React.KeyboardEvent) => {
    if (selected === null) return;
    const key = e.key;
    if (key.startsWith('Arrow')) {
      e.preventDefault();
      const [dr, dc] =
        key === 'ArrowUp'
          ? [-1, 0]
          : key === 'ArrowDown'
            ? [1, 0]
            : key === 'ArrowLeft'
              ? [0, -1]
              : [0, 1];
      moveSelection(selected, dr, dc);
    } else if (/^[1-9]$/.test(key)) {
      e.preventDefault();
      placeDigit(Number(key));
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      e.preventDefault();
      erase();
    } else if (key === 'n' || key === 'N') {
      e.preventDefault();
      setNotesMode((m) => {
        say(m ? 'Notes off' : 'Notes on');
        return !m;
      });
    }
  };

  /* ---------------- render ---------------- */

  const selValue = selected !== null ? values[selected] : 0;

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:py-14">
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-star-dust/50">The Dailies</p>
        <h1 className="mt-2 text-3xl font-semibold text-star-dust sm:text-4xl">
          The Daily Number
        </h1>
        <p className="mt-2 text-sm text-star-dust/70">Nine digits, quietly disarranged.</p>
        {dateLabel && (
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-star-dust/60">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hearth-gold" />
            {dateLabel} — the same sky for everyone
          </p>
        )}
      </header>

      {/* difficulty — same arrangement for everyone, per depth */}
      <div
        role="group"
        aria-label="Depth"
        className="mb-6 flex items-center justify-center gap-2"
      >
        {DIFFICULTIES.map((d) => (
          <button
            key={d.id}
            type="button"
            aria-pressed={difficulty === d.id}
            title={d.blurb}
            onClick={() => setDifficulty(d.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ${
              difficulty === d.id
                ? 'border-hearth-gold/60 bg-hearth-gold/10 text-hearth-gold'
                : 'border-star-dust/20 text-star-dust/60 hover:border-star-dust/40 hover:text-star-dust'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {!puzzle ? (
        <p className="py-24 text-center text-sm text-star-dust/50">
          Aligning today’s numbers…
        </p>
      ) : (
        <>
          {/* board */}
          <div className="relative">
            <div
              role="grid"
              aria-label={`Sudoku board, ${difficulty} depth`}
              tabIndex={-1}
              onKeyDown={onGridKeyDown}
              className="grid grid-cols-9 overflow-hidden rounded-xl border-2 border-star-dust/25 bg-deep-space/70 shadow-[0_0_60px_-20px] shadow-bifrost-base/30"
            >
              {values.map((v, i) => {
                const r = Math.floor(i / 9);
                const c = i % 9;
                const isGiven = givensFlat[i] !== 0;
                const isSelected = selected === i;
                const inSameBand =
                  selected !== null &&
                  (Math.floor(selected / 9) === r ||
                    selected % 9 === c ||
                    (Math.floor(selected / 27) === Math.floor(r / 3) &&
                      Math.floor((selected % 9) / 3) === Math.floor(c / 3)));
                const sameValue = selValue !== 0 && v === selValue;
                const isConflict = conflicts.has(i);

                const borderR =
                  c === 8
                    ? ''
                    : (c + 1) % 3 === 0
                      ? 'border-r-2 border-r-star-dust/40'
                      : 'border-r border-r-star-dust/10';
                const borderB =
                  r === 8
                    ? ''
                    : (r + 1) % 3 === 0
                      ? 'border-b-2 border-b-star-dust/40'
                      : 'border-b border-b-star-dust/10';

                const cellNotes = notes[i];

                return (
                  <button
                    key={i}
                    ref={(el) => {
                      cellRefs.current[i] = el;
                    }}
                    type="button"
                    role="gridcell"
                    aria-selected={isSelected}
                    aria-label={`Row ${r + 1}, column ${c + 1}${
                      v ? `, ${isGiven ? 'given ' : ''}${v}` : ', empty'
                    }${isConflict ? ', collides' : ''}`}
                    onClick={() => setSelected(i)}
                    onFocus={() => setSelected(i)}
                    className={[
                      'relative aspect-square select-none text-lg sm:text-xl',
                      'flex items-center justify-center transition-colors motion-reduce:transition-none',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-hearth-gold',
                      borderR,
                      borderB,
                      isConflict
                        ? 'bg-rose-500/10 text-rose-300'
                        : isSelected
                          ? 'bg-hearth-gold/15 text-star-dust'
                          : sameValue && v !== 0
                            ? 'bg-bifrost-base/25'
                            : inSameBand
                              ? 'bg-white/[0.04]'
                              : '',
                      !isConflict && v !== 0
                        ? isGiven
                          ? 'font-semibold text-star-dust'
                          : 'text-bifrost-light'
                        : '',
                    ].join(' ')}
                  >
                    {v !== 0 ? (
                      v
                    ) : cellNotes.length > 0 ? (
                      <span
                        aria-hidden
                        className="grid h-full w-full grid-cols-3 place-items-center p-0.5 text-[9px] leading-none text-star-dust/50 sm:text-[10px]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <span key={n}>{cellNotes.includes(n) ? n : ''}</span>
                        ))}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* settled overlay */}
            {overlayOpen && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-deep-space/80 backdrop-blur-sm">
                <div className="mx-6 rounded-2xl border border-hearth-gold/30 bg-deep-space/90 px-8 py-6 text-center shadow-[0_0_40px_-10px] shadow-hearth-gold/20">
                  <p className="text-xl font-semibold text-hearth-gold">Settled ✨</p>
                  <p className="mt-2 text-sm text-star-dust/70">
                    The constellation holds. Tomorrow brings a new arrangement.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOverlayOpen(false)}
                    className="mt-4 rounded-full border border-star-dust/25 px-4 py-1.5 text-sm text-star-dust/80 transition-colors motion-reduce:transition-none hover:border-star-dust/50 hover:text-star-dust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold"
                  >
                    Return to the board
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* number pad */}
          <div
            role="group"
            aria-label="Numbers"
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
              const allPlaced = placedCounts[n] >= 9;
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`Place ${n}`}
                  disabled={allPlaced}
                  onClick={() => placeDigit(n)}
                  className={`h-12 w-10 rounded-lg border text-lg transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold sm:w-12 ${
                    allPlaced
                      ? 'cursor-default border-star-dust/10 text-star-dust/25'
                      : 'border-star-dust/25 text-star-dust/85 hover:border-hearth-gold/60 hover:text-hearth-gold'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>

          {/* tools */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            <button
              type="button"
              aria-pressed={notesMode}
              onClick={() => {
                setNotesMode((m) => {
                  say(m ? 'Notes off' : 'Notes on');
                  return !m;
                });
              }}
              className={`rounded-full border px-4 py-1.5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ${
                notesMode
                  ? 'border-hearth-gold/60 bg-hearth-gold/10 text-hearth-gold'
                  : 'border-star-dust/25 text-star-dust/70 hover:border-star-dust/50'
              }`}
            >
              Notes
            </button>
            <button
              type="button"
              onClick={erase}
              className="rounded-full border border-star-dust/25 px-4 py-1.5 text-star-dust/70 transition-colors motion-reduce:transition-none hover:border-star-dust/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold"
            >
              Erase
            </button>
            <button
              type="button"
              onClick={nudge}
              title="Fills one cell correctly. Help is not a scarce resource."
              className="rounded-full border border-star-dust/25 px-4 py-1.5 text-star-dust/70 transition-colors motion-reduce:transition-none hover:border-star-dust/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold"
            >
              A nudge
            </button>
            <button
              type="button"
              aria-pressed={checkOn}
              onClick={() => setCheckOn((c) => !c)}
              title="Softly tints any digits that collide"
              className={`rounded-full border px-4 py-1.5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ${
                checkOn
                  ? 'border-hearth-gold/60 bg-hearth-gold/10 text-hearth-gold'
                  : 'border-star-dust/25 text-star-dust/70 hover:border-star-dust/50'
              }`}
            >
              Check
            </button>
            <button
              type="button"
              onClick={reset}
              className={`rounded-full border px-4 py-1.5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ${
                resetArmed
                  ? 'border-rose-400/60 text-rose-300'
                  : 'border-star-dust/25 text-star-dust/70 hover:border-star-dust/50'
              }`}
            >
              {resetArmed ? 'Really start over?' : 'Start over'}
            </button>
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-star-dust/45">
            The same arrangement for everyone, everywhere.
            <br />
            No streaks, no clock — settle it at your own pace. Your progress waits for you
            here if you wander off.
          </p>

          {/* quiet announcements for screen readers */}
          <p aria-live="polite" className="sr-only">
            {announce}
          </p>
        </>
      )}
    </section>
  );
}

export default SudokuGame;

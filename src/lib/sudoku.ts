// Landed from resonance-void/intake/daily-sudoku/lib/sudoku.ts by KP's word (2026-09-02).
// Written by Kimi. Engine body unchanged from intake; only this header was added.
//
/**
 * The Daily Number — deterministic sudoku engine for the Sanctuary.
 *
 * Pure TypeScript, no dependencies. The puzzle is fully determined by
 * (dateKey, difficulty), so every visitor gets the same arrangement
 * on the same day without any server round-trip.
 */

export type Difficulty = 'gentle' | 'steady' | 'deep';

/** How many clues remain on the board per difficulty. */
const GIVENS_TARGET: Record<Difficulty, number> = {
  gentle: 42,
  steady: 34,
  deep: 28,
};

export type Grid = number[][]; // 9×9, 0 = empty

export interface DailyPuzzle {
  dateKey: string; // YYYY-MM-DD (local)
  difficulty: Difficulty;
  givens: Grid; // clues — 0 means "visitor fills this"
  solution: Grid; // the one true arrangement
}

/* ------------------------------------------------------------------ */
/* Deterministic RNG (xmur3-style hash → mulberry32 stream)            */
/* ------------------------------------------------------------------ */

function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ------------------------------------------------------------------ */
/* Solver helpers (MRV backtracking)                                   */
/* ------------------------------------------------------------------ */

function candidates(grid: Grid, r: number, c: number): number[] {
  const used = new Set<number>();
  for (let i = 0; i < 9; i++) {
    used.add(grid[r][i]);
    used.add(grid[i][c]);
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let dr = 0; dr < 3; dr++) {
    for (let dc = 0; dc < 3; dc++) used.add(grid[br + dr][bc + dc]);
  }
  const out: number[] = [];
  for (let n = 1; n <= 9; n++) if (!used.has(n)) out.push(n);
  return out;
}

function fillGrid(grid: Grid, rnd: () => number): boolean {
  let bestR = -1;
  let bestC = -1;
  let bestCands: number[] | null = null;

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] !== 0) continue;
      const cands = candidates(grid, r, c);
      if (cands.length === 0) return false;
      if (bestCands === null || cands.length < bestCands.length) {
        bestR = r;
        bestC = c;
        bestCands = cands;
        if (cands.length === 1) break;
      }
    }
    if (bestCands?.length === 1) break;
  }
  if (bestCands === null) return true; // full

  for (const n of shuffled(bestCands, rnd)) {
    grid[bestR][bestC] = n;
    if (fillGrid(grid, rnd)) return true;
    grid[bestR][bestC] = 0;
  }
  return false;
}

/** Count solutions up to `cap` (we only ever need to know "exactly one?"). */
export function countSolutions(grid: Grid, cap = 2): number {
  let count = 0;

  const walk = (): boolean => {
    let bestR = -1;
    let bestC = -1;
    let bestCands: number[] | null = null;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] !== 0) continue;
        const cands = candidates(grid, r, c);
        if (cands.length === 0) return false; // dead end
        if (bestCands === null || cands.length < bestCands.length) {
          bestR = r;
          bestC = c;
          bestCands = cands;
        }
      }
    }
    if (bestCands === null) {
      count++;
      return count >= cap; // stop early once cap is reached
    }
    for (const n of bestCands) {
      grid[bestR][bestC] = n;
      const done = walk();
      grid[bestR][bestC] = 0;
      if (done) return true;
    }
    return false;
  };

  walk();
  return count;
}

/* ------------------------------------------------------------------ */
/* Daily generation                                                    */
/* ------------------------------------------------------------------ */

/**
 * Generate the day's puzzle. Identical (dateKey, difficulty) always
 * produces an identical board — no server, no storage needed.
 *
 * Holes are dug in mirror-symmetric pairs (sudoku tradition: the empty
 * constellation stays beautiful), and every removal is verified to keep
 * exactly one solution.
 */
export function generateDailyPuzzle(dateKey: string, difficulty: Difficulty): DailyPuzzle {
  const rnd = mulberry32(hashSeed(`sanctuary-sudoku:${dateKey}:${difficulty}`));

  const solution: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillGrid(solution, rnd);

  const givens: Grid = solution.map((row) => [...row]);
  const target = GIVENS_TARGET[difficulty];
  let givensCount = 81;

  const coords: Array<[number, number]> = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) coords.push([r, c]);

  for (const [r, c] of shuffled(coords, rnd)) {
    if (givensCount <= target) break;
    if (givens[r][c] === 0) continue;

    const mr = 8 - r;
    const mc = 8 - c;
    const isPair = !(mr === r && mc === c) && givens[mr][mc] !== 0;

    const a = givens[r][c];
    const b = givens[mr][mc];
    givens[r][c] = 0;
    if (isPair) givens[mr][mc] = 0;

    if (countSolutions(givens.map((row) => [...row]), 2) !== 1) {
      givens[r][c] = a; // removal broke uniqueness — restore
      if (isPair) givens[mr][mc] = b;
    } else {
      givensCount -= isPair ? 2 : 1;
    }
  }

  return { dateKey, difficulty, givens, solution };
}

/** Today's key in the visitor's local timezone: YYYY-MM-DD. */
export function todayKey(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/* ------------------------------------------------------------------ */
/* Board analysis (used by the UI for gentle conflict highlighting)    */
/* ------------------------------------------------------------------ */

/**
 * Indices (0–80) of cells whose value collides with another value in
 * its row, column, or 3×3 box. Used for soft highlighting only —
 * never for punishment.
 */
export function findConflicts(values: number[]): Set<number> {
  const bad = new Set<number>();
  const markGroup = (idxs: number[]) => {
    const seen = new Map<number, number[]>();
    for (const i of idxs) {
      const v = values[i];
      if (v === 0) continue;
      const list = seen.get(v);
      if (list) {
        bad.add(i);
        list.forEach((j) => bad.add(j));
        list.push(i);
      } else {
        seen.set(v, [i]);
      }
    }
  };

  for (let r = 0; r < 9; r++) markGroup([...Array(9)].map((_, c) => r * 9 + c));
  for (let c = 0; c < 9; c++) markGroup([...Array(9)].map((_, r) => r * 9 + c));
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const idxs: number[] = [];
      for (let dr = 0; dr < 3; dr++)
        for (let dc = 0; dc < 3; dc++) idxs.push((br * 3 + dr) * 9 + (bc * 3 + dc));
      markGroup(idxs);
    }
  }
  return bad;
}

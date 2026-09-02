# The Daily Number lands · 2026-09-02

Kimi's sudoku — built to a separate spec and dropped by KP into `resonance-void/intake/daily-sudoku/`
rather than the working session ("i placed it in the void to not disrupt your flow") — lands in the
Sanctuary as the second of the four dailies board ⑦ named on 2026-08-25 (word scramble, crossword,
word find, sudoku, cryptex reserved). The engine at `lib/sudoku.ts` — a pure-TS deterministic
generator, MRV backtracking solver, seed `sanctuary-sudoku:<YYYY-MM-DD>:<difficulty>` — is untouched
except a four-line provenance header naming its origin and its author; the game component the same.
Neither imported a package the site does not already have; the `@/*` alias already resolved
`@/lib/sudoku` as written, so no import surgery was needed.

**Where things landed**, at the site's own shape rather than the intake's guess: `src/lib/sudoku.ts` ·
`src/components/asgard/domains/athena/dailies/SudokuGame.tsx` (flat in the domain folder, PascalCase,
beside `DailiesHall.tsx` — the site keeps no per-feature subfolders here, so the intake's nested
`components/sudoku/` did not carry over) · `src/app/(athena)/library/dailies/sudoku/page.tsx`, rebuilt
onto the site's own `Page` wrapper (`showForeground={false} showContinuityBeam={true}`, the same shape
`library/badges/page.tsx` uses) rather than the intake's bare version. All five tokens the README named
— `bg-deep-space`, `text-star-dust`, `ring-hearth-gold`, `bg-bifrost-base/25`, `text-bifrost-light` —
were already real, load-bearing classes elsewhere in this tree (`hearth.gold #FDCB6E`,
`bifrost.base #6C5CE7`, `bifrost.light #7D6CEA` in `tailwind.generated.config.mjs`; `deep-space` and
`star-dust` both safelisted and CSS-variabled in `globals.css`) — no mapping needed, no theme edit.

**Linked** at the shelf `DailiesHall.tsx` draws for word scramble: a card above the puzzle grid, same
focus ring and border language as its siblings, reading through to `/library/dailies/sudoku`.

**Gates.** `npm run type-check` — clean. `npm run build` — clean, `/library/dailies/sudoku` compiles
as a static route alongside the other 14 library pages. `npx eslint` on the four touched files — one
family of pre-existing errors only: `react-hooks/set-state-in-effect` on four `useEffect` bodies (two
in the landed `SudokuGame.tsx`, one pre-existing in `DailiesHall.tsx` untouched by this sitting). This
is not new: `BadgesGallery.tsx`, never touched here, throws the identical error on the identical rule,
and 2026-09-01's lint journal already counted "~267 React-compiler rules" of exactly this shape
running clean through `eslint .` on `main`. Kimi's code follows the same idiom the rest of the realm
already stands in.

**The Node proof** —
`.journals/proofs/04-athena/build/2026-09-02-the-daily-number-lands.proof.mjs`, run via `npx tsx`
against the landed `src/lib/sudoku.ts` itself, no reimplementation. Determinism: two calls of
`generateDailyPuzzle('2026-09-02', difficulty)` return byte-identical givens and solution grids, all
three depths. Uniqueness: the engine's own `countSolutions(givens, 2)` returns exactly 1 for all
three. The clue-count check did **not** hold as documented — a real finding, not a proof bug: on the
fixed date the achieved counts were 41/33/27 against the documented 42/34/28, one clue short on all
three. An eight-date scan explains why and shows it is systematic rather than a bad seed: holes are
dug in mirror-symmetric pairs, and the only cell the digger can ever remove *alone* is the true center
(4,4). Starting from 81 (odd), a run of pure pair-removals (-2 each) stays odd forever and steps past
an even target; the `givensCount <= target` break then stops it one short — target-1 — unless that one
unpaired center removal happens to succeed somewhere in the walk. Across the scan: exact-on-target
4/8, 4/8, 3/8 for gentle/steady/deep respectively, the rest landing at target-1 every time, never above
it. The engine is unmodified per instruction — Kimi's numbers stand — so this is reported here rather
than silently patched: the "documented clue counts" are the generator's aim, most days one harder than
written.

**Not done:** no theme edit (none needed), no engine edit beyond the provenance header, no attempt to
close the clue-count gap — that is Kimi's or a future sitting's call, not this one's to make quietly.

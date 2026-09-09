# The map on the phone

## What was built

**`src/components/bifrost/StreetTree.tsx`** (new). The street as one nested
list, built from `THE_STREET` at render: ten realms as accordion items (name,
whisper, a pin mark for the realm the path stands in, a footprint mark for
walked ground and a ring for ground not yet walked), each realm's rooms as
`next/link` doors beneath it. Props `onTravel?`, `className?`, `compact?`. The
realm the path stands in is open; the rest are folded, and a folded realm's
doors are not mounted. Every row carries `min-h-11`. Exports:

- `streetRows(pathname, discovered, ready)` — the rows; `walked` is null until
  the discovery shelf has been read.
- `openRealms(rows)` — the realms the tree opens on.
- `FOCUS_RING` — moved here from `Navigation.tsx`, which now re-exports it, so
  `MapDialog.tsx` reads it at the same address. The move keeps the definition
  out of a cycle: `Navigation` imports `StreetTree`, never the reverse.

**`src/components/seidr/immersive/Learscail.tsx`**. The drawing renders from
`md:` upward only; below `md:` the panel renders `<StreetTree compact />`. The "Show the
list" toggle is `hidden … md:flex` and swaps the drawing for `StreetTree` on
desktop; the old flat `PlainLens` list is gone. The choice is kept in
localStorage under `audhdities.learscail.asWords.v1`, read through
`useSyncExternalStore` with a server snapshot of false, written through
`writeAsWords`, both wrapped in try/catch. Nothing paints until `ready` is
true — an empty panel of the same size stands until then, so no province
flashes unnamed. The dead `makeMappa` import is removed. The drawing's
discovery fog is unchanged.

**`src/components/bifrost/MapDialog.tsx`**. The `<dialog>` is
`inset-0 h-[100dvh] w-full rounded-none` below `md:` and
`md:h-[80vh] md:w-[80vw] md:rounded-xl` above it; the inline
`{ margin: 'auto' }` resolves to zero at full width and centres the panel from
`md:` upward. The flat room index is `hidden … md:block` with
`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, and its `max-h-[24vh]` cap now
applies from `md:` only. The fold button carries
`inline-flex min-h-11 min-w-11 items-center justify-center` with its `h-5 w-5`
icon and its inline `padding: 0.25rem`. The native `<dialog>` behaviour is
untouched.

**`src/components/bifrost/Navigation.tsx`**. The drawer's flat street is now
`<StreetTree compact onTravel={closeDrawer} />`. The panel carries
`role="dialog"`, `aria-modal="true"`, an `aria-label` and `id="bifrost-drawer"`;
the FAB carries `type="button"`, `aria-expanded` and `aria-controls`. The panel
is mounted only while open, so its doors leave the tab order when it is folded.
`aria-controls` stands only while the drawer is open. Escape folds it;
`document.body.style.overflow` is set to `hidden` while it stands open and
restored by the effect's cleanup. Open state is a boolean `drawerOpen` beside a
kept `drawerPath`; a render in which `drawerPath !== pathname` sets the path and
folds the drawer, so every door, the FAB, Escape, the overlay and the back
button all leave it closed. The drawer's fold button carries
`inline-flex min-h-11 min-w-11 items-center justify-center` with its `h-5 w-5`
icon. "The four" is unchanged; the FAB keeps its place and size.

**`.journals/proofs/bifrost-the-street-tree/`** — `prove-street-tree.ts`,
`PROOF.md`, `results.json`.

## On the base reset

`src/app/globals.css:21` now carries the `* { margin: 0; padding: 0 }` reset
inside `@layer base`, so Tailwind's padding and margin utilities out-rank it.
`MapDialog.tsx` keeps its inline `style={{ margin: 'auto', padding: '1.5rem' }}`
and its inline row padding exactly as they stood; nothing was converted, and the
comment above the dialog's inline style now names what the two values set. `StreetTree.tsx` uses padding
utilities and, additionally, `min-h-11` on every row, so the 44px hit target
holds whether or not a padding utility takes.

## Not done

- `MapDialog.tsx`'s room index below `md:` is hidden rather than replaced by
  `StreetTree compact`: `Learscail` already renders `StreetTree` there, and
  both would have put two copies of the same tree in the phone dialog.
- `Compass` is imported and unused in `Navigation.tsx` (pre-existing eslint
  warning); left as found.
- The served-HTML check could not be run — no server was started.
- The drawer folds on a path change through a render-phase state adjustment
  rather than an effect: `react-hooks/set-state-in-effect` errors on a
  `setState` in an effect body, guarded or not.

## Verification

```
npx tsc --noEmit                 → no output
npx eslint <the four components> → exit 0 (1 pre-existing warning: Compass)
npx tsx .journals/proofs/bifrost-the-street-tree/prove-street-tree.ts → 26 of 26 checks passed
```

## The verifier's findings, closed

- `Navigation.tsx` holds a boolean open state with a kept path; the drawer no
  longer reopens on a return to the path it was last opened on.
- The drawer's fold button and the map's fold button carry a 44px minimum
  target.
- `MapDialog.tsx`'s comment above the dialog's inline style states what the
  margin and padding set.
- The named why-comments in `MapDialog.tsx`, `Navigation.tsx` and
  `Learscail.tsx` are one line of what, or gone.
- The phone tree inside the map dialog renders `<StreetTree compact />`.
- The FAB's `aria-controls` names the panel only while the panel is mounted.

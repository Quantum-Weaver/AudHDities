# The Screen Holds

Overflow reachability pass across the app shell and six components.

## Edits

- `src/app/layout.tsx:2` — `import type { Viewport } from 'next'`.
- `src/app/layout.tsx:18` — removed the unused `Footer` import; `Footer` had no
  reference in the file.
- `src/app/layout.tsx:24-28` — `export const viewport: Viewport` with
  `width: 'device-width'`, `initialScale: 1`, `viewportFit: 'cover'`.
- `src/app/layout.tsx:33` — `<body>` loses `className="overflow-x-hidden"`; the
  rule stays in `src/app/globals.css:39`, one definition.
- `src/app/globals.css:41` — `min-height: 100dvh` added under the kept
  `min-height: 100vh` fallback.
- `src/components/asgard/domains/mnemosyne/schema/SchemaExplorer.tsx:194-238` —
  the columns `<table>` wrapped in `<div className="overflow-x-auto">`, the
  `SchemaTableCard.tsx:66-67` pattern; body reindented two spaces.
- `src/components/asgard/domains/plutus/business/DignityFloor.tsx:67-68,81` —
  header row and body rows are one comparison table and must hold column
  alignment, so the breakpoint change was not taken: the card's
  `overflow-hidden` becomes `overflow-x-auto` and both grids carry
  `min-w-[36rem]`, so the three columns scroll together instead of stacking out
  of register.
- `src/components/asgard/domains/themis/delegation/DelegationHub.tsx:76` —
  `grid-cols-3` → `grid-cols-1 md:grid-cols-3`; the three steps are
  self-contained, nothing to keep aligned.
- `src/components/asgard/domains/hermes/studio/StudioForm.tsx:542` —
  `grid-cols-3` → `grid-cols-1 md:grid-cols-3`; three independent stat blocks.
- `src/components/seidr/immersive/StatusBar.tsx:81` — `relative` on the
  sovereignty `HStack`, the tooltip's positioned ancestor.
- `src/components/seidr/immersive/StatusBar.tsx:97` — tooltip gains
  `max-w-[calc(100vw-2rem)]`; `whitespace-nowrap` → `whitespace-normal`, one
  white-space declaration rather than two competing classes.
- `src/components/vegvisir/Breadcrumb.tsx:190` — panel gains
  `max-w-[calc(100vw-2rem)]`; kept `left-0`, the collapse trigger sits in the
  left of the trail.
- `src/components/vegvisir/SortDropdown.tsx:103` — panel gains
  `max-w-[calc(100vw-2rem)]`; already anchored `right-0`, no flip needed.

Responsive classes written against `md:`. `src/components/bifrost/MapDialog.tsx`
untouched.

## Verification

`npx tsc --noEmit` — exit 0, no output.

`npx eslint` on the nine touched paths — 11 errors, 10 warnings, all
pre-existing (`react/no-unescaped-entities` in SchemaExplorer 157/251/280,
`no-explicit-any` in DelegationHub 16, four React-compiler rules in StatusBar
133/175/239/258); none on a changed line. Baseline run over the full modified
set at HEAD reported the same 11 errors. `globals.css` is outside the ESLint
config.

During the lint baseline, all 22 modified files in the tree were reset to HEAD and restored from copies; cmp reported no mismatch on any of them.

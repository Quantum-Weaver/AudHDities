# The Grammar door — 2026-09-09

Three edits, road step 1 of THE-GRAMMAR-UX.md §9.

## What stands

- `next.config.ts` — a host-conditioned `beforeFiles` rewrite pair for
  `grammar.audhdities.com`, same shape as the artifacts and kp.audhdities.com
  pairs: `/` → `/grammar/explore`, `/:path*` → `/grammar/:path*`.
- `src/lib/constants/systems/environments/page_mapping.ts` — twelve keys
  added under a new `// ATHENA (Grammar)` block, all `default: 'library'`:
  `/grammar`, `/grammar/explore`, `/grammar/atoms/*`, `/grammar/molecules/*`,
  `/grammar/organisms/*`, `/grammar/categories/*`, `/grammar/schemes`,
  `/grammar/schemes/*`, `/grammar/senses`, `/grammar/folksonomies`,
  `/grammar/folksonomies/*`, `/grammar/carry`.
- `src/components/asgard/domains/athena/library/LibraryHub.tsx` — one
  SECTIONS entry added after The Dailies (title 'The Grammar', href
  `/grammar`, icon `Languages`, color `text-neurospark`, bg
  `bg-neurospark/10`); the hub's count sentence changed from "Seven halls,
  open." to "Eight halls, open."

## Not this hand's

`src/app/(mnemosyne)/grammar/**` and `src/lib/grammar/**` do not exist yet;
they are another hand's build, untouched here.

## Not this hand's either

The CNAME for `grammar.audhdities.com` is KP's hand, per THE-GRAMMAR-UX.md
§9 step 1 and §10.

## Verification run

`npx tsc --noEmit` — no output. `npx eslint next.config.ts
src/lib/constants/systems/environments/page_mapping.ts
src/components/asgard/domains/athena/library/LibraryHub.tsx` — exit 0, one
pre-existing warning (`HeaderData` unused import) unrelated to this change.
`npm run build` — compiled and typechecked successfully, 299 static pages
generated, no `/grammar` routes present since the other hand's routes are
not yet built.

Nothing committed.

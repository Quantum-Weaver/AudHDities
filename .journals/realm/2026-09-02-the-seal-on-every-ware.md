# The Seal on Every Ware · 2026-09-02

Hermes's wares become the-sphragis's second consumer, named in the tool's own README before
this sitting began: "one water, two realms, the spring's law standing on schedule." Khorós's
releases were the first. `20260902_the_seal_on_every_ware.sql` adds `public.wares.sphragis jsonb`,
additive-only, default NULL, with a comment in the migration's own voice citing law 4 ("the 90/10
stays schema, not promise"). RLS on `wares` is untouched — the file says so and shows why: the
existing `"wares on the stall are readable by anyone"` policy (`status = 'published'`, from
`docs/sql/024-the-bazaar-refined-DRAFT.sql`) already covers the whole row, and a new column rides
under it with no column-level grant to add.

The site had no `src/lib/*/MIRROR.md` for either water, so both were drawn fresh, byte-faithful
(SHA256 verified against the origin at copy time) at `src/lib/sphragis/index.ts` and
`src/lib/merismos/index.ts`, each with a MIRROR.md in the house's shape (the-signet's mirror in
`resonance-cruthu/src/lib/signet/` was the template). `src/lib/wares/sphragis.ts` is the
hand-written reader — gaia's generated `WaresRow` type was not touched — reading `ware.sphragis`
defensively (`unknown -> Sphragis | null`, never throws, handles NULL, absent, JSON-string, and
malformed values alike). `WareLicence.tsx` renders a sealed ware's licence on
`/bazaar/wares/[id]` — the three grants and their hold/ended state, the split as schema, the
collaborator columns with per-part consent when present, the seal's evidence via `evidence()`,
and THE LAWYER GATE plainly, unsuppressed. A ware with no sphragis renders nothing new. The
residual-system page gained one section citing the-merismos grammar as the collaborators' half of
the residual pool — `combine()`'s picture as numbers to read, no cents moved, nothing wired.

Gates: `npm run type-check` clean · `npm run build` clean (`/bazaar/wares/[id]` and
`/forge/architecture/residual-system` both compile) · `npx eslint` on the six touched files: 0
errors, 1 pre-existing warning (`Shield` unused in residual-system/page.tsx, present before this
sitting) · the Node proof at
`.journals/proofs/03-hermes/build/2026-09-02-the-seal-on-every-ware.proof.ts`, run via `npx tsx`:
12/12 TRUE, including a drawn Sphragis parsing through the reader, absent/null/malformed/JSON-string
rows all reading back honestly, and two differently-ordered declarations of the same terms producing
byte-identical read documents.

Not run: the migration itself — file only, per the ward. Not wired: neither water reaches live
Supabase data in this sitting; every ware on the stall today has `sphragis = NULL` until a maker's
hand draws one.

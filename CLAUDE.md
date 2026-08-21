# CLAUDE.md — AudHDities (the Sovereign Sanctuary)

**Stack:** Next.js 16 (Turbopack) + TypeScript + Tailwind CSS + Supabase ("Superposition") + Stripe Connect

**Authors:** Quantum Weaver (human) + the named hands in [HANDS.md](HANDS.md) — every commit carries `Co-authored-by` trailers (THE-HANDS-STANDARD).

*(Trued 2026-08-14 at KP's ⚛ word — the lean doors plan, chamber desk; the struck text lives in this repo's git history.)*

---

Enter by **`docs/CHECKLIST.md`** — the newest rows ARE the current state. One
pass, one scoped duty (one route, one room, one component family — never "the
app"); zero errors before commit. Refinement work rides
`docs/UX-REFINEMENT-FLOW.md`, remembered in `docs/UX-REFINEMENT-LOG.md`.

## Essential Rules

- **Location details are privacy-critical, always.** Nothing world-facing names
  the town, county, or address — the root ward at its strictest, this repo being
  the world-facing surface.
- Evaluation language (what is demonstrably so) in anything world-facing; the
  Resonance License everywhere.
- Work rides branches, never raw main. **KP merges — his hand, always.**
- `_NOTEPAD.md` files (root and per-folder) are KP's working notes:
  read, never edit.
- The generated layer is GAIA's output; heal it by regenerating or by fixing
  gaia_config — never by hand-editing artifacts. Since the Great Retirement of
  2026-08-12 it is one root, `src/lib/generated/`, with `src/app/api/generated/`
  the lone Next.js exception.
- Schema wins conflicts: the backend is the newest stratum
  (see `SCHEMA-FINALIZE.md`).

## Structure

`docs/blueprints/AudHDities/pbp.ai.json` — regenerate, never hand-draw a tree here. Eleven
route groups stand under `src/app/`: ten deities and `(auth)`, the door. Plutus
is schema-whole and faceless at KP's ⚛ word, *"no front end for it."*

## Tools

Own commands: `npm run` dev · build · start · type-check · vercel-build · gaia
[`:dry`|`:force`|`:verbose`] — `lint` is dead (`next lint` left Next 16; bug B4).
`src/styles/generated/` and `src/lib/constants/cosmic/` arrive by cosmic
distribution — MIRROR, never edited here. Everything else: the `house-tools`
skill · new tables: `new-table`.

## People

Root `CLAUDE.md` §The Council · this repo's `HANDS.md`. KP is owner, tester, and
the merging hand.


## Standards

This repo follows the
[Sanctuary Standards](https://github.com/Quantum-Weaver/resonance-standards).
`.gitignore`, this file, and `docs/CHECKLIST.md` are **SEED-class** --
planted once from the standards and this repo's own from then on. No
agent overwrites them (DOC-CLASSES law).

*(Section landed 2026-08-19 at KP's word: "standards section should be in
claude md files.")*


## The forge and the link tender

*(Landed 2026-08-19 at KP's word: each CLAUDE.md carries how THIS realm uses
them. tend.py is the one button — it sets UTF-8 once and never commits.)*

- **Blueprint forge** — one forge, every realm, no local copies (KP ⚛
  2026-08-03). Regenerate this realm's structure map (lands whole at
  `docs/blueprints/` + one journal line; structure is DISCOVERED, never
  declared — never hand-draw a tree):

      python c:/_superposition/resonance-ziggy/tend.py forge run --root c:/_superposition/AudHDities

- **Link tender** — every markdown pointer in this realm, both house shapes,
  resolved three ways; every mend ledgered at
  `resonance-ziggy/modules/link-tender/MENDS.md`. **Dry first, always**, and
  read the report before mending:

      python c:/_superposition/resonance-ziggy/tend.py links dry --root c:/_superposition/AudHDities
      python c:/_superposition/resonance-ziggy/tend.py links mend --root c:/_superposition/AudHDities

  Its laws hold here as everywhere: homes are never entered, history is
  reported never rewritten, a pointer it may not verify is never "fixed,"
  and mimirs-well is sealed absolutely.

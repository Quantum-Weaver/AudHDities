# _NOTEPAD — repo root (`AudHDities/`)

*Working log for repo-level work (package.json, configs, cross-cutting state). **Not
documentation** (that's README.md) — the living record of what we did here, what's live,
and what's suspect. Newest work on top. Convention: KP + Opus, 2026-07-08 — every folder
that gets real work keeps a `_NOTEPAD.md` so knowledge lives next to the code.*

## Current repo state
- **Generated tree is FULL** (GAIA run 2026-07-09: 933 files, 0 errors; COSMIC 8/8 into
  `src/styles/generated/`). The "don't commit the empty mid-inhale state" caveat no longer
  applies — repo is committable whole, including the 2026-07-09 fixes below.
- The rebuild = `src/app` + `src/components` + wiring + schema-finalize (see `no-peek/`
  — sealed; witness GAIA+COSMIC yourself before reading it).

## Rebuild notes (parked, lose-nothing)
- **KP, 2026-07-09 — use `gaia_config` as the schema-finalize venue:** the table that
  tracked the original build becomes the discussion ledger for the refine — which of the
  151 tables need to exist / change / go. Once the backend is finalized there, GAIA
  regenerates the front-end surface, then begins the wiring + the handle-with-care UX
  pass across the whole Sanctuary. (Sequence: discuss in gaia_config → finalize schema →
  GAIA regen → wire → UX.) **Export on disk (KP, 2026-07-09):**
  `resonance-excavator/sources/landfill/gaia_config_rows.csv` — 151 rows, one per live
  table, with deity_group / status / visibility / api_access / per-table schema counts,
  and a `human_verified_tags` column ready to hold keep/change/drop verdicts. The
  round-table's already-decided rows apply on contact: drop `products.bigot_tax_cents`
  (OPEN-QUESTIONS row 2), factor the admin-check into one `is_admin()` (row 4).

## Work log
- **2026-07-09 (Fable) — package.json script audit** (KP asked: incorrectly listed / running
  more than needed):
  - `inspect:schema` pointed at `src/scripts/inspect_schema.ts` — file lives in
    `src/scripts/shared/`. **Fixed.**
  - `gaia:table` / `gaia:view` / `gaia:deity` ended in a dangling `=`; GAIA parses only
    single-token `--table=NAME`, and npm appends passed args as separate tokens, so these
    could never work. **Removed.** Correct usage: `npm run gaia -- --table=NAME` (same for
    `--view=` / `--deity=` / `--function=`).
  - `clean` + `clean:generated` used `rm -rf` — fails on Windows (npm's default shell is
    cmd.exe). **Replaced with cross-platform `node -e fs.rmSync` one-liners**, and added
    `src/utils/generated` to `clean:generated` (it was missing — utils are ~148 of GAIA's
    files and would have survived a "full" clean).
  - **Flagged, not changed:** (1) `generate:dry` / `reality:dry` run `gaia:helpers` +
    `gaia:enums` in WRITE mode before the dry-run step — a "dry" script that writes two
    files. Decide whether helpers/enums need dry flags or the name should stop promising
    dryness. (2) `generate` runs helpers(tables)→enums→gaia, but the sealed state doc
    describes the pipeline as enums→tables→index — verify whether order matters, align
    one of the two. (3) Plain `gaia` opens the interactive menu even though a separate
    `gaia:interactive` exists — harmless, but one of them is redundant.

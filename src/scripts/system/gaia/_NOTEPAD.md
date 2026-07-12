# _NOTEPAD — `src/scripts/system/gaia`

*Working log. Newest on top. See `../_NOTEPAD.md` for the folder-notepad convention.*

## What this folder is
**GAIA** — the self-generating backend engine. Reads a **local Supabase schema snapshot**
(`src/types/supabase/database.types.ts` → parsed to `src/lib/schema/schema-data.json`) and
regenerates the whole app backend from it: types, validators, constants, API routes, hooks,
utils. The schema is the DNA; this tree's output is exhaust — deletable, because GAIA re-inhales
it in under a second.

## How to run it
- **Non-interactive (what to use):** `npx tsx src/scripts/system/gaia/index.ts --force --verbose`
  then answer `c` at the generation-plan gate. Any CLI arg except `--interactive` takes the
  headless path with `target: 'all'`, write mode.
- **Interactive prompt does NOT accept piped answers** in the Claude harness (readline hits EOF
  and exits before generating) — always use the flag form above.
- Does **not** need a live DB / filled `.env` — it reads the *local* schema snapshot. Refreshing
  that snapshot from live Supabase is a separate step (the "Supabase end").

## Known behavior / cautions
- Currently **overwrites live generated files silently** (`⚠️ overwritten … (updated)`). Planned
  fix: a **staging-review gate** — when files already exist, write to `*.staging/` + emit a diff,
  promote to live only on explicit approval. (Parked in WORKSPACE-CHECKLIST GAIA row.)
- Keeps one human gate: the "Continue? (c/n/o)" plan confirmation before writing — good ward.

## Work log
- **2026-07-08 (Opus):** Full run at KP's request (tree was cleared on purpose to witness it):
  151 tables + 13 fns + 20 enums → **920 files, 0 errors, 0.77s.**
- **2026-07-08 (Opus):** **Bug fixed** — the run-registry writer (`shared/system_logger.ts`
  `writeRegistry`) didn't `mkdir` its parent (`config/generated/`) like every other writer, so
  the first run after a *full* clear crashed with ENOENT partway through. Added the
  ensure-directory guard; verified by deleting `config/generated/` and re-running → clean, 0
  errors, registry recreated.

# _NOTEPAD — `src/scripts`

*Working log for this folder set. **Not documentation** (that's README.md) — this is the
living record of what we did here, what's actually live, and what's suspect. Newest work on top.
Convention started 2026-07-08 by KP + Opus: every folder (or folder set) that gets real work
keeps a `_NOTEPAD.md` so knowledge lives next to the code it describes and can't drift away.*

## What this folder is
The AudHDities build/maintenance engines — the code that *generates and maintains* the app,
separate from the app itself.

## Inventory & status  ⚠️ USED-vs-UNUSED AUDIT PENDING (KP flagged 2026-07-08: "so much in it that might be going unused")
| Path | Status | Note |
|------|--------|------|
| `system/gaia/` | ✅ **LIVE** | Regenerates the whole backend from the local Supabase schema snapshot. Full run 2026-07-08: 920 files, 0 errors, 0.77s. See its own `_NOTEPAD.md`. |
| `shared/` | ✅ **LIVE** (partial) | `system_logger.ts` (used by GAIA + COSMIC), `logger.ts`, `paths.ts`. Other files: audit pending. |
| `system/cosmic/` | ✅ **LIVE** | Exercised 2026-07-09 (Fable): 8/8 modules generate. **Path bug found+fixed** — wrote to `../styles/generated` (outside the repo!); now `src/styles/generated` in all 7 generators + `index.ts:46`. Stray out-of-repo copy verified identical and removed. |
| `system/daedalus/` | ❓ audit pending | The meta-generator (renamed from prometheus). Relationship to `system/gaia` unclear — verify before assuming both are live. |
| `system/mnemosyne/` | ❓ audit pending | Assessment-system scripts. Usage unknown. |
| `modules/` (assemble/discover/format/generate/system) | ❓ audit pending | Possibly GAIA's internals, possibly an older parallel path. **Prime suspect for dead code.** |
| `audit/` | ❓ audit pending | Purpose unknown. |

## Local first job
**Used/unused audit:** trace imports/invocations from real entrypoints (GAIA `index.ts`, COSMIC,
package.json scripts) to classify each subfolder as LIVE / DEAD / DUPLICATE. Do NOT delete on
suspicion — mark, confirm with a reference trace, then propose removal (no silent deletes; the
staging-review law applies).

## Work log
- **2026-07-09 (Fable), later — first real `next dev` exercised the output:**
  COSMIC emitted **invalid wildcard selectors** in reduced-motion blocks
  (`.scroll-parallax-*`, `.mouse-parallax-*` in generate_parallax_classes.ts:339;
  `.zoom-target-*` in generate_zoom_targets.ts:317 — the *next* build error
  waiting). Fixed at source with attribute selectors (`[class*="…-"]`),
  regenerated 8/8, output verified wildcard-free. Bug class for the audit:
  prefix-glob habits in hand-emitted CSS — worth one sweep of the other
  generators' emitted selector strings.
- **2026-07-09 (Fable):** Witnessed both engines at KP's request: GAIA full run (151 tables →
  933 files, 0 errors, 1.09s) + COSMIC (8/8). Fixed COSMIC's out-of-repo output path (see
  inventory row). Note for the audit: GAIA's plan prompt (`c/n/o`) appears even with `--force`;
  headless runs need `printf "c\n" | npx tsx … --force`.
- **2026-07-08 (Opus):** Fixed the `system_logger.ts` `writeRegistry` bug (didn't `mkdir` its
  parent `config/generated/`, crashing GAIA's first post-clear run). Verified. Started this
  notepad practice.

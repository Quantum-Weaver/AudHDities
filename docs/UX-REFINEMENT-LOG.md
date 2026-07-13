# AUDHDITIES UX REFINEMENT — LOG
*Append-only. The flow's memory (see UX-REFINEMENT-FLOW.md). Created at
Step 0, 2026-07-12 night.*

## Step 0 — CHECKPOINT ✅ (2026-07-12, KP's word: "checkpoint")

- Branch `checkpoint/2026-07-12-frozen-refactor`:
  - `94b6a483` — the frozen refactor (1,395 in-flight paths: src/lib 527,
    src/app 410, src/types 209, src/hooks 193, + scripts/config/styles),
    preserved without blessing.
  - `8677d19f` — `no-peek/` (the gaia magic) joined by KP's word; the
    boundary lifted by its owner.
- **Consequence, deliberate:** `main`'s working tree is now CLEAN — the
  refactor lives wholly on the branch and returns file-by-file through
  Step 2 triage (`git checkout checkpoint/... -- <path>`). Nothing can
  be lost; nothing is endorsed.

### Baseline (main, post-checkpoint)
| Check | Result |
|---|---|
| `npm run type-check` (tsc --noEmit) | ✅ exit 0, no errors |
| `npm run lint` | 🔴 toolchain broken — see merged-state baseline below (2026-07-13) |
| `npm run build` | 🔴 exit 1, 4 errors — see merged-state baseline below (2026-07-13) |

*(The frozen-refactor state's own baseline can be taken on the branch
during triage if wanted — main's curated line is the one that gates work.)*

## Step 1 — orientation notes
*(each kin/session appends a line when they complete the ritual)*

## Step 2 — TRIAGE TABLE ✅ (KP's call, 2026-07-13: "just keep all 9 for now")
| Directory | Paths | Bucket (KEEP/QUARRY/RELEASE) | KP signed |
|---|---|---|---|
| src/lib | 527 | KEEP | ✅ 2026-07-13 |
| src/app | 410 | KEEP | ✅ 2026-07-13 |
| src/types | 209 | KEEP | ✅ 2026-07-13 |
| src/hooks | 193 | KEEP | ✅ 2026-07-13 |
| src/scripts | 29 | KEEP | ✅ 2026-07-13 |
| src/config | 10 | KEEP | ✅ 2026-07-13 |
| src/styles | 8 | KEEP | ✅ 2026-07-13 |
| no-peek (gaia) | — | KEEP | ✅ 2026-07-13 |
| _NOTEPAD.md | 1 | KEEP | ✅ 2026-07-13 |

*Blanket KEEP under the Step 0.5 refine-in-place pivot: everything already
lives on main; refinement passes may still propose quarry/release moves
per-scope, but each such move is KP's merge call, made pass by pass —
"for now" preserved as said.*

## Seam-notes (Step 4 passes)
*(one row per crossing: date · who · true substrate · scope · verification · weather)*

## Step 0.5 — THE MERGE (KP's pivot, 2026-07-12 lap-cat hours)

KP: refine in place, not selective resurrection. Checkpoint branch merged
into main at `86711a39` (one conflict, flow doc, resolved to the
law-lifted version). **Merged-state baseline: type-check exit 2 — exactly
ONE error** in 1,395 paths: `src/types/generated/hestia-core/
user_private.ts(32,21) TS1110 Type expected` (a broken generated type —
first dot on the refine map). Work branch cut: `refine/rewiring-2026-07`.
Triage table above is now a REFINE-IN-PLACE guide rather than a
resurrection list.

## The map, completed (2026-07-13, merged state, branch refine/rewiring-2026-07 @ ebdb4a71)

| Check | Result |
|---|---|
| `npm run type-check` | 🔴 exit 2 — exactly ONE error: `src/types/generated/hestia-core/user_private.ts(32,21) TS1110` (logged at Step 0.5) |
| `npm run lint` | 🔴 toolchain broken, two layers deep (see below) |
| `npm run build` | 🔴 exit 1 — 4 module-not-found errors, 2 files (see below) |

**Lint, honestly:** no lint verdict is currently obtainable at all.
(1) The script runs `next lint`, which **Next 16 removed** — it errors with
"Invalid project directory provided: ...\lint". (2) Running ESLint directly
(`npx eslint .`, flat config present) crashes exit 2: `eslint-config-next`
bundles an `eslint-plugin-react` incompatible with ESLint 10
(`contextOrFilename.getFilename is not a function`). Repairing the lint
toolchain (script → `eslint .`, deps reconciled) is a refine-pass duty.

**Build, honestly:** Turbopack fails on 4 module-not-found errors in 2 files:
- `src/components/asgard/domains/themis/governance/ApplicationForm.tsx`
  → `@/hooks/generated/hestia-core/profiles` (×2)
- `src/components/asgard/domains/mnemosyne/assessment/AcidTestForm.tsx`
  → `@/lib/constants/generated/mnemosyne-assessment/acid_question_type` (×2)

**The map has one theme.** All three failures — the TS1110, both missing
modules — live in the **generated layer** (`src/types/generated`,
`src/hooks/generated`, `src/lib/constants/generated`). The frozen refactor
merged in code that expects generated artifacts that are absent or broken.
The gaia pipeline (`npm run generate`) is the presumptive healer, but it
reads the live database — running it belongs to a deliberate refine pass
(and touches the superposition rebirth question), not to baseline-taking.
First refine pass's true scope: **heal the generated layer.**

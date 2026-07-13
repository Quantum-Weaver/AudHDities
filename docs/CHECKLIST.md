# AUDHDITIES — MASTER CHECKLIST

## LEGEND
- ✅ Complete
- ⚠️ In Progress
- 🔴 Broken
- ⬜ Pending

---

## PHASE STATUS
*(Phases here are the work-shuttle flow's steps — docs/UX-REFINEMENT-FLOW.md
is the spec; docs/UX-REFINEMENT-LOG.md is the append-only memory.)*

### Step 0: Checkpoint ✅ (2026-07-12)
- [x] Branch `checkpoint/2026-07-12-frozen-refactor` (1,395 paths preserved)
- [x] no-peek boundary lifted by KP; gaia work joined at `8677d19f`

### Step 0.5: The Merge ✅ (2026-07-12, KP's pivot: refine in place)
- [x] Checkpoint merged to main at `86711a39`; work branch `refine/rewiring-2026-07` cut

### Step 2: Triage ✅ (2026-07-13, KP: "just keep all 9 for now")
- [x] All nine rows KEEP; per-scope quarry/release remains KP's merge call

### Step 3: Standards pass ⚠️ (2026-07-13, this commit)
- [x] Baseline map completed (type-check, lint, build — all honest red)
- [x] CLAUDE.md, HANDS.md, docs/CHECKLIST.md, .gitignore merge, README reborn
- [ ] **KP's merge** ⬜

### Step 4: Refinement passes ⬜
- [ ] Pass 1 — **heal the generated layer** (the map's one theme):
      TS1110 in `src/types/generated/hestia-core/user_private.ts:32`,
      4 build module-not-found errors (2 files), lint toolchain repair
- [ ] Subsequent passes scoped by dwelling (Step 5), one duty each

---

## KNOWN BUGS
| ID | Description | Status |
|----|-------------|--------|
| B1 | `tsc --noEmit` exit 2 — TS1110 in `src/types/generated/hestia-core/user_private.ts(32,21)` | 🔴 |
| B2 | Build exit 1 — `ApplicationForm.tsx` imports missing `@/hooks/generated/hestia-core/profiles` | 🔴 |
| B3 | Build exit 1 — `AcidTestForm.tsx` imports missing `@/lib/constants/generated/mnemosyne-assessment/acid_question_type` | 🔴 |
| B4 | Lint toolchain: `next lint` removed in Next 16; direct ESLint 10 crashes on bundled eslint-plugin-react | 🔴 |

*(B1–B3 share one root: the generated layer. FABLE-KERNEL.md's standing
truths already name the dangling generated-import classes; BUILD-STATE.md
lists them. Heal by GAIA regeneration after the schema settles — never by
hand-editing artifacts.)*

## SESSION LOG
| Date | What Was Done |
|------|---------------|
| 2026-07-12 | Checkpoint, merge pivot, refine branch cut, rebirth decisions logged |
| 2026-07-13 | Triage signed (all KEEP) · baseline map completed (lint/build/type-check, all red, one theme) · Step 3 standards pass |

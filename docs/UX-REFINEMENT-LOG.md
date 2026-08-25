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

## Seam-note — 2026-08-24 — the theme stitch · the door

- **Who / substrate:** Fable conducting as Battuta (`claude-fable-5`); an Opus hand built the door (`claude-opus-5[1m]`); Sonnet and Haiku hands read and counted.
- **Scope:** Phase 0a (one `@config` line, `globals.css`) · realm 1, `(auth)` + `/sanctuary` as the visitors' home — 22 files.
- **Verification:** tsc 0 · build exit 0 on both branches; seven real pictures of the door (`.journals/proofs/01-auth/build/`); KP's glance: *"door looks good"*.
- **Handoff weather:** two stacked branches await KP's merge; Vercel previews fail until `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are ticked for Preview (dashboard, KP's hand); every `Button` unstyled app-wide (chassis pass owed); `agentRules` switch KP's.

## Seam-note — 2026-08-24 — the economics · the covenant display · the Bazaar canvas

- **Who / substrate:** Fable conducting as Ricercar (`claude-fable-5`); Sonnet hands read, checked and built; a Haiku hand counted; an Opus hand corrected the canvas.
- **Scope:** the two economics documents trued to KP's 08-24 words (the residual dial is a pledge, default 0; the covenant's roster and opt-in; the display moves); THE COVENANT section off the vessel face (`VesselContent.tsx`, `CovenantSpace.tsx`); the Bazaar canvas's five boards corrected and republished; hephaestus's Understanding opened (brief · census · 46-claim truth table).
- **Verification:** tsc 0 · build exit 0 (the covenant hand's run, explicit exit-code capture); every canvas edit script-verified exactly-once on both artboard and page.
- **Handoff weather:** `main` is merged as we go now (KP's word 08-24); the branch shelf holds `main` and the sitting's one; `PriceBreakdown.tsx` and the three disagreeing residual defaults are the Bazaar build's first correction; the Terms' 30/70 is at KP's eye; no outward community-profile surface exists yet (hestia's, second pass); Vercel previews still want the two `NEXT_PUBLIC_SUPABASE_*` names.

## Seam-note — 2026-08-24 — the Forge's economics pass

- **Who / substrate:** Fable conducting as Ricercar (`claude-fable-5`); an Opus hand built (`claude-opus-5[1m]`); Sonnet hands re-graded and read.
- **Scope:** the model proved to KP and corrected in two places (the fee's 30/70; distributions arrive whole; the roster ruled); the record rewritten; the content-truth pass on every economics surface in (hephaestus) + the plutus families + the four hermes split files + the Terms' two spans — 27 files, no shape changed.
- **Verification:** tsc 0 · build 0 (explicit exit codes); the dead-phrase sweep across src/ and docs/ with every remaining hit named and justified.
- **Handoff weather:** the Terms' before/after is at KP's strike; "Creators keep 90%" on /vision is loose with contributors; the Studio files' double-encoded em dashes are the Bazaar build's; the Forge's second movement (eighteen pages · the privacy page · the nav · the transparency pair) is being read.

## Seam-note — 2026-08-24 — the Forge's truth pass, the copy half

- **Who / substrate:** Fable conducting as Ricercar (`claude-fable-5`); an Opus hand built; three Sonnet hands read.
- **Scope:** the eighteen non-economics pages of (hephaestus) made true to the realms they describe — no shape changed; the fabricated press coverage and dead downloads removed; the interview form wired to the real contact door; auth-flow rewritten to the door as built.
- **Verification:** tsc 0 · build 0 (262 pages); the three ? claims verified against the tree (one exists, two softened).
- **Handoff weather:** the shape half waits on the canvas (`/apps/privacy` · the nav · `/donate` · `/press` · the transparency pair); the Terms' seven non-economics mechanisms are KP's; `/enter` in the chassis constants; the push needs KP's sign-in.

## Seam-note — 2026-08-25 — the Forge's second movement, the shape half

- **Who / substrate:** Fable conducting as Anacrusis (`claude-fable-5`); an Opus lead built on `refine/hephaestus-2026-08-24`; three Sonnet lenses verified; an Opus hand drew, an Opus hand specified.
- **Scope:** ② the four-item nav from the street · ③ `/press` one card + the form · ④ `/council/ledger` per-entry with the link up · ⑤ `/donate` retired across five files · ① `/apps/privacy` from `docs/privacy-apps/privacy-apps.md` · the fix list (the parser's date read; motion asks; the words — the two guides renamed with redirects) · the reduced-motion blank-page fix in the three legal components.
- **Verification:** tsc 0 · build 0 (262 pages) · thirteen pictures read · V: 48/52 pass, 2 refuted non-blocking (the map's focus return, pre-existing; the signed-in ledger read not logged), 2 unreached (live POSTs), 0 unaccounted files, 0 generated files touched.
- **Handoff weather:** `023-the-ledger-door-DRAFT.sql` asks KP which door the ledger gets (A/B/C); `LEDGER_DOOR_CONFIRMED` flips to true when the read is proven; weaver's place on `/apps/privacy` is KP's; the ~45 framer fade-ins under `src/` that vanish under reduced motion are the chassis's sweep; the map's focus return is one ref away; the Bazaar's build rides beside this in its own worktree.

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
| B1 | `tsc --noEmit` exit 2 — TS1110 in `src/types/generated/hestia-core/user_private.ts(32,21)` | ✅ healed — type-check exit 0 verified 2026-07-29 (audhd lane, post 07-28 regen + finishing session) |
| B2 | Build exit 1 — `ApplicationForm.tsx` imports missing `@/hooks/generated/hestia-core/profiles` | ✅ healed — KP's build run 2026-07-29: "Compiled successfully", TypeScript passed; the regen closed it |
| B3 | Build exit 1 — `AcidTestForm.tsx` imports missing `@/lib/constants/generated/mnemosyne-assessment/acid_question_type` | ✅ healed — same build run, same evidence |
| B4 | Lint toolchain: `next lint` removed in Next 16; direct ESLint 10 crashes on bundled eslint-plugin-react | 🔴 |
| B5 | Build exit 1 at PRERENDER (new class, noted by KP's test run 2026-07-29): `useSearchParams()` without a Suspense boundary — build died at `/(hermes)/bazaar/creations`. Sweep shows the class in 4 client components: `hermes/creations/CreationsGallery.tsx` · `hermes/creators/CreatorsGallery.tsx` · `hermes/checkout/CheckoutForm.tsx` · `auth/LoginForm.tsx` (build exits at first error, so all four pages are suspects). Fix shape: wrap each in `<Suspense>` at its page. | 🔴 noted, fix awaits the word |

*(B1–B3 share one root: the generated layer. FABLE-KERNEL.md's standing
truths already name the dangling generated-import classes; BUILD-STATE.md
lists them. Heal by GAIA regeneration after the schema settles — never by
hand-editing artifacts.)*

## SESSION LOG
| Date | What Was Done |
|------|---------------|
| 2026-07-12 | Checkpoint, merge pivot, refine branch cut, rebirth decisions logged |
| 2026-07-13 | Triage signed (all KEEP) · baseline map completed (lint/build/type-check, all red, one theme) · Step 3 standards pass |
| 2026-07-29 | THE FRONTEND REIMAGINING: designed AND built in one day. The E2 UX study (8 rounds, `constellation/fable/lanes/study/e2-the-ux-study-bus.md`) closed with all four gates ruled by KP's hand; the finishing session built the work-order ①–⑤ (commit `c3a9ede0`): header lane · EnvironmentLayer under 127 pages (panorama organs retired in place) · resolver → token bundles · **scene renderer at `/vessel/home`** · ceremony switchboard + farewell (*Gweld ti'n fuan*). tsc 0 re-verified by the audhd lane; B1 healed; boards trued (FEATURE-BOARD, BUILD-STATE). Open: ~~ceremony-choices migration~~ ✅ closed same day (KP's hand ran it; types repulled · GAIA 743 files 0 errors · staging cast dropped · tsc 0 — `d8dc922e`) · image lift · EnvironmentKey stitch (ziggy) · testing ritual · seeding at KP's word |
| 2026-07-30 | IRIS STAGE 1 — the honest room (iris-realm lane, KP's ruling at the realm bus): `TranslationsHub.tsx` retired its six hardcoded languages with invented completion bars (no table ever backed them); the room is now the covenant statement + a waiting-not-missing card pointing at the one real door (Healing Flame). Design: reimagining lane (intent at `(iris)/REALM-BUS.md`); tree: iris-realm. Meters: tsc 0 · build stops at known B5 (`/bazaar/creations`, outside the realm) — delta from baseline zero. Stage 2 (doorway to the Grammar's language walk) stays gated on the Grammar's first light + KP's word |
| 2026-07-28 | THE SUPERPOSITION REVIEW (grammar FEATURE-BOARD note 2, act a+b): 151 tables walked deity-by-deity (docs/SUPERPOSITION-TABLE-REVIEW.md) · 34 dropped by KP's hand under the pruning law (archives verified: test_patterns 15 · keywords 690 · the Linnaean set, excavator shelf; knowledge system lives in Grammar) · base now **117 tables** · database.types.ts regenerated from live (207,883 B), diff verified exact · staying emigrants: gaia_config, templates, scripts, folksonomy (3 dormant FK columns noted) · GAIA pantheon regenerated same sitting (713 files · 0 errors · 0.92s; zero ghosts) · SELF-KNOWING LAYER INSTALLED (docs/sql/001 by KP's hand: 7 registries + columns + gaia_sync with ghost-removal; first portrait: 1,691 columns · 388 policies · 24 functions · 209 triggers · 711 indexes · 20 enums; 3 ancestor-laws honored in adaptation: uuid created_by, NOT NULL deity_group, private doors) · DEITY BACKFILL run (docs/sql/002: ten houses, 124 rows, zero unassigned) · walker caught first drift: moderation_actions absent from hand-kept registry |

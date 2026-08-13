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
| B5 | Build exit 1 at PRERENDER (new class, noted by KP's test run 2026-07-29): `useSearchParams()` without a Suspense boundary — build died at `/(hermes)/bazaar/creations`. Sweep shows the class in 4 client components: `hermes/creations/CreationsGallery.tsx` · `hermes/creators/CreatorsGallery.tsx` · `hermes/checkout/CheckoutForm.tsx` · `auth/LoginForm.tsx` (build exits at first error, so all four pages are suspects). Fix shape: wrap each in `<Suspense>` at its page. | ✅ healed 2026-07-30 (iris-realm lane, KP's word) — creations + creators + login wrapped at their pages; checkout success already had its wrap |
| B6 | Build exit 1 at PRERENDER (found behind B5, 2026-07-30): icon COMPONENTS passed as props from server pages into `'use client'` templates — RSC serialization refuses functions. `NexusPageTemplate` (5 aethelred pages) + `StudioPageTemplate` (9 prometheus pages). Neither template used hooks or handlers. | ✅ healed 2026-07-30 — both templates de-cliented (server components by design, dated comments in place); all 14 pages prerender |
| B7 | Build exit 1 at PRERENDER (found behind B6, 2026-07-30): `/privacy` + `/terms` read markdown from `forge/privacy/` · `forge/terms/` at build time — paths that no longer exist (files live under `docs/`). | ✅ healed 2026-07-30 — both reads re-pointed `forge` → `docs`; covenant text untouched |

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
| 2026-07-30 | **THE BUILD GOES GREEN — 255/255** (iris-realm lane, KP's ⚛ word "please deara friend"): three blocker classes cleared in one sitting, each found behind the last — B5 (Suspense wraps: hermes creations/creators + auth login) · B6 (RSC function-props: NexusPageTemplate + StudioPageTemplate de-cliented, 14 pages) · B7 (moved markdown: privacy/terms reads re-pointed forge→docs). First green `npm run build` since the 2026-07-13 baseline went red. tsc 0. Visiting-hand notes posted on hermes, aethelred, prometheus, hephaestus + repo buses. Remaining red: B4 only (lint toolchain — does not block the build) |
| 2026-07-30 | THEMIS TENDING (themis-realm lane, KP's "let us continue"): the Ledger room's stale door healed — `LedgerHub.tsx` rewired from the phantom `themis-governance/ledger` to `plutus-economics/ledger` AND trued to the live schema (UI-era interface replaced with generated `PublicLedger`; amount+currency via Intl, event_at, icon_emoji) · map drift healed ((themis)/README trued to 13 pages / 11 components, ApplicationForm corridor mapped, living-state pointer to the realm bus; SCHEMA-FINALIZE row 3 trued 7→10 in place) · the consent record DRAFTED, not applied: `docs/sql/013-the-consent-record-DRAFT.sql` (votes table, consent laws in columns, Q1–Q5 for KP's ⚛ row-3 rulings) · REALM-BUS standing state trued same sitting. Meters: tsc 0 |
| 2026-07-31 | MNEMOSYNE TENDING — the fresh sky (mnemosyne-realm lane, KP's "please continue"): the Schema Constellation's stale portrait healed — `npm run gaia:schema` regenerated `src/lib/schema/schema-data.json` from the post-review `database.types.ts` (2026-05-01 → 2026-07-31: 125 tables · 20 enums · 14 functions · 1,709 columns · 9 sensitive-marked; the 125 = the ten houses' 118 + the 7 self-knowing registries, which render ungrouped — a star-map design question noted on the realm bus) · the (mnemosyne)/README fossil trued (table map to the settled 8-table domain with emigrant pointers · data-flow to the real wiring · RLS section made honest: policies unverified from app side, edge 4 · features 1/2/3/6 + data layer corrected) · REALM-BUS standing state trued same sitting. Meters: tsc 0 |
| 2026-07-31 | MNEMOSYNE README round two (same sitting, KP's "make certain our readme is up to date"): remaining sections walked against the rooms' code — the Weave/Vision/Grand Pattern descriptions retired from aspiration to truth (no quest-correlations were ever built; Vision's unfiltered "Honors to Earn" named — bus edge 6; Grand Pattern is four honest counts) · two phantom components removed from the list (ConstellationViewer lives in seidr, TimelineView never existed) · Environment Mapping table proved pure aspiration: NO (mnemosyne) route wired in PAGE_ENVIRONMENT_MAP, all nine pages fall to the `lounge` default — bus edge 5, intent preserved in the README as intent. The README is current with the code |
| 2026-07-31 | THE STAGE GROUND (prometheus-realm lane, KP's ⚛ ruling "Door A" at the realm bus): the realm's absent data layer BORN AND WIRED in one sitting — decision card live-verified against the base (`docs/STAGE-GROUND-DECISION.md`, both doors with dashboard SQL) · KP ran `docs/sql/003-the-stage-ground.sql` (born `events` table + 000 ritual + gaia_sync registration + deity `prometheus-stage`; the enum table kept itself — content_status.used_by gained events by the sync's own hand) · anon-door verified (honest `[]`+200) · types repulled via supabase CLI (bridge token, no login: `events` at line 1962) · `deity_groups.ts` gained sequence 11 — the seat kept free since 07-07 ("Prometheus is the creative-arts realm") · GAIA `--deity=prometheus`: 6 files, 0 errors (route family `/api/generated/prometheus-stage/events` exists at last) · UI sweep across all 10 Stage rooms (`events_id`→`id` + sort dialect `order=col.dir`→`sort=col&order=dir`) · realm law 7 (the stage performs nothing it cannot ground) SATISFIED for the Stage wing. Meters: tsc 0 · build running at close |
| 2026-07-28 | THE SUPERPOSITION REVIEW (grammar FEATURE-BOARD note 2, act a+b): 151 tables walked deity-by-deity (docs/SUPERPOSITION-TABLE-REVIEW.md) · 34 dropped by KP's hand under the pruning law (archives verified: test_patterns 15 · keywords 690 · the Linnaean set, excavator shelf; knowledge system lives in Grammar) · base now **117 tables** · database.types.ts regenerated from live (207,883 B), diff verified exact · staying emigrants: gaia_config, templates, scripts, folksonomy (3 dormant FK columns noted) · GAIA pantheon regenerated same sitting (713 files · 0 errors · 0.92s; zero ghosts) · SELF-KNOWING LAYER INSTALLED (docs/sql/001 by KP's hand: 7 registries + columns + gaia_sync with ghost-removal; first portrait: 1,691 columns · 388 policies · 24 functions · 209 triggers · 711 indexes · 20 enums; 3 ancestor-laws honored in adaptation: uuid created_by, NOT NULL deity_group, private doors) · DEITY BACKFILL run (docs/sql/002: ten houses, 124 rows, zero unassigned) · walker caught first drift: moderation_actions absent from hand-kept registry |
| 2026-08-12 | THE DOOR — the reset flow born (the Overture lamp, KP's "1 it is… be certain to check what exists before planning or building"): checked-first paid — the birth chain already stands drafted (`docs/sql/007-the-vessel-arrives.sql`: handle_new_user rebuilt for the three-table identity + auth.users trigger + backfill; verification SQL handed to KP's dashboard hand), and LoginForm's forgot-password link + AUTH_ROUTES.FORGOT_PASSWORD already existed, dead. Built: `(auth)/forgot-password` + `(auth)/reset-password` pages · ForgotPasswordForm + ResetPasswordForm (house idiom: forging/seidr/yggdrasil organs; AuthGuard — forgot wears requireAuth false, reset requires the recovery session) · useAuth grows resetPassword + updatePassword · auth constants grow RESET_PASSWORD/CALLBACK routes, reset labels, NEW_PASSWORD placeholder, both metadata blocks. The flow rides the existing callback's `?next=` unchanged; the sent state keeps the no-account-disclosure register ("if that address has a home here"). The app README's promised "Password Reset" page is now true. Meters: tsc 0 · build exit 0 |
| 2026-08-12 | THE DOOR CLOSED + HESTIA TENDED (same sitting): KP's dashboard readings confirmed the birth chain live (`on_auth_user_created` on auth.users; First Vessel's rows 1·1·1) — the door realm complete. Hestia dive: the keeper's bus read whole (realm finished 07-31, the Shaping's six gestures standing); the one licensed surgery done — SanctumContent's vestigial localStorage mirror retired (zero readers remained after athena's 013 repoint; both comments trued), seam closed on the hestia bus. Meters: tsc 0 |

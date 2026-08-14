# THE GAP BUS — AudHDities

*Laid 2026-08-01 by Opus (Claude) 🕯️, truly `claude-opus-5[1m]`, lane
`gaps`, at KP's ⚛ word — verbatim, spelling kept: "since this is such a
big task series, let us have you create the REALM-BUS.md for the
AudHDities root / we create sections in it for each of the things and we
add to each section when we review it. / a section for each folder within
the src/app and the app folder itself" — and named by his own next
keystroke: **"lets call it GAP-BUS.md"**, which is why this file is not
called what the first sentence called it. A `REALM-BUS.md` already stood
at this root; his rename kept the two apart instead of merging them.*

---

## ⚠ READ THIS BEFORE ANY FINDING BELOW — KP's ⚛ frame, given 2026-08-01

**Verbatim, spelling kept:** *"i feel like i should have began today by
tellingg you this project is not expected to be complete, and this is our
way of understanding it. we only began rebuild and refinements 2 days
ago."*

**This governs every section and every finding in this file, including the
ones written before he said it.** The walk is **how we understand the
realm**, not an audit of a thing expected to be finished. **The rebuild is
two days old.**

**And it names a bias in this lane's own vocabulary, which I would rather
label than average away: the word "gap" smuggles in a claim.** A gap
implies something *ought* to be present and is missing. Two days into a
rebuild, most absence is not a gap — **it is *not yet***. This lane's
method is declared-vs-present, and a method that treats every disagreement
as drift will systematically over-read an unfinished thing. *Recorded as a
standing correction to my own instrument, not as an apology.*

### Therefore every finding here is one of three species, and they are not equal

| Species | What it means | How to weigh it |
|---|---|---|
| **NOT YET** | The thing is unbuilt, and often *declared* unbuilt | **Not a defect.** Evidence of sequence, not of fault |
| **RECORD BEHIND BUILD** | A document was true when written; the tree moved | Worth truing **because the record is what everyone navigates by** — but the code was right in every instance found so far |
| **LIVE** | Costs something today, or traps a hand tomorrow, regardless of the project's age | The only class that earns urgency |

**Sorted by that light, as of 2026-08-01:**

- **NOT YET** — G-1 (`(auth)` undocumented) · G-3 (`api/` undocumented,
  mostly GAIA output) · G-11 (`workflow_config` left by a merge) · the
  nine Studio shells (**declared** placeholders on their own realm bus) ·
  `(themis)/council/applications/[id]` (*re-classed from my earlier
  "undeclared empty room" — at two days old, an unwritten declaration is
  not a lie*)
- **RECORD BEHIND BUILD** — G-2 (hestia 12→13) · G-5 (four table counts,
  no key) · G-6 (styles 8→21) · G-8 (hestia README map ×2) · G-9 (config
  README wrong both ways) · `StudioPageTemplate` (declared 9, present 1).
  ***In every one of these the code was correct and the document lagged.
  The drift has never once been in the build.***
- **LIVE — the whole list, and it is four items** — **①** G-13, the
  missing `@config` (one line; the only finding today that changes what a
  human eye sees) · **②** G-4's `013` collision (one applied, one a DRAFT
  that must never run, in a folder run by hand at KP's ⚛ dashboard) ·
  **③** `/forgot-password`, a live dead click on the first door a vessel
  meets · **④** G-10, `SYSTEM_REGISTRY_PATH` (zero consumers — costs
  nothing today, traps whoever trusts it later)

## The law of this bus

1. **This is a review ledger, not a tabletop.** `REALM-BUS.md` (same
   root) is the realm's standing coordination table — append-only lane
   messages, chronological, who-is-doing-what. **This file is organised
   by GROUND instead of by TIME**: one section per folder, and the whole
   review of that folder accumulates inside its own section, however many
   sittings it takes. The two do not compete; they are different
   substances kept in different rooms. Coordination goes there. Findings
   go here.
2. **One section per folder inside `src/app`, plus `src/app` itself** —
   KP's ⚛ shape, taken literally. Thirteen sections: eleven route groups,
   `api/`, and the app root. If a folder is born or dies, the section
   list follows the ground, and the change is dated in the section.
   **Widened 2026-08-01 at KP's ⚛ word — verbatim: *"please add a section
   for src/styles/\* and place that note in that section"*.** The shape is
   his to grow: a folder outside `src/app` earns its own section when the
   review reaches it and a finding needs a home. **`src/styles/*` (§S) and
   `src/config/*` (§C) opened this way, both at his word, the same
   sitting — fifteen sections.**
3. **Every section opens with DECLARED vs PRESENT.** What the record
   says, beside what the disk holds, with the date each was taken. This
   is the lane's whole method: when they disagree, one of them is wrong,
   and which one is the finding.
4. **The ground outranks the record; KP ⚛ outranks both.** Nothing here
   is a verdict. A finding is a measurement plus its provenance; the
   ruling is always his. Findings that are only *suspected* say so in
   their own words.
5. **Append inside a section, dated and signed.** Never rewrite a prior
   finding — supersede it with a new dated line, and say what it
   supersedes. Status emoji on the section header may move in place
   (that is the one exception, and it is the same exception the party
   line makes).
6. **A gap that closes tidily gets re-opened once and checked.** This
   lane's own ward, paid for by the Opus line on 2026-07-29: *the pair
   never catches itself.* Relief is the tell. If a finding dissolves on
   inspection, the dissolution gets written down too — see the repo-wide
   section for the first one, which dissolved within a minute of being
   found.
7. **The realm's own laws bind here unchanged:** `_NOTEPAD.md` files are
   KP's, read never edit · the generated layer is GAIA's, heal by
   regenerating · work rides branches, KP merges · location details are
   privacy-critical · boards trued the same sitting as the work.

### Status legend (section headers)

| Mark | Means |
|---|---|
| ⬜ | Not walked. The census below is the only thing measured. |
| 🔍 | Walked in part — what was covered is named inside. |
| ✅ | Walked whole, findings filed, nothing known left unlooked-at. |
| ⚠️ | Walked, and something open sits inside awaiting KP's ⚛ word. |

---

## The board

*Census taken 2026-08-01 from the disk (`find`), not from any document.
"Declared" is BUILD-STATE.md's per-group page table (2026-07-31 state).*

| # | Section | Pages (declared → present) | Routes | Own bus | README | Status |
|---|---|---|---|---|---|---|
| 0 | `src/app` (the root itself) | — → **1** | 0 | n/a | yes | ⬜ |
| 1 | `(aethelred)` | 9 → 9 ✓ | 0 | yes | yes | ⬜ |
| 2 | `(athena)` | 14 → 14 ✓ | 0 | yes | yes | ⬜ |
| 3 | `(auth)` | 2 → 2 ✓ | 2 | **NO** | **NO** | ⬜ |
| 4 | `(cosmic)` | 5 → 5 ✓ | 0 | yes | yes | ⬜ |
| 5 | `(hephaestus)` | 20 → 20 ✓ | 0 | yes | yes | ⬜ |
| 6 | `(hermes)` | 13 → 13 ✓ | 0 | yes | yes | ⬜ |
| 7 | `(hestia)` | **12 → 13** ✗ | 0 | yes | yes | 🔍 |
| 8 | `(iris)` | 11 → 11 ✓ | 0 | yes | yes | ⬜ |
| 9 | `(mnemosyne)` | 9 → 9 ✓ | 0 | yes | yes | ⬜ |
| 10 | `(prometheus)` | 22 → 22 ✓ | 0 | yes | yes | ⬜ |
| 11 | `(themis)` | 13 → 13 ✓ | 0 | yes | yes | ⬜ |
| 12 | `api/` | — → 0 | **293** | **NO** | **NO** | ⬜ |
| S | `src/styles/*` *(added at KP's ⚛ word 2026-08-01)* | n/a — sheets: **8 + overrides declared → 21 + overrides = 22 present** | n/a | n/a | NO | ⚠️ |
| C | `src/config/*` *(added at KP's ⚛ word 2026-08-01)* | n/a — modules: **8 declared → 8 present, but not the same 8** | n/a | n/a | yes (481 ln) | ⚠️ |
| — | *repo-wide* (belongs to no folder) | — | — | — | — | 🔍 |

**Totals on the disk: 132 `page.tsx` · 295 `route.ts`.**

**The record's own page numbers, for the reconciliation this board
exists to make possible — three different numbers are in circulation
and they are counting three different things:**

- **130** — BUILD-STATE.md's route-group table. Ground says 131 in the
  groups (hestia is 13, not 12) plus the app root's own `page.tsx`,
  which the table never counted at all. **132.**
- **127** — FEATURE-BOARD.md and BUILD-STATE.md, "EnvironmentLayer
  breathing under all 127 pages" (2026-07-29). Taken before
  `(prometheus)`'s Stage wing grew and before the root was in question.
  Whether the layer actually reaches all 132 today is **unmeasured** —
  filed as the app-root section's first open question, not as a defect.
- **255/255** — the green build, 2026-07-30. This is *prerendered
  routes*, not pages: a different unit entirely, and correctly so. It
  belongs beside the other two only to stop a future reader from
  averaging them.

*None of these three is wrong for what it counted. There is no key
anywhere saying what each counted, which is the gap.*

---

## 0 · `src/app` — the app root itself ⬜

**Present (2026-08-01):** `layout.tsx` · `page.tsx` · `error.tsx` ·
`globals.css` · `favicon.ico` · `README.md` (8,901 B, dated 2026-07-06 —
**the oldest state document in this tree, untouched since the repo's
first commit day**). No `_NOTEPAD.md`.

**Declared:** BUILD-STATE's page table does not include this folder; its
130 is groups-only. No document in the realm currently describes the app
root as a thing with its own state.

**Open questions raised by the census, not yet investigated:**
- Does `EnvironmentLayer` reach the root `page.tsx` and the `error.tsx`
  boundary, or only the 131 group pages? The "all 127 pages" claim is
  four days old and predates the Stage wing.
- `README.md` here has not been touched since 2026-07-06 while the tree
  moved underneath it for eight weeks. It is a **prime candidate** for
  the same fossil class the mnemosyne lane found and healed on 07-31 —
  suspected, not measured.

*— census only. No file in this folder has been read yet.*

## 1 · `(aethelred)` ⬜

**Present:** 9 pages · own `REALM-BUS.md` · own `README.md` · no notepad.
**Declared:** 9 pages (BUILD-STATE) ✓ — agrees.
**Known from elsewhere:** `NexusPageTemplate` was de-cliented here
2026-07-30 (B6); 5 pages ride it.

*— not walked.*

## 2 · `(athena)` ⬜

**Present:** 14 pages · own bus · own README · no notepad.
**Declared:** 14 ✓ — agrees.
**Known from elsewhere:** `docs/sql/008-the-library-first-seeds.sql` and
`009-library-doors-for-anyone.sql` were drafted by the athena lane
2026-07-30; Sonnet's 07-20 note names `athena-gamification/quests` as the
realm's canonical example of *silent rot in a route answering 200*.

*— not walked.*

## 3 · `(auth)` ⬜

**Present:** 2 pages · **2 `route.ts`** (the only route handlers outside
`api/`) · **no `REALM-BUS.md`** · **no `README.md`** · no notepad.
**Declared:** 2 pages ✓ — agrees.

**FINDING G-1 (2026-08-01, census) — `(auth)` is the only route group in
the realm with neither a bus nor a README.** Ten of eleven groups carry
both. Stated as measurement, not alarm: this is the group that holds the
signup and login doors, the two `route.ts` handlers, and the still-open
`forgot-password` gap named in FABLE-KERNEL since 2026-07-09 — so the
realm's least-documented group is also the one every future vessel walks
through first. *Whether that matters is KP's ⚛ call; the asymmetry is
simply true.*

**Known from elsewhere:** `LoginForm` got its Suspense wrap 2026-07-30
(B5) · auth routes import the dead `hestia-core/profiles` (FABLE-KERNEL
standing truth, unresolved) · **forgot-password page missing, login links
it, nothing answers** (named 07-09, still open at 08-01 — 23 days) ·
`validate_signup` EXECUTE restored for anon by `006` on 07-30 · birth
triggers are KP's stated precondition for the first vessel record.

*— not walked. Flagged as the strongest candidate for the first walk.*

## 4 · `(cosmic)` ⬜

**Present:** 5 pages · own bus · own README · no notepad.
**Declared:** 5 ✓ — agrees.
**Known from elsewhere:** holds the environments gallery — the one
legitimate remaining consumer of the panorama assets, and the gate on
the physical image lift (reimagining lane designs *Realms-as-travel*
first; the lift only runs after). The `EnvironmentKey` union needs a home
named before the lift; that decision rides with lane ziggy's stitch.

*— not walked.*

## 5 · `(hephaestus)` ⬜

**Present:** 20 pages · own bus · own README · no notepad.
**Declared:** 20 ✓ — agrees.
**Known from elsewhere:** owns `/privacy` and `/terms`, whose markdown
reads were re-pointed `forge/` → `docs/` on 2026-07-30 (B7) with neither
covenant's text touched.

*— not walked.*

## 6 · `(hermes)` ⬜

**Present:** 13 pages · own bus · own README · **the only group with an
`_NOTEPAD.md`**.
**Declared:** 13 ✓ — agrees.
**Known from elsewhere:** the bazaar — **fully audited 2026-07-09**,
11/11 rooms, notepad in every room, stranded imports mapped. FABLE-KERNEL
names this group's audit as *the template for the other ten*. Creations +
creators galleries got Suspense wraps 07-30 (B5).

*— not walked. Its prior audit is 23 days old and predates the schema
review, the reimagining, and the green build; the audit's* method *is
inheritable, its* findings *are a photograph.*

## 7 · `(hestia)` 🔍

*First walked 2026-08-01 at KP's ⚛ word — **"now together let us begin
with hestia"** — with his dev server open beside the reading. Walked so
far: the page census, both state documents (README + realm bus, read
whole), and the style-token sweep across the realm's pages and its 23
component files. **Not yet walked: the component logic itself, the data
wiring, the generated-hook consumers, and every claim in the bus's
standing state.***

**Present:** **13 pages** · own bus · own README · no notepad.
**Declared:** **12 pages** (BUILD-STATE) · **11 pages** (this realm's own
README page map).

**FINDING G-8 (2026-08-01, census) — the README's page map omits two
pages that exist.** `vessel/energy/[id]` and `vessel/constellation/[id]`
are on disk and absent from the map, which draws `energy/` and
`constellation/` as single-page rooms while explicitly noting the `[id]`
children of `journal/` and `notifications/`. So the map is internally
inconsistent in its own convention rather than uniformly abbreviated.
**Worth weighing against its provenance before anyone calls it rot:** this
README was refreshed whole seven hours before I read it, at KP's ⚛ word,
and it is otherwise excellent — it retired a 2026-07-06 fossil and names
its own bus as the truer source. *A two-page omission in a freshly-trued
document is the most interesting kind of gap, because it means the drift
rate here is faster than the tending rate.*

**The style-token seam was found in this realm and its root cause lives in
§S.** Measured here: **256 design-token utility uses · 212 alive · 42 dead
across 12 files**, 28 of them `border-star-dust/10–40` on the scene
organs. **The diagnosis, the verification and the open prediction are
filed in §`src/styles/*` at KP's ⚛ instruction**, because the cause is the
style system's and not the Hearth's — this realm is where the symptom
shows, not where the fault lives.

**FINDING G-2 (2026-08-01, census) — BUILD-STATE's page table is one
short here, and only here.** Ten of eleven group counts are exact; hestia
reads 12 against a ground of 13. This is a stale-by-one record, not a
phantom page — but it is the reason the realm's headline "130 pages"
cannot be reconciled with the disk without also noticing the uncounted
root page. **Cheap to true; the delta is one line.**

**Known from elsewhere:** the vessel home and the scene renderer live
here (`/vessel/home` — SceneRenderer · GardenBed · SceneDoorway ·
RealmMapFurniture, built 07-29) · the hestia lane found the base-wide
grants failure and drafted `006` · **the unbridged-theme finding is this
group's and it is repo-wide in effect** (Tailwind v4, tokens only as
`:root` vars, no `@theme` — every named colour utility in the tree mints
nothing; only the scene organs and farewell veil were converted to
`bg-(--color-*)` on 07-30, deliberately not app-wide at midnight).

*— not walked.*

## 8 · `(iris)` ⬜

**Present:** 11 pages · own bus · own README · no notepad.
**Declared:** 11 ✓ — agrees.
**Known from elsewhere:** Stage 1 done 07-30 — `TranslationsHub` retired
six hardcoded languages with invented completion bars that no table ever
backed, and the room became the covenant statement plus one honest
waiting-card. **This is the realm's cleanest precedent for the class of
gap this bus exists to find: a surface asserting data that does not
exist.** Stage 2 stays gated on the Grammar's first light + KP's ⚛ word.

*— not walked.*

## 9 · `(mnemosyne)` ⬜

**Present:** 9 pages · own bus · own README · no notepad.
**Declared:** 9 ✓ — agrees.
**Known from elsewhere:** README trued twice on 07-31 against the code —
quest-correlations never built, two phantom components removed
(`ConstellationViewer` lives in seidr; `TimelineView` never existed), and
**no `(mnemosyne)` route is wired into `PAGE_ENVIRONMENT_MAP` at all —
all nine pages fall to the `lounge` default** (that lane's bus edge 5,
intent preserved as intent).

*— not walked. The most recently trued README in the tree; its findings
are seven hours old and should be inherited, not re-derived.*

## 10 · `(prometheus)` ⬜

**Present:** 22 pages · own bus · own README · no notepad. **Largest
group in the realm.**
**Declared:** 22 ✓ — agrees.
**Known from elsewhere:** the Stage wing was WIRED 2026-07-31 on the
newborn `events` table (Door A; `docs/sql/003-the-stage-ground.sql`, KP's
⚛ hand) — 10 rooms trued for `id` and sort dialect, GAIA emitted the
route family, realm law 7 satisfied *for the Stage wing*. **The Studio
wing remains honest placeholders awaiting the Spring** — declared as
placeholders, which is the honest form of a gap and not a defect.
`StudioPageTemplate` de-cliented 07-30 (B6), 9 pages.

*— not walked.*

## 11 · `(themis)` ⬜

**Present:** 13 pages · own bus · own README · no notepad.
**Declared:** 13 ✓ — agrees.
**Known from elsewhere:** the Ledger room was rewired 07-30 from the
phantom `themis-governance/ledger` to the live `plutus-economics/ledger`
and trued to the generated `PublicLedger` type · the group README was
trued to 13 pages / 11 components in the same sitting · **the consent
record is DRAFTED AND NOT APPLIED** (`docs/sql/013-the-consent-record-
DRAFT.sql`) with Q1–Q5 waiting on KP's ⚛ row-3 rulings.

*— not walked.*

## 12 · `api/` ⬜

**Present:** **293 `route.ts` files.** No pages. **No `REALM-BUS.md`. No
`README.md`. No `_NOTEPAD.md`.**
**Declared:** nothing. No state document in this realm gives `api/` a
count, an owner, or a shape.

**FINDING G-3 (2026-08-01, census) — `api/` is the largest single surface
in `src/app` and the only one with no document of any kind.** 293 route
handlers — more than twice the page count of the entire rest of the tree
— and the realm's reading order (`REALM-BUS` → `BUILD-STATE` →
`FEATURE-BOARD` → `CHECKLIST`) does not mention the folder. Most of these
are presumably GAIA's generated route families (`/api/generated/...`,
6 files emitted for prometheus-stage alone on 07-31), which would make
them *healthy* and *regenerable* rather than unowned — **but that is a
presumption, and separating generated from hand-written here is the
single cheapest high-value measurement available in this tree.** Until
that split is counted, nobody can say how much of the API surface is
hand-maintained.

*— not walked. Recommended as the first census-only pass, because it is
one `find` and it retires a 293-file unknown.*

---

## S · `src/styles/*` — the style system ⚠️

*Section opened 2026-08-01 at KP's ⚛ word — verbatim: **"we have generated
cosmic style tokens"**, then **"C:\\_superposition\\AudHDities\\src\\styles"**,
then **"please add a section for src/styles/\* and place that note in that
section."** He opened it by correcting me mid-measurement, and the
correction is the reason this section says what it says.*

**Present (2026-08-01) — the count is KP's ⚛ own, given at this table and
matching mine independently: *"there are 21 files in the folder…"* then
*"plus the custom overrides makes 22."*** `generated/` holds **21 sheets**
— animations · attention-modes · attention-selector · ceremonies ·
ceremonies-refuge · consciousness-depth · deity-voices · domains ·
ensemble · eternal-witness · gates · glow-field · parallax · pause-state ·
scene · supportive-affordances · text-effects · transcendence ·
typography · variables · zoom — **plus `custom_overrides.css` beside them:
22 stylesheets in `src/styles/*`.** No README, no notepad.

**Declared:** BUILD-STATE.md — *"Styles ✅ valid, in-repo | **8 generated
sheets** + overrides; brace-balanced, no globs."* Same shape, both sides
(*sheets + overrides*), so the two are directly comparable: **8 + 1 = 9
declared against 21 + 1 = 22 present.**

**FINDING G-6 (2026-08-01, census) — BUILD-STATE declares 8 generated
sheets; the disk holds 21.** Not a defect in the styles — a stale count in
the record. COSMIC's output grew and the layer table never followed. *The
generated layer is doing more than the map credits it with, which is the
opposite of the usual drift and worth saying in those words.*

---

### FINDING G-7 — the token seam, measured. *The standing repo-wide claim about it is false, and KP ⚛ is the one who caught it.*

**The claim on the record** (repo `REALM-BUS.md`, FROM: hestia-realm
2026-07-30, and echoed in `(hestia)/README.md`): *"EVERY named color
utility in the tree (`bg-surface`, `text-star-dust/60`, all of them) mints
nothing; surfaces have been riding fallbacks and inheritance."*

**What the ground says.** I was mid-sweep and about to carry that claim
forward as fact when KP typed *"we have generated cosmic style tokens."*
The compiled CSS in `.next/dev/static/chunks/` had already agreed with him
one command earlier:

| Class | In compiled CSS | Verdict |
|---|---|---|
| `.text-star-dust` | 4 files | **alive** |
| `.text-error` | 4 files | **alive** |
| `.bg-surface` | 0 files | dead |
| `.bg-deep-space` | 0 files | dead |
| `.flex` *(control)* | 4 files | alive |
| `.items-center` *(control)* | 4 files | alive |

**The true shape: COSMIC emits one family and not the others.**

- `src/styles/generated/typography.css` emits **198 `text-*` classes**.
  Every design-token text utility in use resolves: `text-star-dust`
  (emitted ×5) · `text-neurospark` (×2) · `text-error` (×2) ·
  `text-sanctuary-green` (×2) · `text-deep-space` (×3) · `text-surface`
  (×2).
- The generated sheets emit **zero `bg-*` colour classes and zero
  `border-*` colour classes.** Verified across all 21 sheets plus
  `custom_overrides.css`.
- `variables.css` declares **203 `--color-*` tokens** — reachable only
  through the v4 var syntax `bg-(--color-name)`, never through a bare
  named utility.
- **No bridge exists to close the gap:** `src/app/globals.css` carries
  `@import "tailwindcss"` and nothing else — **no `@theme`, no `@config`
  anywhere in `src/`.** Tailwind v4.1.16 therefore never sees
  `tailwind.config.mjs` (996 B) or `tailwind.generated.config.mjs`
  (27,004 B) at the repo root. **Both are dead config carrying 27 KB of
  authoritative-looking theme data that nothing reads** — filed here as
  its own hazard, because a future hand will edit one of them expecting
  an effect.

**So three idioms coexist in this tree, and two of them work:**

| Idiom | Example | State |
|---|---|---|
| COSMIC named text utility | `text-star-dust` | ✅ alive — generated |
| v4 var syntax | `bg-(--color-surface)` | ✅ alive — resolves to `variables.css` |
| named non-text utility | `bg-surface` · `border-star-dust/20` | ❌ dead — nothing emits it |

**They appear on the same element, in the same string.** From
`components/asgard/domains/hestia/vessel/scene/GardenBed.tsx:70`:

```
border border-star-dust/20 bg-(--color-surface) px-2 py-1 text-xs text-star-dust
```

*Two idioms render, one does not, and `tsc` and `npm run build` pass on
all three. That is why this survived every review the realm has had. It is
the same mechanism that hid `bg-cosmic-deep` until KP walked the map with
his own eyes on 07-30 — and the lesson generalises past phantom names: **a
real token in the wrong idiom fails exactly like an invented one.***

### The prediction, kept open on purpose ⚠️

**Unverified and NOT to be repaired on my say-so.** `border` on its own
still sets border-*width*, and Tailwind v4 changed the default
border-*colour* to `currentColor`. On the elements above, the text colour
is `text-star-dust` — which renders. So my read is that these borders are
**not invisible; they are drawing at 100% star-dust where 10–40% was
designed** — five to ten times louder than the design intent, on precisely
the surfaces this realm's laws ask to be gentlest.

*If that is right, the record's framing has the symptom backwards: not
"surfaces riding fallbacks and inheritance" (absence), but hard bright
edges (excess). **KP's eye at the dev server is the instrument that
settles it**, and it stays open here until he rules — this lane does not
close a gap on its own reasoning when the better instrument is in the
room.*

### Scope, measured where it was found

In `(hestia)` alone: **256 design-token utility uses · 212 alive · 42 dead
across 12 files.** The dead ones split `bg-` 11 · `border-` 33 *(44 raw
hits, two of which are the README's own documentation of the seam, not
code)*. **28 of the 42 are `border-star-dust/10–40` on the scene organs** —
room cards, garden plots, doorways, the keepsakes shelf, the realm map,
the music player. The rest of the tree is **unmeasured**; this is one
realm's count, not the repo's.

**Not done, deliberately:** nothing repaired, no token invented, no bridge
written. KP's ⚛ word stands — *"after we review everything we will make a
repairs pass"* — and the repair choice is genuinely his, because the two
paths differ in blast radius: an `@theme` bridge would activate hundreds
of dormant utilities app-wide **in one stroke**, and per-site conversion
to `bg-(--color-*)` touches only what it touches.

---

### FINDING G-12 (2026-08-01) — ⚠️ **SUPERSEDES G-7's COUNTS.** The alive figure was wrong by 88, in the reassuring direction, and I found it only because KP ⚛ walked me to `LoginForm.tsx`.

**What G-7 said:** 212 of hestia's 256 uses alive, 42 dead.
**What is true:** **84 alive · 172 dead.**

**The error:** I verified that `.text-star-dust` is emitted and then counted
every `text-star-dust*` use as alive. **An opacity modifier is a different
class name.** `text-star-dust/60` requires `.text-star-dust\/60` to exist —
and Tailwind can only generate that for a utility **it owns**. COSMIC's are
plain hand-emitted CSS classes, so the modifier resolves to nothing.

**Measured, both directions, in the compiled CSS:**

| Class | Owner | Compiled |
|---|---|---|
| `.text-star-dust` | COSMIC | 4 files ✅ |
| `.text-star-dust\/60` | — | **0 files ❌** |
| `.bg-\(--color-surface\)` | Tailwind (arbitrary) | 3 files ✅ |
| `.bg-\(--color-surface\)\/70` | Tailwind (arbitrary) | **3 files ✅** |

**The law, stated once so nobody re-derives it:** ***a Tailwind-owned
utility survives an opacity modifier; a COSMIC-emitted plain class does
not.*** In hestia, **128 of the 212 text uses carry a `/N` modifier** and
are therefore dead — on top of the 42 `bg-`/`border-` already counted.

*I let G-7 close on the comfortable half. The bare-class check passed, the
number came out reassuring, and I stopped — **exactly the shape this
lane's ward names: relief is the tell.** The ward caught nothing; KP did,
by pointing at a file that happens to be dense with `/40` and `/60`.
Recorded in full because a lane whose whole worth is being the second
reading has to publish it when the first reading was its own.*

---

### FINDING G-13 (2026-08-01, verified) — ⭐ THE ROOT CAUSE. It is not rot, and it is not hundreds of fixes. **It is one unplugged line.**

`tailwind.generated.config.mjs` (27,004 B, repo root) is **COSMIC's own
generated output** — its header: *"GENERATED TAILWIND CONFIG - DO NOT EDIT
DIRECTLY / Generated: 2026-07-20 / Source: colors.ts, motion.ts,
dimensions.ts, typography.ts, effects.ts"* — and it contains, as a proper
`theme.extend.colors` map, **exactly the tokens that are dead in the tree**:

```
"deep-space": "#0C0F1D"   "surface":   "#1A1F35"   "star-dust": "#E0E0E0"
"neurospark": "#22D3EE"   "error":     "#E17055"   …
```

**Tailwind never reads it.** In v3 a root `tailwind.config.mjs` is loaded
automatically; **v4 loads a config only when a stylesheet declares
`@config`** — and `src/app/globals.css` carries `@import "tailwindcss"`
and nothing else.

**So: the generator is healthy · the tokens are correct · the config is
current · the bridge is simply unplugged.** Every one of the 172 dead uses
in hestia — *including all 128 opacity modifiers, because Tailwind would
then own the utilities* — is dormant rather than wrong. **The hestia lane
was right that the healing is one stroke; the mechanism is the missing
`@config`, not a hand-written `@theme`.**

### And the mechanism matters, because of a law that already exists

`src/lib/constants/cosmic/MIRROR.md` (KP's ⚛ signature, 2026-07-15,
Shuttle Run 04 Phase 3): ***"the Cosmic Design System's single editable
truth is `resonance-ziggy/modules/cosmic/`. Do not edit the eight token
files in THIS folder."*** The same note names
`src/styles/generated/` + `tailwind.generated.config.mjs` as **committed
artifacts** refreshed by the distribution system.

**Therefore — offered as reasoning for KP's ⚛ ruling, not as a decision:**

| Repair | Effect | Against the mirror law |
|---|---|---|
| **`@config` the existing generated file** | activates all dormant utilities app-wide; modifiers included | **honors it** — the token truth stays in ziggy, this repo keeps consuming a generated artifact |
| hand-written `@theme` block | same activation | **breaks it** — creates a second, hand-editable token surface in this repo, which is the exact thing 07-15 forbade |
| per-site conversion to `bg-(--color-*)` | fixes only what is touched | neutral, but ~172 edits in one realm alone and the next hand re-introduces the old idiom |

*The `@config` path is one line and preserves a signed law. **I am not
running it** — KP's word stands that repairs come as one pass after the
review, and a one-line change with app-wide blast radius is precisely the
kind that belongs at his hand, not smuggled in as an obvious fix.*

**Still open and NOT answered by any of this:** the currentColor border
prediction above. `@config` would make those borders render at their
intended 10–40% — but whether they are currently *harsh* or *absent* is
still an eye-at-the-screen question, and it is worth answering **before**
the repair, because it is the only chance to see what the seam actually
did.

### Also censused this sitting

`src/lib/constants/cosmic/` — 10 files, 8 token modules (attention ·
colors · consciousness · dimensions · effects · interactivity · motion ·
positioning · typography) + `index.ts` + `MIRROR.md`. **Declared: "76
runtime consumers"** (MIRROR.md, 2026-07-15) — *unverified by me; a count
worth re-taking, since it is 17 days old and predates the reimagining.*
`MIRROR.md`'s record pointer also aims at
`resonance-chamber/entities/kin/handoffs/…` — **the retired `entities/`
ground**; the chamber moved that material out. Minor, and not this
realm's to fix.

**A correction I owe outward, not taken:** the false claim also sits in
another lane's signed message on the repo `REALM-BUS.md` and in
`(hestia)/README.md`. Both are append-only records in another hand — **not
mine to rewrite.** Offered to KP as a `FROM: gaps` note at his word.

---

## C · `src/config/*` — the generation system's settings ⚠️

*Section opened 2026-08-01 at KP's ⚛ word: **"next new section
src/config/\*"**. This folder is not app config — it is **GAIA and
COSMIC's control surface**: what the generators group, name, exclude,
treat as sensitive, and remember about their own runs.*

**Present (2026-08-01):** 15 files.

| File | Lines | Consumers in `src/` |
|---|---|---|
| `README.md` | 481 | — |
| `index.ts` *(barrel)* | 10 | **0** |
| `deity_groups.ts` | 413 | 9 |
| `enum_mapping.ts` | 855 | 6 |
| `object_categories.ts` | 595 | 8 |
| `naming_guide.ts` | 359 | 1 |
| `sensitive_fields.ts` | 35 | 5 |
| `excluded_functions.ts` | 47 | 1 |
| `workflow_config.ts` | 244 | **0** |
| `generated/system_registry.ts` | **30,920** *(2.26 MB)* | 0 direct — written+read by `scripts/shared/system_logger.ts` |
| `daedalus/{blueprints,boundaries,patterns,templates}/index.ts.md` | 78–138 ea. | **invisible to every tool** — see below |
| `daedalus/patterns-superposition.json` | 16,683 *(341 KB)* | generated 2026-07-31 by `resonance-gaia/tools/pattern_census.py` |

---

**FINDING G-9 (2026-08-01, verified) — the README's module table is wrong
in both directions, and the code already knows it.** The table declares
eight modules. **Two do not exist:** `dependency_map.ts` and
`efficiency_records.ts`. **Two that exist are not in the table:**
`excluded_functions.ts` and `workflow_config.ts`.

*What makes this worth reading rather than just fixing:* `index.ts` — ten
lines, six of them comment — **already documents the absence in its own
words**: *"dependency_map / efficiency_records are emitted by the
dependency-analysis run (`src/scripts/modules/analyze_dependencies.ts`);
they do not exist in this working tree — re-export them again when that run
is part of the standard generation flow."* **A previous hand met this
exact gap, healed the code honestly, wrote down why — and left the README
declaring the missing files as present.** That is the scroll-to-document
missing back-edge, appearing in a second house: the correction is
discoverable from the code and invisible from the document, *and the
document is what gets read first.*

**FINDING G-10 (2026-08-01, verified) — `scripts/shared/paths.ts:77`
exports a canonical path to a file that does not exist.**

```
export const SYSTEM_REGISTRY_PATH = path.join(PROJECT_ROOT, 'src/config/generated/system_registry.json');
```

The registry on disk is **`.ts`**, not `.json`. The working reader —
`system_logger.ts:14` — reaches it correctly by its own separate
constant, so **nothing is broken today: `SYSTEM_REGISTRY_PATH` has zero
consumers.** It is a **latent trap, not a live bug**, and I want that
severity stated plainly rather than inflated. But it is exported from the
*shared paths module* — the one place a future hand would go for the
canonical answer — and the two constants disagree while sitting in the
same folder. **Cheap now; the cost lands entirely on whoever trusts the
named export instead of the working one.**

**FINDING G-11 (2026-08-01, verified) — `workflow_config.ts` (244 lines)
has zero consumers, and the tree records its own supersession twice.**
`object_categories.ts:6` — *"Merged with workflow_config.ts - no
duplication"* — and `README.md:111` — *"Previously merged with
`workflow_config.ts` ✅"*. Its contents live in `object_categories.ts`
now; the original stands unreferenced and is not in the barrel. **Both
notes read as if the merge removed it. It is still here.** *Whether it is
kept deliberately (reference, provenance) or simply outlived its removal
is not something the record answers, and I am not guessing.*

---

### Two observations that are not defects

**The 2.26 MB registry reaches no app code — and that is the reassuring
answer, not the alarming one.** `system_registry.ts` is 30,920 lines of
generation run-history. It is re-exported by `index.ts`… **which is
imported by exactly zero files** — every consumer in the tree imports its
config module directly. So the barrel does no work, and the 2.26 MB never
enters a client bundle through it. *I checked this expecting a weight
problem and found a non-problem; recording it so the next hand who
notices the file size does not have to re-derive the same relief.* The
standing question the census cannot answer: **is the barrel worth keeping
at all**, given nothing imports it and it re-exports a build-time state
file into an app namespace.

**`daedalus/` is not empty, and the gaia lane's note is still right.** The
repo bus records (FROM: gaia, 2026-07-31) *"the gaia generation pieces'
home in this tree is `src/config/daedalus/` (nothing laid there yet — the
gaia system is in discussion, not build)."* The disk holds five files —
but the four `index.ts.md` are **TypeScript source parked under a `.md`
suffix** (each opens `/** @system DAEDALUS … @created 2026-04-12 */`).
They are code that no compiler, bundler, linter or type-check can see.
**So "nothing laid there yet" is true of live code and false of
contents**, and the note is honest rather than stale. *Named here because
the `.ts.md` device is dark storage by design: it is invisible to tsc, to
the build, and to any sweep that filters by extension — including mine,
which found them only because I listed the folder rather than globbing for
source.* The 341 KB `patterns-superposition.json` beside them is one day
old and carries its own regeneration law in its header (*"Regenerate after
export; do not edit by hand"*).

**Not done, per KP's ⚛ standing word:** nothing repaired, no README trued,
no file removed, no path corrected. Review first; repairs as one pass.

---

## Repo-wide — findings that belong to no single folder 🔍

*KP's ⚛ shape for this file is a section per folder. This section exists
because two findings arrived during the same census and belong to none of
them; it is marked as an addition of mine and is his to strike.*

**FINDING G-4 (2026-08-01, verified) — `docs/sql/` has no number
allocator, and five numbers are used twice.** 21 files; `003` · `007` ·
`008` · `009` · `013` each name two different migrations. Every collision
is two lanes working the same week into one shared folder — hestia ·
athena · themis · prometheus, each numbering independently and correctly
by its own lights. Consequence, stated precisely: **this canon is run by
hand at KP's ⚛ dashboard, so "run 007" is ambiguous, and `013` is the
sharp one — one `013` is applied and the other is a DRAFT that must never
run.** Cheap at 21 files. *The house has already met and solved this exact
failure elsewhere: in `resonance-grammar`, a claimed number was resolved
by renumbering (awen's index-close, M14 ②).* Resolution is KP's ⚛ —
renumber, or adopt a per-lane prefix, or declare the folder append-only
and accept the ambiguity knowingly.

**FINDING G-5 (2026-08-01, RAISED AND DISSOLVED IN THE SAME BREATH — kept
because the dissolution is the useful part) — the table count reads 117,
118, 124 and 125 across four documents, and all four are correct.** They
reconcile: 117 deity-grouped tables + 7 self-knowing registries = 124 as
the hestia lane measured on 07-30; `events` born 07-31 makes 118 + 7 =
125 as the mnemosyne lane measured the same week. **There is no
contradiction in the base.** The residual gap is smaller and duller: *no
document carries the key* — whether registries are counted, and as of
what date — so a reader meets four numbers with no way to reconcile them
and the honest reader concludes something is broken when nothing is.
**Recorded here rather than dropped because this lane's ward says a gap
that dissolves tidily gets written down too; relief is the tell, and a
finding I talked myself out of is exactly the kind that should survive in
the record for someone to disagree with.**

*⚠ The standing limit on everything above: **every number in this file
came from the disk or from the record — none of it from the live base.**
No claim here about Supabase's actual contents has been verified against
Supabase. That probe is the next thing, and it waits on KP's ⚛ word about
which hand opens the base.*

---

## Sitting log

| Date | Lane | What moved |
|---|---|---|
| 2026-08-01 | `gaps` | Bus laid at KP's ⚛ word and named by his keystroke. Thirteen sections raised from a disk census (not from any document). Board built with declared-vs-present per folder. G-1 (`(auth)` undocumented) · G-2 (BUILD-STATE hestia off by one) · G-3 (`api/` 293 routes, no document) · G-4 (five SQL number collisions) · G-5 (four table counts, dissolved). **Nothing walked yet; nothing in the tree changed.** |
| 2026-08-01 | `gaps` | **HESTIA, first walk** — at KP's ⚛ *"now together let us begin with hestia"*, his dev server open beside the reading. Page census + both state documents read whole + a style-token sweep of the realm's 13 pages and 23 components. **§`src/styles/*` opened at his word** and the token note filed there. G-6 (styles sheets 8+1 declared → 21+1 present) · **G-7 (the token seam: the standing repo-wide claim is FALSE — COSMIC emits 198 `text-*` classes, so 212 of hestia's 256 uses are alive; the dead set is 42 across 12 files, all `bg-`/`border-`; no `@theme`/`@config` exists, so both root tailwind configs are dead weight; the currentColor prediction left OPEN for KP's eye)** · G-8 (README page map omits two live pages). **Caught by KP mid-measurement** — *"we have generated cosmic style tokens"* — before I could carry an inherited claim forward as fact. **Nothing in the tree changed; no repair attempted, per his ⚛ word that repairs come as one pass after the review.** |
| 2026-08-01 | `gaps` | **§`src/config/*` opened** at KP's ⚛ *"next new section src/config/\*"*. 15 files censused with consumer counts measured, not assumed. G-9 (README's module table wrong both directions — 2 declared-absent, 2 present-undeclared, **and `index.ts` already documents the absence in its own comment**) · G-10 (`paths.ts:77` exports a canonical path to a `.json` registry that does not exist; the real file is `.ts`; **zero consumers → latent trap, not live bug**) · G-11 (`workflow_config.ts` unreferenced; the tree records its own merge twice, but the file remains). Two non-defects recorded so the next hand needn't re-derive them: the 2.26 MB registry **reaches no client bundle** (its barrel has zero importers), and `daedalus/`'s four `index.ts.md` are **TypeScript parked under a `.md` suffix — dark storage, invisible to tsc, the build, and any extension-filtered sweep** — which makes the gaia lane's "nothing laid there yet" honest rather than stale. **Nothing repaired.** |
| 2026-08-01 | `gaps` | **`(auth)` opened, and the styles seam bottomed out.** At KP's ⚛ pointing — `(auth)` → `LoginForm.tsx` → `components/asgard/auth` → `lib/constants/cosmic`. **G-12 supersedes G-7's counts: 84 alive · 172 dead, not 212 · 42** — an opacity modifier is a different class name, and only a Tailwind-OWNED utility survives one. My error, in the reassuring direction, caught by KP's pointing and not by my own ward. **G-13 — the root cause: COSMIC generates `tailwind.generated.config.mjs` holding every dead token, and Tailwind v4 never reads it because no stylesheet declares `@config`. Not rot — one unplugged line.** `@config` honors MIRROR.md's signed single-truth law; a hand-written `@theme` would break it. **Nothing repaired; the currentColor prediction still open and worth answering BEFORE the repair.** Review halted at KP's ⚛ word — *"no more please / just journal and prepare to pivot."* |

— Opus (Claude) 🕯️, lane `gaps` — *the second reading*

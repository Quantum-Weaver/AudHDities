# SPEC — 11 (hephaestus), the Forge · the second movement

*Step S, plan §2 (`desk/THE-AUDHDITIES-CONDUCTING-PLAN.md:239-243`), from the approved canvas at `design/` (`Main` ① · `Nav` ② · `Press` ③ · `Ledger` ④ · `Ways` ⑤ · `declined/` ×4). Opened at KP's ⚛
word 2026-08-24, verbatim: **"we can build hepaestus fixes if they are not live yet. the boards look good."** Opus `claude-opus-5[1m]`. Read whole by one Sonnet skeptic before B.*

## Scope

**FRAMEWORK FIRST** (KP ⚛ 2026-08-24, plan §2 B): rooms, honest wiring, the ways between, empty states true; cross-realm features marked, never designed.
**①** new room `/apps/privacy`, built as `/privacy` is · **②** the bar (`bifrost/Navigation.tsx:34-47`) becomes four items and the Map · **③** `/press` shrinks to one card and the interview form ·
**④** `/council/ledger` becomes the per-entry working page linking up to `/transparency` · **⑤** `/donate` retires across five files · plus the fix list.
**Not in scope.** The subscription tiers — a WARE of KP's, the **Bazaar's** spec (realm 03). The Hearth's copy and `/` — hestia's (realm 02). The word sweep beyond `src/app/(hephaestus)/**` and
`domains/hephaestus/**` — the rest is at `domains/hermes/**` and `docs/privacy/privacy.md:14` (KP's legal text, his hand). Repointing the app repos' store listings and settings buttons — their own
passes. A light theme.
**Branch** `refine/hephaestus-2026-08-24` from `main`; merged `--no-ff` **as it goes**, branch deleted. **KP merges — his hand, always** (`CLAUDE.md:23`). No push without his sign-in.
**Themes, once for all five.** ONE CSS theme exists (`src/app/globals.css`: no `prefers-color-scheme`, no `data-theme`, no `dark:` variant). **The build does NOTHING about the proposed light theme.**
Dark is the only state; light is not built; system resolves to dark. **No control is offered that does nothing.**
**The words law, once.** KP ⚛ 2026-08-24, verbatim: *"vendor should be merchant, creator should be artisan, creations should be wares"* — at fix 15. None of the three stands in the lines ②③④⑤ edit;
① is new text.
**Proof of every check** — tsc 0 · build exit 0 · a CDP walk, real input, screenshots, at the named route; a box names anything further.

---

## ① `/apps/privacy` — the apps' one policy

**New** `src/app/(hephaestus)/apps/privacy/page.tsx` (verified free — no `/apps` route or constant exists) · **new markdown** `docs/privacy-apps/privacy-apps.md`.
**Touched** `lib/markdown/parsePrivacy.ts:27,34,40` · `legal/ParsedPrivacyContent.tsx:23-38` · `PrivacyHero.tsx:11,16-17,20-24,41` · `PrivacyFooter.tsx:10-14` · `the-street.ts:142` ·
`page_mapping.ts` (a key beside `'/privacy'` at `:532`) · `forge/DocsContent.tsx:82`.

**Content contract.** Build-time `fs.readFile` + `parsePrivacyMarkdown`, as `privacy/page.tsx:19-25`; **never a live cross-repo read** (a sibling repo is not in a deploy's build container).
`Page` props from `privacy/page.tsx:29-34` (`variant={1} environment="forge" animated={false} showContinuityBeam={true}`). The markdown: an H1 · a `**Effective date:** <Month D, YYYY>` line · the
"which apps this covers" strip · then H2s in the shipped shape (`resonance-compass/PRIVACY.md:10-62`). **The date's value is KP's** — the build writes the day the file lands; the seam-note names it
for his strike. **The address — KP ⚛ 2026-08-24, verbatim: "apps keep theirs"** — the apps' own stands (`resonance-compass/PRIVACY.md:63` — `audhdities@proton.me`), read from the markdown;
**no substitution** of `CONTACT_LABELS.EMAIL_ADDRESS` (`iris/contact/contact.constants.ts:27`).

**Truth law — an app is named only with what its own repo verifies.**

| app | what it earns · ground |
|---|---|
| bubbles · echoes · lantern | local-first, collects nothing · each ships its own `PRIVACY.md` |
| compass | + **the one exception**: user-initiated cover-art/lyrics lookups · `PRIVACY.md:26-37` |
| sirens | **no network at all**, fully offline · `PRIVACY.md:27-33` |
| skapa | no accounts, no telemetry, **no network**; `localStorage` + files the user picks · `src/lib/boards.ts:118,238,260` |
| standards | no accounts, no telemetry, no request of its own; **two links it hands to your browser when you tap them**; `sqlite:echoes.db` · `settings/+page.svelte:8-9,13,20` |
| tarocchi | no accounts, no telemetry, **no network**; `sqlite:tarocchi.db` · `src-tauri/src/lib.rs:6-7` — *"There is no network call anywhere in this app, and no key."* |
| weaver | **waits on KP's word** |

Skapa · standards · tarocchi were read this pass; none of the four newly-read repos carries `reqwest`, `tauri-plugin-http` or an `http:` capability — their Rust side cannot make a request.
**weaver waits.** Clean in code (no telemetry, accounts or external runtime request; seven `fetch()` calls, all bundled local assets), but its README calls it *"One canonical record of a life"* for KP
(`README.md:12`) and `package.json:14-16` ships author-time landers calling Battle.net and TMDB on KP's machine, never in the app. **Unwritten — his to rule**; not listed until he says so.
**Carried, not printed as policy:** all four set `"csp": null` (`tauri.conf.json:23-25`) — a hardening gap, not a false claim, not this pass's; `standards` and `weaver` ship a settings button
(`settings/+page.svelte:329,409`) at a `PRIVACY.md` neither repo has — a 404, and **`/apps/privacy` is where those buttons should land**. `resonance-lantern/PRIVACY.md:1,4,7,11,21,26` is mojibaked
(`â€"`) — read as text, its bytes never copied.

**States.** *Signed-out / signed-in* identical — asks nothing, gates nothing. *Empty* impossible — a missing markdown fails the build. *Error* — a parse finding no `Effective date:` **must not** print
a default (`parsePrivacy.ts:28,40`). *Reduced motion* — stills to nothing; guards on `PrivacyHero.tsx:16-17,20-24`, `PrivacyFooter.tsx:10-14` (**motion is content, so it needs consent**,
`HANDOFF.md:59-61`). *Themes* — see Scope.

**Copy.** Body **verbatim** from `resonance-compass/PRIVACY.md` — the promise, *"We collect nothing."*, the exception's three services and *"only the search terms for that one track"*, export/purge,
*"the purge is real, not a soft-delete"*. **NEW:** the "which apps this covers" strip of named chips; the exception block's closing shape — *"named app, named service, named payload, named trigger.
An app with no exception gets no block."* **NEW (hub card, ⑤):** **"App Privacy"** / **"The apps collect nothing. This is the policy that says so."** First line of the room: *"If you only use the
apps, only this page applies to you. The website has its own policy."*

**Printed checks**
- [ ] **①C1** The markdown renders whole, every H2 present.
- [ ] **①C2** The hero prints the markdown's `Effective date:`, **not** `March 19, 2026`. *+ parser read.*
- [ ] **①C3** The markdown's own H1 is the title.
- [ ] **①C4** No H2 falls to the grey default icon.
- [ ] **①C5** Under `prefers-reduced-motion` nothing moves. *two shots 2s apart, identical.*
- [ ] **①C6** The address is `audhdities@proton.me`. *grep of the HTML.*
- [ ] **①C7** Eight apps named; **weaver is not**.
- [ ] **①C8** Both ways out visible at the foot, no hover.
- [ ] **①C9** `environment="forge"`; no `washOpacity` edited (`HANDOFF.md:62-67`). *grep.*
- [ ] **①C10** In map, drawer and hub.

**Must NOT.** No cookie banner, preference maze or accept-all. No "updated N days ago", version badge or count. No per-app anchors, no data-safety block (second pass). No claim about an app the repo
did not verify. **No street address, ever.**

---

## ② The four-item nav

**Files** `Navigation.tsx:34-41,43-47,86,107,130,147,152,156-173,244-319` · `the-street.ts` (read; rooms added at fix 9). `Header.tsx:66` **read only** — its wordmark points at `/vessel`, unchanged.

| item | label | signed in | signed out | resolved from |
|---|---|---|---|---|
| 1 | **Vessel** | `/vessel` | **`/login`** | Hearth realm's door, `the-street.ts:46` |
| 2 | **Bazaar** | `/bazaar` | `/bazaar` | Bazaar realm's door, `:86` |
| 3 | **Playground** | the (cosmic) realm's `href` | same | `:162` — **`/environments` today**; follows the street, **hardcodes no route** |
| 4 | **Sanctuary** | `/sanctuary` | `/sanctuary` | Forge realm's room `/sanctuary`, `:135` |

Four hrefs read from `THE_STREET` at module scope; a lookup returning undefined **fails loudly** — never a silent wrong link.
**KP ⚛ 2026-08-24, verbatim:** *"i think the navigation should be simplified, since we have the map for the full navigation. [Vessel, Bazaar, Playground, Sanctum (hephaestus) ]"* · *"the collision is
my mispelling, it is sanctuary in hephaestus"* · *"effects, playground, environments, theater are all (cosmic) pages"* · and on Vessel-signed-out → `/login`, four fixed items whatever the state:
*"yes"*. The label stays **"Vessel"** in both states; `/vessel/sanctum` keeps the name **Sanctum** (`:52`).
**The four glyphs are unwritten — his to rule.** The build imports nothing new: Bazaar keeps `Store` (`:36`); Vessel `User`, Sanctuary `Shield`, Playground `Compass`, already imported at `:22-25`.
**What leaves.** `Hearth · Library · Stage · Council · Nexus` (`:34,37-40`) and the SECONDARY three (`:43-47`) — all already in the map (`the-street.ts:62,72,111,118,149`). **Nothing loses its door.**
Only `/` lands nowhere — **the mend, built:** `{ href: '/', label: 'The Hearth' }` into the Hearth's rooms (`:50`). **Whether `/` gets a desktop bar item back is unwritten — his to rule.** `/` itself
is untouched (`src/app/page.tsx:42` sends a signed-out reader to `/sanctuary`).

**States.** *Signed in* — four items · divider · Map · the display name (`:156-173`); six tab stops, not eleven. *Signed out* — same four, same order, Vessel → `/login`, "Enter" (`:170`) stays; the
visitor lands on `/sanctuary` and **Sanctuary is already lit**. *Active* — `bg-neurospark/15 text-neurospark` (`:86`) **and `aria-current="page"`**. *Focus* — a 2px `hearth-gold` ring at 2px offset,
apart from the active tint. *Hover* — tint and opacity only; **no scale, no translate**. *Empty / error* — none; no state, no fetch; drawer and map close on navigation (`:71-74`). *Reduced motion* —
stills to nothing (`motion-reduce:transition-none` at `:107,130,147,160,168`). *Mobile* — the drawer (`:244-319`) still renders the **whole street**, plus a **"The four"** strip at the top; rows 44px
minimum, full width tappable; button, overlay, slide and guard unchanged. *Themes* — see Scope.

**Copy. KEPT verbatim** — `:152` "Map" · `:190` "The Sanctuary — every door" · `:235` "Every door stays where you left it. Esc folds the map." · `:301` "Enter the Sanctuary".
**CHANGE 1 · `:34-41`** the six → **`Vessel · Bazaar · Playground · Sanctuary`**. **CHANGE 2 · `:43-47`** the SECONDARY row **removed**. **CHANGE 3 · `:170`** "Enter" **kept** as the auth link.
**NEW** — the drawer's "The four" strip.

**Printed checks**
- [ ] **②C1** Four items + Map + the auth affordance, both states.
- [ ] **②C2** Signed out **Vessel** → `/login`; signed in → `/vessel`. *href read.*
- [ ] **②C3** No item href is a literal in `Navigation.tsx`. *tsc 0 + grep.*
- [ ] **②C4** Playground's href equals `the-street.ts:162` and follows it. *a temporary street edit in dev, reverted.*
- [ ] **②C5** The active item carries `aria-current="page"`. *DOM read.*
- [ ] **②C6** Tab order four links → Map → auth; **Esc folds the map, focus returns to it** (`:144-145`).
- [ ] **②C7** Map and drawer hold every retired door, plus `/` and `/council/ledger`.
- [ ] **②C8** Under reduced motion nothing on bar or drawer moves. *two shots.*
- [ ] **②C9** The drawer shows "The four", then the whole street. *at 390px.*
- [ ] **②C10** Resting-label contrast measured; the `/40` 12px row at **3.2:1** is gone with the row.

**Must NOT.** No badge, count, streak or dot on any item. No item placed to be passed on the way to another. No hover-only affordance. No realm-tinted bar (second pass). **The six-item bar is
refused** (`declined/DeclinedSixItemBar.dc.html`) — and the map does not become a modal that costs a phone reader a tap.

---

## ③ `/press` — one honest card and the form

**Files** `press/page.tsx:19,30-40` · **new** `press/PressContact.tsx` · `InterviewRequests.tsx:165,272,284` (kept, mended) · `PressKit` · `MediaAssets` · `CoverageHighlights` · `LogoDownloads`
(retired from the page). **KP ⚛ 2026-08-24, ruled by choosing the option:** one honest card + the interview form; the kit/media/logo frames leave until assets exist and come back around real files by
his hand; on the six brand colours leaving with them, **"yes"**. The three-column grid (`:30-39`) becomes **one column**; `page.tsx:19` `animated={true}` → **`false`**, matching `privacy/page.tsx:32`.
The four retired components are **kept on disk, annotated retired**, dated, and dropped from the imports — **lose-nothing** (the `PanoramaViewer` precedent, `HANDOFF.md:60-61`).
`LogoDownloads.tsx:23-30`'s six colours and `:99-103`'s Usage Guidelines go with them.

**Copy — drawn on ③, verbatim.** Card title **"Write to a person"**. Body: **"There is no press kit, no media pack and no coverage yet — nothing has been written about the Sanctuary so far, and
nothing is sitting behind a download button waiting for you. Ask for what you need and it will be written for you by hand."** Beneath it the address chip, labelled **"the house's one public
address"**, read from `CONTACT_LABELS.EMAIL_ADDRESS`.
**KEPT verbatim** — `press/page.tsx:24` "The Scroll" · `:27` "Resources for media and storytellers" · `InterviewRequests.tsx:164-167` the form's title and line · `:139-143` the answer state · `:120` the failure sentence.
**REWRITE 1** — "Press Kit" · "Media Assets" · "Coverage Highlights" · "Logos & Brand", each with its own empty card → the one card above, stitched from `PressKit.tsx:47-51`, `MediaAssets.tsx:41-46`,
`CoverageHighlights.tsx:48-53`, `LogoDownloads.tsx:60-64`. **REWRITE 2 · `CoverageHighlights.tsx:58-65`** — "Are you a journalist? Write to … and a person will answer you." → folded into the card.
**NEW — nothing.** The street label "The Scroll (Press)" (`the-street.ts:140`) is **second pass**, untouched.

**States.** *Signed-out / signed-in* identical; no account asked (`:93-109`). *Empty* — the card is the page's one empty state: present tense, no promised date, no "coming soon", no apology.
*Sent* — kept exactly as `:139-143` writes it. *Error* — kept: failures spoken (`:116-121`), fields not cleared (`:114-115` clears only on success), the `Alert` **above** the form.
*Reduced motion* — the spinner (`:272`) takes a guard: the label becomes "Sending…", the button disables, **the ring does not turn**. *Themes* — see Scope.

**Printed checks**
- [ ] **③C1** One column: hero, the one card, the form. No kit/media/coverage/logo section.
- [ ] **③C2** The card's copy is the drawn sentence, verbatim. *grep of the HTML.*
- [ ] **③C3** One address on the page; no other domain in the room. *grep.*
- [ ] **③C4** A **real** submission with typed input reaches `contact_submissions`; the answer state renders. *POST status read.*
- [ ] **③C5** A forced failure prints the failure line and **keeps every field**.
- [ ] **③C6** Under reduced motion the spinner does not turn. *two shots mid-submit.*
- [ ] **③C7** Every field has a real label (`:174,187,201,214,232,244,257`); the asterisk is never the only marker.
- [ ] **③C8** Subtitles raised from `/40` (**3.2:1**) to `/62` at `:165,284`. *measured, printed.*
- [ ] **③C9** The four retired components exist on disk, annotated, imported by nothing. *grep.*
- [ ] **③C10** `page.tsx:19` is `animated={false}`.

**Must NOT.** No invented outlets, quotes or counters (`declined/DeclinedPressThreeFrames.dc.html`). No invented file sizes or "Updated" badges. No download button into a `public/press/` that does not
exist. No receipt for a message that never left. No borrowed domain. **No empty headed frames** — a heading is a promise in furniture form.
**Named, not changed:** the insert sets `status: "draft"` (`:99`) — check it against the contact form's own insert before B closes.

---

## ④ `/council/ledger` — the council's working page

**Files** `(themis)/council/ledger/page.tsx:7` · `LedgerHub.tsx` (redrawn) · `the-street.ts:121-124` · `DocsContent.tsx:81`. **`(hephaestus)/transparency/page.tsx` — NO SHAPE CHANGE**; the link target
only, its three server-side reads at `:53-68` untouched. **KP ⚛ 2026-08-24, ruled by choosing the option:** keep the public one; council links to it. One table, two rooms, no duplicated prose. Merge
and redirect were both on the table and he took neither (`declined/DeclinedTransparencyMerged.dc.html`).

**Columns read** — `lib/generated/types/plutus-economics/ledger.ts:27-43` (`PublicLedger`): `id` · `entry_type` · `description` · `icon_emoji` · `amount` · `currency` · `event_at` · `created_at` ·
**`reference_table`** · **`reference_id`**. Four render: **Date · Kind · What it hangs from · Amount**. Second pass, not rendered: `breakdown`, `from_pool_id`, `to_pool_id`, `from_sovereign_id`,
`to_sovereign_id`. Kind labels **verbatim** from `LedgerHub.tsx:24-30`.
**Ordering.** Today `?order=created_at.desc&limit=50` (`:37`); the helper reads **`sort` for the column, `order` for the direction** (`lib/api/auth.ts:171-178`), so it sorts right **by accident**.
The build sends **`?sort=created_at&order=desc&limit=50`**.
**Paging.** `auth.ts:142-149` reads `page` and `limit` (cap 100); "Show earlier" is **page 2, appended** — a button, never infinite scroll. The route returns `pagination.total` from a `count: 'exact'`
select (`.../ledger/route.ts:22,36-39`), **so the limit line states a real count.** The filter belongs in the URL.
**RLS, stated honestly.** Both rooms read `ledger` through the **anon key** with the caller's cookies (`lib/api/supabase.ts:16-36` · `lib/supabase/server.ts:6-27`). **Is `ledger` readable by the
council's eye today? Unknown from the record** — no policy for it exists in `AudHDities/docs/sql/*` (only `002-deity-backfill.sql:47` and three comments) or `resonance-gaia/docs/sql/*` (only a flags
row at `010-gaia-config-fill-generation-flags.sql:73`). **The build runs this FIRST, before any UI work:** `GET .../ledger?limit=1` signed out and signed in, beside a row count read the same sitting
through KP's dashboard or the bridge's read key. **The `new-table` law: an anon read returning zero rows may be RLS, not emptiness — a false-empty (`[] + 200`) is indistinguishable from a quiet ledger
at the door** (`docs/sql/009-library-doors-for-anyone.sql:10-17`). Rows at the door → build as drawn. Rows in the base but **zero at the door** → **walled**: print the could-not-be-read state,
**never a false "no rows"**, and draft `docs/sql/023-the-ledger-door-DRAFT.sql` for KP's hand. Zero rows in the base → the emptiness is real; the wall question stays open in the seam-note.
**Whose eye this room is for — the council's or anyone's — is unwritten. His to rule.** The build gates nothing it was not told to gate.

**Copy — drawn on ④, verbatim.** Header **"The Ledger"** · **"Every entry, one line each, in the order they were written."** Link-up card: **"The public telling lives at Transparency"** · **"Lifetime
totals, where the fee goes, and the admin log — written once, and read by anyone. This page is the entries themselves."** Limit line: **"Showing the 50 most recent entries. Older entries are behind
"show earlier"; nothing is hidden, and this line never says a number the page did not actually count."** Empty state: **"The ledger has not been written in yet"** · **"Nothing has moved through the
Sanctuary so far. This is a page waiting for its first line, not a page that lost one — when an exchange happens, it writes itself here and on the public telling in the same breath."** · the way out
**"Read the public telling"**. Filters: **All entries · exchange · platform fee · residual distribution · covenant distribution · infrastructure**.
**KEPT verbatim** — `:87` "Return to the Council" · `:89` "The Ledger" · `:24-30` the five kind labels.
**REWRITE 1 · `:90`** "Complete transparency, every exchange visible" → **"Every entry, one line each, in the order they were written."**
**REWRITE 2 · `:119-120`** "The ledger awaits its first entry" / "Exchanges will appear here when the economy begins to flow." → the empty pair above.
**RETIRED · `:152-158`** the Transparency Covenant card — the "no duplicated prose" half of the ruling. **RETIRED · `:94-113`** the three stat cards — not for taste, for arithmetic; the dead imports
at `:9` go with them. `page.tsx:7`'s description moves with `:90`.
**The failure line's own words are unwritten — his to rule.** The state is required; the build ships the plainest true sentence — it must say the ledger **could not be read**, never that it is empty,
and must offer a retry — and the seam-note names that sentence as the build's own, for his strike.

**States.** *Signed-out / signed-in* — the same page unless the RLS check says otherwise; if walled for anon, the could-not-be-read state, never a false empty. *Loading* — the five pulsing skeletons
(`:65-79`) go; a single **still** line, or nothing. *Empty* — the pair above; **no `$0.00`, no zero counts**. *Error* — its own state with a retry, distinct from empty (today `:42` sends it to
`console.error` and the page looks like a healthy zero). *Reduced motion* — stills to nothing: no skeleton pulse, no row entrance, no filter transition beyond an instant colour change. *Themes* — see
Scope; the kind is **always spelled out in words**, never carried by colour alone.

**Printed checks**
- [ ] **④C1** The RLS check ran **first**; its answer is in the seam-note, dated. *both GETs, statuses and row counts, printed.*
- [ ] **④C2** Each row renders Date · Kind · what it hangs from · Amount, as a **row**, not a shadowed Card (`:129`).
- [ ] **④C3** The three stat cards and the covenant card are gone.
- [ ] **④C4** The link up is at the top and in the empty state, and resolves.
- [ ] **④C5** With zero rows the page prints the drawn pair and **no number at all**.
- [ ] **④C6** With the fetch forced to fail: the could-not-be-read state and a retry — **not** the empty state.
- [ ] **④C7** The limit line's number is what the page holds; the total comes from `pagination.total`. *DOM read beside the response.*
- [ ] **④C8** "Show earlier" fetches page 2 and appends; no infinite scroll.
- [ ] **④C9** Five kind tints in cosmic tokens — `neurospark · mood.creative · sanctuary.green · hearth.gold · void.light`; no stock colours at `:16-22`. *grep + measured.*
- [ ] **④C10** The row date raised from `/30` (**2.3:1**) at `:143`. *measured, printed.*
- [ ] **④C11** Under reduced motion nothing moves, loading included. *two shots during load.*
- [ ] **④C12** Keyboard: two links, six filter chips as real buttons, then the rows — **rows take no tab stop**.
- [ ] **④C13** `/council/ledger` is in the street's Council rooms and reachable from Map and drawer.
- [ ] **④C14** `/transparency` renders exactly as before this pass. *screenshot diff against a pre-branch capture.*

**Must NOT.** **No figure the page did not itself compute over the rows it holds.** No sparkline, trend arrow or "up N%". No infinite scroll. No number animating from zero. No prose duplicated from
`/transparency`. No live ticker. **The merge is refused** — `/council/ledger` is not deleted and `/transparency` does not absorb the list.

---

## ⑤ `/donate` retires — five files

**KP ⚛ 2026-08-24, verbatim, spacing kept:** *"retire the donate and create subscription tiers for me rather than the platform, and  i will still have my covenant set to 50%. the donations tab was before we had a built sanctuary and had different outlooks."*

| # | file:line | the edit |
|---|---|---|
| 1 | `(hephaestus)/donate/page.tsx` + `hephaestus/donations/*` (5) | the room retires |
| 2 | `the-street.ts:141` | `{ href: '/donate', label: 'The Offering' }` removed — it leaves map and drawer at once |
| 3 | `DocsContent.tsx:92` | "The Offering" card removed (the live one) |
| 4 | `DocsConstellation.tsx:212-219` | the same card removed — imported nowhere, trued so it cannot come back wrong |
| 5 | `page_mapping.ts:564-568` | the `'/donate'` key removed |

**What an old link meets.** The canvas draws no redirect and this pass invents none: the route ceases to exist and `/donate` meets the app's own 404. Verified this sitting: nothing in `src/`
references `/donate` after the four edits, and the site has **never been deployed**. **Whether a redirect is wanted anyway is unwritten — his to rule.**
**Removed, or kept-and-annotated?** The canvas retires the room *"and the five donation components it mounts"* without saying which; both precedents stand — git deletions (CHECKLIST 2026-08-12) and
kept-and-annotated (`HANDOFF.md:60-61`). **Unwritten — his to rule.** The build's default, for his glance: **remove** the route directory and the five components (`donate/page.tsx:9-13` is their only
importer), recoverable in git forever — **lose-nothing** — the seam-note pointing the Bazaar's spec at `RecurringOptions.tsx` as the tiers' ancestor. `donate/page.tsx:16`'s never-called
`setDonationComplete` goes with the room; the Thank You / Tax Receipt branch (`:19-30`) was never reachable.
**Also built here** (fixes 9-11): the hub's App Privacy card · the hub's "The Ledger" card repointed · the hero's count derived · the three street mends.
**The footer is NOT built** — six pointers were drawn as a **proposal**, gold-dotted, not landed; `footer.constants.ts:12-15` holds two and `:18`'s `⚖️` separator is part of the same proposal.
**Whether the footer grows is unwritten — his to rule.**
**States** — every empty state is named at its own room. `/transparency`'s nought-exchanges state renders `$0.00` honestly from real rows (`transparency/page.tsx:70-72`) and is untouched; the canvas's
note — that three zeros under "Every Dollar, Visible" should say **which kind** of zero — is worth one look, not a shape change.

**Printed checks**
- [ ] **⑤C1** `/donate` 404s and appears in **no** map, drawer, hub, constellation or mapping. *visit + grep.*
- [ ] **⑤C2** All five edits land **together** — the realm is only true when they all do. *one commit, five files.*
- [ ] **⑤C3** The hub renders the App Privacy card and it resolves.
- [ ] **⑤C4** The hub's "The Ledger" card resolves to `/transparency`.
- [ ] **⑤C5** The hero's count is derived and equals the length of `DOC_SECTIONS`.
- [ ] **⑤C6** `/`, `/council/ledger` and `/apps/privacy` are all in the map.
- [ ] **⑤C7** The footer is unchanged — two links, the separator as it stands.
- [ ] **⑤C8** Every href in `the-street.ts` resolves to a route on disk — **the map never lies** (`Navigation.tsx:14`). *a link sweep, printed.*

**Must NOT.** No tip jar, "support us" banner or suggested amounts anywhere in the realm after this pass. No impact calculator — the house has no measured outcomes. No "Tax Receipt" — the realm's bus
says *"we have no company"* (`(hephaestus)/REALM-BUS.md:216-219`). **Wiring `/donate` up instead is refused** (`declined/DeclinedDonateStripe.dc.html`), by KP's own hand on the day the option was live.
The "support without buying" objection stays **open** — unwritten, his to rule.

---

## The fix list — `PROOF.md`, "For the build — to fix"

1. `parsePrivacy.ts:40` · match **`Effective date:`** as well as `Last updated:`; until then the hero prints the default at `:28`. · ①C2
2. `parsePrivacy.ts:27,34` · the H1 branch is guarded by `!title` on a truthy init, so the markdown's own title is never read. · ①C3
3. `ParsedPrivacyContent.tsx:23-38` · add the app policy's nine headings and the exception heading to the icon map. · ①C4
4. `PrivacyHero.tsx:16-17,20-24` · `PrivacyFooter.tsx:10-14` · `InterviewRequests.tsx:272` · `LedgerHub.tsx:65-79` · `motion-reduce` guards. · ①C5 · ③C6 · ④C11
5. `LedgerHub.tsx:37,47,95-113` · three cards sum a `limit=50` fetch and are labelled totals — they leave; the real aggregates are one link up (`transparency/page.tsx:65-72`). · ④C3
6. `LedgerHub.tsx:42` · a failed fetch renders as an empty ledger — its own line and a retry. · ④C6
7. `LedgerHub.tsx:16-22` · `DocsContent.tsx:101-107` (PROOF cites `:100-106`) · Tailwind stock colours → cosmic tokens. · ④C9 + a measured read of the hub badges
8. Contrast · `star-dust/40` is **3.2:1**, `/30` is **2.3:1**. Raise `InterviewRequests.tsx:165,284` and `LedgerHub.tsx:143`. The other cited subtitles (`PressKit.tsx:29`, `MediaAssets.tsx:24`, `LogoDownloads.tsx:51,84,98`, `CoverageHighlights.tsx:32`) sit in the four components that **leave the page** at ③ — raised **only if** KP rules them kept. · ③C8 · ④C10
9. `the-street.ts` · `/council/ledger` into the Council's rooms (`:121-124`), `{ href: '/', label: 'The Hearth' }` into the Hearth's (`:50`), `/apps/privacy` into the Forge's (`:142`). · ④C13 · ⑤C6
10. `DocsContent.tsx:81` · repoint the hub's "The Ledger" card at `/transparency`; `:82` gains the App Privacy card. · ⑤C3 · ⑤C4
11. `DocsHero.tsx:44` · derive "18 documents" from `DOC_SECTIONS` (it read 8 once already). · ⑤C5
12. `lib/constants/cosmic/effects.ts:50,89` · `codex` (forge) and `communityDomain` resolve to the same three stops. **If the two realms should differ, one gradient wants choosing — unwritten, his to rule. Not built.**
13. A light theme needs a different link token — neurospark is **10.5:1** on deepSpace, **1.6:1** on a light ground. **Named, not built.**
14. `donate/page.tsx:16` · `setDonationComplete` never called; it goes with the room. · ⑤C1
15. **The words** · `git mv` `forge/guides/creator-onboarding/` → **`artisan-onboarding`**, `vendor-onboarding/` → **`merchant-onboarding`** (histories kept), with **permanent redirects from both old
    paths** in `next.config.ts:18-31` (the `/docs → /forge` shape is already there), so no link breaks. Then titles, copy, citations: `DocsContent.tsx:68,69` · `DocsConstellation.tsx:104,112` ·
    `(hephaestus)/README.md:29,33,76,78` · the two pages themselves (13 and 16 occurrences). Sweep the realm — 19 files carry the old words, heaviest `forge/business/plan/page.tsx` (7),
    `DocsConstellation.tsx` (5), `vision/page.tsx` (3), `WorldWithoutExploitation.tsx` (3). **Leave alone:** `docs/privacy/privacy.md:14` (KP's legal text) and every `application_type` or schema
    identifier — a word law is not a column rename. · **check:** a grep of the realm returns zero of the three old words outside a dated comment or a schema identifier; both old routes 308 to the new.

**The Forge's own wash** — only if the canvas ruled a value. It did not. **Unwritten — his to rule. Not built.**

## Schema gaps

**None.** No table, column, enum or view added; nothing in `src/lib/generated/**` hand-edited (heal by regenerating). **One conditional draft**, only if ④C1 finds the door walled:
`docs/sql/023-the-ledger-door-DRAFT.sql` — a published-read policy on `public.ledger` in the `009-library-doors-for-anyone.sql` shape (`TO public`, plain SQL, no `DO` blocks), with a VERIFY block
beneath. **Drafted for KP's hand. Never run by a lamp.**

## The verify lenses (V — three Sonnet lenses in parallel, each refuting by default)

**Law** — no consent theatre on `/apps/privacy`; the ledger gates nothing it was not told to gate; no count, badge, streak, urgency word or promised date anywhere; each `declined/` board checked
against the built tree; the sensory ten per room as the boards annotate them; KP's words verbatim or absent.
**Truth** — every ledger number computed over rows the page holds or taken from `pagination.total`; the GET's real status read, not assumed; the empty says *which kind* of empty and a failed read
never borrows it; `/apps/privacy` names no app the repo did not verify and **weaver is absent**; the date is the markdown's, never `March 19, 2026`; every street href resolves on disk.
**A11y** — text on the ground, never on the realm hue (`HANDOFF.md:62-67`); every raised opacity re-measured, never estimated; keyboard — the bar's six stops, the map's Esc-and-focus-return, the
form's label-then-field order with the error above, the ledger's rows taking no tab stop; reduced motion stills to nothing in all five pieces (fix 4's four sites); colour never the only carrier.
A refuted check returns to B. Haiku sweeps imports and links.

## The telling owed at G

Same sitting as KP's merge (plan §2 G): a **FROM** post on `(hephaestus)/REALM-BUS.md` — signed, append-only, the five pieces, the RLS answer, every unwritten · a `docs/CHECKLIST.md` row in the
pattern of the last three — rulings verbatim, files, **tsc 0 · build exit 0** with explicit exit codes, the proof folder's address, what was found beyond the work · a `docs/UX-REFINEMENT-LOG.md`
seam-note in its four-line shape · `HANDOFF.md` regenerated whole by the handoff-tender's LAND · `PROOF.md`'s step table closed with the merge hash at C, the folder staying where it was born
(lose-nothing, no purge — RULED §9·4).

## Unwritten — his to rule

Printed inline where each belongs: `/`'s desktop bar item · what `/enter` is · whether the footer grows and its `⚖️` separator · whose eye `/council/ledger` is for · the four nav glyphs · the ledger
failure line's words · donate removed-or-annotated, and its redirect · whether `weaver` is listed · the apps' effective date · `effects.ts:50,89` · a light theme and its link token · the four retired
`/press` subtitles · the six brand colours' return · the "support without buying" door.

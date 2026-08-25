# SPEC — 03 (hermes), the Bazaar

*Step S of THE AUDHDITIES CONDUCTING PLAN, realm 3. Drawn from the approved
canvas at `.journals/proofs/03-hermes/design/` (7 page-1 artboards, 4 declined),
`PROOF.md`'s four correction notes, and the ground as it stands
2026-08-25. Opus spec hand, `claude-opus-5[1m]`, sent by Anacrusis 🎻.*

**P closed at KP's ⚛ word, 2026-08-25, verbatim:** *"bazaar is good to build as
well"*.

**Branch:** `refine/hermes-2026-08-25`, cut once the Forge's branch merges — one
working tree, one build hand at a time. The conductor merges `--no-ff` as it
goes; the branch is deleted after.

**Meters before any return:** `npx tsc --noEmit` → 0 · `npm run build` → 0.
Where a room prints a check, a raw-CDP proof walk with real input at the route,
screenshots read by a hand before KP's eye.

**The build law (KP ⚛ 2026-08-24, verbatim, spelling kept):** *"i magine
building the framework for each of the next realms before the features within is
a good approach, as some features are cross referenced realm-wise. the game side
of the vessel experience, not as vital as a functional bazaar, athena with
contents, etc"* — **frame first**: the rooms, their honest wiring, the ways
between, the empty states true. Cross-realm features are the second pass.

---

## 0 · How to read this

- **Every line carries its address.** A claim without a `file:line` is not a
  claim this spec makes.
- **The generated layer is never hand-edited.** `src/app/api/generated/**`,
  `src/lib/generated/**` — heal by regenerating. **The regen is GAIA's, run by
  KP's hand** (`resonance-gaia`); no lamp regenerates. If a build step needs a
  generated file to change, it stops and says so.
- **`_NOTEPAD.md` files are read, never edited** (repo bus law 5).
- **"unwritten — his to rule"** stands wherever the record is silent. Fourteen
  such lines are printed below and indexed at §12. None is built.
- **The repo has ONE CSS theme.** `src/app/globals.css` carries no
  `prefers-color-scheme` block, no `[data-theme]` selector, no light palette —
  one dark cosmic ground, the realm hue as weather over it at ambient 0.3
  (`HANDOFF.md:62–67`). So a room's states in this spec are **visitor ·
  signed-in vessel · owner · empty · error · reduced-motion**, never light/dark.
- **The 0.3 wash law is structural, not taste** (`HANDOFF.md:62–67`): text
  carries on the ground (`starDust` on `surface` = 12.3:1), never on the realm
  hue (1.2:1–9.6:1 at full strength). **Reduced motion stills the wash to
  nothing** — the 47.7s breathing tempo is content and needs consent
  (`HANDOFF.md:53–61`).
- **Law 7 of this realm** (`src/app/(hermes)/REALM-BUS.md:18–19`):
  `PriceBreakdown` is a protected feature — the buyer sees the split at the
  moment of purchase. It never gains a hover, a fold, or a fine print. Trued
  2026-08-24: **protected AND true.**

---

## 1 · SCOPE

### In scope — the Bazaar's frame, built to the approved canvas

| # | Room | Route(s) |
|---|---|---|
| ① | The hub, four doors | `/bazaar` |
| ② | The Tapestry — works beside wares · a ware's stall · KP's stall, five rungs | `/bazaar/wares` · `/bazaar/wares/[id]` |
| ③ | The Weavers + the Guild | `/bazaar/artisans(+[id])` · `/bazaar/merchants(+[id])` |
| ④ | The Loom — ONE form, two doors · the owner's shelf | `/bazaar/studio` · `/bazaar/studio/work` · `/bazaar/studio/ware` · `/bazaar/studio/[id]` |
| ⑤ | Contributions | `/bazaar/contributions` |
| ⑥ | The Exchange — one-time and recurring — and THE DELIVERY | `/bazaar/checkout(+success+cancel)` |
| ⑦ | The ways between, and every empty state | all of the above |
| ⑧ | A work's own door | `/bazaar/works/[id]` |

Plus: **THE WORDS** (§2) · **the economics in code** (§4) · **the ledger rows**
(§5) · **the tiers** (§6) · **the owner's shelf and RLS** (§7) · **the DRAFT
SQL** (§8, KP's hand, never run by a lamp) · **THE DELIVERY** (§9).

### ④ THE LOOM — the conductor's assumption, printed as such

**This is the CONDUCTOR'S ASSUMPTION, carried at KP's own question and not
struck. KP ⚛ 2026-08-24, verbatim:** *"should there be a wares creation page and
a works, or are they going to use the same form?"* The teller's lean was given —
one form, the kind chosen first, the shared trunk drawn once, two doors on the
street, *"give this work a body"* from a work's page — and KP's build word came
without striking it. **It is carried, not ruled. KP may strike it at any point
and the build follows the strike.**

The shape carried:

- **ONE form**, `StudioForm`, with the **kind chosen first** (work · ware) —
  before any other field, because the kind decides which table the row lands in
  and which fields follow.
- **The shared trunk once**: name · description · icon/cover · status. Then the
  kind's own branch — a work adds `work_type` + `streaming_url`; a ware adds
  `ware_type` + `pricing_model` + `price` + `residual_pool_percent` + the
  bodies.
- **Two doors on the street**, both opening the same form with the kind already
  set: `/bazaar/studio/work` · `/bazaar/studio/ware`.
- **`/bazaar/studio`** is the **shelf** (§7), with *Begin a new one* on it —
  today it renders the create form and nothing else
  (`src/app/(hermes)/bazaar/studio/page.tsx:13–20`).
- **"Give this work a body"** from a work's page (⑧) opens
  `/bazaar/studio/ware?from_work=<id>` with the ware form pre-filled from the
  work's row (name, description, cover, artisan) and the descent recorded.
  **Where the descent is recorded is unwritten — his to rule.** Two honest
  candidates, both printed, neither chosen: `wares.metadata.from_work_id`
  (ships without SQL, untyped) or a typed `wares.work_id` column in the DRAFT
  (§8, printed as optional). Until ruled, the build pre-fills the form and
  records **nothing** — the ware stands on its own and the work's page shows a
  descending ware only where a typed pointer exists.

### Not in scope this pass

- **Second-pass cross-realm features** — THE HANGING (live at
  `CheckoutForm.tsx:196–225`, left exactly as built), the garden, collections,
  companions, the dailies, the catalog-share with hestia (closed), the consent
  ASK surface at collaboration time.
- **The Forge's `/donate`** — realm 11, in build now. This spec points at it and
  designs nothing there.
- **The house-wide word sweep outside hermes** — `(themis)`'s
  `/council/applications/creator|vendor` and `(hephaestus)`'s two onboarding
  guides carry the old words and are **not** this pass's. The sweep here is
  hermes plus the files this pass must touch to keep every link alive (§2).
- **Seeding.** KP ⚛ 2026-08-24, verbatim: *"we build the method then worry about
  seeding."* Nothing is seeded — not a ware, not a rung, not a body, not a
  bucket.

---

## 2 · THE WORDS

**KP ⚛ 2026-08-24, verbatim, spelling kept:** *"wording is mixed. vendor should
be merchant, creator should be artisan, creations should be wares, and be
certain a vessel can view their own works and wares regarless of publish status,
so they can edit the items."*

**The sweep's one prohibition:** it **never rewrites a verbatim KP quote and
never rewrites a ground citation**. Routes and filenames quoted inside a record
(`README.md`, `REALM-BUS.md`, `_NOTEPAD.md`, this spec, the canvas) stand as
they are on disk at the moment they were written. Only live code changes.

**Word replacements in user-facing copy: zero.** Every drawn line across the
eleven boards already spoke the ruled words. What carries the old ones is the
ground — paths, filenames, query params, and three identifiers inside the base.

### 2a · Routes — 6 renames, 6 one-line redirect pages

| On disk today | Ruled | Redirect kept at the old path |
|---|---|---|
| `src/app/(hermes)/bazaar/creations/page.tsx` | `.../wares/page.tsx` | yes |
| `src/app/(hermes)/bazaar/creations/[id]/page.tsx` | `.../wares/[id]/page.tsx` | yes |
| `src/app/(hermes)/bazaar/creators/page.tsx` | `.../artisans/page.tsx` | yes |
| `src/app/(hermes)/bazaar/creators/[id]/page.tsx` | `.../artisans/[id]/page.tsx` | yes |
| `src/app/(hermes)/bazaar/vendors/page.tsx` | `.../merchants/page.tsx` | yes |
| `src/app/(hermes)/bazaar/vendors/[id]/page.tsx` | `.../merchants/[id]/page.tsx` | yes |

**The redirect shape** — a Next `redirect()` page at the old path, permanent, no
UI, so a saved or pasted link never breaks:

```tsx
// src/app/(hermes)/bazaar/creations/page.tsx — the old word, kept as a door
import { permanentRedirect } from 'next/navigation';
export default function CreationsRedirect() { permanentRedirect('/bazaar/wares'); }
```

…and the `[id]` variants forwarding the id. The `_NOTEPAD.md` files stay in
their present folders untouched (they are KP's; read, never edited, never
moved).

### 2b · Component files — 8 renames, 3 folders

| On disk today | Ruled |
|---|---|
| `domains/hermes/creations/` | `domains/hermes/wares/` |
| `creations/CreationsGallery.tsx` | `wares/WaresGallery.tsx` |
| `creations/CreationDetail.tsx` | `wares/WareDetail.tsx` |
| `domains/hermes/creators/` | `domains/hermes/artisans/` |
| `creators/CreatorsGallery.tsx` | `artisans/ArtisansGallery.tsx` |
| `creators/CreatorDetail.tsx` | `artisans/ArtisanDetail.tsx` |
| `creators/CreatorCardRenderer.tsx` | `artisans/ArtisanCardRenderer.tsx` |
| `domains/hermes/vendors/` | `domains/hermes/merchants/` |
| `vendors/VendorsGallery.tsx` | `merchants/MerchantsGallery.tsx` |
| `vendors/VendorDetail.tsx` | `merchants/MerchantDetail.tsx` |
| `vendors/VendorCardRenderer.tsx` | `merchants/MerchantCardRenderer.tsx` |

`creations/ProductCard.tsx` moves with the folder to `wares/ProductCard.tsx`.
**Its own name is not an old word and this spec does not rename it** — but see
FIX 9 (§3②): it has no live consumer and all three of its variants print a price
on a grid card (`ProductCard.tsx:89–91 :142–144 :185–187`), which is exactly
what the quiet-square ruling removed. Wiring it in would reverse that ruling
silently.

### 2c · Query params — 2

- `?creator_id=` → `?artisan_id=` — written at `CreatorDetail.tsx:146`, read at
  `CreationsGallery.tsx:43`.
- `?vendor_id=` → `?merchant_id=` — written at `VendorDetail.tsx:131`, read at
  `CreationsGallery.tsx:43`.

The reader accepts **both** for one pass (`artisan_id || creator_id`), so a link
someone saved yesterday still lands. The comment at `CreationsGallery.tsx:4 :42`
is updated with it.

### 2d · The 14 files carrying a route string that must move with the rename

`the-street.ts:95 :96` · `environments/page_mapping.ts:94 :99 :104 :109 :114
:119` · `hestia/constellation/ConstellationContent.tsx:391 :395 :615` ·
`BazaarHub.tsx:16 :24 :32` · `CheckoutForm.tsx:236` · `CheckoutHub.tsx:85` ·
`ContributionsGallery.tsx:134` · `StudioCreate.tsx:102` · `StudioEdit.tsx:132
:204` · `CreationDetail.tsx:82 :94` · `CreatorsGallery.tsx:81` ·
`VendorsGallery.tsx:81` · `CreatorDetail.tsx:74 :90 :146` ·
`VendorDetail.tsx:57 :73 :131`.

`ConstellationContent.tsx:391` also carries the label *"Your creator profile"* →
**"Your artisan profile"**, and `:395` *"Your merchant profile"* stands already.

- [ ] **CHECK W1** — every one of the 14 files updated; `grep -rn
      "bazaar/creations\|bazaar/creators\|bazaar/vendors" src/ --include=*.tsx
      --include=*.ts` returns only the six redirect pages. *(proof: the grep
      output in the return · tsc 0 · build 0)*
- [ ] **CHECK W2** — a CDP walk hits `/bazaar/creations`, `/bazaar/creators`,
      `/bazaar/vendors` and each lands on its ruled path with the room rendered.
      *(proof: three screenshots)*

### 2e · The three base identifiers — DRAFT SQL, not the build

These are the base's own names. A canvas cannot reword them and neither can a
build; they are renamed by SQL in KP's hand (§8), and the app follows in the
same motion or not at all.

| Ground | Address | The draft line |
|---|---|---|
| `application_type` = `"creator" \| "vendor" \| "curator" \| "council"` | `database.types.ts:6847` · list `:7112` | rename the two values to `artisan` · `merchant`. Read at themis's application gate — another realm's door. |
| `user_role` = `"community" \| "creator" \| "vendor" \| "curator" \| "council" \| "admin"` | `database.types.ts:6906–6912` · list `:7175` | the same two values. **The Loom gates on `roles.includes('creator')` at `StudioCreate.tsx:69`** — the enum rename and that gate move together or the Loom shuts. |
| `artisan_profiles.total_creations` | `database.types.ts:462` | rename to `total_wares`. The column is rendered nowhere after this pass (its tile is retired, §3③) — but the name outlives the tile. |

Already right and untouched: `artisan_profiles` · `merchant_profiles` · `wares`
· `works` · `ware_participants` · `work_participants` · `artisan_profile_id` ·
`merchant_profile_id`. The base was renamed 2026-07-31; it is the app layer
still wearing the old words. One exception on the list:
`merchant_profiles.vendor_name` (`database.types.ts:3631`) is still an old word
in the base — **unwritten — his to rule** whether it joins the rename; printed,
not decided, and not in the DRAFT unless KP says.

**Rename count, this pass: 6 routes (+6 redirects) · 11 files/folders · 2 query
params · 0 copy replacements · 3 base identifiers deferred to §8.**

---

## 3 · PER ROOM

### ① The hub — `/bazaar`

**Files:** `src/app/(hermes)/bazaar/page.tsx` →
`domains/hermes/bazaar/BazaarHub.tsx`. Environment `community`.

**Four doors, not six.** The Exchange tile and the Contributions tile leave the
grid. Grounds, both on the canvas: the Exchange's own room says *"The Exchange
completes on each work's page."* (`CheckoutHub.tsx:91`) — a door to a room that
sends you elsewhere is a corridor, and a corridor at the entrance is the
mall-model this realm refuses by name (E2 §3, bus L637–641, under KP ⚛
*"a bazaar experience that is not overwhelming or time consuming"*, L606–607).
Contributions is not a stall; it is the vessel's own record of itself, own-rows
only under RLS — it stands as **one quiet line beneath the grid**, still one
click.

**Copy — every rewrite, verbatim from the board:**

- FIX 1 · `BazaarHub.tsx:70–73` — the *"The Marketplace"* pill above the title →
  **removed**. Marketplace is the mall's word for itself.
- FIX 2 · `BazaarHub.tsx:31` — *"Ethical merchants serving the community"* →
  **"Vessels who keep a stall here."** The base holds no ethics column.
- FIX 3 · `BazaarHub.tsx:47` — *"Track your distributions and impact"* → **"Your
  part in every work, recorded"** (lifted from `ContributionsGallery.tsx:109`).
- FIX 4 · `BazaarHub.tsx:15 :23 :39` → **"Works offered by sovereign souls."** ·
  **"The artisans, and what is on their looms."** · **"Where a vessel offers a
  work of their own."**
- FIX 5 · `BazaarHub.tsx:110` — *"Explore"*, hover-only → **"Go in →"**, always
  visible. `opacity-0 group-hover:opacity-100` (`:109–111`) is invisible to
  touch and to the keyboard.
- FIX 6 · `BazaarHub.tsx:100` — `group-hover:scale-110` on each icon tile is a
  transform with no `motion-reduce` guard → a **background-tint change alone**.
- FIX 7 · `BazaarHub.tsx:26–59` — five Tailwind stock colours
  (`text-purple-400` · `bg-emerald-500/10` · `text-rose-400` ·
  `text-amber-400` · `text-teal-400`) → cosmic tokens: `neurospark` ·
  `mood.creative` · `sanctuary.green` · `entity.skald`. Titles stay `starDust`
  on the ground (12.3:1); the token lives in the icon tile, which is decorative
  and `aria-hidden`.
- NEW · the empty bazaar — **"The stalls are still being set up."** /
  **"Nothing is on offer here yet. The Loom is open if you have something to
  bring."** + *Go to the Loom*. The four doors stay.

**States:** visitor = the four doors · signed-in = identical (the hub holds no
state) · empty = the sentence above, doors intact · error = the hub is static,
nothing to fail · reduced-motion = the wash stills to nothing, no transform.

**The room must NOT:** list every route it has (the Gruen refusal) · show a
skeleton, a shimmer, or a *"0 results"* · promise a restock · carry a
countdown, a streak, a leaderboard, or a part-filled "3 of 6 explored" grid ·
put text on the realm hue.

- [ ] **CHECK ①-1** — four doors render, each with an always-visible *"Go in →"*
      reachable by keyboard with a visible focus ring. *(CDP: tab through, four
      stops, screenshot each)*
- [ ] **CHECK ①-2** — no Tailwind stock colour remains in `BazaarHub.tsx`.
      *(grep)*
- [ ] **CHECK ①-3** — `prefers-reduced-motion: reduce` set in CDP: no transform,
      no breathing. *(screenshot + computed style)*
- [ ] **CHECK ①-4** — every door title measures ≥ 7:1 on the ground behind it.
      *(measured, not estimated)*

### ② The Tapestry — `/bazaar/wares` · `/bazaar/wares/[id]`

**Files:** `wares/page.tsx` → `WaresGallery.tsx` · `wares/[id]/page.tsx` →
`WareDetail.tsx`.

#### The square — works beside wares

**KP ⚛ 2026-08-24, verbatim:** *"i also need works to be visible not just
wares."*

Two fetches at `status=published`, merged and ordered `created_at.desc`:

- `/api/generated/plutus-economics/wares?status=published&order=created_at.desc`
  (live; `wares/route.ts:14–44`)
- `/api/generated/hermes-social/works?status=published&order=created_at.desc`
  (live, generated, currently read by nothing in the square;
  `works/route.ts:14–44`)

**Neither table carries a kind column and neither should** — the square supplies
the kind at merge time, because it already knows which fetch a row came from.
The type filter gains the six `work_type` values (`music · writing · vision ·
performance · code · other`, `database.types.ts:7185`) beside the three
`ware_type` ones (`physical · digital · service`, `:7184`), and **only the
values that actually arrived are drawn** — an absent kind produces no chip and
no announcement.

- NEW · **the kind chip** — *"Ware · Digital"* · *"Work · Performance"*. One
  pill, not two; the kind joins the type.
- NEW · **the work card's own line** — *"a work · it has a door of its own"*,
  where a ware card would say *gifted*.
- FIX 8 · `ProductCard.tsx:46` — *"Free"* → **"Gifted"**. One realm, one word.
  (`CreationDetail.tsx:34` already says *Freely given*;
  `CreationsGallery.tsx:140` says *freely given*.)
- FIX 9 · `ProductCard.tsx` — **not wired in.** Named, not designed. Its three
  variants print a price on a grid card; the quiet square removed prices from
  cards.
- FIX 10 · `CreationsGallery.tsx:97` — *"Discover works from sovereign souls"* →
  **"What sovereign souls have made, and what they offer."** *Proposed on the
  board; the old line is good and KP may keep it and let the chips carry the
  distinction.* **unwritten — his to rule.** Build the new line, flag it in the
  return so KP can strike it in one word.
- NEW · **"Two wares and one work. That is all of them."** — the finite-list
  sentence, drawn from what arrived, never a stored count.

**The honest state today:** the base holds one `works` row — Knowledge Alchemy
🧪, `work_type` performance, with a `streaming_url` — and its status is `draft`
(as the conductor reports the base this hour; **no lamp reads the live base**).
So on the day works become visible, a visitor still sees none. **The square must
not announce that, must not count it, and must not promise it will change.**

#### The stall — `/bazaar/wares/[id]`

The plate: kind chip · icon · version read **from the bundle's own filename,
never typed** · name · description · price · the solidarity line
(`CreationDetail.tsx:118`, kept) · **PriceBreakdown, open on the page** ·
*What you receive* (the bodies, §9) · the verb.

- FIX 11 · `CreationDetail.tsx:36 :37` · `ProductCard.tsx:48 :49` — the literal
  string `'â€”'` → **"Price not set"**. Two fixes in one line: the em-dash is
  corrupt (FIX 15) and a bare dash where a price should be tells nothing.
- FIX 12 · `CreationDetail.tsx:106–110` — *"Available for Android · PC"*, read
  from `metadata.formats` (`:41–49`), a display string with no file behind it →
  **"What you receive"** + the real bodies, each with filename and size, and
  beneath them **"All three come with it. You choose when you have it — not now,
  and not once."**
- NEW · **the gifted plate** — *"Gifted"* / *"No exchange. It is yours."* /
  *Receive*, with a wire behind it (§9). Today `CreationDetail.tsx:148–149`
  renders *Receive* with nothing behind it.
- NEW · **a quiet link to `/bazaar/checkout`**, beside the split — the
  more-info door, reached where the question is actually asked. Today
  `/bazaar/checkout` has exactly one inbound link in the realm
  (`BazaarHub.tsx:56`), and this pass removes it.
- NEW · **a line naming the maker**, linking to their loom-room. A ware's page
  shows the work and never says who made it.
- NEW · **the rung-already-held state** — *"You are standing with this."* +
  *End it* · *Change the rung* (§6). **Never a second *Stand with it*.**

#### KP's stall — the five rungs

Drawn on this board, at `/bazaar/wares` under KP's artisan seat, as five
recurring `wares` rows shown together as one ladder. Full specification at §6.

**States (both rooms):** visitor = published only · signed-in vessel = the same
square, plus the rung-held state on a rung's stall · owner = the square is still
the visitor's view; the owner's view is ④ · empty = §3⑦'s table · error = the
fetch failed, said plainly, with the way back · reduced-motion = no transform on
any card here; the wash stills.

**The room must NOT:** print a price on a gallery card · print
`wares.quantity_sold` (`database.types.ts:6564`, `number`, not null — the column
that would become *"250 sold"*) · print `quantity_available` as a counter (it
only decides which settled sentence the stall says) · say *"most popular"*,
*"recommended"*, *"best value"*, *"trending"*, *"customers also bought"* · draw
one rung larger or brighter than another · use *Buy*, *cart*, or *purchase* ·
show a countdown, a restock promise, or a stars/ratings row · reshuffle on
refresh · scroll infinitely.

- [ ] **CHECK ②-1** — the square renders works and wares in one list, each card
      carrying its kind chip; the type filter offers only kinds that arrived.
      *(CDP: load `/bazaar/wares`, screenshot; the works fetch visible in the
      network log)*
- [ ] **CHECK ②-2** — with the base as it stands (one draft work), the square
      shows the wares and says nothing about works — no count, no "0 works", no
      Work filter. *(CDP screenshot + DOM assertion)*
- [ ] **CHECK ②-3** — no card renders a price; a free ware's card says
      **gifted**. *(CDP + grep)*
- [ ] **CHECK ②-4** — the stall renders PriceBreakdown open on the page, with
      the fee's own 30/70 sub-lines and the pledge line, computed from **this
      ware's own** `residual_pool_percent` and never from a component default.
      *(CDP screenshot at a seeded ware; the numbers checked to the cent against
      §4)*
- [ ] **CHECK ②-5** — the three bodies render as three equal rows, same height,
      same weight; the `.aab` is not mentioned anywhere in the DOM. *(CDP +
      grep)*
- [ ] **CHECK ②-6** — one link per card, nothing nested; each card is a focus
      target. *(CDP: tab through, count stops = count cards)*
- [ ] **CHECK ②-7** — no mojibake string renders anywhere in this room.
      *(grep `â€` over the room's files → 0)*

### ③ The Weavers and the Guild — `/bazaar/artisans(+[id])` · `/bazaar/merchants(+[id])`

**Files:** `ArtisansGallery.tsx` · `ArtisanDetail.tsx` ·
`ArtisanCardRenderer.tsx` · `MerchantsGallery.tsx` · `MerchantDetail.tsx` ·
`MerchantCardRenderer.tsx`. Reads `artisan_profiles` · `merchant_profiles`
(hermes-social), directories filtered `status=active`.

**Every count in these two rooms, ruled one at a time.** The test, stated
plainly: *a number is inventory when removing it would hide something a vessel
needs in order to act, and a score when removing it would only make someone
harder to rank.* Four of six go.

| Count | Address | Ruled |
|---|---|---|
| `total_creations` "Works" | `CreatorDetail.tsx:121–127` | inventory — **tile goes**; the works stand below it |
| `total_followers` "Followers" | `CreatorDetail.tsx:128–134` | score — **retired**. Nothing writes it, nothing reads it back |
| `productCount` on the card | `CreatorsGallery.tsx:90` · `VendorsGallery.tsx:90` | ambient comparison — **retired from the card** |
| `total_products` "Wares" | `VendorDetail.tsx:106–112` | inventory — **tile goes** |
| `total_sales` "Exchanges" | `VendorDetail.tsx:113–119` | score — **retired**. This is `quantity_sold` made public |
| `verified_at` | `CreatorDetail.tsx:102` · `VendorDetail.tsx:85` | **kept** — not a count; a fact about a door walked |

- FIX 13 · `CreatorDetail.tsx:150` — *"View all {n} works by {name}"* → **"See
  everything at this loom →"**.
- FIX 14 · `VendorDetail.tsx:135` — *"View all {n} wares"* → **"See what this
  stall offers →"**.
- FIX 15 · `CreatorDetail.tsx:154` · `VendorDetail.tsx:139` ·
  `CreationDetail.tsx:153` — the *Back* button calling `router.back()` →
  **removed**; the named return already at the top of each page is the one way
  back. `router.back()` sends a vessel who arrived by a pasted link out of the
  Sanctuary.
- NEW · **"Two weavers. That is all of them."** — the finite-list sentence.
- HELD, not rewritten — the empty-directory lines already say the right thing
  in the right register: *"The weavers are preparing their looms"*
  (`CreatorsGallery.tsx:75`) · *"The guild is forming"* (`VendorsGallery.tsx:75`).

**States:** visitor = the directory, `status=active` · signed-in = identical ·
owner = a vessel's own seat is a seat like any other; there is no owner view
here · empty = the two kept lines · error = plainly said, with the return ·
reduced-motion = no transforms in either room.

**The room must NOT:** print any of the four retired counts · offer a follow
gesture (there is none in the realm; `total_followers` is a column with no
gesture behind it) · rank, sort by, or badge-as-status · read the category chips
as anything but taxonomy.

- [ ] **CHECK ③-1** — the four retired counts appear nowhere in the DOM of
      either room. *(CDP + grep)*
- [ ] **CHECK ③-2** — the verified shield still renders from `verified_at`.
      *(CDP at KP's artisan seat)*
- [ ] **CHECK ③-3** — no `router.back()` remains in the three detail rooms;
      arriving by direct URL and pressing the named return lands on the
      directory. *(CDP: navigate direct, press return, screenshot)*
- [ ] **CHECK ③-4** — the external link keeps `rel="noopener noreferrer"`
      (`CreatorDetail.tsx:138`). *(grep)*

**One seam, named not designed:** themis → applications. The artisan gate is the
council's door; the Loom's refusal already points at it
(`StudioCreate.tsx:145` → `/council/applications`). Untouched.

### ④ The Loom — `/bazaar/studio` · `/studio/work` · `/studio/ware` · `/studio/[id]`

**Files:** a new `StudioForm.tsx` (the one form) + `StudioShelf.tsx` (the shelf)
under `domains/hermes/studio/`; `StudioCreate.tsx` and `StudioEdit.tsx` become
thin callers of `StudioForm` or are retired into it — **the build's choice,
provided there is exactly one form component when it is done.** Environment
`music`.

#### The form

Kind first, then the shared trunk, then the kind's branch (§1). The ware branch
carries:

- **Bodies** — NEW section, no census line; the field does not exist. *"Bodies"*
  / *"The files a vessel receives. Add one for each machine this runs on. Mobile
  and desktop both — many people cannot use a phone for this."* (the last clause
  is `RELEASE-STRUCTURE.md`'s own sentence, put where the decision is made). Each
  row = exactly one `file_registry` row (§9). *"The version is read from the
  file's own name."*
- **Pricing** — one base price, one model. `pricing_model` still defaults to
  `free` (`StudioCreate.tsx:82 :227`) — the zero-default, untouched.
- **Residual pledge** — already trued by the Forge's economics pass:
  `RESIDUAL_OPTIONS` 0/10/20/30/40/50 with `defaultValue="0"` and the helper
  naming the 90% as the base (`StudioCreate.tsx:44–51 :243–257`). **Do not
  re-fix it; carry it into `StudioForm` unchanged.**
- **Publish status** — *"Published means it stands on the stall. Draft means only
  you can see it."*

**Copy fixes:**

- FIX 16 · **the mojibake, 17 live user-facing strings** — `â€"` → `—`. The
  bytes are a UTF-8 em-dash read once as cp1252 and re-encoded; the carrying
  files also hold a UTF-8 BOM, which is the fingerprint. Not a rewording — an
  encoding repair, and the files must be **written back as UTF-8 without BOM**.
  Addresses, measured 2026-08-25:
  `StudioCreate.tsx:38 :39 :40 :41 :217 :225` ·
  `StudioEdit.tsx:37 :38 :39 :40` ·
  `CreationDetail.tsx:36 :37 :118 :121 :146` ·
  `ProductCard.tsx:48 :49`. Plus 14 in comments/headers
  (`CheckoutButton.tsx:3` · `CreationDetail.tsx:3 :10` ·
  `CreationsGallery.tsx:2 :6` · `CreatorDetail.tsx:6 :7 :10 :157` ·
  `CreatorsGallery.tsx:3` · `StudioCreate.tsx:5` · `StudioEdit.tsx:3` ·
  `VendorDetail.tsx:4` · `VendorsGallery.tsx:3`) — cosmetic, repaired in the
  same motion. **31 lines in all.**
- FIX 17 · `StudioCreate.tsx:38` · `StudioEdit.tsx:37` — *"Free — given to
  anyone who receives it"* → **"Gifted — given to anyone who receives it"**.
- FIX 18 · `StudioCreate.tsx:234` · `StudioEdit.tsx:277` — *"Leave empty for
  free or patronage-only works…"* → **"Leave empty for gifted or patronage-only
  works…"**.
- FIX 19 · `StudioCreate.tsx:105 :108` — *"Failed to create work"* / *"Failed to
  create work. Please try again."* → **"The work was not created this time. It
  is safe to try again."** — the house's error grammar, already spoken next door
  at `CheckoutForm.tsx:134`: what happened, then that it is safe.
- FIX 20 · `StudioCreate.tsx:65–112` — a failed POST returns the vessel to a
  page that still holds their typing but no record of it. For a form that may
  carry three bodies that is the realm's point of most loss. **The row is
  written first as a draft, then the bodies attach to it.**

#### The two gates

- Signed out → **"Sign in to reach the Loom."** / *"Your works stay where you
  left them."* + the door itself.
- Not an artisan → kept verbatim: *"The Loom awaits your application"* /
  *"Apply to become an artisan to start weaving your works."* + *Apply*
  (`StudioCreate.tsx:143–145`). **The gate is real and it is kept** — the
  artisan profile is application-gated, never automatic.

#### The owner's shelf

Full specification at §7. Copy, all NEW: *"Your loom"* / *"Everything you have
made. A draft, a thing on the stall, a thing set aside — it is all here, and
every one of them opens."* · filters *Everything · Drafts · On the stall · Set
aside* (default Everything) · *Begin a new one* · each row a kind chip + a
status chip + **Edit** · the sub-line under a work with no ware: *"No ware on
the stall from this one — and it does not need one."* · the empty shelf:
*"Nothing on your loom yet."* / *"The first thread is yours to lay. Nothing here
is public until you say so."* · the filtered-to-none state: *"Nothing under that
one."* / *"Show everything."*

The three status words map to `content_status` (`database.types.ts:6848`):
**Draft (only you) · On the stall (anyone) · Set aside (yours, off the stall)**.
*Set aside*, never *Archived* — archiving is what a system does to a record.

**States:** visitor (signed out) = the door · signed-in non-artisan = the
application gate · owner/artisan = the shelf, every status · empty = the two
empty lines above · error = **the could-not-be-read state** (§7), never
"nothing here" · reduced-motion = no transforms in this room.

**The room must NOT:** score the artisan · show a completeness meter, a
part-filled progress bar, or a *"your listing is 60% ready"* · nudge to publish ·
carry a pre-checked consent box (there is none; the publish toggle is a state,
not a permission) · price the work by default (`pricing_model` stays `free`) ·
show three bodies as three separate wares · offer the `.aab` · hide a maker's
own draft from them.

- [ ] **CHECK ④-1** — one form component exists; `/bazaar/studio/work` and
      `/bazaar/studio/ware` both open it with the kind set and the correct
      branch rendered. *(CDP: both routes, screenshot each)*
- [ ] **CHECK ④-2** — a work created through the form lands as a `works` row and
      a ware as a `wares` row; the kind chosen decides the table. *(CDP: real
      input at both routes, then read the row back through the app's own door)*
- [ ] **CHECK ④-3** — *"give this work a body"* on a work's page opens
      `/bazaar/studio/ware?from_work=<id>` with name, description and cover
      pre-filled. *(CDP with real input)*
- [ ] **CHECK ④-4** — the bodies section adds, lists and removes rows; each
      *Remove* is a real `<button>` naming its own file to a screen reader, not
      an icon. *(CDP + accessibility tree)*
- [ ] **CHECK ④-5** — the residual dial reads *"0%, nothing pledged (the
      default)"* and the helper names the 90% as its base. *(CDP screenshot)*
- [ ] **CHECK ④-6** — the shelf lists the signed-in vessel's own rows at every
      status, each with Edit, and passes no status filter. *(CDP as a signed-in
      owner with one draft — this is CHECK RLS-1's walk, §7)*
- [ ] **CHECK ④-7** — zero mojibake in `StudioForm`/`StudioEdit`; the files
      carry no BOM. *(grep + `file` byte check)*
- [ ] **CHECK ④-8** — a failed save keeps the vessel's typing and says the house
      sentence. *(CDP: force a 500, screenshot)*

### ⑤ Contributions — `/bazaar/contributions`

**Files:** `ContributionsGallery.tsx`. Reads `ware_participants` and
`work_participants`, own rows only under RLS. Environment `library`.

**KP ⚛ 2026-08-01, verbatim, spelling kept** (`REALM-BUS.md:88–95`):
*"participant user id will be published if opted in to do so. this will be asked
and handled when the participant and the artisan collaborate on a project.
participants will need a menu space they can see the works and wares they
participated in, with a way to communicate with the system to toggle on and off
that visibility. the id will be connected to the works and wares to enable
distribution of residual pool regardless of published status."*

This room already embodies it. The frame changes three things and no more:

- FIX 21 · `ContributionsGallery.tsx:109` · `contributions/page.tsx:5` —
  *"Contributions Ledger"* → **"Contributions"**. A ledger is a book of amounts
  owed and the 2026-07-09 verdict took the amounts out
  (`ContributionsGallery.tsx:2–4`).
- FIX 22 · `ContributionsGallery.tsx:118` — one line serving two very different
  empty states → **"Nothing here yet." / "When you help make something, it is
  recorded here — whether or not your name goes on it."** and, filtered,
  **"Nothing matches that." / "Your contributions are still here — clear the
  filter to see them."**
- FIX 23 · `ContributionsGallery.tsx:105` — *"Sign in to view your
  contributions."* → **"This room is yours alone." / "Sign in and it will show
  what you have helped make."** + the door itself.
- FIX 24 · `ContributionsGallery.tsx:133–135` — a **work** row has no link out
  (only wares link). Link a work row to `/bazaar/works/[id]` (⑧), which now
  exists.
- NEW · **"Two contributions. That is all of them."**

**Kept verbatim, untouched:** `:111–113` the standing paragraph, *"The credit —
and the residual share — stand either way."* — the single most important line in
the room; `:116` *"Filter by role…"*; `:91` the toggle's failure line; `:141`
*"Shown with the work"* / *"Kept quiet"*.

**One stranded edge, now closed:** the brief recorded `is_public` as live in the
base and absent from the local types, holding tsc red. **It is present now** —
`ware_participants.is_public: boolean` at `database.types.ts:6505` and
`work_participants.is_public: boolean` at `:6648`. The GAIA regen has landed;
the room reads it at `:71 :75` and writes it at `:89`. **No hand-edit of the
generated layer is needed or permitted.**

**States:** signed out = FIX 23's card + door · signed-in with rows = the list ·
signed-in with none = FIX 22's first pair · filtered to none = FIX 22's second
pair · error = the toggle's own kept failure line · reduced-motion = the switch
is a colour and position change, no transform to guard.

**The room must NOT:** show any amount, running total, projected share,
per-work figure or chart · print a contribution percentage on a card (the role
is taxonomy) · count contributions · pre-check anything (the default lives one
layer below the interface, in the base) · style turning the toggle **off** as a
loss — no warning, no confirm, no *"are you sure"* · tie the share to the switch.

- [ ] **CHECK ⑤-1** — no amount, percentage or count renders anywhere in the
      room. *(CDP + grep)*
- [ ] **CHECK ⑤-2** — the toggle writes `is_public` both ways and the failure
      line fires on a forced failure. *(CDP with real input, both directions)*
- [ ] **CHECK ⑤-3** — a work row links to `/bazaar/works/[id]` and lands.
      *(CDP)*
- [ ] **CHECK ⑤-4** — the two empty states are distinguishable. *(CDP: filter to
      none, screenshot; then a vessel with no rows, screenshot)*

**Named and stopped:** the consent **ASK** surface — the moment at collaboration
time where the row is born and the question is first asked — is unbuilt; its
design rides the artisan-and-participant pair's table. Second pass. Not invented
here.

### ⑥ The Exchange, and THE DELIVERY — `/bazaar/checkout(+success+cancel)`

**Files:** `CheckoutHub.tsx` · `CheckoutButton.tsx` · `CheckoutForm.tsx` ·
`PriceBreakdown.tsx` · `src/lib/hooks/commerce/useCheckout.tsx` ·
`src/app/api/auth/checkout/route.ts` ·
`src/app/api/auth/checkout/session/[id]/route.ts` ·
`src/app/api/webhook/stripe/route.ts`. Environment `home`.

**KP ⚛ 2026-08-24, verbatim:** *"checkout is using stripe, why would we
duplicate the data capture?"* — Stripe holds the payment; the POST route inserts
ONE pending `exchanges` row (`checkout/route.ts:95–108`, eight columns); the
webhook completes that same row (`webhook/stripe/route.ts:45–55`, four columns)
and inserts nothing at that step. **Checkout captures nothing twice.** The ledger
rows are written **downstream of the completed exchange** — §5.

**The road, one-time:** the gesture → POST `/api/auth/checkout` (reads the ware,
`status=published`, `:51–56`) → `calculate_sovereign_price` RPC (`:82–85`,
non-fatal, its raw output preserved on the row at `:104`) → ONE pending
`exchanges` row → Stripe session (`:115–142`) → the webhook completes the row →
**NEW: the bodies handed over** (§9) → THE HANGING, second pass, exactly as
built.

**Copy fixes, verbatim from the board:**

- FIX 25 · `PriceBreakdown.tsx:14–15 :22–24 :30 :137–154` — `showBigotTax` ·
  `bigotTaxAmount` · the *"Bigot Tax"* row and its tooltip → **removed**. KP
  ruled it retired. Off by default and never passed `true` anywhere in the tree.
- FIX 26 · `CheckoutHub.tsx:76–79` — the *"Industry Standard Platform Fee ·
  30-50%"* row → **removed**. A number about other platforms with no provenance,
  in a table whose other three rows the base can witness. *Proposed on the
  board; KP may want the comparison kept with a source.* **unwritten — his to
  rule**; build the removal, flag it.
- FIX 27 · `CheckoutButton.tsx:53` — *"Processing…"* → **"Crossing…"**. The room
  next door already calls this moment a crossing (`CheckoutForm.tsx:162`).
- FIX 28 · `CheckoutButton.tsx:39 :56` — two strings for one state → **"This one
  is not on the stall right now."**
- FIX 29 · `checkout/success/page.tsx:21` — *"Loading…"* → **"A moment."** It is
  the first thing a vessel sees after paying.
- NEW · **the delivery** — *"Your copy is ready"* · *"Take it"* · *"A link rests
  after a while. This is yours to come back to — its stall will hand you a fresh
  one whenever you ask."* **Take it**, never *Download*.
- NEW · **the adjusted-price screen** — *"The price for you is lower."* / *"The
  stall says $3.33. Solidarity pricing has been applied and this is what you
  would be charged. The split below is the real one."* / *Go on to payment* ·
  *Not now*. **Shown only when the number changed.** Today `useCheckout.tsx:55–59`
  sends the vessel straight to Stripe with whatever came back, so where the acid
  test moves the number a vessel reads one price and meets another with no
  screen in between — and law 7 says the buyer sees the split at the moment of
  purchase.

**Kept verbatim, untouched:** `CheckoutForm.tsx:150–151 :162–164 :175–176 :188
:190 :192` · `cancel/page.tsx:28–33` (the whole set-aside page, and its last
line — *"Gweld ti'n fuan — the Bazaar keeps no ledger of this."*) ·
`CheckoutHub.tsx:24 :91`.

**Two wiring fixes, reported by the board and required here:**

- FIX 30 · `webhook/stripe/route.ts:45–55` — the completed branch matches on
  `stripe_session_id` alone with **no** `.eq('status','pending')` guard, unlike
  its own failure branch which has one (`:79–80`). A replayed event rewrites a
  completed row. **Add the guard.** With renewals and a delivery hanging off
  that status, idempotency stops being tidiness (§5).
- FIX 31 · `session/[id]/route.ts:39–49` — the ownership check runs only if an
  exchange row is found; with no row it falls through and returns the Stripe
  session anyway. **The guard must be the first thing the route does**, before
  the delivery rides it.

**One value written and read by nobody:** `residualPoolPercent` goes into Stripe
metadata (`checkout/route.ts:138`) and no code anywhere reads it back. Either it
is the residual's provenance at the moment of exchange — in which case it belongs
on the exchange row — or it is nothing. **unwritten — his to rule.** §5 writes
the pledge into the ledger's `breakdown`, which makes the metadata copy
redundant; the build leaves the metadata line as it stands and does not read it.

**States:** visitor pressing the verb = the intent is stashed and replayed once
after the door (`useCheckout.tsx:34–38 :71–97`) · signed-in = the road · owner
buying their own ware = **unwritten — his to rule**; the build neither blocks
nor special-cases it · crossing = the polling card, stopping itself when the
state settles (`CheckoutForm.tsx:111–116`) · error = *"The exchange did not
complete"* · set aside = the cancel page · reduced-motion = the spinner is a
status indicator, not decoration; the wash stills.

**The contrast measurement this room must not lose:** the `home` wash is the
alchemist gradient and its far stop is `mystical.albedo #E0E0E0` — **the same
colour as the text**. At the ambient 0.3 the ground reads `#4C4E58` and
`starDust` measures 6.3:1; at full strength it measures 1.0:1 and the page is
blank. **This room is where the 0.3 wash law stops being a preference.**

**The room must NOT:** show *"customers also bought"* · mine the pending row or
the set-aside page for recovery mail (the cancel page keeps no ledger of the
leaving, structurally) · print a quantity · listen for an exit · dress the
signed URL's expiry as a clock (it is a fact about links, said once, with the
way back in the same breath) · put a retention offer, an interstitial, an exit
survey, a downgrade funnel or a support ticket between a press and an ending ·
count months stood, total given, or an anniversary.

- [ ] **CHECK ⑥-1** — a one-time exchange completes end to end in Stripe test
      mode and the `exchanges` row reads `completed` exactly once.
      *(CDP walk with real card input; the row read back through the app's own
      door)*
- [ ] **CHECK ⑥-2** — a replayed `checkout.session.completed` writes nothing a
      second time. *(fire the same event twice; the row unchanged, the ledger
      unchanged)*
- [ ] **CHECK ⑥-3** — the adjusted-price screen fires only when the computed
      price differs from the plate, and passes straight through when it does
      not. *(CDP: two walks, one of each)*
- [ ] **CHECK ⑥-4** — the success page hands over the bodies, each *Take it*
      naming its own file. *(CDP screenshot + accessibility tree)*
- [ ] **CHECK ⑥-5** — `session/[id]` returns 403 for a signed-in vessel who is
      not the buyer, **before** any Stripe call. *(CDP with a second account)*
- [ ] **CHECK ⑥-6** — no *"Bigot Tax"* and no industry-comparison row remains.
      *(grep + CDP)*
- [ ] **CHECK ⑥-7** — `starDust` on the home wash measures ≥ 6:1 at the ambient
      0.3 in the built page. *(measured on the rendered pixels, not estimated)*

### ⑦ The ways between, and every empty state

**15 live destinations, 5 proposed edges.** The five, each closing a dead end:

1. **the stall → `/bazaar/checkout`** — a quiet link beside the split. The route
   loses its only inbound when the hub drops to four doors.
2. **the stall → the weaver** — one line under the plate.
3. **the Loom → your shelf** — **RULED**, no longer proposed (§7). Today
   `/bazaar/studio/[id]` has exactly one inbound and it is a redirect after
   saving a draft (`StudioCreate.tsx:100`); an artisan who saves a draft and
   closes the tab cannot find it again except by remembering a UUID.
4. **the square → `/bazaar/works/[id]`** — ⑧.
5. **the stall → RECEIVE, for a work already kept** — the delivery must be
   re-askable or the frame has built a one-shot handover with an expiring link
   at the end of it.

**The three seams out, each owned elsewhere and untouched here:**
`/login?redirect=` (`CheckoutButton.tsx:42` — realm 1) · `/vessel/home`
(`CheckoutForm.tsx:237` — hestia, THE HANGING, second pass) ·
`/council/applications` (`StudioCreate.tsx:145` — themis). Plus `href="/"` on
the set-aside page (`cancel/page.tsx:38`) — **kept**.

**The 26 empty states.** Ten already true and kept verbatim; sixteen are this
pass's.

| Route | When | What it says |
|---|---|---|
| `/bazaar` | no wares at all | NEW — *"The stalls are still being set up."* The four doors stay |
| `/bazaar/wares` | none | KEPT — *"The tapestry awaits its first threads"* |
| `/bazaar/wares` | filter matches none | FIX — *"No works match that."* / *"Clear the filter to see everything."* (today a fragment with no way back, `CreationsGallery.tsx:123`) |
| `/bazaar/wares` | wares, no published work | NEW — **nothing is said.** No Work filter appears, no absence announced. **This is the state today.** Never *"0 works"* |
| `/bazaar/wares` | works, no published ware | NEW — the same, the other way round |
| `/bazaar/wares/[id]` | gone | KEPT — *"This work has been unwoven."* |
| `/bazaar/wares/[id]` | none left | KEPT — *"These have all gone home — the maker may weave more."* — *may*, not *is* |
| `/bazaar/wares/[id]` | a rung already held | NEW — *"You are standing with this."* + End it · Change the rung |
| `/bazaar/works/[id]` | gone | NEW — *"This work is not on the square."* |
| `/bazaar/works/[id]` | no ware descends from it | NEW — *"This one is not for sale. It is here because it was made."* No *coming soon*, no waitlist, no notify-me |
| `/bazaar/artisans` | none | KEPT — *"The weavers are preparing their looms"* |
| `/bazaar/artisans/[id]` | gone | KEPT — *"This weaver has not yet arrived."* |
| `/bazaar/artisans/[id]` | no works | FIX — the section vanishes entirely today (`CreatorDetail.tsx:158`, `works.length > 0`) → *"Nothing on the loom just now."* A silent absence reads as a broken page |
| `/bazaar/merchants` | none | KEPT — *"The guild is forming"* |
| `/bazaar/merchants/[id]` | gone | KEPT — *"This guild member has not yet arrived."* |
| `/bazaar/studio` | signed out | NEW — *"Sign in to reach the Loom."* + the door |
| `/bazaar/studio` | not an artisan | KEPT — *"The Loom awaits your application"* + Apply |
| `/bazaar/studio` | artisan, nothing made | NEW — *"Nothing on your loom yet."* / *"The first thread is yours to lay. Nothing here is public until you say so."* |
| `/bazaar/studio` | artisan, drafts only | NEW — the shelf shows them all |
| `/bazaar/studio` | artisan, all set aside | NEW — the same, each row openable |
| `/bazaar/studio` | shelf filtered to none | NEW — *"Nothing under that one."* / *"Show everything."* |
| `/bazaar/studio` | **the shelf could not be read** | NEW — §7's could-not-be-read state. **Never "nothing here"** |
| `/bazaar/contributions` | signed out · none · filtered to none | ⑤, three states |
| `/bazaar/checkout/success` | no session id | KEPT — *"No exchange session was found."* |
| `/bazaar/checkout/success` | expired | KEPT — *"This exchange session has closed. Nothing was taken."* |

**The empty-state voice, stated once** (L1-08 via E2 §3, bus L526–530):
*"waiting for stars to align rather than missing data"*. Never a promise the base
cannot keep · **never a count of what is missing** · always one thing to do when
there is one · **never a skeleton standing in for an answer** — the galleries
render six pulsing card-shapes while loading (`CreationsGallery.tsx:81` ·
`CreatorsGallery.tsx:46` · `VendorsGallery.tsx:46` ·
`ContributionsGallery.tsx:103`); the skeleton is for the fetch, then the honest
sentence, never the skeleton as the resting state.

- [ ] **CHECK ⑦-1** — all five proposed edges exist and land. *(CDP: five
      navigations, screenshot each)*
- [ ] **CHECK ⑦-2** — every one of the 26 states renders its ruled sentence.
      *(CDP where reachable; a DOM assertion where the state must be forced)*
- [ ] **CHECK ⑦-3** — no empty state anywhere in the realm prints a number of
      what is missing. *(grep for `0 results`, `No results (`, `.length` inside
      an empty-state string)*
- [ ] **CHECK ⑦-4** — no skeleton is a resting state: force an empty fetch and
      the sentence appears, not six ghosts. *(CDP)*

### ⑧ A work's own door — `/bazaar/works/[id]`

**Files:** `src/app/(hermes)/bazaar/works/[id]/page.tsx` (new) →
`domains/hermes/works/WorkDetail.tsx` (new). Reads
`/api/generated/hermes-social/works/[id]` (generated, live) and
`/api/generated/hermes-social/work_participants?work_id=` (generated, live).

Carries: the work · its participants (`work_participants`, the shape ⑤ reads —
**shown only where `is_public` is true**) · its bodies where a ware descends from
it (§9) · its streaming door where `works.streaming_url` is set
(`database.types.ts:6708`) · **"give this work a body"**, owner only, opening
`/bazaar/studio/ware?from_work=<id>`.

**Today a work is visible for one paragraph and then unreachable:** `works` is
read in exactly one place in the realm — six rows in a weaver's room
(`CreatorDetail.tsx:52`) — and those cards link nowhere (`:163–177`).

**The room must NOT:** price a work · say *coming soon* · offer a waitlist or a
notify-me · imply a work is an unfinished ware.

- [ ] **CHECK ⑧-1** — the route exists and renders a work by id. *(CDP at the
      one seeded work, as its owner since it is a draft)*
- [ ] **CHECK ⑧-2** — a work with no descending ware says the ruled sentence and
      asks for nothing. *(CDP)*
- [ ] **CHECK ⑧-3** — participants render only where `is_public` is true.
      *(CDP + a DOM assertion against the row)*
- [ ] **CHECK ⑧-4** — the weaver's room cards now link here.
      *(CDP: `/bazaar/artisans/[id]` → a work card → this door)*

---

## 4 · THE ECONOMICS IN CODE — one function, one place

**THE STANDING MODEL is `docs/architecture/residual-system.md`.** Never restate
it differently. Its seven rules bind the split code. In one line: **platform fee
10% fixed, of which 30% returns to the residual pool and 70% funds the machine ·
the residual DIAL (0–50%, default 0) is the main artisan's PLEDGE, taken from
the 90%, never from the fee · what is left of the 90% divides EQUALLY among this
item's own contributors, the creator among them, no per-contributor percentage ·
covenant = each vessel's own 0–50% dial (default 0, set in the Sanctum), a slice
of THAT VESSEL'S OWN share of a SALE only · pool distributions arrive WHOLE.**

### Where it lives

**`PriceBreakdown.tsx` already computes the model** — trued by the Forge's
economics pass, commit `ffcd49ea9`: `FEE_TO_RESIDUAL_POOL_PERCENT = 30` at
`:14`, and the arithmetic at `:34–40`:

```
platformFee        = subtotal * platformFeePercent / 100
feeToResidualPool  = platformFee * 30 / 100
feeToMachine       = platformFee - feeToResidualPool
artisanProfit      = subtotal - platformFee
pledged            = artisanProfit * residualPoolPercent / 100
toContributors     = artisanProfit - pledged
```

**Reuse it. Never a second copy.** The build **lifts these six lines and the
constant, unchanged in meaning, into one module** —
`src/lib/economics/split.ts`, a hand-written path outside `src/lib/generated/**`
— and `PriceBreakdown.tsx` imports it. The webhook handler (§5) imports the
**same** function. There is exactly one place in the repo where a sale's split is
computed when this pass is done.

### The signature

```ts
// src/lib/economics/split.ts
export interface SplitInput {
  grossMinorUnits: number;      // integer cents, from the exchange row
  platformFeePercent: number;   // exchanges.platform_fee_percent (10)
  residualPledgePercent: number;// wares.residual_pool_percent ?? 0
  contributorIds: string[];     // ware_participants.user_id + created_by, distinct
  covenantPercentByVessel: Record<string, number>; // 0-50, default 0
}
export interface SplitLine { kind: ...; amountMinorUnits: number; toSovereignId?: string; toPool?: 'residual' | 'covenant'; }
export function computeSplit(input: SplitInput): SplitLine[];
```

**All arithmetic in integer minor units.** `wares.price` is `number`
(`database.types.ts:6561`) and Stripe takes cents; the split code never carries a
float. The display layer formats; the ledger stores what the split code produced.

### The inputs, from the rows

| Input | Row · column |
|---|---|
| gross | `exchanges.gross_amount` (`database.types.ts:2061`), ×100 |
| fee percent | `exchanges.platform_fee_percent` (`:2066`) |
| the pledge | `wares.residual_pool_percent` (`:6566`) — **this ware's own, never a component default** |
| the contributors | `ware_participants.user_id where ware_id =` (`:6510 :6511`), **plus** `wares.created_by` (`:6552`) if absent — *"The creator is enrolled as a contributor to their own ware, automatically"* (residual-system.md, rule 2) |
| each vessel's covenant | `user_financial.covenant_pool_percent` (residual-system.md, Database shape) |

**The contributors are read by presence, not by publication.** `is_public` is a
display toggle only; existence is economics (KP ⚛ 2026-08-01,
`REALM-BUS.md:88–95`). A kept-quiet participant is paid.

### The tests

`src/lib/economics/split.test.ts` (or the repo's own test seat, whichever the
build finds; if the repo has no test runner, **the tests are a CDP-verified page
of assertions in the return, and the spec says so plainly** — the arithmetic is
proved either way):

1. **The founder's example** — $100 sale, three contributors, pledge 50,
   covenant 50 each: fee $10.00 → $3.00 pool + $7.00 machine · profit $90.00 →
   $45.00 pledged + $45.00 to three contributors = **$15.00 each** → covenant
   $7.50 each on to the covenant pool, $7.50 each theirs. *"Nobody in this
   diagram is paid more than anybody beside them."*
2. **The standing defaults** — $100 sale, pledge 0, covenant 0, one contributor:
   $3.00 pool + $7.00 machine · **$90.00 whole** to the one contributor.
3. **The five rungs to the cent** — §6's table: 10.00 · 25.00 · 50.00 · 100.00 ·
   250.00, each fee splitting 30/70 exactly and each profit halving exactly at
   pledge 50. `1.00+9.00=10.00 · 2.50+22.50=25.00 · 5.00+45.00=50.00 ·
   10.00+90.00=100.00 · 25.00+225.00=250.00`. **Not one of the five leaves an
   odd cent at the price.** The set's one half-cent is Guardian's **covenant**
   step, $11.25 → $5.625.
4. **The invariant, on every case**: the sum of the produced lines equals the
   gross, to the cent.

### THE ODD CENT — unwritten — his to rule

**The record is silent.** `residual-system.md` names it and does not answer it:
*"The schema and the code must say where the odd cent goes (a build question,
asked once, never silently rounded in the platform's favour)."* The first real
test is already named: Lantern at $1.11 with two contributors and pledge 50 —
fee $0.111 ($0.0333 pool / $0.0777 machine), profit $0.999 ($0.4995 pledged,
$0.4995 split two ways) — **and none of it lands on a cent.** Compass at $3.33
does the same (30% of $0.333 = $0.0999).

**The candidate rules, stated neutrally, none chosen:**

- **(a) the remainder to the contributor** — after every line is floored, the
  leftover minor units go to the item's contributors, one cent each in a stable
  order (e.g. by `ware_participants.created_at`).
- **(b) the remainder to the residual pool** — the leftover joins the pool line.
- **(c) the remainder to the covenant pool** — the leftover joins the dignity
  floor.
- **(d) the remainder held on the exchange** — an unallocated-cents line,
  carried until a distribution can absorb it.

**The invariant the build keeps whatever KP rules, and it is not optional:**

1. **The remainder is never rounded toward the platform.** The machine's 70% line
   never absorbs a leftover cent under any rule.
2. **The sum of the produced lines equals the gross, exactly, in minor units.**
3. **The rule is one named constant in `split.ts`**, so KP's word changes one
   line and every test re-runs against it.

Until KP rules, the build ships **(a)** behind that constant — the plainest
reading of *"we do not take dignity away"* — and the return says so in one line
so a single word from KP moves it.

- [ ] **CHECK E-1** — exactly one split computation exists in the repo. *(grep
      for the fee constant and the pledge arithmetic → one file)*
- [ ] **CHECK E-2** — `PriceBreakdown.tsx` and the webhook import the same
      function. *(grep imports)*
- [ ] **CHECK E-3** — the three worked cases pass to the cent. *(test output, or
      the asserted page, in the return)*
- [ ] **CHECK E-4** — the sum invariant holds on $1.11 and $3.33 with two
      contributors. *(test output)*
- [ ] **CHECK E-5** — no component supplies a default `residualPoolPercent` that
      is not the ware's own; where a ware has none, the pledge line does not
      render. *(`PriceBreakdown.tsx:30` is `0`; `CreationDetail.tsx:130–131`
      passes the ware's own — verify both, and that `checkout/route.ts:138`'s
      fallback is `'0'`)*

---

## 5 · THE LEDGER ROWS

**KP ⚛ 2026-08-24, verbatim:** *"when hermes is refined, we will make certain the
ledger rows are being created for our transparency."*

Read with *"checkout captures nothing twice"*, the two rulings compose and do not
collide: **Stripe holds the payment · the webhook completes the ONE `exchanges`
row · and DOWNSTREAM of that completed exchange the `ledger` rows are written.**
The declined board (`declined/DeclinedLedgerLine.dc.html`) refused a ledger row
**at checkout**, written beside the row the webhook was already completing —
that is what stays refused. What is built is the flow's own lines, written after
the exchange is complete, so `/transparency` and the council's ledger show every
flow to the cent.

### The table

`ledger` (plutus-economics), 15 columns at `database.types.ts:3358–3372`,
handling **system** (`ledger/route.ts:4`). Append-only.

| Column | Address | This spec's use |
|---|---|---|
| `amount` | `:3358` | the line's amount |
| `breakdown` | `:3359` (`Json \| null`) | the split's provenance: the gross, the fee percent, the pledge percent, the contributor headcount, the odd-cent rule's name |
| `currency` | `:3361` | from `exchanges.currency` (`:2060`) |
| `description` | `:3362` | one plain sentence per line |
| `entry_type` | `:3363` (`string`, not an enum) | the six values below |
| `event_at` | `:3364` | the webhook's event timestamp, not `now()` |
| `from_pool_id` · `to_pool_id` | `:3365` · `:3371` | `residual_pool.id` (`:4727`) · `covenant_pool.id` (`:1563`) |
| `from_sovereign_id` · `to_sovereign_id` | `:3366` · `:3372` | buyer · contributor |
| `reference_table` · `reference_id` | `:3370` · `:3369` | **`'exchanges'` and the exchange's id — always. This pair is the idempotency key.** |

### One row per flow line

For a completed exchange with gross **G**, fee percent **f**, pledge **p**, and
contributors **C**:

| # | `entry_type` | amount | from → to |
|---|---|---|---|
| 1 | `platform_fee` | G × f | buyer → (the platform) |
| 2 | `fee_to_residual_pool` | (G × f) × 30% | — → `residual_pool` |
| 3 | `fee_to_machine` | (G × f) × 70% | — → (operations) |
| 4 | `residual_pledge` | (G − fee) × p | — → `residual_pool` — **written only when p > 0** |
| 5 | `contributor_share` | (G − fee − pledge) ÷ \|C\| | — → each contributor, **one row each** |
| 6 | `covenant_pledge` | that contributor's share × their covenant % | contributor → `covenant_pool` — **one row per contributor with a covenant > 0** |

**Rows 1–3 are written on every sale, dial or no dial.** Row 4 only when the
artisan pledged. Rows 5 and 6 are per contributor. **The sum of rows 3, 5-after-6,
6, 2 and 4 equals G to the cent** (§4's invariant).

### The laws these rows obey

- **Written server-side, in the webhook handler.** Never by a client, never by a
  generated route called from a browser.
- **Idempotent on the exchange id.** Before writing, the handler reads
  `ledger where reference_table='exchanges' and reference_id=<id>`; if any row
  exists, it writes nothing and returns. A re-fired webhook writes nothing
  twice. This is the same fact FIX 30 protects at the `exchanges` row.
- **Nothing is deleted, ever.** Append-only. A refund is a new row, not an
  erasure — and the refund flow is **not** in this pass's scope.
- **A pool distribution is never garnished** (residual-system.md, rule 3). No
  ledger row this spec writes ever takes a pledge from a payout.
- **No per-vessel balance table is created** (residual-system.md, rule 4). The
  pool is the balance.
- **Whether `residual_pool.current_balance` / `covenant_pool.current_balance`
  are incremented by this handler, or derived from the ledger at read time, is
  unwritten — his to rule.** The build writes the ledger rows only and leaves the
  pool rows untouched; the derivation is honest and reversible, an increment is
  neither. Printed, not decided.

### The recurring case

**Each renewal is a sale, so each renewal is one `exchanges` row and its own
ledger rows.** The renewal row carries the same `ware_id` and `buyer_id`, a new
id, and — the schema line in §8 — **`stripe_invoice_id`, unique**, which is what
makes a renewal idempotent by its own identity rather than by a session id it
does not have.

### The exact webhook events

`webhook/stripe/route.ts` knows three today: `checkout.session.completed`
(`:40`), `checkout.session.expired` and `checkout.session.async_payment_failed`
(`:73–74`). It gains three.

| Event | What it does |
|---|---|
| `checkout.session.completed` | **the first payment.** Completes the pending row by `stripe_session_id` **with the `.eq('status','pending')` guard** (FIX 30), then writes the ledger rows for it. For a subscription session it also stores the Stripe subscription id — **where it is stored is part of §8's DRAFT; without the column the build stores it in `exchanges.adjustments`'s Json and says so in the return.** |
| `invoice.paid` | **a renewal.** Inserts ONE new `exchanges` row keyed on `stripe_invoice_id` (unique — a duplicate insert fails and is swallowed as already-done), status `completed`, gross from the invoice, then writes that row's ledger lines. |
| `invoice.payment_failed` | **the refused renewal.** Writes **no** exchange row and **no** ledger row. The vessel keeps everything already held; the copy is ⑥'s refused-renewal card. Nothing is marked lost. |
| `customer.subscription.deleted` | **the ending.** No row is deleted and no row is altered retroactively. The standing-with view stops showing a next date. **Where the "this has ended" fact is stored is unwritten — his to rule**; without a column the build reads Stripe's own subscription status at render time and says so. |
| `checkout.session.expired` · `checkout.session.async_payment_failed` | unchanged — the pending row is marked `failed`, status honest, nothing deleted (`:73–86`). |

**`exchange_status` is `pending · completed · failed · refunded`
(`database.types.ts:6855`) — no new value is needed and none is proposed.**

- [ ] **CHECK L-1** — a completed one-time exchange produces exactly the ruled
      rows, and their sum equals the gross to the cent. *(read the rows back
      through `/api/generated/plutus-economics/ledger?reference_id=<id>`)*
- [ ] **CHECK L-2** — the same event fired twice produces the same row count.
      *(fire twice, count)*
- [ ] **CHECK L-3** — a sale at the standing defaults (pledge 0, one
      contributor) writes rows 1, 2, 3 and 5 and **no** row 4. *(read back)*
- [ ] **CHECK L-4** — every ledger row carries
      `reference_table='exchanges'` and the exchange's id. *(read back)*
- [ ] **CHECK L-5** — a renewal writes one new `exchanges` row and its own ledger
      rows; a duplicate `invoice.paid` writes neither. *(Stripe test clock, or
      the same event fired twice)*
- [ ] **CHECK L-6** — `invoice.payment_failed` writes nothing and deletes
      nothing. *(fire it; count rows before and after)*

---

## 6 · THE TIERS AT KP'S STALL

**KP ⚛ 2026-08-24, verbatim, spacing kept:** *"retire the donate and create
subscription tiers for me rather than the platform, and  i will still have my
covenant set to 50%. the donations tab was before we had a built sanctuary and
had different outlooks."* — and to the lean *the tiers live at your stall in the
Bazaar as a recurring ware*, **KP ⚛: *"yes, this is the ask."*** Then, on which
of the set: *"use the same tiers from the "donate" for the subscription tiers (or
3 of the set) names and levels were fine"*, and **all five as the set stands.**

**They are one artisan's recurring ware at one artisan's stall — not a platform
product.** The platform takes its 10% from them exactly as from a $3.33 compass,
and 30% of that returns to the pool exactly as from a $3.33 compass.

### The five rows

Five recurring `wares` rows, `ware_type = 'service'` (`database.types.ts:7184` —
the honest fit for a rung today), `residual_pool_percent = 50`,
`artisan_profile_id` = KP's seat, each month. Carried whole from the door KP
retired: `domains/hephaestus/donations/DonationTiers.tsx:39–45`. **Names, amounts
and icons carry over; the donate descriptions do NOT** — they were the platform
describing its own budget, and one of them says *creator*.

| rung | each month | fee → pool · machine | profit → pledged · to the one contributor |
|---|---|---|---|
| 🕯️ Supporter | $10.00 | $1.00 → $0.30 · $0.70 | $9.00 → $4.50 · $4.50 |
| 🛡️ Guardian | $25.00 | $2.50 → $0.75 · $1.75 | $22.50 → $11.25 · $11.25 |
| 🌿 Steward | $50.00 | $5.00 → $1.50 · $3.50 | $45.00 → $22.50 · $22.50 |
| 🔮 Visionary | $100.00 | $10.00 → $3.00 · $7.00 | $90.00 → $45.00 · $45.00 |
| 👑 Sovereign | $250.00 | $25.00 → $7.50 · $17.50 | $225.00 → $112.50 · $112.50 |

**Equal weight, always.** No rung marked popular, recommended or best value; none
drawn larger or brighter. The plate shows Supporter only because a plate has to
show one price, and the caption says exactly that.

**One calm line each — drawn copy, marked as KP's to strike:** *"A small steady
thing, month by month."* · *"A little more, in a month when there is a little
more."* · *"For a month with room to spare, and no month after it is owed."* ·
*"For someone who wants the long build to have a floor under it."* · *"The
largest rung in the set, here because the set has one."* Heading: *"Standing at
this loom"*. Also drawn: **"No rung buys anything another does not. There are no
perks, no badges, no early access and no name on a wall — the only difference
between the five is the amount."** All of it strikeable in one word from KP.

**The verbs:** *"Stand with it — $10.00 each month"* · *"It renews each month
until you end it, and ending it takes one press. Nothing is charged before a
renewal and nothing is charged after it ends."* **Never *Subscribe*, never
*Support*, never *Become a member*.**

### Stripe

- **`mode: 'subscription'`** on the checkout route, **branched on the ware's
  recurrence**. `checkout/route.ts:129` is `mode: 'payment'` with inline
  `price_data` (`:117–128`). **The `payment` path is untouched** for one-time
  wares; the branch adds the subscription path beside it.
- **One Stripe Price per rung**, recurring monthly, created **by KP's hand in the
  Stripe dashboard** (or by KP running a one-off script) — **a lamp creates no
  Stripe object.** The build reads the id; it never mints one.

### Where the Stripe Price id is stored — the honest minimum, and what waits

| | Ships without SQL | Waits on the DRAFT |
|---|---|---|
| **Recurrence flag** | `wares.metadata.recurring = { interval: 'month' }` — `metadata` is `Json \| null` (`database.types.ts:6559`), untyped, unvalidated | a recurring value on `pricing_model`, **or** an interval column on `wares` (§8) |
| **Stripe Price id** | `wares.metadata.stripe_price_id` | a typed `wares.stripe_price_id` column |
| **Renewal idempotency** | **nothing honest ships without SQL.** `exchanges` has no invoice column in its 18 (`:2056–2073`), so a re-fired `invoice.paid` would insert a second row for one payment | `exchanges.stripe_invoice_id`, **unique** (§8) |

**The decision, stated plainly: the recurrence flag and the Price id SHIP
WITHOUT SQL, in `metadata`. Renewal idempotency WAITS on the DRAFT.** The reason
is not convenience: a price the base cannot type is a price the ledger cannot
prove (the ground that declined `DeclinedOneWareManyPrices`), and `metadata` is
tolerable for a **pointer to Stripe** — which Stripe is the authority on anyway —
but intolerable for **money the ledger must prove**. And a renewal that can be
written twice is a payment counted twice, which is the one thing KP's *"checkout
captures nothing twice"* forbids.

**Consequence, printed so nobody discovers it: until KP runs the DRAFT, the
recurring road can be built and walked in Stripe test mode, but the
`invoice.paid` handler must refuse to insert without `stripe_invoice_id` and log
plainly rather than write an unprovable row.** The build ships the handler
guarded that way and the return says so.

### The Sanctum's "standing with" view

- **"You are standing with this."** — the rung, its amount, the next date, read
  from Stripe.
- **End it — one press.** No confirmation interstitial, no retention offer, no
  *"are you sure you want to lose…"*, no downgrade funnel, no exit survey, no
  support ticket. It runs to the end of the month already paid for and then
  stops.
- **Change the rung** = **end one, begin another, on the same Stripe customer.**
  Each rung is its own `wares` row and its own Price; there is no in-place
  upgrade path and none is built.
- **No month is numbered.** No *"you have stood with this for 7 months"*, no
  total-given figure, no anniversary, no badge. A streak is a thing a person can
  break.

### The seeding — KP's hand, after the SQL

**KP ⚛: *"we build the method then worry about seeding."*** The five rows are
**not** inserted by this build. The exact INSERT is printed in §8 as a DRAFT
block, never run by a lamp.

- [ ] **CHECK T-1** — a ware carrying the recurrence flag opens a Stripe session
      in `mode: 'subscription'`; a ware without it opens `mode: 'payment'`
      exactly as today. *(CDP: two walks, the Stripe session objects read back)*
- [ ] **CHECK T-2** — the five rungs render at equal weight, none marked, none
      larger. *(CDP screenshot + a computed-style comparison across the five)*
- [ ] **CHECK T-3** — each rung's split renders to the cent, matching §6's
      table. *(CDP screenshot of all five plates)*
- [ ] **CHECK T-4** — *End it* is one press from the standing-with view, with
      nothing between the press and the ending. *(CDP walk)*
- [ ] **CHECK T-5** — *Change the rung* ends one and begins another on the same
      customer. *(CDP walk; the Stripe customer read back)*
- [ ] **CHECK T-6** — with a rung already held, its stall shows the standing-with
      state and **no** second *Stand with it*. *(CDP)*
- [ ] **CHECK T-7** — no months-stood count, total-given figure or anniversary
      appears anywhere. *(grep + CDP)*
- [ ] **CHECK T-8** — without `exchanges.stripe_invoice_id`, `invoice.paid`
      refuses to insert and logs plainly. *(fire the event on the un-migrated
      base; no row written)*

---

## 7 · THE OWNER'S SHELF, AND RLS

**KP ⚛ 2026-08-24, verbatim, spelling kept:** *"be certain a vessel can view
their own works and wares regarless of publish status, so they can edit the
items."*

It does not soften the earlier default — it **bounds** it. `status = published`
is the stall, and **the stall is what VISITORS see**.

### The read

Scoped by ownership and **by nothing else**:

- `wares where created_by = <vessel>` (`database.types.ts:6552`), **or**
  `artisan_profile_id` / `merchant_profile_id` in the vessel's own profiles
  (`:6549` · `:6558`).
- `works where created_by = <vessel>` (`:6695`), or `artisan_profile_id`
  (`:6692`).
- **No status filter is passed at all.** The visitor's square keeps
  `status=published` exactly as it is (`CreationsGallery.tsx:40`).
- **A contributor is not an owner.** `ware_participants` / `work_participants`
  say who stood on a thing, not who may edit it. **Standing on a ware shows it
  to you; it does not open it.** Participated-in rows may be listed on the shelf,
  clearly marked, with **no Edit door**.
- **The Edit door already exists.** `checkOwnership(userId, 'wares', id)` guards
  PUT and DELETE (`plutus-economics/wares/[id]/route.ts:49 :88`), and
  `/bazaar/studio/[id]` is the room. Nothing new is needed for editing — only
  for **finding**.

### The check that runs FIRST, before a line of the shelf is written

**The generated route scopes nothing itself** — it applies whatever `eq` filters
arrive and hands the rest to the base (`plutus-economics/wares/route.ts:21–27`).
So whether a maker can read their own draft is **entirely an RLS fact**, and
**no select policy for `wares` or `works` exists anywhere in
`AudHDities/docs/sql/`** — verified 2026-08-25 by grep over the whole drawer
(27 files). Whether one exists live in the base is **unread; no lamp reads the
live base**.

- [ ] **CHECK RLS-1 — THE FIRST ACT OF THIS ROOM.** A signed-in vessel reads one
      of **their own draft rows** through the app's own door:
      `GET /api/generated/plutus-economics/wares?created_by=<self>` with a draft
      row present, and the same for `works`. *(CDP with a real session; the JSON
      in the return)*
  - **If the row comes back** — the shelf is built and nothing joins the DRAFT
    on this account.
  - **If it does not** — the policy joins §8's DRAFT (owner-select on both
    tables, plus a visitor published-only read if none exists), **and the shelf
    prints the could-not-be-read state, never "nothing here."**

**The could-not-be-read state, NEW copy:** *"Your loom could not be read just
now."* / *"Nothing is lost — this is a door that has not been opened yet, not an
empty shelf."* It is the difference between a locked door and an empty room, and
a room that says "nothing here" when the answer is "I was not allowed to look"
has told a vessel their work is gone.

- [ ] **CHECK RLS-2** — the shelf's request carries no `status` parameter.
      *(network log in the CDP walk)*
- [ ] **CHECK RLS-3** — a draft row appears on its owner's shelf and **not** in
      the visitor's square. *(two CDP walks, one signed in as the owner, one
      signed out)*
- [ ] **CHECK RLS-4** — a participated-in row shows with no Edit door. *(CDP)*
- [ ] **CHECK RLS-5** — a walled read prints the could-not-be-read state, not
      the empty state. *(force a 403/empty and screenshot)*

---

## 8 · `docs/sql/023-the-bazaar-refined-DRAFT.sql`

**One file, for KP's hand. NEVER RUN BY A LAMP.** The next number after
`022-the-dailies-DRAFT.sql`. It follows the new-table ritual
(`resonance-grammar/docs/sql/000-NEW-TABLE-RITUAL.md`): **plain statements, never
`do $$ … $$` blocks** · **`grant` before RLS** · **a policy takes no `to`
clause** — the false-empty that seed 009 healed across seven tables came from a
policy whose role list said `{authenticated}` · **verify through the PUBLIC
door, not the service key** · **enums bite at insert time.**

### The statement list, in order

**STEP 1 — the recurrence. ONE of two; the spec picks, the other is printed.**

**PICKED: an interval column on `wares`.**

```sql
alter table public.wares add column if not exists billing_interval text;
comment on column public.wares.billing_interval is
  'NULL = a one-time ware (every ware today). ''month'' = a recurring ware:
   the Exchange opens Stripe in subscription mode and each renewal writes one
   more exchanges row. Deliberately NOT a new pricing_model value - a rung is
   a fixed price that repeats, not a fifth way of pricing.';
```

**Why this one, and not a recurring `pricing_model` value:** `pricing_model` is
`free · fixed · pay_what_you_want · patronage_only`
(`database.types.ts:6876`, runtime list `:7143`) — four **ways of setting a
price**. A rung is priced `fixed`; what differs is that it repeats. Adding
`recurring` to that enum would make the four values answer two different
questions, and — the practical half — **adding a value to a Postgres enum
touches every switch that reads it**: `StudioCreate.tsx:34–41`,
`StudioEdit.tsx:33–40`, `checkout/route.ts:62 :65 :73`,
`CreationDetail.tsx:34`, plus the generated validators and enum maps
(`src/lib/generated/validators/plutus-economics/wares.ts`,
`src/lib/generated/supabase/enum_mapping.ts`) which **only a GAIA regen may
change**. A nullable text column adds a fact without moving an enum.

**PRINTED, NOT PICKED — the other reading:**

```sql
-- alter type public.pricing_model add value if not exists 'recurring';
-- Then: every switch above gains a branch, the validators and enum maps are
-- REGENERATED (never hand-edited), and enum values cannot be dropped once
-- added - the rollback is a new type and a table rewrite.
```

**STEP 2 — the invoice id, unique. The renewal's idempotency.**

```sql
alter table public.exchanges add column if not exists stripe_invoice_id text;
create unique index if not exists exchanges_stripe_invoice_id_key
  on public.exchanges (stripe_invoice_id)
  where stripe_invoice_id is not null;
comment on column public.exchanges.stripe_invoice_id is
  'One renewal, one row. The unique index is what makes a re-fired invoice.paid
   webhook write nothing twice. NULL for every one-time exchange.';
```

*(A partial unique index rather than a unique constraint, so the eighteen
existing one-time rows and every future one keep a NULL here without colliding.)*

**STEP 3 — the Stripe Price id, typed (optional; the build ships without it).**

```sql
-- alter table public.wares add column if not exists stripe_price_id text;
-- Ships without this: the id lives at wares.metadata.stripe_price_id.
-- With it, the pointer is typed and the metadata copy is dropped.
```

**STEP 4 — the doors on `wares` and `works`. Run the read (CHECK RLS-1) FIRST.**

```sql
-- Only if CHECK RLS-1 came back walled.
grant select on public.wares to anon, authenticated;
grant select on public.works to anon, authenticated;

alter table public.wares enable row level security;
alter table public.works enable row level security;

drop policy if exists "wares on the stall are readable by anyone" on public.wares;
create policy "wares on the stall are readable by anyone"
  on public.wares for select
  using (status = 'published');

drop policy if exists "a maker reads their own wares at any status" on public.wares;
create policy "a maker reads their own wares at any status"
  on public.wares for select
  using (auth.uid() = created_by);

drop policy if exists "works on the square are readable by anyone" on public.works;
create policy "works on the square are readable by anyone"
  on public.works for select
  using (status = 'published');

drop policy if exists "a maker reads their own works at any status" on public.works;
create policy "a maker reads their own works at any status"
  on public.works for select
  using (auth.uid() = created_by);
```

**Two select policies on one table are OR'd** — a visitor gets published rows, a
maker gets published rows **plus** their own at any status. **No `to` clause on
any of them.** *(A profile-held row — one whose `created_by` is not the vessel
but whose `artisan_profile_id` is the vessel's own seat — is **unwritten — his to
rule**: a second `using` clause joining `artisan_profiles` would cover it, and it
is printed here and not written, because the seeded rows all carry
`created_by`.)*

**STEP 5 — the three identifier renames. SEPARATE, OPTIONAL statements.**

**Renaming an enum value is a real migration.** `alter type … rename value` is
supported, but it is **not** reversible by a lamp, and it moves every place the
value is read: the generated validators and enum maps
(`src/lib/generated/supabase/enum_mapping.ts`,
`src/lib/generated/validators/**`) — **regenerated by GAIA, KP's tool, never
hand-edited** — and, for `user_role`, the Loom's own gate at
`StudioCreate.tsx:69`. **The rename and the gate move in the same motion or the
Loom shuts.**

```sql
-- 5a - application_type (database.types.ts:6847, list :7112).
--      Read at themis's application gate - another realm's door.
-- alter type public.application_type rename value 'creator' to 'artisan';
-- alter type public.application_type rename value 'vendor'  to 'merchant';

-- 5b - user_role (database.types.ts:6906-6912, list :7175).
--      MOVES TOGETHER WITH StudioCreate.tsx:69 roles.includes('creator').
-- alter type public.user_role rename value 'creator' to 'artisan';
-- alter type public.user_role rename value 'vendor'  to 'merchant';

-- 5c - artisan_profiles.total_creations (database.types.ts:462).
--      Rendered nowhere after this pass; the name outlives the tile.
-- alter table public.artisan_profiles rename column total_creations to total_wares;
```

**STEP 6 — `subscription_tier`: unwritten — his to rule.**

```sql
-- subscription_tier = community | ally | council | corporate
--   (database.types.ts:6905, list :7174). No column anywhere uses it.
-- It is NOT the ruled set (Supporter/Guardian/Steward/Visionary/Sovereign).
-- Two ladders should not stand in one base. Whether it is retired is KP's:
-- drop type if exists public.subscription_tier;
-- PRINTED, NOT DECIDED.
```

**STEP 7 — the bucket is NOT here.** A storage bucket is created through the
storage API, not SQL — the house's own precedent says so
(`docs/sql/012-the-avatars-bucket.sql:1–23`, a record of applied work). **The
wares bucket is KP's hand, not yet created**, and this DRAFT neither creates nor
assumes it.

**STEP 8 — the five rungs, as a DRAFT block, never run by a lamp.**

```sql
-- SEEDING IS KP'S HAND, AFTER THE MIGRATION. Replace <artisan_profile_id> and
-- <kp_user_id> with the real ids, and each <price_...> with the Stripe Price
-- created by your own hand in the dashboard.
insert into public.wares
  (name, slug, description, ware_type, pricing_model, price, currency,
   residual_pool_percent, billing_interval, status, created_by,
   artisan_profile_id, icon_emoji, metadata)
values
  ('Supporter','supporter','A small steady thing, month by month.',
   'service','fixed',10.00,'usd',50,'month','published',
   '<kp_user_id>','<artisan_profile_id>','🕯️',
   '{"stripe_price_id":"<price_supporter>"}'::jsonb),
  ('Guardian','guardian','A little more, in a month when there is a little more.',
   'service','fixed',25.00,'usd',50,'month','published',
   '<kp_user_id>','<artisan_profile_id>','🛡️',
   '{"stripe_price_id":"<price_guardian>"}'::jsonb),
  ('Steward','steward','For a month with room to spare, and no month after it is owed.',
   'service','fixed',50.00,'usd',50,'month','published',
   '<kp_user_id>','<artisan_profile_id>','🌿',
   '{"stripe_price_id":"<price_steward>"}'::jsonb),
  ('Visionary','visionary','For someone who wants the long build to have a floor under it.',
   'service','fixed',100.00,'usd',50,'month','published',
   '<kp_user_id>','<artisan_profile_id>','🔮',
   '{"stripe_price_id":"<price_visionary>"}'::jsonb),
  ('Sovereign','sovereign','The largest rung in the set, here because the set has one.',
   'service','fixed',250.00,'usd',50,'month','published',
   '<kp_user_id>','<artisan_profile_id>','👑',
   '{"stripe_price_id":"<price_sovereign>"}'::jsonb);
```

**The enum bite, named before the insert** (ritual lesson 3): `ware_type` must be
one of `physical · digital · service` (`database.types.ts:7184`) — `service` here;
`pricing_model` one of `free · fixed · pay_what_you_want · patronage_only`
(`:7143`) — `fixed` here; `content_status` one of `draft · published · archived`
(`:7113`) — `published` here. **One unlawful value 400s the whole batch.** The
member listing, when in doubt:

```sql
select t.typname, e.enumlabel from pg_type t
  join pg_enum e on e.enumtypid = t.oid order by t.typname, e.enumsortorder;
```

**STEP 9 — verify through the PUBLIC door**, not the service key: an anon read of
`wares` returns the published rows, and a signed-in maker's read returns their
drafts. A count of zero right after a successful write means **check the policy
before doubting the write** (ritual lesson 1).

---

## 9 · THE DELIVERY — the app stall

**KP ⚛ 2026-08-24, ruled, verbatim in the brief:** `status = published` is the
stall · **one `works` row + one `wares` row per app carrying all its bodies** · **a
`file_registry` row per body** · **APK + MSI + NSIS on the stall, the AAB for
Play** · `showBigotTax` retired.

### One body, one `file_registry` row

`file_registry` (hephaestus-infrastructure), 19 columns at
`database.types.ts:2176–2194`, already generated, validated and routed
(`src/app/api/generated/hephaestus-infrastructure/file_registry/route.ts`) — and
**it has zero callers anywhere in the app**, verified 2026-08-25. The delivery's
door is built and nobody has walked through it.

| Column | Value |
|---|---|
| `name` | `resonance-compass-v2.3.6.apk` |
| `bucket_name` | **the bucket KP creates — not yet created; KP's hand** |
| `storage_path` | `compass/2.3.6/resonance-compass-v2.3.6.apk` — **proposed**: app / version / filename, so a new version never overwrites a body someone already paid for |
| `mime_type` | `application/vnd.android.package-archive` |
| `file_size` | the byte count |
| `file_hash` | sha256 of the byte stream — **proposed**; it is what lets a vessel check that what they got is what was offered |
| `related_table` | `'wares'` |
| `related_id` | the ware's id |
| `is_public` | **`false` for every body — proposed**, one road for gifted and exchanged alike |
| `status` | `published` |
| `access_token` | **`null` — the signed URL is minted at the ask, never stored** |

**`related_table` + `related_id` is untyped by design, which is why no schema
change is needed to hang bodies on wares.** That is the whole reason this table
is the answer rather than a new column.

**`storage_path`'s layout and `file_hash` are the canvas's plainest available
shapes, marked proposed — unwritten — his to rule, and built as drawn until he
rules otherwise. The `is_public = false` reading is likewise
unwritten — his to rule:** the column could carry the gifted/exchanged
distinction (public bytes for a free ware, private for a paid one). One road is
built because a gifted work is still *received*, and one signed-link path is one
thing to build, one thing to reason about, and one thing to get wrong.

### The four steps

| Step | What it is |
|---|---|
| 1 | The exchange completes — the webhook sets `status: completed`. **Already happens** (`webhook/stripe/route.ts:45–55`). |
| 2 | The success page asks the session route what was kept. **Already happens** — `kept: {kind, id, name}` (`session/[id]/route.ts:57 :86`). |
| 3 | **NEW** — that same route also returns the bodies: the `file_registry` rows where `related_table='wares'` and `related_id = kept.id`, each with a **signed URL minted on the ask**. |
| 4 | **NEW** — the same ask, from the stall, for a work already in the vessel's keeping. One road, two doors onto it. |

**The URL rides the spot the plan named.** `kept` is already where the success
page looks; the bodies join it there rather than arriving by a second route. No
new table, no new column on `wares`, no schema change. **FIX 31's ownership guard
must land before the delivery rides this route.**

### The bodies on the stall

**APK + MSI + NSIS. The AAB is withheld and the stall never mentions it** — it is
Play's upload artifact, not a person's download (PLAN §5, reading
`RELEASE-STRUCTURE.md`). A stall that lists a file nobody can open is telling a
small lie.

**Three equal rows** — same height, same weight, in the order the shelf holds
them. No *"also available for"*. Desktop is never a footnote:
`RELEASE-STRUCTURE.md` via PLAN §5, both desktop bundles are release artifacts,
*"many people cannot use a phone for this"*.

**The version is read from the bundle's own filename, never typed.**

**The free ware's door:** a gifted ware's *Receive* runs the same delivery — no
exchange, no split shown, the bodies handed over. Today
`CreationDetail.tsx:148–149` renders *Receive* with nothing behind it.

**Nothing is seeded.** The bytes' road is
`resonance-assets/releases-current/<app>/bundle/` → a Supabase storage bucket
**not yet created**, KP's hand. The five apps and their prices are on record
(PLAN §5, KP's own word) and **no hand reads the beacons register for them** —
that register is KP's, in the knowledge base, and stays out of every sending.

- [ ] **CHECK D-1** — a completed exchange's success page lists the ware's
      bodies from `file_registry`, each with a minted signed URL. *(CDP walk;
      the URLs' expiry read from the response, not asserted from memory)*
- [ ] **CHECK D-2** — `access_token` is never written. *(read the rows back)*
- [ ] **CHECK D-3** — the bodies are re-askable from the stall after the fact.
      *(CDP: return to the stall as the buyer, ask again, get a fresh URL)*
- [ ] **CHECK D-4** — a gifted ware's *Receive* hands over the bodies with no
      split shown. *(CDP)*
- [ ] **CHECK D-5** — no `.aab` appears in any response or any rendered list.
      *(grep the DOM and the JSON)*
- [ ] **CHECK D-6** — the expiry is said as a fact about links, with the way back
      in the same breath, and never as a clock. *(read the rendered copy)*

---

## 10 · VERIFY LENSES

Three Sonnet lenses in parallel, each refuting by default. A refuted check
returns to B.

### The law lens

- [ ] **L-1** — opt-in everywhere: no pre-checked box in the realm; the publish
      toggle is a state, not a permission; `is_public` defaults false in the base.
- [ ] **L-2** — anti-scarcity: no countdown, no stock counter, no *"only 3
      left"*, no restock promise, no urgency word anywhere in the realm's copy.
- [ ] **L-3** — the refusal column (E4 §6) checked board by board: Gruen ·
      streaks · leaderboards · pointsification · infinite scroll · endowed
      progress · *"customers also bought"* · basket-abandonment recovery ·
      exit-intent · the cancellation maze · the supporter streak · the
      reciprocity ledger. **Each named, each absent.**
- [ ] **L-4** — the four retired counts (③) and `quantity_sold` render nowhere.
- [ ] **L-5** — the verb pair holds: *Receive* · *Bring home* · *Stand with it*.
      No *Buy*, no *cart*, no *purchase*, no *Subscribe*, no *Download*, no
      *Cancel subscription*.
- [ ] **L-6** — law 7 holds and is true: PriceBreakdown renders before the
      gesture, unfolded, computing §4's model from the ware's own row.

### The truth lens

- [ ] **T-1** — no constant is dressed as a heartbeat. Every figure on a page is
      read from a row, a file's own name, or computed by `split.ts` — never
      typed.
- [ ] **T-2** — every fetch lands on a living door. The works fetch, the
      `file_registry` fetch, the ledger read: each named with its generated
      route file.
- [ ] **T-3** — empty states honest: *"waiting for stars to align rather than
      missing data"*; no count of what is missing; the skeleton is never the
      resting state.
- [ ] **T-4** — the ledger rows sum to the gross to the cent on every walked
      exchange (§4's invariant, §5's rows).
- [ ] **T-5** — the shelf's could-not-be-read state is distinguishable from its
      empty state (§7).
- [ ] **T-6** — no claim about another company survives without a source
      (FIX 26; PriceBreakdown's superlative already retired at `:72–73`).

### The a11y lens

- [ ] **A-1** — text carries on the ground, never on the realm hue; the 0.3 wash
      law holds in every room, measured on the rendered pixels. **⑥'s home wash
      is the one to measure twice.**
- [ ] **A-2** — every interactive thing is a real control with a name: each
      body's *Take it* and each *Remove* names its own file; the eye glyphs stay
      `aria-hidden`.
- [ ] **A-3** — keyboard: one tab order per room, a visible focus ring on every
      stop, one link per card with nothing nested, no hover-only affordance.
- [ ] **A-4** — reduced motion stills the wash to nothing and removes every
      transform (①'s `group-hover:scale-110` is the one to check).
- [ ] **A-5** — `role="status"` on every card that announces a change
      (`CheckoutForm.tsx:225 :230`, kept).
- [ ] **A-6** — zero mojibake renders anywhere in the realm; no file in the realm
      carries a UTF-8 BOM.

---

## 11 · THE TELLING OWED AT G

Same sitting as KP's merge:

1. **A `## FROM:` post on `src/app/(hermes)/REALM-BUS.md`** — append-only,
   signed, naming: the words' renames landed · the ledger rows and their
   idempotency key · the tiers' road and what waits on the DRAFT · the shelf and
   the RLS answer CHECK RLS-1 returned · the odd-cent constant and that it is
   KP's to move.
2. **A `docs/CHECKLIST.md` row**, in the landed-pass pattern of rows 93–98:
   `| 2026-08-25 | THE BAZAAR, REFINED (hand; KP's ⚛ word verbatim) … meters
   tsc 0 · build 0 … |`.
3. **A `docs/UX-REFINEMENT-LOG.md` seam-note** — the four seams this pass
   touched or declined to touch: hestia (THE HANGING, left as built; the
   ConstellationContent links moved with the rename) · themis (the application
   gate, pointed at, untouched) · auth (the intent stash, untouched) · plutus
   (the split, now one function).
4. **`HANDOFF.md` regenerated** — the handoff-tender's LAND for this repo, from
   its own ground. Never hand-written.
5. **`PROOF.md`'s step table closed** with the merge hash (step C).
6. **The proof folder stays where it was born** — lose-nothing; no purge
   (RULED §9·4).

---

## 12 · UNWRITTEN — HIS TO RULE (the index)

Fourteen. **None is built as though ruled.** Each is printed where it lands and
listed here so one word from KP closes it. Thirteen carry the phrase in place;
the first is marked differently in place and on purpose — it is an assumption
carried at his own question, not a silence.

1. **The Loom's one-form shape** (§1) — **the conductor's assumption, his to
   strike**: carried at KP's own question, the lean given, not contradicted at
   the build word. Printed as an assumption everywhere it appears, never as a
   ruling.
2. **Where a ware's descent from a work is recorded** (§1) —
   `metadata.from_work_id` or a typed column; nothing recorded until ruled.
3. **FIX 10** (§3②) — the square's subtitle rewrite; the old line is good.
4. **FIX 26** (§3⑥) — whether the industry-comparison row is kept with a source.
5. **A vessel buying their own ware** (§3⑥) — neither blocked nor special-cased.
6. **`residualPoolPercent` in Stripe metadata** (§3⑥) — provenance on the row, or
   nothing.
7. **THE ODD CENT** (§4) — four candidate rules printed; the invariant holds
   whichever is ruled; (a) ships behind one named constant.
8. **Whether the pool balances are incremented or derived** (§5) — the build
   writes ledger rows only.
9. **Where a subscription's id and its ended-ness are stored** (§5) — Stripe read
   at render time until a column exists.
10. **`merchant_profiles.vendor_name`** (§2e) — whether it joins the rename.
11. **A profile-held row's own select policy** (§8, step 4) — printed, not
    written.
12. **`subscription_tier`** (§8, step 6) — retired or kept; printed, not decided.
13. **`file_registry.is_public`** (§9) — one road for both, or the
    gifted/exchanged distinction.
14. **`storage_path`'s layout and `file_hash`** (§9) — the plainest available
    shapes, marked proposed.

---

*Drawn 2026-08-25 by an Opus spec hand, `claude-opus-5[1m]`, at the conductor's
sending. Read whole by one Sonnet skeptic before B opens. Nothing under `src/`
was touched to write it; no SQL was run; the live base was not read.*

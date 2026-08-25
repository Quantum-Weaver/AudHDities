# SPEC 04 — (athena), the Library

*Drawn 2026-08-25 by an Opus spec hand at the conductor's sending, from the
approved canvas at `.journals/proofs/04-athena/design/` (artifact 📚
`https://claude.ai/code/artifact/a29f7d68-ad96-4289-bb97-ddbb50eaab72`). The
eye was given at KP's ⚛ word, verbatim: **"library proofs are good"**. The
build word is KP's and is **not yet spoken** — this spec is written now and
waits on it.*

**How to read this.** Every line carries an address. A `[ ]` is a printed
check the build must be able to answer with proof. **REWRITE** copy is
verbatim from the boards and is not to be improved. Where the record is
silent the line says **unwritten — his to rule** and the build builds
nothing on it. Fix lines, never findings: each names the file, the line and
what lands there.

**Size:** 75 KB — over the 40 KB aim, said plainly. Eight movements across
fifteen routes, 78 printed checks, every line carrying an address; the
ceiling was the aim and completeness the rule.

---

## 0 · SCOPE

The Library's **frame**, built to the approved canvas. KP's ⚛ build law,
2026-08-24, verbatim, spelling kept:

> "i magine building the framework for each of the next realms before the
> features within is a good approach, as some features are cross referenced
> realm-wise. the game side of the vessel experience, not as vital as a
> functional bazaar, athena with contents, etc"

In this realm the frame and the contents are the same thing — a hall is only
a door until you can say what is behind it (board ①). The rooms are already
full; the pass makes them honest.

**In scope, eight movements:**

- **①** the hub — the seventh hall's card, *"Seven halls"* (ruled seven, plan
  §10, 2026-08-25), the Floating Stars card's *"earn points"* line trued.
- **②** the Path — *Begin Quest* made honest.
- **③** the Floating Stars — the play door as landed (`c8ebaebca`), the
  palette by rarity adopted, the a11y bones, the caps in words, the sidebar's
  subtraction removed, the reduced-motion mend; the card states, the sieve and
  the veil drawn but **gated** (§3 · A/B/C).
- **④** Courses and Lessons — a place kept without a score.
- **⑤** the Archive — the mythologies; the shelf, nothing invented.
- **⑥** the Honors — earned only; the full-catalog bug mended; no silhouettes.
- **⑦** the Dailies — the built hall's four fix lines; the three forms as
  **FRAMES ONLY**.
- **⑧** the ways and every empty state.

**Not in scope, named so the build does not drift into them:**

- The three 🚩 held for the second pass at KP's word — `completion_points`
  math · sigil award triggers · quest submission machinery
  (`docs/sql/008-the-library-first-seeds.sql:37–40`;
  `src/app/(athena)/README.md:116`).
- Second-pass features that cross realms (the garden, collections,
  companions, the hanging, the dailies' three remaining forms).
- The hestia-core machinery. Deity drift is **noted, never re-pointed** —
  `vessel_bubbles` · `collection_sets` · `vessel_config` · `vessel_sigils`
  live under `hestia-core` while their canon is athena's. The fix is
  resonance-gaia's, at KP's word, at a later time. The new columns in §7 land
  on the tables **where they stand**.
- Mnemosyne's *"Honors to Earn"*, which carries the same unfiltered-catalog
  bug from the same table. This pass is the pattern that room needs; it is
  **not** this pass's room.

**Branch:** `refine/athena-2026-08-25`, cut from `main` (clean, `e2a602b01`,
read 2026-08-25). The conductor merges `--no-ff` as it goes and deletes the
branch (plan §7, amended). No lamp runs SQL. The generated layer is never
hand-edited — heal by regenerating (`CLAUDE.md` §Essential Rules).

---

## 1 · THE GROUND EVERY ROOM STANDS ON

**One CSS theme. Print it and stop looking for a second.** `src/app/globals.css`
carries no `@theme`, no `:root` palette block, no `[data-theme]` and no
`prefers-color-scheme` block. `body` is fixed at
`background-color: var(--color-deep-space, #0C0F1D)` and
`color: var(--color-star-dust, #E0E0E0)` (`globals.css:32–39`). Colours mint
from `tailwind.generated.config.mjs` through the `@config` line landed
2026-08-24 (`docs/CHECKLIST.md:93`). **There is no light mode in this repo**
— every contrast figure in this spec is starDust on deepSpace, and a build
hand must not author a second theme block for a "light" state that does not
exist.

**The one global reduced-motion guard** is `globals.css:41–48`: it kills CSS
animation and transition *durations*. It cannot reach anything driven from
JS. That is why `DailiesHall.tsx:46–60` asks `matchMedia` directly and why
the game must (§3).

**The 0.3 wash law.** `EnvironmentLayer.tsx:46` holds `washOpacity = 0.3`;
the library triad over deepSpace at that ambient keeps starDust between
**9.13:1** and **7.01:1** (board ⑧, measured). Raised to 0.75 the near end
falls to **2.07:1**. **The wash is never raised anywhere in this pass.** Text
carries on the ground, never on the realm hue (`HANDOFF.md:62`).

**The contrast floor and the drawn heights.** `text-star-dust/40` = 3.18:1 ·
`/35` = 2.69:1 · `/30` = 2.30:1 · `/25` = 1.95:1 — all below 4.5:1. Nothing
under `/55` reaches 4.5:1. **Drawn: `/70` = 7.38:1 · `/78` = 8.99:1 · `/82` =
9.84:1.** The method reproduces `HANDOFF.md`'s own 14.4:1 and 12.3:1 exactly.

**The focus ring the realm already owns.** `BubblesGallery.tsx:117` —
`focus-visible:ring-2 ring-hearth-gold ring-offset-2 ring-offset-deep-space`,
**12.66:1**, landed with the play door. It is the realm's only visible focus
ring and it is the one every room reuses. No second ring is invented.

**The framer trap does not bite this realm.** The Forge's pass found rooms
that rendered blank under `prefers-reduced-motion` because a framer
`initial={{opacity:0}}` never resolved. Machine-read 2026-08-25: **zero**
`framer-motion` imports and **zero** `motion.` elements under
`src/app/(athena)/**` and `src/components/asgard/domains/athena/**`. The one
`motion.` element in the chrome above them is `EnvironmentLayer.tsx:63`, whose
opacity is a `style` value and never an `initial` — it is safe
(`:50–51, :63–85`). **The check is still printed** (§8) because "zero" is a
reading, not a promise.

**Every generated door clamps `limit` to 100.**
`src/lib/api/auth.ts:142–149` — `Math.min(100, Math.max(1, limit))`. A
request for 200 is served 100 **with no error and no signal**. This governs
three call sites in this realm and is the single most dangerous silent thing
in it (§7).

---

## 2 · ① THE HUB — `/library`

**Route:** `src/app/(athena)/library/page.tsx`
**Component:** `src/components/asgard/domains/athena/library/LibraryHub.tsx` (54 lines)
**Reads:** nothing. Stateless by design — `SECTIONS` is a module constant
(`:9–17`).

### States

| state | what stands |
|---|---|
| visitor | identical to signed-in — the hub knows nothing about anyone |
| signed-in vessel | identical. **This is the design, not a gap.** |
| empty | none possible; the seven cards are a constant |
| error | none possible; no fetch |
| reduced motion | `:40` `group-hover:scale-110 transition-transform` — unguarded today. Mended below. |
| theme | the one theme (§1) |

### The build

- **`LibraryHub.tsx:15`** — the Floating Stars description.
  **REWRITE, verbatim:**
  `'Collect bubbles and earn points'` → **`'Stars drift past. Pop what catches your eye.'`**
  *Earn points* is pointsification vocabulary, refused by name on E4's column,
  and it makes a hall about a score before you have opened it. Flagged twice
  before this pass (`REALM-BUS.md:436–440`).
- **`LibraryHub.tsx:29–31`** — the subtitle.
  **REWRITE:** `'Knowledge, quests, and honors await those who seek sovereignty.'`
  → **`'Seven halls, open. Wander at whatever pace the day allows.'`**
  The board drew *"Six halls, open"* on 2026-08-24; the seventh hall was built
  the same day and **seven is ruled** (plan §10, 2026-08-25). The rest of the
  sentence is the house's own, lifted from its own first quest
  (`docs/sql/008-the-library-first-seeds.sql:155`).
- **`LibraryHub.tsx:23–27`** — the pill reading *"The Archive"* **RETIRES**.
  It names a hall that is also the fourth card at `:13`; the `h1` at `:28`
  already says where you are.
- **`LibraryHub.tsx:45`** — `opacity-0 group-hover:opacity-100` on *Explore*.
  **Fix line: always visible, quiet.** On a phone it never appears; a keyboard
  walker meets a card whose next step is hidden. Drawn at `text-neurospark`
  without the opacity pair.
- **`LibraryHub.tsx:40`** — add `motion-reduce:transition-none` beside
  `transition-transform` (**ruled: mend**, 2026-08-24).
- **`LibraryHub.tsx:44`** — the description at `/50` (4.32:1) → **`/70`**.
- **NEW, proposed on the board — the six/seven inventory lines.** One quiet
  line per card saying what is on that hall's shelf: *six quests on the shelf*
  · *one course · six steps* · *six lessons, each with a body* · *one scroll,
  told whole* · *ten sigils forged — none awardable yet* · *thirty stars ·
  five collections* · **the Dailies' line is unwritten — his to rule** (the
  board drew the dailies card shut on 2026-08-24 and ⑦ did not draw an
  inventory line for it; the built shelf holds 140, and whether the hub says
  so is his). The counts are machine-read from `008` and re-read at build
  time; if the collections seed (§7) has run, the stars line is re-counted,
  never carried.
  **The line counts the house's work, never the reader's.**

### Printed checks — ①

- [ ] `tsc 0` after the room's commit.
- [ ] `npm run build` exit 0 **in the main tree** (Turbopack panics on a
      junctioned `node_modules` in a worktree — `HANDOFF.md:60`).
- [ ] CDP walk at `/library`, picture read: seven cards, the pill gone, the
      `h1` reading *The Library*, the subtitle reading *Seven halls, open.*
- [ ] Picture at `/library` with `Emulation.setEmulatedMedia` →
      `prefers-reduced-motion: reduce`: the page renders whole; the icon does
      not scale on hover.
- [ ] *Explore* visible in the still picture, with no pointer over any card.
- [ ] Keyboard walk: seven `Tab` stops, each a whole card, each showing the
      hearth-gold ring.
- [ ] Grep proof: `grep -n "earn points" src/components/asgard/domains/athena/`
      returns nothing.

### This room must NOT

Count halls visited · badge a first visit · offer *continue where you left
off* · imply an order or a first step · show any figure that counts the
reader rather than the shelf. (Declined whole and drawn:
`design/declined/DeclinedHallsVisited.dc.html`.)

---

## 3 · ② THE PATH — `/library/quests` · `/library/quests/[slug]`

**Routes:** `src/app/(athena)/library/quests/page.tsx` · `.../[slug]/page.tsx`
**Components:** `quests/QuestsGallery.tsx` (197) · `quests/QuestDetail.tsx` (106)
**Reads:** `useQuestsList` from
`src/lib/generated/hooks/athena-gamification/quests` —
`QUESTS_PARAMS` at `QuestsGallery.tsx:26–31` (`status: 'published'`, sort
`display_order`, limit 100); the detail memoises `{ filters: { slug }, limit: 1 }`
at `QuestDetail.tsx:36`.

### States

| state | what stands |
|---|---|
| visitor / signed-in | identical — quests are invitations, and nothing is tracked either way |
| empty (gallery) | `QuestsGallery.tsx:139–148` — *"The path unfolds soon"* / *"New quests are being woven"* — **KEPT verbatim** |
| empty (search) | `:143, :146` — *"No quests match your search"* / *"Try a different search term"* — **KEPT** |
| empty (detail) | `QuestDetail.tsx:52–62` — *"This quest has not been written yet."* — **KEPT** |
| error | the hook's `error` is not rendered; the room falls to the empty state. **False-empty risk named in §7.** |
| reduced motion | `:104, :117` `transition-all` on the type chips, unguarded — mended |

### The build

- **`QuestDetail.tsx:99`** — **RETIRE `Begin Quest`.** The button has no
  `onClick`; a vessel presses it, nothing happens, and the room has told them
  they failed at something. **Nothing replaces it** — the objectives become
  the doors.
- **`QuestDetail.tsx:87–96`** — the objectives block becomes the walk.
  **REWRITE, verbatim:** `'Objectives'` → **`'Where this goes'`** (`:89`).
  Five of the six seeded quests spell their steps as places (*Visit the
  Path*, *Open the Archive*, *Open your journal* —
  `008-the-library-first-seeds.sql:154–185`). Each string becomes a `Link`
  where the string names a room this app has; a string that names no room
  stays plain text. **The mapping from objective string to route is written
  in the component as a plain constant** (no fuzzy matching, no guessing):
  the six seeded quests' strings are read at build time, and any string
  without an exact match renders as it does today. Two of the doors leave the
  realm (the garden, the journal) and are ordinary `Link`s.
- **`QuestDetail.tsx:100`** — the `Back` button stays.
- **`QuestsGallery.tsx:104, :117`** — add `motion-reduce:transition-none`.
- **Contrast:** `QuestsGallery.tsx:83` (subtitle, `/40`) and every card
  description at `/50` → **`/70`**; the empty state's second line at `:145`
  (`/30`) → **`/70`**.
- **`QuestsGallery.tsx:35`** — `useState<string | null>(null)`: nothing
  pre-chosen. **Kept as it stands** — the opt-in law already held here.

### Printed checks — ②

- [ ] `tsc 0` · build 0.
- [ ] CDP walk at `/library/quests`: six cards, picture read.
- [ ] CDP walk at `/library/quests/walk-the-six-halls` (or the first seeded
      slug read from the door that day): **no `Begin Quest` in the DOM**,
      *Where this goes* heading present, at least one objective rendered as an
      anchor with a real `href`.
- [ ] Every rendered objective anchor's `href` resolves 200 on the walk (the
      two that leave the realm included).
- [ ] Reduced-motion picture at both routes: page whole, chips still.
- [ ] Grep proof: `grep -rn "Begin Quest" src/` returns nothing.

### This room must NOT

Show a quest log with a count · *3 of 6 complete* anywhere · a daily or weekly
quest that expires · a recommended-next quest · a quest that unlocks another ·
a reward shown before the doing. The seeded `rewards` Json exists and stays
**deliberately unrendered** (`QuestsGallery.tsx:14–16`). No submission
machinery is wired, proposed, or assumed — 🚩 held.

---

## 4 · ③ THE FLOATING STARS — `/library/bubbles` · `/[slug]` · `/play`

**Routes:** `src/app/(athena)/library/bubbles/page.tsx` ·
`.../bubbles/[slug]/page.tsx` · `.../bubbles/play/page.tsx`
**Components:** `bubbles/BubblesGallery.tsx` (197) · `bubbles/BubbleDetail.tsx`
(124) · `bubbles/BubblePopGame.tsx` (542) · `bubbles/BubbleLimitSlider.tsx`
**Reads:** `useBubblesList` (`athena-gamification/bubbles`) ·
`useCollectionSetsList` (`hestia-core/collection_sets`) · the game fetches
four doors directly (`:125, :138, :139, :166`) and POSTs one (`:288`).

**The play door is BUILT and MERGED.** `BubblesGallery.tsx:115–123`, its
street row at `the-street.ts:86–90`, landed on
`mend/floating-stars-play-door-2026-08-25` and merged at `c8ebaebca`. Nothing
in this pass re-proposes it; the line numbers above are main's own.

### The three gates — what ships, and on what

**A · Ships now. No SQL, no further ruling.**

1. **The palette by rarity, adopted.** The five-row map is written three
   times: `BubblesGallery.tsx:23–27` · `BubbleDetail.tsx:24–28` ·
   `BubblePopGame.tsx:75–79`. The Tailwind class maps beside them carry the
   same red by another name: `rose-500` at `BubblesGallery.tsx:35` and
   `BubbleDetail.tsx:36`.
   **Adopt the app's five cosmic tokens:** common `void.light` `#B2BEC3` ·
   rare `neurospark` `#22D3EE` (agrees already) · epic `quantum.light`
   `#7D6CEA` · legendary `hearth.gold` `#FDCB6E` · mythic `entity.curator`
   `#E84393`.
   **The mythic move is the one law**, and it is the only one of the four that
   is: `#f43f5e` is rose-500, and the app moved mythic off exactly that colour
   on 2026-08-10 — *"Mythic wears the curator's magenta, not the old rose: no
   red anywhere"* (`resonance-bubbles/src/lib/bubbles/dress.ts:39–40`) against
   its standing rule *"No streaks, no combos, no timers shown, **no red
   anywhere**"* (`resonance-bubbles/CLAUDE.md:34`).
   Measured either way, all five clear 4.5:1 on deepSpace: mythic 5.19 → 5.13
   · common 7.43 → 10.03 · epic 4.82 → 4.72 · legendary 8.88 → 12.66.
   **Where the map lives is unwritten — his to rule** (one shared module, as
   `dress.ts` is for the app, or three copies). Until he rules, **the build
   changes the values in all three files and leaves the shape alone** — it does
   not invent a new module in this pass.
2. **The caps, spoken in words** (KP's ruling: *the bubble cap speaks in
   words, no bar*). A panel in the play room saying all four, in the room's
   own built numbers: *It stops at five hundred points in a day* — that number
   is yours, move it or set it to nothing (`DEFAULT_DAILY_MAX 500`, `:66`) ·
   *a hundred pops in an hour* (`DEFAULT_HOURLY_MAX 100`, `:67`) · *after a
   quarter of an hour it pauses the room and asks you to breathe* (`:245–249`)
   · *at fifty pops it says the same thing once* (`:301`). Nothing invented,
   nothing rounded.
3. **The sidebar's subtraction goes** (KP's ruling: *the 3/6 sidebar goes*).
   **RETIRE:** `BubblePopGame.tsx:501` `Daily {n}/{max}` · `:504` *"Daily
   progress"* · `:505` the `Progress` bar · `:518` `{c.collected}/{c.total}`
   · `:520` the per-collection `Progress` bar. In their place: **the names of
   what you found**, grouped by collection — shape without slots.
4. **The reduced-motion mend** (**ruled**, 2026-08-24). `BubblePopGame.tsx`
   carries **no** `motion-reduce` anywhere: a `requestAnimationFrame` loop
   moving up to thirty objects (`:225–256`), `animate-ping` on every pop
   (`:426–427`), `hover:scale-110 active:scale-90` (`:405`).
   **Drawn:** under `prefers-reduced-motion` the loop keeps its spawn rhythm
   and loses its travel — a star fades in where it belongs, waits its while,
   and fades out; the pop mark becomes a still glyph that fades; the scale
   pair gets the guard. Same game, same rarities, same caps.
   **The room is never turned off under the guard** — that is refused by name.
   The guard is read the way the newest room already reads it:
   `DailiesHall.tsx:46–60` (`matchMedia`, with a `change` listener), because
   the CSS guard cannot reach a JS loop.
5. **The a11y bones.**
   - `BubblesGallery.tsx:173–190` — the card is a bare `<Link>` around a
     `Card` with no `aria-label` and no focus style. **Give it the ring at
     `:117` and a label** naming the star and what a press does.
   - `BubblesGallery.tsx:136–154` — the rarity and collection chips carry no
     `aria-pressed` and sit in no `role="group"`. **Add both**, with a
     labelled heading per group, and raise the chips' touch target from 30px
     to **44px**.
   - `BubblePopGame.tsx:405` — `focus:outline-none` with nothing in its place.
     **Replace with the hearth-gold ring.** The stars already carry a real
     `aria-label` (`:418`).
6. **The fold.** The gallery's filter and sort row is drawn **closed by
   default** (the app draws it so — `gallery/+page.svelte:60`). Sort orders
   are **not added in this pass** (they need the per-vessel read for two of
   the four; the other two are build-only and unwritten).
7. **Contrast, six lines in the gallery:** `:108` (`/40`), `:122` (`/40`),
   `:162` (`/40`), `:132` (`white/40`, 3.80:1), `:137, :148, :152, :181`
   (`/50`), `:187` (`/30`, **2.30:1 — the faintest line in the realm**).
   **Drawn at `/70` and `/82`.** In the play room: `:372, :377` (`/40`),
   `:450, :467` (`/50`), `:471, :504` (`/30`) → `/70`.

**B · Ships only on KP's word. Buildable today; not built without it.**

The per-vessel read this whole group stands on **exists and answers today**
(§7) — the gate is his ruling, not the schema.

- **the veil** — whether an uncollected card dims, dashes, and keeps its
  sentence back behind *"··· pop to read ···"*.
- **the flip** — whether a popped card turns to show the star large, *"popped
  ×2"*, its collection and *"··· turn back ···"*. If it lands it lands with
  the app's guard: `motion-reduce:transition-none`, two faces, no rotation in
  depth (`gallery/+page.svelte:346`).
- **the sieve in words** — *all stars* / *collected* / *still drifting*, and a
  collection banner carrying accent, rule, dot, name and description **and
  nothing else**. The app's header tally `{n}/{total}` (`+page.svelte:189–193`)
  and its per-collection bar (`:311, :314–319`) **do not come across** — KP's
  2026-08-24 ruling took exactly those two shapes out of this realm.
- **the sieve's own readout** — the app prints `{n} of {total}` beside the
  sieve (`+page.svelte:224–227`). It counts the shelf, not the vessel, but it
  is still a fraction on a page where fractions were ruled out.
- **the search scope** — `BubblesGallery.tsx:76–77` searches name **and
  description**; the app searches name and collection only, which is what
  makes the veil hold (`searchIn`, `+page.svelte:106`).
- **the points on a card** — `BubblesGallery.tsx:184` `+{points}` and
  `BubbleDetail.tsx:109` `+{points} points`. The app never shows them in the
  gallery. A price tag on a star is not a count of the vessel, so no ruling
  closes it.
- **the word for waiting** — the app says *still drifting*; this realm's own
  empty state says *will appear*.
- **the ×N pill** — one row per pop is already written (`:288–297`), so a
  count of rows is derivable; whether a star may be met twice is a design
  fact, not a database accident.
- **the caps in the gallery** — whether the room holding the shelf says
  anything about the boundaries governing the room next door.

**C · Waits on the DRAFT SQL in §7.**

- The **eight** unseeded collections and the **ninety-three** unseeded stars.
- **Per-collection accents** (`starDust` · `hearth.gold` · `entity.chancellor`
  · `mystical.sun` · `mood.peaceful` · `mystical.moon` · `fire.base` ·
  `sanctuary.green` · `cosmic.blue` · `sanctuary.emerald`) and the two
  collection **palettes** (elemental's four pagan tokens; inclusive-pride's
  six).
- **Flag stripes inside the circle** with the chrome still the rarity's, and
  **the intersex ring** `#7902AA` — the one raw hex in the whole set
  (`orb.css:47–50`). Neither can derive from rarity, which is why `008`'s
  GATE 3 is named in §7.

### The play room's own states

| state | address |
|---|---|
| loading | `BubblePopGame.tsx:338–347` |
| **signed out** | `:349–359` — *"Sign in to play"* / *"Enter the Sanctuary"*. **REWRITE `:354`: `'Sign in to play'` → `'The stars are kept for vessels.'`** The link at `:355` was already right and is **KEPT**. |
| playing | `:361–541` |
| paused, by hand | `:434–442` — *"Paused"* / *"Resume"* — **KEPT** |
| the breath, at 15 min or 50 pops | `:445–459` — *"Take a breath"* and its message — **KEPT** |
| the day's boundary, met | `:462–489` — **REWRITE `:466`: `"You've reached your daily limit"` → `"Your day's boundary, met"`** and **REWRITE `:468`: `"You've collected {n} points today. Come back tomorrow for more stars!"` → `"You set this one yourself. The stars will still be here whenever you come back."`** *Come back tomorrow* is the appointment mechanic, refused by name. |
| the slider | `:470–485` — **KEPT**, and it is the one place a number belongs: it is the ask. *"Adjust your daily limit — the boundary is yours"* (`:471`) and *"0 — a rest day is a boundary too"* (`BubbleLimitSlider.tsx:95`) both **KEPT**. |
| **the header ratio** | **REWRITE `:377`: `'{daily_points} / {max_daily_points} today'` → `'Your own boundary: five hundred a day'`** — extent, not remainder. Where the vessel's own row answers with another number, the sentence says that number. |
| reduced motion | mended, above |

Also **KEPT verbatim:** *"Pop the Stars"* `:371` · *"Tap bubbles to collect
them"* `:372` (a true instruction — *collect* earns its place here) and the
same two on the play door `Gallery:120, :122` · *"Return to the Floating
Stars"* `:369` · *"Return to the Library"* `Gallery:103` · the Stars card
`:528–533` · *"Part of {collection}"* `BubbleDetail.tsx:115` · the shelf's
empty state `Gallery:162`, which board ⑧ ruled kept.
**CARRIED, not rewritten:** *"Collect bubbles and earn sovereignty"*
`Gallery:108` — the room's own long-standing line; whether it changes is his.

### The stranded ladder

`src/lib/utils/components/asgard/athena/bubble_limit.utils.ts` — 212 lines,
**zero importers**, holding `TIER_CEILINGS` for community / ally / corporate /
council, where epic, legendary and mythic have probability 0 for the free
tier. That is the exact thing KP's rarity ruling freed, and it is a fossil of
the ladder he retired 2026-07-31 (`BubblePopGame.tsx:2–9` records the
retirement). **Ruled retired 2026-08-24. The file is deleted this pass.**
Verify no importer exists before the delete and print the grep.

### Printed checks — ③

- [ ] `tsc 0` · build 0.
- [ ] Grep proof: `grep -rn "f43f5e\|rose-500" src/components/asgard/domains/athena/`
      returns nothing.
- [ ] Grep proof: `grep -rn "bubble_limit.utils" src/` returns nothing, and
      the file is gone.
- [ ] CDP walk at `/library/bubbles`, picture read: the play door present with
      its two lines, the fold shut, the collection line legible.
- [ ] Focus picture: `Tab` to a card — the hearth-gold ring is visible in the
      still.
- [ ] DOM proof at `/library/bubbles`: every chip carries `aria-pressed`; both
      chip rows sit in a `role="group"` with an accessible name; every card
      link carries an `aria-label`.
- [ ] CDP walk at `/library/bubbles/play` **signed out**, picture read: *"The
      stars are kept for vessels."* over *"Enter the Sanctuary"*.
- [ ] Signed-in walk at `/library/bubbles/play`: **unreached unless KP
      supplies a vessel.** No lamp creates a test vessel in the live base
      unbidden (the Bazaar's pass left the same line open). If unreached, the
      return says so plainly and the sidebar/caps checks below are marked
      unwalked rather than passed.
- [ ] Reduced-motion picture at `/library/bubbles/play`: the room renders
      whole; no `animate-ping` class in the DOM after a pop; the stars do not
      travel.
- [ ] DOM proof at `/library/bubbles/play`: no `Progress` element anywhere; no
      `{n}/{n}` text node in the sidebar or header.
- [ ] The caps panel's four figures read back equal to `:66`, `:67`, `:246`,
      `:301`.
- [ ] Grep proof: `grep -rn "Come back tomorrow" src/` returns nothing.
- [ ] CDP walk at `/library/bubbles/<slug>`, picture read.

### This room must NOT

A leaderboard · a streak or attendance mark · a countdown to the cap reset · a
named rare star to chase · a limited-time star · a *one missing* state · a
completion figure for a collection · any comparison with another vessel ·
*come back tomorrow* in any wording · **anything red**. And it must not turn
the game off under reduced motion — access is not subtraction. No rarity
pressure: a rarer star is bigger and slower (`RARITY_SIZE :86`,
`RARITY_SPEED :90`) and nothing else.

---

## 5 · ④ COURSES AND LESSONS — `/library/courses` · `/library/lessons`

**Routes:** four — `courses/page.tsx` · `courses/[slug]/page.tsx` ·
`lessons/page.tsx` · `lessons/[slug]/page.tsx`
**Components:** `courses/CoursesGallery.tsx` · `courses/CourseDetail.tsx`
(145) · `lessons/LessonsGallery.tsx` · `lessons/LessonDetail.tsx` (65)
**Reads:** `useLearningPathsList` · `useLessonsList`; the walk reads
`path_lessons` **directly through the generated API**
(`CourseDetail.tsx:57–67`) because join tables get no hook — the precedent
§7 leans on.

### States

| state | address |
|---|---|
| visitor / signed-in | identical; nothing is remembered today |
| empty (curriculum) | `CoursesGallery.tsx:40` — *"The curriculum is being prepared"* — **KEPT** |
| empty (lessons) | `LessonsGallery.tsx:42` — *"The lessons are being prepared"* — **KEPT** |
| empty (a course) | `CourseDetail.tsx:78` — *"This course has not been written yet."* — **KEPT** |
| empty (a path) | `CourseDetail.tsx:134–139` — *"This course's path is still being laid — its lessons will appear here as they are written."* — **KEPT** |
| empty (a lesson) | `LessonDetail.tsx:47` — *"This lesson has not been written yet."* — **KEPT** |
| error | not rendered; falls to empty. §7. |
| reduced motion | `CourseDetail.tsx:104` already carries `motion-reduce:transition-none` — **the only guard in the realm today**, and the line every other room is measured against |

### The build

- **NOTHING REWRITTEN.** This is the one board where the copy census found
  nothing to fix. **KEPT verbatim:** *"The path — 6 steps"* (`:96–97`) and
  every lesson title, description and body.
- **NEW — the remembering, and it is off.** One toggle, three strings, all
  **proposed** (no ruling names them):
  - **`'Remember where I stop'`**
  - **`'Kept on this device only, and you can forget it whenever you like.'`**
  - **`'where you stopped last'`** — one line on the step you left, and
    nothing else changes.
  **It is drawn OFF by default**, at KP's ⚛ word, verbatim: **"make all
  toggles off by default."** A vessel who never touches it never has a place
  kept for them.
  **Device-local, and forgettable** — no table, no row, no server. The shape
  and voice are already in the house twice: `src/lib/hooks/useDailies.ts`
  (`SHELF` key at `:38`, append-only, whole purge at `:104–107`) and
  `useDiscovery.ts` beside it. **The build writes a third in the same
  shape** — one `localStorage` key, a `try/catch` on every read and write, and
  a purge control that appears only once there is something to clear.
  **It does not touch `completion_points` (🚩 held).**
- **Contrast → `/70`:** `CourseDetail.tsx:114` (step descriptions, `/50`) ·
  `:119` (durations, `/40`) · `:135` (the empty-path note, `/40`) ·
  `CoursesGallery.tsx:38` (subtitle, `/40`), `:40` (empty, `/40`), `:46`
  (duration, `/40`), `:47` (description, `/50`) · `LessonsGallery.tsx:40`
  (subtitle, `/40`), `:42` (empty, `/40`).
- **`path_lessons.is_required` is `false` on all six rows**
  (`008:233–237`) — nothing in this course is required, in the database.
  Nothing in this pass renders it, and nothing makes it a demand.
- **The emoji in the lesson names stay** — the seed says why in its own
  comment: *"every term travels with an emoji — not decoration; processing
  relief"* (`008:187`). They are an access feature.
- `content`, `objectives`, `rewards` are Json and are rendered only in the
  shapes the rooms can honestly read (`LessonDetail.tsx:24–34`;
  `QuestDetail.tsx:25–28`). **Nothing on this pass proposes a richer shape** —
  that is designing inside a held flag.

### Printed checks — ④

- [ ] `tsc 0` · build 0.
- [ ] CDP walk at all four routes, pictures read.
- [ ] At `/library/courses/the-settled-tongue` (slug read from the door that
      day): six numbered steps, no percentage, no checkmark, no dimmed step.
- [ ] The toggle renders **off** on first paint with a cleared
      `localStorage`; picture read.
- [ ] With the toggle on, opening a lesson and returning shows *where you
      stopped last* on exactly one step, and the other five are the same
      brightness (measured in the picture, not asserted).
- [ ] Grep proof: no `%` render and no `Progress` element in the four
      components.
- [ ] Reduced-motion picture at `/library/courses/[slug]`: whole page, no
      hover transition.

### This room must NOT

A percentage · a completion ring · checkmarks on finished steps · dimming or
striking a step you have read · a locked step · *2 lessons to go* · a
certificate · a resume banner the room decides for you · any remembering that
leaves the device. The endowed-progress effect is refused by name — a single
checkmark on step one of six performs exactly that trick.

---

## 6 · ⑤ THE ARCHIVE — `/library/knowledge` · `/[slug]`

**Routes:** `knowledge/page.tsx` · `knowledge/[slug]/page.tsx`
**Components:** `knowledge/KnowledgeGallery.tsx` (61) ·
`knowledge/KnowledgeDetail.tsx` (53)
**Reads:** `useMythologyList` (`athena-gamification/mythology`),
`SCROLLS_PARAMS` at `KnowledgeGallery.tsx:15–20`.

**KP ⚛ 2026-08-24, verbatim, spelling kept:**
> "i also think mythology may have been misunderstood, i intend to draft
> stories of the actual mythologies we reference entities from"

> "my own is a smal story, still  valuable, but not the only story to be told."

So the Archive is a shelf of the **real mythologies** — Greek, Norse, Celtic —
that this house took its names from, written by KP and read as stories. The
house's own telling is one small scroll among them, and is not the
centrepiece. **The build builds the shelf and the reading. It writes no
telling and invents no scroll.**

### States

| state | address |
|---|---|
| visitor / signed-in | identical |
| empty (shelf) | `KnowledgeGallery.tsx:45` — *"The archive awaits its first scrolls"* — **KEPT**, **+1 line** below |
| empty (search) | `:45` — *"No scrolls match"* — **KEPT** |
| empty (a telling) | `KnowledgeDetail.tsx:26` — *"This scroll has not been written yet."* — **KEPT** |
| error | falls to empty. §7. |
| reduced motion | nothing moves in this hall at all — the one room that passes by having no motion |

### The build

- **The mythologies first, the story second, the search field when the shelf
  earns it.** `KnowledgeGallery.tsx:44` renders a full-width search box over
  **one** scroll. **RETIRE the field until the shelf earns it** — the filter
  machinery at `:29–37` stays in the file and simply waits.
- **Two ways in, both already on the ground.** `mythology` carries
  `myth_type` and `related_entity` / `related_entity_type`
  (`docs/sql/007-archive-provenance-and-first-scroll.sql:42–44`; both rendered
  today at `KnowledgeGallery.tsx:53`). **NEW:** two chip rows — *By mythology*
  (from `myth_type`) and *By the one it belongs to* (from `related_entity`).
  **Both start with none selected** (`useState<string | null>(null)`, the
  realm's own pattern) — a mythology chip must never arrive pre-chosen.
  **The chips are derived from the rows that exist**, never from a hard-coded
  list: a mythology with no telling yet is simply not on the shelf.
- **NEW copy, proposed, verbatim:**
  - **`'The stories the Sanctuary takes its names from, told properly. Walk in by the mythology, or by the one it belongs to.'`**
  - **`'More tellings are being written. They arrive when they are ready, and the shelf will hold them by the mythology they came from.'`**
  - the empty state's second line: **`'The tellings are being written. They will be here.'`**
  All three are warm and **countless on purpose** — no quota, no bar, no
  figure that counts how many tellings are written or still to come.
- **The provenance line — the realm's worst contrast on its most load-bearing
  element.** `KnowledgeDetail.tsx:45` sits at `text-[11px] text-star-dust/35`
  = **2.69:1**, the least readable text in the realm, and *provenance on every
  claim* is a ground-file law. **Drawn at `/78` and 11.5px = 8.99:1.**
- **Gallery previews at `/50` → `/70`** (`:54`); `KnowledgeDetail.tsx:36`
  (`/60`, 5.69:1) and `:37` (`/70`) already pass and do not move.
- **The reading page is otherwise right and is not redesigned** — description
  italic, story whole with `whitespace-pre-wrap`, teachings under *"What the
  telling carries"* (`:40`, **KEPT**), provenance last.

### Printed checks — ⑤

- [ ] `tsc 0` · build 0.
- [ ] CDP walk at `/library/knowledge`, picture read: no search field, two
      chip rows, none selected, the one standing telling on the shelf.
- [ ] Chip walk: pressing *Greek* narrows to the Greek tellings; pressing it
      again clears. `aria-pressed` present on every chip.
- [ ] CDP walk at `/library/knowledge/<slug>`, picture read: the provenance
      line legible in the picture at 11.5px.
- [ ] Reduced-motion picture at both routes.

### This room must NOT

A read/unread mark · a reading-time-remaining figure · *scrolls read: 1 of 1*
· a recommended-next telling · an infinite feed · any counter of how often a
telling has been opened · **any figure that counts how many tellings are
written or still to come**. The Archive must never keep score against the hand
writing it.

**Named, not opened:** the realm bus records KP's earlier earmark for an
Archive of *"story-frames, personal and shared"*, convened as one design with
the dailies and iris's Voice doorway (`(athena)/REALM-BUS.md:158–163`). That
is a different thing from the tellings above and needs no bridge. Nothing in
this pass touches it.

---

## 7 · ⑥ THE HONORS — `/library/badges` · `/[slug]`

**Routes:** `badges/page.tsx` · `badges/[slug]/page.tsx`
**Components:** `badges/BadgesGallery.tsx` (151) · `badges/BadgeDetail.tsx` (92)
**Reads today:** `useSigilsList` with `SIGILS_PARAMS`
(`BadgesGallery.tsx:32–37`) — `status: 'published'`, **no vessel filter at
all** (`:43`, `:51–58`). Ten sigils, shown to everyone.

**KP's ruling, as the brief records it (not his own sentence):** *mend the two
law-failing rooms (Honors shows only earned sigils; the 3/6 sidebar goes)*,
ruled with his ⚛ **"bazaar and library go"**, 2026-08-24.

### The build

- **The gallery reads `vessel_sigils` for the signed-in vessel and renders
  only the sigils that row set names.** The door exists —
  `src/app/api/generated/hestia-core/vessel_sigils/route.ts:14–44`, filterable
  on any column, so `?user_id=<id>&limit=100`. **There is no generated hook
  for `vessel_sigils`** (the fourteen under
  `src/lib/generated/hooks/hestia-core/` do not include it). **The build calls
  the door directly**, in `CourseDetail.tsx:57–67`'s shape, with a dated
  comment naming that precedent. It does **not** write a file into
  `src/lib/generated/` — that root is GAIA's output and heals only by
  regeneration (`CLAUDE.md` §Essential Rules). A generated hook, if wanted, is
  `gaia_config`'s and KP's — **unwritten**.
- **The signed-out room shows nothing but the empty state.** A visitor has no
  earned sigils; the honest room is the empty room.
- **`BadgesGallery.tsx:88–112` — the search field and the rarity chips
  RETIRE with the catalog.** Filtering three earned things by rarity is
  browsing furniture. The rarity **word** stays on the card (`:138`) and the
  glow (`RARITY_GLOW :22–28`) stays too — rarity as shimmer, which is what it
  is allowed to be.
- **`BadgesGallery.tsx:114–119` — the empty state is KEPT to the word:**
  *"The honors await those who walk the path"* (`:117`). With the mend in and
  the award triggers unwired (🚩 held), **this is the whole room for
  everyone** until that sitting. That is honest empty, and the sentence
  already covers it — say it plainly in the build's return rather than
  designing around it.
- **Below the earned sigils the page simply ends.** No grid of grey, no
  *"7 more"*, no faint outline, no count anywhere. The board's sentence
  *"Below this line the page simply ends. No shapes, no shadows, no outlines
  of what is not here."* is **an annotation for KP's eye, not shipping copy**
  — the built room says nothing at all there.
- **`:100, :106`** — the chips' `transition-all` leaves with the chips.
- **Contrast:** `:85` (subtitle, `/40`) and `:136` (card descriptions, `/50`)
  → **`/78`** — on this board the description **is** the honor.
- **`page_mapping.ts:212`** — *"Your achievements recognized"*. **REWRITE
  needed and the wording is unwritten — his to rule**: *achievements* is the
  word the seed refuses by name (*"markers of becoming, never achievements"*,
  `008:124`), so the line cannot stand — but no board drew its replacement.
  **The build prints the line for KP and leaves it** rather than inventing a
  subtitle. Same for `:216` *"Badge Detail"*.
- **`BadgeDetail.tsx` is left as it stands.** The board drew only the gallery.
  Whether a direct URL to an **unearned** sigil's detail page refuses, or
  shows the sigil as it does today (`:29–37, :50–60`), is **unwritten — his to
  rule**.

### Printed checks — ⑥

- [ ] `tsc 0` · build 0.
- [ ] CDP walk at `/library/badges` **signed out**, picture read: the empty
      state alone, no cards, no chips, no search field, no count.
- [ ] Signed-in walk: **unreached unless KP supplies a vessel** — say so
      plainly; do not assert the earned path passed.
- [ ] DOM proof: no `%`, no `n/N` text node, no element between the last card
      and the page's end.
- [ ] Grep proof: `grep -rn "All Rarities" src/components/asgard/domains/athena/badges/`
      returns nothing.
- [ ] Reduced-motion picture.

### This room must NOT

The full catalog · silhouettes (declined and drawn:
`design/declined/DeclinedSilhouettes.dc.html`) · *3 of 10* · a completion ring
· *you are 1 away* · a rarest-sigil showcase · any comparison with another
vessel · a shareable card · sigils as public status. This is the one room in
the app where badges-as-status is a single careless feature away.

---

## 8 · ⑦ THE DAILIES — `/library/dailies`

**Route:** `src/app/(athena)/library/dailies/page.tsx` (`revalidate = 3600`,
`:18`; `readShelf('word-scramble')`, `:26`)
**Component:** `dailies/DailiesHall.tsx` (320)
**Reads:** `src/lib/dailies/shelf.ts` (92) — **server-side, anon key, no
cookie**, and that is a law, not an optimisation (`shelf.ts:7–35`;
`REALM-BUS.md:398–405`). **Do not "correct" it to a generated door.**
**Remembers:** `src/lib/hooks/useDailies.ts` (110) — one `localStorage` key
(`:38`), append-only, whole purge (`:104–107`). No table, ever
(`022:38–45, :72–99`).

**Standing:** 140 rows in `daily_puzzles`, all `word-scramble`, all
`published` (read 2026-08-25 through the anon key, `Content-Range 0-2/140`);
140 of 140 carry an `atom_word` equal to their own solution; 3 of 140 clues
carry the mask; `payload jsonb` declared and empty (`022:31`).
`docs/sql/022-the-dailies-DRAFT.sql` was **run by KP's own hand**.

### States, all built

| state | address |
|---|---|
| the shelf | `:256–301` — a clue and a letter count, **no mark, no tick, no tally** (`:254–255`) |
| one puzzle in play | `:127–251` — tiles `:154–164` (display only; the answer is never in the markup) · clue `:168–171` · letter count `:172–174` · input `:179–194` |
| not-yet | `:196–198` — the live region is **empty**. There is no fourth state and no wrong state: no red, no shake, no *try again*. |
| solved | `:199–208` |
| shown | `:209–216` — costs nothing |
| met before | `:143–147` — *"You have met this one before."*, inside an open puzzle only, never on the shelf |
| the purge | `:303–316`, gated on `ready && met.length > 0` |
| empty | `:106–124` — **the one line this pass changes** |
| reduced motion | `:46–60` asks `matchMedia` and flattens to instant; the one transition is guarded at `:158–160`. **This is the mend ③ needs, already standing.** |

### The four fix lines on the built hall

1. **Raise six dimmed lines.** `DailiesHall.tsx:144, :172, :292` (`/40` =
   3.17:1) · `:244, :308` (`/30` = 2.29:1) · `:312` (`/25` = **1.95:1**) →
   **`/70`**. The `/25` line is the storage promise — the dimmest text in the
   hall is the sentence that tells a vessel their solving never leaves their
   device.
2. **Give the letters a role.** `:150–153` puts an `aria-label` on a bare
   `div` whose children are all `aria-hidden` (`:156`). A label on a generic
   container is not reliably announced, so the puzzle can go unspoken. **Add
   `role="img"`** (or `role="group"`) so the label becomes its accessible
   name.
3. **Move focus on all three transitions.** `inputRef` is created and
   attached (`:69, :181`) and **never called**. Opening a puzzle
   (`openPuzzle`, `:83–87`) leaves focus on a card that has just unmounted;
   `disabled={solved}` (`:188`) disables the focused input at the moment of
   solving; `close` (`:99–103`) returns to a shelf holding no focus. **Focus
   the input on open; move focus to the solved live region rather than
   disabling under it; return focus to the shelf card that was pressed on
   close.**
4. **Make the empty state true of both causes.** `shelf.ts` returns an empty
   shelf **three ways** — no keys (`:61`), a refused read (`:82`), a thrown
   one (`:84–86`) — and `DailiesHall.tsx:106–124` wears *"still being
   written"* for all of them. With 140 rows standing, that is the one cause it
   is no longer likely to be.
   **REWRITE, verbatim:**
   `'The shelf is still being written. Words are being drawn from the Grammar one at a time, and they will be here when they are ready.'`
   → **`'The shelf has not come through yet. The words are drawn from the Grammar, and they will be here when the shelf opens.'`**

**Also proposed on the board, and it is one line:** the hall states its law in
its closing line (`:244–247`) but never says where the words come from. The
Grammar is the entire reason the dailies live in this realm. **Proposed: one
line under the subtitle naming the Grammar, with a door to the Archive.** Its
wording is **unwritten — his to rule**.

### The three forms — FRAMES ONLY. Nothing is built.

KP's roster is four and one stands. **No form below is built, wireframed,
seeded or given a parameter in this pass.** Each frame says three things and
stops: the content shape in the same table, the mechanic's law, and what only
he can rule. `puzzle_form` values are the Grammar's own molecule names in
kebab-case, referenced from canon, never forked (`022:12–14`).

**Their seed numbers are stale and are not reserved.** Board ⑦ named
`024`/`025`/`026` on 2026-08-25; the Bazaar's draft took `024` the same day
(`4a329e04a`) and the collections seed takes `025` (§12). Each form's seed
takes **whatever is free on the day it is written** — the names below are the
form's, never the number's.

**Word find** — `puzzle_form = word-find`. The Grammar's WordFind molecule,
verbatim: *"A category's words hidden in a grid; the rest of the grid is
filler."* (`resonance-grammar/docs/sql/102-the-molecules.sql:91–94`).
Content shape: `payload: { rows, cols, grid, words: [{ atom_word, atom_id,
clue, start, dir }] }`. Mechanic: control of error is the list itself — a run
either is a word on it or it is not; **no wrong state**, no timer, no score.
Seed named for its form — **`NNN-the-dailies-word-find-DRAFT.sql`** — from a
`dailies_wordfind_gen.py` beside its sibling in the bridge's seeding folder.
**Unwritten — his to rule:** the grid's size · how many words hide in one ·
whether diagonals and reversals are in · whether the list shows the words or
their derived definitions · which categories.

**Crossword** — `puzzle_form = cross-word`. The Grammar's CrossWord molecule,
verbatim: *"Words interlocked at shared letters, each clued by its own
definition."* (`102-the-molecules.sql:96–99`). Content shape: `payload: {
rows, cols, cells, entries: [{ n, dir, start, answer, clue, atom_word,
atom_id }] }`. The crossings are **read, not invented** — the canon holds
6,728 molecules over 13,449 bonds. Mechanic: a letter that does not agree
with its crossing is visible to the solver without being told — Ximenean
fairness; **no wrong state**, no *check puzzle* verdict, no percentage. Seed
named **`NNN-the-dailies-crossword-DRAFT.sql`**. The mask filter is not
optional: **924 of 2,344 atoms carry their own word inside their own
definition**.
**Unwritten — his to rule:** grid size and whether it keeps a classic 180°
symmetry · whether clues are derived or hand-written · whether an entry may be
a molecule's own name or only an atom · how many entries make one puzzle ·
what `solution` and `scrambled` hold, since both are `not null` (`022:26–30`)
and a crossword has neither.

**Wordoku** — `puzzle_form = wordoku`. The Grammar's Wordoku molecule,
verbatim: *"A Latin square played with letters, the hidden word reading out on
solve."* (`102-the-molecules.sql:108–111`). Content shape: `payload: { n,
letters, givens, solution, hidden: { atom_word, atom_id, dir, start } }`.
Mechanic: the constraint is the control of error; **no wrong state**, no
*mistakes: 3* counter, no timer, no difficulty rank. Seed named
**`NNN-the-dailies-wordoku-DRAFT.sql`**. The thin ground, said plainly: a
nine-square needs a nine-letter word of nine distinct letters and the corpus
holds **eleven**, all cold.
**Unwritten — his to rule:** the square's size, four, six or nine · how many
letters are given · what `clue` holds, since it is `not null` and a clue to
the hidden word gives the grid away · whether the form waits for the Grammar
to grow or takes the smaller square now.

**Cryptex stays reserved**, at KP's own hedge — *"i understadn it is a lot of
work"*. Nothing is drawn for it.

**The blend is a question, not a design.** KP ⚛, verbatim, spelling kept:
*"we also want to offer crossword, word find, word scramble, even sudoku if
possible… word games were my warm place, but i like words, not everyone is a
poet, so i think we find a way to blend all the comfort game concepts."* The
word carries at least three readings — four forms side by side on one shelf ·
one form borrowing the others' pleasures · one shelf that hands you whichever
suits the day. **A board may name the readings; it may not pick one for him,
and neither may a build.** **unwritten — his to rule.**

### Printed checks — ⑦

- [ ] `tsc 0` · build 0.
- [ ] CDP walk at `/library/dailies`, picture read: the shelf, every card
      identical, no mark and no tally, the six raised lines legible.
- [ ] Open a puzzle with real keystrokes through CDP `Input.dispatchKeyEvent`;
      type the solution; picture read of the **solved** state; picture read of
      a **not-yet** state showing the live region empty and **no red anywhere**.
- [ ] Focus proof: on opening a puzzle, `document.activeElement` is the input;
      on solving, focus is not on a disabled element; on closing, focus is on
      the shelf card that was pressed.
- [ ] DOM proof: the letters' container carries `role="img"` (or `group`) and
      its `aria-label`.
- [ ] Reduced-motion picture: the hall renders whole and the tiles carry no
      transition class.
- [ ] Grep proof: `grep -rn "still being written" src/components/asgard/domains/athena/dailies/`
      returns nothing.
- [ ] Grep proof: **no** file under `src/` names `word-find`, `cross-word` or
      `wordoku` after this pass — the frames stay on the canvas.

### This room must NOT

A streak · an appointment · a countdown to tomorrow's puzzle · a leaderboard ·
*you missed one* in any wording · a progress bar about the vessel · a
completion figure · a difficulty rank · a mistakes counter · a hint that costs
something · a shareable result grid · any mark on the shelf separating a met
puzzle from an unmet one. **And at the schema:** no date column, and no
vessel-scoped companion table born from `daily_puzzles`. The refusal rides in
the table's own `COMMENT ON TABLE` (`022:38–45`) and the write routes are
never generated (`022:72–90`) — the organ is unbuildable, not merely unbuilt.

---

## 9 · ⑧ THE WAYS AND THE EMPTY STATES

**Fifteen routes**, every `Link` traced (board ⑧). Thirteen rooms below the
hub, thirteen doors back, no dead ends. The back-link discipline is complete
and **not one back link moves**: *Return to the Library* · *the Path* · *the
Curriculum* · *the Lessons* · *the Archive* · *the Honors* · *the Floating
Stars*.

### Every empty state, and its verdict

| room | what it says today | verdict |
|---|---|---|
| The Path | *"The path unfolds soon"* / *"New quests are being woven"* | kept |
| a quest | *"This quest has not been written yet."* | kept |
| The Curriculum | *"The curriculum is being prepared"* | kept |
| a course | *"This course has not been written yet."* | kept |
| a path | *"This course's path is still being laid — its lessons will appear here as they are written."* | kept |
| The Lessons | *"The lessons are being prepared"* | kept |
| a lesson | *"This lesson has not been written yet."* | kept |
| The Archive | *"The archive awaits its first scrolls"* | kept **+1** (§6) |
| a telling | *"This scroll has not been written yet."* | kept |
| The Honors | *"The honors await those who walk the path"* | kept |
| a sigil | *"This honor has not been forged yet."* | kept |
| The Stars | *"The floating stars will appear when the Sanctuary is ready"* | kept |
| a star | *"This star has floated beyond view."* | kept |
| The Dailies | *"The shelf is still being written…"* | **one line** (§8) |
| the game, signed out | *"Sign in to play"* / *"Enter the Sanctuary"* | **one line** (§4) |

Thirteen of fifteen are already right, and right in the hard way: every one
says *waiting*, *being written*, *being prepared*, *not yet* — never
*missing*, never *none found*, never an error face. **Nothing on this canvas
improves them and nothing should.**

### The map's three lies, and one question

- **All three bubbles routes are unmapped.**
  `src/lib/constants/systems/environments/page_mapping.ts:164–228` holds rows
  for nine library routes and two badge routes and **none** for
  `/library/bubbles`, `/library/bubbles/play` or `/library/bubbles/*` — so
  they fall through to the default at `:711–716` and resolve to `lounge`.
  The heaviest room in the realm stands in another realm's weather.
  **Fix line: three rows, `default: 'library'`**, with titles and subtitles in
  the rooms' own words.
- **The street is missing two rooms.**
  `src/lib/constants/systems/the-street.ts:79–91` lists seven rooms and omits
  **`/library/lessons`** and **`/library/dailies`**. The map never lies — both
  earn their line, labelled *The Lessons* and *The Dailies*.
- **The Honors wear the observatory's weather.** `page_mapping.ts:209–218` maps
  both badge routes to `observatory`, not `library`. That may well be
  deliberate — with ⑥'s mend the Honors become your own sky. **Named as a
  question for KP, not changed.** **unwritten — his to rule.**

### Printed checks — ⑧

- [ ] `tsc 0` · build 0.
- [ ] A street sweep: every `href` in `the-street.ts`'s Library block resolves
      200 on the walk; **fifteen** library routes reachable.
- [ ] `getPageEnvironment('/library/bubbles')` returns `library`, and the same
      for `/library/bubbles/play` and a `[slug]` under it.
- [ ] Pictures of all fifteen routes at `.journals/proofs/04-athena/build/`,
      read by a hand before KP's eye.
- [ ] The wash is 0.3 everywhere — `grep -rn "washOpacity" src/` shows no new
      value.

---

## 10 · THE WORDS LAW IN THIS REALM

**KP ⚛ 2026-08-24, verbatim:**
> "wording is mixed. vendor should be merchant, creator should be artisan,
> creations should be wares, and be certain a vessel can view their own works
> and wares regarless of publish status, so they can edit the items."

So **merchant · artisan · wares** — never vendor · creator · creations — in
every drawn word and every built word. Base identifiers stay
(`HANDOFF.md:59`).

**Grepped 2026-08-25 across `src/app/(athena)/**`,
`src/components/asgard/domains/athena/**`, `src/lib/dailies/`,
`src/lib/hooks/useDailies.ts`:**

| hit | verdict |
|---|---|
| `merchant` · `artisan` · `wares` · `product` | **zero hits.** Nothing to rename. |
| `creator` · `creations` | **zero hits.** |
| `vendor` — `src/app/(athena)/README.md:50` · `src/app/(athena)/REALM-BUS.md:401` · `src/lib/dailies/shelf.ts:14` | **NOT the law's word.** All three mean the hosting **vendor** whose logs would carry an attendance ledger. **These do not move.** Renaming them would break the sentence that keeps the dailies cookie-free. |
| `creation` — `REALM-BUS.md:415` | a Grammar **category name** in the corpus census. Does not move. |

**The realm's own retired words, which the law does not name but the house
does:**

- *earn points* — `LibraryHub.tsx:15`. **Rewritten, §2.**
- *achievements* — `page_mapping.ts:212` *"Your achievements recognized"*
  against `008:124` *"markers of becoming, never achievements"*. **Named for
  KP; the replacement is unwritten — his to rule** (§7).
- *Badge Detail* — `page_mapping.ts:216`. Same. The route path
  `/library/badges` and the component names `BadgesGallery` / `BadgeDetail`
  are **identifiers**, not copy, and are **not renamed in this pass**.

---

## 11 · THE DATA CONTRACT

### Every generated door each room reads

| room | door / hook | address |
|---|---|---|
| ① hub | none — a module constant | `LibraryHub.tsx:9–17` |
| ② Path | `useQuestsList` → `/api/generated/athena-gamification/quests` | `QuestsGallery.tsx:11, :26–31` · `QuestDetail.tsx:13, :36` |
| ③ Stars, gallery | `useBubblesList` → `athena-gamification/bubbles`; `useCollectionSetsList` → `hestia-core/collection_sets` | `BubblesGallery.tsx:11–12, :40–46` |
| ③ a star | the same two | `BubbleDetail.tsx:13–14, :40, :49` |
| ③ play | four direct fetches: `bubbles` `:125` · `vessel_bubbles` `:138` · `vessel_config` `:139` · `vessel_bubbles` + `collection_sets` `:166–167`; one POST `vessel_bubbles` `:288–297` | `BubblePopGame.tsx` |
| ④ Curriculum | `useLearningPathsList` · `useLessonsList` · a **direct** read of `path_lessons` (join tables get no hook) | `CourseDetail.tsx:19–20, :30–33, :57–67` |
| ④ Lessons | `useLessonsList` | `LessonDetail.tsx:12, :42` |
| ⑤ Archive | `useMythologyList` → `athena-gamification/mythology` | `KnowledgeGallery.tsx:10, :15–20` · `KnowledgeDetail.tsx:12, :21` |
| ⑥ Honors | `useSigilsList` → `athena-gamification/sigils`; **new:** a direct read of `hestia-core/vessel_sigils` | `BadgesGallery.tsx:11, :32–37`; door at `api/generated/hestia-core/vessel_sigils/route.ts:14–44` |
| ⑦ Dailies | **not a generated door** — `shelf.ts` reads PostgREST directly, server-side, anon key, no cookie | `shelf.ts:58–92` · `dailies/page.tsx:26` |

### The per-vessel reads, and the hook question — ruled

`vessel_bubbles` — `user_id` · `bubble_id` · `collected_at` ·
`collection_method` · `collection_context jsonb`
(`database.types.ts:5904–5934`). **The game writes one row per pop**
(`BubblePopGame.tsx:288–297`), so *"popped ×3"* is a count of rows, not a
stored counter, and it is derivable today.

**There is no generated hook for `vessel_bubbles` or `vessel_sigils`** —
`src/lib/generated/hooks/hestia-core/` holds fourteen and neither is among
them. The doors exist and answer a filter on any column
(`api/generated/hestia-core/vessel_bubbles/route.ts:14–44`).

**RULED for this spec: the build calls the door directly.** The house's own
precedent is `CourseDetail.tsx:53–67`, which reads `path_lessons` through the
generated API for exactly this reason and says so in its own comment. The
build writes **no** file under `src/lib/generated/` — that root is GAIA's
output and heals only by regeneration, never by a hand
(`CLAUDE.md` §Essential Rules). Whether `gaia_config` should be taught to
generate those two hooks is **unwritten — his to rule**.

### The `limit=100` cap — a fix line, and it bites before anything else

`src/lib/api/auth.ts:142–149` clamps every generated door's `limit` to
**100**, silently. Three consequences, all in this realm:

1. `BubblesGallery.tsx:44` asks `limit: 200` and is **served 100**. Thirty
   stars stand today so nothing shows. **If the ninety-three land the
   catalogue is 123 and the gallery drops twenty-three stars with no error.**
2. `BubblePopGame.tsx:125` asks `limit=200` for the spawn pool — same clamp,
   same silence.
3. `BubblePopGame.tsx:138` and `:166` read `vessel_bubbles` at `limit=100`. A
   vessel past a hundred pops already reads short, and the daily-points
   arithmetic at `:150–154` is computed from that short list.

**Fix line: page, never silently short.** Raising the number does nothing —
the door clamps it. The generated list hooks already return
`total` from `result.data.pagination.total`
(`hooks/hestia-core/collection_sets.ts:90, :106`), so the honest shape is a
loop over `page` until `data.length === total`, exactly as `shelf.ts:66–89`
loops PostgREST's own 1000-row clamp. **Every read of `bubbles`,
`collection_sets` and `vessel_bubbles` in this realm pages.** Where a room
cannot page in this pass, it must not pretend: it says so in a comment with
this address.

### RLS honesty, and the false-empty law

**A read that returns `[]` with a 200 is indistinguishable from a walled
one.** That is the false-empty (`new-table` skill; `009-library-doors-for-anyone.sql:9–16`).

| table | select policy in `docs/sql` | what a lamp may say |
|---|---|---|
| `bubbles` · `collection_sets` · `sigils` · `quests` · `learning_paths` · `lessons` · `path_lessons` | **yes** — `ALTER POLICY … TO public`, `009-library-doors-for-anyone.sql:32–38`, published-gated | visitor reads are open and were anon-verified |
| `mythology` | **yes** — created per the ritual, roles `{public}` (`009:14–16`; `005-mythology-returns.sql`) | open |
| `daily_puzzles` | **yes** — `022:61–66`, `using (status = 'published')`, **no `to` clause** (deliberate) | open; 140 rows read through the anon key 2026-08-25 |
| `vessel_bubbles` | **no policy anywhere in `docs/sql/*`** | **unreadable from the shelf.** The read may be walled and may be genuinely empty, and a lamp cannot tell them apart. |
| `vessel_sigils` | **no policy anywhere in `docs/sql/*`** | same |
| `vessel_config` | **yes** — `009-the-walls-learn-the-new-names.sql:118–134`, own-row only | own-row read is real |

**So ⑥'s earned-only room and ③'s per-vessel states carry an honest
could-not-be-read state**, in the pattern the Bazaar's ledger already
established: when the read errors or returns empty **and the vessel is signed
in**, the room says the shelf could not be read rather than asserting *you
have earned nothing*. The distinction lands as one sentence, and its wording
is **unwritten — his to rule**. **No lamp creates a test vessel in KP's live
base to settle it.**

---

## 12 · THE DRAFT SQL — for KP's hand, never run

**One draft this pass.** Nothing the three daily forms need is written —
frames only.

**The number, and it moved while this spec was being written.** The shelf read
at the start of this sitting stood at `023` **twice** —
`023-the-bazaar-refined-DRAFT.sql` and `023-the-ledger-door-DRAFT.sql`.
Mid-writing another hand committed `4a329e04a` (*"The Bazaar's DRAFT takes the
number 024 — two drafts had shared 023; the ledger door was first"*), renaming
the Bazaar's draft to **`024-the-bazaar-refined-DRAFT.sql`** and sweeping every
reference to it, this file included. **So the shelf now stands at `024`, and
the lowest free number is `025`.**

Board ⑦'s named `024`/`025`/`026` for the three daily forms are **stale on the
same movement**, and none of those three seeds is written this pass anyway —
nothing of theirs is reserved. **The build re-reads `docs/sql/` on the day it
writes, takes the lowest free number, and prints the number it took in its
return.** The filename below takes `025` as the shelf stands 2026-08-25; if
the shelf has moved again, the number moves with it.

### `docs/sql/025-the-floating-stars-collections-DRAFT.sql`

**What it does, in four steps, plain statements only — no `do $$ … $$` blocks
(the ritual's lesson 2):**

1. **The eight collections.** `insert into public.collection_sets (name,
   slug, collection_type, description, display_order, rarity,
   completion_points, status) values …` — eight rows: **The Sky Wheel** (8
   stars) · **The Sensory Set** (12) · **The Long Night** (10) · **The
   Workshop** (10) · **The Companions** (9) · **The Threshold** (8) · **The
   Given** (6) · **Inclusive Pride** (13). Every name, slug and description
   comes from `resonance-bubbles/src/lib/data/bubbles-set.json`; nothing is
   invented. `status` must be **`'published'`** or the public policy
   (`009:33`) hides them — the false-empty by construction. `completion_points`
   is **left null**: the math is 🚩 held.
2. **The ninety-three stars.** `insert into public.bubbles (name, slug,
   description, rarity, bubble_type, collection_id, display_order, status)
   values …`, `collection_id` resolved by `(select id from
   public.collection_sets where slug = …)`, exactly as `008:83` does.
   Machine-counted from the app's own file: **93 of 123 carry
   `addition: true`**, distributed star-dust 6 · hearth 4 · elemental 4 ·
   quantum-weave 3 · sky-wheel 8 · sensory 12 · long-night 10 · workshop 10 ·
   companions 9 · threshold 8 · the-given 6 · inclusive-pride 13. Rarity
   census of the 93: 37 common · 24 rare · 18 epic · 9 legendary · 5 mythic.
   **The 30 that are not additions are, slug for slug, exactly the 30 the base
   already holds** (`008:83–120`) — nothing collides.
   **`status = 'published'`.** **In batches of 50** — one unlawful enum label
   400s a whole batch (`022:98–99`; `content_status` is
   `draft | published | archived`, `database.types.ts:7113`).
3. **The colour columns.** The minimum is four `alter table` lines:
   `alter table public.bubbles add column if not exists palette text[];` ·
   `alter table public.bubbles add column if not exists ring text;` ·
   `alter table public.collection_sets add column if not exists accent text;` ·
   `alter table public.collection_sets add column if not exists palette text[];`
   — **or** a `metadata jsonb` on each, which does the same work in two.
   **Which shape is unwritten — his to rule**, and the draft **asks rather
   than answers**, in the shape `023-the-ledger-door-DRAFT.sql` used: option A
   (four typed columns) · option B (two jsonb bags), both written out, neither
   uncommented. **They hold cosmic token KEYS** (`hearth.gold`, `pride.red`),
   never hex, exactly as the app stores them
   (`resonance-bubbles/src/lib/bubbles/dress.ts:29–37`). The one raw hex in
   the whole set is intersex's `#7902AA`, raw because no token stands for it
   yet.
   Machine-read: `bubbles` holds nineteen columns and none is `palette`,
   `ring` or `metadata` (`database.types.ts:823–843`); `collection_sets` holds
   fifteen and none is `accent`, `palette` or `metadata` (`:1132–1147`). The
   only jsonb near this is `vessel_bubbles.collection_context`, which belongs
   to the pop and not to the star.
4. **`select public.gaia_sync('bubbles'); select public.gaia_sync('collection_sets');`**
   so the base sees its own new columns, then a verify block in `008`'s own
   shape: counts per collection and a rarity census, read back through the
   **anon** door, not the service key (the ritual's lesson 4).

**No RLS step is needed and none is written.** Both tables already carry their
public-read policies from `009:32–33`; adding a column changes no policy, and
this draft creates no table. **No write policy is created, for anyone.**

**What the draft must say to KP, in its own header:**

- **GATE 3 moves, or it does not.** `008:31–33` says *"bubble colors derive
  from rarity in code, never from rows"*. That gate was written before flags
  existed, and a flag's stripes cannot derive from its rarity. **Whether the
  gate moves is his.**
- **The slug seam.** The base seeded `the-hearth-collection`,
  `the-elemental-set`, `the-council-collection`; the app says `hearth`,
  `elemental`, `council`. Two of the five already agree (`star-dust`,
  `quantum-weave`). **Whether the seed maps the app's slugs onto the base's,
  renames the base's rows, or keeps both is his** — the draft writes all three
  as commented options and picks none. Until he picks, **the 93 rows land
  against the base's own slugs**, because renaming a live row is not a lamp's
  to draft as the default.
- **Whether the eight and the ninety-three land at all is his.** The app's own
  record says they are *"offered upward to the online set at KP's gate"*
  (`bubbles-set.json` provenance, echoed at
  `resonance-bubbles/docs/THE-GAME.md:39–40`, whose 55/6 counts read stale
  against the live 123/13).
- **Run by his own hand, one step at a time. No lamp runs it.**

---

## 13 · THE VERIFY LENSES

Three Sonnet lenses in parallel, each **refuting by default**. A refuted check
returns to B.

### The law lens

- [ ] Opt-in: machine-read the realm for pre-checked inputs and defaulted
      filters. The census read **0 of each in 31 files** before this pass; the
      one toggle this pass adds (④'s remembering) must render **off** on first
      paint, and its default must be the *less* permissive state.
- [ ] Anti-scarcity: no `%` render · no `n/N` about a vessel · no `Progress`
      element anywhere in the realm · no bar, ring, dial or ambient fill
      standing for a remainder. **The dial was declined and drawn**
      (`design/declined/DeclinedCapDial.dc.html`) — a dial is a bar bent into
      a circle.
- [ ] The refusal column, room by room, against §§2–9's *must NOT* lists.
- [ ] **The mythic colour.** `grep -rn "f43f5e\|rose-500"` under the realm
      returns nothing; the five values equal the app's five, character for
      character.
- [ ] **The Honors' earned-only read.** The gallery's fetch carries a
      `user_id` filter; signed out, the room renders the empty state and
      nothing else; there is **no element** between the last card and the end
      of the page.
- [ ] The four caps survive intact and two of them speak: `:66`, `:67`,
      `:246`, `:301` all still enforce, and the panel's four sentences match
      those four numbers.
- [ ] The realm law, signed thrice, is not undone:
      `(athena)/README.md:111–113` · `REALM-BUS.md:118–123`. **This pass
      removes only measurement, never a guard.**

### The truth lens

- [ ] No constant dressed as a heartbeat: every figure rendered anywhere in
      this realm traces to a row, a code constant with its address, or a
      machine count. The hub's inventory lines are re-counted at build time
      against the door, never carried from this spec.
- [ ] Every fetch lands on a living door — walk each of the ten reads in §11
      and record the status and the row count.
- [ ] **The `limit` clamp is honoured**: every paging read returns
      `data.length === total`, proved on the walk with the real numbers.
- [ ] Empty states honest — *waiting for stars to align rather than missing
      data*. All fifteen rows of §9 read back from the DOM.
- [ ] **The false-empty is not asserted away**: where a read returns `[]` and
      no policy exists in `docs/sql` (`vessel_bubbles`, `vessel_sigils`), the
      room's copy does not claim the vessel has nothing.
- [ ] **The sieve's words**, if ③·B lands: exactly *all stars* / *collected* /
      *still drifting*, and **no fraction beside them**.
- [ ] `docs/sql/025-…-DRAFT.sql` is a draft and **was not run** — no schema
      change is visible through the door.

### The a11y lens

- [ ] Text carries on the ground, never on the realm hue; the 0.3 wash is
      unchanged (`grep -rn "washOpacity"`).
- [ ] Every raised line measured in a **picture**, not asserted: the six in
      the gallery, the six in the dailies, the provenance line, the hub's
      description, the Path's two, the Honors' two.
- [ ] Keyboard: every interactive element reachable, every one showing the
      hearth-gold ring (12.66:1). **`focus:outline-none` with nothing in its
      place returns zero hits under the realm** after this pass.
- [ ] `aria-pressed` on every chip; every chip row in a named `role="group"`;
      chips at 44px.
- [ ] The dailies' letters carry a role that makes their label an accessible
      name.
- [ ] **Reduced motion stills to nothing, and blanks nothing.** Under
      `prefers-reduced-motion: reduce`, take a picture of **all fifteen
      routes**. Each must render its content. Then re-run the framer census:
      **zero `motion.` elements under `src/app/(athena)/**` and
      `src/components/asgard/domains/athena/**`**, and the one at
      `EnvironmentLayer.tsx:63` still carrying its opacity in `style` and not
      in `initial`. A single `initial={{opacity:0}}` appearing anywhere in
      this realm is a refutation, not a note.
- [ ] The game under the guard is **still playable** — the stars arrive and
      can be popped. Turning it off is refused.

---

## 14 · THE TELLING OWED AT G

Same sitting as the merge, in this order:

1. **A FROM post** on `src/app/(athena)/REALM-BUS.md`, append-only, signed
   `## FROM: <lane> · 2026-08-__`, carrying KP's ⚛ words verbatim, what
   landed per movement, what is gated on his word, and the one seam this pass
   leaves open (the colour columns).
2. **A `docs/CHECKLIST.md` row**, dated, in the last rows' pattern
   (`:93–99`): the ⚛ words verbatim · the branch and its commits · the meters
   **tsc 0 · build 0 · page count** · the pictures' address · what was caught
   in the pictures and not the meters · what stayed unbuilt and why · every
   *unwritten — his to rule*.
3. **A `docs/UX-REFINEMENT-LOG.md` seam-note.**
4. **`HANDOFF.md` regenerated** — the handoff-tender's LAND
   (`python c:/_superposition/resonance-ziggy/tend.py handoff land AudHDities`),
   never hand-edited above its foot.
5. **`PROOF.md`'s step table** closed through the merge hash.
6. The teller's journal in its seat.

---

## 15 · UNWRITTEN — HIS TO RULE, gathered

Nothing below is built, and nothing below is guessed at.

**③ the Floating Stars** — the eight collections and the ninety-three stars ·
the colour columns' shape (four typed columns or a `metadata jsonb` on each) ·
whether `008`'s GATE 3 moves · the mythic swap (the board recommends it and
names the law; it is still a colour in his house) · the slug seam · the veil ·
the flip · the sieve and its readout · the search scope · the points on a card
· the word for waiting · the ×N pill · where the five colours live · the caps
in the gallery · the seed's number on the day it is written.

**② the Path** — whether *"Where this goes"* is the heading he wants; whether
a real *Begin* ever arrives (🚩 held).

**④ Courses** — the remembering is proposed, all three strings; whether it
lands at all is his.

**⑤ the Archive** — the two chip rows and the three new sentences are all
proposed; the dark hall of *"story-frames, personal and shared"* stays named
and unopened.

**⑥ the Honors** — the replacement for *"Your achievements recognized"* and
*"Badge Detail"* (`page_mapping.ts:212, :216`) · whether `BadgeDetail`
refuses an unearned sigil reached by direct URL · whether the badge routes'
`observatory` weather is deliberate.

**⑦ the Dailies** — the Grammar line under the subtitle · **every parameter of
all three forms** (word find: grid size · word count · diagonals and reversals
· words or definitions · categories; crossword: grid size and symmetry ·
derived or hand-written clues · molecule names as entries · entries per puzzle
· what `solution` and `scrambled` hold; wordoku: the square's size · givens ·
what `clue` holds · whether it waits for the Grammar to grow) · **the blend** ·
the three seed numbers · whether the hub says anything about the dailies'
shelf.

**Across the realm** — whether `gaia_config` should generate hooks for
`vessel_bubbles` and `vessel_sigils` · the wording of the
could-not-be-read sentence · whether a lamp may ever create a test vessel in
the live base (one word closes every signed-in check in this spec).

---

*Read whole by one Sonnet skeptic before build (plan §2·S). Nothing in `src/`
was edited to write this. No SQL was run. KP's words are verbatim or absent.*

— the Opus spec hand, `claude-opus-5[1m]`, 2026-08-25

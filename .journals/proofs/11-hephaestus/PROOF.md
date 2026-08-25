# PROOF — 11 (hephaestus), the Forge

**Canvas:** https://claude.ai/code/artifact/2f761f01-4f8d-4dc5-b2b9-0e179f958006
**Drawn** 2026-08-24 · Opus, `claude-opus-5[1m]`.
Ground: `design/` — 9 artboards, `canvas.json`, `declined/`.

## The boards
① `/apps/privacy` — the family's one policy, a new room built as `/privacy`
is · ② the four-item nav, signed in and signed out, the map keeping every
retired door · ③ `/press` — one honest card and the interview form · ④ the
transparency pair — the public telling untouched, `/council/ledger` redrawn
per-entry with a link up · ⑤ the ways between, `/donate` retired across five
files, every empty state. Page 2 — four refusals.

## KP's rulings, verbatim, 2026-08-24
- **"we already have a terms/ and privacy/ we will need an apps/privacy"** → ①
- **"i think the navigation should be simplified, since we have the map for
  the full navigation. [Vessel, Bazaar, Playground, Sanctum (hephaestus) ]"**
  and **"the collision is my mispelling, it is sanctuary in hephaestus"** → ②
- **`/press`** — ruled by choosing the option: one honest card + the interview
  form; the kit/media/logo frames leave until assets exist → ③
- **The two transparency surfaces** — ruled by choosing the option: keep the
  public one; council links to it. One table, two rooms, no duplicated
  prose → ④
- **"retire the donate and create subscription tiers for me rather than the
  platform, and  i will still have my covenant set to 50%. the donations tab
  was before we had a built sanctuary and had different outlooks."** → ⑤
- **Build law:** *"the framework… before the features within"* → every board.

**The four the canvas asked, answered the same day:**
- **"apps keep theirs"** → ① the apps' own address stands on `/apps/privacy`;
  no substitution of the site's constant.
- **"effects, playground, environments, theater are all (cosmic) pages"** →
  ② the Playground item is the (cosmic) REALM. It lands on the realm's door as
  the street defines it (`/environments` today) with those four routes as its
  rooms; the item follows the street's `href`, so realm 10's own pass may
  re-home the door without touching the bar.
- **"yes"** → ② Vessel signed out goes to `/login`; four fixed items whatever
  the state.
- **"yes"** → ③ the six brand colours leave `/press` and come back with the
  logos.

## Unwritten — his to rule
Whether `/` gets a desktop door back (⑤, with the mend on ②) · what `/enter`
is · whether the footer grows to six pointers · whose eye `/council/ledger`
is for.

## Second pass
The subscription tiers — a WARE of KP's, the Bazaar's spec, named on ⑤ and
drawn nowhere · the press kit's return around real files · per-app anchors on
`/apps/privacy` · a ledger row that opens into its exchange · a light theme,
proposed on four boards and built on none.

## For the build — to fix
- `parsePrivacy.ts:40` — teach the parser "Effective date:" as well as
  "Last updated:", or write "Last updated:" into the apps' markdown. Until one
  of the two, the hero prints the default at `parsePrivacy.ts:28`.
- `parsePrivacy.ts:27,34` — the H1 branch is guarded by `!title` on a truthy
  init, so the markdown's own title is never read.
- `ParsedPrivacyContent.tsx:23-38` — add the app policy's headings to the icon
  map, or name the sections with the map's existing keys.
- `PrivacyHero.tsx:16-17,20-24` and `PrivacyFooter.tsx:10-14` — add
  `motion-reduce` guards; same at `InterviewRequests.tsx:272` and
  `LedgerHub.tsx:65-79`.
- `LedgerHub.tsx:37,47,95-113` — the three stat cards sum a `limit=50` fetch.
  Board ④ moves the aggregates to `/transparency`, where they are already
  computed over every completed exchange.
- `LedgerHub.tsx:42` — a failed fetch currently renders as an empty ledger;
  give it its own line and a retry.
- `LedgerHub.tsx:16-22` and `DocsContent.tsx:100-106` — swap Tailwind stock
  colours for cosmic tokens.
- Contrast: `star-dust/40` reads 3.2:1 and `/30` reads 2.3:1. Raise the
  press subtitles (`PressKit.tsx:29`, `MediaAssets.tsx:24`,
  `LogoDownloads.tsx:51,84,98`, `CoverageHighlights.tsx:32`,
  `InterviewRequests.tsx:165,284`) and the ledger dates (`LedgerHub.tsx:143`).
- `the-street.ts` — add `/council/ledger` to the Council's rooms, and
  `{ href: '/', label: 'The Hearth' }` to the Hearth's, so both are in the map.
- `DocsContent.tsx:81` — repoint the hub's "The Ledger" card at
  `/transparency`, the public telling a docs reader wants.
- `DocsHero.tsx:44` — derive "18 documents" from `DOC_SECTIONS` rather than
  typing it.
- `effects.ts:50,89` — `codex` (forge) and `communityDomain` resolve to the
  same three stops. If the two realms should differ, one gradient wants
  choosing.
- A light theme needs a different link token: neurospark reads 10.5:1 on
  deepSpace and 1.6:1 on a light ground.
- `donate/page.tsx:16` — `setDonationComplete` is never called; the room
  retires whole, so this goes with it.

- The words (KP ⚛ 2026-08-24: *"vendor should be merchant, creator should be
  artisan, creations should be wares"*): rename `/forge/guides/creator-onboarding`
  → `artisan-onboarding` and `vendor-onboarding` → `merchant-onboarding`
  (routes, titles, copy, the hub's cards), and sweep every page's copy for
  the three old words. — landed by the conductor, 2026-08-24. **The canvas's
  own sweep, same day: 2 replacements in drawn copy** — the transparency
  thumbnail's stat label on ④ and the same tile on the merged-transparency
  refusal, both "Creator" → **"Artisan Profit" / "Artisan"**, which is also
  what `transparency/page.tsx:137,149` already says on disk. No board of this
  canvas cites `creator-onboarding`, `vendor-onboarding` or
  `application_type`, so no ground citation needed the rename printed beside
  it.

## Corrections
**2026-08-24** — the words (KP ⚛, verbatim: *"wording is mixed. vendor should
be merchant, creator should be artisan, creations should be wares"*). Swept all
nine artboards, `canvas.json` and the seeded page: **2 replacements**, both
drawn copy, both on the transparency stat trio (④ and the merged-transparency
refusal). No occurrence of "vendor" or "creation" stood anywhere on the canvas;
no KP quote was touched; no ground citation was rewritten. Republished to the
same URL, favicon ⚒️ held, label `the-words`. Opus, `claude-opus-5[1m]`.

## Steps
| step | state |
|---|---|
| U — the brief, engraved | closed |
| P — the canvas at KP's eye | **closed** 2026-08-24 at KP's ⚛ word, verbatim: *"we can build hepaestus fixes if they are not live yet. the boards look good."* |
| S — the spec | **closed** 2026-08-25 — `SPEC.md` beside this file (34,145 B; 52 printed checks: ① 10 · ② 10 · ③ 10 · ④ 14 · ⑤ 8). Reads whole to one Sonnet skeptic before B. |
| B — the build | **closed** 2026-08-25 — nine commits on `refine/hephaestus-2026-08-24`, 55 files, tsc 0 · build 0 · 262 pages, thirteen pictures at `build/` |
| V — the three lenses | **closed** 2026-08-25 — 48/52 pass · 2 refuted non-blocking · 2 unreached · 0 unaccounted · 0 generated touched |
| G — merged | **closed** 2026-08-25 — `--no-ff` into `main` by the conductor; the branch deleted; KP's glance on the live pages |
| C — carry | the proof folder stays where it was born; this table closes with the merge |

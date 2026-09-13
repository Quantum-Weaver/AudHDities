# (mnemosyne) — the street register, the Council Eternal, the Vision's links, the group boundaries

## What stands now

**The street.** `src/lib/constants/systems/the-street.ts` is the one register and
carries every room named below; each was read on disk before its row was written.

- The Observatory realm held one room. It now holds the eight Observatory rooms
  (`/observatory`, `/observatory/timeline`, `/observatory/patterns`,
  `/observatory/prophecy`, `/observatory/constellations`, `/observatory/ancestors`,
  `/observatory/schema`, `/observatory/origin`), `/questionaire`, and the Grammar's
  five index rooms (`/grammar`, `/grammar/explore`, `/grammar/senses`,
  `/grammar/folksonomies`, `/grammar/schemes`). Labels are each page's own title.
- The Bridge carries `/connect/feed`, `/connect/emeralds`, `/connect/invitations`,
  `/connect/translations`.
- The Library carries `/library/dailies/sudoku`.
- The Stage & Studio carries the six other Stage rooms (`live`, `music`, `comedy`,
  `recordings`, `schedule`, `studio`) and the nine Loom rooms (`writing`, `art`,
  `music`, `audio`, `video`, `animation`, `graphics`, `effects`, `export`).
- The Council carries `/council/applications`, `/council/curators`,
  `/council/delegation`, `/council/reports`, `/council/admin`.
- The Bazaar carries `/bazaar/works`. The page is `[id]` only on disk today.
- The Realms realm's front door is `/cosmic` and carries a `/cosmic` row; no page
  stands at `/cosmic` on disk today. Its whisper reads "The house's own dress" and
  the `/environments` row reads "The Crossing Hall — the house's own places".

**The Council Eternal.**
`src/components/asgard/domains/mnemosyne/ancestors/AncestorsCouncil.tsx` read
`council_houses?is_active=true&order=order_index.asc`; neither column exists in
`src/lib/generated/supabase/database.types.ts`, so the generated route at
`src/app/api/generated/themis-governance/council_houses/route.ts` threw and the room
rendered an empty grid. The read is now `?sort=display_order&order=asc`, the shape is
`CouncilHousesRow` from
`src/lib/generated/types/themis-governance/council_houses.ts`, and the card reads
`id`, `name`, `description`, `slug`, `deity_alignment` and `icon_url`. The glyph and
the tile fill come from `COUNCIL_SEATS` and `sigilFill` in
`src/lib/nexus/council-contract.ts` through its own `houseFor` matcher. The link is
`/nexus/council/<slug>`, which is what `seatForSlug` resolves. The local
`council_houses_id`, `display_name`, `emoji`, `color`, `primary_domain` fields and the
`DOMAIN_LABELS` map keyed on them are gone. An empty answer says so in one sentence.

**The Vision.** `src/components/asgard/domains/mnemosyne/prophecy/ProphecyVision.tsx`
carried a local `Quest` shape with a `quests_id` field and linked
`/library/quests/<id>`; `src/app/(athena)/library/quests/[slug]/page.tsx` keys on
`slug`. The list is now `QuestsRow[]` from
`src/lib/generated/types/athena-gamification/quests.ts`, reading `id`, `name` and
`slug`, and the link is `/library/quests/<slug>`.

**The Schema.** `src/app/(mnemosyne)/observatory/schema/page.tsx` opened the cards for
`profiles` and `products`; `src/lib/schema/schema-data.json` holds neither of its 125
tables. It opens `community_profiles` and `wares`.

**Group boundaries.** `src/app/(mnemosyne)/loading.tsx`, `error.tsx` and
`not-found.tsx` stand. Before them the group fell to `src/app/error.tsx` and had no
loading or not-found file of its own.

**Read and left whole.** `ObservatoryHub.tsx`, `TimelineSpiral.tsx`,
`PatternWeave.tsx`, `GrandPattern.tsx`, `AcidTestLoader.tsx` — every table, column and
route they name stands in the generated types. The Grammar rooms under
`src/components/asgard/domains/mnemosyne/grammar/` and
`src/lib/grammar/grammar-read.ts` read the KNOWLEDGE base
(`NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE`), whose tables are not in
`database.types.ts` or the superposition table list.

## Gates

`npm run type-check` — exit 0, before and after.
`npm run lint` — exit 1 before and after; the tree moved from 729 to 720 errors while
other hands worked in it. Over `src/app/(mnemosyne)`,
`src/components/asgard/domains/mnemosyne` and `the-street.ts`: 14 errors and 15
warnings before, 13 errors and 12 warnings after. The seven files written or edited
here carry zero errors; the five warnings on them are the unused imports that stood in
`observatory/schema/page.tsx` before this work.

# 2026-09-09 — THE APPS, the company page at /apps (hephaestus)

*Nothing committed, no SQL run, no build, no dev server.*

## What the page is

`src/app/(hephaestus)/apps/page.tsx` is a public server page with
`export const revalidate = 3600`, rendered inside
`<Page showForeground={false} showContinuityBeam={true}>` in
`container mx-auto max-w-[1152px] px-6`, on the pill · h1 · lead pattern of
`src/app/(aethelred)/nexus/api/page.tsx`: the pill reads `AudHDities LLC`, the
h1 reads `The apps`, the lead reads
`AudHDities LLC is a United States software publisher.`

Below the header stands the company block, in this order:

| part | words | source |
|---|---|---|
| contact | `Contact for anything in this policy: support@audhdities.com` | `docs/privacy/privacy.md:15` |
| mailing address | `Mailing address: AudHDities, 2005 N. Prospect Ave #1134, Champaign, IL 61822, United States` | `docs/privacy/privacy.md:16` |
| how the apps are built | `Our apps keep everything on your device, ask for no account, and send nothing to a cloud; each is built for our own household first, then offered to everyone, free or fairly priced.` | the page |
| links | Privacy `/apps/privacy` · Terms `/terms` · Contact `/contact` · Press `/press` | the four routes under `src/app/(hephaestus)/` |

The email carries a `mailto:` and its own address as its text. No address
appears on the page but the one `docs/privacy/privacy.md:16` states.

## The read

`src/lib/apps/apps-read.ts` exports one read, `readPublishedApps()`, through
`createApiSupabase('knowledge')` (`src/lib/api/supabase.ts:20`) — the plain
client, no cookie store, no session, the KNOWLEDGE project's own RLS deciding
what the anon door gets. It selects the 23 columns of `APP_COLUMNS`, filters
`beacon_type` to `app` and `game`, and orders by `name` ascending. It returns
`{ table, rows, fault, doorNamed }`: `doorNamed: false` with no rows when
`NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE` or `NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE`
is absent, `fault` carrying the base's own message when the read is refused.

`knowledgeDoorNamed()` and `REGISTER_TABLE`, `REGISTER_REFUSED`, `DOOR_UNNAMED`
and `NO_DEFINITION` are imported from `src/lib/nexus/gateway-read.ts` and
`src/lib/nexus/gateway-contract.ts` rather than restated; neither file was
edited.

## The columns

`name · slug · beacon_type · status · definition · repo_url · is_public ·
version · icon_emoji · available_on · audhdities_status · galaxy_status ·
microsoft_status · play_status · audhdities_listing_url · galaxy_listing_url ·
microsoft_listing_url · play_listing_url · audhdities_price_cents ·
galaxy_price_cents · microsoft_price_cents · play_price_cents · currency`.
The row type is `Database['public']['Tables']['beacons']['Row']` from
`src/lib/generated/supabase/knowledge/database.types.ts:205`. `story` and `home`
are not selected and never render.

## The standing line

`src/lib/apps/apps-contract.ts` holds the four channels
(`APP_CHANNELS`: audhdities · galaxy · microsoft · play, each with its status,
listing url and price column) and the vocabulary
(`STANDINGS`: planned · building · internal_testing · closed_testing ·
open_testing · in_review · published · rejected · withdrawn, and `none`).

- `standingEntries(app)` keeps only the channels whose status is neither empty
  nor `none`, in channel order.
- `standingWords(value)` opens underscores into spaces.
- `priceWords(cents, currency)` is `free` at 0, `$x.xx` when set and the
  currency is USD, `x.xx CUR` when the currency is anything else, and null when
  the cents column is null.
- `standingText(entry)` is `<channel> <standing>` and the price when set.
- `standingLine(app)` joins the standing channels with ` · `; when no channel
  stands and `available_on` is empty it is `not yet in any store`; when no
  channel stands and a platform is named it is null.
- `platformsLine(app)` is `available on · <names>`, null when `available_on`
  holds nothing.
- `countLine(rows)` is `<n> apps and games in the register · counted from rows`.

## The render

`src/components/asgard/domains/hephaestus/apps/AppsRegister.tsx` prints the
door-unnamed sentence when the door is not named, the three-part fault when the
register refused the read (`the register refused this read` · `beacons · <the
base's message>` · `next · a read policy on beacons for the anon door`), and
otherwise a three-column grid of `AppCard` and the count line.

`AppCard.tsx` renders one row: the `icon_emoji` tile (the register's glyph, or
a `Package` mark when the row holds none), the name and slug, the `definition`
through `withHouseWords` so `KP` carries its footnote to `/about`, badges for
`beacon_type`, the version when present and the platforms line, the standing
line with each channel linked when the register holds a listing url, and the
repo address when `is_public` and `repo_url`. The Card rune is `variant="glass"`
`radius="lg"`.

## The two constants

- `src/lib/constants/systems/environments/page_mapping.ts:623` — `'/apps'`,
  `default: 'home'`, title `The apps`, subtitle `What AudHDities publishes`,
  above its `'/apps/privacy'` sibling.
- `src/lib/constants/components/bifrost/footer.constants.ts:14` —
  `APPS: { href: '/apps', label: 'Apps' }` in `FOOTER_LINKS`, and
  `src/components/bifrost/Footer.tsx:48` carries it in the default links beside
  `TERMS` and `PRIVACY`. Nothing else in the footer changed.

## What was verified

- `npx tsc --noEmit` — no output.
- `npx eslint` on the nine touched files — exit 0; two pre-existing warnings on
  lines this work did not touch (`Footer.tsx:9` `Container` unused,
  `page_mapping.ts:3` `HeaderData` unused).
- `npx tsx .journals/proofs/hephaestus-the-apps/prove-apps.ts` — **28 of 28**.
- No emoji in any new source file; the only non-ASCII characters are the middle
  dot, the em dash and the banner box rules.
- Port 3000 answered nothing, so no page was fetched.
- The select was run once against the KNOWLEDGE base through the anon door with
  the columns the cards print: 21 rows, 19 apps and 2 games, ordered by name,
  no fault. The count line will read
  `21 apps and games in the register · counted from rows`.

## What stands open

- Where the two knowledge variables are absent the page prints
  `register unread · the knowledge door is not named on this host` in place of
  the grid; that branch was not exercised, since `.env` names both here.
- Every one of the 21 rows carries `none` in all four standings and an empty
  `available_on`, so every card prints `not yet in any store` until the register
  is rowed. Five rows carry an `audhdities_price_cents` while
  `audhdities_status` is `none`; a price on a channel that does not stand is not
  printed.
- A row whose four standings are `none` and whose `available_on` is empty prints
  `not yet in any store`. No register row was read from here, so which rows are
  in that state was not confirmed against the base.
- `npm run build` was not run and no dev server was started.

# the map, the sky, the dead config, the records

## 2.1 · the map

`src/components/seidr/immersive/Learscail.tsx`

- `watchAsWords` is exported (`:182`).
- The drawing box carries a ref and a `ResizeObserver`; `box` holds its
  measured width and height, `BOX_AT_REST` is `1200 × 800` until the first
  measure.
- `unfurl(mappa, box)` surveys the land at those numbers, and the `<svg>`
  viewBox and the vellum `<rect>` are drawn to them.

`src/components/bifrost/MapDialog.tsx`

- Reads the same choice through `useSyncExternalStore(watchAsWords,
  readAsWords, () => false)`.
- The flat index is `asWords ? 'hidden' : 'hidden md:block'` — it stands
  beside the drawing and folds when the Léarscáil is showing its tree.

`src/components/asgard/domains/hestia/vessel/scene/RealmMapFurniture.tsx`

- The unfolded map's box is `mb-5 min-h-0 flex-1` and `Learscail` takes
  `className="h-full"`, so the box has a height for the survey to read.

Discovery is unchanged: `useDiscovery` writes a realm name when the vessel
walks into it (`LearscailScroll.tsx:27`); undiscovered ground draws unnamed on
the SVG, and `StreetTree` names every realm at every width.

## 2.17 · the-sky

`src/lib/sky/index.ts` is a byte-identical copy of
`../resonance-awen/tools/the-sky/src/index.ts`, sha256
`46f45240c238bbc3ec965df2083e9ca74d1f13a2c20208213e9c558bcf5f89ba`,
`the-sky` 0.1.0. `src/lib/sky/MIRROR.md` names the source, the version and the
sha. No file in this tree imports it. `package.json` is unchanged.

## 2.18 · the dead navigation config

`src/lib/constants/systems/environments/navigation.ts` is deleted.
`NAVIGATION_CONFIG`, `filterNavItems`, `NavItem` and `NavigationConfig` had no
importer; the file was not in the folder's `index.ts`; its secondary entry
`/support` has no route. The Sanctuary's doors are defined once, in
`src/lib/constants/systems/the-street.ts`.

`src/app/sitemap.ts:5-8` named the deleted file as the law for what is public;
it now states the rule the list follows.

`DISCORD_WEBHOOK_ANNOUNCEMENTS` has no reference in any file under `src/`,
`docs/`, `supabase/` or the root config. Its only occurrence in the repo is a
line in `.env`, which was not opened or edited.

Two other dead definitions of the same object stand and were not touched:
`src/lib/types/components/bifrost/navigation.types.ts` (a second `NavItem`)
and `src/lib/utils/components/bifrost/navigation.utils.ts`
(`isNavItemVisible`, `filterNavItemsByContext`) — neither has an importer.

## 2.19 · the records

Read 2026-09-13 between 18:11Z and 18:25Z.

| record | what it now states |
|---|---|
| `src/app/(hermes)/README.md` | 23 page files, 17 rooms, 6 `permanentRedirect`; the `pricing_model` enum's four values; the three display rulings at their addresses; the data table over `wares`, `works`, `artisan_profiles`, `merchant_profiles`, the two participant tables and `exchanges` |
| `src/app/(hermes)/_NOTEPAD.md` | the four 2026-07-09 questions answered from the code; no dangling import class remains; `ProductCard.tsx` named as an orphan |
| the seven room notepads | the three redirect folders say where their room went; checkout, contributions and studio state their wired reads and writes |
| `src/app/(prometheus)/README.md` | 22 pages; the Stage reads and writes one table, `events`; nine Loom rooms draw one card each; the pasted copy of the aethelred README removed |
| `src/app/(themis)/README.md` | 17 pages; `requireAdmin` on the three `/council/admin` routes; the vote upserts `votes`; proposal creation and application review write; delegation has no table |
| `src/app/(hephaestus)/REALM-BUS.md` | standing state only: 21 pages, 68 components, three live wires, `MarkdownViewer` orphaned, `/careers` settled to `/calling`. The signed entries are untouched |
| `src/app/(cosmic)/REALM-BUS.md` | standing state only: 7 rooms, zero base reads, one write (`BeingThere.tsx:43`), `Theater.tsx` orphaned, 252 registry entries in 8 groupings |
| `BUILD-STATE.md` | 118 tables, 884 generated files, 166 page files by group, 21 stylesheets all loaded, the server gates, the four groups with their own boundaries |

`src/app/(aethelred)/README.md` — the Nexus access table was not edited. It
was stale at 18:11Z (tier and admin gates that did not exist) and another hand
rewrote it and the nexus pages during this sitting. As read at 18:25Z, eight
of nine pages call `redirect(buildRedirectUrl(...))` for a signed-out visitor;
`/nexus` itself and `NexusHub` carry no gate, and the table's single row says
"every room in this group".

## Against the plan's findings

| plan claim | what the code shows |
|---|---|
| 2.19 "the Nexus access table … under `docs/`" | it lives at `src/app/(aethelred)/README.md`; nothing under `docs/` holds it |
| 2.15 "the 14 unloaded stylesheets imported" | all 21 generated sheets are imported — 14 in `globals.css:12-25`, 7 in `layout.tsx:6-12` |
| 2.14 "`/cosmic` hub page" | `src/app/(cosmic)/cosmic/page.tsx` stands, and the street's Realms front door is `/cosmic` |
| 0.5 "`/colors` holds the still material" | `src/app/(cosmic)/colors/page.tsx` stands; it is not in `the-street.ts` |
| 3.13 "the Stage's write path: a go-live form writing `events`, gated to artisan and merchant" | `StreamSetup.tsx:43,66-67` does exactly this |
| 3.8 "the vote written to `votes`; proposal creation" | `voting/vote.ts` upserts `votes`; `proposals/write.ts` inserts `proposals` |
| 3.8 "a server gate on `/council/admin`" | `admin/gate.ts` `requireAdmin` stands on all three admin routes |
| 3.7 "nothing writes `artisan_profiles` or `merchant_profiles` today" | `applications/review.ts` writes both on approval and grants the role |
| 2.7 "the thank-you route built or the submit redirected" | `/council/applications/thank-you` stands; `ApplicationForm.tsx:328` sends there |
| 3.18 "group boundaries for `(athena)`, `(mnemosyne)`, `(prometheus)`, `(themis)`" | those four are the groups that have them; the other seven do not |
| 4.9 "the 93 non-asgard components" | `playground/registry.tsx` holds 252 entries in 8 groupings, 250 with a render |

## Gates

`npm run type-check` — clean before and after.
`npm run lint` — 1200 problems (729 errors, 471 warnings) before; 1165 (721,
444) after. The drop is the deleted `navigation.ts`. Every file touched lints
clean.

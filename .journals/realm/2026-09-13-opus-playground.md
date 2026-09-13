# The Playground, whole

## What stands

| piece | address |
|---|---|
| the registry | `src/components/asgard/domains/cosmic/playground/registry.tsx` |
| the Playground | `src/components/asgard/domains/cosmic/playground/Playground.tsx` |
| the page | `src/app/(cosmic)/playground/page.tsx` |

The page sits under `(cosmic)`, not `(hephaestus)`.

## The counts on disk

Exported React components per grouping, counted from the files themselves.

| grouping | files | components |
|---|---|---|
| bifrost | 10 | 18 |
| forging | 12 | 18 |
| hof | 8 | 66 |
| runes | 33 | 64 |
| seidr | 15 | 48 |
| shapes | 3 | 3 |
| vegvisir | 7 | 24 |
| yggdrasil | 5 | 11 |
| total | 93 | 252 |

The plan row 4.9 counts files, not components, and reads 93.

## The registry

`REGISTRY` holds 252 entries, one per exported component: `name`, `grouping`,
`importPath`, an optional `render` carrying a minimal props example, and an
optional `note`. `GROUPINGS` holds the eight names; `entriesIn(grouping)`
returns a grouping's entries.

250 entries render. 2 are name only, each with a note:

| entry | note |
|---|---|
| `AspectRatioVideo` | Needs a video file; public/ carries none. |
| `AspectRatioEmbed` | Needs an embeddable URL and a title. |

Entries whose component reads a context render inside the parent that provides
it: `Tabs`, `Accordion`, `Sidebar`, `Table`, `Avatar`, `Dialog`, `Tooltip`,
`RadioGroup`, `FormValidationProvider`, `BreadcrumbList`.

Entries whose component is controlled render through a demo component held in
the same file: `SwitchDemo`, `RadioDemo`, `ValidationField`, `FilterBarDemo`,
`SortDropdownDemo`, `PaginationDemo`, `CompactPaginationDemo`,
`SimplePaginationDemo`, `DrawerDemo`, `FilterDrawerDemo`, `ModalDemo`,
`ConfirmationModalDemo`, `ToasterDemo`, `SidebarWrap`, `DialogWhole`,
`TooltipWhole`.

## The Playground

One `Tabs` over the eight groupings; the inactive panels unmount. Each panel
heads with its grouping, its component count, how many render and how many are
name only, then one card per entry carrying the name, the import path, and
either the preview or the note. Each preview box carries `transform-gpu`, which
keeps a fixed-position preview inside the box.

Under `src/components`, only `Playground.tsx` was rewritten and `registry.tsx` added; no component file was edited.

## Gates

`npm run type-check` — clean.
`npm run lint` — no error and no warning in the three files above.

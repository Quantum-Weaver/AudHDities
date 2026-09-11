# the faces wear the testing tracks — 2026-09-10

Team D of `resonance-chamber/desk/THE-TESTING-TRACKS-PLAN.md` §5.

## what the work did

- `src/lib/nexus/gateway-contract.ts` — one definition of the four channels'
  track columns: `TESTING_TRACKS` (Play · Galaxy · Microsoft · AudHDities, each
  with `_status`, `_testing_version`, `_published_version`, `_testing_url`,
  `_listing_url`), `TRACK_COLUMNS`, `TESTING_PUBLIC_COLUMN`, the `TrackRow`
  type, `trackCells`, `testItLinks`, `showsTracks`, `statusWords`,
  `trimmedText`, `NO_STANDING`, `STORE_TYPES`, `TESTING_FLAG_UNREAD`.
  `GatewayBeacon` gained `TrackRow`; `BEACON_COLUMNS` gained the twenty track
  columns and the flag, `BEACON_COLUMNS_UNFLAGGED` the twenty alone.
  `STORE_STANDINGS` removed: the strip carries what it carried.
- `src/lib/nexus/gateway-read.ts` — `readRegister`, the register read that,
  when the base answers that `beacons.testing_public` does not exist, reads
  again without it, reads every row's flag false and carries one sentence;
  any other refusal is carried whole with no second read. `BeaconRead` is
  `RegisterRead<GatewayBeacon>` and gained `tracksNote`.
- `src/lib/apps/apps-contract.ts`, `apps-read.ts` — `PublishedApp` gained
  `TrackRow`; `APP_COLUMNS` composes `TRACK_COLUMNS` and the flag,
  `APP_COLUMNS_UNFLAGGED` drops the flag; `APP_TYPES` is `STORE_TYPES`;
  `NO_STANDING` and `statusWords` come from the Gateway contract;
  `readPublishedApps` reads through `readRegister`.
- `src/app/(aethelred)/nexus/api/page.tsx` — the view carries `tracksNote`.
- `src/components/asgard/domains/aethelred/nexus/RepoConstellation.tsx` — the
  `Tracks` strip on each beacon card: one cell per store with the store's name,
  the status in plain words, `none` where the column is empty, the testing and
  published versions where they stand, and the testing link as a link. The
  strip prints for an app or a game, and for any beacon standing in a store.
  The sentence for a register with no flag column prints beside the source
  lines.
- `src/components/asgard/domains/hephaestus/apps/AppCard.tsx` — the `Test it`
  line: one named link per store whose testing url stands, and only where
  `testing_public` is true. Nothing renders otherwise, not even a heading.
- `.journals/proofs/aethelred-the-testing-tracks/` — `prove-tracks.tsx`,
  `PROOF.md`, `results.json`: 38 checks over the cells, the flag, the two
  selects, the read that meets no flag column, and both faces rendered to
  static markup.
- `.journals/proofs/aethelred-the-gateway/prove-gateway.ts` and
  `hephaestus-the-apps/prove-apps.ts` — fixtures gained the track columns and
  the flag; `standingWords` reads `statusWords`; the apps select is 36 columns.
  Both PROOF.md column rows trued.

## what stands

```
npx tsc --noEmit -p tsconfig.json            exit 0
npx eslint <the seven touched files>         exit 0
npx tsx .../prove-gateway.ts                 43 of 43
npx tsx .../prove-apps.ts                    28 of 28
npx tsx .../prove-tracks.tsx                 38 of 38
npm run build                                Compiled successfully · 305/305
```

## what is short

`public.beacons.testing_public` is not in the live register:
`resonance-grammar/docs/sql/150-the-testing-public.sql` is drafted, not run.
Until it runs, both faces read the register a second time without the column,
every row reads the flag false, no testing link reaches the public apps page,
and the Gateway prints the one sentence naming the column.

The strip's data and the Test it line's data are proved against fixtures and
rendered to markup; neither has been read from the live knowledge door.

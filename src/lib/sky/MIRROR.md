# DISTRIBUTED MIRROR

Source: `../resonance-awen/tools/the-sky/src/index.ts`

Version copied: `the-sky` 0.1.0

sha256 of `index.ts` in this folder: `46f45240c238bbc3ec965df2083e9ca74d1f13a2c20208213e9c558bcf5f89ba`

`index.ts` in this folder is never edited here. It is refreshed from the source above.

## What it holds

`readSky(date)` returns the moon reading, the season against the wheel of the
year, each planet's sign, and the meetings within the orb. `julianDay`,
`moonPhase`, `equinoxSolstice`, `wheelOfYear`, `season`, `planets` and
`meetings` are exported beside it, with `MOON_PHASES`, `MOON_EMOJI` and
`ZODIAC_SIGNS`. Computation is UTC and offline; the water imports nothing.

## Readers in this tree

None. Import from `@/lib/sky`.

# Cosmic, room by room

## What each room is now

| room | address | state | reads |
|---|---|---|---|
| The Design Playground | `src/app/(cosmic)/cosmic/page.tsx` · `CosmicHub.tsx` | built | `HALL_ORDER` · `PLACE_DISPLAY` · `setMapOpen` |
| The Crossing Hall | `src/app/(cosmic)/environments/page.tsx` | stands | `HALL_ORDER` · `PLACE_DISPLAY` · `getEnvironmentAffect` |
| Being There | `src/app/(cosmic)/environments/[id]/page.tsx` | trued | `PLACE_DISPLAY` · `getEnvironmentAffect(env, variant)` |
| The Colours | `src/app/(cosmic)/colors/page.tsx` · `Colours.tsx` | built | `colors.ts` seven registers · `effects.ts` `GRADIENTS` |
| The Grimoire | `src/app/(cosmic)/effects/page.tsx` · `EffectsGrimoire.tsx` | rebuilt | `GLOW_EFFECTS` · `SHADOWS` · `BACKDROP_EFFECTS` · `HOLOGRAPHIC_EFFECTS` · `DOMAIN_COLORS` · `MOOD_COLORS` · `ENERGY_COLORS` |
| The Theater | `src/app/(cosmic)/theater/page.tsx` · `MovingStage.tsx` | re-founded | the 14 generated stylesheets the root layout does not import |
| The Sandbox | `src/app/(cosmic)/playground/page.tsx` | untouched | components |

## The counts, verified on disk

| claim | read | stands |
|---|---|---|
| named colours | 222 across seven registers (`QUANTUM_COLORS` 158 · `COUNCIL_COLORS` 10 · `STATUS_COLORS` 7 · `MOOD_COLORS` 8 · `ENERGY_COLORS` 6 · `PRIDE_COLORS` 21 · `DOMAIN_COLORS` 12) | yes |
| gradients | 86 in `effects.ts` `GRADIENTS`, not in `colors.ts` | yes, at another address |
| generated classes | 622 distinct across 21 sheets, not 592 | no |
| unloaded stylesheets | 14 | yes |
| the Grimoire's wrong classes | `glow-quantum` · `glow-cosmic` · `glow-neurospark`; the emitted utilities are `shadow-glow-*` | yes |

## The variant register

`src/lib/constants/systems/environments/affects.ts` holds `SOUL_DEEPENINGS`:
three `GradientKey` per place-soul, eleven souls, all from the 86.
`getEnvironmentAffect(environment, variant)` clamps 1–4 through `clampVariant`;
register 1 wears `BEAM_COLORS[env]`, registers 2–4 wear the deepenings.
`EnvironmentLayer.tsx` passes its `variant` through; `Page` already passed one.
`BeingThere.tsx` passes the chosen register, so the four buttons under
"Deepen the Crossing" change the sky and the saved `env:variant` preference
means what it says.

## The stylesheets

`src/app/globals.css` lines 11–25 import the 14 sheets nothing loaded:
attention-modes · attention-selector · ceremonies · ceremonies-refuge ·
consciousness-depth · deity-voices · ensemble · eternal-witness · gates ·
glow-field · pause-state · scene · supportive-affordances · transcendence.
`ceremony-farewell` (`FarewellCeremony.tsx:53`) and `ceremony-welcome`
(`VelkominGreeting.tsx:95`) now receive their beat durations, delays and
fill-mode; both already supply their own `animationName`, and both keyframes
(`fadeInUp`, `consciousnessBreath`) stand in `animations.css`.

## Names trued

`places.ts` `PLACE_DISPLAY`: architecture → The Nexus · origin → The Origin ·
invitation → The Calling · lounge → The Comedy Hearth. Each is the title the
house's own build gives the rooms that place dresses in `page_mapping.ts`.
`page_mapping.ts`: `/environments` → The Crossing Hall · `/environments/*` →
Being There · `/theater` and `/effects` subtitles trued · `/cosmic` and
`/colors` added.

## An unknown place

`BeingThere.tsx` no longer resolves an unknown id to the Hearth. `known` is
`rawId in PLACE_DISPLAY`; when false the room says "No such place", names the
id, lists the eleven that stand, links back to the Crossing Hall, and does not
call `setEnvironment`.

## Gates

`npm run type-check` — exit 0, no output.
`npm run lint` — 1115 problems (703 errors, 412 warnings) tree-wide; over the
files this hand touched, 0 errors and 1 warning (`page_mapping.ts:3:69`,
`HeaderData` unused, pre-existing). Before this sitting those same files
carried 2 errors and 2 warnings.
`globals.css` through the repo's own PostCSS and `@tailwindcss/postcss`:
compiles, no warnings, every probed class from the 14 sheets present.

## Not built

`src/components/asgard/domains/cosmic/theater/Theater.tsx` has no importer.
Its Council duty is served by `/nexus/council`, which the Theater links to.
The street (`the-street.ts`) does not list `/cosmic` or `/colors`.
`src/app/sitemap.ts` does.

## Second pass — two pages trued

`src/components/asgard/domains/cosmic/effects/EffectsGrimoire.tsx` — the lede
names the glows, shadows, backdrops, holographic layers, domain registers and
the mood and energy text runs as read from the cosmic tokens, and names the
rest as written out in the file. `NAMED_IN_FILE` is
`ANIMATION_CLASSES.length + NAMED_TEXT_CLASSES.length`, 48 as the arrays
stand, and the lede prints it.

`src/app/(cosmic)/colors/Colours.tsx` — `NAMED_COUNT` is gone. The lede prints
`REGISTER_ENTRIES` named colours across `REGISTER_COUNT` registers,
`DOMAIN_SHADES` shades across `DOMAIN_COUNT` domains, and `GRADIENT_COUNT`
gradients. As the tokens stand: 210 across 6, 48 across 12, 86 gradients —
the swatches and cards the page renders.

## Gates

`npx tsc --noEmit` — exit 0, no output.
`npx eslint` over `EffectsGrimoire.tsx` and `Colours.tsx` — exit 0, 0 errors,
0 warnings.

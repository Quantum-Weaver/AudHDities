# The rung ladder off the Tapestry, onto the artisan's profile

## What was built

- `src/components/asgard/domains/hermes/wares/WaresGallery.tsx` lists plain wares and works only. The ladder, its `rungs` state and the empty-state exception for rungs are gone; `isRung` still filters rungs out (`:16`, `:127`).
- `src/components/asgard/domains/hermes/wares/RungLadder.tsx` exports `isRung` and `RungLadder({ rungs })`: one maker's rungs sorted by price, the no-perks sentence, the range with its interval, and one linked row per rung. The grouping by maker, the per-maker profile fetch, the heading and the weaver link are gone.
- `src/components/asgard/domains/hermes/artisans/ArtisanTiers.tsx` is new: a `yggdrasil/Accordion` card, closed by default, whose trigger reads "Support · N tiers" and whose body is `RungLadder`. It renders nothing when the artisan has no rungs.
- `src/components/asgard/domains/hermes/artisans/ArtisanDetail.tsx` reads the artisan's published wares once (`/api/generated/plutus-economics/wares?artisan_profile_id=…&status=published`), keeps the rungs, and renders `<ArtisanTiers>` under the profile card.

## The design

The profile is the only surface that renders support tiers. The Tapestry, filtered or not, shows none. `StudioShelf.tsx` imports only `isRung` and is unchanged.

## What stands

`npx tsc --noEmit`: exit 0 before and after. `npx eslint` on the four files: exit 0.

## What waits

- `src/components/asgard/domains/hermes/wares/WareDetail.tsx:231` links "Change the rung" to `/bazaar/wares`, which no longer shows rungs. It belongs on the maker's profile (`/bazaar/artisans/<artisan_profile_id>`).
- A rung with a null `artisan_profile_id` has no surface that lists it.

## Files

- src/components/asgard/domains/hermes/wares/WaresGallery.tsx
- src/components/asgard/domains/hermes/wares/RungLadder.tsx
- src/components/asgard/domains/hermes/artisans/ArtisanDetail.tsx
- src/components/asgard/domains/hermes/artisans/ArtisanTiers.tsx

A hand dealt by Thermocline (Fable) built this at KP's word, 2026-09-23.

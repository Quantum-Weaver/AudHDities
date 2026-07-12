# _NOTEPAD — `bazaar/creators/` · the Weavers
*Room-level working log. Group context: `../../_NOTEPAD.md`. Newest on top.*

## What this room is
The makers' gallery — `/bazaar/creators` (+ `[id]` "Creator Sanctuary").
Components: `CreatorsGallery`, `CreatorDetail`, `CreatorCardRenderer`.

## Gaps (2026-07-09 sweep)
- No dangling imports *in this room's components directly*, but the identity
  layer under it is: `useAuth`/`useUser` + auth API routes import
  `@/types/generated/hestia-core/profiles` — **does not exist**. Live schema
  split profiles three ways: `artisan_profiles` / `community_profiles` /
  `merchant_profiles` (+ `user_private`, `user_roles`, `user_financial`).
- **Open schema question (identity slice, priority row 2):** what is the
  canonical auth-facing identity — Supabase `auth.users` + `user_private` +
  role-specific profile? A creator here = `artisan_profiles` presumably.
  Also: the covenant pledge valve (`covenant_pledge_percent`, the named
  plutus GAP) most likely lands on `artisan_profiles`, and the doc'd
  "pledge public on profile" toggle would surface in the Creator Sanctuary.

## Work log
- **2026-07-09 (Fable + KP):** Reviewed; identity-layer gap traced to the
  three-way profile split; pledge-valve landing site proposed.

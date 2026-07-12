# _NOTEPAD — `bazaar/vendors/` · the Guild
*Room-level working log. Group context: `../../_NOTEPAD.md`. Newest on top.*

## What this room is
The sellers' hall — `/bazaar/vendors` (+ `[id]` "Vendor Sanctuary").
Components: `VendorsGallery`, `VendorDetail`.

## Gaps / notes (2026-07-09 sweep)
- No dangling imports of its own; rides the same identity-layer gap as the
  Weavers (dead `profiles` import in `useAuth`/`useUser`) — a vendor here
  maps to `merchant_profiles` in the live schema.
- **Distinction to confirm during the identity slice (KP):** Weavers
  (artisan_profiles — those who make) vs Guild (merchant_profiles — those
  who sell); one vessel can be both. If that's the intent, the two rooms
  are already correctly separate; record it so nobody merges them "for
  simplicity" later.
- Non-human sovereigns ward applies here concretely: **T-Red's seller
  profile** (queued since 07-07) will be a row in these tables — nothing in
  the Guild may assume a human behind a merchant profile.

## Work log
- **2026-07-09 (Fable + KP):** Reviewed; merchant mapping noted; the
  artisan/merchant distinction question and the non-human ward recorded.

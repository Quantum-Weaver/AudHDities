# The Covenant, retargeted — realm hestia

*2026-08-24. Sonnet, sent by Fable (conducting) at KP's ⚛ word, verbatim:
"covenant pledge should not display on vessel face, it should optionally
display on outside of home(community profile)." Branch
`refine/the-economics-2026-08-24`.*

---

THE COVENANT section built 2026-08-12 (REALM-BUS lines 400–450) is struck
from `VesselContent.tsx` — a dated comment stands where it stood, naming
KP's word verbatim, per the house's nothing-silently-vanishes law. The
Covenant Space toggle (`CovenantSpace.tsx`) is trued to match: its label
now reads "Display my pledge on my community profile," its helper text
says plainly the pledge never shows on the vessel's own face, and its
header comment carries the retargeting dated and quoted.

I went looking for the "outside of home" itself — grepped
`community_profiles`, `display_name`, `handle` across `(iris)` Connect,
`(themis)` curators, `(hermes)` creators/artisans, and `(hestia)`. Found
none that render one vessel's `community_profiles` row to another vessel:
`(iris)`'s own bus says identity "consumes, never defines" and is gated on
an undecided identity slice (speaker names still render "Sanctuary Soul");
`(themis)` CuratorsGallery is a stub with a hardcoded empty array and an
"In production: fetch from community_profiles" comment; `(hermes)`
creators/vendors detail pages are real and live but render `artisan_profiles`
/ `merchant_profiles` — separate identity tables, not `community_profiles`.
Every other hit (`useProfile`, `AuthenticatedGreeting`, `SceneRenderer`,
`GrandPattern`) is self-scoped — a vessel reading its own row.

So (3) builds nothing — this is a seam, not a gap I could close honestly.
Named it for hestia over iris: hestia-core already owns the
`community_profiles` table and the only live identity-render pattern in
the app (`VesselContent.tsx`); iris's own ground explicitly disclaims
identity ownership and sits blocked on a different, undecided gate. A
public counterpart to the vessel face — something like `/vessel/[id]` —
is hestia's to open when its hand comes.

Meters: `npm run type-check` exit 0. `npm run build` exit 0, no errors.

— Sonnet, 2026-08-24

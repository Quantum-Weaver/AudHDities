# 2026-09-13 · the public community profile · platform-hand

## What is now

**The room.** `src/app/(iris)/connect/profile/[slug]/page.tsx` renders
`ProfileRoom` inside `Page` at `/connect/profile/<slug>`. The component is
`src/components/asgard/domains/iris/profile/ProfileRoom.tsx`; the address is
defined once at `src/components/asgard/domains/iris/profile/href.ts`
(`PROFILE_ROOM = '/connect/profile'`, `profileHref(key)`).

**The key.** `community_profiles.slug` is `text not null`
(`src/lib/generated/supabase/database.types.ts:1134`). The room reads
`/api/generated/hestia-core/community_profiles?slug=<key>&sort=created_at&order=desc&limit=1`;
when that returns nothing and the key matches a uuid, it reads the same route
with `created_by=<key>`.

**What it renders.** `avatar_url`, `icon_emoji`, `display_name`, `slug`, `bio`,
`sovereign_tier` through `getTierLabel`/`getTierIcon`
(`src/lib/types/roles.ts:130,140`), and the vessel's `roles` labelled from
`role_catalog` read at
`/api/generated/hestia-core/role_catalog?sort=sort_order&order=asc&limit=20`.
A `status` other than `active` renders a "Not published" badge.

**The offerings.** `hermes-social/artisan_profiles?created_by=<vessel>&status=active`,
then `plutus-economics/wares?artisan_profile_id=<id>&status=published` and
`hermes-social/works?artisan_profile_id=<id>&status=published`, both
`sort=updated_at&order=desc&limit=6`. Ware cards link `/bazaar/wares/<id>`,
work cards `/bazaar/works/<id>`, the loom line `/bazaar/artisans/<id>`.

**The wall.** `community_profiles` carries four owner policies for
`authenticated` — select on `created_by = auth.uid()`
(`docs/sql/009-the-walls-learn-the-new-names.sql:83-85`) — plus the two admin
policies altered at `docs/sql/041-the-gates-face-the-column.sql:90,94`. No
paper grants `select` on `community_profiles` to `anon`. The read of any
active face by any signed-in vessel stands unrun as
`docs/sql/027-the-public-face-DRAFT.sql:52-55`. `role_catalog` is readable by
`anon` and `authenticated` (`docs/sql/042-the-role-catalog.sql:21-24,33`).
With no row in hand the room says which it is: a signed-out visitor is told
the room reads for a signed-in vessel and is given `/login?redirect=<room>`;
a signed-in vessel is told the wall gives them their own face only, with a
link to it.

**The nav link.** `src/components/asgard/domains/hestia/vessel/VesselContent.tsx:216-218`
pushes `{ href: profileHref(profile.slug), label: 'Your profile', icon: UserRound,
id: 'profile' }` onto the vessel hub's quick links.

**The artisan link.** `src/components/asgard/domains/hermes/artisans/ArtisanDetail.tsx:78-87`
is a row: "Return to the Weavers" on the left, and on the right, when
`artisan.created_by` stands, a link carrying `artisan_name` to
`profileHref(artisan.created_by)`.

**Not done.** The chrome slot is
`src/components/bifrost/Navigation.tsx:61`, beside the vessel name at
`Navigation.tsx:172-184`. It is untouched here.

## Gates

`npx tsc --noEmit` — exit 0 at 2026-09-13 over the five files above and the
whole tree. A later run reports one error at
`src/app/api/auth/checkout/route.ts:263` (`cancel_at` on `SubscriptionData`),
a file under another hand; the same tree with that one file excluded is
exit 0. `npx eslint` over the five files — 0 errors, 1 warning
(`VesselContent.tsx:100`, `react-hooks/exhaustive-deps`, standing before this
pass).

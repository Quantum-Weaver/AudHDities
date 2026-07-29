# THE REALM BUS — `(hermes)` · the Bazaar

*Laid 2026-07-29 by Fable 🎻 (lane hermes-realm), by my own hand at the
pattern carried from lane audhd (KP's ⚛ word, verbatim: "each realm
should have its own 'bus' to allow the design reimaginer to work cross
realm as needed without confusion"). One file, one known address: this
realm's standing tabletop.*

## The law of this bus

**Inherited whole, by address, from the Sanctuary's repo-level bus:
[`AudHDities/REALM-BUS.md`](../../../REALM-BUS.md), law plate §1–6** —
append-only · signed `## FROM:` headers · read before writing · the
carrier law · notepads are KP's (read, never edit) · generated layers
are GAIA's (heal by regenerating, never by hand) · work rides branches,
KP merges · privacy always. Plus this realm's own standing law:

7. **`PriceBreakdown` is a protected feature.** The buyer sees the
   split at the moment of purchase — transparency as UX. It survives
   every rewire, every redesign, every crossing (flagged in the
   checkout room notepad, 2026-07-09; carried forward as this bus's
   own law).

## The realm's standing state (kept current by lane hermes-realm)

- **Branch:** `refine/rewiring-2026-07` (repo-wide; KP merges main).
- **Reading order for visitors:** the realm `README.md` (the rooms and
  the old map) → `_NOTEPAD.md` (group-level; the 07-09 findings) →
  room notepads → this bus's messages.
- **The rooms:** 11 routes, all thin `Page` wrappers over
  `components/asgard/domains/hermes/*` (18 components). The Bazaar ·
  the Tapestry (creations) · the Weavers (creators) · the Guild
  (vendors) · the Loom (studio, name-collision question parked) ·
  the Contributions Ledger · Checkout (+cancel/success).
- **The vocabulary verdict, answered by the base itself:** the census
  base (117 tables) gave hermes-social the making and the makers —
  `works`, `work_participants`, `artisan_profiles`, `merchant_profiles`
  — while plutus-economics keeps the selling (`wares`,
  `ware_participants`). The old "hermes-social = just messages" worry
  in the group notepad is history.
- **Open edges (the half-run re-wire, mapped at this lamp's waking):**
  - The Wares edition (2026-07-18) healed `hooks/commerce/useProduct.ts`,
    `useCheckout.tsx`, and `CheckoutButton` — they speak `wares`,
    `pricing_model`, server-side `calculate_sovereign_price`.
  - Still speaking the dead vocabulary: CreationsGallery,
    CreationDetail, StudioCreate, StudioEdit fetch
    `plutus-economics/products`; ContributionsGallery fetches
    `plutus-economics/contributions`; the four creator/vendor
    components fetch `hestia-core/creator_profiles` /
    `vendor_profiles`. Every live replacement exists and is generated.
  - `CheckoutForm` polls `/api/checkout/session/[id]`; the live route
    is `/api/auth/checkout/session/[id]`.
  - StudioCreate still builds the retired tier ladder
    (`price_community`/`price_ally`/`price_corporate`); the Loom needs
    to learn `pricing_model` before it can post.
  - The README maps the old world (tier ladder, Bigot Tax,
    `/api/checkout`, products hooks); it is re-drawn in the same
    sitting the re-wire completes, not before.
- **Gates:** the identity slice (audhd core's seat) rules the
  auth-facing profile vocabulary — creator/vendor re-pointing follows
  its verdicts where they touch `useAuth`/profiles. No re-wire work
  begins without KP's ⚛ word.
- **Cross-realm seams:** `wares`/`ware_participants` (the selling) are
  plutus tables — economics verdicts live in `/SCHEMA-FINALIZE.md`,
  not here · checkout's Stripe wiring rides `stripe_connection`
  (aethelred-connections) · the Contributions Ledger becomes a
  provenance gallery (credit, not payout math — 2026-07-09 verdict).

---

## FROM: hermes-realm · 2026-07-29 — the table is laid

Welcome, whoever sits down. The Bazaar is the realm where the house's
kindness becomes economics, and its ground truth is short: the UI is
complete and warm, the schema underneath it moved twice, and the
re-wire wave stopped legibly mid-realm — hooks healed, galleries and
forms waiting. Everything a visiting hand needs is in the standing
state above; everything it must not touch is in the law plate.
Reimaginer, if a crossing brings you here: the split holds as
everywhere — design is yours, tree surgery is mine, KP's ⚛ eye rules
every crossing — and law 7 rides above every dress this realm ever
wears: the buyer sees the split.

— Fable 🎻 (lane hermes-realm, the realm's keeper)

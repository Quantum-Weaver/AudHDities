# 🦊 HERMES — THE BAZAAR

**Feeling:** Abundant, curious, playful, connected  
**Status:** ✅ COMPLETE — 11 of 11 pages · re-wired to the wares schema 2026-07-31

---

## 📂 DIRECTORY STRUCTURE

```
src/app/(hermes)/bazaar/
├── page.tsx                          # The Bazaar (/bazaar)
├── creations/
│   ├── page.tsx                      # The Tapestry (/bazaar/creations)
│   └── [id]/
│       └── page.tsx                  # Creation Detail (/bazaar/creations/[id])
├── creators/
│   ├── page.tsx                      # The Weavers (/bazaar/creators)
│   └── [id]/
│       └── page.tsx                  # Creator Sanctuary (/bazaar/creators/[id])
├── vendors/
│   ├── page.tsx                      # The Guild (/bazaar/vendors)
│   └── [id]/
│       └── page.tsx                  # Vendor Sanctuary (/bazaar/vendors/[id])
├── studio/
│   ├── page.tsx                      # The Loom (/bazaar/studio)
│   └── [id]/
│       └── page.tsx                  # Edit Creation (/bazaar/studio/[id])
├── contributions/
│   └── page.tsx                      # Contributions Ledger (/bazaar/contributions)
└── checkout/
    ├── page.tsx                      # The Exchange (/bazaar/checkout)
    ├── success/page.tsx              # Exchange confirmed
    └── cancel/page.tsx               # Exchange cancelled
```

---

## 🗺️ PAGE MAP

| Page | Route | Component | Purpose |
|------|-------|-----------|---------|
| **The Bazaar** | `/bazaar` | `BazaarHub` | Marketplace hub linking to all sections |
| **The Tapestry** | `/bazaar/creations` | `CreationsGallery` | Browse published wares with search + type filters |
| **Creation Detail** | `/bazaar/creations/[id]` | `CreationDetail` | Full ware view with pricing model + checkout |
| **The Weavers** | `/bazaar/creators` | `CreatorsGallery` | Active artisan directory with search |
| **Creator Sanctuary** | `/bazaar/creators/[id]` | `CreatorDetail` | Artisan profile with stats, portfolio + "At the loom" (their works, the making itself) |
| **The Guild** | `/bazaar/vendors` | `VendorsGallery` | Active merchant directory with search |
| **Vendor Sanctuary** | `/bazaar/vendors/[id]` | `VendorDetail` | Merchant profile with stats + website |
| **The Loom** | `/bazaar/studio` | `StudioCreate` | Ware creation form (pricing model + residual pool) |
| **Edit Creation** | `/bazaar/studio/[id]` | `StudioEdit` | Edit existing ware with delete option |
| **Contributions Ledger** | `/bazaar/contributions` | `ContributionsGallery` | Provenance gallery — your part in every work |
| **The Exchange** | `/bazaar/checkout` | `CheckoutHub` | Checkout information and economics overview |

---

## 💰 PRICING — THE WARES MODEL (since 2026-07-18)

A ware carries **one base price** and a **`pricing_model`**:

| Model | Meaning |
|-------|---------|
| `free` | Given to anyone who receives it (the Loom's default) |
| `fixed` | One base price; solidarity pricing computed **server-side** by `calculate_sovereign_price` at the Exchange |
| `pay_what_you_want` | The price is a floor, not a wall |
| `patronage_only` | For patrons of the maker's work |

The old client-side tier ladder (community/ally/corporate + Bigot Tax)
died with the `products` table — the kindness is enforced in the schema
now, not re-derived per client. *(One honest remnant: `PriceBreakdown`
carried a dormant `showBigotTax` display prop until 2026-08-25 — **removed whole** in the Bazaar's frame (FIX 25; nothing under `src/` names it now); its
removal or revival belongs to the plutus split-model verdict in
`/SCHEMA-FINALIZE.md`, not to this realm alone.)*

**Display rulings (KP's ⚛ word, 2026-08-01, via the E4 play study):**

- **The quiet square, the plain stall:** gallery cards carry no price —
  the work and its maker lead ("freely given" may still say so, being a
  gift, not a number); the price speaks plainly at the detail page with
  the full `PriceBreakdown` beside it. Worth felt as human before price
  read as number.
- **The empty stall:** when `quantity_available` reaches 0 the stall
  says *"These have all gone home — the maker may weave more"* — never
  a countdown on the way down, never "only 2 left."
- **The third word at every going:** *Gweld ti'n fuan* stands on the
  checkout success page and the set-aside page both.

## 💰 CHECKOUT FLOW

```
Creation Detail → CheckoutButton → useCheckout Hook
    │
    ├── Unauthenticated → Save to sessionStorage → Redirect to Login
    │
    └── Authenticated → POST /api/auth/checkout
         │
         ├── Validates user + ware (status = published)
         ├── calculate_sovereign_price (server-side, per person)
         ├── Inserts ONE pending exchange row
         ├── Creates Stripe Checkout Session
         └── Redirects to Stripe hosted page
              │
              ├── Success → /bazaar/checkout/success → CheckoutForm
              │   polls GET /api/auth/checkout/session/[id]
              │   └── Stripe Webhook → the SAME exchange row completed
              │
              └── Cancel → /bazaar/checkout/cancel
```

**PriceBreakdown is a protected feature** (realm law 7, REALM-BUS.md):
the buyer sees the full split at the moment of purchase — transparency
as UX, through every rewire and every redesign.

---

## 🎨 COMPONENTS USED

| Layer | Components |
|-------|-----------|
| **Bifröst** | `Page` |
| **Runes** | `Card`, `Badge`, `Avatar`, `AvatarFallback`, `Skeleton` |
| **Runes/Cards** | `CardHeader`, `CardContent`, `CardFooter`, `CreatorCardRenderer`, `VendorCardRenderer` |
| **Yggdrasil** | `Button`, `Spinner` |
| **Forging** | `Form`, `FormField`, `Input`, `Select`, `Switch` |
| **Seidr** | `Tooltip` (PriceBreakdown) |
| **Hof** | `Grid` (Tailwind grid) |

---

## 🔒 SECURITY

| Concern | Protection |
|---------|-----------|
| **Ware visibility** | RLS: `status = 'published'` for public SELECT |
| **Ware creation** | Creator role via `useUser().roles` + RLS |
| **Ware editing** | Owner-only via RLS (`created_by`) |
| **Artisan visibility** | RLS + directory filter: `status = 'active'`; verified badge reads `verified_at` |
| **Merchant visibility** | RLS + directory filter: `status = 'active'`; verified badge reads `verified_at` |
| **Checkout** | Authenticated only; validates ware exists + is published |
| **Pricing** | `calculate_sovereign_price` runs server-side — the client never computes a price |
| **Contributions** | User sees only own `ware_participants` rows via RLS |

---

## 📊 DATA DEPENDENCIES

| Page | Live table (deity) | API Route |
|------|--------------------|-----------|
| Creations Gallery | `wares` (plutus-economics) | `GET /api/generated/plutus-economics/wares` |
| Creation Detail | `wares` | `GET /api/generated/plutus-economics/wares/[id]` |
| Creators Gallery | `artisan_profiles` (hermes-social) | `GET /api/generated/hermes-social/artisan_profiles` |
| Creator Detail | `artisan_profiles` | `GET /api/generated/hermes-social/artisan_profiles/[id]` |
| Vendors Gallery | `merchant_profiles` (hermes-social) | `GET /api/generated/hermes-social/merchant_profiles` |
| Vendor Detail | `merchant_profiles` | `GET /api/generated/hermes-social/merchant_profiles/[id]` |
| Studio Create | `wares` | `POST /api/generated/plutus-economics/wares` |
| Studio Edit | `wares` | `PUT /api/generated/plutus-economics/wares/[id]` |
| Contributions | `ware_participants` (plutus-economics) | `GET /api/generated/plutus-economics/ware_participants` |
| Checkout | `exchanges` + Stripe | `POST /api/auth/checkout` · `GET /api/auth/checkout/session/[id]` |

Hand-written hooks: `hooks/commerce/useProduct.ts` (wares read layer) ·
`hooks/commerce/useCheckout.tsx` (the Exchange). The maker↔ware join is
`created_by` (a user id) — profile pages link into the Tapestry with
their profile's `created_by`, never the profile id.

---

## 🏛️ THE COUNCIL'S VERDICT

**Hearth-Keeper:** *"The Bazaar is warm and welcoming. No pressure. No dark patterns. Just sovereign souls exchanging their gifts."*

**Chancellor:** *"The economics are transparent. 10% platform fee, 90% creator share, residual pool flowing to contributors forever. Every transaction visible on the ledger."*

**Seer:** *"The pattern is proven. Galleries, detail pages, creation forms — all compose from existing components. The remaining domains will follow this same template."*

**Executioner:** *"RLS enforced at every layer. Active-only visibility. Owner-only editing. Sovereign pricing computed server-side. No exploitation possible."*

---

*The Bazaar is open. The Tapestry is woven. The Loom awaits the next weaver.*

🏛️✨

# 🦊 HERMES — THE BAZAAR

**Feeling:** Abundant, curious, playful, connected
**Standing:** 23 page files — 17 rooms, 6 permanent redirects.

---

## 📂 DIRECTORY STRUCTURE

```
src/app/(hermes)/bazaar/
├── page.tsx                          # The Bazaar (/bazaar)
├── wares/
│   ├── page.tsx                      # The Tapestry (/bazaar/wares)
│   └── [id]/page.tsx                 # A ware (/bazaar/wares/[id])
├── works/
│   ├── page.tsx                      # The works (/bazaar/works)
│   └── [id]/page.tsx                 # A work (/bazaar/works/[id])
├── artisans/
│   ├── page.tsx                      # The Weavers (/bazaar/artisans)
│   └── [id]/page.tsx                 # An artisan (/bazaar/artisans/[id])
├── merchants/
│   ├── page.tsx                      # The Guild (/bazaar/merchants)
│   └── [id]/page.tsx                 # A merchant (/bazaar/merchants/[id])
├── studio/
│   ├── page.tsx                      # The Loom's shelf (/bazaar/studio)
│   ├── ware/page.tsx                 # A new ware (/bazaar/studio/ware)
│   ├── work/page.tsx                 # A new work (/bazaar/studio/work)
│   └── [id]/page.tsx                 # Edit a ware (/bazaar/studio/[id])
├── contributions/
│   └── page.tsx                      # Contributions Ledger (/bazaar/contributions)
├── checkout/
│   ├── page.tsx                      # The Exchange (/bazaar/checkout)
│   ├── success/page.tsx              # Exchange confirmed
│   └── cancel/page.tsx               # Exchange cancelled
├── creations/                        # permanentRedirect → /bazaar/wares
│   ├── page.tsx
│   └── [id]/page.tsx
├── creators/                         # permanentRedirect → /bazaar/artisans
│   ├── page.tsx
│   └── [id]/page.tsx
└── vendors/                          # permanentRedirect → /bazaar/merchants
    ├── page.tsx
    └── [id]/page.tsx
```

---

## 🗺️ PAGE MAP

| Page | Route | Component | Purpose |
|------|-------|-----------|---------|
| **The Bazaar** | `/bazaar` | `BazaarHub` | Marketplace hub linking to all sections |
| **The Tapestry** | `/bazaar/wares` | `WaresGallery` | Wares and works in one gallery, with search and type filters |
| **A ware** | `/bazaar/wares/[id]` | `WareDetail` | Full ware view with the price breakdown and checkout |
| **The works** | `/bazaar/works` | `WorksGallery` | The works index |
| **A work** | `/bazaar/works/[id]` | `WorkDetail` | Full work view with its participants |
| **The Weavers** | `/bazaar/artisans` | `ArtisansGallery` | Active artisan directory with search |
| **An artisan** | `/bazaar/artisans/[id]` | `ArtisanDetail` | Artisan profile with stats and their published works |
| **The Guild** | `/bazaar/merchants` | `MerchantsGallery` | Active merchant directory with search |
| **A merchant** | `/bazaar/merchants/[id]` | `MerchantDetail` | Merchant profile with stats and website |
| **The Loom's shelf** | `/bazaar/studio` | `StudioShelf` | The maker's own wares and works, filtered by status |
| **A new ware** | `/bazaar/studio/ware` | `StudioForm` (`initialKind="ware"`) | The ware form |
| **A new work** | `/bazaar/studio/work` | `StudioForm` (`initialKind="work"`) | The work form |
| **Edit a ware** | `/bazaar/studio/[id]` | `StudioEdit` | Edit an existing ware, with delete |
| **Contributions Ledger** | `/bazaar/contributions` | `ContributionsGallery` | The vessel's own participant rows |
| **The Exchange** | `/bazaar/checkout` | `CheckoutHub` | Checkout information and economics overview |
| **Exchange confirmed** | `/bazaar/checkout/success` | `CheckoutForm` | Polls the session route until the row completes |
| **Exchange cancelled** | `/bazaar/checkout/cancel` | *(page-local)* | The going, with no ledger entry |

The three older names redirect permanently: `/bazaar/creations` → `/bazaar/wares`,
`/bazaar/creators` → `/bazaar/artisans`, `/bazaar/vendors` → `/bazaar/merchants`,
each with its `[id]` room.

---

## 💰 PRICING — THE WARES MODEL

A ware carries one base price and a `pricing_model`, the four values of the
`pricing_model` enum (`database.types.ts:6344`):

| Model | Meaning |
|-------|---------|
| `free` | Given to anyone who receives it |
| `fixed` | One base price; solidarity pricing computed server-side by `calculate_sovereign_price` at the Exchange |
| `pay_what_you_want` | The price is a floor, not a wall |
| `patronage_only` | For patrons of the maker's work |

No client-side tier ladder stands; nothing under `src/` names a bigot tax.

**What the rooms show:**

- Gallery cards carry no price. `WaresGallery.tsx:143` passes `isGifted` when
  the model is `free`, so a gift is marked and nothing else is.
- The price speaks at the detail page, with `PriceBreakdown` beside it
  (`WareDetail.tsx:194`, `WorkDetail.tsx:203`, `CheckoutButton.tsx:73`).
- When `quantity_available` reaches zero the stall says *"These have all gone
  home — the maker may weave more."* (`WareDetail.tsx:234`). No countdown.
- *Gweld ti'n fuan* stands on the success page (`CheckoutForm.tsx:180`) and the
  cancel page (`checkout/cancel/page.tsx:32`).

## 💰 CHECKOUT FLOW

```
A ware → CheckoutButton → useCheckout Hook
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

`PriceBreakdown` is a protected feature (realm law 7, REALM-BUS.md): the buyer
sees the full split at the moment of purchase.

---

## 🎨 COMPONENTS USED

| Layer | Components |
|-------|-----------|
| **Bifröst** | `Page` |
| **Runes** | `Card`, `Badge`, `Avatar`, `AvatarFallback`, `Skeleton` |
| **Runes/Cards** | `CardHeader`, `CardContent`, `CardFooter` |
| **Yggdrasil** | `Button`, `Spinner` |
| **Forging** | `Form`, `FormField`, `Input`, `Select`, `Switch` |
| **Seidr** | `Tooltip` (PriceBreakdown) |
| **Hof** | `Grid` (Tailwind grid) |

---

## 🔒 SECURITY

| Concern | What the code does |
|---------|-----------|
| **Ware visibility** | The gallery asks the generated route; RLS holds `status = 'published'` for public SELECT |
| **Ware creation** | `StudioShelf` reads `roles` from `useUser()` and walls a non-artisan; the write goes through the generated route |
| **Ware editing** | `StudioEdit` writes through the generated route; ownership is RLS's, on `created_by` |
| **Artisan visibility** | `ArtisansGallery.tsx:27` asks `status=active`; the verified badge reads `verified_at` |
| **Merchant visibility** | `MerchantsGallery.tsx:27` asks `status=active`; the verified badge reads `verified_at` |
| **Checkout** | Authenticated only; the route validates the ware exists and is published |
| **Pricing** | `calculate_sovereign_price` runs server-side (`api/auth/checkout/route.ts:172`); the client never computes a price |
| **Contributions** | The vessel's own `ware_participants` and `work_participants` rows, asked by `user_id` |

---

## 📊 DATA DEPENDENCIES

| Room | Live table (deity) | Route it asks |
|------|--------------------|-----------|
| The Tapestry | `wares` (plutus-economics) · `works` (hermes-social) | `GET /api/generated/plutus-economics/wares` · `GET /api/generated/hermes-social/works` |
| A ware | `wares` · `artisan_profiles` · `exchanges` | `GET /api/generated/plutus-economics/wares/[id]` |
| A work | `works` · `work_participants` · `artisan_profiles` · `exchanges` | `GET /api/generated/hermes-social/works/[id]` |
| The Weavers | `artisan_profiles` (hermes-social) | `GET /api/generated/hermes-social/artisan_profiles` |
| An artisan | `artisan_profiles` · `works` | `GET /api/generated/hermes-social/artisan_profiles/[id]` |
| The Guild | `merchant_profiles` (hermes-social) | `GET /api/generated/hermes-social/merchant_profiles` |
| A merchant | `merchant_profiles` | `GET /api/generated/hermes-social/merchant_profiles/[id]` |
| The Loom's shelf | `wares` · `works` | both generated routes, scoped `created_by` |
| The Loom's forms | `wares` · `works` · `file_registry` | `POST /api/generated/hermes-social/works` · `POST /api/generated/plutus-economics/wares` |
| Edit a ware | `wares` | `GET`/`PUT`/`DELETE /api/generated/plutus-economics/wares/[id]` |
| Contributions | `ware_participants` · `work_participants` | both generated routes, scoped `user_id` |
| Checkout | `exchanges` + Stripe | `POST /api/auth/checkout` · `GET /api/auth/checkout/session/[id]` |

Hand-written hooks: `src/lib/hooks/commerce/useProduct.ts` (the wares read
layer) · `src/lib/hooks/commerce/useCheckout.tsx` (the Exchange).

The maker↔ware join as the rooms read it today: the profile id.
`WareDetail.tsx:59` and `WorkDetail.tsx:82` fetch the profile by
`artisan_profile_id`; `ArtisanDetail.tsx:39` fetches the artisan's works by
`artisan_profile_id`; the Loom stamps `artisan_profile_id` and
`merchant_profile_id` on every row it makes; `/bazaar/wares?artisan_id=` and
`?merchant_id=` carry the profile id they name.

---

*The Bazaar is open. The Tapestry is woven. The Loom awaits the next weaver.*

🏛️✨

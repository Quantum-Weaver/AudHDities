# 🦊 HERMES — THE BAZAAR

**Feeling:** Abundant, curious, playful, connected  
**Status:** ✅ COMPLETE — 11 of 11 pages

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
    └── page.tsx                      # The Exchange (/bazaar/checkout)
```

---

## 🗺️ PAGE MAP

| Page | Route | Component | Purpose |
|------|-------|-----------|---------|
| **The Bazaar** | `/bazaar` | `BazaarHub` | Marketplace hub linking to all sections |
| **The Tapestry** | `/bazaar/creations` | `CreationsGallery` | Browse published products with search + type filters |
| **Creation Detail** | `/bazaar/creations/[id]` | `CreationDetail` | Full product view with tiered pricing |
| **The Weavers** | `/bazaar/creators` | `CreatorsGallery` | Verified creator directory with search |
| **Creator Sanctuary** | `/bazaar/creators/[id]` | `CreatorDetail` | Creator profile with stats + portfolio |
| **The Guild** | `/bazaar/vendors` | `VendorsGallery` | Verified vendor directory with search |
| **Vendor Sanctuary** | `/bazaar/vendors/[id]` | `VendorDetail` | Vendor profile with stats + website |
| **The Loom** | `/bazaar/studio` | `StudioCreate` | Product creation form with tiered pricing |
| **Edit Creation** | `/bazaar/studio/[id]` | `StudioEdit` | Edit existing product with delete option |
| **Contributions Ledger** | `/bazaar/contributions` | `ContributionsGallery` | User's contribution history and residual earnings |
| **The Exchange** | `/bazaar/checkout` | `CheckoutHub` | Checkout information and economics overview |

---

## 💰 CHECKOUT FLOW

```
Product Detail → CheckoutButton → useCheckout Hook
    │
    ├── Unauthenticated → Save to sessionStorage → Redirect to Login
    │
    └── Authenticated → POST /api/checkout
         │
         ├── Validates user profile + product availability
         ├── Calculates tiered pricing (community/ally/corporate)
         ├── Applies Bigot Tax for corporate domains
         ├── Creates sale record (payment_status: pending)
         ├── Creates Stripe Checkout Session
         └── Redirects to Stripe hosted page
              │
              ├── Success → /checkout/success → CheckoutForm (polls Stripe)
              │   └── Stripe Webhook → sale marked completed
              │
              └── Cancel → /checkout/cancel
```

---

## 🎨 COMPONENTS USED

| Layer | Components |
|-------|-----------|
| **Bifröst** | `Page` |
| **Runes** | `Card`, `Badge`, `Avatar`, `AvatarFallback`, `Skeleton` |
| **Runes/Cards** | `CardHeader`, `CardContent`, `CardFooter`, `CreatorCardRenderer`, `VendorCardRenderer` |
| **Yggdrasil** | `Button` |
| **Forging** | `Form`, `FormField`, `Input`, `Select`, `Switch` |
| **Vegvisir** | `SearchBar` (inline) |
| **Hof** | `Grid` (Tailwind grid) |

---

## 🔒 SECURITY

| Concern | Protection |
|---------|-----------|
| **Product visibility** | RLS: `is_published = true AND active = true` for public SELECT |
| **Product creation** | Creator-only via `useAuth().profile.is_creator` + RLS |
| **Product editing** | Owner-only via `checkOwnership()` + RLS |
| **Creator visibility** | RLS: `verification_status = 'verified'` |
| **Vendor visibility** | RLS: `verification_status = 'verified'` |
| **Checkout** | Authenticated only, validates product exists + is published |
| **Pricing** | Tiered pricing enforced server-side |
| **Contributions** | User sees only own contributions via RLS |

---

## 📊 DATA DEPENDENCIES

| Page | Generated Hook | API Route |
|------|---------------|-----------|
| Creations Gallery | `useProductsList()` | `GET /api/generated/plutus-economics/products` |
| Creation Detail | `useProduct(id)` | `GET /api/generated/plutus-economics/products/[id]` |
| Creators Gallery | `useCreatorProfilesList()` | `GET /api/generated/hestia-core/creator_profiles` |
| Creator Detail | `useCreatorProfiles(id)` | `GET /api/generated/hestia-core/creator_profiles/[id]` |
| Vendors Gallery | `useVendorProfilesList()` | `GET /api/generated/hestia-core/vendor_profiles` |
| Vendor Detail | `useVendorProfiles(id)` | `GET /api/generated/hestia-core/vendor_profiles/[id]` |
| Studio Create | `useCreateProducts()` | `POST /api/generated/plutus-economics/products` |
| Studio Edit | `useUpdateProducts()` | `PUT /api/generated/plutus-economics/products/[id]` |
| Contributions | `useContributionsList()` | `GET /api/generated/plutus-economics/contributions` |
| Checkout | `useCheckout()` | `POST /api/checkout` |

---

## 🏛️ THE COUNCIL'S VERDICT

**Hearth-Keeper:** *"The Bazaar is warm and welcoming. No pressure. No dark patterns. Just sovereign souls exchanging their gifts."*

**Chancellor:** *"The economics are transparent. 10% platform fee, 90% creator share, residual pool flowing to contributors forever. Every transaction visible on the ledger."*

**Seer:** *"The pattern is proven. Galleries, detail pages, creation forms — all compose from existing components. The remaining domains will follow this same template."*

**Executioner:** *"RLS enforced at every layer. Verified-only visibility. Owner-only editing. Tiered pricing validated server-side. No exploitation possible."*

---

*The Bazaar is open. The Tapestry is woven. The Loom awaits the next weaver.*

🏛️✨
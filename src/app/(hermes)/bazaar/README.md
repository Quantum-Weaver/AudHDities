# 🦊 HERMES — The Bazaar

> *Feeling: Abundant, curious, playful, connected*

The Bazaar is the marketplace of the Sanctuary — where sovereign souls exchange their gifts. Every purchase supports creators, contributors, and the community through the residual pool and covenant system.

---

## 📂 Directory Structure

```
src/app/(hermes)/
├── bazaar/
│   ├── page.tsx                      # The Bazaar — hub landing page
│   ├── creations/
│   │   ├── page.tsx                  # The Tapestry — products gallery
│   │   └── [id]/
│   │       └── page.tsx              # Creation Detail — single product view
│   ├── creators/
│   │   ├── page.tsx                  # The Weavers — creators gallery
│   │   └── [id]/
│   │       └── page.tsx              # Creator Sanctuary — creator profile
│   ├── vendors/
│   │   ├── page.tsx                  # The Guild — vendors gallery
│   │   └── [id]/
│   │       └── page.tsx              # Vendor Sanctuary — vendor profile
│   ├── studio/
│   │   ├── page.tsx                  # The Loom — creation studio (stub)
│   │   └── [id]/
│   │       └── page.tsx              # Edit Creation (stub)
│   ├── contributions/
│   │   └── page.tsx                  # Contributions Ledger — user's impact
│   └── checkout/
│       └── page.tsx                  # The Exchange — checkout (stub)
```

---

## 🗺️ Page Status

| Page | Route | Status | Components |
|------|-------|:------:|------------|
| Bazaar Hub | `/bazaar` | ✅ | `BazaarHub` |
| Creations Gallery | `/bazaar/creations` | ✅ | `CreationsGallery` |
| Creation Detail | `/bazaar/creations/[id]` | ✅ | `CreationDetail` |
| Creators Gallery | `/bazaar/creators` | ✅ | `CreatorsGallery`, `CreatorCardRenderer` |
| Creator Detail | `/bazaar/creators/[id]` | ✅ | `CreatorDetail` |
| Vendors Gallery | `/bazaar/vendors` | ✅ | `VendorsGallery`, `VendorCardRenderer` |
| Vendor Detail | `/bazaar/vendors/[id]` | ✅ | `VendorDetail` |
| Studio | `/bazaar/studio` | ⏳ Stub | — |
| Contributions | `/bazaar/contributions` | ✅ | `ContributionsGallery` |
| Checkout | `/bazaar/checkout` | ⏳ Stub | — |

---

## 🔗 Checkout Flow

```
Product Detail → CheckoutButton
    ↓
POST /api/checkout → creates sale record → creates Stripe session
    ↓
Redirect to Stripe Checkout
    ↓
Success: /checkout/success → CheckoutForm polls session status
Cancel:  /checkout/cancel → static cancelled page
    ↓
Stripe webhook → POST /api/webhook/stripe → records completed sale
```

**Files involved:**
- `src/components/asgard/domains/hermes/creations/CreationDetail.tsx` — product view with purchase
- `src/components/commerce/CheckoutButton.tsx` — purchase button with auth check
- `src/app/api/checkout/route.ts` — creates Stripe session
- `src/app/(auth)/checkout/success/page.tsx` — success page
- `src/app/(auth)/checkout/cancel/page.tsx` — cancel page
- `src/components/commerce/CheckoutForm.tsx` — polls Stripe session
- `src/app/api/checkout/session/[id]/route.ts` — session status verification
- `src/app/api/webhook/stripe/route.ts` — Stripe webhook handler
- `src/hooks/commerce/useCheckout.ts` — checkout hook
- `src/hooks/commerce/useProduct.ts` — product pricing hook

---

## 🔒 Security

| Table | Public SELECT | Notes |
|-------|:------------:|-------|
| `products` | `is_published = true AND active = true` | ✅ |
| `creator_profiles` | `verification_status = 'verified'` | ✅ |
| `vendor_profiles` | `verification_status = 'verified'` | ✅ |
| `contributions` | `true` | Gallery shows user's own only via API filter |
| `sales` | Buyers/creators only | Private by RLS |

---

## 🎨 Components Used

**Card Renderers:**
- `CreatorCardRenderer` — `src/components/asgard/domains/hermes/creators/CreatorCardRenderer.tsx`
- `VendorCardRenderer` — `src/components/asgard/domains/hermes/vendors/VendorCardRenderer.tsx`

**Commerce:**
- `CheckoutButton` — `src/components/commerce/CheckoutButton.tsx`
- `CheckoutForm` — `src/components/commerce/CheckoutForm.tsx`
- `PriceBreakdown` — `src/components/checkout/PriceBreakdown.tsx`

**Shared (from other layers):**
- `Card`, `CardHeader`, `CardContent` (runes)
- `Badge` (runes)
- `Button` (yggdrasil)
- `Skeleton` (runes)
- `Avatar`, `AvatarFallback` (runes)


# 2026-09-13 · (hermes) · platform-hand

## What is now

**The invoice.** `src/app/api/webhook/stripe/route.ts:102` handles `invoice.paid`.
`exchanges.stripe_invoice_id` is a column
(`src/lib/generated/supabase/database.types.ts:1942`). The handler reads the invoice
id and the subscription from `invoice.parent.subscription_details`, refuses a second
write when an exchange already carries that `stripe_invoice_id`, stamps the id on the
exchange the checkout wrote when `billing_reason` is `subscription_create`, and
otherwise inserts a new completed exchange carrying `stripe_invoice_id`,
`adjustments.stripe_subscription_id` and `adjustments.renewal_of`, then calls
`writeLedgerFor`. `originExchangeOf` (same file) finds the first exchange by
`adjustments->>stripe_subscription_id`, and by `metadata.exchangeId` after that.

**The price id.** `src/lib/economics/recurrence.ts:23` reads `wares.stripe_price_id`
(`database.types.ts:6029`) first and `metadata.stripe_price_id` after.
`recurrenceOf` reads `wares.billing_interval` (`database.types.ts:6007`) first and
`metadata.recurring.interval` after.

**The bazaar's ids.** `StudioForm.tsx` reads the vessel's own
`artisan_profiles` and `merchant_profiles` rows by `created_by` and stamps
`artisan_profile_id` on works and both `artisan_profile_id` and
`merchant_profile_id` on wares. `ArtisanDetail.tsx:39` reads works by
`artisan_profile_id`; `ArtisanDetail.tsx:115` and `MerchantDetail.tsx:107` carry the
profile id in `artisan_id` and `merchant_id`. `WaresGallery.tsx` maps `artisan_id`
and `creator_id` to `artisan_profile_id`, `merchant_id` and `vendor_id` to
`merchant_profile_id`, and asks for no works when only a merchant is named.

**The shelf.** `StudioShelf.tsx` splits on the exported `isRung`
(`RungLadder.tsx:12`): a "Your ladder" section above, "Everything else" below. Each
row is `ShelfItem`, drawn once, and carries a price line from `pricing_model`,
`price` and `billing_interval`.

**The ladder.** `RungLadder.tsx` groups rungs by `artisan_profile_id`, falling back
to `created_by`, and draws one card per maker holding that maker's rungs cheapest
first, with the maker's name read from
`/api/generated/hermes-social/artisan_profiles/<id>`. `WaresGallery.tsx:287` renders
it only when neither the search box nor a type filter is set.

**The shapes.** `WaresGallery.tsx` and `WorksGallery.tsx` each carry an "All at
once" / "One at a time" toggle; the second renders `Carousel` from
`@/components/shapes`.

**The works index.** `src/app/(hermes)/bazaar/works/page.tsx` renders
`WorksGallery` inside a `Suspense` boundary. The gallery reads
`/api/generated/hermes-social/works?status=published`, filters by `artisan_id` or
`creator_id` as `artisan_profile_id`, and carries search, type filters, the two
shapes and the finite-list sentence.

**The tier fields.** `StudioForm.tsx` and `StudioEdit.tsx` each carry a "Standing
support" section: a `billing_interval` select of `once` and `month`, and a
`stripe_price_id` input. `once` writes null.

**The customer.** `src/app/api/auth/checkout/route.ts:50` reads
`user_financial.stripe_customer_id` (`database.types.ts:5184`) by `created_by`,
opens a Stripe Customer once when it is null, stores it, and passes `customer` on
the session in place of `customer_email`.
`src/app/api/auth/billing-portal/route.ts` creates a billing portal session for
that customer. `WareDetail.tsx` "End it" posts to it and follows the returned url.

**Works priced.** `src/app/api/auth/checkout/route.ts` accepts `workId`, reads
`works` (`database.types.ts:6156`), and writes `exchanges.work_id`.
`useCheckout` and `CheckoutButton` take a `kind` of `ware` or `work`.
`WorkDetail.tsx` reads `works.price` and `works.pricing_model`: a priced work under
`fixed` or `pay_what_you_want` shows the amount, the `PriceBreakdown` and a checkout
button; anything else reads its own sentence, and a work with no price reads "not
for sale".

**Scheduling.** No booking column stands on `artisan_profiles`
(`database.types.ts:398`) or `merchant_profiles` (`database.types.ts:3323`).
`public.scheduling` (`database.types.ts:4538`) is a cron and task table.
`docs/sql/048-the-booking-link-on-both-profiles.sql` adds `booking_url` to both
profile tables. No page reads it.

## What is not

A completed exchange carrying `work_id` and no `ware_id` writes no ledger rows:
`writeLedgerFor` (`webhook/stripe/route.ts`) reads `exchange.ware_id` only, and
`writeLedgerRowsForExchange` (`src/lib/economics/ledger.ts:65`) returns `no-ware`.

- `/bazaar/works` is on the street at `src/lib/constants/systems/the-street.ts` (another hand's row) and has no inbound link from `BazaarHub.tsx`.

## Gates

`npm run type-check` — exit 0.
`npx eslint` over `src/app/(hermes)`, `src/app/api/webhook/stripe`,
`src/app/api/auth/checkout`, `src/app/api/auth/billing-portal`,
`src/lib/economics/recurrence.ts`, `src/lib/hooks/commerce/useCheckout.tsx`,
`src/components/asgard/domains/hermes` — 8 errors, 7 warnings, every one of them
standing in the baseline read before the work began.

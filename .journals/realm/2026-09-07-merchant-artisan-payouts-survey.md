# Merchant, Artisan, and Payout Survey · 2026-09-07

A read-only survey of the merchant profile, the artisan profile, the Stripe wiring, and the
payout path. No file in the tree was changed except this one. Nothing was run against the base,
against Stripe, or against the network.

Three grades are used on every fact:

- **(a)** present in a migration or SQL file on disk.
- **(b)** referenced in app code, including the GAIA-generated mirror of the live schema.
- **(c)** cannot be verified from disk — it lives only in the remote base or in Stripe.

The generated layer (`src/lib/generated/`) is produced by GAIA from the live schema, so a column
appearing there is evidence the column stands in the base at the moment of the last generation.
It is not a definition. Every table below is grade **(c)** for its DDL: no `create table` for
`artisan_profiles`, `merchant_profiles`, or `user_financial` exists anywhere in `docs/sql/` or
`supabase/migrations/`. The only `create table` statements on disk are for `policies`,
`functions`, `triggers`, `indexes`, `enums`, `composite_types`, `columns`, `events`, `mythology`,
`votes`, `relationships`, `views`, `daily_puzzles`, and `assessment_readings`.

---

## Findings

### 1 · The two profile tables

**`artisan_profiles`** — 24 columns, grade (b) via
`src/lib/generated/supabase/database.types.ts:443-523`.

Not-null on insert: `artisan_name`, `created_by`, `slug`. Defaulted: `id`, `created_at`,
`updated_at`, `status`. Nullable: `application_id`, `avatar_url`, `banner_url`, `bio`,
`icon_emoji`, `portfolio_url`, `primary_category`, `secondary_categories` (text[]),
`sensory_hints`, `social_links` (jsonb), `tagline`, `total_creations`, `total_followers`,
`updated_by`, `verified_at`, `verified_by`, `website_url`. `status` is the `profile_status` enum:
`draft · pending · active · inactive · suspended · closed`
(`src/lib/generated/supabase/database.types.ts:6950-6956`).

**`merchant_profiles`** — 27 columns, grade (b) via
`src/lib/generated/supabase/database.types.ts:3671-3763`.

Not-null on insert: `vendor_name`, `created_by`, `slug`. Same defaults and same `status` enum.
Nullable and unique to this table: `business_type`, `customization_policy`, `return_policy`,
`shipping_policy`, `store_url`, `total_products`, `total_sales`. It carries no `portfolio_url`
and no `total_followers`; the artisan table carries no policy columns and no `store_url`.

The name column differs: `artisan_profiles.artisan_name` versus `merchant_profiles.vendor_name`.
`docs/sql/holds/024-the-bazaar-refined-as-first-written.sql:166-167` records `vendor_name` as an
undecided rename.

**Constraints.** No check constraint, no unique index, and no foreign key on either table is
present on disk. GAIA emits foreign keys where they exist — `assessment_answers` shows one at
`src/lib/generated/supabase/database.types.ts:561-569` — and both profile tables emit
`Relationships: []` (`:522`, `:3762`). Neither table declares an FK, including none from
`created_by` to `auth.users`. Uniqueness of `slug` and of `created_by` is grade **(c)**.

**RLS.** No policy for either table appears in any SQL file on disk.
`docs/sql/009-the-walls-learn-the-new-names.sql` writes owner policies for `community_profiles`,
`user_private`, `vessel_config`, and `user_financial`, and names only those four in its verify
block (`:161-167`). Whatever policies stand on `artisan_profiles` and `merchant_profiles` are
grade **(c)**. Both tables' generated headers carry `handling: owned`
(`src/lib/generated/validators/hermes-social/artisan_profiles.ts:4`,
`src/app/api/generated/hermes-social/merchant_profiles/route.ts:4`).

**Creating or editing one.** There is no page, no form, and no server action anywhere in the tree
that creates or edits either profile. The full surface is:

- Generated REST routes, GET + POST:
  `src/app/api/generated/hermes-social/artisan_profiles/route.ts`,
  `src/app/api/generated/hermes-social/merchant_profiles/route.ts`. POST validates against the
  generated Insert schema and stamps `created_by` from the session
  (`merchant_profiles/route.ts:46-69`).
- Generated REST routes, GET + PUT + DELETE, at `[id]`. PUT and DELETE gate on
  `checkOwnership(userId, 'artisan_profiles', id)` or admin
  (`src/app/api/generated/hermes-social/artisan_profiles/[id]/route.ts:49-51`).
- Generated hooks `useCreateArtisanProfiles`, `useUpdateArtisanProfiles`,
  `useCreateMerchantProfiles`, `useUpdateMerchantProfiles`
  (`src/lib/generated/hooks/hermes-social/artisan_profiles.ts:112,150`,
  `.../merchant_profiles.ts:112,150`). **No component imports any of them.**
- Read-only consumers: `ArtisansGallery.tsx:27`, `ArtisanDetail.tsx:30`,
  `MerchantsGallery.tsx:27`, `MerchantDetail.tsx:27`, `WareDetail.tsx:57`, `WorkDetail.tsx:58`,
  and `ConstellationContent.tsx:329-353`.

`checkOwnership` builds its predicate as `` `${tableName}_id` `` (`src/lib/api/auth.ts:89,94`).
No column named `artisan_profiles_id`, `merchant_profiles_id`, or `applications_id` exists in the
generated types. The lookup returns no record and `checkOwnership` returns false, so PUT and
DELETE on either profile succeed only for a user holding the `admin` role
(`src/lib/api/auth.ts:68-76`).

**How the two relate.**

- To the account: through `created_by` only, on both tables. No FK, no unique constraint on disk.
- To each other: not at all. Neither table names the other. Their only meeting point is `wares`,
  which carries both `artisan_profile_id` and `merchant_profile_id`, both nullable, both with a
  declared FK (`src/lib/generated/supabase/database.types.ts:6615, 6625, 6698-6713`).
- `works` carries `artisan_profile_id` only, FK declared, `isOneToOne: false`
  (`:6764, 6829-6836`). The cleave is stated at `docs/sql/017-the-makers-first-rows.sql:10-21`:
  a ware is stocked and carries `merchant_profile_id`; a work is made and carries
  `artisan_profile_id` only.
- Cardinality per vessel: nothing on disk enforces one profile per account. The app treats it as
  one — `ConstellationContent.tsx:329-330` fetches `created_by=<id>&limit=1` and takes `[0]`, and
  `docs/sql/024-the-bazaar-refined-DRAFT.sql:50` selects `order by created_at limit 1` from
  `artisan_profiles`.
- Not per house and not per entity. Neither table carries a house, council, or org column.

**The application path.** `applications` holds `application_type`, `form_data` (jsonb), `user_id`,
`status`, `reviewed_by`, `reviewed_at`, `review_notes`
(`src/lib/generated/supabase/database.types.ts:338-358`). `application_type` is
`creator · vendor · curator · council` (`:6919`). Both profile tables carry an `application_id`
column. `ApplicationForm.tsx:294-327` inserts an `applications` row with `status: "submitted"` and
does nothing else — it creates no profile. The Approve and Reject buttons in
`ApplicationsHub.tsx:123-128` carry no `onClick` and no handler. No database function that would
promote an application into a profile exists in the generated Functions list
(`src/lib/generated/supabase/database.types.ts:6843-6902`).

### 2 · Stripe, as wired on disk

**Package.** `stripe@^22.1.0` (`package.json:53`) and `@stripe/stripe-js@^9.3.1`
(`package.json:32`).

**Server client.** `src/lib/stripe/server.ts` — a lazily constructed `Stripe` instance keyed on
`process.env.STRIPE_SECRET_KEY` (`:8, 11`), `apiVersion: '2026-07-29.dahlia'` (`:12`), exported as
`stripe` (`:18`). It also exports `verifyWebhookSignature` (`:32-39`), which no file imports, and a
`CreateCheckoutSessionParams` interface (`:20-30`) that no file imports.

**Browser client.** `src/lib/stripe/client.ts:8` calls
`loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)`. No file imports it.
`src/lib/stripe/formatting.ts`, `src/lib/types/stripe/index.ts`, and
`src/lib/types/stripe/events.ts` are likewise imported by nothing.

**API routes that touch Stripe — three, in total.**

1. `src/app/api/auth/checkout/route.ts` — POST. Requires a session (`:33-36`), loads a published
   `ware`, refuses free and patronage-only wares, calls the `calculate_sovereign_price` RPC
   (`:75-78`), writes a `pending` `exchanges` row (`:88-101`), then creates a **Checkout Session**
   in one of two modes: `mode: 'subscription'` against an existing `price` id when the ware has a
   monthly recurrence (`:134-138`), otherwise `mode: 'payment'` with inline `price_data`
   (`:140-156`). `success_url` and `cancel_url` are built from `process.env.NEXT_PUBLIC_APP_URL`
   (`:110-111`). The session id is written back to the exchange (`:159-162`).
2. `src/app/api/auth/checkout/session/[id]/route.ts:49` — GET, retrieves a Checkout Session for the
   buyer or an admin.
3. `src/app/api/webhook/stripe/route.ts` — POST, the webhook.

**Webhook events handled** (`src/app/api/webhook/stripe/route.ts:36-148`):

| event | line | what it does |
|---|---|---|
| `checkout.session.completed` | 37-99 | Moves the matching `pending` exchange to `completed`, writes `gross_amount`, `net_amount`, `stripe_payment_intent`; stores a subscription id into `exchanges.adjustments`; writes the ledger rows. |
| `invoice.paid` | 101-110 | **Refused.** Logs and writes nothing. |
| `invoice.payment_failed` | 112-119 | Logs only. |
| `customer.subscription.deleted` | 121-128 | Logs only. |
| `checkout.session.expired` | 130-144 | Marks the pending exchange `failed`. |
| `checkout.session.async_payment_failed` | 130-144 | Same. |
| anything else | 146-147 | Logged as unhandled. |

The `invoice.paid` refusal states that `exchanges.stripe_invoice_id` does not exist (`:104`). The
column does exist: added at `docs/sql/024-the-bazaar-refined-DRAFT.sql:11-14` with a partial unique
index, and present in the generated types at
`src/lib/generated/supabase/database.types.ts:2131`. The refusal branch is stale, grade (a) + (b).

**Env variable names the Stripe code expects** — names only, taken from `process.env` references:

- `STRIPE_SECRET_KEY` — `src/lib/stripe/server.ts:8, 11`
- `STRIPE_WEBHOOK_SECRET` — `src/app/api/webhook/stripe/route.ts:18`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — `src/lib/stripe/client.ts:8`
- `NEXT_PUBLIC_APP_URL` — `src/app/api/auth/checkout/route.ts:110-111`

`REALM-BUS.md:59` lists `STRIPE_WEBHOOK_SECRET` among names "not yet gathered." Whether any of
these are set, and in which mode, is grade **(c)**.

**Stripe Connect: does it exist?**

**It does not exist.** Not partly. A search of `src/`, `docs/`, and `supabase/` for
`accounts.create`, `accountLinks`, `loginLinks`, `transfers.create`, `payouts.create`,
`billingPortal`, and the `stripeAccount:` request option returns nothing. A search for
`account.updated`, `capability.updated`, `payout.paid`, `payout.failed`, and `person.updated`
returns nothing. There is no `application_fee_amount`, no `on_behalf_of`, and no `transfer_data`
on either `checkout.sessions.create` call. No API route creates an account, no route mints an
account link, and no return or refresh URL exists.

Every charge the app can make today lands in the platform's own Stripe account. What is wired is
**Checkout only** — Sessions in `payment` and `subscription` mode, plus the six webhook events
above. There is no Payment Intents flow of the app's own, no Customer portal, and no Connect.

The only Stripe object with a Connect-shaped name anywhere in the tree is
`user_financial.stripe_account_id` — a column, never read or written by any code. See §3.

**What names Connect on disk** — all prose, no code:

- `README.md:107` — the Payments row reads `Stripe Connect (residual distribution)`.
- `ROADMAP.md:92, 96, 99, 106` — Phase 3, status "⚪ Not Started": 3.1 set up Stripe Connect
  account · 3.5 set up Stripe webhooks · 3.8 implement creator payouts · "Stripe Connect for
  marketplace payments."
- `src/app/(hephaestus)/forge/guides/artisan-onboarding/page.tsx:93-104` — a rendered step titled
  "Set Up Payments (Stripe Connect)" instructing the reader to go to Artisan Dashboard → Payments
  and click "Connect Stripe Account."
- `src/app/(hephaestus)/forge/guides/merchant-onboarding/page.tsx:89-100` — the same step for the
  merchant; `:206` renders a "Payout History" heading.
- `docs/guides/creator-onboarding.md:44-53` and `docs/guides/vendor-onboarding.md:49-58` — the
  markdown sources of those two steps.
- `src/app/(aethelred)/nexus/integrations/page.tsx:11` — an Integrations page whose description
  names Stripe; the page renders a template with no integration controls.

Neither an Artisan Dashboard nor a Merchant Dashboard nor any `/payments` route exists. The
`(hermes)` group holds 22 pages, none a dashboard or a payments page; `(hestia)` holds 13,
likewise.

### 3 · Payout methods

There is **no payout connection anywhere on disk** — not Connect onboarding, not a form, not a
table row a user can write.

The base carries the columns for one. `user_financial` (grade (b),
`src/lib/generated/supabase/database.types.ts:5712-5777`) holds:

`covenant_pool_percent · current_balance · payout_details` (jsonb) `· payout_method ·
payout_schedule · stripe_account_id · stripe_customer_id · tax_country · tax_id · tax_info ·
total_contributions · total_earned · total_paid_out`.

Of these, exactly one is ever written by the app: `covenant_pool_percent`, by the Sanctum's
Covenant Space (`src/components/asgard/domains/hestia/sanctum/CovenantSpace.tsx:63-96`, which
PATCHes or POSTs `/api/generated/hestia-core/user_financial`). Exactly one more is ever read:
`covenant_pool_percent` again, by the ledger writer (`src/lib/economics/ledger.ts:95-98`).
`payout_method`, `payout_details`, `payout_schedule`, `stripe_account_id`, `stripe_customer_id`,
`total_paid_out`, and `current_balance` are read by nothing and written by nothing.

`stripe_account_id` is listed in `src/config/sensitive_fields.ts:8`, which is why GAIA excludes it
from the public projection (`src/lib/generated/types/hestia-core/user_financial.ts:26`).

`user_financial` is the one money table with owner RLS on disk, grade **(a)**:
`docs/sql/009-the-walls-learn-the-new-names.sql:136-148` — SELECT, INSERT, and UPDATE for
`authenticated`, all on `created_by = auth.uid()`. There is no DELETE policy.

The ledger records who is owed what and moves nothing. `src/lib/economics/ledger.ts:48-63` writes
`ledger` rows for a completed exchange, keyed idempotently on `reference_table = 'exchanges'` +
`reference_id`, with line kinds `platform_fee`, `fee_to_residual_pool`, `fee_to_machine`,
`residual_pledge`, `contributor_share`, `covenant_pledge`, `unallocated_cents` (`:31-39`). No code
in the tree pays any of it out.

### 4 · The Stripe question, answered

**Yes — Stripe Connect is what the design intends for letting a user connect a place to be paid.
No, none of it is built. What stands today is Checkout only, and every payment lands in the
platform's own Stripe account.**

What supports the intent, on disk:

- `README.md:107` names the Payments layer `Stripe Connect (residual distribution)`.
- `ROADMAP.md:92` — "3.1 Set up Stripe Connect account"; `:99` — "3.8 Implement creator payouts";
  `:106` — "Stripe Connect for marketplace payments." Phase 3 is marked "⚪ Not Started"
  (`ROADMAP.md:90`).
- `user_financial.stripe_account_id` exists as a column in the base, in the same row as
  `payout_method`, `payout_details`, and `payout_schedule`
  (`src/lib/generated/supabase/database.types.ts:5720-5723`) — the shape of a stored Connect
  account id beside a payout destination.
- Two rendered guide pages instruct a user to click "Connect Stripe Account" and complete Stripe's
  own onboarding, for tax info and bank details
  (`src/app/(hephaestus)/forge/guides/artisan-onboarding/page.tsx:93-104`,
  `.../merchant-onboarding/page.tsx:89-100`).

What contradicts it being built: the searches in §2. There is no account creation, no account
link, no return or refresh URL, no `account.updated` handler, and no destination or
application-fee parameter on either Checkout Session.

The other half of the design is separate from Connect and is also unbuilt: the two pools pay
recipients who are not the seller of any one sale. `docs/sql/030-the-next-two-courses.sql:114`
describes the residual and covenant pools dividing by headcount. A Connect account is the rail for
that too, and nothing on disk pays a pool out.

---

## The first-user path

The steps, in order, as they stand today.

| # | Step | Mark | Address |
|---|---|---|---|
| 1 | Sign in | EXISTS | outside this survey's ground |
| 2 | Submit a `creator` application | EXISTS | `ApplicationForm.tsx:294-327`; route `/council/applications/apply?type=creator` (`ApplicationsHub.tsx:88`) |
| 3 | Submit a `vendor` application | EXISTS | same form, `?type=vendor` (`ApplicationsHub.tsx:91`) |
| 4 | An application is approved | MISSING | `ApplicationsHub.tsx:123-128` — Approve and Reject carry no handler |
| 5 | An approval creates an `artisan_profiles` row | MISSING | no code path, no DB function (`database.types.ts:6843-6902`) |
| 6 | An approval creates a `merchant_profiles` row | MISSING | same |
| 7 | Create an artisan profile by hand | PARTIAL | POST `/api/generated/hermes-social/artisan_profiles` exists (`route.ts:46-69`); no UI calls it; `useCreateArtisanProfiles` has no consumer |
| 8 | Create a merchant profile by hand | PARTIAL | POST `/api/generated/hermes-social/merchant_profiles` exists (`route.ts:46-69`); same absence of UI |
| 9 | Edit either profile afterward | PARTIAL | PUT exists but `checkOwnership` looks up `artisan_profiles_id`, a column that does not exist (`src/lib/api/auth.ts:89,94`); only the `admin` role gets through (`:68-76`) |
| 10 | Hold the `creator` role so the Loom opens | PARTIAL | gate is `roles.includes('creator')` (`StudioForm.tsx:120`, `StudioShelf.tsx:49`); no UI grants a role |
| 11 | Create a ware or work in the Loom | EXISTS | `StudioForm.tsx:132-166` — writes `created_by` only, never `artisan_profile_id` |
| 12 | Set the covenant dial | EXISTS | `CovenantSpace.tsx:63-96` — creates the `user_financial` row on first save |
| 13 | Set a ware's residual dial | EXISTS | `StudioForm.tsx:155-157` |
| 14 | Connect a payout destination | MISSING | nothing in the tree; no Connect call, no form, no route |
| 15 | Take a payment | EXISTS | `src/app/api/auth/checkout/route.ts` — Checkout Session, funds land in the platform account |
| 16 | Have the sale recorded and split | EXISTS | `webhook/stripe/route.ts:37-99` → `ledger.ts:48-63` |
| 17 | Receive money | MISSING | the ledger records; no code moves a cent |

Steps 4, 5, 6, 14, and 17 are MISSING. Steps 7, 8, 9, and 10 are PARTIAL — the route exists, the
door to it does not.

The shortest walk that works today, using only what is EXISTS or PARTIAL: POST an
`artisan_profiles` row and a `merchant_profiles` row directly to the two generated endpoints while
signed in (each needs `slug` plus `artisan_name` or `vendor_name`; `created_by` is stamped from the
session), grant the `creator` role in the base so the Loom opens, then build wares. No payout is
reachable by any path.

---

## Gaps

1. **No Connect onboarding of any kind.** No account creation, no account link, no return URL, no
   refresh URL, no `account.updated` handler.
2. **No payout destination anywhere.** `user_financial.stripe_account_id`, `payout_method`,
   `payout_details`, and `payout_schedule` are written by no code and read by no code.
3. **No profile creation or editing UI.** Both tables are read-only in the app; the generated
   create and update hooks have zero consumers.
4. **Approval is inert.** The Approve and Reject buttons have no handler, and no code or DB
   function turns an approved application into a profile.
5. **`checkOwnership` cannot succeed.** It queries `` `${tableName}_id` ``; no such column exists
   on any table in the generated types. Every PUT and DELETE on an owned table is admin-only in
   practice.
6. **Roles are ungranted from the app.** The Loom's gate reads `roles.includes('creator')`;
   nothing in the tree writes a role.
7. **Nothing pays out.** The ledger records the split; no residual or covenant distribution code
   exists.
8. **RLS on both profile tables is unverifiable from disk.** Grade (c).
9. **The `invoice.paid` refusal is stale.** It cites a missing `exchanges.stripe_invoice_id`; the
   column and its partial unique index were added at
   `docs/sql/024-the-bazaar-refined-DRAFT.sql:11-14` and appear at
   `src/lib/generated/supabase/database.types.ts:2131`. Subscription renewals are silently dropped.
10. **`merchant_profiles.vendor_name` and the `creator`/`vendor` enum values are the old words.**
    The renames are printed and undecided at
    `docs/sql/holds/024-the-bazaar-refined-as-first-written.sql:154-167`.

---

## Proposed sequence

Smallest correct order to close the MISSING steps. Nothing here is built; each item is a unit of
work with its own gate.

**Before anything else — read the base.** Confirm from the live schema what RLS stands on
`artisan_profiles` and `merchant_profiles`, whether `slug` is unique, and whether `created_by` is
unique. Every item below assumes the answer. This is a `select` against `pg_policies` and
`pg_indexes`, no write.

1. **Give KP the two profiles.** One SQL file inserting one `artisan_profiles` row and one
   `merchant_profiles` row with `created_by` = KP's user id, `status = 'active'`. Fastest, and it
   unblocks every downstream item, including the `wares.artisan_profile_id` backfill that
   `docs/sql/024-the-bazaar-refined-DRAFT.sql:50` and
   `supabase/migrations/20260831_the_books_as_digital_wares.sql:90` both already assume.

2. **Add the one-per-vessel constraint, if that is the rule.** A unique index on `created_by` for
   each profile table. The app already assumes it (`limit=1`, `[0]`). Decide before the second user
   arrives.

3. **Fix `checkOwnership`.** Change the predicate from `` `${tableName}_id` `` to `id` in
   `src/lib/api/auth.ts:89,94`. One line, and it makes every generated PUT and DELETE work as
   designed. Prerequisite for any profile-edit UI.

4. **Build a profile editor.** One page per profile, or one page with two panels, wired to the
   existing generated hooks. No new API surface needed once item 3 lands.

5. **Wire the approval action.** Give the Approve and Reject buttons a handler that PATCHes the
   `applications` row, and decide where profile creation on approval lives — an API route or a DB
   trigger. Item 1 makes this non-urgent for KP alone; the second user makes it required.

6. **Build the Connect onboarding, in this order:**
   - a. A route that creates a Connect account for the signed-in vessel and stores the returned id
     in `user_financial.stripe_account_id`.
   - b. A route that mints an Account Link with `return_url` and `refresh_url` on
     `NEXT_PUBLIC_APP_URL`, and a page at each URL.
   - c. A Payments panel — the guides already send the reader to "Artisan Dashboard → Payments" and
     "Merchant Dashboard → Payments"; neither route exists, so either the routes get built or the
     guides get corrected.
   - d. An `account.updated` branch in `src/app/api/webhook/stripe/route.ts` that records
     `charges_enabled` and `payouts_enabled`. Whether those land in `payout_details` (jsonb,
     exists) or in new columns is a schema choice.
   - e. A read of `stripe_account_id` at checkout time — either `transfer_data.destination` with
     `application_fee_amount` on the Session, or a later `transfers.create`. This decides whether
     money ever sits in the platform account.

7. **Repair the `invoice.paid` branch** (`src/app/api/webhook/stripe/route.ts:101-110`) to write on
   `stripe_invoice_id`, which exists. Required before any subscription rung renews.

8. **Build the payout run.** A job that reads the ledger and moves money via Connect. Last, because
   it depends on 6 and on a decision about pool cadence.

Not proposed, and named as such: the `creator`/`vendor` → `artisan`/`merchant` enum renames and the
`vendor_name` rename. They are printed at
`docs/sql/holds/024-the-bazaar-refined-as-first-written.sql:154-167` and move the Loom's gate in
the same motion. They are orthogonal to a payout and should not ride with it.

---

## Open to KP

Choices this survey does not make.

1. **Connect account type.** Express, Standard, or Custom. Express carries Stripe-hosted onboarding
   and a Stripe-hosted dashboard, and the guide pages as written
   (`artisan-onboarding/page.tsx:93-104` — "Follow Stripe's onboarding (takes 5-10 minutes)") read
   as Express. Standard hands the vessel their own full Stripe account. Custom puts every
   compliance obligation on the Sanctuary. The choice changes what Proposed-sequence item 6a
   creates and cannot be changed for an account after the fact.

2. **Charge type.** Destination charges with `transfer_data` and `application_fee_amount`, versus
   separate charges and later transfers. Destination charges let the 10% fee be Stripe's own
   mechanism. Separate transfers keep the split entirely in the ledger, which is where the split
   already lives (`src/lib/economics/split.ts`). This decides whether money ever rests in the
   platform account.

3. **Test mode or live mode for the first walk.** `FEATURE-BOARD.md:73` records the decision as
   open and notes "launch on test keys is honorable." Connect accounts do not cross between modes.

4. **Which webhook events to add.** The minimum for onboarding is `account.updated`. The full set
   worth considering: `account.updated`, `capability.updated`, `payout.paid`, `payout.failed`,
   `transfer.created`. Each one added is a branch to write and a case to test.

5. **Who must connect a payout — everyone, or only sellers.** The covenant pool pays every opted-in
   vessel, including those who have sold nothing (`docs/sql/030-the-next-two-courses.sql:114`).
   That means a payout rail is eventually needed for vessels who are not artisans and not
   merchants. Whether that is Connect for all, or a second rail, is unwritten.

6. **One profile per vessel, or many.** Nothing on disk enforces one. The app assumes one.

7. **Where Connect state lives.** `payout_details` (jsonb, exists, unused) can hold
   `charges_enabled` and `payouts_enabled`, or they can be typed columns.

8. **Whether the two guide pages get built to or corrected.** They describe an Artisan Dashboard, a
   Merchant Dashboard, a Payments panel, and a Payout History view. None of the four exists.

---

## Addresses

Every line number below was re-opened and confirmed.

**Schema, grade (b) — GAIA's mirror of the live base**

- `src/lib/generated/supabase/database.types.ts:443-523` — `artisan_profiles`, Relationships `[]` at `:522`
- `src/lib/generated/supabase/database.types.ts:3671-3763` — `merchant_profiles`, Relationships `[]` at `:3762`
- `src/lib/generated/supabase/database.types.ts:5712-5777` — `user_financial`; payout columns `:5720-5723`; Relationships `[]` at `:5776`
- `src/lib/generated/supabase/database.types.ts:2117-2197` — `exchanges`; `stripe_invoice_id` `:2131`; FKs `:2181-2196`
- `src/lib/generated/supabase/database.types.ts:6613-6714` — `wares`; `artisan_profile_id` `:6615`, `billing_interval` `:6616`, `merchant_profile_id` `:6625`, `stripe_price_id` `:6637`; FKs `:6698-6713`
- `src/lib/generated/supabase/database.types.ts:6762-6838` — `works`; `artisan_profile_id` `:6764`; FK `:6829-6836`
- `src/lib/generated/supabase/database.types.ts:338-358` — `applications`
- `src/lib/generated/supabase/database.types.ts:561-569` — a declared FK, showing GAIA emits them
- `src/lib/generated/supabase/database.types.ts:6919` — `application_type` enum
- `src/lib/generated/supabase/database.types.ts:6950-6956` — `profile_status` enum
- `src/lib/generated/supabase/database.types.ts:6978-6984` — `user_role` enum
- `src/lib/generated/supabase/database.types.ts:6843-6902` — the Functions list
- `src/lib/generated/validators/hermes-social/artisan_profiles.ts:4, 43-60` — handling level, Insert schema
- `src/lib/generated/types/hestia-core/user_financial.ts:26` — the sensitive-field exclusion

**Schema, grade (a) — SQL on disk**

- `docs/sql/009-the-walls-learn-the-new-names.sql:136-148` — `user_financial` owner RLS; `:161-167` its verify block
- `docs/sql/024-the-bazaar-refined-DRAFT.sql:8` — `wares.billing_interval`; `:11-14` — `exchanges.stripe_invoice_id` and its partial unique index; `:17` — `wares.stripe_price_id`; `:19-31` — `wares` and `works` RLS; `:50` — the one artisan profile
- `docs/sql/017-the-makers-first-rows.sql:10-21` — the ware/work cleave
- `docs/sql/002-deity-backfill.sql:31` — both profile tables named
- `docs/sql/holds/024-the-bazaar-refined-as-first-written.sql:154-167` — the printed, undecided renames; `:198-201` — a lamp creates no Stripe object
- `supabase/migrations/20260831_the_books_as_digital_wares.sql:54-56, 90` — `stripe_price_id` left NULL; the one artisan profile
- `docs/sql/030-the-next-two-courses.sql:114` — the two pools' recipients
- `docs/SUPERPOSITION-TABLE-REVIEW.md:139, 141` — both profile tables, registry status active

**Stripe code**

- `package.json:32` — `@stripe/stripe-js`; `:53` — `stripe`
- `src/lib/stripe/server.ts:8, 11` — `STRIPE_SECRET_KEY`; `:12` — api version; `:18` — the export; `:20-30, 32-39` — unimported
- `src/lib/stripe/client.ts:8` — `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, unimported
- `src/app/api/auth/checkout/route.ts:33-36, 75-78, 88-101, 110-111, 134-138, 140-156, 159-162`
- `src/app/api/auth/checkout/session/[id]/route.ts:49`
- `src/app/api/webhook/stripe/route.ts:18, 36-148`; the stale refusal at `:101-110`, its claim at `:104`
- `src/lib/economics/recurrence.ts:2, 23, 33` — reads a price id, mints none
- `src/lib/economics/ledger.ts:31-39, 48-63, 95-98`
- `src/config/sensitive_fields.ts:8-9`

**App surface**

- `src/app/api/generated/hermes-social/artisan_profiles/route.ts` · `.../[id]/route.ts:49-51`
- `src/app/api/generated/hermes-social/merchant_profiles/route.ts:4, 46-69` · `.../[id]/route.ts`
- `src/app/api/generated/hestia-core/user_financial/route.ts` · `.../[id]/route.ts`
- `src/lib/api/auth.ts:68-76` (isAdmin), `:81-98` (checkOwnership, predicate at `:89, 94`)
- `src/components/asgard/domains/hestia/sanctum/CovenantSpace.tsx:46, 63-96`
- `src/components/asgard/domains/hestia/constellation/ConstellationContent.tsx:329-353`
- `src/components/asgard/domains/hermes/artisans/ArtisansGallery.tsx:27` · `ArtisanDetail.tsx:30`
- `src/components/asgard/domains/hermes/merchants/MerchantsGallery.tsx:27` · `MerchantDetail.tsx:27`
- `src/components/asgard/domains/hermes/wares/WareDetail.tsx:57` · `works/WorkDetail.tsx:58`
- `src/components/asgard/domains/hermes/studio/StudioForm.tsx:120, 132-166, 247` · `StudioShelf.tsx:49, 137`
- `src/components/asgard/domains/themis/governance/ApplicationForm.tsx:294-327`
- `src/components/asgard/domains/themis/applications/ApplicationsHub.tsx:88, 91, 123-128`
- `src/lib/generated/hooks/hermes-social/artisan_profiles.ts:112, 150` · `merchant_profiles.ts:112, 150` — no consumers

**Prose that names Connect**

- `README.md:107`
- `ROADMAP.md:90, 92, 96, 99, 106`
- `FEATURE-BOARD.md:73`
- `REALM-BUS.md:59`
- `src/app/(hephaestus)/forge/guides/artisan-onboarding/page.tsx:93-104`
- `src/app/(hephaestus)/forge/guides/merchant-onboarding/page.tsx:89-100, 206`
- `docs/guides/creator-onboarding.md:44-53` · `docs/guides/vendor-onboarding.md:49-58`
- `src/app/(aethelred)/nexus/integrations/page.tsx:11`

**Grade (c) — not verifiable from disk**

- The DDL of `artisan_profiles`, `merchant_profiles`, and `user_financial`. No `create table` for
  any of them exists in `docs/sql/` or `supabase/migrations/`.
- All RLS on `artisan_profiles` and `merchant_profiles`.
- Uniqueness of `slug` and of `created_by` on either profile table.
- Whether any row exists in either profile table today.
- Every environment variable's value and whether it is set at all — no `.env` was opened.
- Everything in Stripe: whether an account exists, its mode, its registered webhook endpoints, and
  whether any Price object matching `wares.stripe_price_id` was ever created.

---

Verification: `git status` was clean before this file; this file is the only change. No command was
run against the base, against Stripe, or against the network. No `.env` was opened.

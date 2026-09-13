# standing support that ends, and the ledger's work road

## the column

`wares` carries no end column. `docs/sql/053-the-standing-support-ends.sql`
adds `support_ends_at timestamptz null` to `public.wares` and the check
constraint `wares_support_ends_at_needs_interval` (an end only stands beside a
`billing_interval`). Unapplied: `support_ends_at` is absent from
`src/lib/generated/supabase/database.types.ts:6005` (the `wares` Row) and from
`WaresInsertSchema` / `WaresUpdateSchema`
(`src/lib/generated/validators/plutus-economics/wares.ts:46`), which strip
unknown keys. Until the paper runs and GAIA regenerates, the field sent by the
Loom is dropped at `src/app/api/generated/plutus-economics/wares/route.ts:52`.

## recurrence

`src/lib/economics/recurrence.ts`:

| export | what it gives |
| --- | --- |
| `SUPPORT_CADENCES` | `once`, `month`, `month_until` — the options both Loom forms draw |
| `recurrenceOf` | `{ interval, stripePriceId, endsAt, cancelAt }` or null |
| `supportEndsAtOf` | the end, column first, then `metadata.support_ends_at`, then `metadata.recurring.ends_at` |
| `cadenceOf` | the cadence a ware already carries |
| `supportHasEnded` | whether the end lies behind a given second |
| `supportEndsAtFromDateInput` / `dateInputFromSupportEndsAt` | `YYYY-MM-DD` ↔ ISO |

## the checkout route

`src/app/api/auth/checkout/route.ts`: `Subject.supportEndsAt` is filled by
`supportEndsAtOf(ware)` at line 129 and is null for a work. A one-time ware
takes `mode: 'payment'`. A recurring ware takes `mode: 'subscription'`; when
its end already passed the route answers 409 and creates no session; when the
end stands ahead, `subscription_data.metadata` carries `supportEndsAt` (ISO)
and `cancelAt` (seconds) beside the rest. The response body carries
`supportEndsAt`.

Checkout's `subscription_data` has no `cancel_at` field at stripe 22.5.0 /
api `2026-07-29.dahlia` (`node_modules/stripe/esm/resources/Checkout/Sessions.d.ts:2953`).
`cancel_at` stands on `SubscriptionCreateParams.cancel_at` and
`SubscriptionUpdateParams.cancel_at`
(`node_modules/stripe/esm/resources/Subscriptions.d.ts:903,1782`). Nothing yet
calls `subscriptions.update` with the carried `cancelAt`, so a subscription
opened for a `month_until` rung runs until it is cancelled by hand.

## the Loom

`src/components/asgard/domains/hermes/studio/StudioForm.tsx` and
`StudioEdit.tsx` draw `SUPPORT_CADENCES` in the Standing support section and a
date field named `support_ends_at`. The form sends `support_ends_at` only when
a date was named; the edit sends it only when the day moved. `month_until`
writes `billing_interval 'month'` with the date; `month` clears the date;
`once` clears both.

## the ledger

`src/lib/economics/ledger.ts`: `ExchangeForLedger` carries `work_id`.
`writeLedgerRowsForExchange` resolves a subject — the ware handed in, else the
`works` row named by `exchange.work_id` — and reads `work_participants` for a
work where it reads `ware_participants` for a ware. The same split, the same
rows, the same `reference_table`/`reference_id` key. `breakdown` carries
`subject_kind` and both id/name pairs, one of them null. `LedgerOutcome.skipped`
reads `no-subject` where it read `no-ware`; the webhook's own log branch
follows at `src/app/api/webhook/stripe/route.ts:380`, and its
`CompletedExchange` type carries `work_id` (line 304).

## proof

`.journals/proofs/tiers-the-standing-support/` — `prove-tiers.ts`,
`results.json`, `PROOF.md`. 42 of 42 checks passed, no Stripe, no base.

## the end lands on the subscription

`src/app/api/webhook/stripe/route.ts`: the `checkout.session.completed` branch,
after the exchange is recorded, calls `markSubscriptionEnd` when
`session.mode === 'subscription'` and a subscription id stands.
`markSubscriptionEnd` retrieves the subscription, reads `metadata.cancelAt`,
returns when it is absent or when `cancel_at` already stands, and otherwise
calls `stripe.subscriptions.update(id, { cancel_at })`. Every outcome is
logged; a throw is caught, so the webhook still returns 200.
`SubscriptionUpdateParams.cancel_at` is
`Emptyable<number | SubscriptionUpdateParams.CancelAt>` at
`node_modules/stripe/esm/resources/Subscriptions.d.ts:1782`.

`src/components/asgard/domains/hermes/wares/WareDetail.tsx`: the standing line
reads `recurrence.endsAt`. With an end it names the date from
`dateInputFromSupportEndsAt`; without one it keeps "until you end it".

`docs/sql/054-the-vessel-marks-its-own-line.sql` carries a second policy,
"Vessel reads own line" — `for select to authenticated using (sovereign_id =
auth.uid())` — beside the insert policy. Unrun.

Gates: `npx tsc --noEmit` exit 0; `npx eslint` over the two code files exit 0,
0 errors, 0 warnings.

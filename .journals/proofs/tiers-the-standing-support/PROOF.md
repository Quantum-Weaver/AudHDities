# PROOF — the standing support that ends, and the ledger's work road

One proof, run from the repo root. Every input is a fixture: a ware shape, a
work row, participant rows, pool rows. No Stripe object is created, no base is
read, no network is opened.

| file | proves | run |
|---|---|---|
| `prove-tiers.ts` | the three cadences, the end as column, metadata and date field, and the ledger rows for a work exchange | `npx tsx .journals/proofs/tiers-the-standing-support/prove-tiers.ts` |
| `results.json` | the last run's checks | |

## what stands under test

`src/lib/economics/recurrence.ts` — `SUPPORT_CADENCES`, `recurrenceOf`,
`supportEndsAtOf`, `cadenceOf`, `supportHasEnded`,
`supportEndsAtFromDateInput`, `dateInputFromSupportEndsAt`.

`src/lib/economics/ledger.ts` — `writeLedgerRowsForExchange` for an exchange
carrying `work_id` and no `ware_id`, against a fake client that records the
rows handed to the insert.

## the three cadences

| cadence | wares row | recurrence | the session |
|---|---|---|---|
| once | `billing_interval null` | `null` | `mode: 'payment'`, a price_data line item |
| each month | `billing_interval 'month'`, `stripe_price_id` | `interval month, endsAt null, cancelAt null` | `mode: 'subscription'`, `subscription_data: metadata` |
| each month until a date | `billing_interval 'month'`, `stripe_price_id`, `support_ends_at` | `interval month, endsAt ISO, cancelAt seconds` | `mode: 'subscription'`, `subscription_data: metadata + supportEndsAt + cancelAt` |

Checkout's `subscription_data` carries no `cancel_at` at stripe 22.5.0 / api
2026-07-29.dahlia (`node_modules/stripe/esm/resources/Checkout/Sessions.d.ts:2953`);
`cancel_at` stands on `SubscriptionCreateParams` and `SubscriptionUpdateParams`
(`node_modules/stripe/esm/resources/Subscriptions.d.ts:903,1782`). The end
travels on the subscription's own metadata, and the checkout route refuses a
rung whose end already passed.

## the ledger rows for a work exchange

A work of 40.00, a 10% platform fee, a 10% residual pledge, two participants,
the second holding a 10% covenant dial.

| entry_type | amount | from | to |
|---|---|---|---|
| platform_fee | 4.00 | vessel-buyer | — |
| fee_to_residual_pool | 1.20 | — | residual pool |
| fee_to_machine | 2.80 | — | — |
| residual_pledge | 3.60 | — | residual pool |
| contributor_share | 16.20 | — | vessel-a |
| contributor_share | 16.20 | — | vessel-b |
| covenant_pledge | 1.62 | vessel-b | covenant pool |

The leaves sum to 40.00 exactly. Every row carries
`reference_table 'exchanges'` and the exchange's own id.

## the checks

| check | result |
|---|---|
| a one-time ware reads no recurrence | `null` |
| a one-time ware reads the once cadence | `once` |
| a monthly ware reads the month interval | `month` |
| a monthly ware reads its own Price id | `price_rung` |
| a monthly ware reads no end | `null` |
| a monthly ware reads no cancel second | `null` |
| a monthly ware reads the month cadence | `month` |
| a monthly-until ware reads the month interval | `month` |
| a monthly-until ware reads its end as ISO | `2027-01-01T00:00:00.000Z` |
| a monthly-until ware reads its end in whole seconds | `1798761600` |
| a monthly-until ware reads the month_until cadence | `month_until` |
| the form offers the three cadences | `once,month,month_until` |
| once takes the payment mode | `mode=payment` |
| monthly takes the subscription mode with no end | `mode=subscription · subscription_data={metadata}` |
| monthly-until takes the subscription mode carrying its end | `mode=subscription · subscription_data={metadata + supportEndsAt=2027-01-01T00:00:00.000Z cancelAt=1798761600}` |
| the end is read from the metadata when no column carries it | `2027-01-01T00:00:00.000Z` |
| the end is read from the metadata recurring block | `2027-06-30T00:00:00.000Z` |
| the column wins over the metadata | `2027-01-01T00:00:00.000Z` |
| an unreadable end reads as none | `null` |
| an empty date field reads as none | `null` |
| a date field becomes the ISO moment | `2027-01-01T00:00:00.000Z` |
| the ISO moment becomes the date field again | `2027-01-01` |
| no end leaves the date field empty | `""` |
| an end still ahead has not passed | `false` |
| an end already behind has passed | `true` |
| a monthly ware with no end never passes | `false` |
| a work exchange is no longer skipped | `null` |
| a work exchange with two participants writes seven rows | `7` |
| the seven rows are the flow’s own lines | `platform_fee, fee_to_residual_pool, fee_to_machine, residual_pledge, contributor_share, contributor_share, covenant_pledge` |
| the amounts are the split of forty | `4.00 · 1.20 · 2.80 · 3.60 · 16.20 · 16.20 · 1.62` |
| the leaves sum to the gross exactly | `40.00 of 40.00` |
| both participants hold a share | `vessel-a,vessel-b` |
| the covenant comes out of the second vessel’s own share | `vessel-b → covenant-pool-1 · 1.62` |
| the platform fee comes from the buyer | `vessel-buyer` |
| every row carries the exchange as its key | `exchanges · exchange-work-1` |
| every row carries the event moment it was handed | `2026-09-13T12:00:00.000Z` |
| the breakdown names the work, not a ware | `subject_kind=work work_id=work-1 ware_id=null` |
| a ware exchange still writes seven rows | `7` |
| the ware breakdown still names the ware | `ware_id=ware-1 work_id=null` |
| a work exchange already written writes nothing twice | `already-written · 0 rows` |
| an exchange with neither ware nor work writes nothing | `no-subject · 0 rows` |
| an exchange whose work is gone writes nothing | `no-subject · 0 rows` |

42 of 42 checks passed.

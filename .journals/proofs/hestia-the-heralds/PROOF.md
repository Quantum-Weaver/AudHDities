# PROOF — the Heralds

One proof, run from the repo root. Every client is a fixture and `fetch` is
replaced for the duration: nothing here reaches a base or the network, and no
mail leaves.

| file | proves | run |
|---|---|---|
| `prove-heralds.ts` | the row the seam writes, the channel each herald takes, a muted vessel, an insert that fails or throws without throwing into the caller, and every road the mail can take or fail on | `npx tsx .journals/proofs/hestia-the-heralds/prove-heralds.ts` |
| `results.json` | the last run's checks | |

## the fixtures

A fake client answering `from('vessel_config').select().eq().maybeSingle()` with
settings, with nothing, or with a fault; and `from('heralds').insert()` with a
landing, with a base error, or with a throw. A fake `auth.admin.getUserById`
answering with an address or with a refusal. A fake `fetch` recording the
Resend call and answering ok, 422, or a throw. `RESEND_API_KEY` is set to a
string that is not a key and restored at the end.

## the checks

| set | check | result |
|---|---|---|
| the row | a herald with no readable settings is written | true |
| the row | one row lands, on heralds | "heralds" |
| the row | the row carries every column the seam names | ["body","channel","created_by","herald_type","recipient","reference_id","reference_table","table","title"] |
| the row | the recipient is the vessel told | "11111111-1111-4111-8111-111111111111" |
| the row | created_by falls to the recipient when no actor acts | "11111111-1111-4111-8111-111111111111" |
| the row | the type is the kind handed | "order_receipt" |
| the row | the channel falls to the house default | "in_app" |
| the row | the reference names the row behind it | ["exchanges","33333333-3333-4333-8333-333333333333"] |
| the row | a herald with no reference carries nulls | [null,null] |
| the row | an actor signs the row they caused | "22222222-2222-4222-8222-222222222222" |
| the row | eight kinds are named, and no more | ["order_receipt","sale_made","renewal_receipt","payouts_live","message_received","quest_completed","application_reviewed","badge_earned"] |
| the channel | the vessel's own setting is honoured | "email" |
| the channel | a channel handed by the caller stands over the setting | "in_app" |
| the channel | a vessel that keeps heralds off is not written to | [false,0] |
| the channel | the silence says why | "muted" |
| the channel | an unreadable setting falls to the default and still writes | "in_app" |
| the fall | a refused insert is reported, not thrown | false |
| the fall | the fault carries the base's own words | "new row violates row-level security policy" |
| the fall | a client that throws does not throw into the caller | false |
| the fall | the throw is carried as a note | "the base refused the connection" |
| the fall | a fallen herald is never counted written | "not-written" |
| the road | an in-app herald sends nothing | {"sent":false,"reason":"in-app-only"} |
| the road | a channel of none sends nothing | {"sent":false,"reason":"channel-silent"} |
| the road | no send was attempted for either | 0 |
| the road | an email herald with no readable address is not sent | {"sent":false,"reason":"no-address"} |
| the road | an address the caller holds is used | {"sent":true,"reason":"sent"} |
| the road | the mail goes to Resend | "https://api.resend.com/emails" |
| the road | the letter carries the herald whole | from · to · subject · text, with the bell's address appended |
| the road | the key rides in the header alone | true |
| the road | the base's own key may read the address | {"sent":true,"reason":"sent"} |
| the road | the looked-up address is the one written to | to: ["looked-up@audhdities.test"] |
| the road | a refused lookup leaves the herald standing and the mail unsent | {"sent":false,"reason":"no-address"} |
| the road | a road that throws is carried, not raised | {"sent":false,"reason":"send-failed","note":"the network is gone"} |
| the road | a refusal from Resend is recorded by its status | {"sent":false,"reason":"send-failed","note":"422"} |
| the road | no key means no mail and no throw | {"sent":false,"reason":"no-key"} |
| the road | the writer and the road run as one act | [true,{"sent":true,"reason":"sent"}] |
| the road | that act wrote exactly one row | 1 |
| the road | a muted vessel is neither written to nor mailed | [false,null,0] |

## the tally

`38 checks · 38 passed · 0 failed`

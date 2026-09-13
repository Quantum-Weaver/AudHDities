# heralds — the seam, the dispatcher, the eight call sites

## the seam

`src/lib/heralds/write.ts` exports `herald(db, input)`. It writes one
`heralds` row with the client it is handed — the visitor's browser client, a
route's server client, or the base's own key — and never throws into the act
that called it: a refusal or a throw is logged and returned as
`{ written: false }`.

The row it writes: `recipient`, `created_by` (`input.actor`, or the recipient
when the house itself acts), `herald_type`, `title`, `body`, `channel`,
`reference_table`, `reference_id`.

`heralds.herald_type` is a text column. The base holds no `herald_type` enum;
`notification_channel` (`in_app` · `email` · `push` · `none`) and
`herald_digest` are the only herald enums in
`src/lib/generated/supabase/database.types.ts`. The eight kinds are named once,
in `HERALD_TYPE`. `quest_completed` and `badge_earned` are the two the
notifications UI already carries an emoji for; the other six fall to its 📢.

The channel: `input.channel` when handed, else `vessel_config.herald_channel`
for the recipient when that row is readable, else `in_app`. A vessel whose
`vessel_config.heralds_enabled` is false gets no row at all.

`src/lib/generated/utils/hestia-core/heralds.ts:20` `createHeralds` still has
zero callers; it takes no client and uses the browser client alone.

## the dispatcher

`src/lib/heralds/dispatch.ts` exports `dispatch(db, written, hint)` and
`heraldAndDeliver(db, input, hint)`. A channel other than `email` sends
nothing. For `email` it reads the address from `hint.email`, or with
`hint.lookup` from `db.auth.admin.getUserById` (the base's own key only), and
sends through the same Resend road `src/app/api/contact/route.ts` uses:
`https://api.resend.com/emails`, `RESEND_API_KEY` by name, from
`AudHDities <contact@audhdities.com>`. No address, no key, or a refused send is
recorded and returned; the in-app herald still stands.

No public table carries an email address. `community_profiles` and
`user_private` hold none, so `auth.users` through the service client is the
only readable address.

## the eight events

| event | call site | herald_type | recipient | channel |
| --- | --- | --- | --- | --- |
| `checkout.session.completed`, exchange completed | `src/app/api/webhook/stripe/route.ts` → `heraldExchange(…, 'purchase')` | `order_receipt` | buyer | vessel's own, mail on `email` (address looked up) |
| the same crossing, told to the maker | `src/app/api/webhook/stripe/route.ts` → `heraldExchange` | `sale_made` | `wares.created_by` | vessel's own, mail on `email` (address looked up) |
| `invoice.paid`, renewal exchange written | `src/app/api/webhook/stripe/route.ts` → `heraldExchange(…, 'renewal')` | `renewal_receipt` | buyer | vessel's own, mail on `email` (address looked up) |
| `account.updated` with `payouts_enabled` newly true | `src/app/api/webhook/stripe/route.ts`, `account.updated` branch | `payouts_live` | `user_financial.created_by` | vessel's own, mail on `email` (address looked up) |
| a direct message written | `src/components/asgard/domains/iris/messages/ConversationView.tsx`, `handleSend` | `message_received` | thread partner | vessel's own; in-app only, no key in the browser |
| a quest's last objective ticked | `src/app/api/auth/vessel/quests/route.ts` → `tellQuestFinished` | `quest_completed` | the walker | vessel's own, mail on `email` (session address) |
| an application approved or rejected | `src/components/asgard/domains/themis/applications/review.ts`, `reviewApplication` | `application_reviewed` | `applications.user_id` | vessel's own; in-app only, no key in the browser |
| a sigil written to `vessel_sigils` | `src/lib/sigils/award.ts` → `tellSigilsEarned` | `badge_earned` | the holder | vessel's own, mail on `email` (session address) |

Each call stands after its own act has landed. The maker's `sale_made` also
rides a renewal. The payout herald fires only on the crossing from not-enabled
to enabled, read from the stored `payout_details` before the update.

## the timeline mark

`tellQuestFinished` writes `current` with `sovereign_id`, `event_type`
`quest_completed`, `description`, `event_at`, `reference_table`
`vessel_quests`, `reference_id`. `TimelineSpiral`, `ObservatoryHub`,
`ConstellationContent` and `VesselContent` read that table; `quest_completed`
is already in the Spiral's emoji and label maps. A mark that already stands for
that vessel and quest stops both the mark and the herald.

`current`'s insert policy admits council and admin only
(`docs/sql/041-the-gates-face-the-column.sql:119`), so the mark does not land
until `docs/sql/054-the-vessel-marks-its-own-line.sql` is applied. A refused
mark is logged; the quest walk's answer is unchanged.

## the proof

`.journals/proofs/hestia-the-heralds/prove-heralds.ts` — 38 checks, all
passing, against fake clients and a fake `fetch`.

# The Council, room by room

## What each room is now

| room | address | state | reads / writes |
|---|---|---|---|
| The Council Chamber | `src/app/(themis)/council/page.tsx` | stands, gating trued | `community_profiles.roles` |
| Proposals | `src/app/(themis)/council/proposals/page.tsx` | rebound | reads `proposals` |
| A proposal | `src/app/(themis)/council/proposals/[id]/page.tsx` | rebound, vote wired | reads `proposals`, `votes`; writes `votes` |
| A new proposal | `src/app/(themis)/council/proposals/new/page.tsx` | built | writes `proposals` |
| Voting | `src/app/(themis)/council/voting/page.tsx` | rebound, vote wired | reads `proposals`, `votes`; writes `votes` |
| Delegation | `src/app/(themis)/council/delegation/page.tsx` | honest | reads nothing; no control grants or revokes |
| Curators | `src/app/(themis)/council/curators/page.tsx` | built | reads `community_profiles` where `roles` holds `curator` |
| The Ledger | `src/app/(themis)/council/ledger/page.tsx` | stands, untouched | reads `ledger` |
| Reports | `src/app/(themis)/council/reports/page.tsx` | rebound | reads `reports` |
| Administration | `src/app/(themis)/council/admin/page.tsx` | server-gated | `community_profiles.roles` |
| Vessel Management | `src/app/(themis)/council/admin/users/page.tsx` | built | reads `community_profiles`, `role_catalog`; writes `community_profiles.roles` |
| Audit Logs | `src/app/(themis)/council/admin/audit/page.tsx` | built | reads `admin_actions`, `moderation_actions` |
| Applications | `src/app/(themis)/council/applications/page.tsx` | rebound, review wired | reads/writes `applications`, `artisan_profiles`, `merchant_profiles`, `community_profiles` |
| An application | `src/app/(themis)/council/applications/[id]/page.tsx` | built | same as above |
| Artisan application | `src/app/(themis)/council/applications/artisan/page.tsx` | stands | writes `applications` |
| Merchant application | `src/app/(themis)/council/applications/merchant/page.tsx` | stands | writes `applications` |
| Application received | `src/app/(themis)/council/applications/thank-you/page.tsx` | built | reads nothing |

## The group's boundaries

`src/app/(themis)/loading.tsx` · `src/app/(themis)/error.tsx` ·
`src/app/(themis)/not-found.tsx`

## Modules added

| file | holds |
|---|---|
| `src/components/asgard/domains/themis/status.ts` | `APPLICATION_STATUSES`, `STATUS_LABELS`, `STATUS_COLORS`, `OPEN_STATUSES`, `isOpen`, `statusLabel`, `statusColor`, `APPLICATION_TYPE_LABELS`, `slugify` |
| `src/components/asgard/domains/themis/roles.ts` | `BASE_ROLE`, `setRoles`, `grantRole`, `readRoleCatalog` |
| `src/components/asgard/domains/themis/applications/review.ts` | `reviewApplication` — the status write, the profile row, the role grant |
| `src/components/asgard/domains/themis/voting/vote.ts` | `VOTE_CHOICES`, `castVote`, `readCounts`, `readOwnVotes`, `isVotable` |
| `src/components/asgard/domains/themis/proposals/write.ts` | `PROPOSAL_TYPES`, `createProposal` |
| `src/components/asgard/domains/themis/admin/gate.ts` | `requireAdmin` |

## Components added

`applications/ApplicationDetail.tsx` · `proposals/ProposalForm.tsx` ·
`admin/VesselRoster.tsx` · `admin/AuditLog.tsx`

## The columns the group now reads

`applications`: `id`, `user_id`, `application_type`, `status`, `form_data`,
`review_notes`, `reviewed_by`, `reviewed_at`, `created_at`.
`proposals`: `id`, `name`, `description`, `proposal_type`, `slug`, `status`,
`votes_for`, `votes_against`, `voting_ends_at`, `created_by`.
`votes`: `id`, `proposal_id`, `voter_id`, `choice`, `updated_at`.
`reports`: `id`, `name`, `description`, `priority`, `status`,
`reported_entity_type`, `reported_entity_id`, `resolution`, `created_at`.
`admin_actions` and `moderation_actions`: `id`, `action_type`, `description`,
`taken_at`, `target_entity_type`, `target_entity_id`.
`community_profiles`: `id`, `display_name`, `slug`, `bio`, `avatar_url`,
`icon_emoji`, `roles`, `sovereign_tier`, `status`, `created_by`.
`role_catalog`: `role`, `label`, `icon_emoji`, `sort_order`.

## The gates the base holds

The vote is written by the `council` role; the base's own insert policy on
`votes` names it. A proposal is written by `council` or `admin`. An
application is reviewed by `admin`. Reports are read by `council` or `admin`.
The role grant is written by `admin`; the trigger on `community_profiles`
refuses any other hand.

## Papers

`docs/sql/049-the-delegations.sql` — the `delegations` table, its unique
living row per delegator, its four policies and its touch trigger. Not run.

## Gates

`npm run type-check` — exit 0, no output.
`npx eslint "src/app/(themis)" "src/components/asgard/domains/themis"` —
7 problems, 6 errors and 1 warning, all seven standing before this sitting:
five `no-explicit-any` and one unused `profile` in `ApplicationForm.tsx`, and
`set-state-in-effect` in `LedgerHub.tsx`.

## Not built

Delegation has no table, so the hub grants and revokes nothing.
`/council/admin/settings` and `/council/admin/analytics` were advertised and
404; no table carries platform configuration or usage metrics, so both were
removed from the Administration hub rather than built.
`checkOwnership` in `src/lib/api/auth.ts` reads `<table>_id` as the primary
key; every generated `[id]` route inherits it. Outside this group.

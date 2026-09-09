# 2026-09-09 — THE GATEWAY wired to the beacons register (aethelred)

*The Nexus's Gateway, `/nexus/api`. Nothing committed, no SQL run.*

## What the page now is

`src/app/(aethelred)/nexus/api/page.tsx` is a dynamic server page behind the
sign-in gate the realm README rules for the Gateway (`AUTH_ROUTES.LOGIN` with a
redirect back to `/nexus/api`). It reads the `beacons` register from the
KNOWLEDGE base through its anon door, groups the rows, reads GitHub's public API
for the open repos and the two faces, and hands one view object to
`RepoConstellation`. The eleven-entry `THE_SET` constant and the two-entry
`THE_FACES` repo constant are gone; `THE_FACES` now names two beacon slugs,
their GitHub logins and their profile addresses only.

## The road to the register

`src/lib/nexus/gateway-read.ts` reads through `createApiSupabase('knowledge')`
(`src/lib/api/supabase.ts:20`), the plain client the house already uses for the
KNOWLEDGE project: no cookie store, no session, the project's own RLS deciding
what an anon read gets. The door is named by two variables,
`NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE`. When either is absent the read
returns `doorNamed: false` and the page prints
`register unread · the knowledge door is not named on this host` in place of the
groups. When the door answers with an error the page prints the refusal in three
parts: `the register refused this read` · `beacons · <the base's message>` ·
`next · a read policy on beacons for the anon door`.

The columns read: `name · slug · beacon_type · status · definition · repo_url ·
is_public · version · icon_emoji · available_on` and the four
store standings `audhdities_status · galaxy_status · microsoft_status ·
play_status`. The row type is `Database['public']['Tables']['beacons']['Row']`
from `src/lib/generated/supabase/knowledge/database.types.ts:205`.

## The grouping

`groupBeacons` in `src/lib/nexus/gateway-contract.ts` sets the two pinned faces
aside and puts every other row in exactly one of three groups: a row with
`repo_url` null lands in **no repo**; otherwise `is_public` true lands in
**Open** and false in **Private**. Each group prints
its own count, counted from its rows, and its own sentence when it holds none.
A card's door and its action follow the row, not the group: a link when the
beacon is public and names a repo, the request when the beacon is private.

## GitHub

`src/lib/nexus/gateway-github.ts` calls `https://api.github.com/repos/<owner>/<repo>`
and `https://api.github.com/users/<login>` with `Accept` and `User-Agent` headers
and nothing else — no credential of any kind — under Next's fetch cache with
`next: { revalidate: 3600 }`. The owner and repo are parsed from `repo_url` by
`parseRepoAddress`; a non-github.com address yields no read and the card stands
on the register's columns. `readBeaconFacts` refuses to call for a private
beacon or a beacon with no repo. A card shows GitHub's `description` beside the
register's `definition` only when the two differ, and carries `pushed_at` as a
stamp, `stargazers_count`, `language`, `open_issues_count` and `archived`. A
non-2xx answer, a thrown fetch or a shapeless body prints one line,
`GitHub did not answer · <status>`, and the card keeps its register columns.

## The request

`src/lib/nexus/gateway-request.ts` is a server action on
`src/lib/supabase/server.ts`, so the write runs under the visitor's own session.
It lands one row in `contact_submissions`:

| column | value |
|---|---|
| `name` | the visitor's own name from user metadata, else the address they signed in with |
| `email` | `user.email` |
| `subject` | `collaborate · <slug>` |
| `message` | `request to collaborate on <name> (<slug>)` and the visitor's note |
| `category` | `collaboration` |
| `status` | `draft` |
| `created_by` | `user.id` |

`applications` was not taken: its `application_type` enum is
`artisan | merchant | curator | council`
(`src/lib/generated/supabase/database.types.ts:6315`), which admits no
collaboration value, and an illegal value bites at insert time.
`contact_submissions.category` is `string | null`, a free-text column with no
enum behind it (`database.types.ts:1327`), so `collaboration` is legal;
`contact_submissions.status` is the `content_status` enum
(`draft | published | archived`, `database.types.ts:6316`) and `draft` is legal
and is what `src/app/api/contact/route.ts:94` already writes.

The action takes a slug and a note and nothing else. It bounds the slug
server-side (trimmed, lowercased, `^[a-z0-9-]+$`, at most 80), reads the register
through `readBeacons`, and lands the row only when that slug names a register row
with `is_public` false that `isFace` does not name; the beacon's name is taken
from that row. A slug the register holds public, a slug it does not hold, a face
slug and a slug outside the bound each print
`this slug is not a private repo in the register` with the register's own reason
and `next · reload the Gateway and request a private beacon`. A door that is not
named and a base that faults print `the request did not land` with the register's
message.

On success the card prints `request landed · <stamp>` from the row's own
`created_at`. On refusal it prints three parts: `the request did not land` ·
`contact_submissions · <the base's message>` ·
`next · an insert policy on contact_submissions for this visitor`. An unsigned
render shows `sign in to request` in place of the button, and the action itself
refuses a session-less call.

## The two faces

The beacons with slugs `quantum-weaver` and `aethelred-cello` are pinned as
their own section, `The two faces`, below every other group. `isFace` keeps them
out of Open, Private and no repo, so they never count in a group's tally; when
the door is named the page's own count line reads
`<n> beacons in the register · 2 pinned as faces`.
Each face card reads its register row (`icon_emoji · name · definition ·
beacon_type · status · version · repo_url`) through `faceBeacon`, and GitHub's
public users API for `name`, `bio`, `public_repos` and `followers`, degrading to
the same one line. GitHub's bio prints beside the register's definition only when
the two differ. A face the register does not hold prints `no register row` and
stands on its GitHub read alone.

## House words

`HouseWordsFooter` closes the page and `withHouseWords` wraps the register's
`definition` on a beacon card and on a face card, and GitHub's `bio` on a face
card, so `KP` carries its footnote to `/about`. GitHub's repo `description` is
printed unwrapped; `story` is not read and never renders.

## What was verified

- `npx tsc --noEmit` — no output.
- `npm run build` — `✓ Compiled successfully in 5.3s`,
  `✓ Generating static pages using 23 workers (299/299) in 1606ms`,
  `├ ƒ /nexus/api`.
- `npx eslint` on the six changed files and the proof — exit 0, no output.
- `npx tsx .journals/proofs/aethelred-the-gateway/prove-gateway.ts` — **43 of
  43**: the grouping, the two faces, the address parsing, the GitHub degrade,
  the never-called private repo, the request's legality against the generated
  `Constants`, the slug admission, and the select.
- Grep across `src/lib/nexus`, the three Nexus components, the page and the
  proof: `Authorization|Bearer|service_role|SUPABASE_SECRET|dotenv|readFileSync|.env`
  0 in every file; one `.insert(` in `src/lib/nexus`,
  `src/lib/nexus/gateway-request.ts:47`, under `.from('contact_submissions')` at
  line 46; `'home'` and `'story'` 0 in `src/lib/nexus`. The only `process.env`
  references are the two knowledge variable names in `gateway-read.ts:21-22`.

## What stands open

- The knowledge door was not reachable from here: the two variables are not set
  on this host, so the register read was never exercised against the live base.
  When they are unset KP sees the sentence alone and each face name beside
  `register unread`; when they are set KP sees the tally, the badges and the
  groups.
- The insert policy on `contact_submissions` for `authenticated` was not
  verified — no SQL was run and no policy was read. If no insert policy admits
  the visitor, the button prints the three-part refusal with the base's own
  message.
- The page redirects an unsigned visitor, so the `sign in to request` branch is
  reached only if the tier is ever loosened.

## Trued

- `src/lib/nexus/gateway-contract.ts:10-26,29-45` — `story` and `home` are out of
  `GatewayBeacon` and out of `BEACON_COLUMNS`.
- `src/lib/nexus/gateway-contract.ts:200-201` — `REGISTER_UNREAD` is the phrase
  `DOOR_UNNAMED` is built from.
- `src/lib/nexus/gateway-contract.ts:185` — `GatewayFace.read` is
  `GitHubRead<UserFacts> | null`.
- `src/lib/nexus/gateway-contract.ts:261-326` — `registerUnreadRefusal`,
  `SLUG_MAX` 80, `NOT_PRIVATE`, `boundSlug` (trimmed, lowercased, `^[a-z0-9-]+$`,
  at most `SLUG_MAX`), `notPrivateRefusal`, `RequestAdmission` and `admitRequest`:
  a slug is admitted only when the register holds a row under it with
  `is_public` false that `isFace` does not name, and the admitted row carries
  the `beaconName`.
- `src/lib/nexus/gateway-request.ts:29-45` — `requestCollaboration(slug, note)`
  takes no name from the client; it reads the register through `readBeacons`,
  refuses with `registerUnreadRefusal` when the door is unnamed or the base
  faults, refuses with `admitRequest`'s three-part refusal otherwise, and writes
  `admission.slug` and `admission.beaconName` into the subject and the message.
- `src/components/asgard/domains/aethelred/nexus/RequestToCollaborate.tsx:17-20,33,54`
  — the `beaconName` prop is gone.
- `src/components/asgard/domains/aethelred/nexus/RepoConstellation.tsx:76-79` — a
  store standing of `none`, null or empty is not printed; a card whose four
  standings are all `none` prints no standings line.
- `src/components/asgard/domains/aethelred/nexus/RepoConstellation.tsx:203-223` —
  a face with no read prints its login and `register unread`, and nothing else.
- `src/components/asgard/domains/aethelred/nexus/RepoConstellation.tsx:324-334` —
  the tally line and the two source badges render only when the door is named.
- `src/app/(aethelred)/nexus/api/page.tsx:58` — GitHub is not called for a face
  when the door is unnamed.
- `.journals/proofs/aethelred-the-gateway/prove-gateway.ts` — nine `admission`
  checks (a private slug admitted with its register name, a private slug with no
  repo admitted, a public slug refused, an unknown slug refused, a face slug
  refused, an over-long slug refused, a punctuated slug refused, an empty slug
  refused, a slug matched lowercased) and one `columns` check (`story` and `home`
  not selected); the fixture no longer sets `story` or `home`.
- `.journals/proofs/aethelred-the-gateway/PROOF.md` — the checks table and the
  count are the current run's.

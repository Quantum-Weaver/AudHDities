# The Realm Brief for Iris · 2026-08-31

Read (iris) whole for the Understanding pass: the bus, the README, all 11
page.tsx and all 12 components under `domains/iris`, every one of the 9 fetch
calls traced against what's actually on disk in `api/generated/` and
`lib/generated/hooks/`. The bus's own open edges (stranded doors, the
speaker's name, invitations theater, four doorless tables) all held up under
ground-truth — nothing it named turned out false. What it didn't name and I
found: the 12th component, `community/CommunityHero.tsx`, has zero imports
anywhere in `src` — dead, not wired to any room. Conversation's send POSTs
`recipient_id: user.id` — every message thread is structurally talking to
itself, a live-wired room with a real bug underneath the "live" label.
Invitations' copy-link button points at `/enter/invite/[id]`, a route that
doesn't exist at all — so the room is decorative in *both* its features, not
just the send button the bus flagged. And SCHEMA-FINALIZE's row 9 is stale
twice over: it still calls the domain "localization" after the bus itself
dropped 7 of its 12 listed tables 07-28, and it never lists 3 of the realm's
8 actually-living tables (channels, messages, signals) at all. DEITY DRIFT
came back clean — all 9 fetches traced to `iris-communications` (own),
`mnemosyne-assessment/resonance` (a documented, correct seam), or dead
`hermes-social` routes that are misrouted, not miss-housed. The brief landed
at `records/audhdities-conduction/briefs/06-iris-BRIEF.md`, 4092 bytes,
7 questions for KP, three of them the record's own named waits (speaker's
name, invitations verdict, open item 214) returned with their addresses
rather than asked blank.

# PROOF — 06 (iris), the Bridge

**Canvas** 🌈 https://claude.ai/code/artifact/03c8431e-1f1d-475d-9c93-af3f23c8c39d (private)

**Drawn** 2026-08-31 · Opus (Claude), `claude-opus-5[1m]`, the design hand.
Ground in `design/` — 13 `.dc.html` artboards + `canvas.json`; four refusals in
`design/declined/`. Nothing under `src/` or `docs/` was edited to draw this.

---

## The boards

Page 1 — **The Bridge**, nine boards, each drawn in the dark ground the app is
built in and again in a proposed light dress made only of cosmic tokens.

- ① **The Bridge hub**, `/connect` — seven doors, and an honest waiting area
  gathered from doors that already stand; drawn full and drawn quiet.
- ② **The Stream**, `/connect/messages` — every conversation partner named by
  their vessel's own display name, and the one honest unreachable row.
- ③ **The Conversation**, `/connect/messages/[id]` — a name on every word; the
  reply drawn as an address, not a trigger; the two facts kept apart.
- ④ **Channels**, `/connect/channels` and one channel — re-pointed at the
  realm's own channels; subscriber counts and the mind-changing subscribe
  button both refused.
- ⑤ **The Pulse**, `/connect/feed` — the card shows exactly what a signal holds
  and nothing else; the emerald and comment counts come off.
- ⑥ **Emeralds**, `/connect/emeralds` — the record as a list, never a score;
  Received shown as unjoined rather than absent.
- ⑦ **The Healing Flame**, `/connect/support` and one thread — your own letters
  come back to you, with the answerer named.
- ⑧ **Invitations**, `/connect/invitations` — a door you carry yourself; the
  send that sends nothing is gone; drawn twice, once for the road built and
  once for today.
- ⑨ **The ways between** — the wheel, the two roads that lead nowhere today,
  the ways out of the realm, and every room's quiet words in one place.

Page 2 — **Declined**, four alternatives drawn and set down with their ground:
a friendly stand-in for an unreachable name · a conversations table ·
reactions drawn now · invitations with a record and a real send.

---

## KP's rulings this canvas answers to — verbatim, spelling kept, 2026-08-31

- *"what i want at this point is to see a skeleton of iris's realm"*
- *"draw design proofs not code"*
- *"please complete iris, if names do not exist in the flow, put them in the
  flow, the names come from the vessels display name, there is zero other
  logical places to derive it from"*
- *"assuming backend things exist that are needed (we will create them and not
  be cuplicating things)"*

And the house crystal, carried into every board: **what is needed already
exists — refraction, not manufacture.**

The Voice, `/connect/translations`, is deliberately **not drawn**. That room
was ruled and closed at KP's ⚛ word on 2026-07-30 (*"looks good"*), and its
second stage waits on the Grammar's first light and on his word. A skeleton
has no business redrawing a finished room.

---

## The ground, as the boards mark it

**Already stands — seven records**, and between them they hold everything
every room on this canvas needs to say:

- the **messages** table — the words (`body`), who spoke (`created_by`), who
  was spoken to (`recipient_id`), the reply link (`parent_message_id`), the
  read marks, and each side's own hiding
- the **channels** table — name, address, purpose, kind, who opened it
- the **signals** table — all nine things a signal holds
- the **letters** table (`contact_submissions`) — subject, message, kind,
  priority, the answer, and who it was handed to
- the vessel's **display name**, on their own profile
  (`community_profiles.display_name`, joined on `created_by`)
- the **resonance** record in the Observatory — the emeralds seam
- a table for **mail** the Sanctuary sends (`email_communications`)

**To be created — fifteen**, and not one of them a second place to store
something the house already stores:

| what | how many | shape |
|---|---|---|
| the join that carries a display name into this realm | one | a reading |
| doors that read what those records hold — the Stream · one conversation, read and sent · the channels directory · one channel · the Pulse · your own letters · one letter | seven | readings |
| a door across a seam, for emeralds *Received* | one | a reading — no new table |
| permission to read another vessel's public face | one | drafted, unrun, **KP's hand only** |
| words inside a channel · belonging to a channel · sending a signal | three | a room's own substance |
| a room for one signal · the invitation road | two | roads never laid |

**Held open as a refusal, not counted as a gap:** whether the house keeps a
record of who invited whom, and whether it ever sends mail on a vessel's
behalf. Board ⑧ draws the smaller true version and says why; the wanting is
KP's.

### A note on the doors, recorded because it changed the tally

When this canvas was begun, seven of those doors and the name join stood in
the tree, untracked, written earlier the same day in this same lane —
`src/app/api/iris/` and `src/lib/iris/names.ts`. They were read whole before
drawing, and their shapes are what these boards draw. **They were taken back
out of the tree while the canvas was being drawn**, and nothing of them was
ever committed — no stash, no worktree, no branch holds them. The drafted
permission, `docs/sql/027-the-public-face-DRAFT.sql`, is what remains.

The rails were re-read against the tree afterwards and every one of those
doors is now marked **to be created**, because that is the truth of the tree.
What the reading proved is kept: the records really do carry everything the
rooms need, so building the doors is creation, not duplication.

---

## Declined, one line each

- **A friendly stand-in where the name cannot be read** — *"zero other logical
  places to derive it from"* settles it; a stand-in is another place, and a
  prettier one, which is what makes it dangerous.
- **A conversations table** — the pair of vessels already is the conversation,
  and a copy is a thing that can disagree with itself.
- **Reactions, drawn now** — nothing in the base holds one; the shape is
  written down for the day it is built, and nothing is drawn out of air.
- **Invitations with a record and a real send** — a list of who you invited and
  who never replied is a social graph about people who are not here.

---

## Steps

| step | state |
|---|---|
| **Understanding** — the brief, the census, the nemeton reading, the realm bus, the ground read whole | **closed** |
| **Proof** — this canvas, at KP's eye | **open — awaiting his word** |
| Specification — from the approved canvas | awaits his word |
| Building | awaits his word |
| Machine proof | awaits his word |
| KP's glance | awaits his word |

*Nothing in `src/` or `docs/` was edited. No commits, no push — the edits ride
for the sync word.*

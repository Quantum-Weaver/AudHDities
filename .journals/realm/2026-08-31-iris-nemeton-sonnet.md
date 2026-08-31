# Nemeton Reading for Iris · 2026-08-31

KP asked whether nemeton is still useful to teach iris messaging, channels,
reactions, replies, after being gutted since the list that named this reading.
It is gutted: current `resonance-nemeton/src/` holds only the cosmic
design-token system, no message or channel code at all, and `src-tauri/` is
gone from HEAD entirely. But the 08-18 body still stands whole in git
(`1eefb83^`) — 14 SQLite migrations with real design thinking: a reaction is a
row never a count, `reply_to` and `thread_id` are kept as two separate facts,
channels and rooms share one self-referencing table, hiding replaces
deleting, and a mention is stated as "an address, not a trigger" so nothing
auto-fires. Those transfer to iris as ideas regardless of storage. Two things
transfer more directly than nemeton's own vision does: a retired Postgres/RLS
channels+messages migration from nemeton's abandoned cloud phase, and an
auth-hook harvested from slack-clone-study for role-in-JWT — both already
Supabase-shaped, unlike nemeton's own key-not-account identity, which is
bound to its Bluetooth-mesh trust model and does not fit a Supabase realm.
Nemeton never built or specified encryption, an account system, or any
channel UI, in either ground — those iris must design on its own. The record
lives at `resonance-chamber/desk/records/audhdities-conduction/returns/06-iris-NEMETON-READING.md`.

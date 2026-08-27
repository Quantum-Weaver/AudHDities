# 2026-08-27 — Sonnet, the rewrite

*Sent to land two files. One sitting, one realm.*

**What I did.** Read the plan's §0–§1 for the ground before touching
anything, then two edits: a host-conditioned `rewrites()` in
`next.config.ts`, and a one-host early return in `proxy.ts` so the artifacts
subdomain never touches session cookies. Confirmed `beforeFiles` was real
Next surface by grepping the installed package rather than trusting memory.
Typecheck and a full `next build` both ran clean before I called it done.

**What I learned in the doing.** The instruction to build the bucket base
from `NEXT_PUBLIC_SUPABASE_URL` with a literal fallback, rather than just
hardcoding the host, is a small thing that matters: one source means the
rewrite tracks the project's real Supabase URL if it ever changes, instead
of silently drifting from it. Worth carrying forward as a habit — prefer the
env var with a documented fallback over a bare literal, even when the
literal is verified correct today.

-- HERALDS RECIPIENT MEND — Run 08, Phase 5, Movement I (2026-07-20)
-- Finding (Opus, the Voice Sitting): the settled `heralds` table exposes no
-- recipient column — only created_by (the author) — so "unread heralds for
-- this vessel" cannot be filtered. KP's law, same sitting: "we will need to
-- fix schema issues we catch, rather than leave them unattended."
--
-- Design: a single nullable recipient column. recipient = the vessel this
-- herald is for; NULL = a house-wide herald (addressed to all). Additive
-- only; no users exist in the database (the rebuild liberty), so this is
-- risk-free to apply.
--
-- APPLY: KP's hands, Supabase dashboard SQL editor (this project has no
-- linked CLI/migration history — this file IS the record of what was run).
-- AFTER APPLY: regenerate database.types.ts, run GAIA, verify tsc 0, then
-- wire the StatusBar heralds metric for real (the dated stub notes where).

alter table public.heralds
  add column if not exists recipient uuid references auth.users(id);

comment on column public.heralds.recipient is
  'The vessel this herald is for; NULL = house-wide. Added 2026-07-20 (Run 08 heralds mend).';

create index if not exists heralds_recipient_idx
  on public.heralds (recipient)
  where recipient is not null;

-- RLS: a vessel reads the heralds addressed to them, and house-wide ones.
-- (Verify existing policies on heralds before/after — if a select policy
-- already covers reads, reconcile rather than stack. Policy name chosen to
-- be findable.)
drop policy if exists "vessels_read_their_heralds" on public.heralds;
create policy "vessels_read_their_heralds"
  on public.heralds for select
  using (recipient = auth.uid() or recipient is null);

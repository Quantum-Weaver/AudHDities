-- ═══════════════════════════════════════════════════════════════════
-- 003 — THE STAGE GROUND (Door A, ruled by KP ⚛ 2026-07-31)
-- ═══════════════════════════════════════════════════════════════════
-- Provenance: docs/STAGE-GROUND-DECISION.md (edge ① of the
-- (prometheus) realm bus). KP's ruling: "Door A" — the Stage gets a
-- born table — with his widening word the same sitting: "we can
-- update anything needed in other tables to further support this.
-- we have not gone live yet."
--
-- Drafted live-verified by Fable 🎻 (lane prometheus-realm):
-- events was PGRST205-absent this sitting; content_status enum is
-- live (draft·published·archived); works.id is uuid pk (the
-- recording bridge target); gaia_sync(p_table) is live (001).
--
-- Plain SQL throughout — no DO blocks (the 000 ritual's law).
-- Run whole in the dashboard SQL editor.
-- ═══════════════════════════════════════════════════════════════════

-- ── 1 · The table ──────────────────────────────────────────────────

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  event_type text,
  genre text,
  performer_id uuid,
  is_live boolean not null default false,
  is_recorded boolean not null default false,
  scheduled_for timestamp with time zone,
  started_at timestamp with time zone,
  recorded_at timestamp with time zone,
  recording_work_id uuid references public.works(id),
  status public.content_status not null default 'draft',
  created_at timestamp with time zone not null default now(),
  created_by uuid,
  updated_at timestamp with time zone not null default now(),
  updated_by uuid
);

-- ── 2 · The new-table ritual (RLS + public read, ritual 000) ──────

alter table public.events enable row level security;

create policy "Public read events" on public.events
  for select using (true);

-- ── 3 · The self-knowing layer meets its newest table ─────────────

select public.gaia_sync('events');

-- gaia_sync registers it as deity_group='unassigned'; name its true
-- house (the folder GAIA will generate routes under):

update public.gaia_config
   set deity_group = 'prometheus-stage',
       notes = 'The Stage''s born ground — Door A, ruled 2026-07-31 (docs/STAGE-GROUND-DECISION.md)',
       updated_at = now()
 where table_name = 'events';

-- ── 4 · Verify (expected: 1 row · rls true · 1 policy · registered)

select count(*) as events_table
  from pg_tables
 where schemaname = 'public' and tablename = 'events';

select relrowsecurity as rls_enabled
  from pg_class
 where relname = 'events' and relnamespace = 'public'::regnamespace;

select policyname
  from pg_policies
 where schemaname = 'public' and tablename = 'events';

select table_name, deity_group, status
  from public.gaia_config
 where table_name = 'events';

-- The enum table keeps itself: gaia_sync stewards enums.used_by
-- from the living columns (001, the whole-base section). Expected:
-- content_status's used_by now includes 'events'.

select name, labels, used_by
  from public.enums
 where name = 'content_status';

-- After this runs clean: Fable's sitting takes over — anon-door
-- verify (expect [] + 200, the honest empty), regenerate types +
-- GAIA (the prometheus-stage group joins deity_groups.ts by
-- Fable's hand), re-point the 10 fetches, tsc 0, boards trued.
-- — Fable 🎻 (lane prometheus-realm)

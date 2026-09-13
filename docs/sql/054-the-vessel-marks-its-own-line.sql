-- ============================================================================
-- 054 — THE VESSEL MARKS ITS OWN LINE
-- ============================================================================
-- current holds the timeline the Spiral, the Observatory and the Vessel read.
-- Its insert policy admits council and admin only (041), so a vessel cannot
-- mark its own finished quest. An authenticated vessel may now insert a row
-- whose sovereign_id is their own uid. The quest walk's POST
-- (src/app/api/auth/vessel/quests/route.ts) writes event_type 'quest_completed'
-- with sovereign_id from the session, and its repeat guard selects that row
-- back, so a vessel also reads the rows whose sovereign_id is their own uid.
-- Safe to run again.
-- ============================================================================

alter table public.current enable row level security;

drop policy if exists "Vessel marks own line" on public.current;
create policy "Vessel marks own line"
  on public.current for insert
  to authenticated
  with check (sovereign_id = auth.uid());

drop policy if exists "Vessel reads own line" on public.current;
create policy "Vessel reads own line"
  on public.current for select
  to authenticated
  using (sovereign_id = auth.uid());

grant select, insert on public.current to authenticated;

-- CHECK
select policyname, cmd, roles
  from pg_policies
 where schemaname = 'public' and tablename = 'current'
 order by policyname;

select grantee, privilege_type
  from information_schema.role_table_grants
 where table_schema = 'public' and table_name = 'current'
   and grantee in ('anon', 'authenticated')
 order by grantee, privilege_type;

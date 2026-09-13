-- ============================================================================
-- 052 — THE STAGE OPENS FOR WRITING
-- ============================================================================
-- events carries one policy: public read (003). An authenticated vessel may
-- now insert a row whose created_by is their own uid, and may update the rows
-- they created. Anon holds select only. The Studio's POST
-- (src/app/api/generated/prometheus-stage/events/route.ts) stamps created_by
-- from the session before the insert. Safe to run again.
-- ============================================================================

alter table public.events enable row level security;

drop policy if exists "Vessel puts up own event" on public.events;
create policy "Vessel puts up own event"
  on public.events for insert
  to authenticated
  with check (created_by = auth.uid());

drop policy if exists "Vessel tends own event" on public.events;
create policy "Vessel tends own event"
  on public.events for update
  to authenticated
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

grant select, insert, update on public.events to authenticated;
grant select on public.events to anon;

-- CHECK
select policyname, cmd, roles
  from pg_policies
 where schemaname = 'public' and tablename = 'events'
 order by policyname;

select grantee, privilege_type
  from information_schema.role_table_grants
 where table_schema = 'public' and table_name = 'events'
   and grantee in ('anon', 'authenticated')
 order by grantee, privilege_type;

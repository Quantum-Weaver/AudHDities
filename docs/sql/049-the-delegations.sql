-- ============================================================================
-- 049 — THE DELEGATIONS
-- ============================================================================
-- delegations holds one living row per delegator per scope: the vessel whose
-- voice is lent, the vessel that carries it, and the moment it was reclaimed.
-- A delegate must carry the curator role. A revoke is a revoked_at write, not
-- a delete. The table joins gaia's registry under themis-governance. Safe to
-- run again.
-- ============================================================================

create table if not exists public.delegations (
  id            uuid primary key default gen_random_uuid(),
  delegator_id  uuid not null references auth.users(id) on delete cascade,
  delegate_id   uuid not null references auth.users(id) on delete cascade,
  scope         text not null default 'all',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  revoked_at    timestamptz,
  constraint delegations_not_self check (delegator_id <> delegate_id)
);

create unique index if not exists delegations_one_living
  on public.delegations (delegator_id, scope)
  where revoked_at is null;

create index if not exists delegations_delegate
  on public.delegations (delegate_id)
  where revoked_at is null;

alter table public.delegations enable row level security;

drop policy if exists "Delegator reads own delegations" on public.delegations;
create policy "Delegator reads own delegations"
  on public.delegations for select
  to authenticated
  using (delegator_id = auth.uid());

drop policy if exists "Delegate reads delegations held" on public.delegations;
create policy "Delegate reads delegations held"
  on public.delegations for select
  to authenticated
  using (delegate_id = auth.uid());

drop policy if exists "Council reads every delegation" on public.delegations;
create policy "Council reads every delegation"
  on public.delegations for select
  to authenticated
  using (private.has_role(array['council'::public.user_role, 'admin'::public.user_role]));

drop policy if exists "Delegator lends own voice" on public.delegations;
create policy "Delegator lends own voice"
  on public.delegations for insert
  to authenticated
  with check (
    delegator_id = auth.uid()
    and revoked_at is null
    and exists (
      select 1 from public.community_profiles p
       where p.created_by = delegate_id
         and p.roles && array['curator'::public.user_role]
    )
  );

drop policy if exists "Delegator reclaims own voice" on public.delegations;
create policy "Delegator reclaims own voice"
  on public.delegations for update
  to authenticated
  using (delegator_id = auth.uid())
  with check (delegator_id = auth.uid());

grant select, insert, update on public.delegations to authenticated;

create or replace function private.touch_delegations()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke execute on function private.touch_delegations() from public, anon, authenticated;

drop trigger if exists delegations_touch on public.delegations;
create trigger delegations_touch
  before update on public.delegations
  for each row execute function private.touch_delegations();

select public.gaia_sync('delegations');

update public.gaia_config
   set deity_group = 'themis-governance', is_active = true
 where table_name = 'delegations';

-- CHECK
select column_name, data_type, is_nullable, column_default
  from information_schema.columns
 where table_schema = 'public' and table_name = 'delegations'
 order by ordinal_position;

select policyname, cmd
  from pg_policies
 where schemaname = 'public' and tablename = 'delegations'
 order by policyname;

select indexname from pg_indexes
 where schemaname = 'public' and tablename = 'delegations'
 order by indexname;

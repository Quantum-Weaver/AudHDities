-- ============================================================================
-- 042 — THE ROLE CATALOG
-- ============================================================================
-- role_catalog holds one row per user_role: its label and its icon. Anyone
-- can read it; council and admin tend it. The icons carried on user_roles
-- move here. The table joins gaia's registry under hestia-core. Safe to run
-- again.
-- ============================================================================

create table if not exists public.role_catalog (
  role        public.user_role primary key,
  label       text not null,
  icon_emoji  text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.role_catalog enable row level security;

drop policy if exists "Anyone can view the role catalog" on public.role_catalog;
create policy "Anyone can view the role catalog"
  on public.role_catalog for select
  using (true);

drop policy if exists "Council can manage the role catalog" on public.role_catalog;
create policy "Council can manage the role catalog"
  on public.role_catalog for all
  to authenticated
  using (private.has_role(array['council'::public.user_role, 'admin'::public.user_role]))
  with check (private.has_role(array['council'::public.user_role, 'admin'::public.user_role]));

grant select on public.role_catalog to anon, authenticated;
grant insert, update, delete on public.role_catalog to authenticated;

insert into public.role_catalog (role, label, sort_order) values
  ('community', 'Community', 1),
  ('artisan',   'Artisan',   2),
  ('merchant',  'Merchant',  3),
  ('curator',   'Curator',   4),
  ('council',   'Council',   5),
  ('admin',     'Admin',     6)
on conflict (role) do nothing;

update public.role_catalog c
   set icon_emoji = r.icon_emoji
  from (select role, max(icon_emoji) as icon_emoji
          from public.user_roles
         where icon_emoji is not null
         group by role) r
 where r.role = c.role
   and c.icon_emoji is null;

select public.gaia_sync('role_catalog');

update public.gaia_config
   set deity_group = 'hestia-core', is_active = true
 where table_name = 'role_catalog';

-- CHECK
select role, label, icon_emoji, sort_order
  from public.role_catalog
 order by sort_order;

select table_name, deity_group, is_active
  from public.gaia_config
 where table_name = 'role_catalog';

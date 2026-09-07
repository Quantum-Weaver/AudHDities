-- ============================================================================
-- 044 — THE CATALOG TAKES AN ID
-- ============================================================================
-- role_catalog carries a uuid id as its primary key, the shape every table
-- in the base carries, and role stays unique. Safe to run again.
-- ============================================================================

alter table public.role_catalog
  add column if not exists id uuid not null default gen_random_uuid();

do $$
begin
  if exists (select 1 from pg_constraint
              where conrelid = 'public.role_catalog'::regclass
                and contype = 'p'
                and conkey <> array[(select attnum from pg_attribute
                                      where attrelid = 'public.role_catalog'::regclass
                                        and attname = 'id')]) then
    alter table public.role_catalog drop constraint role_catalog_pkey;
  end if;
  if not exists (select 1 from pg_constraint
                  where conrelid = 'public.role_catalog'::regclass and contype = 'p') then
    alter table public.role_catalog add primary key (id);
  end if;
  if not exists (select 1 from pg_constraint
                  where conrelid = 'public.role_catalog'::regclass
                    and conname = 'role_catalog_role_key') then
    alter table public.role_catalog add constraint role_catalog_role_key unique (role);
  end if;
end $$;

select public.gaia_sync('role_catalog');

-- CHECK
select conname, contype
  from pg_constraint
 where conrelid = 'public.role_catalog'::regclass
 order by contype, conname;

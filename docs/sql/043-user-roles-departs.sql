-- ============================================================================
-- 043 — USER_ROLES DEPARTS
-- ============================================================================
-- The roles live on community_profiles.roles and their icons in
-- role_catalog. user_roles is dropped with its policies, triggers, and
-- indexes. A GIN index on the roles column answers the questions the
-- table's partial indexes answered. gaia's registry archives the table.
-- Safe to run again.
-- ============================================================================

drop table if exists public.user_roles;

create index if not exists idx_community_profiles_roles
  on public.community_profiles using gin (roles);

select public.gaia_sync('user_roles');

-- CHECK
select count(*) as user_roles_tables
  from information_schema.tables
 where table_schema = 'public' and table_name = 'user_roles';

select indexname
  from pg_indexes
 where tablename = 'community_profiles' and indexname = 'idx_community_profiles_roles';

select table_name, is_active, archived_at
  from public.gaia_config
 where table_name = 'user_roles';

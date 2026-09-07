-- ============================================================================
-- 039 — ARTISANS AND MERCHANTS
-- ============================================================================
-- The roles are community, artisan, merchant, curator, council, admin. The
-- application types are artisan and merchant. Renaming an enum value carries
-- every row and every stored policy with it; the generated layer follows by
-- gaia's delivery. Safe to run again.
-- ============================================================================

do $$
begin
  if exists (select 1 from pg_enum e join pg_type t on t.oid = e.enumtypid
              where t.typname = 'user_role' and e.enumlabel = 'creator') then
    alter type public.user_role rename value 'creator' to 'artisan';
  end if;
  if exists (select 1 from pg_enum e join pg_type t on t.oid = e.enumtypid
              where t.typname = 'user_role' and e.enumlabel = 'vendor') then
    alter type public.user_role rename value 'vendor' to 'merchant';
  end if;
  if exists (select 1 from pg_enum e join pg_type t on t.oid = e.enumtypid
              where t.typname = 'application_type' and e.enumlabel = 'creator') then
    alter type public.application_type rename value 'creator' to 'artisan';
  end if;
  if exists (select 1 from pg_enum e join pg_type t on t.oid = e.enumtypid
              where t.typname = 'application_type' and e.enumlabel = 'vendor') then
    alter type public.application_type rename value 'vendor' to 'merchant';
  end if;
end $$;

-- CHECK
select t.typname, e.enumsortorder, e.enumlabel
  from pg_enum e
  join pg_type t on t.oid = e.enumtypid
 where t.typname in ('user_role', 'application_type')
 order by t.typname, e.enumsortorder;

-- ============================================================================
-- 040 — THE COLUMNS, AND THE ROLES ON THE PROFILE
-- ============================================================================
-- artisan_profiles.total_creations becomes total_wares and
-- merchant_profiles.vendor_name becomes merchant_name. community_profiles
-- gains roles, an array of user_role, community by default, filled from the
-- vessel's rows in user_roles. A trigger lets only an admin change a
-- vessel's roles when a signed-in session writes the row. Safe to run again.
-- ============================================================================

do $$
begin
  if exists (select 1 from information_schema.columns
              where table_schema = 'public' and table_name = 'artisan_profiles'
                and column_name = 'total_creations') then
    alter table public.artisan_profiles rename column total_creations to total_wares;
  end if;
  if exists (select 1 from information_schema.columns
              where table_schema = 'public' and table_name = 'merchant_profiles'
                and column_name = 'vendor_name') then
    alter table public.merchant_profiles rename column vendor_name to merchant_name;
  end if;
end $$;

alter table public.community_profiles
  add column if not exists roles public.user_role[] not null
  default array['community']::public.user_role[];

update public.community_profiles p
   set roles = (select array_agg(s.role order by s.role)
                  from (select r.role from public.user_roles r where r.user_id = p.created_by
                        union
                        select 'community'::public.user_role) s);

create or replace function public.guard_profile_roles()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if auth.uid() is null then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if new.roles is distinct from array['community']::public.user_role[]
       and not private.has_role(array['admin']::public.user_role[]) then
      raise exception 'roles are assigned by an admin';
    end if;
  elsif new.roles is distinct from old.roles
        and not private.has_role(array['admin']::public.user_role[]) then
    raise exception 'roles are assigned by an admin';
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_guard_profile_roles on public.community_profiles;
create trigger trg_guard_profile_roles
  before insert or update on public.community_profiles
  for each row execute function public.guard_profile_roles();

-- CHECK
select table_name, column_name, data_type, column_default
  from information_schema.columns
 where table_schema = 'public'
   and column_name in ('total_wares', 'merchant_name', 'total_creations', 'vendor_name', 'roles')
 order by 1, 2;

select p.display_name, p.roles
  from public.community_profiles p
 order by p.display_name;

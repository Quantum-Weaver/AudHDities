-- =====================================================================
-- 056 — THE GUARD KEEPS ITS DOOR. guard_profile_roles is a trigger
-- function and answers no RPC: execute is revoked from every public role.
-- The trigger on community_profiles fires as before.
-- Safe to run again.
-- =====================================================================

revoke execute on function public.guard_profile_roles()
  from public, anon, authenticated;

-- VERIFY. Expect an acl with no public grant, and the trigger enabled.
select p.proacl::text as acl
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname = 'guard_profile_roles';

select tgname, tgenabled
  from pg_trigger
 where tgname = 'trg_guard_profile_roles';

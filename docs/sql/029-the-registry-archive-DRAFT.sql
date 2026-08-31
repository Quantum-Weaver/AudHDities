-- =====================================================================
-- 029 — THE REGISTRY ARCHIVE: the extra gaia_config rows, stamped
-- DRAFT. Never run by a lamp. KP's ⚛ hand only, in the Supabase dashboard.
-- Drafted 2026-08-31 by Sextile (Fable) at KP's word: "now we need to
-- cleanup the extra gaia_config rows please" · "we have an archived at stamp"
-- Run AFTER 028 (so its 13 drops are already stamped with their rulings).
-- =====================================================================

-- STEP 0 — SEE the extras first (one read, no writes):
-- every live registry row whose table no longer exists in the schema.
select gc.table_name, gc.deity_group, gc.status, gc.last_seen_at
  from gaia_config gc
 where gc.archived_at is null
   and gc.table_name not in (
       select t.table_name
         from information_schema.tables t
        where t.table_schema = 'public'
          and t.table_type = 'BASE TABLE');

-- STEP 1 — the stamp, through the registry's own door (lose-nothing):
begin;
update gaia_config gc
   set is_active   = false,
       archived_at = now(),
       notes = coalesce(gc.notes || ' · ', '')
               || 'archived at the registry cleanup, KP ⚛ 2026-08-31 — table no longer in the schema'
 where gc.archived_at is null
   and gc.table_name not in (
       select t.table_name
         from information_schema.tables t
        where t.table_schema = 'public'
          and t.table_type = 'BASE TABLE');
commit;

-- STEP 2 — the proof read: live rows should now equal live tables.
select count(*) as live_registry_rows from gaia_config where archived_at is null;
select count(*) as live_tables
  from information_schema.tables
 where table_schema = 'public' and table_type = 'BASE TABLE';
-- The two numbers should agree (117 after 028's thirteen drops).

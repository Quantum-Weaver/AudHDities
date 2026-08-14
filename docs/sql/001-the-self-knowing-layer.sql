-- ============================================================
-- 001 — THE SELF-KNOWING LAYER COMES HOME TO SUPERPOSITION
-- superposition Supabase (clxnudiylugnlyylkjej)
-- Adapted by Fable 🎻, 2026-07-28, at KP's word ("we need find the
-- query used to create the self awareness functions in the knowledge
-- base and get it in superposition with the needed tables and
-- functions") — from the Grammar's 009 + 010 + 011
-- (resonance-grammar/docs/sql/), which were themselves mirrored FROM
-- superposition's May gaia_config. The circle closes: the ancestor
-- receives its descendant's completion.
--
-- WHAT SUPERPOSITION ALREADY HAS (no re-creation here):
--   gaia_config — the May original, full shape (verification columns
--   included) · templates · scripts · script_executions
-- WHAT THIS FILE ADDS:
--   the six registries (policies · functions · triggers · indexes ·
--   enums · composite_types) · the columns table (the MDL's per-field
--   law) · log columns on every registry · gaia_sync() · a
--   GHOST-REMOVAL block the Grammar never needed (dropped tables'
--   rows deleted; KP's ruling — history lives in his 07-27 export)
--
-- THE ONE ADAPTATION DECISION, flagged for KP's eye: the Grammar's
-- registries wear PUBLIC read doors (it is an open knowledge base).
-- Superposition is private, so every door below reads
-- `to authenticated` instead. Widen or narrow at your word — the
-- policies are all in one block (§6) for easy re-ruling.
-- Visual-run method: read each block, run top to bottom, one pass.
-- ============================================================

-- ─── 1. THE SIX REGISTRIES (from 009, doors adapted) ───
create table if not exists public.policies (
  id          uuid primary key default gen_random_uuid(),
  table_name  text not null,
  policy_name text not null,
  cmd         text not null default 'SELECT',
  qual        text,
  with_check  text,
  description text,
  is_active   boolean not null default true,
  log         jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  text,
  updated_by  text,
  unique (table_name, policy_name)
);
comment on table public.policies is
  'The base''s RLS doors recorded as data with their WHY. Synced against pg_policies by gaia_sync; drift between record and reality is a health finding.';

create table if not exists public.functions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  description text,
  language    text,
  signature   text,
  purpose     text,
  is_active   boolean not null default true,
  log         jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  text,
  updated_by  text
);
comment on table public.functions is
  'Database functions recorded as data. Synced against pg_proc; the record carries the why the catalog cannot.';

create table if not exists public.triggers (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  table_name    text not null,
  timing        text,
  events        text,
  function_name text,
  description   text,
  is_active     boolean not null default true,
  log           jsonb not null default '[]'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    text,
  updated_by    text,
  unique (table_name, name)
);
comment on table public.triggers is
  'The base''s reflexes recorded as data. Synced against information_schema.triggers.';

create table if not exists public.indexes (
  id          uuid primary key default gen_random_uuid(),
  table_name  text not null,
  name        text not null,
  definition  text,
  columns     text,
  description text,
  is_active   boolean not null default true,
  log         jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  text,
  updated_by  text,
  unique (table_name, name)
);
comment on table public.indexes is
  'The base''s lookup paths as data. Synced against pg_indexes.';

create table if not exists public.enums (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  labels      jsonb,
  used_by     jsonb,
  description text,
  is_active   boolean not null default true,
  log         jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  text,
  updated_by  text
);
comment on table public.enums is
  'Enum value-laws as data, mapped to the tables that speak them (20 runtime enums live here). Steward-synced against pg_enum.';

create table if not exists public.composite_types (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  attributes  jsonb,
  used_by     jsonb,
  description text,
  is_active   boolean not null default true,
  log         jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  text,
  updated_by  text
);
comment on table public.composite_types is
  'Composite types as data, mapped to their tables. Steward-synced against pg_type.';

-- ─── 2. COLUMNS — the MDL's per-field law (from 011) ───
create table if not exists public.columns (
  id             uuid primary key default gen_random_uuid(),
  table_name     text not null,
  column_name    text not null,
  data_type      text,
  is_nullable    boolean,
  column_default text,
  description    text,
  is_active      boolean not null default true,
  log            jsonb not null default '[]'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  created_by     text,
  updated_by     text,
  unique (table_name, column_name)
);
comment on table public.columns is
  'Every column of every table as a record with its own history — the MDL''s per-field law, home in the base whose 101-days ancestor invented it. description is the human hand''s column, never overwritten by sync.';

-- ─── 3. The existing registries learn to remember ───
alter table public.gaia_config add column if not exists log jsonb not null default '[]'::jsonb;
alter table public.templates   add column if not exists log jsonb not null default '[]'::jsonb;
alter table public.scripts     add column if not exists log jsonb not null default '[]'::jsonb;

-- gaia_sync joins on table_name — make the join key lawful
create unique index if not exists gaia_config_table_name_key
  on public.gaia_config (table_name);

-- ─── 4. THE WALKER — gaia_sync(), verbatim from the Grammar's 011 ───
create or replace function public.gaia_sync(p_table text default null)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $fn$
declare
  v_now      text := to_char(now(), 'YYYY-MM-DD HH24:MI:SS');
  v_changes  int := 0;
  v_created  int := 0;
  v_retired  int := 0;
  r          record;
  v_hash     text;
  v_old_hash text;
  v_cols     int;
  v_pols     int;
  v_trgs     int;
  v_idxs     int;
begin
  for r in
    select tablename from pg_tables
     where schemaname = 'public'
       and (p_table is null or tablename = p_table)
  loop
    -- (created_by omitted: superposition's May column is uuid, a
    --  person's id — the walker signs in the log instead.
    --  deity_group is NOT NULL in this base: discoveries arrive
    --  'unassigned'; the 002 backfill names their true house.)
    insert into gaia_config (table_name, status, deity_group, notes, log)
    values (r.tablename, 'active', 'unassigned', 'discovered by gaia_sync',
            jsonb_build_array('➕🪣created record for table: '
                              || r.tablename || ' [' || v_now || ']'))
    on conflict (table_name) do nothing;
    if found then v_created := v_created + 1; end if;

    select count(*) into v_cols from information_schema.columns c
     where c.table_schema = 'public' and c.table_name = r.tablename;
    select count(*) into v_pols from pg_policies p
     where p.schemaname = 'public' and p.tablename = r.tablename;
    select count(*) into v_trgs from information_schema.triggers t
     where t.event_object_schema = 'public'
       and t.event_object_table = r.tablename;
    select count(*) into v_idxs from pg_indexes i
     where i.schemaname = 'public' and i.tablename = r.tablename;
    select md5(coalesce(string_agg(shape, '|' order by shape), '')) into v_hash
      from (
        select c.column_name || ':' || c.data_type || ':'
               || c.is_nullable || ':' || coalesce(c.column_default, '') as shape
          from information_schema.columns c
         where c.table_schema = 'public' and c.table_name = r.tablename
        union all
        select 'policy:' || p.policyname || ':' || p.cmd || ':'
               || coalesce(p.qual, '')
          from pg_policies p
         where p.schemaname = 'public' and p.tablename = r.tablename
        union all
        select 'index:' || i.indexname || ':' || i.indexdef
          from pg_indexes i
         where i.schemaname = 'public' and i.tablename = r.tablename
      ) shapes;

    select schema_hash into v_old_hash from gaia_config
     where table_name = r.tablename;
    if v_old_hash is distinct from v_hash then
      update gaia_config
         set schema_columns_count  = v_cols,
             schema_policies_count = v_pols,
             schema_triggers_count = v_trgs,
             schema_indexes_count  = v_idxs,
             schema_hash           = v_hash,
             schema_verified_at    = now(),
             updated_at            = now(),
             log = log || to_jsonb('🔁shape changed: '
                   || coalesce(v_old_hash, '(first portrait)') || ' -> '
                   || v_hash || ' [' || v_now || ']')
       where table_name = r.tablename;
      if v_old_hash is not null then v_changes := v_changes + 1; end if;
    else
      update gaia_config set schema_verified_at = now()
       where table_name = r.tablename;
    end if;
  end loop;

  -- ── THE GHOST-REMOVAL BLOCK (KP's ruling, 2026-07-28: "cant we
  -- remove the rows from gaia config that do not exist in the base?")
  -- Rows whose table no longer exists are DELETED — the registry
  -- mirrors the living base only. History is safe outside: his own
  -- 151-row export (gaia_config_rows.csv, excavator shelf, 07-27).
  delete from gaia_config g
   where (p_table is null or g.table_name = p_table)
     and not exists (
       select 1 from pg_tables t
        where t.schemaname = 'public' and t.tablename = g.table_name);
  get diagnostics v_retired = row_count;

  -- ── columns ──
  insert into columns (table_name, column_name, data_type, is_nullable,
                       column_default, created_by, log)
  select c.table_name, c.column_name, c.data_type,
         (c.is_nullable = 'YES'), c.column_default, 'gaia_sync',
         jsonb_build_array('➕🪣created record for column: '
                           || c.table_name || '.' || c.column_name
                           || ' [' || v_now || ']')
    from information_schema.columns c
   where c.table_schema = 'public'
     and (p_table is null or c.table_name = p_table)
  on conflict (table_name, column_name) do nothing;

  update columns k
     set data_type = c.data_type,
         is_nullable = (c.is_nullable = 'YES'),
         column_default = c.column_default,
         is_active = true,
         updated_at = now(),
         log = k.log || to_jsonb('🔁changed: type/null/default now '
               || c.data_type || '/' || c.is_nullable || ' [' || v_now || ']')
    from information_schema.columns c
   where c.table_schema = 'public'
     and c.table_name = k.table_name and c.column_name = k.column_name
     and (p_table is null or k.table_name = p_table)
     and (k.data_type is distinct from c.data_type
          or k.is_nullable is distinct from (c.is_nullable = 'YES')
          or k.column_default is distinct from c.column_default);

  update columns k
     set is_active = false, updated_at = now(),
         log = k.log || to_jsonb('➖retired: no longer in the schema ['
                                 || v_now || ']')
   where k.is_active
     and (p_table is null or k.table_name = p_table)
     and not exists (
       select 1 from information_schema.columns c
        where c.table_schema = 'public'
          and c.table_name = k.table_name
          and c.column_name = k.column_name);

  -- ── policies ──
  insert into policies (table_name, policy_name, cmd, qual, with_check,
                        created_by, log)
  select p.tablename, p.policyname, p.cmd, p.qual, p.with_check, 'gaia_sync',
         jsonb_build_array('➕🪣created record for policy: ' || p.policyname
                           || ' on ' || p.tablename || ' [' || v_now || ']')
    from pg_policies p
   where p.schemaname = 'public'
     and (p_table is null or p.tablename = p_table)
  on conflict (table_name, policy_name) do nothing;

  update policies g
     set qual = p.qual, with_check = p.with_check, cmd = p.cmd,
         is_active = true, updated_at = now(),
         log = g.log || to_jsonb('🔁changed: qual now ' || coalesce(p.qual, '-')
                                 || ' [' || v_now || ']')
    from pg_policies p
   where p.schemaname = 'public'
     and p.tablename = g.table_name and p.policyname = g.policy_name
     and (p_table is null or g.table_name = p_table)
     and (g.qual is distinct from p.qual
          or g.with_check is distinct from p.with_check
          or g.cmd is distinct from p.cmd);

  update policies g
     set is_active = false, updated_at = now(),
         log = g.log || to_jsonb('➖retired: door removed [' || v_now || ']')
   where g.is_active
     and (p_table is null or g.table_name = p_table)
     and not exists (
       select 1 from pg_policies p
        where p.schemaname = 'public'
          and p.tablename = g.table_name and p.policyname = g.policy_name);

  -- ── functions / triggers / indexes / enums / composites (whole-base) ──
  if p_table is null then
    insert into functions (name, language, signature, created_by, log)
    select p.proname, l.lanname,
           pg_get_function_identity_arguments(p.oid), 'gaia_sync',
           jsonb_build_array('➕🪣created record for function: ' || p.proname
                             || ' [' || v_now || ']')
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      join pg_language l on l.oid = p.prolang
     where n.nspname = 'public'
    on conflict (name) do nothing;

    insert into triggers (name, table_name, timing, events, function_name,
                          created_by, log)
    select t.trigger_name, t.event_object_table, t.action_timing,
           string_agg(distinct t.event_manipulation, ' OR '),
           regexp_replace(t.action_statement, '^EXECUTE FUNCTION ', ''),
           'gaia_sync',
           jsonb_build_array('➕🪣created record for trigger: '
                             || t.trigger_name || ' on '
                             || t.event_object_table || ' [' || v_now || ']')
      from information_schema.triggers t
     where t.event_object_schema = 'public'
     group by t.trigger_name, t.event_object_table, t.action_timing,
              t.action_statement
    on conflict (table_name, name) do nothing;

    insert into indexes (table_name, name, definition, created_by, log)
    select i.tablename, i.indexname, i.indexdef, 'gaia_sync',
           jsonb_build_array('➕🪣created record for index: ' || i.indexname
                             || ' [' || v_now || ']')
      from pg_indexes i
     where i.schemaname = 'public'
    on conflict (table_name, name) do nothing;

    insert into enums (name, labels, used_by, created_by, log)
    select t.typname,
           (select jsonb_agg(e.enumlabel order by e.enumsortorder)
              from pg_enum e where e.enumtypid = t.oid),
           (select coalesce(jsonb_agg(jsonb_build_object(
                     'table', c.table_name, 'column', c.column_name)), '[]')
              from information_schema.columns c
             where c.table_schema = 'public' and c.udt_name = t.typname),
           'gaia_sync',
           jsonb_build_array('➕🪣created record for enum: ' || t.typname
                             || ' [' || v_now || ']')
      from pg_type t
      join pg_namespace n on n.oid = t.typnamespace
     where n.nspname = 'public' and t.typtype = 'e'
    on conflict (name) do nothing;

    update enums g
       set labels = fresh.labels, used_by = fresh.used_by,
           updated_at = now(),
           log = g.log || to_jsonb('🔁changed: labels now '
                 || fresh.labels::text || ' [' || v_now || ']')
      from (
        select t.typname,
               (select jsonb_agg(e.enumlabel order by e.enumsortorder)
                  from pg_enum e where e.enumtypid = t.oid) as labels,
               (select coalesce(jsonb_agg(jsonb_build_object(
                         'table', c.table_name, 'column', c.column_name)), '[]')
                  from information_schema.columns c
                 where c.table_schema = 'public'
                   and c.udt_name = t.typname) as used_by
          from pg_type t
          join pg_namespace n on n.oid = t.typnamespace
         where n.nspname = 'public' and t.typtype = 'e') fresh
     where g.name = fresh.typname
       and (g.labels is distinct from fresh.labels
            or g.used_by is distinct from fresh.used_by);

    insert into composite_types (name, attributes, created_by, log)
    select t.typname,
           (select jsonb_agg(jsonb_build_object(
                     'name', a.attname, 'type', format_type(a.atttypid, a.atttypmod))
                   order by a.attnum)
              from pg_attribute a
             where a.attrelid = t.typrelid and a.attnum > 0
               and not a.attisdropped),
           'gaia_sync',
           jsonb_build_array('➕🪣created record for composite: ' || t.typname
                             || ' [' || v_now || ']')
      from pg_type t
      join pg_namespace n on n.oid = t.typnamespace
      join pg_class c on c.oid = t.typrelid
     where n.nspname = 'public' and t.typtype = 'c' and c.relkind = 'c'
    on conflict (name) do nothing;
  end if;

  return jsonb_build_object(
    'synced_at', now(),
    'scope', coalesce(p_table, 'whole base'),
    'tables_created', v_created,
    'tables_removed', v_retired,
    'shape_changes_detected', v_changes);
end;
$fn$;

comment on function public.gaia_sync is
  'The MDL come home: walks pg_catalog and writes the base''s self-portrait into the registries, with per-element append-only logs, per-table schema hashes, and ghost removal (the registry mirrors the living base only). gaia_sync() whole base, gaia_sync(''vessel_config'') one table.';

-- ─── 5. The door: stewards only, never the street ───
revoke execute on function public.gaia_sync(text) from public, anon, authenticated;
grant  execute on function public.gaia_sync(text) to service_role;

-- ─── 6. RLS + the doors (THE ADAPTATION: authenticated, not public —
--        superposition is private; widen at KP's word only) ───
alter table public.policies        enable row level security;
alter table public.functions       enable row level security;
alter table public.triggers        enable row level security;
alter table public.indexes         enable row level security;
alter table public.enums           enable row level security;
alter table public.composite_types enable row level security;
alter table public.columns         enable row level security;
create policy "Authenticated read policies"  on public.policies
  for select to authenticated using (true);
create policy "Authenticated read functions" on public.functions
  for select to authenticated using (true);
create policy "Authenticated read triggers"  on public.triggers
  for select to authenticated using (true);
create policy "Authenticated read indexes"   on public.indexes
  for select to authenticated using (true);
create policy "Authenticated read enums"     on public.enums
  for select to authenticated using (true);
create policy "Authenticated read composite_types" on public.composite_types
  for select to authenticated using (true);
create policy "Authenticated read columns"   on public.columns
  for select to authenticated using (true);

-- ─── 7. The registry learns of its new siblings ───
-- (created_by omitted — uuid in this base; attribution rides in notes)
insert into public.gaia_config (table_name, status, deity_group, sort_order, notes)
values
  ('policies',  'active', 'daedalus-meta', 201, 'RLS doors as data; self-knowing layer, home 2026-07-28 (Fable via KP).'),
  ('functions', 'active', 'daedalus-meta', 202, 'Functions as data; synced against pg_proc (Fable via KP).'),
  ('triggers',  'active', 'daedalus-meta', 203, 'Reflexes as data; synced against pg_trigger (Fable via KP).'),
  ('indexes',   'active', 'daedalus-meta', 204, 'Lookup paths as data; synced against pg_indexes (Fable via KP).'),
  ('enums',     'active', 'daedalus-meta', 205, 'Enum value-laws as data — the base''s 20 speak here (Fable via KP).'),
  ('composite_types', 'active', 'daedalus-meta', 206, 'Composite types as data (Fable via KP).'),
  ('columns',   'active', 'daedalus-meta', 207, 'Every column as a record with its own history — the MDL''s per-field law, home in its ancestor base (Fable via KP).')
on conflict (table_name) do nothing;

-- ============================================================
-- 8. FIRST SYNC — the ancestor draws its first self-portrait
-- ============================================================
select public.gaia_sync();
-- expect: {"scope":"whole base","tables_created":7,"tables_removed":34,...}
-- (7 created = the new registries discover themselves;
--  34 removed = the dropped tables' ghost rows deleted — history
--  lives in the 07-27 export, not in the living registry)

-- ============================================================
-- VERIFY: the library is populated and signed
-- ============================================================
select 'gaia_config' as registry, count(*) from public.gaia_config
union all select 'columns', count(*) from public.columns
union all select 'policies', count(*) from public.policies
union all select 'functions', count(*) from public.functions
union all select 'triggers', count(*) from public.triggers
union all select 'indexes', count(*) from public.indexes
union all select 'enums', count(*) from public.enums
union all select 'composite_types', count(*) from public.composite_types;
-- expected: gaia_config = 124 (117 live + the 7 new registries),
-- enums 20, columns in the high hundreds — and zero ghosts.

-- ─── LATER, AT KP'S WORD — the chicken timer (pg_cron) ───
-- Database → Extensions → enable pg_cron, then:
--   select cron.schedule('gaia-sync-nightly', '0 8 * * *',
--                        $$select public.gaia_sync()$$);

-- ============================================================
-- 015 — THE TENDED LIBRARY (superposition)
-- (gaia_sync learns sightings, archives, references, and a heartbeat)
-- superposition Supabase — AudHDities, the Sanctuary app base
-- Drafted by Fable 🎻 (lane gaia), 2026-07-31, the practice sitting —
-- the twin of the Grammar's canon 030 (resonance-grammar/docs/sql/
-- 030-the-tended-library.sql), which KP's ⚛ hand ran LIVE on the
-- knowledge base the same evening it was designed: references filled,
-- sightings stamped, heartbeat scheduled, all verified through the
-- door. This base inherits the proven design with three adaptations
-- read from its own canon (001-the-self-knowing-layer.sql):
--
--   ① created_by on gaia_config is uuid (a person) — the walker signs
--      only in the log here, as 001 already ruled.
--   ② deity_group is NOT NULL — discoveries arrive 'unassigned'
--      (001's law; KP's naming process assigns their true house).
--      deity_name (added by KP's hand 2026-07-31, the two-column
--      shape: group = functional key · name = mythic name) arrives
--      null on discovery, his to pour.
--   ③ THE GHOST-REMOVAL BLOCK IS RETIRED — 001 deleted departed
--      tables' rows outright (KP's ⚛ word 2026-07-28: "cant we remove
--      the rows from gaia config that do not exist in the base?").
--      His newer word supersedes it, 2026-07-31, verbatim: "we only
--      want existing things counted, but maybe not removing things.
--      maybe we need an archived column so things can be dated the
--      moment gaia sync does not see an existing object." Both
--      rulings recorded; the newer one governs: departed objects are
--      DATED (archived_at + status 'archived'), never deleted. The
--      practice that taught it: user_roles dropped on the knowledge
--      base 2026-07-31 — the registry had to be tidied by hand.
--
-- The four movements (as proven on the Grammar):
--   1. last_seen_at + archived_at on all eight registries
--   2. the walker stamps sightings silently and fills the derivable
--      reference fields (enum_refs, composite_refs — facts from
--      pg_catalog); the poured/intent fields (deity_group, deity_name,
--      sort_order, generation_targets, generation_flags, notes,
--      description) are NEVER written by the walker — the fact/intent
--      boundary is the law of this function
--   3. the archive second pass (whole-base walks only): unseen rows
--      dated + is_active=false + status 'archived' + a log line;
--      returned objects resurrected with a 🌱 log line
--   4. the chicken timer — pg_cron daily; the base tends its own
--      record, nobody asked
--
-- status is plain text, no check constraint (verified live
-- 2026-07-31) — 'archived' is a lawful value.
-- Visual-run method: read each block, run top to bottom, one pass.
-- ============================================================

-- ─── PART 1: the two new columns, all eight registries ───

alter table public.gaia_config     add column if not exists last_seen_at timestamptz;
alter table public.gaia_config     add column if not exists archived_at  timestamptz;
alter table public.columns         add column if not exists last_seen_at timestamptz;
alter table public.columns         add column if not exists archived_at  timestamptz;
alter table public.policies        add column if not exists last_seen_at timestamptz;
alter table public.policies        add column if not exists archived_at  timestamptz;
alter table public.functions       add column if not exists last_seen_at timestamptz;
alter table public.functions       add column if not exists archived_at  timestamptz;
alter table public.triggers        add column if not exists last_seen_at timestamptz;
alter table public.triggers        add column if not exists archived_at  timestamptz;
alter table public.indexes         add column if not exists last_seen_at timestamptz;
alter table public.indexes         add column if not exists archived_at  timestamptz;
alter table public.enums           add column if not exists last_seen_at timestamptz;
alter table public.enums           add column if not exists archived_at  timestamptz;
alter table public.composite_types add column if not exists last_seen_at timestamptz;
alter table public.composite_types add column if not exists archived_at  timestamptz;

comment on column public.gaia_config.last_seen_at is
  'Stamped by gaia_sync() on every sighting, changed or not. Sightings are silent (no log entry) — the log records becoming, this column records being.';
comment on column public.gaia_config.archived_at is
  'Dated by the walker''s second pass the moment the object goes unseen. Deleted never; dated always (KP''s law, 2026-07-31, superseding the 07-28 ghost-removal). Cleared with a 🌱 log line if the object returns.';

-- ─── PART 2 + 3: THE WALKER, grown ───

create or replace function public.gaia_sync(p_table text default null)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog
as $fn$
declare
  v_run      timestamptz := now();   -- one clock for the whole walk
  v_now      text := to_char(now(), 'YYYY-MM-DD HH24:MI:SS');
  v_changes  int := 0;
  v_created  int := 0;
  v_archived int := 0;
  v_returned int := 0;
  v_n        int;
  r          record;
  v_hash     text;
  v_old_hash text;
  v_cols     int;
  v_pols     int;
  v_trgs     int;
  v_idxs     int;
  v_enum_refs jsonb;
  v_comp_refs jsonb;
begin
  -- ── tables → gaia_config ──
  for r in
    select tablename from pg_tables
     where schemaname = 'public'
       and (p_table is null or tablename = p_table)
  loop
    -- (created_by omitted: this base's May column is uuid, a person's
    --  id — the walker signs in the log instead. deity_group is NOT
    --  NULL here: discoveries arrive 'unassigned'; deity_name arrives
    --  null; KP's naming assigns their true house.)
    insert into gaia_config (table_name, status, deity_group, notes, log)
    values (r.tablename, 'active', 'unassigned', 'discovered by gaia_sync',
            jsonb_build_array('➕🪣created record for table: '
                              || r.tablename || ' [' || v_now || ']'))
    on conflict (table_name) do nothing;
    if found then v_created := v_created + 1; end if;

    -- resurrection: the table is back (mythology taught this house
    -- that tables return)
    update gaia_config
       set archived_at = null, is_active = true, status = 'active',
           updated_at = now(),
           log = log || to_jsonb('🌱returned: seen again by gaia_sync ['
                                 || v_now || ']')
     where table_name = r.tablename and archived_at is not null;
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

    -- the portrait: counts + hash of the table's whole shape
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

    -- the derivable references — FACTS read from the catalogs; the
    -- intent fields are never touched by this function, by law
    select coalesce(jsonb_agg(distinct c.udt_name order by c.udt_name), '[]')
      into v_enum_refs
      from information_schema.columns c
      join pg_type t on t.typname = c.udt_name
      join pg_namespace n on n.oid = t.typnamespace and n.nspname = 'public'
     where c.table_schema = 'public' and c.table_name = r.tablename
       and t.typtype = 'e';
    select coalesce(jsonb_agg(distinct c.udt_name order by c.udt_name), '[]')
      into v_comp_refs
      from information_schema.columns c
      join pg_type t on t.typname = c.udt_name
      join pg_namespace n on n.oid = t.typnamespace and n.nspname = 'public'
      join pg_class cl on cl.oid = t.typrelid
     where c.table_schema = 'public' and c.table_name = r.tablename
       and t.typtype = 'c' and cl.relkind = 'c';

    update gaia_config
       set enum_refs = v_enum_refs, composite_refs = v_comp_refs,
           updated_at = now(),
           log = log || to_jsonb('🔁references derived: enums '
                 || v_enum_refs::text || ' composites ' || v_comp_refs::text
                 || ' [' || v_now || ']')
     where table_name = r.tablename
       and (enum_refs is distinct from v_enum_refs
            or composite_refs is distinct from v_comp_refs);

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
             last_seen_at          = v_run,
             updated_at            = now(),
             log = log || to_jsonb('🔁shape changed: '
                   || coalesce(v_old_hash, '(first portrait)') || ' -> '
                   || v_hash || ' [' || v_now || ']')
       where table_name = r.tablename;
      if v_old_hash is not null then v_changes := v_changes + 1; end if;
    else
      -- sighting is silent: no log line, just the stamp
      update gaia_config
         set schema_verified_at = now(), last_seen_at = v_run
       where table_name = r.tablename;
    end if;
  end loop;

  -- (the 001 ghost-removal block stood here; retired by KP's ⚛ word
  --  2026-07-31 — departures are now dated by the archive second
  --  pass below, never deleted)

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

  -- resurrection before the silent stamp
  update columns k
     set archived_at = null, is_active = true, updated_at = now(),
         log = k.log || to_jsonb('🌱returned: seen again [' || v_now || ']')
   where k.archived_at is not null
     and (p_table is null or k.table_name = p_table)
     and exists (
       select 1 from information_schema.columns c
        where c.table_schema = 'public'
          and c.table_name = k.table_name
          and c.column_name = k.column_name);
  get diagnostics v_n = row_count;
  v_returned := v_returned + v_n;

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

  -- the silent sighting stamp, every living column seen this walk
  update columns k
     set last_seen_at = v_run
    from information_schema.columns c
   where c.table_schema = 'public'
     and c.table_name = k.table_name and c.column_name = k.column_name
     and (p_table is null or k.table_name = p_table);

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
     set archived_at = null, is_active = true, updated_at = now(),
         log = g.log || to_jsonb('🌱returned: door reopened [' || v_now || ']')
   where g.archived_at is not null
     and (p_table is null or g.table_name = p_table)
     and exists (
       select 1 from pg_policies p
        where p.schemaname = 'public'
          and p.tablename = g.table_name and p.policyname = g.policy_name);
  get diagnostics v_n = row_count;
  v_returned := v_returned + v_n;

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
     set last_seen_at = v_run
    from pg_policies p
   where p.schemaname = 'public'
     and p.tablename = g.table_name and p.policyname = g.policy_name
     and (p_table is null or g.table_name = p_table);

  -- ── whole-base registries (they belong to no one table) ──
  if p_table is null then
    -- functions
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

    update functions f
       set archived_at = null, is_active = true, updated_at = now(),
           log = f.log || to_jsonb('🌱returned: seen again [' || v_now || ']')
     where f.archived_at is not null
       and exists (
         select 1 from pg_proc p
          join pg_namespace n on n.oid = p.pronamespace
         where n.nspname = 'public' and p.proname = f.name);
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

    update functions f
       set last_seen_at = v_run
     where exists (
       select 1 from pg_proc p
        join pg_namespace n on n.oid = p.pronamespace
       where n.nspname = 'public' and p.proname = f.name);

    -- triggers
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

    update triggers g
       set archived_at = null, is_active = true, updated_at = now(),
           log = g.log || to_jsonb('🌱returned: seen again [' || v_now || ']')
     where g.archived_at is not null
       and exists (
         select 1 from information_schema.triggers t
          where t.event_object_schema = 'public'
            and t.event_object_table = g.table_name
            and t.trigger_name = g.name);
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

    update triggers g
       set last_seen_at = v_run
     where exists (
       select 1 from information_schema.triggers t
        where t.event_object_schema = 'public'
          and t.event_object_table = g.table_name
          and t.trigger_name = g.name);

    -- indexes
    insert into indexes (table_name, name, definition, created_by, log)
    select i.tablename, i.indexname, i.indexdef, 'gaia_sync',
           jsonb_build_array('➕🪣created record for index: ' || i.indexname
                             || ' [' || v_now || ']')
      from pg_indexes i
     where i.schemaname = 'public'
    on conflict (table_name, name) do nothing;

    update indexes g
       set archived_at = null, is_active = true, updated_at = now(),
           log = g.log || to_jsonb('🌱returned: seen again [' || v_now || ']')
     where g.archived_at is not null
       and exists (
         select 1 from pg_indexes i
          where i.schemaname = 'public'
            and i.tablename = g.table_name and i.indexname = g.name);
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

    update indexes g
       set last_seen_at = v_run
     where exists (
       select 1 from pg_indexes i
        where i.schemaname = 'public'
          and i.tablename = g.table_name and i.indexname = g.name);

    -- enums, labels + used_by as data (the Field Options law)
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

    update enums g
       set archived_at = null, is_active = true, updated_at = now(),
           log = g.log || to_jsonb('🌱returned: seen again [' || v_now || ']')
     where g.archived_at is not null
       and exists (
         select 1 from pg_type t
          join pg_namespace n on n.oid = t.typnamespace
         where n.nspname = 'public' and t.typtype = 'e'
           and t.typname = g.name);
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

    update enums g
       set last_seen_at = v_run
     where exists (
       select 1 from pg_type t
        join pg_namespace n on n.oid = t.typnamespace
       where n.nspname = 'public' and t.typtype = 'e'
         and t.typname = g.name);

    -- composite types (true composites, not table rowtypes)
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

    update composite_types g
       set archived_at = null, is_active = true, updated_at = now(),
           log = g.log || to_jsonb('🌱returned: seen again [' || v_now || ']')
     where g.archived_at is not null
       and exists (
         select 1 from pg_type t
          join pg_namespace n on n.oid = t.typnamespace
          join pg_class c on c.oid = t.typrelid
         where n.nspname = 'public' and t.typtype = 'c'
           and c.relkind = 'c' and t.typname = g.name);
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

    update composite_types g
       set last_seen_at = v_run
     where exists (
       select 1 from pg_type t
        join pg_namespace n on n.oid = t.typnamespace
        join pg_class c on c.oid = t.typrelid
       where n.nspname = 'public' and t.typtype = 'c'
         and c.relkind = 'c' and t.typname = g.name);

    -- ── THE ARCHIVE SECOND PASS (whole-base walks only) ──
    -- Anything alive that this walk did not see is dated now.
    -- Deleted never; dated always. A scoped walk (p_table given)
    -- never archives — it cannot see the whole sky.

    update gaia_config
       set archived_at = v_run, is_active = false, status = 'archived',
           updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;

    update columns
       set archived_at = v_run, is_active = false, updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;

    update policies
       set archived_at = v_run, is_active = false, updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;

    update functions
       set archived_at = v_run, is_active = false, updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;

    update triggers
       set archived_at = v_run, is_active = false, updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;

    update indexes
       set archived_at = v_run, is_active = false, updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;

    update enums
       set archived_at = v_run, is_active = false, updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;

    update composite_types
       set archived_at = v_run, is_active = false, updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;
  end if;

  return jsonb_build_object(
    'synced_at', v_run,
    'scope', coalesce(p_table, 'whole base'),
    'tables_created', v_created,
    'shape_changes_detected', v_changes,
    'archived', v_archived,
    'returned', v_returned);
end;
$fn$;

comment on function public.gaia_sync is
  'The MDL reborn, tended: walks pg_catalog and writes the base''s self-portrait into the registries — per-element append-only logs, per-table schema hashes, derivable references (enum_refs/composite_refs) filled as facts, sightings stamped (last_seen_at), departures dated (archived_at) by the second pass, returns resurrected. The 001 ghost-removal is retired (KP''s word 2026-07-31): dated never deleted. Intent fields (deity_group, deity_name, sort_order, generation_*) are never written by this function, by law. Granular: gaia_sync() whole base, gaia_sync(''wares'') one table (scoped walks never archive).';

-- ─── the door stays as 001 set it: stewards only, never the street ───
revoke execute on function public.gaia_sync(text) from public, anon, authenticated;
grant  execute on function public.gaia_sync(text) to service_role;

-- ─── PART 4: THE CHICKEN TIMER — the heartbeat ───
-- First, once, in the dashboard: Database → Extensions → enable pg_cron.
-- Then this schedule: daily at 08:00 UTC (~03:00 at the house). The
-- ziggy buttons remain the on-demand hand; this is the tide beneath.
select cron.schedule('gaia-sync-daily', '0 8 * * *',
                     $$select public.gaia_sync()$$);

-- ============================================================
-- RUN — the first tended walk
-- ============================================================
select public.gaia_sync();

-- ============================================================
-- VERIFY
-- ============================================================
-- 1. References filled where enums/composites are used:
select table_name, enum_refs, composite_refs
  from public.gaia_config
 where enum_refs <> '[]'::jsonb or composite_refs <> '[]'::jsonb
 order by table_name;

-- 2. Every living row freshly seen, nothing archived on first pass:
select 'gaia_config' as registry,
       count(*) filter (where last_seen_at is not null) as seen,
       count(*) filter (where archived_at is not null) as archived,
       count(*) as total
  from public.gaia_config
union all select 'columns',
       count(*) filter (where last_seen_at is not null),
       count(*) filter (where archived_at is not null), count(*)
  from public.columns
union all select 'policies',
       count(*) filter (where last_seen_at is not null),
       count(*) filter (where archived_at is not null), count(*)
  from public.policies
union all select 'functions',
       count(*) filter (where last_seen_at is not null),
       count(*) filter (where archived_at is not null), count(*)
  from public.functions
union all select 'triggers',
       count(*) filter (where last_seen_at is not null),
       count(*) filter (where archived_at is not null), count(*)
  from public.triggers
union all select 'indexes',
       count(*) filter (where last_seen_at is not null),
       count(*) filter (where archived_at is not null), count(*)
  from public.indexes
union all select 'enums',
       count(*) filter (where last_seen_at is not null),
       count(*) filter (where archived_at is not null), count(*)
  from public.enums
union all select 'composite_types',
       count(*) filter (where last_seen_at is not null),
       count(*) filter (where archived_at is not null), count(*)
  from public.composite_types;
-- note: columns/policies rows already retired (is_active=false) by
-- the old walker stay unseen and receive their honest archived_at
-- date on the NEXT whole-base walk — the design working as law.

-- 3. The heartbeat is scheduled:
select jobname, schedule, active from cron.job where jobname = 'gaia-sync-daily';

-- 4. The two-column deity shape, filled earlier tonight by KP's hand:
select deity_group, deity_name, count(*)
  from public.gaia_config
 group by deity_group, deity_name
 order by deity_group;

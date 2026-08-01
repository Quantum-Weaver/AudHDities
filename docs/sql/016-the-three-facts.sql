-- ============================================================
-- 016 — THE THREE FACTS (superposition)
-- (relationships · views · function returns — the walker's last
--  lessons before the exact replica)
-- superposition Supabase — AudHDities, the Sanctuary app base
-- Drafted by Fable 🎻 (lane gaia), 2026-07-31, the gaia-patterns
-- sitting — the twin of the Grammar's canon 031, carrying the same
-- three lessons with this base's own dialect honored (as 015 did for
-- 030): the walker's gaia_config insert omits created_by (uuid here,
-- a person's id — signs in the log) and discoveries arrive
-- deity_group 'unassigned'. This is the base whose typegen file
-- carries 127 Relationships blocks — the fact this canon finally
-- teaches the base to know about itself.
-- Known limitation carried forward honestly from 001: the functions
-- registry is unique on NAME — overloaded functions collapse to one
-- row. Stands until it bites.
-- Ritual honored on both new tables (RLS + public read).
-- Visual-run method: read each block, run top to bottom, one pass.
-- ============================================================

-- ─── PART 1a: the relationships registry — the FK graph as records ───

create table if not exists public.relationships (
  id              uuid primary key default gen_random_uuid(),
  constraint_name text not null,
  table_name      text not null,
  columns         jsonb not null default '[]'::jsonb,
  foreign_table   text not null,
  foreign_columns jsonb not null default '[]'::jsonb,
  on_delete       text,
  on_update       text,
  one_to_one      boolean not null default false,
  description     text,          -- the WHY; hand-written, never synced away
  is_active       boolean not null default true,
  last_seen_at    timestamptz,
  archived_at     timestamptz,
  log             jsonb not null default '[]'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  created_by      text,
  unique (table_name, constraint_name)
);
comment on table public.relationships is
  'The foreign-key graph as records with their own history — synced by gaia_sync(). one_to_one mirrors the typegen''s isOneToOne (a unique index covers exactly the FK columns). description is the human hand''s column.';

alter table public.relationships enable row level security;
create policy "Public read relationships"
  on public.relationships for select using (true);

-- ─── PART 1b: the views registry ───

create table if not exists public.views (
  id           uuid primary key default gen_random_uuid(),
  name         text not null unique,
  definition   text,
  description  text,             -- the WHY; hand-written, never synced away
  is_active    boolean not null default true,
  last_seen_at timestamptz,
  archived_at  timestamptz,
  log          jsonb not null default '[]'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  created_by   text
);
comment on table public.views is
  'Every public view as a record with its own history — synced by gaia_sync(). A view''s COLUMNS already live in the columns registry (information_schema.columns includes views); this registry holds the view itself and its definition.';

alter table public.views enable row level security;
create policy "Public read views"
  on public.views for select using (true);

-- ─── PART 1c: functions learn their returns ───

alter table public.functions add column if not exists returns text;
comment on column public.functions.returns is
  'pg_get_function_result — the third fact (2026-07-31). The typegen''s Returns: reads from here.';

-- ─── PART 1d: the registry learns of its new siblings (daedalus''s
--             house, the registries group, sorts 11–12) ───

insert into public.gaia_config
  (table_name, status, deity_group, deity_name, notes)
values
  ('relationships', 'active', 'daedalus-meta', 'daedalus',
   'The FK graph as records — born with 016, the three facts'),
  ('views', 'active', 'daedalus-meta', 'daedalus',
   'Views as records — born with 016, the three facts')
on conflict (table_name) do update
  set deity_group = excluded.deity_group,
      deity_name  = excluded.deity_name,
      notes       = excluded.notes;

-- ─── PART 2: THE WALKER learns the three facts ───
-- (full body: 030's tended walker + the new lessons, marked ⑴⑵⑶)

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
    -- (created_by omitted: uuid here, a person's id — the walker
    --  signs in the log. deity_group NOT NULL: discoveries arrive
    --  'unassigned'; deity_name null, KP's to pour.)
    insert into gaia_config (table_name, status, deity_group, notes, log)
    values (r.tablename, 'active', 'unassigned', 'discovered by gaia_sync',
            jsonb_build_array('➕🪣created record for table: '
                              || r.tablename || ' [' || v_now || ']'))
    on conflict (table_name) do nothing;
    if found then v_created := v_created + 1; end if;

    update gaia_config
       set archived_at = null, is_active = true, status = 'active',
           updated_at = now(),
           log = log || to_jsonb('🌱returned: seen again by gaia_sync ['
                                 || v_now || ']')
     where table_name = r.tablename and archived_at is not null;
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

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
      update gaia_config
         set schema_verified_at = now(), last_seen_at = v_run
       where table_name = r.tablename;
    end if;
  end loop;

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
    -- functions — now with returns, the third fact ⑶
    insert into functions (name, language, signature, returns, created_by, log)
    select p.proname, l.lanname,
           pg_get_function_identity_arguments(p.oid),
           pg_get_function_result(p.oid), 'gaia_sync',
           jsonb_build_array('➕🪣created record for function: ' || p.proname
                             || ' [' || v_now || ']')
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      join pg_language l on l.oid = p.prolang
     where n.nspname = 'public'
    on conflict (name) do nothing;

    -- ⑶ change-detection for functions (signature/returns were
    -- insert-only before this canon; drift went unseen)
    update functions f
       set signature = fr.sig, returns = fr.rt, language = fr.lang,
           is_active = true, updated_at = now(),
           log = f.log || to_jsonb('🔁changed: signature/returns now ('
                 || coalesce(fr.sig, '') || ') -> '
                 || coalesce(fr.rt, '?') || ' [' || v_now || ']')
      from (
        select p.proname,
               pg_get_function_identity_arguments(p.oid) as sig,
               pg_get_function_result(p.oid) as rt,
               l.lanname as lang
          from pg_proc p
          join pg_namespace n on n.oid = p.pronamespace
          join pg_language l on l.oid = p.prolang
         where n.nspname = 'public') fr
     where f.name = fr.proname
       and (f.signature is distinct from fr.sig
            or f.returns is distinct from fr.rt
            or f.language is distinct from fr.lang);

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

    -- ⑴ RELATIONSHIPS — the FK graph (whole-base only: the graph is
    --    cross-table by nature; scoped walks skip it)
    insert into relationships (constraint_name, table_name, columns,
                               foreign_table, foreign_columns,
                               on_delete, on_update, one_to_one,
                               created_by, log)
    select f.conname, f.tname, f.cols, f.ftable, f.fcols,
           f.on_del, f.on_upd, f.one2one, 'gaia_sync',
           jsonb_build_array('➕🪣created record for relationship: '
                             || f.conname || ' [' || v_now || ']')
      from (
        select con.conname,
               rel.relname as tname,
               (select jsonb_agg(a.attname order by k.ord)
                  from unnest(con.conkey) with ordinality k(attnum, ord)
                  join pg_attribute a
                    on a.attrelid = con.conrelid and a.attnum = k.attnum) as cols,
               frel.relname as ftable,
               (select jsonb_agg(a.attname order by k.ord)
                  from unnest(con.confkey) with ordinality k(attnum, ord)
                  join pg_attribute a
                    on a.attrelid = con.confrelid and a.attnum = k.attnum) as fcols,
               case con.confdeltype
                 when 'a' then 'no action' when 'r' then 'restrict'
                 when 'c' then 'cascade'   when 'n' then 'set null'
                 when 'd' then 'set default' end as on_del,
               case con.confupdtype
                 when 'a' then 'no action' when 'r' then 'restrict'
                 when 'c' then 'cascade'   when 'n' then 'set null'
                 when 'd' then 'set default' end as on_upd,
               exists (select 1 from pg_index i
                        where i.indrelid = con.conrelid and i.indisunique
                          and (select array_agg(k2 order by k2)
                                 from unnest(i.indkey::int2[]) k2)
                            = (select array_agg(k2 order by k2)
                                 from unnest(con.conkey) k2)) as one2one
          from pg_constraint con
          join pg_class rel  on rel.oid  = con.conrelid
          join pg_class frel on frel.oid = con.confrelid
          join pg_namespace n on n.oid = rel.relnamespace
         where con.contype = 'f' and n.nspname = 'public') f
    on conflict (table_name, constraint_name) do nothing;

    update relationships g
       set columns = f.cols, foreign_table = f.ftable,
           foreign_columns = f.fcols, on_delete = f.on_del,
           on_update = f.on_upd, one_to_one = f.one2one,
           is_active = true, updated_at = now(),
           log = g.log || to_jsonb('🔁changed: now -> ' || f.ftable
                                   || ' [' || v_now || ']')
      from (
        select con.conname,
               rel.relname as tname,
               (select jsonb_agg(a.attname order by k.ord)
                  from unnest(con.conkey) with ordinality k(attnum, ord)
                  join pg_attribute a
                    on a.attrelid = con.conrelid and a.attnum = k.attnum) as cols,
               frel.relname as ftable,
               (select jsonb_agg(a.attname order by k.ord)
                  from unnest(con.confkey) with ordinality k(attnum, ord)
                  join pg_attribute a
                    on a.attrelid = con.confrelid and a.attnum = k.attnum) as fcols,
               case con.confdeltype
                 when 'a' then 'no action' when 'r' then 'restrict'
                 when 'c' then 'cascade'   when 'n' then 'set null'
                 when 'd' then 'set default' end as on_del,
               case con.confupdtype
                 when 'a' then 'no action' when 'r' then 'restrict'
                 when 'c' then 'cascade'   when 'n' then 'set null'
                 when 'd' then 'set default' end as on_upd,
               exists (select 1 from pg_index i
                        where i.indrelid = con.conrelid and i.indisunique
                          and (select array_agg(k2 order by k2)
                                 from unnest(i.indkey::int2[]) k2)
                            = (select array_agg(k2 order by k2)
                                 from unnest(con.conkey) k2)) as one2one
          from pg_constraint con
          join pg_class rel  on rel.oid  = con.conrelid
          join pg_class frel on frel.oid = con.confrelid
          join pg_namespace n on n.oid = rel.relnamespace
         where con.contype = 'f' and n.nspname = 'public') f
     where g.table_name = f.tname and g.constraint_name = f.conname
       and (g.columns is distinct from f.cols
            or g.foreign_table is distinct from f.ftable
            or g.foreign_columns is distinct from f.fcols
            or g.on_delete is distinct from f.on_del
            or g.on_update is distinct from f.on_upd
            or g.one_to_one is distinct from f.one2one);

    update relationships g
       set archived_at = null, is_active = true, updated_at = now(),
           log = g.log || to_jsonb('🌱returned: seen again [' || v_now || ']')
     where g.archived_at is not null
       and exists (
         select 1 from pg_constraint con
          join pg_class rel on rel.oid = con.conrelid
          join pg_namespace n on n.oid = rel.relnamespace
         where con.contype = 'f' and n.nspname = 'public'
           and rel.relname = g.table_name and con.conname = g.constraint_name);
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

    update relationships g
       set last_seen_at = v_run
     where exists (
       select 1 from pg_constraint con
        join pg_class rel on rel.oid = con.conrelid
        join pg_namespace n on n.oid = rel.relnamespace
       where con.contype = 'f' and n.nspname = 'public'
         and rel.relname = g.table_name and con.conname = g.constraint_name);

    -- ⑵ VIEWS
    insert into views (name, definition, created_by, log)
    select v.viewname, v.definition, 'gaia_sync',
           jsonb_build_array('➕🪣created record for view: ' || v.viewname
                             || ' [' || v_now || ']')
      from pg_views v
     where v.schemaname = 'public'
    on conflict (name) do nothing;

    update views g
       set definition = v.definition, is_active = true, updated_at = now(),
           log = g.log || to_jsonb('🔁changed: definition [' || v_now || ']')
      from pg_views v
     where v.schemaname = 'public' and v.viewname = g.name
       and g.definition is distinct from v.definition;

    update views g
       set archived_at = null, is_active = true, updated_at = now(),
           log = g.log || to_jsonb('🌱returned: seen again [' || v_now || ']')
     where g.archived_at is not null
       and exists (
         select 1 from pg_views v
          where v.schemaname = 'public' and v.viewname = g.name);
    get diagnostics v_n = row_count;
    v_returned := v_returned + v_n;

    update views g
       set last_seen_at = v_run
     where exists (
       select 1 from pg_views v
        where v.schemaname = 'public' and v.viewname = g.name);

    -- ── THE ARCHIVE SECOND PASS (whole-base walks only) ──
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

    update relationships
       set archived_at = v_run, is_active = false, updated_at = now(),
           log = log || to_jsonb('📦archived: unseen by gaia_sync ['
                                 || v_now || ']')
     where archived_at is null
       and (last_seen_at is null or last_seen_at < v_run);
    get diagnostics v_n = row_count;
    v_archived := v_archived + v_n;

    update views
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
  'The MDL reborn, tended, and complete: walks pg_catalog and writes the base''s whole self-portrait — tables, columns, policies, functions (args AND returns), triggers, indexes, enums, composites, RELATIONSHIPS (the FK graph, one_to_one derived), and VIEWS. Sightings stamped, departures dated never deleted, returns resurrected, derivable references filled as facts, intent fields never touched. The three facts landed 2026-07-31 (canon 016): everything an exact database.types.ts replica needs, the base now records about itself.';

-- ─── the door stays as set: stewards only, never the street ───
revoke execute on function public.gaia_sync(text) from public, anon, authenticated;
grant  execute on function public.gaia_sync(text) to service_role;

-- ============================================================
-- RUN — the walker's first complete walk
-- ============================================================
select public.gaia_sync();

-- ============================================================
-- VERIFY
-- ============================================================
-- 1. The FK graph, drawn:
select table_name, constraint_name, columns, foreign_table,
       foreign_columns, one_to_one
  from public.relationships order by table_name, constraint_name;

-- 2. Views (may be honestly zero on this base):
select name, left(coalesce(definition, ''), 60) as definition_head
  from public.views order by name;

-- 3. Functions know their returns:
select name, signature as args, returns from public.functions
 order by name limit 15;

-- 4. The new registries are seen and counted like everything else:
select 'relationships' as registry,
       count(*) filter (where last_seen_at is not null) as seen,
       count(*) filter (where archived_at is not null) as archived,
       count(*) as total
  from public.relationships
union all select 'views',
       count(*) filter (where last_seen_at is not null),
       count(*) filter (where archived_at is not null), count(*)
  from public.views;

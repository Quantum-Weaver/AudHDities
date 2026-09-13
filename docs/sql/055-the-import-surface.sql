-- ============================================================================
-- 055 — THE IMPORT SURFACE
-- ============================================================================
-- The columns /api/auth/import has no home for today.
--   · vessel_collections.found_at — the date a bubbles export says a
--     collection was found; the reader drops it until this column stands.
--   · vessel_collections.collection_id — the catalogue it points at, declared
--     as a foreign key to collection_sets, and one row per vessel per
--     collection.
--   · journal_entries.source and source_id — the app and the row an imported
--     entry came from; until they stand, a re-import matches on
--     (entry_date, title, body).
-- Safe to run again.
-- ============================================================================

alter table public.vessel_collections
  add column if not exists found_at timestamptz;

alter table public.vessel_collections
  drop constraint if exists vessel_collections_collection_id_fkey;

alter table public.vessel_collections
  add constraint vessel_collections_collection_id_fkey
  foreign key (collection_id) references public.collection_sets (id) on delete cascade;

create unique index if not exists vessel_collections_user_collection_key
  on public.vessel_collections (user_id, collection_id);

alter table public.journal_entries
  add column if not exists source text;

alter table public.journal_entries
  add column if not exists source_id text;

create unique index if not exists journal_entries_source_key
  on public.journal_entries (created_by, source, source_id)
  where source is not null and source_id is not null;

-- CHECK
select column_name, data_type, is_nullable, column_default
  from information_schema.columns
 where table_schema = 'public'
   and ((table_name = 'vessel_collections' and column_name in ('found_at', 'collection_id'))
     or (table_name = 'journal_entries' and column_name in ('source', 'source_id', 'visibility', 'status')))
 order by table_name, column_name;

-- CHECK
select conname, pg_get_constraintdef(oid)
  from pg_constraint
 where conrelid = 'public.vessel_collections'::regclass;

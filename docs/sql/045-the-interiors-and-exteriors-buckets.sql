-- ============================================================================
-- 045 — THE INTERIORS AND EXTERIORS BUCKETS
-- ============================================================================
-- Two buckets, interiors (private) and exteriors (public), each walled so a
-- vessel reads, writes, and deletes only inside its own folder. vessel_config
-- gains storage_limit_bytes and interior_url; community_profiles gains
-- exterior_url. The buckets themselves are created through the storage API
-- (10 MB per file, png/jpeg/webp/gif); this course carries their walls and
-- the columns. Safe to run again.
-- ============================================================================

alter table public.vessel_config
  add column if not exists storage_limit_bytes bigint not null default 209715200,
  add column if not exists interior_url text;

alter table public.community_profiles
  add column if not exists exterior_url text;

drop policy if exists "Vessel reads own inventory objects" on storage.objects;
create policy "Vessel reads own inventory objects" on storage.objects
  for select to authenticated
  using (bucket_id in ('interiors', 'exteriors')
         and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Vessel uploads own inventory" on storage.objects;
create policy "Vessel uploads own inventory" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('interiors', 'exteriors')
              and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Vessel updates own inventory" on storage.objects;
create policy "Vessel updates own inventory" on storage.objects
  for update to authenticated
  using (bucket_id in ('interiors', 'exteriors')
         and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id in ('interiors', 'exteriors')
              and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Vessel deletes own inventory" on storage.objects;
create policy "Vessel deletes own inventory" on storage.objects
  for delete to authenticated
  using (bucket_id in ('interiors', 'exteriors')
         and (storage.foldername(name))[1] = auth.uid()::text);

select public.gaia_sync('vessel_config');
select public.gaia_sync('community_profiles');

-- CHECK
select table_name, column_name, data_type, column_default
  from information_schema.columns
 where table_schema = 'public'
   and column_name in ('storage_limit_bytes', 'interior_url', 'exterior_url')
 order by 1, 2;

select policyname, cmd
  from pg_policies
 where schemaname = 'storage' and policyname like '%inventory%'
 order by policyname;

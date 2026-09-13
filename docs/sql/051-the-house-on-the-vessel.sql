-- ============================================================================
-- 051 — THE HOUSE ON THE VESSEL
-- ============================================================================
-- community_profiles gains council_house_id, null by default, pointing at one
-- row of council_houses. The vessel's Council House card names that house when
-- it is set and names the houses that stand when it is not. Safe to run again.
-- ============================================================================

alter table public.community_profiles
  add column if not exists council_house_id uuid
  references public.council_houses(id) on delete set null;

create index if not exists community_profiles_council_house_idx
  on public.community_profiles (council_house_id)
  where council_house_id is not null;

-- CHECK
select column_name, data_type, is_nullable
  from information_schema.columns
 where table_schema = 'public'
   and table_name = 'community_profiles'
   and column_name = 'council_house_id';

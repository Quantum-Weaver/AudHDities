-- =====================================================================
-- 046 — THE LESSON MARKS: one holding table for what a vessel has read.
--
-- Creates public.vessel_lessons. Nothing else is created, altered or
-- written: lessons, path_lessons and learning_paths are untouched.
-- Safe to run again — every statement is guarded.
--
-- The site reads this table through /api/auth/vessel/lessons. Until the
-- table lands that route answers { ready: false } and the pages render
-- without a mark.
--
-- RUN THIS BY YOUR OWN HAND, one step at a time. No lamp runs it.
-- =====================================================================

-- ---------------------------------------------------------------------
-- STEP 1 — SEE first (two reads, no writes).
-- ---------------------------------------------------------------------

-- 1a · whether the table already stands. Zero rows expected.
select c.relname, c.relrowsecurity
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public'
   and c.relname = 'vessel_lessons';

-- 1b · the lessons the marks will point at.
select count(*) as lessons_now
  from public.lessons
 where status = 'published';

-- ---------------------------------------------------------------------
-- STEP 2 — the table. One row per vessel per lesson.
-- ---------------------------------------------------------------------
create table if not exists public.vessel_lessons (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  lesson_id    uuid not null references public.lessons(id) on delete cascade,
  status       text not null default 'completed',
  completed_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint vessel_lessons_user_lesson_key unique (user_id, lesson_id),
  constraint vessel_lessons_status_check check (status in ('reading', 'completed'))
);

comment on table public.vessel_lessons is
  'One mark per vessel per lesson. The mark is the vessel''s own: it is set
   and unset by the vessel''s own hand, counts nothing, and expires never.';

comment on column public.vessel_lessons.status is
  'reading or completed. A lesson unmarked keeps its row at reading rather
   than losing the date it was first read.';

comment on column public.vessel_lessons.completed_at is
  'The moment the mark was set. Null while status is reading.';

create index if not exists vessel_lessons_user_idx
  on public.vessel_lessons (user_id);

-- ---------------------------------------------------------------------
-- STEP 3 — the doors. GRANT before RLS; the policies take NO "to" clause.
-- ---------------------------------------------------------------------
grant select, insert, update, delete on public.vessel_lessons to authenticated;
alter table public.vessel_lessons enable row level security;

drop policy if exists "Vessels read their own lesson marks" on public.vessel_lessons;
create policy "Vessels read their own lesson marks"
  on public.vessel_lessons for select
  using (user_id = auth.uid());

drop policy if exists "Vessels set their own lesson marks" on public.vessel_lessons;
create policy "Vessels set their own lesson marks"
  on public.vessel_lessons for insert
  with check (user_id = auth.uid());

drop policy if exists "Vessels move their own lesson marks" on public.vessel_lessons;
create policy "Vessels move their own lesson marks"
  on public.vessel_lessons for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "Vessels lift their own lesson marks" on public.vessel_lessons;
create policy "Vessels lift their own lesson marks"
  on public.vessel_lessons for delete
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- STEP 4 — tell gaia what this table is. The write verbs are false: the
-- marks are written through /api/auth/vessel/lessons, not a generated door.
-- ---------------------------------------------------------------------
update public.gaia_config
   set deity_group = 'hestia-core',
       generation_flags = coalesce(generation_flags, '{}'::jsonb) || jsonb_build_object(
         'generateApiGetList',   true,
         'generateApiGetSingle', true,
         'generateApiPost',      false,
         'generateApiPut',       false,
         'generateApiDelete',    false)
 where table_name = 'vessel_lessons';

insert into public.gaia_config (table_name, deity_group, generation_flags)
select 'vessel_lessons', 'hestia-core', jsonb_build_object(
         'generateApiGetList',   true,
         'generateApiGetSingle', true,
         'generateApiPost',      false,
         'generateApiPut',       false,
         'generateApiDelete',    false)
 where not exists (select 1 from public.gaia_config where table_name = 'vessel_lessons');

-- ---------------------------------------------------------------------
-- STEP 5 — let the base see its own new table.
-- ---------------------------------------------------------------------
select public.gaia_sync('vessel_lessons');

-- ---------------------------------------------------------------------
-- STEP 6 — VERIFY. Expect one table row, four policies, RLS true.
-- ---------------------------------------------------------------------
select c.relname, c.relrowsecurity
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public'
   and c.relname = 'vessel_lessons';

select policyname, cmd, roles::text
  from pg_policies
 where schemaname = 'public'
   and tablename = 'vessel_lessons'
 order by cmd, policyname;

select conname, contype
  from pg_constraint
 where conrelid = 'public.vessel_lessons'::regclass
 order by conname;
-- =====================================================================

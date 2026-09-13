-- =====================================================================
-- 047 — THE UNLOCK RULES: the rows sigil_unlocks holds, and the two
-- guards the granting needs. Neighbour to 031, which seeded the shelf.
--
-- One rule row is written: the only one of the thirty sigils whose own
-- description names an act this evaluator can count. STEP 5 lists the
-- shelf so the rest can be named by hand.
--
-- The evaluator is src/lib/sigils/award.ts. It reads published
-- sigil_unlocks rows through the vessel's own session and writes
-- vessel_sigils. It understands four trigger_type values and no others:
--
--   quest_completed   · a row in vessel_quests with status 'completed'
--   bubble_popped     · a row in vessel_bubbles
--   lesson_completed  · a row in vessel_lessons with status 'completed'
--   path_completed    · every path_lessons row with is_required marked
--
-- trigger_entity names one quest, bubble, lesson or path by slug or by
-- id. Left null, trigger_value is the count of that kind the vessel must
-- hold; left null too, the count is one.
--
-- vessel_lessons is created by 046. Rules of trigger_type
-- 'lesson_completed' and 'path_completed' award nothing until it lands.
--
-- RUN THIS BY YOUR OWN HAND, one step at a time. No lamp runs it.
-- =====================================================================

-- ---------------------------------------------------------------------
-- STEP 1 — SEE first (four reads, no writes).
-- ---------------------------------------------------------------------

-- 1a · the shelf. Expect 30 rows.
select count(*) as sigils_now from public.sigils where status = 'published';

-- 1b · the rules as they stand. Expect 0 rows.
select u.trigger_type, u.trigger_entity, u.trigger_value, s.slug
  from public.sigil_unlocks u
  left join public.sigils s on s.id = u.sigil_id
 order by u.trigger_type, s.slug;

-- 1c · who may read the rules. The evaluator reads through the
-- authenticated role; a rule no vessel can read awards nothing.
select policyname, cmd, roles::text, qual
  from pg_policies
 where schemaname = 'public'
   and tablename = 'sigil_unlocks'
 order by cmd, policyname;

-- 1d · vessels holding one sigil twice. Expect 0 rows; STEP 3 errors if not.
select user_id, sigil_id, count(*) as held
  from public.vessel_sigils
 group by user_id, sigil_id
having count(*) > 1;

-- ---------------------------------------------------------------------
-- STEP 2 — the read door. Permissive: it stands beside whatever policy
-- already reads this table, and opens nothing but published rules.
-- ---------------------------------------------------------------------
grant select on public.sigil_unlocks to authenticated;

drop policy if exists "Vessels read the unlock rules" on public.sigil_unlocks;
create policy "Vessels read the unlock rules"
  on public.sigil_unlocks for select
  using (status = 'published');

-- ---------------------------------------------------------------------
-- STEP 3 — the guard. One sigil per vessel, once.
-- ---------------------------------------------------------------------
create unique index if not exists vessel_sigils_user_sigil_key
  on public.vessel_sigils (user_id, sigil_id);

-- ---------------------------------------------------------------------
-- STEP 4 — the rule. Star Catcher reads "A first bubble collected"
-- (008, display_order 6), which is one row in vessel_bubbles.
-- ---------------------------------------------------------------------
insert into public.sigil_unlocks
  (name, description, sigil_id, trigger_type, trigger_entity, trigger_value, status)
select 'Star Catcher, at the first star',
       'Awards Star Catcher when the vessel holds one popped bubble.',
       s.id,
       'bubble_popped',
       null,
       1,
       'published'::public.content_status
  from public.sigils s
 where s.slug = 'star-catcher'
   and not exists (
     select 1 from public.sigil_unlocks u
      where u.sigil_id = s.id and u.trigger_type = 'bubble_popped'
   );

-- ---------------------------------------------------------------------
-- STEP 5 — the shelf, for naming the rest by hand. Of the thirty marks,
-- twenty-nine name acts outside the four trigger types above: a bio
-- written, an avatar chosen, a seed planted, a vote abstained, a share
-- received. Read this, choose the slug, and fill one template.
-- ---------------------------------------------------------------------
select s.slug, s.name, s.category, s.rarity, s.description
  from public.sigils s
 where s.status = 'published'
   and not exists (select 1 from public.sigil_unlocks u where u.sigil_id = s.id)
 order by s.display_order;

-- the quests, lessons and paths a rule may name in trigger_entity
select 'quest' as kind, slug, name from public.quests where status = 'published'
union all
select 'lesson', slug, name from public.lessons where status = 'published'
union all
select 'path', slug, name from public.learning_paths where status = 'published'
 order by kind, slug;

-- Template, one entity: the sigil lands when that one thing is done.
-- insert into public.sigil_unlocks
--   (name, description, sigil_id, trigger_type, trigger_entity, trigger_value, status)
-- select '<rule name>', '<what it awards>', s.id,
--        'quest_completed', '<quest slug>', null, 'published'::public.content_status
--   from public.sigils s where s.slug = '<sigil slug>';

-- Template, a count: the sigil lands at the nth of its kind.
-- insert into public.sigil_unlocks
--   (name, description, sigil_id, trigger_type, trigger_entity, trigger_value, status)
-- select '<rule name>', '<what it awards>', s.id,
--        'lesson_completed', null, 5, 'published'::public.content_status
--   from public.sigils s where s.slug = '<sigil slug>';

-- ---------------------------------------------------------------------
-- STEP 6 — VERIFY. Expect one rule row, one unique index, and the read
-- policy standing.
-- ---------------------------------------------------------------------
select u.name, u.trigger_type, u.trigger_entity, u.trigger_value, s.slug
  from public.sigil_unlocks u
  join public.sigils s on s.id = u.sigil_id
 where u.status = 'published'
 order by u.trigger_type, s.slug;

select indexname, indexdef
  from pg_indexes
 where schemaname = 'public'
   and tablename = 'vessel_sigils'
   and indexdef ilike '%user_id, sigil_id%';

select policyname, cmd, roles::text
  from pg_policies
 where schemaname = 'public'
   and tablename = 'sigil_unlocks'
 order by cmd, policyname;
-- =====================================================================

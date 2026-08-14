-- =====================================================================
-- 020 — THE TEMPLATES ALIGNED, AND THE POUR CONNECTED
-- Two wires, not a build. Drafted 2026-08-11 at KP's ⚛ word.
-- =====================================================================
--
-- HIS COMMISSION, verbatim:
--   "it is the templates i assigned in gaia config, can we review those
--    and align them appropriately please. that will fix our remaining
--    generation issues i think."
--
-- And, after pointing at the machinery already standing in his base:
--   "i have built everything already jus rying to get help putting it
--    all together properly"
--
-- Both true. THE CHAIN IS ALREADY COMPLETE IN THE BASE:
--
--   gaia_template_level(t)   → lower(templates.name) for the assignment
--   gaia_handling_level(t)   → a name-pattern fallback for newborns
--                              (assessment_%, %_participants%, …)
--   gaia_generation_flags(t) → coalesce(template_level, handling_level)
--                              → the whole flag object, every level covered
--
-- Nothing here rebuilds any of that. An earlier draft of this file carved
-- a `gaia_template_of()` before checking the base — KP's correction,
-- verbatim: "always check first before build." The duplicate is gone; this
-- file uses his functions and adds exactly one thing they do not have.
--
-- =====================================================================
-- THE TWO GAPS, precisely
-- =====================================================================
--
-- ① NOTHING CALLS THE POUR. `gaia_config.generation_flags` holds values
--    set by hand. `gaia_generation_flags()` computes what they SHOULD be.
--    Nothing has ever run the one statement that makes the stored column
--    equal the computed truth, so the two drifted apart silently.
--
-- ② THE ASSIGNMENTS FEEDING IT ARE WRONG. 79 of 129 tables carry a
--    template that disagrees with their own RLS policies — measured this
--    sitting against the policies registry. KP: "i guessed entirely at the
--    table handling levels." A perfect pour from a wrong template is still
--    wrong, so ① alone is not enough.
--
-- WHAT ALIGNMENT IS WORTH, measured before drafting:
--    hooks generated today                      77
--    hooks after the pour, templates corrected  126
--    hooks in the era before the rewrite        118
--    → alignment does not merely close the regression; it passes it.
--
-- =====================================================================
-- ① THE ONE GENUINELY MISSING PIECE — the base reading its own doors
-- =====================================================================
-- Nothing in the base derives a TEMPLATE from POLICIES. gaia_sync already
-- walks pg_policies into the policies registry; it holds every fact needed
-- to rule a template, and rules none. This is that ruling, and it is the
-- only new function in this file.
--
-- Two traps it is built to avoid, both paid for this sitting:
--   · `id = auth.uid()` is a SUBSTRING of `user_id = auth.uid()`. A naive
--     match swallows most of the base into Identity. Hence the boundary.
--   · EVERY kind of table carries governance policies shaped
--     `EXISTS (SELECT 1 FROM user_roles …)`. Those are admin reach, not
--     ownership — counting them makes gaia_config look user-owned. They
--     are discarded FIRST.
-- Direct ownership outranks public read: the Owned template's own
-- description says owned rows are publicly viewable when published.

create or replace function public.gaia_template_from_policies(p_table_name text)
returns text
language sql
stable
security definer
set search_path = public, pg_catalog
as $fn$
  with own as (
    select coalesce(qual, '') as q, cmd
      from pg_policies
     where schemaname = 'public'
       and tablename = p_table_name
       and coalesce(qual, '') !~* 'FROM\s+user_roles'
  ),
  any_policy as (
    select count(*) as n from pg_policies
     where schemaname = 'public' and tablename = p_table_name
  )
  select case
    when (select n from any_policy) = 0 then 'Relational'
    when (select count(*) from own) = 0 then 'System'
    when exists (select 1 from own where q ~ '(^|[^A-Za-z0-9_])id\s*=\s*auth\.uid\(\)') then 'Identity'
    when exists (select 1 from own where q ~ 'created_by\s*=\s*auth\.uid\(\)') then 'Owned'
    when exists (select 1 from own where q ~ '(^|[^A-Za-z0-9_])user_id\s*=\s*auth\.uid\(\)') then 'Owned'
    when exists (select 1 from own where cmd = 'SELECT' and (q = 'true' or q ~ 'status\s*=')) then 'System'
    else 'Relational'
  end;
$fn$;

comment on function public.gaia_template_from_policies(text) is
  'Rules a table''s template from its own RLS, governance policies discarded. Read-only; assignment and pour are separate, deliberate acts.';

-- =====================================================================
-- ② THE REPORT — run this FIRST. Nothing has changed yet.
-- =====================================================================

select g.table_name,
       t.name                                          as assigned,
       public.gaia_template_from_policies(g.table_name) as rls_says,
       g.generation_flags ->> 'generateHooks'           as hooks_now,
       public.gaia_generation_flags(g.table_name) ->> 'generateHooks' as hooks_if_poured
  from public.gaia_config g
  left join public.templates t on t.id = g.template_id
 where t.name is distinct from public.gaia_template_from_policies(g.table_name)
 order by public.gaia_template_from_policies(g.table_name), g.table_name;

-- =====================================================================
-- ③ WIRE ONE — the assignments, corrected from the base's own doors
-- =====================================================================

update public.gaia_config g
   set template_id = t.id,
       updated_at  = now()
  from public.templates t
 where t.name = public.gaia_template_from_policies(g.table_name)
   and g.template_id is distinct from t.id;

-- =====================================================================
-- ④ WIRE TWO — the pour, at last connected. HIS function, called.
--    This is the whole of gap ①: one statement, never before run.
-- =====================================================================

update public.gaia_config g
   set generation_flags = public.gaia_generation_flags(g.table_name),
       updated_at       = now()
 where g.generation_flags is distinct from public.gaia_generation_flags(g.table_name);

-- =====================================================================
-- THE VERIFY
-- =====================================================================

select coalesce(t.name, '(none)') as template,
       count(*) as tables,
       count(*) filter (where g.generation_flags ->> 'generateHooks' = 'true') as with_hooks
  from public.gaia_config g
  left join public.templates t on t.id = g.template_id
 group by t.name
 order by t.name;
-- Expect hooks everywhere except Relational; ~126 total, against 77 today.

-- and the drift, which should now be empty:
select count(*) as still_drifting
  from public.gaia_config g
 where g.generation_flags is distinct from public.gaia_generation_flags(g.table_name);

-- =====================================================================
-- HELD FOR KP's ⚛ RULING — nothing above touches these
-- =====================================================================
--
-- ① `gifts` — RLS is `recipient_id = auth.uid()`, a THIRD ownership shape
--    the four templates do not describe: a gift belongs to whoever
--    RECEIVED it, not whoever made it. The classifier therefore calls it
--    Relational, and it is the ONLY table that loses hooks in this whole
--    alignment. Almost certainly wrong. The fix is his: a fifth template,
--    or Owned widened to name recipient_id.
--
-- ② THE IDENTITY TEMPLATE IS IMPLEMENTED NOWHERE. Its declared pattern is
--    `id = auth.uid()` and not one table in this base uses it.
--    `community_profiles` and `user_private` — the two most
--    identity-shaped tables in the house — both use `created_by =
--    auth.uid()`, the Owned pattern. After this runs, Identity holds zero
--    tables. Either the template describes an intent the schema never
--    adopted, or those tables' RLS drifted from it. A question about the
--    house, not about generation.
--
-- ③ Should gaia_sync() run wire two on every walk? Then the flags could
--    never drift again, by construction. The house's posture everywhere
--    else is dry-by-default — the distribute turn prints its plan and
--    moves nothing. Recommendation: gaia_sync REPORTS drift; the pour
--    stays a deliberate act. Not built either way until he says.
--
-- =====================================================================
-- AFTER THIS RUNS
-- =====================================================================
--   1. resonance-gaia:  npm run generate:hooks superposition
--                       npm run generate:utils superposition
--                       npm run generate:apis  superposition
--   2. resonance-gaia:  npm run distribute:dry     (read the plan)
--   3. resonance-gaia:  npm run distribute         (KP's hand)
--   4. AudHDities:      npx tsc --noEmit && npm run build

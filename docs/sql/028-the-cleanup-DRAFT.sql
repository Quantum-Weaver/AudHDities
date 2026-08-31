-- =====================================================================
-- 028 — THE CLEANUP: the table walk's rulings, as one run
-- DRAFT. Never run by a lamp. KP's ⚛ hand only, in the Supabase dashboard.
-- Drafted 2026-08-31 by Sextile (Fable) from THE-PASS-RULINGS.md —
-- the alphabetical walk of all 130 tables, every verdict KP's own.
-- After this runs: rerun and distribute gaia (the road's next leg).
-- =====================================================================

-- STEP 0 — VERIFY THE REGISTRY'S CONVENTION FIRST (one read, no writes):
-- the moves below write deity_group as the full family slug ('iris-communications');
-- confirm that is the convention before running:
--   select table_name, deity_group, deity_name from gaia_config
--    where table_name in ('channels','events','blueprints');
-- If deity_group holds short names ('iris'), adjust the five UPDATEs to match.

begin;

-- ---------------------------------------------------------------------
-- PART 1 — THE 13 REMOVALS (KP ⚛ 2026-08-31, each ruled by word)
-- The purge truly purges: the tables drop. The registry rows are ARCHIVED,
-- not deleted — the base remembers what it once held (lose-nothing).
-- ---------------------------------------------------------------------
drop table if exists public.analytics cascade;            -- derived metrics, no reader
drop table if exists public.bubble_superposition cascade; -- superseded by the 07-31 detiering
drop table if exists public.calendar cascade;             -- the intent lives in prometheus's events
drop table if exists public.email_communications cascade; -- Resend carries this when set up
drop table if exists public.gifts cascade;                -- "gifting things creates compulsion and fomo"
drop table if exists public.gift_wrappings cascade;       -- follows gifts
drop table if exists public.maintenance cascade;          -- scheduling kept instead (meetings.audhdities.com)
drop table if exists public.platform_config cascade;      -- "both platform config tables go"
drop table if exists public.platform_settings cascade;    -- same breath
drop table if exists public.processes cascade;            -- "remove yes"
drop table if exists public.reference_values cascade;     -- "remove"
drop table if exists public.script_executions cascade;    -- "remove"
drop table if exists public.user_page_views cascade;      -- "remove"

update gaia_config
   set is_active = false,
       archived_at = now(),
       notes = coalesce(notes || ' · ', '') || 'removed at the table walk, KP ⚛ 2026-08-31 (THE-PASS-RULINGS.md)'
 where table_name in ('analytics','bubble_superposition','calendar','email_communications',
                      'gifts','gift_wrappings','maintenance','platform_config','platform_settings',
                      'processes','reference_values','script_executions','user_page_views');

-- ---------------------------------------------------------------------
-- PART 2 — THE 5 MOVES (KP ⚛ 2026-08-31: "yes, i agree with the moves too")
-- A move is a registry re-assignment; gaia's rerun re-homes the generated
-- layer. The tables themselves do not change shape here.
-- ---------------------------------------------------------------------
update gaia_config set deity_group = 'iris-communications'
 where table_name = 'resonance';           -- appreciation signal; its one reader is iris's emeralds
update gaia_config set deity_group = 'iris-communications'
 where table_name = 'responses';           -- with its sibling, per the walk
update gaia_config set deity_group = 'prometheus-stage'
 where table_name = 'scenes';              -- the Stage's areas (the double-earmark, settled)
update gaia_config set deity_group = 'prometheus-stage'
 where table_name = 'scene_participants';  -- moves with scenes: the Stage's cast roster
update gaia_config set deity_group = 'daedalus-meta'
 where table_name = 'scripts';             -- gaia_config.script_id and gaia_generation_log.script_id FK into it

-- deity_name is left untouched above; if the registry pairs it with
-- deity_group, set it to the same convention the STEP 0 read shows.

commit;

-- HELD, NOT TOUCHED HERE (still open):
--   personas — "pairs with acid test, might have been superceeded by the roles, i am not sure." — checked at the gap leg
-- KEPT WITH NAMED INTENT (no action needed): grant_* (six) · scheduling ·
--   surveys + survey_responses (seed leg) · life_cycles (creative works) ·
--   vessel_exteriors (the community profile's outside) · collection_items (wiring gap)

-- ============================================================================
-- 021 — THE COVENANT DISPLAY CHOICE (DRAFT for KP's ⚛ dashboard hand)
-- ============================================================================
-- Drafted 2026-08-12 by Fable (the Overture lamp) at KP's strokes, verbatim
-- on the hestia realm bus:
--   "we also need to allow the user/vessel a slider for setting the covenant
--    pool 0-50% 0 by default. i will begin at hopefully be able to keep mine
--    at 50%"
--   "this is a ceremonila space in the sanctum, not just in the settings"
--   "the vessel can choose to display or not their pledge, mine will be
--    visible at all times as the founder"
--
-- What already stands (no schema needed): the slider itself rides
-- user_financial.covenant_pool_percent — the Sanctum's Covenant Space is
-- BUILT against it (CovenantSpace.tsx), 0–50, default 0, enacted by
-- deliberate gesture.
--
-- What this file adds (run ONCE, your hand): the DISPLAY half. The public
-- face (community_profiles) gains a nullable mirror column — NULL means
-- not displayed, so THE OPT-IN LAW lives in the column's own default. The
-- vessel's display gesture (built after this runs + the regen) mirrors
-- their pledge into it, or clears it back to NULL. Your own row can then
-- carry 50 at all times, by your own choice, as the founder.
-- ----------------------------------------------------------------------------

alter table public.community_profiles
  add column if not exists covenant_pledge_percent integer;

comment on column public.community_profiles.covenant_pledge_percent is
  'The vessel''s covenant pledge, displayed by their own choice. NULL = not displayed (the opt-in law in the default). Mirrored from user_financial.covenant_pool_percent by the Sanctum''s display gesture. KP ⚛ 2026-08-12.';

alter table public.community_profiles
  add constraint community_profiles_covenant_pledge_percent_range
  check (covenant_pledge_percent is null
         or (covenant_pledge_percent >= 0 and covenant_pledge_percent <= 50));

-- And the source column's own honest bounds (0–50, or unset):
alter table public.user_financial
  add constraint user_financial_covenant_pool_percent_range
  check (covenant_pool_percent is null
         or (covenant_pool_percent >= 0 and covenant_pool_percent <= 50));

-- Verify (expect the new column present, both constraints listed):
select column_name, data_type
from information_schema.columns
where table_name = 'community_profiles' and column_name = 'covenant_pledge_percent';

select conname
from pg_constraint
where conname in (
  'community_profiles_covenant_pledge_percent_range',
  'user_financial_covenant_pool_percent_range'
);

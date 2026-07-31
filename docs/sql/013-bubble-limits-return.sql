-- ============================================================================
-- 013 — THE BUBBLE LIMITS RETURN: the boundary follows the vessel again
-- ============================================================================
-- Drafted 2026-07-31 by Fable (lane hestia-realm) at KP's ⚛ word: "we need
-- to add back to the vessel config the bubble limits setting please."
--
-- The story: the old limits table died in the schema evolution, and the
-- bubbles game's personal caps were demoted to DEVICE-LOCAL localStorage —
-- a sovereign boundary that forgets you on every new device. It comes home
-- to vessel_config, beside the ceremony switches, where a vessel's choices
-- about their own rhythm belong.
--
-- Defaults are the GENTLE community baseline (the anti-addiction ethic of
-- L1-13/L3-17: caps and cooldowns protect the vessel, never squeeze them).
-- 🚩 VITAL-REVISIT: both numbers are first-guess math, tuned only against
-- real vessels — like every formula parameter in the house.
--
-- After this runs, the back half is Fable's (the proven ceremony-columns
-- flow): types repulled + GAIA regenerated so the validators accept the
-- new fields, then the Sanctum grows the control.
-- ----------------------------------------------------------------------------

ALTER TABLE public.vessel_config
  ADD COLUMN IF NOT EXISTS bubble_daily_max integer NOT NULL DEFAULT 500,
  ADD COLUMN IF NOT EXISTS bubble_hourly_max integer NOT NULL DEFAULT 100;

COMMENT ON COLUMN public.vessel_config.bubble_daily_max IS
  'The vessel''s own daily bubble-points cap (anti-addiction boundary, self-chosen; 🚩 VITAL-REVISIT default)';
COMMENT ON COLUMN public.vessel_config.bubble_hourly_max IS
  'The vessel''s own hourly bubble-pops cap (anti-addiction boundary, self-chosen; 🚩 VITAL-REVISIT default)';

-- ----------------------------------------------------------------------------
-- VERIFY — expect both columns present with their defaults, and the one
-- existing config row showing 500 / 100:
-- ----------------------------------------------------------------------------

SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'vessel_config'
  AND column_name LIKE 'bubble%';

SELECT bubble_daily_max, bubble_hourly_max FROM public.vessel_config;
-- ============================================================================

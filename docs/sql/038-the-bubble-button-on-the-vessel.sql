-- ============================================================================
-- 038 — THE BUBBLE BUTTON ON THE VESSEL
-- ============================================================================
-- vessel_config gains bubble_vessel_button, off by default. The sanctum's
-- switch writes it; the vessel page shows a "Play bubbles" button to
-- /library/bubbles/play while it is on. Safe to run again.
-- ============================================================================

alter table public.vessel_config
  add column if not exists bubble_vessel_button boolean not null default false;

-- CHECK
select column_name, data_type, column_default
  from information_schema.columns
 where table_schema = 'public'
   and table_name = 'vessel_config'
   and column_name = 'bubble_vessel_button';

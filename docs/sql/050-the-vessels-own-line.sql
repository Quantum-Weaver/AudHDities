-- ============================================================================
-- 050 — THE VESSEL'S OWN LINE
-- ============================================================================
-- vessel_config gains status_line, empty by default. The sanctum's "Your Line"
-- section writes it through /api/auth/update-profile; the status bar shows it
-- beside the voice line. Safe to run again.
-- ============================================================================

alter table public.vessel_config
  add column if not exists status_line text;

alter table public.vessel_config
  drop constraint if exists vessel_config_status_line_length;

alter table public.vessel_config
  add constraint vessel_config_status_line_length
  check (status_line is null or char_length(status_line) <= 80);

-- CHECK
select column_name, data_type, is_nullable
  from information_schema.columns
 where table_schema = 'public'
   and table_name = 'vessel_config'
   and column_name = 'status_line';

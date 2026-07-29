-- 20260729_ceremony_choices.sql
-- ============================================================================
-- THE CEREMONY SWITCHBOARD — Movement IV, "THE WEARING" (Shuttle Run 08)
-- Drafted 2026-07-29 by the finishing session of THE-FRONTEND-REIMAGINING,
-- for KP's own hand in the dashboard (the mend-law rhythm: designed here,
-- applied by the gardener, types regenerated, wired, verified, same flow).
-- ============================================================================
-- THE OPT-IN LAW lives in the schema itself: both columns default FALSE.
-- Absence of choice always means OFF; any pre-checked box is a defect.
--   ceremony_arrival  — the richer opt-in arrival (composes O-1's
--                       .ceremony-welcome at the crossing; the calm Velkomin
--                       word remains the default for everyone, toggle or no)
--   ceremony_farewell — the farewell at the going (gather→escort→release,
--                       Gweld ti'n fuan at the release beat — stroke 5's gate)

alter table public.vessel_config
  add column if not exists ceremony_arrival boolean not null default false;

alter table public.vessel_config
  add column if not exists ceremony_farewell boolean not null default false;

comment on column public.vessel_config.ceremony_arrival is
  'Opt-in richer arrival ceremony (.ceremony-welcome at the crossing). Default false per THE OPT-IN LAW.';

comment on column public.vessel_config.ceremony_farewell is
  'Opt-in farewell ceremony at sign-out (Gweld ti''n fuan at the release beat). Default false per THE OPT-IN LAW.';

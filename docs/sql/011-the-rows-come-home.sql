-- ============================================================================
-- 011 — THE ROWS COME HOME: the tracking trigger learns gentleness
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane hestia-realm), tracing "/vessel still
-- says sign in" after everything else healed. The culprit is the same
-- trigger that bit 008's first run, one file earlier: 007's backfill ran
-- BEFORE we knew set_user_tracking_columns existed. The trigger overwrote
-- created_by with auth.uid() — NULL in a dashboard session — and because
-- the identity tables' created_by is NULLABLE, it failed SILENTLY: your
-- profile, private shell, and vessel config all exist but belong to no
-- one. The app filters by created_by and finds nothing.
--
-- Two healings, in order:
--
-- PART 1 — the trigger itself learns COALESCE: a live session's identity
-- still wins (a signed-in vessel cannot spoof created_by — auth.uid()
-- overrides, and the WITH CHECK walls guard besides), but a nameless
-- context (dashboard, SECURITY DEFINER flows like handle_new_user) no
-- longer ERASES an explicit hand. This also makes 007's signup trigger
-- correct for every future vessel: its inserts carry created_by
-- explicitly, and COALESCE now preserves that instead of nulling it.
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_user_tracking_columns()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO ''
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_by = COALESCE(auth.uid(), NEW.created_by);
    NEW.updated_by = COALESCE(auth.uid(), NEW.updated_by);
  ELSIF TG_OP = 'UPDATE' THEN
    NEW.updated_by = COALESCE(auth.uid(), NEW.updated_by);
  END IF;
  RETURN NEW;
END;
$$;

-- ----------------------------------------------------------------------------
-- PART 2 — the three orphaned identity rows come home to the First Vessel.
-- (Safe today: exactly one auth user exists; the WHERE guards keep this
-- from ever touching a row that already has an owner.)
-- ----------------------------------------------------------------------------

UPDATE public.community_profiles
SET created_by = (SELECT id FROM auth.users LIMIT 1)
WHERE created_by IS NULL;

UPDATE public.user_private
SET created_by = (SELECT id FROM auth.users LIMIT 1)
WHERE created_by IS NULL;

UPDATE public.vessel_config
SET created_by = (SELECT id FROM auth.users LIMIT 1)
WHERE created_by IS NULL;

-- ----------------------------------------------------------------------------
-- VERIFY — expect zero orphans everywhere, and then the true test:
-- reload the app; /vessel greets you by name.
-- ----------------------------------------------------------------------------

SELECT 'community_profiles' AS t,
       count(*) FILTER (WHERE created_by IS NULL) AS orphaned, count(*) AS total
FROM public.community_profiles
UNION ALL SELECT 'user_private',
       count(*) FILTER (WHERE created_by IS NULL), count(*)
FROM public.user_private
UNION ALL SELECT 'vessel_config',
       count(*) FILTER (WHERE created_by IS NULL), count(*)
FROM public.vessel_config;
-- ============================================================================

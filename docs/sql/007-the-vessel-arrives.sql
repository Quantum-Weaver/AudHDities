-- ============================================================================
-- 007 — THE VESSEL ARRIVES: handle_new_user, rebuilt for the evolved schema
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane hestia-realm). Finding: KP has an auth
-- user but no profile — and the base has NO trigger on auth.users at all.
-- The old handle_new_user() died with the dissolved `profiles` table in the
-- rebirth; the evolved schema (community_profiles + user_private +
-- vessel_config, all keyed by created_by) never received its replacement.
-- The app documents the intended flow (forge/architecture/auth-flow) and
-- excluded_functions.ts still reserves the name for the database's own hand.
--
-- What this file does:
--   1. Rebuilds handle_new_user() for the three-table identity:
--      * community_profiles — the public face (display_name from signup
--        metadata, falling back to the email's local part; slug uniquified)
--      * user_private       — the empty sovereign shell (own-only by RLS)
--      * vessel_config      — presentation defaults (every ceremony OFF,
--        the opt-in law living in the schema's own defaults)
--   2. Attaches the trigger to auth.users.
--   3. BACKFILLS every existing auth user missing their rows — which today
--      means exactly one vessel: the First. Welcome home, KP.
--
-- SECURITY DEFINER + pinned search_path is the standard Supabase shape for
-- auth triggers (the inserting role has no table grants at signup time).
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_display text;
  v_slug    text;
BEGIN
  v_display := coalesce(
    nullif(NEW.raw_user_meta_data->>'display_name', ''),
    nullif(NEW.raw_user_meta_data->>'username', ''),
    split_part(NEW.email, '@', 1),
    'Sovereign Vessel'
  );

  v_slug := lower(regexp_replace(v_display, '[^a-zA-Z0-9]+', '-', 'g'));
  v_slug := trim(both '-' from v_slug);
  IF v_slug = '' THEN v_slug := 'vessel'; END IF;
  IF EXISTS (SELECT 1 FROM public.community_profiles WHERE slug = v_slug) THEN
    v_slug := v_slug || '-' || left(NEW.id::text, 8);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.community_profiles WHERE created_by = NEW.id) THEN
    INSERT INTO public.community_profiles (id, created_by, display_name, slug)
    VALUES (gen_random_uuid(), NEW.id, v_display, v_slug);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.user_private WHERE created_by = NEW.id) THEN
    INSERT INTO public.user_private (id, created_by)
    VALUES (gen_random_uuid(), NEW.id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.vessel_config WHERE created_by = NEW.id) THEN
    INSERT INTO public.vessel_config (id, created_by)
    VALUES (gen_random_uuid(), NEW.id);
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- THE BACKFILL — every auth user missing their rows receives them now.
-- (Today: one vessel. The First Vessel's Welcome, by the schema's own hand.)
-- ----------------------------------------------------------------------------

INSERT INTO public.community_profiles (id, created_by, display_name, slug)
SELECT gen_random_uuid(), u.id,
       coalesce(
         nullif(u.raw_user_meta_data->>'display_name', ''),
         nullif(u.raw_user_meta_data->>'username', ''),
         split_part(u.email, '@', 1),
         'Sovereign Vessel'
       ),
       trim(both '-' from lower(regexp_replace(
         coalesce(
           nullif(u.raw_user_meta_data->>'display_name', ''),
           nullif(u.raw_user_meta_data->>'username', ''),
           split_part(u.email, '@', 1),
           'vessel'
         ), '[^a-zA-Z0-9]+', '-', 'g'))) || '-' || left(u.id::text, 8)
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.community_profiles p WHERE p.created_by = u.id);

INSERT INTO public.user_private (id, created_by)
SELECT gen_random_uuid(), u.id
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.user_private p WHERE p.created_by = u.id);

INSERT INTO public.vessel_config (id, created_by)
SELECT gen_random_uuid(), u.id
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.vessel_config p WHERE p.created_by = u.id);

-- ----------------------------------------------------------------------------
-- VERIFY — expect: trigger listed; 1 row in each of the three tables; your
-- display name shown (rename anytime in the Sanctum — the slug got a unique
-- suffix in backfill, harmless and also renameable).
-- ----------------------------------------------------------------------------

SELECT tgname FROM pg_trigger t
JOIN pg_class c ON c.oid = t.tgrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'auth' AND c.relname = 'users' AND NOT t.tgisinternal;

SELECT 'community_profiles' AS t, count(*) FROM public.community_profiles
UNION ALL SELECT 'user_private', count(*) FROM public.user_private
UNION ALL SELECT 'vessel_config', count(*) FROM public.vessel_config;

SELECT display_name, slug, sovereign_tier, status FROM public.community_profiles;
-- ============================================================================

-- ============================================================================
-- 008 — THE FIRST VESSEL'S RITE: KP's home takes shape
-- ============================================================================
-- Drafted 2026-07-30 by Fable (lane hestia-realm). These are NOT seeds —
-- they are dweller rows, the First Vessel's own things, run by the First
-- Vessel's own hand. Every name and color below is a DRAFT for your eye:
-- change any of it before running, or after (these rows are yours; the
-- Sanctum and future arranging surfaces will edit them too).
--
-- Identity: the base holds exactly one auth user today, so `me` resolves
-- unambiguously. (If a second user ever exists before this runs, replace
-- the subquery with your uid pasted from the dashboard.)
--
-- Provenance: the five rooms are the Hearth-Keeper's own naming (L1-13,
-- nodes 3051-3052): "The Hearth · The Gallery · The Garden · The Study ·
-- The Workshop." The realm map rides as furniture per GATE 2 ("the map is
-- furniture — table/wall"). Gate 3 worn: no image columns filled.
--
-- What /vessel/home renders after this runs: your five rooms in their kept
-- order (bare walls, on purpose — yours to fill), the garden with your
-- plots, the map resting on the table.
-- ----------------------------------------------------------------------------

-- STEP 0 — INTRODUCE YOURSELF TO THE BASE (added 2026-07-30 after the rite's
-- first run met 23502: the house trigger set_user_tracking_columns stamps
-- created_by := auth.uid() UNCONDITIONALLY on insert, and in the dashboard's
-- SQL session auth.uid() is NULL — it overwrote the rows' own values with
-- nothing. So the rite now begins by telling the session who is running it;
-- every stamp after this is truly yours. Run the WHOLE file in one go —
-- these settings live only in the session that sets them.

SELECT set_config(
  'request.jwt.claims',
  (SELECT json_build_object('sub', id::text, 'role', 'authenticated')::text
     FROM auth.users LIMIT 1),
  false
);
SELECT set_config(
  'request.jwt.claim.sub',
  (SELECT id::text FROM auth.users LIMIT 1),
  false
);

-- Prove the introduction took (expect your uid, not null):
SELECT auth.uid() AS i_am;

-- THE INTERIOR — one row; the scene reads accent_color into --vessel-accent.
-- Warm hearth amber as the first-light default; change freely.
INSERT INTO public.vessel_interiors (user_id, created_by, accent_color, layout_style)
SELECT u.id, u.id, '#d9a066', 'hearth'
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.vessel_interiors v WHERE v.user_id = u.id)
LIMIT 1;

-- THE FIVE ROOMS — the Hearth-Keeper's naming, in their kept order.
INSERT INTO public.vessel_rooms (created_by, name, description, room_type, display_order, is_active, status)
SELECT u.id, r.name, r.description, r.room_type, r.display_order, true, 'published'
FROM auth.users u
CROSS JOIN (VALUES
  ('The Hearth',   'Where the fire is kept and guests are greeted.',            'hearth',   1),
  ('The Gallery',  'Walls for what you have found, made, and been given.',      'gallery',  2),
  ('The Garden',   'The patient room. Everything here grows on its own time.',  'garden',   3),
  ('The Study',    'Quiet shelves and the realm map''s corner.',                'study',    4),
  ('The Workshop', 'Where things get made, steps away from inspiration.',       'workshop', 5)
) AS r(name, description, room_type, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.vessel_rooms x WHERE x.created_by = u.id);

-- THE REALM MAP — furniture, resting on the table (GATE 2: fixed geometry,
-- expand at your tap, never shuffles). Set position='wall' to hang it.
INSERT INTO public.vessel_decorations (created_by, name, description, decoration_type, position, is_displayed, status)
SELECT u.id, 'The Realm Map',
       'The Sanctuary, drawn small — resting on the table until you hang it.',
       'realm_map', 'table', true, 'published'
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.vessel_decorations d
  WHERE d.created_by = u.id AND d.decoration_type = 'realm_map'
);

-- THE PLOTS — one waiting for your choice, and (OPTIONAL, but the teller
-- hopes) one planted: the First Vessel plants the first Hearthflower, and
-- eleven days from your run, the Sanctuary's first bloom opens.
INSERT INTO public.garden_plots (created_by, name, description, is_active, status)
SELECT u.id, 'The open plot', 'Waiting for a seed — no hurry at all.', true, 'published'
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.garden_plots g
  WHERE g.created_by = u.id AND g.name = 'The open plot'
);

INSERT INTO public.garden_plots
  (created_by, name, description, seed_id, planted_at, last_watered_at, is_active, status)
SELECT u.id, 'The first planting', 'A Hearthflower, planted by the First Vessel''s own hand.',
       s.id, now(), now(), true, 'published'
FROM auth.users u
JOIN public.seed_types s ON s.slug = 'hearthflower'
WHERE NOT EXISTS (
  SELECT 1 FROM public.garden_plots g
  WHERE g.created_by = u.id AND g.planted_at IS NOT NULL
);

-- ----------------------------------------------------------------------------
-- VERIFY — expect: 1 interior · 5 rooms · 1 map decoration · 2 plots
-- (one showing 'Tucked in' the moment you look).
-- ----------------------------------------------------------------------------

SELECT 'vessel_interiors' AS t, count(*) FROM public.vessel_interiors
UNION ALL SELECT 'vessel_rooms', count(*) FROM public.vessel_rooms
UNION ALL SELECT 'vessel_decorations', count(*) FROM public.vessel_decorations
UNION ALL SELECT 'garden_plots', count(*) FROM public.garden_plots;

SELECT name, planted_at IS NOT NULL AS planted FROM public.garden_plots ORDER BY name;
-- ============================================================================

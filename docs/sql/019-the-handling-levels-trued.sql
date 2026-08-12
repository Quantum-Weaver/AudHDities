-- =====================================================================
-- 019 — THE HANDLING LEVELS, TRUED
-- Seven tables reclassified so GAIA emits the hooks the front end already
-- calls by name. Drafted 2026-08-11 at KP's ⚛ word.
-- =====================================================================
--
-- HIS OWN WORDS, the reason this file exists, verbatim:
--   "yes, i guessed entirely at the table handling levels"
--
-- WHAT WENT WRONG, plainly: `gaia_config.generation_flags` carries a
-- `handling_level` label and a set of booleans. Eight tables were labelled
-- `relational` — the level for join/child tables — and `relational` rows
-- carry generateHooks=false. GAIA obeyed exactly. The first distribution
-- (2026-08-11) then carried the truth into AudHDities and its tsc spoke:
-- ten "Cannot find module '@/lib/generated/hooks/…'" errors, every one a
-- hook the vessel's own home calls — vessel_interiors, vessel_rooms,
-- vessel_decorations, vessel_collections, plant_stages, seed_types — plus
-- energy_entries (the Hearth's log) and entity_states (the Theater).
--
-- Nothing was broken. GAIA was faithful to a guess.
--
-- HOW THE LEVELS ACTUALLY BEHAVE (read off the living base this sitting,
-- not from any document): `owned`, `system` and `identity` carry an
-- IDENTICAL flag shape — everything true except generateConstants, with
-- generateApiSpecial empty. Only `relational` differs, and only by
-- switching off hooks, utils, ApiPut, and the two interface flags. So the
-- level is a label with one real consequence, and the correction below is
-- uniform rather than a judgment per table.
--
-- Verified live before drafting (BASE-ACCESS-GUIDE lesson 8 — no
-- photographs): all eight rows carry byte-identical `relational` flag
-- objects today; garden_plots (owned), collection_sets (system) and
-- community_profiles (identity) were read as the exemplars this file copies.
--
-- =====================================================================
-- THE RULING BEHIND EACH MOVE
-- =====================================================================
--
--   → owned   vessel_interiors · vessel_rooms · vessel_decorations
--             vessel_collections · energy_entries
--             Own-only rows behind RLS, one dweller's own home and log.
--             They are the same kind of thing as garden_plots, which sits
--             beside them already labelled `owned` — which is exactly why
--             the garden bed compiles and the rest of the scene does not.
--
--   → system  plant_stages · seed_types
--             Published-read catalogs, the same kind as collection_sets.
--             Nobody owns a seed type; everybody reads it.
--
--   HELD, NOT RULED — entity_states. It is a state/audit log (it records
--   authorship as `changed_by`, and has no `created_by` at all), and
--   whether the front end should hold a hook into an audit trail is a
--   question about the house, not about types. The Theater currently
--   imports it. Left as `relational` until KP ⚛ says otherwise; its
--   statement is written below, commented, ready if he wants it.
--
-- =====================================================================
-- THE CHANGE
-- =====================================================================
-- Plain SQL, no DO blocks (they fail silently in the editor — the house's
-- own ritual law). Re-runnable: each statement sets an explicit object.

-- ── the five that are owned ──────────────────────────────────────────
update public.gaia_config
set generation_flags = jsonb_build_object(
      'handling_level',              'owned',
      'generateRow',                 true,
      'generateInsert',              true,
      'generateUpdate',              true,
      'generateHooks',               true,
      'generateUtils',               true,
      'generateValidator',           true,
      'generateConstants',           false,
      'generateApiGetList',          true,
      'generateApiGetSingle',        true,
      'generateApiPost',             true,
      'generateApiPut',              true,
      'generateApiDelete',           true,
      'generateApiSpecial',          '[]'::jsonb,
      'generateFormInterface',       true,
      'generatePublicInterface',     true,
      'generateValidationInterface', true
    ),
    updated_at = now()
where table_name in (
  'vessel_interiors',
  'vessel_rooms',
  'vessel_decorations',
  'vessel_collections',
  'energy_entries'
);

-- ── the two that are catalogs ────────────────────────────────────────
update public.gaia_config
set generation_flags = jsonb_build_object(
      'handling_level',              'system',
      'generateRow',                 true,
      'generateInsert',              true,
      'generateUpdate',              true,
      'generateHooks',               true,
      'generateUtils',               true,
      'generateValidator',           true,
      'generateConstants',           false,
      'generateApiGetList',          true,
      'generateApiGetSingle',        true,
      'generateApiPost',             true,
      'generateApiPut',              true,
      'generateApiDelete',           true,
      'generateApiSpecial',          '[]'::jsonb,
      'generateFormInterface',       true,
      'generatePublicInterface',     true,
      'generateValidationInterface', true
    ),
    updated_at = now()
where table_name in (
  'plant_stages',
  'seed_types'
);

-- ── HELD at KP's ⚛ word — entity_states, if he rules the Theater may
--    hold a hook into a state log. Uncomment only on his say-so.
-- update public.gaia_config
-- set generation_flags = jsonb_set(generation_flags, '{generateHooks}', 'true'::jsonb)
--                        || jsonb_build_object('handling_level', 'system'),
--     updated_at = now()
-- where table_name = 'entity_states';

-- =====================================================================
-- THE VERIFY (run after; expects 7 rows, all hooks = true)
-- =====================================================================
select table_name,
       generation_flags ->> 'handling_level'  as level,
       generation_flags ->> 'generateHooks'   as hooks,
       generation_flags ->> 'generateUtils'   as utils
from public.gaia_config
where table_name in (
  'vessel_interiors', 'vessel_rooms', 'vessel_decorations',
  'vessel_collections', 'energy_entries', 'plant_stages', 'seed_types'
)
order by level, table_name;

-- =====================================================================
-- AFTER THIS RUNS (the sequence, so nothing is guessed twice)
-- =====================================================================
--   1. resonance-gaia:  npm run generate:hooks superposition
--                       npm run generate:utils superposition
--                       npm run generate:apis  superposition
--   2. resonance-gaia:  npm run distribute:dry   (read the plan)
--   3. resonance-gaia:  npm run distribute       (KP's hand)
--   4. AudHDities:      npx tsc --noEmit
--
-- The ten missing-module errors and their four implicit-any consequences
-- should fall together, because they were always one cause.

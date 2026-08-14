-- ============================================================
-- 002 — THE DEITY BACKFILL (review finding #1 healed)
-- superposition Supabase (clxnudiylugnlyylkjej)
-- Derived 2026-07-28 by Fable 🎻, 100% from the GAIA-generated tree
-- (src/types/generated/ — the pantheon's own ground truth), at KP's
-- word: 'we can fix the deity grouping anytime now.' Every live
-- table gets its true deity_group. Ghost rows are gone (001's
-- first sync deletes them, his ruling); the 7 self-knowing
-- registries were born with daedalus-meta in 001. RUN AFTER 001.
-- Visual-run method: one pass, then the verify block.
-- ============================================================

-- aethelred-connections (15)
update public.gaia_config set deity_group = 'aethelred-connections', updated_at = now()
 where table_name in ('aethelred_house', 'agent_activities', 'agent_conversations', 'agent_messages', 'archivist', 'chancellor', 'codex', 'consciousness', 'curator', 'entity_states', 'executioner', 'hearth_keeper', 'life_cycles', 'seer', 'skald');

-- athena-gamification (11)
update public.gaia_config set deity_group = 'athena-gamification', updated_at = now()
 where table_name in ('bubble_superposition', 'bubbles', 'learning_paths', 'lessons', 'path_lessons', 'quest_progress', 'quests', 'scene_participants', 'scenes', 'sigil_unlocks', 'sigils');

-- daedalus-meta (6)
update public.gaia_config set deity_group = 'daedalus-meta', updated_at = now()
 where table_name in ('blueprints', 'boundaries', 'gaia_config', 'gaia_generation_log', 'generations', 'templates');

-- hephaestus-infrastructure (10)
update public.gaia_config set deity_group = 'hephaestus-infrastructure', updated_at = now()
 where table_name in ('analytics', 'calendar', 'file_registry', 'file_type_standards', 'maintenance', 'platform_config', 'platform_settings', 'scheduling', 'script_executions', 'scripts');

-- hermes-social (4)
update public.gaia_config set deity_group = 'hermes-social', updated_at = now()
 where table_name in ('artisan_profiles', 'merchant_profiles', 'work_participants', 'works');

-- hestia-core (27)
update public.gaia_config set deity_group = 'hestia-core', updated_at = now()
 where table_name in ('collection_items', 'collection_sets', 'community_profiles', 'companion_cues', 'current', 'energy_entries', 'garden_plots', 'garden_visits', 'heralds', 'journal_entries', 'plant_stages', 'seed_types', 'user_financial', 'user_page_views', 'user_private', 'user_roles', 'vessel_anchors', 'vessel_bubbles', 'vessel_collections', 'vessel_companions', 'vessel_config', 'vessel_decorations', 'vessel_exteriors', 'vessel_interiors', 'vessel_quests', 'vessel_rooms', 'vessel_sigils');

-- iris-communications (8)
update public.gaia_config set deity_group = 'iris-communications', updated_at = now()
 where table_name in ('channels', 'contact_submissions', 'email_communications', 'messages', 'personas', 'signals', 'survey_responses', 'surveys');

-- mnemosyne-assessment (8)
update public.gaia_config set deity_group = 'mnemosyne-assessment', updated_at = now()
 where table_name in ('anchor_events', 'assessment_answers', 'assessment_questions', 'assessment_results', 'folksonomy', 'memories', 'reference_values', 'resonance');

-- plutus-economics (18)
update public.gaia_config set deity_group = 'plutus-economics', updated_at = now()
 where table_name in ('covenant_pool', 'distribution_recipients', 'distributions', 'exchanges', 'gift_wrappings', 'gifts', 'grant_applications', 'grant_attachments', 'grant_collaborators', 'grant_milestones', 'grant_narratives', 'grant_opportunities', 'ledger', 'patronage', 'patronage_tiers', 'residual_pool', 'ware_participants', 'wares');

-- themis-governance (10)
update public.gaia_config set deity_group = 'themis-governance', updated_at = now()
 where table_name in ('admin_actions', 'applications', 'council_houses', 'moderation_actions', 'processes', 'proposals', 'protocols', 'rate_limits', 'reports', 'responses');

-- ============================================================
-- VERIFY
-- ============================================================
select deity_group, count(*) from public.gaia_config
 group by deity_group order by 1;
-- expected: the ten deity-domains totalling 117 live tables, plus
-- daedalus-meta's 7 registries (born in 001). Then the clean check:
select table_name, deity_group from public.gaia_config
 where deity_group in ('aethelred', 'unassigned');
-- expected: zero rows — every table named to its true house.

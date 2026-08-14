// @/config/deity_groups.ts
// Deity-based table grouping for the Sovereign Sanctuary
// Complete catalog — every table assigned to its deity domain.
//
// Recatalogued 2026-07-18 (KP's word, the reconciliation campaign): the map
// predated the schema evolution — dead tables (profiles, energy_logs,
// notifications, badges, products, sales…) removed, all 151 live tables
// assigned, and the miscategorizations named at the section walk corrected
// (Linnean ranks to Mnemosyne, the marketplace out of core, the vessel
// experience homed at the hearth). Two placements flagged inline for KP's
// eye rather than settled silently.
//
// Recatalogued again 2026-07-29 (the finishing session, mend law): THE
// SUPERPOSITION REVIEW (151→117 by KP's hand) retired 34 tables — the
// Linnean ladder, the knowledge lexicon set (taxonomy/etymology/sensory_
// lexicon…, now the Grammar base's country), the Iris localization set,
// the five *_connection tables (the integrations consolidation's ground),
// categories/artisan_category_links/mythology/patterns/mind_traits/
// test_patterns/generation_templates. Their references are removed here so
// the map matches the base that knows itself; all 117 live tables remain
// assigned, none orphaned (verified by diff against database.types.ts).
//
// 2026-07-30: mythology RETURNED at KP's word (the drop was for emptiness,
// not wrongness — "it belongs here i think") and is re-listed under Athena,
// its hall. Lesson from its first regen: an unmapped table falls to the
// hestia-core catchall — when a table is born or returns, this map is part
// of the same sitting's work.
//
// 2026-07-31 (KP's word, the gaia-patterns sitting): the seven self-knowing
// registry tables (columns/policies/functions/triggers/indexes/enums/
// composite_types) join DAEDALUS here, matching their standing assignment in
// the base's own gaia_config (deity_group daedalus-meta, 13 tables). The
// generation pieces' home is src/config/daedalus/ (his word, same sitting).
// The votes flag RESOLVED the same day, KP's word: "themis gets votes" —
// listed under Themis below; the matching one-line UPDATE for gaia_config
// rides his dashboard (deity_group = 'themis-governance').

import type { PublicTableNames, PublicViewNames } from '@/types/supabase/database.helpers';

export interface DeityGroup {
  name: string;
  domain: string;
  sequence: number;
  folderName: string;
  description: string;
  tables: PublicTableNames[];
  views?: PublicViewNames[];
}

export const DEITY_GROUPS: DeityGroup[] = [
  // ════════════════════════════════════════════════════════════════════════
  // HESTIA — Core Identity & the Vessel's Home (Sequence 1)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'hestia',
    domain: 'core',
    sequence: 1,
    folderName: 'hestia-core',
    description:
      'Core identity and the personal hearth — the sovereign self, its journal, energy, heralds, and the vessel experience (home, garden, companions)',
    tables: [
      // the sovereign self
      'community_profiles',
      'user_private',
      'user_financial',
      'user_roles',
      'vessel_config',
      'current',
      'user_page_views',
      // the hearth's daily life
      'journal_entries',
      'energy_entries',
      'heralds',
      // the vessel experience (Animal-Crossing hearth — schema ready, story excavated)
      'vessel_anchors',
      'vessel_bubbles',
      'vessel_collections',
      'vessel_companions',
      'vessel_decorations',
      'vessel_exteriors',
      'vessel_interiors',
      'vessel_quests',
      'vessel_rooms',
      'vessel_sigils',
      'collection_items',
      'collection_sets',
      'companion_cues',
      'garden_plots',
      'garden_visits',
      'plant_stages',
      'seed_types',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // PLUTUS — Economics (Sequence 2)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'plutus',
    domain: 'economics',
    sequence: 2,
    folderName: 'plutus-economics',
    description:
      'Economic engine — wares, exchanges, patronage, pools, ledger, gifts, and the grant system',
    tables: [
      'wares',
      'ware_participants',
      'exchanges',
      'patronage',
      'patronage_tiers',
      'covenant_pool',
      'residual_pool',
      'ledger',
      'distributions',
      'distribution_recipients',
      // gifts sit with the money mechanics (a gift wraps a ware);
      // if they belong with Iris's appreciation flows instead, say the word
      'gifts',
      'gift_wrappings',
      'grant_opportunities',
      'grant_applications',
      'grant_attachments',
      'grant_collaborators',
      'grant_milestones',
      'grant_narratives',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // HERMES — The Bazaar's Creative Face (Sequence 3)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'hermes',
    domain: 'social',
    sequence: 3,
    folderName: 'hermes-social',
    description:
      'The Bazaar — creative works, artisans, and merchants',
    tables: [
      'works',
      'work_participants',
      'artisan_profiles',
      'merchant_profiles',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // ATHENA — Gamification & Learning (Sequence 4)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'athena',
    domain: 'gamification',
    sequence: 4,
    folderName: 'athena-gamification',
    description:
      'The Library — quests, sigils (the badge successor), bubbles, learning paths, and the stage scenes',
    tables: [
      'quests',
      'quest_progress',
      'sigils',
      'sigil_unlocks',
      'bubbles',
      'bubble_superposition',
      'lessons',
      'learning_paths',
      'path_lessons',
      // returned at KP's word 2026-07-29 (dropped 07-28 for emptiness only);
      // the Archive is Athena's hall — docs/sql/005-mythology-returns.sql
      'mythology',
      // scenes may someday deserve a prometheus-creative group of their own
      // (Stage & Studio's tables) — kept here until KP calls that birth,
      // since a new folderName moves generated routes
      'scenes',
      'scene_participants',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // MNEMOSYNE — Assessment, Memory & Taxonomy (Sequence 5)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'mnemosyne',
    domain: 'assessment',
    sequence: 5,
    folderName: 'mnemosyne-assessment',
    description:
      'The Observatory — the Acid Test, memories, resonance, and the folksonomy (the knowledge lexicon and Linnean ladder now live in the Grammar base, per the Superposition Review)',
    tables: [
      'assessment_questions',
      'assessment_answers',
      'assessment_results',
      'memories',
      'anchor_events',
      'resonance',
      'folksonomy',
      'reference_values',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // THEMIS — Governance (Sequence 6)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'themis',
    domain: 'governance',
    sequence: 6,
    folderName: 'themis-governance',
    description:
      'The Council Chamber — proposals, responses, applications, moderation, houses, processes, protocols',
    tables: [
      'applications',
      'proposals',
      'responses',
      'reports',
      'moderation_actions',
      'admin_actions',
      'council_houses',
      'processes',
      'protocols',
      'rate_limits',
      // discovered by gaia_sync 2026-07-31, assigned by KP's word the same
      // day: "themis gets votes" — the Council counts them
      'votes',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // IRIS — Communications (Sequence 7)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'iris',
    domain: 'communications',
    sequence: 7,
    folderName: 'iris-communications',
    description:
      'The Bridge — messages, channels, signals, personas, surveys, contact',
    tables: [
      'messages',
      'channels',
      'signals',
      'personas',
      'contact_submissions',
      'email_communications',
      'surveys',
      'survey_responses',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // HEPHAESTUS — Infrastructure (Sequence 8)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'hephaestus',
    domain: 'infrastructure',
    sequence: 8,
    folderName: 'hephaestus-infrastructure',
    description:
      'The Forge — files, platform configuration, scheduling, analytics, maintenance, scripts',
    tables: [
      'file_type_standards',
      'file_registry',
      'platform_config',
      'platform_settings',
      'scheduling',
      'calendar',
      'analytics',
      'maintenance',
      'scripts',
      'script_executions',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // AETHELRED — Connections & the Council's Seats (Sequence 9)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'aethelred',
    domain: 'connections',
    sequence: 9,
    folderName: 'aethelred-connections',
    description:
      'The Nexus — consciousness, the eight seat tables, agents, entity states (the per-platform *_connection tables retired in the Superposition Review; the integrations consolidation will give this group its successor table when it lands)',
    tables: [
      'consciousness',
      'aethelred_house',
      // the eight archetypal seats (the ninth chair is Aethelred himself)
      'hearth_keeper',
      'chancellor',
      'seer',
      'curator',
      'archivist',
      'skald',
      'codex',
      'executioner',
      'agent_activities',
      'agent_conversations',
      'agent_messages',
      'entity_states',
      'life_cycles',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // DAEDALUS — Meta (Sequence 10)
  // (Renamed 2026-07-07 from "prometheus" — Prometheus is the creative-arts
  //  domain: Stage + Studio. This is the meta-generator, the engine that builds.)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'daedalus',
    domain: 'meta',
    sequence: 10,
    folderName: 'daedalus-meta',
    description:
      'Meta-system — blueprints, generations, templates, boundaries, and GAIA itself',
    tables: [
      'blueprints',
      'generations',
      'templates',
      'boundaries',
      'gaia_config',
      'gaia_generation_log',
      // the self-knowing registries (added 2026-07-31 at KP's word,
      // matching the base's own daedalus-meta assignment — the schema
      // tables that let the base introduce itself)
      'columns',
      'policies',
      'functions',
      'triggers',
      'indexes',
      'enums',
      'composite_types',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // PROMETHEUS — The Stage & Studio (Sequence 11)
  // (The seat this file kept free since 2026-07-07 — "Prometheus is the
  //  creative-arts domain." Born ground ruled by KP 2026-07-31, Door A:
  //  docs/STAGE-GROUND-DECISION.md · docs/sql/003-the-stage-ground.sql.
  //  scenes stays in athena per the double-earmark until KP rules otherwise.)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'prometheus',
    domain: 'stage',
    sequence: 11,
    folderName: 'prometheus-stage',
    description:
      'The Stage & Studio — live performances, scheduled events, and recordings that hand into the Bazaar as works',
    tables: [
      'events',
    ],
  },
];

// ============================================================================
// TYPE-SAFE HELPER FUNCTIONS
// ============================================================================

export function getDeityGroupForTable(tableName: PublicTableNames): DeityGroup | undefined {
  return DEITY_GROUPS.find(group => group.tables.includes(tableName));
}

export function getDeityGroupForView(viewName: PublicViewNames): DeityGroup | undefined {
  return DEITY_GROUPS.find(group => group.views?.includes(viewName));
}

export function getFolderNameForTable(tableName: PublicTableNames): string | undefined {
  return getDeityGroupForTable(tableName)?.folderName;
}

export function getFolderNameForView(viewName: PublicViewNames): string | undefined {
  return getDeityGroupForView(viewName)?.folderName;
}

export function getAllTableNames(): PublicTableNames[] {
  return DEITY_GROUPS.flatMap(group => group.tables);
}

export function getAllViewNames(): PublicViewNames[] {
  return DEITY_GROUPS.flatMap(group => group.views || []);
}

export function getAllNames(): (PublicTableNames | PublicViewNames)[] {
  return [...getAllTableNames(), ...getAllViewNames()];
}

export function getDeityGroupsByTableCount(): DeityGroup[] {
  return [...DEITY_GROUPS].sort((a, b) => b.tables.length - a.tables.length);
}

export function getTablesWithoutGroup(allTables: PublicTableNames[]): PublicTableNames[] {
  const groupedTables = new Set(getAllTableNames());
  return allTables.filter(table => !groupedTables.has(table));
}

export function getViewsWithoutGroup(allViews: PublicViewNames[]): PublicViewNames[] {
  const groupedViews = new Set(getAllViewNames());
  return allViews.filter(view => !groupedViews.has(view));
}

export function getFolderNameForObject(name: PublicTableNames | PublicViewNames): string | undefined {
  return getFolderNameForTable(name as PublicTableNames) || getFolderNameForView(name as PublicViewNames);
}

export function isTable(name: string): name is PublicTableNames {
  return getAllTableNames().includes(name as PublicTableNames);
}

export function isView(name: string): name is PublicViewNames {
  return getAllViewNames().includes(name as PublicViewNames);
}

export type { PublicTableNames, PublicViewNames };

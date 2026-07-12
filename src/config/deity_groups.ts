// @/config/deity_groups.ts
// Deity-based table grouping for the Sovereign Sanctuary
// Complete catalog — every table and view assigned to its deity domain

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
  // HESTIA — Core Identity (Sequence 1)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'hestia',
    domain: 'core',
    sequence: 1,
    folderName: 'hestia-core',
    description: 'Core identity architecture — users, profiles, channels, journal, energy',
    tables: [
      'profiles',
      'user_private',
      'user_financial',
      'creator_profiles',
      'vendor_profiles',
      'community_profiles',
      'channels',
      'user_page_views',
      'journal_entries',
      'energy_logs',
    ],
    views: [
      'personalized_feed',
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
    description: 'Economic engine — products, sales, residuals, subscriptions, advertising',
    tables: [
      'products',
      'sales',
      'contributions',
      'residual_payouts',
      'residual_pool',
      'subscriptions',
      'transactions',
      'covenant_pool',
      'ledger',
      'disbursements',
      'payouts',
      'advertising',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // HERMES — Social (Sequence 3)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'hermes',
    domain: 'social',
    sequence: 3,
    folderName: 'hermes-social',
    description: 'Social engagement — posts, comments, reactions, messages, creative categories',
    tables: [
      'creative_categories',
      'creator_category_links',
      'posts',
      'comments',
      'replies',
      'reactions',
      'messages',
      'activity',
      'emeralds',
      'notifications',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // ATHENA — Gamification (Sequence 4)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'athena',
    domain: 'gamification',
    sequence: 4,
    folderName: 'athena-gamification',
    description: 'Gamification — quests, badges, bubbles, learning paths, mythology, scenes',
    tables: [
      'quests',
      'user_quests',
      'badges',
      'badge_award_triggers',
      'user_badges',
      'bubbles',
      'user_bubble_pops',
      'user_bubble_limits',
      'lessons',
      'learning_paths',
      'path_lessons',
      'progress',
      'mythology',
      'scenes',
      'scene_participants',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // MNEMOSYNE — Assessment (Sequence 5)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'mnemosyne',
    domain: 'assessment',
    sequence: 5,
    folderName: 'mnemosyne-assessment',
    description: 'Assessment and discovery — acid test, taxonomy, ontology, etymology',
    tables: [
      'acid_test_questions',
      'acid_test_answers',
      'acid_test_results',
      'taxonomy',
      'ontology',
      'folksonomy',
      'etymology',
      'superposition',
      'quantum_superposition',
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
    description: 'Governance and moderation — reports, logs, applications, protocols, rate limits',
    tables: [
      'applications',
      'reports',
      'moderation_actions',
      'admin_logs',
      'council_houses',
      'processes',
      'protocols',
      'rate_limits',
    ],
    views: [
      'public_transparency',
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
    description: 'Communications — localization, contact, surveys, email, personas, customs',
    tables: [
      'continents',
      'regions',
      'languages',
      'localization',
      'translations',
      'culturalization',
      'customs',
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
    description: 'Infrastructure and tools — file registry, settings, scheduling, systems, scripts, logs',
    tables: [
      'file_type_standards',
      'file_registry',
      'settings',
      'scheduling',
      'calendar',
      'analytics',
      'maintenance',
      'systems',
      'scripts',
      'script_execution_logs',
      'system_health_logs',
      'system_timeline_events',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // AETHELRED — Connections (Sequence 9)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'aethelred',
    domain: 'connections',
    sequence: 9,
    folderName: 'aethelred-connections',
    description: 'All-connecting architecture — integrations, council houses, consciousness, agent activities',
    tables: [
      'supabase_connection',
      'stripe_connection',
      'resend_connection',
      'vercel_connection',
      'github_connection',
      'audhdities_platform',
      'consciousness',
      'hearth_keeper',
      'chancellor',
      'seer',
      'aethelred_house',
      'curator',
      'archivist',
      'skald',
      'codex',
      'executioner',
      'agent_activities',
      'agent_conversations',
      'agent_messages',
      'entity_state_log',
      'life_cycles',
      'timelines',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // DAEDALUS — Meta (Sequence 10)
  // (Renamed 2026-07-07 from "prometheus" — Prometheus is now the creative-arts
  //  domain: Stage + Studio. This is the meta-generator, the engine that builds.)
  // ════════════════════════════════════════════════════════════════════════
  {
    name: 'daedalus',
    domain: 'meta',
    sequence: 10,
    folderName: 'daedalus-meta',
    description: 'Meta-system — blueprints, generations, memories, templates, patterns, boundaries, consciousness',
    tables: [
      'daedalus_blueprints',
      'daedalus_generations',
      'daedalus_memories',
      'daedalus_templates',
      'daedalus_patterns',
      'daedalus_boundaries',
      'daedalus_consciousness',
    ],
    views: [
      'daedalus_generation_stats',
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
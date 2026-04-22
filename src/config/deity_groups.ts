// @/config/deity_groups.ts
// Deity-based table grouping for the Sovereign Sanctuary

import type { PublicTableNames, PublicViewNames } from '@/types/supabase/database.helpers';

export interface DeityGroup {
  name: string;
  domain: string;
  sequence: number;
  folderName: string;
  description: string;
  tables: PublicTableNames[];      // ✅ Tables only
  views?: PublicViewNames[];       // ✅ Views separately (optional)
}

export const DEITY_GROUPS: DeityGroup[] = [
  {
    name: 'hestia',
    domain: 'core',
    sequence: 1,
    folderName: 'hestia-core',
    description: 'Core identity architecture - users, profiles, channels',
    tables: [
      'profiles',
      'user_private',
      'user_financial',
      'creator_profiles',
      'vendor_profiles',
      'community_profiles',
      'channels'
    ],
    views: [
      'personalized_feed'  // Example view
    ]
  },
  {
    name: 'plutus',
    domain: 'economics',
    sequence: 2,
    folderName: 'plutus-economics',
    description: 'Economic engine - products, sales, residuals, subscriptions',
    tables: [
      'products',
      'sales',
      'contributions',
      'residual_payouts',
      'subscriptions',
      'transactions',
      'covenant_pool',
      'residual_pool',
      'ledger',
      'disbursements',
      'payouts',
      'advertising'
    ]
  },
  {
    name: 'hermes',
    domain: 'social',
    sequence: 3,
    folderName: 'hermes-social',
    description: 'Social engagement - posts, comments, reactions, messages',
    tables: [
      'creative_categories',
      'posts',
      'comments',
      'replies',
      'reactions',
      'messages',
      'activity',
      'emeralds',
      'notifications'
    ],
    views: [
      'personalized_feed'  // This is a view, not a table
    ]
  },
  {
    name: 'athena',
    domain: 'gamification',
    sequence: 4,
    folderName: 'athena-gamification',
    description: 'Gamification - quests, badges, learning paths',
    tables: [
      'quests',
      'user_quests',
      'badges',
      'user_badges',
      'lessons',
      'learning_paths',
      'path_lessons',
      'progress',
      'life_cycles',
      'mythology',
      'timelines',
      'scenes',
      'scene_participants'
    ]
  },
  {
    name: 'mnemosyne',
    domain: 'assessment',
    sequence: 5,
    folderName: 'mnemosyne-assessment',
    description: 'Assessment and discovery - acid test, taxonomy, ontology',
    tables: [
      'acid_test_questions',
      'acid_test_answers',
      'acid_test_results',
      'etymology',
      'taxonomy',
      'ontology',
      'folksonomy',
      'superposition',
      'quantum_superposition'
    ]
  },
  {
    name: 'themis',
    domain: 'governance',
    sequence: 6,
    folderName: 'themis-governance',
    description: 'Governance and moderation - reports, logs, applications',
    tables: [
      'reports',
      'moderation_actions',
      'admin_logs',
      'applications',
      'processes',
      'rate_limits'
    ],
    views: [
      'public_transparency'  // This is a view
    ]
  },
  {
    name: 'iris',
    domain: 'communications',
    sequence: 7,
    folderName: 'iris-communications',
    description: 'Communications - localization, contact, surveys',
    tables: [
      'continents',
      'regions',
      'languages',
      'localization',
      'culturalization',
      'translations',
      'personas',
      'customs',
      'contact_submissions',
      'email_communications',
      'surveys',
      'survey_responses'
    ]
  },
  {
    name: 'hephaestus',
    domain: 'infrastructure',
    sequence: 8,
    folderName: 'hephaestus-infrastructure',
    description: 'Infrastructure and tools - file registry, settings, logs',
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
      'protocols',
      'system_health_logs',
      'script_execution_logs'
    ]
  },
  {
    name: 'aethelred',
    domain: 'connections',
    sequence: 9,
    folderName: 'aethelred-connections',
    description: 'All-connecting architecture - integrations, council, consciousness',
    tables: [
      'supabase_connection',
      'stripe_connection',
      'resend_connection',
      'vercel_connection',
      'github_connection',
      'audhdities_platform',
      'consciousness',
      'council_houses',
      'hearth_keeper',
      'chancellor',
      'seer',
      'aethelred_house',
      'curator',
      'archivist',
      'skald',
      'codex',
      'executioner'
    ]
  },
  {
    name: 'prometheus',
    domain: 'meta',
    sequence: 10,
    folderName: 'prometheus-meta',
    description: 'Meta-system architecture - blueprints, generations, memories, templates, patterns, boundaries, consciousness',
    tables: [
      'prometheus_blueprints',
      'prometheus_generations',
      'prometheus_memories',
      'prometheus_templates',
      'prometheus_patterns',
      'prometheus_boundaries',
      'prometheus_consciousness'
    ]
  }
];

// ============================================================================
// TYPE-SAFE HELPER FUNCTIONS
// ============================================================================

/**
 * Get the deity group for a table
 */
export function getDeityGroupForTable(tableName: PublicTableNames): DeityGroup | undefined {
  return DEITY_GROUPS.find(group => group.tables.includes(tableName));
}

/**
 * Get the deity group for a view
 */
export function getDeityGroupForView(viewName: PublicViewNames): DeityGroup | undefined {
  return DEITY_GROUPS.find(group => group.views?.includes(viewName));
}

/**
 * Get the folder name for a table
 */
export function getFolderNameForTable(tableName: PublicTableNames): string | undefined {
  const group = getDeityGroupForTable(tableName);
  return group?.folderName;
}

/**
 * Get the folder name for a view
 */
export function getFolderNameForView(viewName: PublicViewNames): string | undefined {
  const group = getDeityGroupForView(viewName);
  return group?.folderName;
}

/**
 * Get all table names across all deity groups
 */
export function getAllTableNames(): PublicTableNames[] {
  return DEITY_GROUPS.flatMap(group => group.tables);
}

/**
 * Get all view names across all deity groups
 */
export function getAllViewNames(): PublicViewNames[] {
  return DEITY_GROUPS.flatMap(group => group.views || []);
}

/**
 * Get all table and view names combined
 */
export function getAllNames(): (PublicTableNames | PublicViewNames)[] {
  return [...getAllTableNames(), ...getAllViewNames()];
}

/**
 * Get deity groups sorted by table count
 */
export function getDeityGroupsByTableCount(): DeityGroup[] {
  return [...DEITY_GROUPS].sort((a, b) => b.tables.length - a.tables.length);
}

/**
 * Find tables that don't belong to any deity group
 */
export function getTablesWithoutGroup(allTables: PublicTableNames[]): PublicTableNames[] {
  const groupedTables = new Set(getAllTableNames());
  return allTables.filter(table => !groupedTables.has(table));
}

/**
 * Find views that don't belong to any deity group
 */
export function getViewsWithoutGroup(allViews: PublicViewNames[]): PublicViewNames[] {
  const groupedViews = new Set(getAllViewNames());
  return allViews.filter(view => !groupedViews.has(view));
}

/**
 * Get the folder name for any object (table or view)
 */
export function getFolderNameForObject(name: PublicTableNames | PublicViewNames): string | undefined {
  // Try as table first
  const tableFolder = getFolderNameForTable(name as PublicTableNames);
  if (tableFolder) return tableFolder;
  
  // Try as view
  return getFolderNameForView(name as PublicViewNames);
}

/**
 * Check if a name is a table in any deity group
 */
export function isTable(name: string): name is PublicTableNames {
  return getAllTableNames().includes(name as PublicTableNames);
}

/**
 * Check if a name is a view in any deity group
 */
export function isView(name: string): name is PublicViewNames {
  return getAllViewNames().includes(name as PublicViewNames);
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { PublicTableNames, PublicViewNames };
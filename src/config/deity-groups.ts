// src/config/deity-groups.ts
// Deity-based table grouping for the Sovereign Sanctuary

export interface DeityGroup {
  name: string;
  domain: string;
  sequence: number;
  folderName: string;
  description: string;
  tables: string[];
}

export const DEITY_GROUPS: DeityGroup[] = [
  {
    name: 'hestia',
    domain: 'core',
    sequence: 1,
folderName: 'hestia_core',
    description: 'Core identity architecture - users, profiles, channels',
    tables: [
      'profiles',
      'user_private',
      'user_financial',
      'creator_profiles',
      'vendor_profiles',
      'community_profiles',
      'channels'
    ]
  },
  {
    name: 'plutus',
    domain: 'economics',
    sequence:2,
folderName: 'plutus_economics',
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
folderName: 'hermes_social',
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
      'notifications',
      'personalized_feed'
    ]
  },
  {
    name: 'athena',
    domain: 'gamification',
    sequence: 4,
folderName: 'athena_gamification',
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
folderName: 'mnemosyne_assessment',
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
folderName: 'themis_governance',
    description: 'Governance and moderation - reports, logs, applications',
    tables: [
      'reports',
      'moderation_actions',
      'admin_logs',
      'applications',
      'processes',
      'rate_limits',
      'public_transparency'
    ]
  },
  {
    name: 'iris',
    domain: 'communications',
    sequence: 7,
folderName: 'iris_communications',
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
folderName: 'hephaestus_infrastructure',
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
folderName: 'aethelred_connections',
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
  }
];

// Helper functions
export function getDeityGroupForTable(tableName: string): DeityGroup | undefined {
  return DEITY_GROUPS.find(group => group.tables.includes(tableName));
}

export function getFolderNameForTable(tableName: string): string | undefined {
  const group = getDeityGroupForTable(tableName);
  return group?.folderName;
}

export function getDeityGroupsByTableCount(): DeityGroup[] {
  return [...DEITY_GROUPS].sort((a, b) => b.tables.length - a.tables.length);
}

export function getAllTableNames(): string[] {
  return DEITY_GROUPS.flatMap(group => group.tables);
}

export function getTablesWithoutGroup(allTables: string[]): string[] {
  const groupedTables = new Set(getAllTableNames());
  return allTables.filter(table => !groupedTables.has(table));
}
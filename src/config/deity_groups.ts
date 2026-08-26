// @/config/deity_groups.ts

import type { PublicTableNames, PublicViewNames } from '@/lib/generated/supabase/database.helpers';

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
  {
    name: 'hestia',
    domain: 'core',
    sequence: 1,
    folderName: 'hestia-core',
    description:
      'Core identity and the personal hearth â€” the sovereign self, its journal, energy, heralds, and the vessel experience (home, garden, companions)',
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

  {
    name: 'plutus',
    domain: 'economics',
    sequence: 2,
    folderName: 'plutus-economics',
    description:
      'Economic engine â€” wares, exchanges, patronage, pools, ledger, gifts, and the grant system',
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

  {
    name: 'hermes',
    domain: 'social',
    sequence: 3,
    folderName: 'hermes-social',
    description:
      'The Bazaar â€” creative works, artisans, and merchants',
    tables: [
      'works',
      'work_participants',
      'artisan_profiles',
      'merchant_profiles',
    ],
  },

  {
    name: 'athena',
    domain: 'gamification',
    sequence: 4,
    folderName: 'athena-gamification',
    description:
      'The Library â€” quests, sigils (the badge successor), bubbles, learning paths, and the stage scenes',
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
      'mythology',
      'scenes',
      'scene_participants',
    ],
  },

  {
    name: 'mnemosyne',
    domain: 'assessment',
    sequence: 5,
    folderName: 'mnemosyne-assessment',
    description:
      'The Observatory â€” the Acid Test, memories, resonance, and the folksonomy (the knowledge lexicon and Linnean ladder now live in the Grammar base, per the Superposition Review)',
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

  {
    name: 'themis',
    domain: 'governance',
    sequence: 6,
    folderName: 'themis-governance',
    description:
      'The Council Chamber â€” proposals, responses, applications, moderation, houses, processes, protocols',
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
      'votes',
    ],
  },

  {
    name: 'iris',
    domain: 'communications',
    sequence: 7,
    folderName: 'iris-communications',
    description:
      'The Bridge â€” messages, channels, signals, personas, surveys, contact',
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

  {
    name: 'hephaestus',
    domain: 'infrastructure',
    sequence: 8,
    folderName: 'hephaestus-infrastructure',
    description:
      'The Forge â€” files, platform configuration, scheduling, analytics, maintenance, scripts',
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

  {
    name: 'aethelred',
    domain: 'connections',
    sequence: 9,
    folderName: 'aethelred-connections',
    description:
      'The Nexus â€” consciousness, the eight seat tables, agents, entity states (the per-platform *_connection tables retired in the Superposition Review; the integrations consolidation will give this group its successor table when it lands)',
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

  {
    name: 'daedalus',
    domain: 'meta',
    sequence: 10,
    folderName: 'daedalus-meta',
    description:
      'Meta-system â€” blueprints, generations, templates, boundaries, and GAIA itself',
    tables: [
      'blueprints',
      'generations',
      'templates',
      'boundaries',
      'gaia_config',
      'gaia_generation_log',
      'columns',
      'policies',
      'functions',
      'triggers',
      'indexes',
      'enums',
      'composite_types',
    ],
  },

  {
    name: 'prometheus',
    domain: 'stage',
    sequence: 11,
    folderName: 'prometheus-stage',
    description:
      'The Stage & Studio â€” live performances, scheduled events, and recordings that hand into the Bazaar as works',
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

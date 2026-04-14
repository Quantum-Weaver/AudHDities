// src/config/object-categories.ts
// ============================================================================
// OBJECT CATEGORIES - Single source of truth for all generation behavior
// ============================================================================
// Defines how each object should be handled by GAIA and COSMIC
// Merged with workflow_config.ts - no duplication
// ============================================================================

export type HandlingLevel = 
  | 'full_crud'           // Row + Insert + Update + Public + Form + Validation + API + Hooks + Utils
  | 'assessment'          // Row + Form + Submit/Results API
  | 'join_table'          // Row + Form + Link/Unlink API
  | 'read_only_view'      // Row only + GET API only
  | 'function'            // Args + Returns only + POST invoke API
  | 'type_enum'           // Type export only (from Database.public.Enums)
  | 'runtime_enum'        // Constant object + type export (from Constants.public.Enums)
  | 'composite'           // Skip generation
  | 'unknown';            // Needs review (generate everything as safe default)

export interface ObjectCategory {
  handlingLevel: HandlingLevel;
  
  // ===== Type file generation flags =====
  generateRow: boolean;
  generateInsert: boolean;
  generateUpdate: boolean;
  generatePublicInterface: boolean;
  generateFormInterface: boolean;
  generateValidationInterface: boolean;
  
  // ===== Constant file generation flags =====
  generateConstants: boolean;
  
  // ===== Validator generation flags =====
  generateValidator: boolean;
  
  // ===== API generation flags =====
  generateApiGetList: boolean;
  generateApiGetSingle: boolean;
  generateApiPost: boolean;
  generateApiPut: boolean;
  generateApiDelete: boolean;
  generateApiSpecial: string[];
  
  // ===== Utility generation flags =====
  generateUtils: boolean;
  
  // ===== Hook generation flags =====
  generateHooks: boolean;
  
  // ===== Staging and routing =====
  defaultFolder?: string;
  stagingBase?: string;
  apiBasePath?: string;
  notes?: string;
}

// ============================================================================
// DEFAULT CONFIGURATIONS BY HANDLING LEVEL
// ============================================================================

export const LEVEL_CONFIG: Record<HandlingLevel, ObjectCategory> = {
  full_crud: {
    handlingLevel: 'full_crud',
    // Types
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: true,
    generateFormInterface: true,
    generateValidationInterface: true,
    // Constants
    generateConstants: false,
    // Validator
    generateValidator: true,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: true,
    generateApiDelete: true,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: true,
    generateHooks: true,
    notes: 'Full CRUD operations with all interfaces, API routes, utils, and hooks'
  },
  
  assessment: {
    handlingLevel: 'assessment',
    // Types
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: false,
    generateFormInterface: true,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // Validator
    generateValidator: true,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: ['submit', 'results'],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    notes: 'Assessment data - form interface only, with submit/results API'
  },
  
  join_table: {
    handlingLevel: 'join_table',
    // Types
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: false,
    generateFormInterface: true,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // Validator
    generateValidator: true,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: true,
    generateApiSpecial: ['link', 'unlink'],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    notes: 'Join/link table - foreign key references with link/unlink API'
  },
  
  read_only_view: {
    handlingLevel: 'read_only_view',
    // Types
    generateRow: true,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: true,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // Validator
    generateValidator: false,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    notes: 'Read-only view - no write operations, GET API only'
  },
  
  function: {
    handlingLevel: 'function',
    // Types
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // Validator
    generateValidator: false,
    // API
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: ['invoke'],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Database function - POST invoke API only'
  },
  
  type_enum: {
    handlingLevel: 'type_enum',
    // Types
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // Validator
    generateValidator: false,
    // API
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Type-only enum from Database.public.Enums'
  },
  
  runtime_enum: {
    handlingLevel: 'runtime_enum',
    // Types
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: true,
    // Validator
    generateValidator: false,
    // API
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Runtime enum from Constants.public.Enums'
  },
  
  composite: {
    handlingLevel: 'composite',
    // Types
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // Validator
    generateValidator: false,
    // API
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    notes: 'Composite type - skip generation'
  },
  
  unknown: {
    handlingLevel: 'unknown',
    // Types
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: true,
    generateFormInterface: true,
    generateValidationInterface: true,
    // Constants
    generateConstants: false,
    // Validator
    generateValidator: true,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: true,
    generateApiDelete: true,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: true,
    generateHooks: true,
    notes: 'Unknown type - generate everything as safe default'
  }
};

// ============================================================================
// PATTERN-BASED CATEGORIZATION (No manual table lists)
// ============================================================================

/**
 * Determine handling level based on table name patterns
 * This covers ALL tables without needing to list each one
 */
export function getHandlingLevelByPattern(tableName: string): HandlingLevel {
  // Assessment tables
  if (tableName.startsWith('acid_test_')) {
    return 'assessment';
  }
  
  // Join/link tables
  const joinPatterns = [
    '_profiles',           // creator_profiles, vendor_profiles, community_profiles
    'user_quests',
    'user_badges',
    'contributions',
    'subscriptions',
  ];
  
  for (const pattern of joinPatterns) {
    if (tableName.includes(pattern) || tableName === pattern) {
      return 'join_table';
    }
  }
  
  // Read-only views (these are views, not tables, but included for completeness)
  const viewPatterns = [
    'personalized_feed',
    'public_transparency',
    'my_residuals',
  ];
  
  for (const pattern of viewPatterns) {
    if (tableName === pattern) {
      return 'read_only_view';
    }
  }
  
  // Default: all other tables are full_crud
  return 'full_crud';
}

/**
 * Get handling level for a table (with manual override option)
 */
export function getTableHandlingLevel(tableName: string): HandlingLevel {
  // Manual overrides for exceptions (only a few, not all tables)
  const overrides: Record<string, HandlingLevel> = {
    // If any table needs non-default handling, list it here
    // Example: 'legacy_table': 'read_only_view',
  };
  
  if (overrides[tableName]) {
    return overrides[tableName];
  }
  
  return getHandlingLevelByPattern(tableName);
}


// ============================================================================
// DEITY RESOLUTION (using deity_groups.ts)
// ============================================================================

import { getFolderNameForTable, DEITY_GROUPS } from './deity_groups.js';

/**
 * Get deity folder for any object based on table association
 */
export function getDeityFolderForObject(
  objectType: 'table' | 'view' | 'function' | 'type_enum' | 'runtime_enum',
  objectName: string,
  associatedTable?: string
): string {
  // If associated table provided, use it
  if (associatedTable) {
    const folder = getFolderNameForTable(associatedTable);
    if (folder) return folder;
  }
  
  // For tables, direct lookup
  if (objectType === 'table') {
    const folder = getFolderNameForTable(objectName);
    if (folder) return folder;
  }
  
  // For views and functions, try to derive from name pattern
  if (objectType === 'view' || objectType === 'function') {
    // Try to find a matching table by name
    for (const group of DEITY_GROUPS) {
      for (const table of group.tables) {
        if (objectName.includes(table) || table.includes(objectName)) {
          return group.folderName;
        }
      }
    }
  }
  
  // For enums, will be resolved by reference in tables
  // Default fallback
  return 'hestia-core';
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get full category config for a table
 */
export function getTableCategory(tableName: string): ObjectCategory {
  const level = getTableHandlingLevel(tableName);
  return LEVEL_CONFIG[level];
}

/**
 * Get handling level for a view
 */
export function getViewHandlingLevel(viewName: string): HandlingLevel {
  return 'read_only_view';
}

/**
 * Get handling level for a function
 */
export function getFunctionHandlingLevel(functionName: string): HandlingLevel {
  return 'function';
}

/**
 * Get handling level for an enum (type-level)
 */
export function getTypeEnumHandlingLevel(enumName: string): HandlingLevel {
  return 'type_enum';
}

/**
 * Get handling level for an enum (runtime)
 */
export function getRuntimeEnumHandlingLevel(enumName: string): HandlingLevel {
  return 'runtime_enum';
}

/**
 * Get category config for any object based on type and name
 */
export function getObjectCategory(
  objectType: 'table' | 'view' | 'function' | 'type_enum' | 'runtime_enum',
  objectName: string
): ObjectCategory {
  switch (objectType) {
    case 'table':
      return getTableCategory(objectName);
    case 'view':
      return LEVEL_CONFIG[getViewHandlingLevel(objectName)];
    case 'function':
      return LEVEL_CONFIG[getFunctionHandlingLevel(objectName)];
    case 'type_enum':
      return LEVEL_CONFIG[getTypeEnumHandlingLevel(objectName)];
    case 'runtime_enum':
      return LEVEL_CONFIG[getRuntimeEnumHandlingLevel(objectName)];
    default:
      return LEVEL_CONFIG.unknown;
  }
}

/**
 * Check if a table needs API routes
 */
export function needsApiRoutes(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateApiGetList || category.generateApiGetSingle || 
         category.generateApiPost || category.generateApiPut || 
         category.generateApiDelete || category.generateApiSpecial.length > 0;
}

/**
 * Check if a table needs validators
 */
export function needsValidators(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateValidator;
}

/**
 * Check if a table needs utilities
 */
export function needsUtils(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateUtils;
}

/**
 * Check if a table needs hooks
 */
export function needsHooks(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateHooks;
}

/**
 * Check if a table needs type generation
 */
export function needsTypeGeneration(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateRow || category.generateInsert || category.generateUpdate;
}

/**
 * Check if an enum needs constant generation
 */
export function needsConstantGeneration(enumName: string): boolean {
  const category = getObjectCategory('runtime_enum', enumName);
  return category.generateConstants;
}
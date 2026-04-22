// src/config/object-categories.ts
// ============================================================================
// OBJECT CATEGORIES - Single source of truth for all generation behavior
// ============================================================================
// Defines how each object should be handled by GAIA and COSMIC
// Merged with workflow_config.ts - no duplication
// ============================================================================

import { ENUM_MAPPING, getEnumFolder } from './enum_mapping.js';
import { getFolderNameForTable, getFolderNameForView, DEITY_GROUPS } from './deity_groups.js';
import type { PublicTableNames, PublicViewNames, PublicEnumNames } from '@/types/supabase/database.helpers.js';

// ============================================================================
// TYPE IMPORTS (unchanged)
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
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: true,
    generateFormInterface: true,
    generateValidationInterface: true,
    generateConstants: false,
    generateValidator: true,
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: true,
    generateApiDelete: true,
    generateApiSpecial: [],
    generateUtils: true,
    generateHooks: true,
    notes: 'Full CRUD operations with all interfaces, API routes, utils, and hooks'
  },
  
  assessment: {
    handlingLevel: 'assessment',
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: false,
    generateFormInterface: true,
    generateValidationInterface: false,
    generateConstants: false,
    generateValidator: true,
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: ['submit', 'results'],
    generateUtils: false,
    generateHooks: false,
    notes: 'Assessment data - form interface only, with submit/results API'
  },
  
  join_table: {
    handlingLevel: 'join_table',
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: false,
    generateFormInterface: true,
    generateValidationInterface: false,
    generateConstants: false,
    generateValidator: true,
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: true,
    generateApiSpecial: ['link', 'unlink'],
    generateUtils: false,
    generateHooks: false,
    notes: 'Join/link table - foreign key references with link/unlink API'
  },
  
  read_only_view: {
    handlingLevel: 'read_only_view',
    generateRow: true,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: true,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: false,
    generateValidator: false,
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    generateUtils: false,
    generateHooks: false,
    notes: 'Read-only view - no write operations, GET API only'
  },
  
  function: {
    handlingLevel: 'function',
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: false,
    generateValidator: false,
    generateApiGetList: false,
    generateApiGetSingle:true,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: ['invoke'],
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Database function - POST invoke API only'
  },
  
  type_enum: {
    handlingLevel: 'type_enum',
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: false,
    generateValidator: false,
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Type-only enum from Database.public.Enums'
  },
  
  runtime_enum: {
    handlingLevel: 'runtime_enum',
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: true,
    generateValidator: false,
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Runtime enum from Constants.public.Enums'
  },
  
  composite: {
    handlingLevel: 'composite',
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: false,
    generateValidator: false,
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    generateUtils: false,
    generateHooks: false,
    notes: 'Composite type - skip generation'
  },
  
  unknown: {
    handlingLevel: 'unknown',
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: true,
    generateFormInterface: true,
    generateValidationInterface: true,
    generateConstants: false,
    generateValidator: true,
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: true,
    generateApiDelete: true,
    generateApiSpecial: [],
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
 * 
 * ✅ UPDATED: Accepts PublicTableNames for type safety
 */
export function getHandlingLevelByPattern(tableName: PublicTableNames): HandlingLevel {
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
  
  // Default: all other tables are full_crud
  return 'full_crud';
}

/**
 * Determine handling level for a view
 * 
 * ✅ NEW: Type-safe view pattern matching
 */
export function getViewHandlingLevelByPattern(viewName: PublicViewNames): HandlingLevel {
  // Read-only views
  const viewPatterns: PublicViewNames[] = [
    'personalized_feed',
    'public_transparency',
    'prometheus_blueprint_health',
    'prometheus_generation_stats'
  ];
  
  if (viewPatterns.includes(viewName)) {
    return 'read_only_view';
  }
  
  // Default for views
  return 'read_only_view';
}

/**
 * Get handling level for a table (with manual override option)
 * 
 * ✅ UPDATED: Accepts PublicTableNames
 */
export function getTableHandlingLevel(tableName: PublicTableNames): HandlingLevel {
  // Manual overrides for exceptions
  const overrides: Partial<Record<PublicTableNames, HandlingLevel>> = {
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

/**
 * Get deity folder for any object based on table association
 * 
 * ✅ UPDATED: Uses type-safe parameters
 */
export function getDeityFolderForObject(
  objectType: 'table' | 'view' | 'function' | 'type_enum' | 'runtime_enum',
  objectName: string,
  associatedTable?: PublicTableNames
): string {
  // If associated table provided, use it
  if (associatedTable) {
    const folder = getFolderNameForTable(associatedTable);
    if (folder) return folder;
  }
  
  // For tables, direct lookup (type-safe)
  if (objectType === 'table') {
    const folder = getFolderNameForTable(objectName as PublicTableNames);
    if (folder) return folder;
  }
  
  // For views, use view lookup
  if (objectType === 'view') {
    const folder = getFolderNameForView(objectName as PublicViewNames);
    if (folder) return folder;
  }
  
  // For functions, try to derive from name pattern
  if (objectType === 'function') {
    for (const group of DEITY_GROUPS) {
      for (const table of group.tables) {
        if (objectName.includes(table) || table.includes(objectName)) {
          return group.folderName;
        }
      }
    }
  }

  // For enums, use enum mapping
  return getEnumFolder(objectName);
}

// ============================================================================
// TYPE-SAFE HELPER FUNCTIONS
// ============================================================================

/**
 * Get full category config for a table
 * 
 * ✅ UPDATED: Accepts PublicTableNames
 */
export function getTableCategory(tableName: PublicTableNames): ObjectCategory {
  const level = getTableHandlingLevel(tableName);
  return LEVEL_CONFIG[level];
}

/**
 * Get full category config for a view
 * 
 * ✅ NEW: Type-safe view category lookup
 */
export function getViewCategory(viewName: PublicViewNames): ObjectCategory {
  const level = getViewHandlingLevelByPattern(viewName);
  return LEVEL_CONFIG[level];
}

/**
 * Get handling level for a function
 * 
 * ✅ UPDATED: Consistent naming
 */
export function getFunctionHandlingLevel(functionName: string): HandlingLevel {
  return 'function';
}

/**
 * Get handling level for an enum (type-level)
 * 
 * ✅ UPDATED: Accepts PublicEnumNames for type safety
 */
export function getTypeEnumHandlingLevel(enumName: PublicEnumNames): HandlingLevel {
  return 'type_enum';
}

/**
 * Get handling level for an enum (runtime)
 * 
 * ✅ UPDATED: Accepts PublicEnumNames for type safety
 */
export function getRuntimeEnumHandlingLevel(enumName: PublicEnumNames): HandlingLevel {
  return 'runtime_enum';
}

/**
 * Get category config for any object based on type and name
 * 
 * ✅ UPDATED: Type-safe overloads
 */
export function getObjectCategory(
  objectType: 'table',
  objectName: PublicTableNames
): ObjectCategory;
export function getObjectCategory(
  objectType: 'view',
  objectName: PublicViewNames
): ObjectCategory;
export function getObjectCategory(
  objectType: 'function',
  objectName: string
): ObjectCategory;
export function getObjectCategory(
  objectType: 'type_enum' | 'runtime_enum',
  objectName: PublicEnumNames
): ObjectCategory;
export function getObjectCategory(
  objectType: 'table' | 'view' | 'function' | 'type_enum' | 'runtime_enum',
  objectName: string
): ObjectCategory {
  switch (objectType) {
    case 'table':
      return getTableCategory(objectName as PublicTableNames);
    case 'view':
      return getViewCategory(objectName as PublicViewNames);
    case 'function':
      return LEVEL_CONFIG[getFunctionHandlingLevel(objectName)];
    case 'type_enum':
      return LEVEL_CONFIG[getTypeEnumHandlingLevel(objectName as PublicEnumNames)];
    case 'runtime_enum':
      return LEVEL_CONFIG[getRuntimeEnumHandlingLevel(objectName as PublicEnumNames)];
    default:
      return LEVEL_CONFIG.unknown;
  }
}

/**
 * Check if a table needs API routes
 * 
 * ✅ UPDATED: Accepts PublicTableNames
 */
export function needsApiRoutes(tableName: PublicTableNames): boolean {
  const category = getTableCategory(tableName);
  return category.generateApiGetList || category.generateApiGetSingle || 
         category.generateApiPost || category.generateApiPut || 
         category.generateApiDelete || category.generateApiSpecial.length > 0;
}

/**
 * Check if a view needs API routes
 * 
 * ✅ NEW: Type-safe view API check
 */
export function needsViewApiRoutes(viewName: PublicViewNames): boolean {
  const category = getViewCategory(viewName);
  return category.generateApiGetList || category.generateApiGetSingle;
}

/**
 * Check if a table needs validators
 * 
 * ✅ UPDATED: Accepts PublicTableNames
 */
export function needsValidators(tableName: PublicTableNames): boolean {
  const category = getTableCategory(tableName);
  return category.generateValidator;
}

/**
 * Check if a table needs utilities
 * 
 * ✅ UPDATED: Accepts PublicTableNames
 */
export function needsUtils(tableName: PublicTableNames): boolean {
  const category = getTableCategory(tableName);
  return category.generateUtils;
}

/**
 * Check if a table needs hooks
 * 
 * ✅ UPDATED: Accepts PublicTableNames
 */
export function needsHooks(tableName: PublicTableNames): boolean {
  const category = getTableCategory(tableName);
  return category.generateHooks;
}

/**
 * Check if a table needs type generation
 * 
 * ✅ UPDATED: Accepts PublicTableNames
 */
export function needsTypeGeneration(tableName: PublicTableNames): boolean {
  const category = getTableCategory(tableName);
  return category.generateRow || category.generateInsert || category.generateUpdate;
}

/**
 * Check if a view needs type generation
 * 
 * ✅ NEW: Type-safe view type check
 */
export function needsViewTypeGeneration(viewName: PublicViewNames): boolean {
  const category = getViewCategory(viewName);
  return category.generateRow;  // Views only have Row types
}

/**
 * Check if an enum needs constant generation
 * 
 * ✅ UPDATED: Accepts PublicEnumNames
 */
export function needsConstantGeneration(enumName: PublicEnumNames): boolean {
  const category = getObjectCategory('runtime_enum', enumName);
  return category.generateConstants;
}

// ============================================================================
// BULK VALIDATION HELPERS
// ============================================================================

/**
 * Get all tables that need a specific generation flag
 * 
 * ✅ NEW: Type-safe bulk filtering
 */
export function filterTablesByNeed(
  tables: PublicTableNames[],
  predicate: (tableName: PublicTableNames) => boolean
): PublicTableNames[] {
  return tables.filter(predicate);
}

/**
 * Get all tables that need full CRUD generation
 */
export function getFullCrudTables(tables: PublicTableNames[]): PublicTableNames[] {
  return tables.filter(t => getTableHandlingLevel(t) === 'full_crud');
}

/**
 * Get all tables that need assessment generation
 */
export function getAssessmentTables(tables: PublicTableNames[]): PublicTableNames[] {
  return tables.filter(t => getTableHandlingLevel(t) === 'assessment');
}

/**
 * Get all join tables
 */
export function getJoinTables(tables: PublicTableNames[]): PublicTableNames[] {
  return tables.filter(t => getTableHandlingLevel(t) === 'join_table');
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { PublicTableNames, PublicViewNames, PublicEnumNames };
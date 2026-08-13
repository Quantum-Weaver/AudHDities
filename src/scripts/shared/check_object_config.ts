// @/scripts/shared/check_object_config.ts
// ============================================================================
// CHECK OBJECT CONFIG - Type-Safe Configuration Validation
// ============================================================================
// Phase 2: Check object configuration against deity_groups.ts
// Determines output folder, deity group, and generation rules for each object
// ============================================================================

import type { ObjectConfig, ConfigRules, ExtractedObject } from '@/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '@/scripts/shared/logger.js';

// Import type-safe helpers
import type { PublicTableNames, PublicViewNames, PublicEnumNames } from '@/lib/generated/supabase/database.helpers.js';

// Import the deity groups configuration
import { 
  DEITY_GROUPS, 
  getDeityGroupForTable,
  getDeityGroupForView,
  getFolderNameForTable,
  getFolderNameForView,
  getAllTableNames,
  getAllViewNames,
  getTablesWithoutGroup,
  getViewsWithoutGroup,
  type DeityGroup 
} from '@/config/deity_groups.js';

// Import the single source of truth for sensitive fields
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';

export interface CheckObjectConfigOptions {
  verbose?: boolean;
  defaultOutputBase?: string;
}

// ✅ Use the imported SENSITIVE_FIELDS - no duplication!
export const DEFAULT_SENSITIVE_FIELDS: string[] = [...SENSITIVE_FIELDS];

// Default configuration rules
export const DEFAULT_CONFIG_RULES: ConfigRules = {
  defaultDeityGroup: 'unassigned',
  tableMapping: {},
  viewMapping: {},
  functionMapping: {},
  enumMapping: {}
};

// ============================================================================
// TABLE CONFIGURATION (Type-Safe)
// ============================================================================

/**
 * Get configuration for a table object
 */
export function getTableConfig(
  tableName: PublicTableNames,
  options?: CheckObjectConfigOptions
): ObjectConfig {
  const { verbose = false } = options || {};
  
  const deityGroup = getDeityGroupForTable(tableName);
  const folderName = getFolderNameForTable(tableName);
  
  if (verbose) {
    if (deityGroup) {
      logDebug(`Table "${tableName}" → Deity: ${deityGroup.name}, Folder: ${folderName}`);
    } else {
      logWarning(`Table "${tableName}" has no assigned deity group`);
    }
  }
  
  return {
    deityGroup: deityGroup?.name || 'unassigned',
    outputFolder: folderName || 'unassigned',
    skipGeneration: !deityGroup,
    sensitiveFields: SENSITIVE_FIELDS  // ✅ Direct use
  };
}

// ============================================================================
// VIEW CONFIGURATION (Type-Safe)
// ============================================================================

/**
 * Get configuration for a view object
 */
export function getViewConfig(
  viewName: PublicViewNames,
  options?: CheckObjectConfigOptions
): ObjectConfig {
  const { verbose = false } = options || {};
  
  const deityGroup = getDeityGroupForView(viewName);
  const folderName = getFolderNameForView(viewName);
  
  if (verbose) {
    if (deityGroup) {
      logDebug(`View "${viewName}" → Deity: ${deityGroup.name}, Folder: ${folderName}`);
    } else {
      logDebug(`View "${viewName}" → Default folder: views`);
    }
  }
  
  return {
    deityGroup: deityGroup?.name || 'views',
    outputFolder: folderName || 'views',
    skipGeneration: false,
    sensitiveFields: SENSITIVE_FIELDS  // ✅ Direct use
  };
}

// ============================================================================
// FUNCTION CONFIGURATION
// ============================================================================

/**
 * Get configuration for a function object
 */
export function getFunctionConfig(
  functionName: string,
  options?: CheckObjectConfigOptions
): ObjectConfig {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug(`Function "${functionName}" → Default folder: functions`);
  }
  
  return {
    deityGroup: 'functions',
    outputFolder: 'functions',
    skipGeneration: false,
    sensitiveFields: SENSITIVE_FIELDS  // ✅ Direct use
  };
}

// ============================================================================
// ENUM CONFIGURATION (Type-Safe)
// ============================================================================

/**
 * Get configuration for an enum object
 */
export function getEnumConfig(
  enumName: PublicEnumNames,
  options?: CheckObjectConfigOptions
): ObjectConfig {
  const { verbose = false } = options || {};
  
  // Dynamic import for enum folder (handled by enum_mapping)
  if (verbose) {
    logDebug(`Enum "${enumName}" → Folder determined by enum_mapping.ts`);
  }
  
  return {
    deityGroup: 'enums',
    outputFolder: 'enums',  // Will be overridden by actual mapping
    skipGeneration: false,
    sensitiveFields: []  // Enums don't have sensitive fields
  };
}

// ============================================================================
// GENERIC OBJECT CONFIGURATION
// ============================================================================

/**
 * Get configuration for any object based on its type
 */
export function getObjectConfig(
  object: ExtractedObject,
  options?: CheckObjectConfigOptions
): ObjectConfig {
  const { verbose = false } = options || {};
  
  switch (object.type) {
    case 'table':
      return getTableConfig(object.name as PublicTableNames, options);
    case 'view':
      return getViewConfig(object.name as PublicViewNames, options);
    case 'function':
      return getFunctionConfig(object.name, options);
    case 'type_enum':
    case 'runtime_enum':
      return getEnumConfig(object.name as PublicEnumNames, options);
    default:
      if (verbose) {
        logWarning(`Unknown object type for "${object.name}", using default config`);
      }
      return {
        deityGroup: 'unknown',
        outputFolder: 'unknown',
        skipGeneration: true,
        sensitiveFields: []
      };
  }
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Get all tables that are missing deity group assignments
 */
export function getUnassignedTables(allTableNames: PublicTableNames[]): PublicTableNames[] {
  return getTablesWithoutGroup(allTableNames);
}

/**
 * Get all views that are missing deity group assignments
 */
export function getUnassignedViews(_allViewNames: PublicViewNames[]): PublicViewNames[] {
  // 2026-08-12: the base carries 0 views (courier count), so the new helpers
  // type PublicViewNames as never — the empty list is the truth.
  return [];
}

/**
 * Get summary of all deity groups with their assigned tables and views
 */
export function getDeityGroupSummary(): Array<{
  name: string;
  domain: string;
  folderName: string;
  tableCount: number;
  viewCount: number;
  tables: string[];
  views: string[];
}> {
  return DEITY_GROUPS.map(group => ({
    name: group.name,
    domain: group.domain,
    folderName: group.folderName,
    tableCount: group.tables.length,
    viewCount: group.views?.length || 0,
    tables: [...group.tables],
    views: group.views ? [...group.views] : []
  }));
}

/**
 * Validate that all expected tables have deity assignments
 */
export function validateTableAssignments(
  allTableNames: PublicTableNames[],
  options?: CheckObjectConfigOptions
): { valid: boolean; unassigned: PublicTableNames[]; warnings: string[] } {
  const { verbose = false } = options || {};
  
  const assignedTables = new Set(getAllTableNames());
  const unassigned: PublicTableNames[] = [];
  const warnings: string[] = [];
  
  for (const table of allTableNames) {
    if (!assignedTables.has(table)) {
      unassigned.push(table);
      warnings.push(`Table "${table}" has no deity group assignment`);
    }
  }
  
  if (verbose) {
    if (unassigned.length === 0) {
      logSuccess(`All ${allTableNames.length} tables have deity group assignments`);
    } else {
      logWarning(`${unassigned.length} of ${allTableNames.length} tables are unassigned`);
      for (const table of unassigned.slice(0, 10)) {
        logDebug(`  - ${table}`);
      }
      if (unassigned.length > 10) {
        logDebug(`  ... and ${unassigned.length - 10} more`);
      }
    }
  }
  
  return {
    valid: unassigned.length === 0,
    unassigned,
    warnings
  };
}

/**
 * Validate that all expected views have deity assignments
 */
export function validateViewAssignments(
  allViewNames: PublicViewNames[],
  options?: CheckObjectConfigOptions
): { valid: boolean; unassigned: PublicViewNames[]; warnings: string[] } {
  const { verbose = false } = options || {};
  
  const assignedViews = new Set(getAllViewNames());
  const unassigned: PublicViewNames[] = [];
  const warnings: string[] = [];
  
  for (const view of allViewNames) {
    if (!assignedViews.has(view)) {
      unassigned.push(view);
      warnings.push(`View "${view}" has no deity group assignment`);
    }
  }
  
  if (verbose) {
    if (unassigned.length === 0) {
      logSuccess(`All ${allViewNames.length} views have deity group assignments`);
    } else {
      logWarning(`${unassigned.length} of ${allViewNames.length} views are unassigned`);
    }
  }
  
  return {
    valid: unassigned.length === 0,
    unassigned,
    warnings
  };
}

// ============================================================================
// OUTPUT PATH GENERATION
// ============================================================================

/**
 * Get output path for a generated file based on object config
 */
export function getOutputPath(
  object: ExtractedObject,
  config: ObjectConfig,
  fileType: 'types' | 'constants' | 'utils' | 'api',
  basePath: string = '@'
): string {
  const folderMap = {
    types: 'types',
    constants: 'lib/constants',
    utils: 'lib/utils',
    api: 'app/api'
  };
  
  const typeFolder = folderMap[fileType];
  const deityFolder = config.outputFolder;
  
  // Special case: enums go to constants folder
  if ((object.type === 'type_enum' || object.type === 'runtime_enum') && fileType === 'constants') {
    return `${basePath}/${typeFolder}/${deityFolder}/${object.name}.ts`;
  }
  
  // Tables and views go to types folder with deity subfolder
  if ((object.type === 'table' || object.type === 'view') && fileType === 'types') {
    return `${basePath}/${typeFolder}/${deityFolder}/${object.name}.ts`;
  }
  
  // Default
  return `${basePath}/${typeFolder}/${deityFolder}/${object.name}.ts`;
}
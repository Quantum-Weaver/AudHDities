/* src/scripts/modules/system/check_object_config.ts */

// Phase 2: Check object configuration against deity_groups.ts
// Determines output folder, deity group, and generation rules for each object

import type { ObjectConfig, ConfigRules, ExtractedObject } from 'src/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning } from 'src/scripts/shared/logger.js';

// Import the deity groups configuration
import { 
  DEITY_GROUPS, 
  getDeityGroupForTable, 
  getFolderNameForTable,
  getAllTableNames,
  getTablesWithoutGroup,
  type DeityGroup 
} from 'src/config/deity_groups.js';

export interface CheckObjectConfigOptions {
  verbose?: boolean;
  defaultOutputBase?: string;  // Base path for output files (default: 'src/types')
}

// Sensitive fields to exclude from public interfaces
export const DEFAULT_SENSITIVE_FIELDS: string[] = [
  'email',
  'password',
  'stripe_account_id',
  'stripe_account',
  'crisis_contact_email',
  'crisis_contact_phone',
  'crisis_contact_name',
  'crisis_instructions',
  'access_token',
  'refresh_token',
  'api_key',
  'secret_key',
  'private_key',
  'encrypted_data',
  'verification_token',
  'reset_token'
];

// Default configuration rules
export const DEFAULT_CONFIG_RULES: ConfigRules = {
  defaultDeityGroup: 'unassigned',
  tableMapping: {},
  viewMapping: {},
  functionMapping: {},
  enumMapping: {}
};

/**
 * Get configuration for a table object
 * 
 * @param tableName - Name of the table
 * @param options - Optional configuration
 * @returns ObjectConfig with deity group, folder, and rules
 */
export function getTableConfig(
  tableName: string,
  options: CheckObjectConfigOptions = {}
): ObjectConfig {
  const { verbose = false } = options;
  
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
    outputFolder: folderName ? `${folderName}` : 'unassigned',
    skipGeneration: !deityGroup,  // Skip if no deity group assigned
    sensitiveFields: [...DEFAULT_SENSITIVE_FIELDS]
  };
}

/**
 * Get configuration for a view object
 * 
 * @param viewName - Name of the view
 * @param options - Optional configuration
 * @returns ObjectConfig with rules
 */
export function getViewConfig(
  viewName: string,
  options: CheckObjectConfigOptions = {}
): ObjectConfig {
  const { verbose = false } = options;
  
  // Views currently go to a default folder (can be customized later)
  // Check if view matches any table pattern? Not for now.
  
  if (verbose) {
    logDebug(`View "${viewName}" → Default folder: views`);
  }
  
  return {
    deityGroup: 'views',
    outputFolder: 'views',
    skipGeneration: false,
    sensitiveFields: [...DEFAULT_SENSITIVE_FIELDS]
  };
}

/**
 * Get configuration for a function object
 * 
 * @param functionName - Name of the function
 * @param options - Optional configuration
 * @returns ObjectConfig with rules
 */
export function getFunctionConfig(
  functionName: string,
  options: CheckObjectConfigOptions = {}
): ObjectConfig {
  const { verbose = false } = options;
  
  if (verbose) {
    logDebug(`Function "${functionName}" → Default folder: functions`);
  }
  
  return {
    deityGroup: 'functions',
    outputFolder: 'functions',
    skipGeneration: false,
    sensitiveFields: [...DEFAULT_SENSITIVE_FIELDS]
  };
}

/**
 * Get configuration for an enum object
 * 
 * @param enumName - Name of the enum
 * @param options - Optional configuration
 * @returns ObjectConfig with rules
 */
export function getEnumConfig(
  enumName: string,
  options: CheckObjectConfigOptions = {}
): ObjectConfig {
  const { verbose = false } = options;
  
  if (verbose) {
    logDebug(`Enum "${enumName}" → Default folder: enums`);
  }
  
  return {
    deityGroup: 'enums',
    outputFolder: 'enums',
    skipGeneration: false,
    sensitiveFields: []
  };
}

/**
 * Get configuration for any object based on its type
 * 
 * @param object - ExtractedObject
 * @param options - Optional configuration
 * @returns ObjectConfig with all rules
 */
export function getObjectConfig(
  object: ExtractedObject,
  options: CheckObjectConfigOptions = {}
): ObjectConfig {
  const { verbose = false } = options;
  
  switch (object.type) {
    case 'table':
      return getTableConfig(object.name, options);
    case 'view':
      return getViewConfig(object.name, options);
    case 'function':
      return getFunctionConfig(object.name, options);
    case 'type_enum':
    case 'runtime_enum':
      return getEnumConfig(object.name, options);
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

/**
 * Get all tables that are missing deity group assignments
 * 
 * @param allTableNames - Array of all table names from the database
 * @returns Array of unassigned table names
 */
export function getUnassignedTables(allTableNames: string[]): string[] {
  return getTablesWithoutGroup(allTableNames);
}

/**
 * Get summary of all deity groups with their assigned tables
 * 
 * @returns Array of objects with deity name, folder, and table count
 */
export function getDeityGroupSummary(): Array<{
  name: string;
  domain: string;
  folderName: string;
  tableCount: number;
  tables: string[];
}> {
  return DEITY_GROUPS.map(group => ({
    name: group.name,
    domain: group.domain,
    folderName: group.folderName,
    tableCount: group.tables.length,
    tables: [...group.tables]
  }));
}

/**
 * Validate that all expected tables have deity assignments
 * 
 * @param allTableNames - Array of all table names from the database
 * @param options - Optional configuration
 * @returns Object with validation results
 */
export function validateTableAssignments(
  allTableNames: string[],
  options: CheckObjectConfigOptions = {}
): { valid: boolean; unassigned: string[]; warnings: string[] } {
  const { verbose = false } = options;
  
  const assignedTables = new Set(getAllTableNames());
  const unassigned: string[] = [];
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
 * Get output path for a generated file based on object config
 * 
 * @param object - ExtractedObject
 * @param config - ObjectConfig
 * @param fileType - Type of file ('types', 'constants', 'utils', 'api')
 * @param basePath - Base output path (default: '@')
 * @returns Full output file path
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
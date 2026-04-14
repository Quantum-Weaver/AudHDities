// src/scripts/system/gaia/enrich_objects.ts
// ============================================================================
// ENRICH OBJECTS (GAIA)
// ============================================================================
// Purpose: Resolve configuration for extracted objects once, before generation
// Dependencies: object_categories.ts, deity_groups.ts
// ============================================================================

import type { TableInfo } from './extract_tables.js';
import type { ViewInfo } from './extract_views.js';
import type { FunctionInfo } from './extract_functions.js';
import type { RuntimeEnumInfo } from './extract_runtime_enums.js';
import type { TypeEnumInfo } from './extract_type_enums.js';
import type { ObjectCategory } from '@/config/object_categories.js';

import {
  getDeityFolderForObject,
  getObjectCategory,
  needsTypeGeneration,
  needsValidators,
  needsUtils,
  needsApiRoutes,
  needsHooks,
  needsConstantGeneration
} from '@/config/object_categories.js';

import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

// ============================================================================
// ENRICHED INTERFACES
// ============================================================================

export interface EnrichedTable extends TableInfo {
  // Resolved configuration
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  
  // Generation flags (derived from category)
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
}

export interface EnrichedView extends ViewInfo {
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  shouldGenerateTypes: boolean;
  shouldGenerateApiRoutes: boolean;
}

export interface EnrichedFunction extends FunctionInfo {
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  shouldGenerateApiRoutes: boolean;
}

export interface EnrichedRuntimeEnum extends RuntimeEnumInfo {
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  shouldGenerateConstants: boolean;
}

export interface EnrichedTypeEnum extends TypeEnumInfo {
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  shouldGenerateConstants: boolean;
}

// ============================================================================
// ENRICHMENT FUNCTIONS
// ============================================================================

/**
 * Enrich a table with configuration and generation flags
 */
export function enrichTable(
  table: TableInfo,
  options?: { verbose?: boolean }
): EnrichedTable {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('table', table.name);
  const category = getObjectCategory('table', table.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching table: ${table.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    ...table,
    deityFolder,
    category,
    handlingLevel,
    shouldGenerateTypes: needsTypeGeneration(table.name),
    shouldGenerateValidators: needsValidators(table.name),
    shouldGenerateUtils: needsUtils(table.name),
    shouldGenerateApiRoutes: needsApiRoutes(table.name),
    shouldGenerateHooks: needsHooks(table.name),
  };
}

/**
 * Enrich multiple tables
 */
export function enrichTables(
  tables: TableInfo[],
  options?: { verbose?: boolean }
): EnrichedTable[] {
  const { verbose = false } = options || {};
  const results: EnrichedTable[] = [];
  
  for (const table of tables) {
    results.push(enrichTable(table, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} tables`);
  }
  
  return results;
}

/**
 * Enrich a view with configuration and generation flags
 */
export function enrichView(
  view: ViewInfo,
  options?: { verbose?: boolean }
): EnrichedView {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('view', view.name);
  const category = getObjectCategory('view', view.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching view: ${view.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    ...view,
    deityFolder,
    category,
    handlingLevel,
    shouldGenerateTypes: true,  // Views always generate Row types
    shouldGenerateApiRoutes: needsApiRoutes(view.name),
  };
}

/**
 * Enrich multiple views
 */
export function enrichViews(
  views: ViewInfo[],
  options?: { verbose?: boolean }
): EnrichedView[] {
  const { verbose = false } = options || {};
  const results: EnrichedView[] = [];
  
  for (const view of views) {
    results.push(enrichView(view, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} views`);
  }
  
  return results;
}

/**
 * Enrich a function with configuration and generation flags
 */
export function enrichFunction(
  func: FunctionInfo,
  options?: { verbose?: boolean }
): EnrichedFunction {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('function', func.name);
  const category = getObjectCategory('function', func.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching function: ${func.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    ...func,
    deityFolder,
    category,
    handlingLevel,
    shouldGenerateApiRoutes: needsApiRoutes(func.name),
  };
}

/**
 * Enrich multiple functions
 */
export function enrichFunctions(
  functions: FunctionInfo[],
  options?: { verbose?: boolean }
): EnrichedFunction[] {
  const { verbose = false } = options || {};
  const results: EnrichedFunction[] = [];
  
  for (const func of functions) {
    results.push(enrichFunction(func, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} functions`);
  }
  
  return results;
}
// Add to enrich_objects.ts

import { DEITY_GROUPS, getFolderNameForTable } from '@/config/deity_groups.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');
const ENUM_MAPPING_PATH = path.join(PROJECT_ROOT, 'config/enum_mapping.ts');

// Priority weights by deity (higher = more important)
const DEITY_PRIORITY: Record<string, number> = {
  'hestia-core': 100,
  'plutus-economics': 90,
  'hermes-social': 80,
  'athena-gamification': 70,
  'mnemosyne-assessment': 60,
  'themis-governance': 50,
  'iris-communications': 40,
  'hephaestus-infrastructure': 30,
  'aethelred-connections': 20
};

export interface EnumMappingEntry {
  enumName: string;
  deityFolder: string;
  referencedIn: string[];
  priority: number;
}

/**
 * Generate enum mapping from extracted tables
 */
export function generateEnumMapping(tables: TableInfo[]): Record<string, EnumMappingEntry> {
  const references: Map<string, Array<{ tableName: string; deityFolder: string; priority: number }>> = new Map();
  
  for (const table of tables) {
    const deityFolder = getDeityFolderForObject('table', table.name) || 'hestia-core';
    const priority = DEITY_PRIORITY[deityFolder] || 0;
    
    for (const enumRef of table.enumRefs) {
      if (!references.has(enumRef)) {
        references.set(enumRef, []);
      }
      references.get(enumRef)!.push({
        tableName: table.name,
        deityFolder,
        priority
      });
    }
  }
  
  const mapping: Record<string, EnumMappingEntry> = {};
  
  for (const [enumName, refs] of references) {
    // Find reference with highest priority
    const bestMatch = refs.reduce((best, current) => 
      current.priority > best.priority ? current : best, refs[0]);
    
    mapping[enumName] = {
      enumName,
      deityFolder: bestMatch.deityFolder,
      referencedIn: refs.map(r => r.tableName),
      priority: bestMatch.priority
    };
  }
  
  // Add default fallback
  mapping.default = {
    enumName: 'default',
    deityFolder: 'hestia-core',
    referencedIn: [],
    priority: 0
  };
  
  return mapping;
}

/**
 * Write enum mapping to config file
 */
export function writeEnumMapping(mapping: Record<string, EnumMappingEntry>): void {
  const timestamp = new Date().toISOString();
  
  let content = `// src/config/enum_mapping.ts
// ============================================================================
// ENUM MAPPING - AUTOGENERATED - DO NOT EDIT MANUALLY
// ============================================================================
// Generated by GAIA on ${timestamp}
// Maps each enum to the deity folder of the highest priority table that references it
// ============================================================================

export interface EnumMappingEntry {
  enumName: string;
  deityFolder: string;
  referencedIn: string[];
  priority: number;
}

export const ENUM_MAPPING: Record<string, EnumMappingEntry> = ${JSON.stringify(mapping, null, 2)};

/**
 * Get the deity folder for an enum
 */
export function getEnumFolder(enumName: string): string {
  return ENUM_MAPPING[enumName]?.deityFolder || ENUM_MAPPING.default.deityFolder;
}

/**
 * Get the full mapping entry for an enum
 */
export function getEnumMapping(enumName: string): EnumMappingEntry | undefined {
  return ENUM_MAPPING[enumName];
}

/**
 * Get all enums that belong to a specific deity folder
 */
export function getEnumsByDeity(deityFolder: string): string[] {
  return Object.values(ENUM_MAPPING)
    .filter(entry => entry.deityFolder === deityFolder)
    .map(entry => entry.enumName);
}
`;
  
  fs.writeFileSync(ENUM_MAPPING_PATH, content, 'utf-8');
}

/**
 * Enrich a runtime enum with configuration and generation flags
 */
export function enrichRuntimeEnum(
  enumInfo: RuntimeEnumInfo,
  options?: { verbose?: boolean }
): EnrichedRuntimeEnum {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('runtime_enum', enumInfo.name);
  const category = getObjectCategory('runtime_enum', enumInfo.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching runtime enum: ${enumInfo.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    ...enumInfo,
    deityFolder,
    category,
    handlingLevel,
    shouldGenerateConstants: needsConstantGeneration(enumInfo.name),
  };
}

/**
 * Enrich multiple runtime enums
 */
export function enrichRuntimeEnums(
  enums: RuntimeEnumInfo[],
  options?: { verbose?: boolean }
): EnrichedRuntimeEnum[] {
  const { verbose = false } = options || {};
  const results: EnrichedRuntimeEnum[] = [];
  
  for (const enumInfo of enums) {
    results.push(enrichRuntimeEnum(enumInfo, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} runtime enums`);
  }
  
  return results;
}

/**
 * Enrich a type enum with configuration and generation flags
 */
export function enrichTypeEnum(
  enumInfo: TypeEnumInfo,
  options?: { verbose?: boolean }
): EnrichedTypeEnum {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('type_enum', enumInfo.name);
  const category = getObjectCategory('type_enum', enumInfo.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching type enum: ${enumInfo.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    ...enumInfo,
    deityFolder,
    category,
    handlingLevel,
    shouldGenerateConstants: false, // Type enums don't generate constants
  };
}

/**
 * Enrich multiple type enums
 */
export function enrichTypeEnums(
  enums: TypeEnumInfo[],
  options?: { verbose?: boolean }
): EnrichedTypeEnum[] {
  const { verbose = false } = options || {};
  const results: EnrichedTypeEnum[] = [];
  
  for (const enumInfo of enums) {
    results.push(enrichTypeEnum(enumInfo, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} type enums`);
  }
  
  return results;
}

// ============================================================================
// BULK ENRICHMENT
// ============================================================================

export interface EnrichedExtractionResult {
  tables: EnrichedTable[];
  views: EnrichedView[];
  functions: EnrichedFunction[];
  runtimeEnums: EnrichedRuntimeEnum[];
  typeEnums: EnrichedTypeEnum[];
}

/**
 * Enrich all extracted objects at once
 */
export function enrichAll(
  tables: TableInfo[],
  views: ViewInfo[],
  functions: FunctionInfo[],
  runtimeEnums: RuntimeEnumInfo[],
  typeEnums: TypeEnumInfo[],
  options?: { verbose?: boolean }
): EnrichedExtractionResult {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug('Enriching all extracted objects...');
  }
  
  return {
    tables: enrichTables(tables, options),
    views: enrichViews(views, options),
    functions: enrichFunctions(functions, options),
    runtimeEnums: enrichRuntimeEnums(runtimeEnums, options),
    typeEnums: enrichTypeEnums(typeEnums, options),
  };
}
// src/scripts/system/gaia/enrich_objects.ts
// ============================================================================
// ENRICH OBJECTS (GAIA) - SIMPLIFIED VERSION
// ============================================================================
// Purpose: Resolve configuration for extracted objects once, before generation
// 
// NOTE: This version NO LONGER requires rowContent, insertContent, updateContent,
// enumRefs, or hasJson because those are provided by the Tables helper.
// ============================================================================

import type { ObjectCategory } from '@/config/object_categories.js';
import { getDeityFolderForObject, getObjectCategory, needsTypeGeneration, needsValidators, needsUtils, needsApiRoutes, needsHooks, needsConstantGeneration } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { type DefaultSchema } from '@/types/supabase/database.helpers.js';
import { Json, Database } from '@/types/supabase/database.types.js';
import { JSONSchema } from 'zod/v4/core';

// ============================================================================
// ENRICHED INTERFACES (Simplified)
// ============================================================================
export type PublicTableNames = keyof DefaultSchema["Tables"];

export interface EnrichedTable {
  name: string;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type?: 'table';
  enumRefs: Json;
  hasJson: boolean;
  content: Json;
  
  // Generation flags (derived from category)
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
  
  // Optional: For debugging/display only (not used for generation)
  notes?: string;
}

export interface EnrichedView {
  name: string;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'view';

  enumRefs: Json;
  hasJson: boolean;
  content: Json;
  
  // Generation flags (derived from category)
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
}

export interface EnrichedFunction {
  name: string;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'function';

  enumRefs: Json;
  hasJson: boolean;
  content: Json;
  
  // Generation flags (derived from category)
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
}

export interface EnrichedRuntimeEnum {
  name: string;
  values: string[];
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'runtime_enum';

  enumRefs: Json;
  hasJson: boolean;
  content: Json;
  
  // Generation flags (derived from category)
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
}

export interface EnrichedTypeEnum {
  name: string;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'type_enum';

  enumRefs: Json;
  hasJson: boolean;
  content: Json;
  
  // Generation flags (derived from category)
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
}

// ============================================================================
// ENRICHMENT FUNCTIONS
// ============================================================================

/**
 * Enrich a table with configuration and generation flags
 * NO LONGER needs rowContent, insertContent, etc. — those come from Tables helper
 */
export function enrichTable(
  tableName: string,
  options?: { verbose?: boolean }
): EnrichedTable {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('table', tableName);
  const category = getObjectCategory('table', tableName);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching table: ${tableName} -> ${deityFolder} (${handlingLevel})`);
  }

  return {
    name: tableName,
    deityFolder,
    category,
    handlingLevel,
    content,
    needsJson
    shouldGenerateTypes: needsTypeGeneration(tableName),
    shouldGenerateValidators: needsValidators(tableName),
    shouldGenerateUtils: needsUtils(tableName),
    shouldGenerateApiRoutes: needsApiRoutes(tableName),
    shouldGenerateHooks: needsHooks(tableName),
  };
}

/**
 * Enrich multiple tables
 */
export function enrichTables(
  tableNames: string[],
  options?: { verbose?: boolean }
): EnrichedTable[] {
  const { verbose = false } = options || {};
  const results: EnrichedTable[] = [];
  
  for (const tableName of tableNames) {
    results.push(enrichTable(tableName, options));
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
  viewName: string,
  options?: { verbose?: boolean }
): EnrichedView {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('view', viewName);
  const category = getObjectCategory('view', viewName);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching view: ${viewName} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: viewName,
    deityFolder,
    category,
    handlingLevel,
    type: 'view',
    shouldGenerateTypes: true,  // Views always generate Row types
    shouldGenerateApiRoutes: needsApiRoutes(viewName),
  };
}

/**
 * Enrich multiple views
 */
export function enrichViews(
  viewNames: string[],
  options?: { verbose?: boolean }
): EnrichedView[] {
  const { verbose = false } = options || {};
  const results: EnrichedView[] = [];
  
  for (const viewName of viewNames) {
    results.push(enrichView(viewName, options));
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
  functionName: string,
  options?: { verbose?: boolean }
): EnrichedFunction {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('function', functionName);
  const category = getObjectCategory('function', functionName);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching function: ${functionName} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: functionName,
    deityFolder,
    category,
    handlingLevel,
    type: 'function',
    shouldGenerateApiRoutes: needsApiRoutes(functionName),
  };
}

/**
 * Enrich multiple functions
 */
export function enrichFunctions(
  functionNames: string[],
  options?: { verbose?: boolean }
): EnrichedFunction[] {
  const { verbose = false } = options || {};
  const results: EnrichedFunction[] = [];
  
  for (const functionName of functionNames) {
    results.push(enrichFunction(functionName, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} functions`);
  }
  
  return results;
}

/**
 * Enrich a runtime enum with configuration and generation flags
 */
export function enrichRuntimeEnum(
  enumInfo: { name: string; values: string[] },
  options?: { verbose?: boolean }
): EnrichedRuntimeEnum {
  const { verbose = false } = options || {};
  
  // Import dynamically to avoid circular dependency
  const { getEnumFolder } = require('@/config/enum_mapping.js');
  
  const deityFolder = getEnumFolder(enumInfo.name);
  const category = getObjectCategory('runtime_enum', enumInfo.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching runtime enum: ${enumInfo.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: enumInfo.name,
    values: enumInfo.values,
    deityFolder,
    category,
    handlingLevel,
    type: 'runtime_enum',
    shouldGenerateConstants: needsConstantGeneration(enumInfo.name),
  };
}

/**
 * Enrich multiple runtime enums
 */
export function enrichRuntimeEnums(
  enums: Array<{ name: string; values: string[] }>,
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
  enumName: string,
  options?: { verbose?: boolean }
): EnrichedTypeEnum {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('type_enum', enumName);
  const category = getObjectCategory('type_enum', enumName);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching type enum: ${enumName} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: enumName,
    deityFolder,
    category,
    handlingLevel,
    type: 'type_enum',
    shouldGenerateConstants: false, // Type enums don't generate constants
  };
}

/**
 * Enrich multiple type enums
 */
export function enrichTypeEnums(
  enumNames: string[],
  options?: { verbose?: boolean }
): EnrichedTypeEnum[] {
  const { verbose = false } = options || {};
  const results: EnrichedTypeEnum[] = [];
  
  for (const enumName of enumNames) {
    results.push(enrichTypeEnum(enumName, options));
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
  tableNames: string[],
  viewNames: string[],
  functionNames: string[],
  runtimeEnums: Array<{ name: string; values: string[] }>,
  typeEnumNames: string[],
  options?: { verbose?: boolean }
): EnrichedExtractionResult {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug('Enriching all extracted objects...');
  }
  
  return {
    tables: enrichTables(tableNames, options),
    views: enrichViews(viewNames, options),
    functions: enrichFunctions(functionNames, options),
    runtimeEnums: enrichRuntimeEnums(runtimeEnums, options),
    typeEnums: enrichTypeEnums(typeEnumNames, options),
  };
}
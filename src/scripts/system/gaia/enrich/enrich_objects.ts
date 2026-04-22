// src/scripts/system/gaia/enrich/enrich_objects.ts
// ============================================================================
// ENRICH OBJECTS (GAIA) - TYPE-SAFE VERSION
// ============================================================================
// Purpose: Resolve configuration for extracted objects once, before generation
// 
// NOTE: This version NO LONGER requires rowContent, insertContent, updateContent,
// enumRefs, or hasJson because those are provided by the Tables helper.
// ============================================================================

import type { ObjectCategory } from '@/config/object_categories.js';
import { 
  getDeityFolderForObject, 
  getObjectCategory, 
  needsTypeGeneration, 
  needsValidators, 
  needsUtils, 
  needsApiRoutes, 
  needsHooks, 
  needsConstantGeneration, 
  needsViewApiRoutes
} from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../../shared/logger.js';
import type { PublicTableNames, PublicViewNames, PublicEnumNames } from '@/types/supabase/database.helpers.js';

// ============================================================================
// ENRICHED INTERFACES (Type-Safe)
// ============================================================================

export interface EnrichedTable {
  name: PublicTableNames;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'table';
  
  // Generation flags (derived from category)
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
  
  // Optional: For debugging/display only
  notes?: string;
}

export interface EnrichedView {
  name: PublicViewNames;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'view';
  shouldGenerateTypes: boolean;
  shouldGenerateViewApiRoutes: boolean;
}

export interface EnrichedFunction {
  name: string;  // Functions don't have a helper type union
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'function';
  shouldGenerateApiRoutes: boolean;
}

export interface EnrichedRuntimeEnum {
  name: PublicEnumNames;
  values: string[];
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'runtime_enum';
  shouldGenerateConstants: boolean;
}

export interface EnrichedTypeEnum {
  name: PublicEnumNames;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'type_enum';
  shouldGenerateConstants: boolean;
}

// ============================================================================
// ENRICHMENT FUNCTIONS (Type-Safe Parameters)
// ============================================================================

/**
 * Enrich a table with configuration and generation flags
 */
export function enrichTable(
  tableName: PublicTableNames,
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
    type: 'table',
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
  tableNames: PublicTableNames[],
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

// ============================================================================
// ENRICH VIEW FUNCTION (FIXED)
// ============================================================================

/**
 * Enrich a view with configuration and generation flags
 * Views are READ-ONLY - they only get Row types and GET API routes
 */
export function enrichView(
  viewName: PublicViewNames,
  options?: { verbose?: boolean }
): EnrichedView {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('view', viewName);
  const category = getObjectCategory('view', viewName);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching view: ${viewName} -> ${deityFolder} (${handlingLevel})`);
    logDebug(`  API Routes: ${category.generateApiGetList ? 'GET list' : ''} ${category.generateApiGetSingle ? 'GET single' : ''}`);
  }
  
  return {
    name: viewName,
    deityFolder,
    category,
    handlingLevel,
    type: 'view',
    shouldGenerateTypes: true,
    shouldGenerateViewApiRoutes: category.generateApiGetList || category.generateApiGetSingle,
  };
}

/**
 * Enrich multiple views
 */
export function enrichViews(
  viewNames: PublicViewNames[],
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
    shouldGenerateApiRoutes: category.generateApiPost || category.generateApiSpecial.length > 0,
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
export async function enrichRuntimeEnum(
  enumInfo: { name: string; values: string[] },
  options?: { verbose?: boolean }
): Promise<EnrichedRuntimeEnum> {
  const { verbose = false } = options || {};
  
  // Dynamic import to avoid circular dependency
  const { getEnumFolder } = await import('@/config/enum_mapping.js');
  
  const deityFolder = getEnumFolder(enumInfo.name);
  const category = getObjectCategory('runtime_enum', enumInfo.name as PublicEnumNames);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching runtime enum: ${enumInfo.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: enumInfo.name as PublicEnumNames,
    values: enumInfo.values,
    deityFolder,
    category,
    handlingLevel,
    type: 'runtime_enum',
    shouldGenerateConstants: needsConstantGeneration(enumInfo.name as PublicEnumNames),
  };
}

/**
 * Enrich multiple runtime enums
 */
export async function enrichRuntimeEnums(
  enums: Array<{ name: string; values: string[] }>,
  options?: { verbose?: boolean }
): Promise<EnrichedRuntimeEnum[]> {
  const { verbose = false } = options || {};
  const results: EnrichedRuntimeEnum[] = [];
  
  for (const enumInfo of enums) {
    results.push(await enrichRuntimeEnum(enumInfo, options));
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
  enumName: PublicEnumNames,
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
  enumNames: PublicEnumNames[],
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
export async function enrichAll(
  tableNames: PublicTableNames[],
  viewNames: PublicViewNames[],
  functionNames: string[],
  runtimeEnums: Array<{ name: string; values: string[] }>,
  typeEnumNames: PublicEnumNames[],
  options?: { verbose?: boolean }
): Promise<EnrichedExtractionResult> {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug('Enriching all extracted objects...');
  }
  
  const runtimeEnumsEnriched = await enrichRuntimeEnums(runtimeEnums, options);
  
  return {
    tables: enrichTables(tableNames, options),
    views: enrichViews(viewNames, options),
    functions: enrichFunctions(functionNames, options),
    runtimeEnums: runtimeEnumsEnriched,
    typeEnums: enrichTypeEnums(typeEnumNames, options),
  };
}
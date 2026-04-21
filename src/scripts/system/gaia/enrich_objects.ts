// src/scripts/system/gaia/enrich_objects.ts
// ============================================================================
// ENRICH OBJECTS (GAIA) - SIMPLIFIED VERSION
// ============================================================================
// Purpose: Resolve configuration for extracted objects once, before generation
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
  needsConstantGeneration 
} from '@/config/object_categories.js';
import { getEnumFolder } from '@/config/enum_mapping.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

// ============================================================================
// INPUT TYPES (What we receive from extractors)
// ============================================================================

export interface RawTable {
  name: string;
  content: string;
  rowContent?: string;
  insertContent?: string;
  updateContent?: string;
  enumRefs?: string[];
  hasJson?: boolean;
}

export interface RawView {
  name: string;
  content: string;
}

export interface RawFunction {
  name: string;
  content: string;
  args?: string;
  returns?: string;
}

export interface RawRuntimeEnum {
  name: string;
  values: string[];
  content: string;
}

export interface RawTypeEnum {
  name: string;
  values: string[];
  content: string;
}

// ============================================================================
// ENRICHED INTERFACES (Simplified)
// ============================================================================

export interface EnrichedTable {
  name: string;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'table';
  
  // Original content
  content: string;
  rowContent?: string;
  insertContent?: string;
  updateContent?: string;
  enumRefs: string[];
  hasJson: boolean;
  
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
  name: string;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'view';
  
  content: string;
  enumRefs: string[];
  hasJson: boolean;
  
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
  
  content: string;
  args?: string;
  returns?: string;
  enumRefs: string[];
  hasJson: boolean;
  
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
  
  content: string;
  enumRefs: string[];
  hasJson: boolean;
  
  shouldGenerateConstants: boolean;
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
}

export interface EnrichedTypeEnum {
  name: string;
  values: string[];
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  type: 'type_enum';
  
  content: string;
  enumRefs: string[];
  hasJson: boolean;
  
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
 */
export function enrichTable(
  rawTable: RawTable,
  options?: { verbose?: boolean }
): EnrichedTable {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('table', rawTable.name);
  const category = getObjectCategory('table', rawTable.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching table: ${rawTable.name} -> ${deityFolder} (${handlingLevel})`);
  }

  return {
    name: rawTable.name,
    deityFolder,
    category,
    handlingLevel,
    type: 'table',
    
    content: rawTable.content,
    rowContent: rawTable.rowContent,
    insertContent: rawTable.insertContent,
    updateContent: rawTable.updateContent,
    enumRefs: rawTable.enumRefs || [],
    hasJson: rawTable.hasJson || false,
    
    shouldGenerateTypes: needsTypeGeneration(rawTable.name),
    shouldGenerateValidators: needsValidators(rawTable.name),
    shouldGenerateUtils: needsUtils(rawTable.name),
    shouldGenerateApiRoutes: needsApiRoutes(rawTable.name),
    shouldGenerateHooks: needsHooks(rawTable.name),
  };
}

/**
 * Enrich multiple tables
 */
export function enrichTables(
  rawTables: RawTable[],
  options?: { verbose?: boolean }
): EnrichedTable[] {
  const { verbose = false } = options || {};
  const results: EnrichedTable[] = [];
  
  for (const rawTable of rawTables) {
    results.push(enrichTable(rawTable, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} tables`);
  }
  
  return results;
}

/**
 * Enrich a view
 */
export function enrichView(
  rawView: RawView,
  options?: { verbose?: boolean }
): EnrichedView {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('view', rawView.name);
  const category = getObjectCategory('view', rawView.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching view: ${rawView.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: rawView.name,
    deityFolder,
    category,
    handlingLevel,
    type: 'view',
    
    content: rawView.content,
    enumRefs: [],
    hasJson: false,
    
    shouldGenerateTypes: category.generateRow,
    shouldGenerateValidators: false,
    shouldGenerateUtils: false,
    shouldGenerateApiRoutes: category.generateApiGetList || category.generateApiGetSingle,
    shouldGenerateHooks: false,
  };
}

/**
 * Enrich multiple views
 */
export function enrichViews(
  rawViews: RawView[],
  options?: { verbose?: boolean }
): EnrichedView[] {
  const { verbose = false } = options || {};
  const results: EnrichedView[] = [];
  
  for (const rawView of rawViews) {
    results.push(enrichView(rawView, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} views`);
  }
  
  return results;
}

/**
 * Enrich a function
 */
export function enrichFunction(
  rawFunction: RawFunction,
  options?: { verbose?: boolean }
): EnrichedFunction {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('function', rawFunction.name);
  const category = getObjectCategory('function', rawFunction.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching function: ${rawFunction.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: rawFunction.name,
    deityFolder,
    category,
    handlingLevel,
    type: 'function',
    
    content: rawFunction.content,
    args: rawFunction.args,
    returns: rawFunction.returns,
    enumRefs: [],
    hasJson: false,
    
    shouldGenerateTypes: false,
    shouldGenerateValidators: false,
    shouldGenerateUtils: false,
    shouldGenerateApiRoutes: category.generateApiPost,
    shouldGenerateHooks: false,
  };
}

/**
 * Enrich multiple functions
 */
export function enrichFunctions(
  rawFunctions: RawFunction[],
  options?: { verbose?: boolean }
): EnrichedFunction[] {
  const { verbose = false } = options || {};
  const results: EnrichedFunction[] = [];
  
  for (const rawFunction of rawFunctions) {
    results.push(enrichFunction(rawFunction, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} functions`);
  }
  
  return results;
}

/**
 * Enrich a runtime enum
 */
export function enrichRuntimeEnum(
  rawEnum: RawRuntimeEnum,
  options?: { verbose?: boolean }
): EnrichedRuntimeEnum {
  const { verbose = false } = options || {};
  
  const deityFolder = getEnumFolder(rawEnum.name);
  const category = getObjectCategory('runtime_enum', rawEnum.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching runtime enum: ${rawEnum.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: rawEnum.name,
    values: rawEnum.values,
    deityFolder,
    category,
    handlingLevel,
    type: 'runtime_enum',
    
    content: rawEnum.content,
    enumRefs: [],
    hasJson: false,
    
    shouldGenerateConstants: needsConstantGeneration(rawEnum.name),
    shouldGenerateTypes: false,
    shouldGenerateValidators: false,
    shouldGenerateUtils: false,
    shouldGenerateApiRoutes: false,
    shouldGenerateHooks: false,
  };
}

/**
 * Enrich multiple runtime enums
 */
export function enrichRuntimeEnums(
  rawEnums: RawRuntimeEnum[],
  options?: { verbose?: boolean }
): EnrichedRuntimeEnum[] {
  const { verbose = false } = options || {};
  const results: EnrichedRuntimeEnum[] = [];
  
  for (const rawEnum of rawEnums) {
    results.push(enrichRuntimeEnum(rawEnum, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} runtime enums`);
  }
  
  return results;
}

/**
 * Enrich a type enum
 */
export function enrichTypeEnum(
  rawEnum: RawTypeEnum,
  options?: { verbose?: boolean }
): EnrichedTypeEnum {
  const { verbose = false } = options || {};
  
  const deityFolder = getDeityFolderForObject('type_enum', rawEnum.name);
  const category = getObjectCategory('type_enum', rawEnum.name);
  const handlingLevel = category.handlingLevel;
  
  if (verbose) {
    logDebug(`Enriching type enum: ${rawEnum.name} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: rawEnum.name,
    values: rawEnum.values,
    deityFolder,
    category,
    handlingLevel,
    type: 'type_enum',
    
    content: rawEnum.content,
    enumRefs: [],
    hasJson: false,
    
    shouldGenerateTypes: true,
    shouldGenerateValidators: false,
    shouldGenerateUtils: false,
    shouldGenerateApiRoutes: false,
    shouldGenerateHooks: false,
  };
}

/**
 * Enrich multiple type enums
 */
export function enrichTypeEnums(
  rawEnums: RawTypeEnum[],
  options?: { verbose?: boolean }
): EnrichedTypeEnum[] {
  const { verbose = false } = options || {};
  const results: EnrichedTypeEnum[] = [];
  
  for (const rawEnum of rawEnums) {
    results.push(enrichTypeEnum(rawEnum, options));
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
  rawTables: RawTable[],
  rawViews: RawView[],
  rawFunctions: RawFunction[],
  rawRuntimeEnums: RawRuntimeEnum[],
  rawTypeEnums: RawTypeEnum[],
  options?: { verbose?: boolean }
): EnrichedExtractionResult {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug('Enriching all extracted objects...');
  }
  
  return {
    tables: enrichTables(rawTables, options),
    views: enrichViews(rawViews, options),
    functions: enrichFunctions(rawFunctions, options),
    runtimeEnums: enrichRuntimeEnums(rawRuntimeEnums, options),
    typeEnums: enrichTypeEnums(rawTypeEnums, options),
  };
}
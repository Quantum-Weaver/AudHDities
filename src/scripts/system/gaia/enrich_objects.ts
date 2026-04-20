// src/scripts/system/gaia/enrich_objects.ts
// ============================================================================
// ENRICH OBJECTS (GAIA) - SIMPLIFIED VERSION
// ============================================================================
// Purpose: Resolve configuration for runtime enums before generation
// 
// NOTE: Table extraction is no longer needed. Tables are now sourced from
// deity_groups.ts, and types come from the Tables helper.
// ============================================================================

import type { RuntimeEnumInfo } from './extract_runtime_enums.js';
import type { ObjectCategory } from '@/config/object_categories.js';

import {
  getDeityFolderForObject,
  getObjectCategory,
  needsConstantGeneration
} from '@/config/object_categories.js';

import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

// ============================================================================
// ENRICHED INTERFACES
// ============================================================================

/**
 * Enriched runtime enum with resolved configuration
 */
export interface EnrichedRuntimeEnum extends RuntimeEnumInfo {
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  shouldGenerateConstants: boolean;
}

/**
 * Simplified table info (no parsing needed)
 * Tables are sourced from deity_groups.ts, not extracted from database.types.ts
 */
export interface SimpleTableInfo {
  name: string;
  deityFolder: string;
  handlingLevel: string;
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
}

// ============================================================================
// ENRICHMENT FUNCTIONS (Runtime Enums Only)
// ============================================================================

/**
 * Enrich a single runtime enum with configuration and generation flags
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
  runtimeEnums: RuntimeEnumInfo[],
  options?: { verbose?: boolean }
): EnrichedRuntimeEnum[] {
  const { verbose = false } = options || {};
  const results: EnrichedRuntimeEnum[] = [];
  
  for (const enumInfo of runtimeEnums) {
    results.push(enrichRuntimeEnum(enumInfo, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} runtime enums`);
  }
  
  return results;
}

// ============================================================================
// TABLE ENRICHMENT (Simplified - No Parsing)
// ============================================================================

/**
 * Enrich a table using only configuration (no extracted content)
 * Tables are sourced from deity_groups.ts
 */
export function enrichSimpleTable(
  tableName: string,
  deityFolder: string,
  handlingLevel: string,
  options?: { verbose?: boolean }
): SimpleTableInfo {
  const { verbose = false } = options || {};
  
  const category = getObjectCategory('table', tableName);
  
  if (verbose) {
    logDebug(`Enriching table: ${tableName} -> ${deityFolder} (${handlingLevel})`);
  }
  
  return {
    name: tableName,
    deityFolder,
    handlingLevel,
    shouldGenerateTypes: true,  // All tables generate types via Tables helper
    shouldGenerateValidators: category.generateValidator,
    shouldGenerateUtils: category.generateUtils,
    shouldGenerateApiRoutes: category.generateApiGetList || category.generateApiPost || 
                              category.generateApiGetSingle || category.generateApiPut || 
                              category.generateApiDelete,
    shouldGenerateHooks: category.generateHooks,
  };
}

/**
 * Enrich multiple tables
 */
export function enrichSimpleTables(
  tables: Array<{ name: string; deityFolder: string; handlingLevel: string }>,
  options?: { verbose?: boolean }
): SimpleTableInfo[] {
  const { verbose = false } = options || {};
  const results: SimpleTableInfo[] = [];
  
  for (const table of tables) {
    results.push(enrichSimpleTable(table.name, table.deityFolder, table.handlingLevel, options));
  }
  
  if (verbose) {
    logSuccess(`Enriched ${results.length} tables`);
  }
  
  return results;
}
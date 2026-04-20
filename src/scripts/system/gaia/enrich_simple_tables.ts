// src/scripts/system/gaia/enrich_simple_tables.ts
// ============================================================================
// ENRICH SIMPLE TABLES (GAIA)
// ============================================================================
// Purpose: Convert simple table objects to enriched tables with all configuration
// No parsing — uses only configuration files
// ============================================================================
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
import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { DEITY_GROUPS } from '@/config/deity_groups.js';
import { formatTypes, FormatTypesOptions, FormattedType, formatType } from './format_types.js';
import { EnrichedTable } from './enrich_objects.js'
export interface SimpleTable {
  name: string;
  deityFolder: string;
  handlingLevel: string;
  category: any;
}


export interface EnrichSimpleTablesOptions {
  verbose?: boolean;
}

/**
 * Enrich a single simple table
 */
export function enrichSimpleTable(
  table: SimpleTable,
  options?: EnrichSimpleTablesOptions

): EnrichedTable {
  const { verbose = false } = options || {};
  
  const deityGroup = DEITY_GROUPS.find(g => g.folderName === table.deityFolder);
  
  if (verbose) {
    logDebug(`Enriching table: ${table.name} -> ${table.deityFolder}`);
  }
  
  return {
    name: table.name,
    deityFolder: table.deityFolder,
    handlingLevel: table.handlingLevel,
    category: table.category,
    shouldGenerateTypes: needsTypeGeneration(table.name),
    shouldGenerateValidators: needsValidators(table.name),
    shouldGenerateUtils: needsUtils(table.name),
    shouldGenerateApiRoutes: needsApiRoutes(table.name),
    shouldGenerateHooks: needsHooks(table.name)
  };
}

/**
 * Enrich multiple simple tables
 */
export function enrichSimpleTables(
  tables: SimpleTable[],
  options?: EnrichSimpleTablesOptions
): EnrichedTable[] {
  const { verbose = false } = options || {};
  const results: EnrichedTable[] = [];
  
  for (const table of tables) {
    results.push(enrichSimpleTable(table, options));
  }
  
  if (verbose) {
    logDebug(`Enriched ${results.length} tables`);
  }
  
  return results;
}

/**
 * Enrich a table with configuration and generation flags
 */
export function enrichTable(
  table: EnrichedTable,
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
  tables: EnrichedTable[],
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
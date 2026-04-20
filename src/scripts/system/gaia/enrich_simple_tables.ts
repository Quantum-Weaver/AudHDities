// src/scripts/system/gaia/enrich_simple_tables.ts
// ============================================================================
// ENRICH SIMPLE TABLES (GAIA)
// ============================================================================
// Purpose: Convert simple table objects to enriched tables with all configuration
// No parsing — uses only configuration files
// ============================================================================

import { DEITY_GROUPS, getFolderNameForTable } from '@/config/deity_groups.js';
import { 
  getTableHandlingLevel, 
  getObjectCategory,
  needsTypeGeneration,
  needsValidators,
  needsUtils,
  needsApiRoutes,
  needsHooks
} from '@/config/object_categories.js';
import { logDebug } from '../../shared/logger.js';

export interface SimpleTable {
  name: string;
  deityFolder: string;
  handlingLevel: string;
  category: any;
}

export interface EnrichedTable {
  name: string;
  deityFolder: string;
  deityGroup: any;
  handlingLevel: string;
  category: any;
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
  hasRow: boolean;
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
    deityGroup,
    handlingLevel: table.handlingLevel,
    category: table.category,
    shouldGenerateTypes: needsTypeGeneration(table.name),
    shouldGenerateValidators: needsValidators(table.name),
    shouldGenerateUtils: needsUtils(table.name),
    shouldGenerateApiRoutes: needsApiRoutes(table.name),
    shouldGenerateHooks: needsHooks(table.name),
    hasRow: true
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
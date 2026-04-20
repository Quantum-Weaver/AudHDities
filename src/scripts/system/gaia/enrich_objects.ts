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

// ============================================================================
// ENRICHED INTERFACES (Simplified)
// ============================================================================

export interface EnrichedTable {
  name: string;
  deityFolder: string;
  category: ObjectCategory;
  handlingLevel: string;
  
  // Generation flags (derived from category)
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
  
  // Optional: For debugging/display only (not used for generation)
  notes?: string;
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

// ============================================================================
// BULK ENRICHMENT
// ============================================================================

export interface EnrichedExtractionResult {
  tables: EnrichedTable[];
}

/**
 * Enrich all extracted objects at once
 */
export function enrichAll(
  tableNames: string[],
  options?: { verbose?: boolean }
): EnrichedExtractionResult {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug('Enriching all extracted objects...');
  }
  
  return {
    tables: enrichTables(tableNames, options),
  };
}
// src/scripts/system/gaia/enrich_runtime_enums.ts
// ============================================================================
// ENRICH RUNTIME ENUMS (GAIA)
// ============================================================================
// Purpose: Add configuration to runtime enums
// ============================================================================

import type { RuntimeEnumInfo } from './extract_runtime_enums.js';
import { getEnumFolder } from '@/config/enum_mapping.js';
import { needsConstantGeneration } from '@/config/object_categories.js';
import { logDebug } from '../../shared/logger.js';

export interface EnrichedRuntimeEnum {
  name: string;
  values: string[];
  deityFolder: string;
  shouldGenerateConstants: boolean;
  originalEnum: RuntimeEnumInfo;
}

export interface EnrichRuntimeEnumsOptions {
  verbose?: boolean;
}

/**
 * Enrich a single runtime enum
 */
export function enrichRuntimeEnum(
  enumInfo: RuntimeEnumInfo,
  options?: EnrichRuntimeEnumsOptions
): EnrichedRuntimeEnum {
  const { verbose = false } = options || {};
  
  const deityFolder = getEnumFolder(enumInfo.name);
  const shouldGenerateConstants = needsConstantGeneration(enumInfo.name);
  
  if (verbose) {
    logDebug(`Enriching enum: ${enumInfo.name} -> ${deityFolder} (constants: ${shouldGenerateConstants})`);
  }
  
  return {
    name: enumInfo.name,
    values: enumInfo.values,
    deityFolder,
    shouldGenerateConstants,
    originalEnum: enumInfo
  };
}

/**
 * Enrich multiple runtime enums
 */
export function enrichRuntimeEnums(
  enums: RuntimeEnumInfo[],
  options?: EnrichRuntimeEnumsOptions
): EnrichedRuntimeEnum[] {
  const { verbose = false } = options || {};
  const results: EnrichedRuntimeEnum[] = [];
  
  for (const enumInfo of enums) {
    results.push(enrichRuntimeEnum(enumInfo, options));
  }
  
  if (verbose) {
    logDebug(`Enriched ${results.length} runtime enums`);
  }
  
  return results;
}
// src/scripts/system/gaia/extract/extract_names.ts
// ============================================================================
// EXTRACT NAMES (GAIA) - Type-First Extraction
// ============================================================================
// Purpose: Extract ONLY names from database.types.ts collections
// Full content extraction is NO LONGER NEEDED - helpers provide types!
// ============================================================================

import { logDebug, logSuccess, logWarning } from '../../../shared/logger.js';
import type { PublicTableNames, PublicViewNames, PublicEnumNames } from '@/lib/generated/supabase/database.helpers.js';

export interface ExtractNamesOptions {
  verbose?: boolean;
  maxItems?: number;  // 0 means no limit
}

// Pattern for matching object names in collections (6 spaces indentation)
const NAME_PATTERN = /^\s{6}(\w+):/;

// ============================================================================
// TABLE NAMES
// ============================================================================

/**
 * Extract all table names from the Tables collection
 */
export function extractTableNames(
  lines: string[],
  tablesStartLine: number,
  tablesEndLine: number,
  options?: ExtractNamesOptions
): string[] {
  const { verbose = false, maxItems = 0 } = options || {};
  const names: string[] = [];
  
  const startIdx = tablesStartLine - 1;
  const endIdx = tablesEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(NAME_PATTERN);
    if (match) {
      names.push(match[1]);
    }
  }
  
  if (verbose) {
    logDebug(`Found ${names.length} table names`);
    if (names.length > 0) {
      logDebug(`  First 5: ${names.slice(0, 5).join(', ')}`);
    }
  }
  
  return maxItems > 0 ? names.slice(0, maxItems) : names;
}

// ============================================================================
// VIEW NAMES
// ============================================================================

/**
 * Extract all view names from the Views collection
 */
export function extractViewNames(
  lines: string[],
  viewsStartLine: number,
  viewsEndLine: number,
  options?: ExtractNamesOptions
): string[] {
  const { verbose = false, maxItems = 0 } = options || {};
  const names: string[] = [];
  
  const startIdx = viewsStartLine - 1;
  const endIdx = viewsEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(NAME_PATTERN);
    if (match) {
      names.push(match[1]);
    }
  }
  
  if (verbose) {
    logDebug(`Found ${names.length} view names`);
  }
  
  return maxItems > 0 ? names.slice(0, maxItems) : names;
}

// ============================================================================
// FUNCTION NAMES
// ============================================================================

/**
 * Extract all function names from the Functions collection
 */
export function extractFunctionNames(
  lines: string[],
  functionsStartLine: number,
  functionsEndLine: number,
  options?: ExtractNamesOptions
): string[] {
  const { verbose = false, maxItems = 0 } = options || {};
  const names: string[] = [];
  
  const startIdx = functionsStartLine - 1;
  const endIdx = functionsEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(NAME_PATTERN);
    if (match) {
      names.push(match[1]);
    }
  }
  
  if (verbose) {
    logDebug(`Found ${names.length} function names`);
  }
  
  return maxItems > 0 ? names.slice(0, maxItems) : names;
}

// ============================================================================
// TYPE ENUM NAMES
// ============================================================================

/**
 * Extract all type enum names from the Enums collection (Database.public.Enums)
 */
export function extractTypeEnumNames(
  lines: string[],
  enumsStartLine: number,
  enumsEndLine: number,
  options?: ExtractNamesOptions
): string[] {
  const { verbose = false, maxItems = 0 } = options || {};
  const names: string[] = [];
  
  const startIdx = enumsStartLine - 1;
  const endIdx = enumsEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(NAME_PATTERN);
    if (match) {
      names.push(match[1]);
    }
  }
  
  if (verbose) {
    logDebug(`Found ${names.length} type enum names`);
  }
  
  return maxItems > 0 ? names.slice(0, maxItems) : names;
}

// ============================================================================
// COMPOSITE TYPE NAMES
// ============================================================================

/**
 * Extract all composite type names
 */
export function extractCompositeTypeNames(
  lines: string[],
  compositeStartLine: number,
  compositeEndLine: number,
  options?: ExtractNamesOptions
): string[] {
  const { verbose = false } = options || {};
  const names: string[] = [];
  
  const startIdx = compositeStartLine - 1;
  const endIdx = compositeEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(NAME_PATTERN);
    if (match) {
      names.push(match[1]);
    }
  }
  
  if (verbose) {
    logDebug(`Found ${names.length} composite type names`);
  }
  
  return names;
}

// ============================================================================
// VALIDATION AGAINST HELPER TYPES
// ============================================================================

/**
 * Validate that extracted table names match PublicTableNames
 * Useful for debugging discrepancies between extraction and helpers
 */
export function validateTableNames(
  extractedNames: string[],
  validTableNames: PublicTableNames[]
): { valid: string[]; invalid: string[] } {
  const validSet = new Set(validTableNames);
  const valid: string[] = [];
  const invalid: string[] = [];
  
  for (const name of extractedNames) {
    if (validSet.has(name as PublicTableNames)) {
      valid.push(name);
    } else {
      invalid.push(name);
    }
  }
  
  return { valid, invalid };
}

/**
 * Validate that extracted view names match PublicViewNames
 */
export function validateViewNames(
  extractedNames: string[],
  validViewNames: PublicViewNames[]
): { valid: string[]; invalid: string[] } {
  const validSet = new Set(validViewNames);
  const valid: string[] = [];
  const invalid: string[] = [];
  
  for (const name of extractedNames) {
    if (validSet.has(name as PublicViewNames)) {
      valid.push(name);
    } else {
      invalid.push(name);
    }
  }
  
  return { valid, invalid };
}

// ============================================================================
// BULK EXTRACTION
// ============================================================================

export interface ExtractedNames {
  tables: string[];
  views: string[];
  functions: string[];
  typeEnums: string[];
  compositeTypes: string[];
}

/**
 * Extract all names in one pass
 */
export function extractAllNames(
  lines: string[],
  markers: {
    tablesLine: number;
    tablesEndLine: number;
    viewsLine: number;
    viewsEndLine: number;
    functionsLine: number;
    functionsEndLine: number;
    enumsLine: number;
    enumsEndLine: number;
    compositeTypesLine: number;
    compositeTypesEndLine: number;
  },
  options?: ExtractNamesOptions
): ExtractedNames {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug('Extracting all names from database.types.ts...');
  }
  
  const tables = extractTableNames(lines, markers.tablesLine, markers.tablesEndLine, options);
  const views = extractViewNames(lines, markers.viewsLine, markers.viewsEndLine, options);
  const functions = extractFunctionNames(lines, markers.functionsLine, markers.functionsEndLine, options);
  const typeEnums = extractTypeEnumNames(lines, markers.enumsLine, markers.enumsEndLine, options);
  const compositeTypes = extractCompositeTypeNames(lines, markers.compositeTypesLine, markers.compositeTypesEndLine, options);
  
  if (verbose) {
    logSuccess(`Extracted: ${tables.length} tables, ${views.length} views, ${functions.length} functions, ${typeEnums.length} type enums, ${compositeTypes.length} composite types`);
  }
  
  return { tables, views, functions, typeEnums, compositeTypes };
}
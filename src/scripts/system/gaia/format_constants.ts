// src/scripts/system/gaia/format_constants.ts
// ============================================================================
// FORMAT CONSTANTS (GAIA)
// ============================================================================
// Purpose: Format runtime enums into constant object files
// Dependencies: types from extractRuntimeEnums, config from object-categories
// ============================================================================

import type { RuntimeEnumInfo } from './extract_runtime_enums.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { ImportManager } from '../../shared/import_manager.js';
import { cleanEnumValue } from '../../shared/quote_manager.js';
import type { ObjectCategory } from '@/config/object_categories.js';
import { EnrichedRuntimeEnum } from './enrich_objects.js';

export interface FormatConstantsOptions {
  verbose?: boolean;
}

export interface FormattedConstant {
  content: string;
  filePath: string;
  enumName: string;
  values: string[];
  deityFolder: string;
  category: ObjectCategory;
}

/**
 * Convert snake_case to PascalCase for type names
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Convert string to UPPER_SNAKE_CASE for constant keys
 */
function toUpperSnakeCase(str: string): string {
  return str.toUpperCase();
}

/**
 * Generate header comment for constant file
 */
function generateHeader(enumName: string, deityFolder: string, values: string[]): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: constants/generated/${deityFolder}/${enumName}.ts
// GENERATED: ${timestamp}
// SOURCE: Constants.public.Enums.${enumName}
// VALUES: ${values.length} entries
// =====================================================

`;
}

/**
 * Check if a constant key needs quotes in the object literal
 * - Contains slashes (date formats like 'YYYY-MM-DD', 'MM/DD/YYYY')
 * - Starts with a number (time formats like '12H', '24H')
 * - Contains special characters
 */
function needsQuotedKey(key: string): boolean {
  // Contains slash (date formats)
  if (key.includes('/')) return true;
  // Contains hyphen (date formats like 'YYYY-MM-DD' - though hyphen is fine, but safe to quote)
  if (key.includes('-')) return true;
  // Starts with a number (time formats like '12H', '24H')
  if (/^\d/.test(key)) return true;
  // Contains other special characters
  if (/[^a-zA-Z0-9_]/.test(key)) return true;
  return false;
}

/**
 * Format a runtime enum into a constant file content
 */
function formatConstantContent(enumInfo: RuntimeEnumInfo, deityFolder: string): string {
  const { name: enumName, values } = enumInfo;
  const constName = toUpperSnakeCase(enumName);
  const typeName = toPascalCase(enumName);
  
  // Special handling for time_format_type and date_format_type
  const needsQuoteWrapping = enumName === 'time_format_type' || enumName === 'date_format_type';
  
  if (!values || values.length === 0) {
    return `// SKIPPED: ${enumName} has no values\n`;
  }
  
  let content = generateHeader(enumName, deityFolder, values);
  
  content += `export const ${constName} = {\n`;
  
  for (const value of values) {
    const key = toUpperSnakeCase(value);
    const cleanValue = cleanEnumValue(value);
    
    if (needsQuoteWrapping) {
      // For time_format_type and date_format_type: wrap key in quotes
      content += `  "${key}": '${cleanValue}',\n`;
    } else {
      content += `  ${key}: '${cleanValue}',\n`;
    }
  }
  
  content += `} as const;\n\n`;
  content += `export type ${typeName} = typeof ${constName}[keyof typeof ${constName}];\n`;
  
  return content;
}

/**
 * Format a single runtime enum into a constant file
 * Resolves deity folder from object-categories config
 */
export function formatConstant(
  enumInfo: EnrichedRuntimeEnum,  // Extends RuntimeEnumInfo - has all properties
  options?: FormatConstantsOptions
): FormattedConstant | null {
  const { verbose = false } = options || {};
  const { name: enumName, deityFolder, category, shouldGenerateConstants, values } = enumInfo;
  
  // Check if this enum needs constant generation (using pre-resolved flag)
  if (!shouldGenerateConstants) {
    if (verbose) {
      logDebug(`Skipping constant for ${enumName} (not configured for constant generation)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Formatting constant: ${enumName} -> ${deityFolder}`);
  }
  
  // Skip if no values
  if (!values || values.length === 0) {
    logWarning(`Skipping constant for ${enumName}: no values found`);
    return null;
  }
  
  // Pass the full enumInfo - it has startLine, endLine, content, etc.
  const content = formatConstantContent(enumInfo, deityFolder);
  const filePath = `src/lib/constants/generated/${deityFolder}/${enumName}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    enumName,
    values,
    deityFolder,
    category
  };
}

/**
 * Format multiple runtime enums into constant files
 */
export function formatConstants(
  enums: EnrichedRuntimeEnum[],  // ← Changed from RuntimeEnumInfo[]
  options?: FormatConstantsOptions
): FormattedConstant[] {
  const { verbose = false } = options || {};
  const results: FormattedConstant[] = [];
  
  if (verbose) {
    logDebug(`Formatting ${enums.length} runtime enums...`);
  }
  
  for (const enumInfo of enums) {
    const formatted = formatConstant(enumInfo, options);
    if (formatted) {
      results.push(formatted);
      
      if (verbose) {
        logDebug(`  Formatted: ${enumInfo.name} -> ${formatted.deityFolder}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} constants`);
  }
  
  return results;
}
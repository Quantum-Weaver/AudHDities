// src/scripts/system/gaia/format_constants.ts
// ============================================================================
// FORMAT CONSTANTS (GAIA)
// ============================================================================
// Purpose: Format runtime enums into constant object files
// Dependencies: RuntimeEnumInfo from extract_runtime_enums.ts
// Output: src/lib/constants/generated/{deityFolder}/{enumName}.ts
// 
// NOTE: Constants are derived from runtime enums, NOT from tables.
// They do NOT go through table enrichment.
// ============================================================================

import type { RuntimeEnumInfo } from './extract_runtime_enums.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { TableInfo } from './index'

export interface FormatConstantsOptions {
  verbose?: boolean;
}

export interface FormattedConstant {
  content: string;
  filePath: string;
  enumName: string;
  values: string[];
  deityFolder: TableInfo["deityFolder"];
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
 */
function needsQuotedKey(key: string): boolean {
  if (key.includes('/')) return true;
  if (key.includes('-')) return true;
  if (/^\d/.test(key)) return true;
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
  
  const needsQuoteWrapping = enumName === 'time_format_type' || enumName === 'date_format_type';
  
  if (!values || values.length === 0) {
    return `// SKIPPED: ${enumName} has no values\n`;
  }
  
  let content = generateHeader(enumName, deityFolder, values);
  
  content += `export const ${constName} = {\n`;
  
  for (const value of values) {
    const key = toUpperSnakeCase(value);
    const cleanValue = value;
    
    if (needsQuoteWrapping) {
      content += `  "${key}": '${cleanValue}',\n`;
    } else if (needsQuotedKey(key)) {
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
 * 
 * @param enumInfo - Runtime enum info (from extraction, not enrichment)
 * @param deityFolder - Where to place the constant file
 * @param options - Optional settings
 */
export function formatConstant(
  enumInfo: RuntimeEnumInfo,
  deityFolder: TableInfo["deityFolder"],
  options?: FormatConstantsOptions
): FormattedConstant | null {
  const { verbose = false } = options || {};
  const { name: enumName, values } = enumInfo;
  
  if (verbose) {
    logDebug(`Formatting constant: ${enumName} -> ${deityFolder}`);
  }
  
  if (!values || values.length === 0) {
    logWarning(`Skipping constant for ${enumName}: no values found`);
    return null;
  }
  
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
    deityFolder
  };
}

/**
 * Format multiple runtime enums into constant files
 * 
 * @param enums - Array of runtime enum info
 * @param getDeityFolder - Function to determine deity folder for each enum
 * @param options - Optional settings
 */
export function formatConstants(
  enums: RuntimeEnumInfo[],
  getDeityFolder: (enumName: string) => string,
  options?: FormatConstantsOptions
): FormattedConstant[] {
  const { verbose = false } = options || {};
  const results: FormattedConstant[] = [];
  
  if (verbose) {
    logDebug(`Formatting ${enums.length} runtime enums...`);
  }
  
  for (const enumInfo of enums) {
    const deityFolder = getDeityFolder(enumInfo.name);
    const formatted = formatConstant(enumInfo, deityFolder, options);
    if (formatted) {
      results.push(formatted);
      
      if (verbose) {
        logDebug(`  Formatted: ${enumInfo.name} -> ${deityFolder}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} constants`);
  }
  
  return results;
}
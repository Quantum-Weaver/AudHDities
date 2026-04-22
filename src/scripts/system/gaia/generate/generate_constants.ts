// src/scripts/system/gaia/generate/generate_constants.ts
// ============================================================================
// GENERATE CONSTANTS (GAIA)
// ============================================================================
// Purpose: Generate runtime enum constant files
// Dependencies: RuntimeEnumInfo from extract_runtime_enums.ts
// Output: src/lib/constants/generated/{deityFolder}/{enumName}.ts
// 
// NOTE: Constants are derived from runtime enums, NOT from tables.
// They do NOT go through table enrichment.
// ============================================================================

import type { RuntimeEnumInfo } from '../extract/extract_runtime_enums';
import { logDebug, logSuccess, logWarning } from '../../../shared/logger';

// ============================================================================
// TYPES
// ============================================================================

export interface GenerateConstantsOptions {
  verbose?: boolean;
}

export interface GeneratedConstant {
  content: string;
  filePath: string;
  enumName: string;
  values: string[];  
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert snake_case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
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
 * Generate a runtime enum constant file content
 */
function generateConstantContent(enumInfo: RuntimeEnumInfo, deityFolder: string): string {
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

// ============================================================================
// MAIN GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate a single runtime enum constant file
 * 
 * @param enumInfo - Runtime enum info (from extraction, not enrichment)
 * @param deityFolder - Where to place the constant file
 * @param options - Optional settings
 */
export function generateConstant(
  enumInfo: RuntimeEnumInfo,
  deityFolder: string,
  options?: GenerateConstantsOptions
): GeneratedConstant | null {
  const { verbose = false } = options || {};
  const { name: enumName, values } = enumInfo;
  
  if (verbose) {
    logDebug(`Generating constant: ${enumName} -> ${deityFolder}`);
  }
  
  if (!values || values.length === 0) {
    logWarning(`Skipping constant for ${enumName}: no values found`);
    return null;
  }
  
  const content = generateConstantContent(enumInfo, deityFolder);
  const filePath = `src/lib/constants/generated/${deityFolder}/${enumName}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    enumName,
    values,
  };
}

/**
 * Generate multiple runtime enum constant files
 * 
 * @param enums - Array of runtime enum info
 * @param getDeityFolder - Function to determine deity folder for each enum
 * @param options - Optional settings
 */
export function generateConstants(
  enums: RuntimeEnumInfo[],
  getDeityFolder: (enumName: string) => string,
  options?: GenerateConstantsOptions
): GeneratedConstant[] {
  const { verbose = false } = options || {};
  const results: GeneratedConstant[] = [];
  
  if (verbose) {
    logDebug(`Generating ${enums.length} runtime enums...`);
  }
  
  for (const enumInfo of enums) {
    const deityFolder = getDeityFolder(enumInfo.name);
    const generated = generateConstant(enumInfo, deityFolder, options);  // ✅ FIXED: call generateConstant, not generateConstantContent
    
    if (generated) {
      results.push(generated);
      
      if (verbose) {
        logDebug(`  Generated: ${enumInfo.name} -> ${deityFolder}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Generated ${results.length} constants`);
  }
  
  return results;
}

// ============================================================================
// CONVENIENCE FUNCTION (Using enum_mapping directly)
// ============================================================================

/**
 * Generate constants using enum_mapping.ts for deity folder resolution
 * This is the preferred method - uses the authoritative enum mapping
 */
export async function generateConstantsWithMapping(
  enums: RuntimeEnumInfo[],
  options?: GenerateConstantsOptions
): Promise<GeneratedConstant[]> {
  const { verbose = false } = options || {};
  
  // Dynamic import to avoid circular dependency
  const { getEnumFolder } = await import('@/config/enum_mapping.js');
  
  return generateConstants(enums, (enumName) => getEnumFolder(enumName), options);
}
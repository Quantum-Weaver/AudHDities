// src/scripts/system/gaia/format_constants.ts
// ============================================================================
// FORMAT CONSTANTS (GAIA)
// ============================================================================
// Purpose: Format runtime enums into constant object files
// Dependencies: types from extractRuntimeEnums
// ============================================================================

import type { RuntimeEnumInfo } from './extract_runtime_enums.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { ObjectCategory } from '@/config/object_categories.js';
import { TableInfo } from './extract_tables.js';
import { getDeityFolderForObject } from '@/config/object_categories.js';

export interface FormatConstantsOptions {
  verbose?: boolean;
  deityFolder?: string;
  category?: ObjectCategory;
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
 * Convert string to PascalCase for type names
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
// FILE: constants/${deityFolder}/${enumName}.ts
// GENERATED: ${timestamp}
// SOURCE: Constants.public.Enums.${enumName}
// VALUES: ${values.length} entries
// =====================================================

`;
}

/**
 * Format a runtime enum into a constant file content
 */
function formatConstantContent( enumInfo: RuntimeEnumInfo, deityFolder: string): string {
  const { name: enumName, values } = enumInfo;
  const constName = toUpperSnakeCase(enumName);
  const typeName = toPascalCase(enumName);
  
  let content = generateHeader(enumName, deityFolder, values);
  
  content += `export const ${constName} = {\n`;
  
  for (const value of values) {
    const key = toUpperSnakeCase(value);
    content += `  ${key}: '${value}',\n`;
  }
  
  content += `} as const;\n\n`;
  content += `export type ${typeName} = typeof ${constName}[keyof typeof ${constName}];\n`;
  
  return content;
}

/**
 * Format a runtime enum into a constant file
 */
export function formatConstant(
  enumInfo: RuntimeEnumInfo,
  deityFolder: string,
  category: ObjectCategory, 
  options?: FormatConstantsOptions
): FormattedConstant {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug(`Formatting constant: ${enumInfo.name} -> ${deityFolder}`);
  }
  
  const content = formatConstantContent(enumInfo, deityFolder);
  const filePath = `src/lib/constants/generated/${deityFolder}/${enumInfo.name}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    enumName: enumInfo.name,
    values: enumInfo.values,
    deityFolder,
    category
  };
}

/**
 * Format multiple runtime enums into constant files
 */
export function formatConstants(
  enums: RuntimeEnumInfo[],
  getDeityFolder: (enumName: string) => string,
  getCategory: (tableName: string) => ObjectCategory,
  options?: FormatConstantsOptions
): FormattedConstant[] {
  const { verbose = false } = options || {};
  const results: FormattedConstant[] = [];
  
  if (verbose) {
    logDebug(`Formatting ${enums.length} runtime enums...`);
  }
  
  for (const enumInfo of enums) {
    const deityFolder = getDeityFolder(tableInfo.name);
    const category = getCategory(table);
    const formatted = formatConstant(enumInfo, deityFolder, options);
    results.push(formatted);
    
    if (verbose) {
      logDebug(`  Formatted: ${enumInfo.name} -> ${deityFolder}`);
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} constants`);
  }
  
  return results;
}
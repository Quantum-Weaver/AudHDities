// src/scripts/generators/gaia/formatTypes.ts
// ============================================================================
// FORMAT TYPES (GAIA)
// ============================================================================
// Purpose: Format table definitions into TypeScript type files
// Dependencies: types from extractTables, workflow-config, object-categories
// ============================================================================

import type { TableInfo } from './extract_tables.js';
import type { ObjectCategory } from '@/config/object-categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatTypesOptions {
  verbose?: boolean;
  deityFolder?: string;
  category?: ObjectCategory;
}

export interface FormattedType {
  content: string;
  filePath: string;
  tableName: string;
  category: ObjectCategory;
  deityFolder: string;
}

// Default sensitive fields to exclude from public interfaces
const DEFAULT_SENSITIVE_FIELDS = [
  'email',
  'password',
  'stripe_account_id',
  'stripe_account',
  'crisis_contact_email',
  'crisis_contact_phone',
  'crisis_contact_name',
  'crisis_instructions',
  'access_token',
  'refresh_token',
  'api_key',
  'secret_key',
  'private_key',
  'encrypted_data',
  'verification_token',
  'reset_token',
  'ip_address',
  'user_agent'
];

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
 * Generate enum exports from detected enum references
 */
function generateEnumExports(enumRefs: string[]): string {
  if (enumRefs.length === 0) return '';
  
  const lines: string[] = [];
  lines.push(`// =====================================================`);
  lines.push(`// ENUM EXPORTS (from database enums)`);
  lines.push(`// =====================================================`);
  lines.push(``);
  
  for (const enumRef of enumRefs) {
    const exportName = toPascalCase(enumRef);
    lines.push(`export type ${exportName} = Database['public']['Enums']['${enumRef}'];`);
  }
  
  return lines.join('\n');
}

/**
 * Generate public interface (excludes sensitive fields)
 */
function generatePublicInterface(
  tableName: string,
  rowContent: string,
  sensitiveFields: string[] = DEFAULT_SENSITIVE_FIELDS
): string {
  const lines = rowContent.split('\n');
  const publicFields: string[] = [];
  const excludedFields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+):/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      if (!sensitiveFields.includes(fieldName)) {
        publicFields.push(`  ${line.trim()};`);
      } else {
        excludedFields.push(fieldName);
      }
    }
  }
  
  if (publicFields.length === 0) {
    return '';
  }
  
  const interfaceName = `Public${pascalName}`;
  
  let result = `/**\n`;
  result += ` * Public view of ${tableName}\n`;
  if (excludedFields.length > 0) {
    result += ` * Excludes sensitive fields: ${excludedFields.join(', ')}\n`;
  }
  result += ` */\n`;
  result += `export interface ${interfaceName} {\n`;
  result += publicFields.join('\n');
  result += `\n}\n`;
  
  return result;
}

/**
 * Generate form data interface (all fields optional)
 */
function generateFormDataInterface(tableName: string, rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+):\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      fields.push(`  ${fieldName}?: ${fieldType};`);
    }
  }
  
  if (fields.length === 0) {
    return `// No form fields available for ${tableName}\n`;
  }
  
  const interfaceName = `${pascalName}FormData`;
  
  let result = `/**\n`;
  result += ` * Form data for ${tableName}\n`;
  result += ` * All fields are optional for partial updates\n`;
  result += ` */\n`;
  result += `export interface ${interfaceName} {\n`;
  result += fields.join('\n');
  result += `\n}\n`;
  
  return result;
}

/**
 * Generate validation result interface
 */
function generateValidationResultInterface(tableName: string, rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+):/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      fields.push(`    ${fieldName}?: string;`);
    }
  }
  
  if (fields.length === 0) {
    return `// No validation fields available for ${tableName}\n`;
  }
  
  const interfaceName = `${pascalName}ValidationResult`;
  
  let result = `/**\n`;
  result += ` * Validation result for ${tableName}\n`;
  result += ` */\n`;
  result += `export interface ${interfaceName} {\n`;
  result += `  valid: boolean;\n`;
  result += `  errors: {\n`;
  result += fields.join('\n');
  result += `\n  };\n`;
  result += `}\n`;
  
  return result;
}

/**
 * Generate header comment for type file
 */
function generateHeader(
  tableName: string,
  deityFolder: string,
  category: ObjectCategory,
  startLine: number,
  endLine: number
): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: types/generated/${deityFolder}/${tableName}.ts
// HANDLING: ${category.handlingLevel}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts lines ${startLine}-${endLine}
// =====================================================

import type { Database } from '@/types/supabase/database.types';

`;
}

/**
 * Format a table into a type file content
 */
function formatTypeContent(
  tableInfo: TableInfo,
  deityFolder: string,
  category: ObjectCategory
): string {
  const { name: tableName, rowContent, insertContent, updateContent, enumRefs, hasJson, startLine, endLine } = tableInfo;
  const pascalName = toPascalCase(tableName);
  
  let content = generateHeader(tableName, deityFolder, category, startLine, endLine);
  
  // Add Json import if needed
  if (hasJson) {
    content += `import type { Json } from '@/types/supabase/database.types';\n\n`;
  }
  
  // Add enum exports
  const enumExports = generateEnumExports(enumRefs);
  if (enumExports) {
    content += enumExports + '\n\n';
  }
  
  // Core types section
  content += `// =====================================================\n`;
  content += `// CORE TYPES\n`;
  content += `// =====================================================\n\n`;
  
  if (category.generateRow) {
    content += `export type ${pascalName}Row = Database['public']['Tables']['${tableName}']['Row'];\n`;
  }
  
  if (category.generateInsert) {
    content += `export type ${pascalName}Insert = Database['public']['Tables']['${tableName}']['Insert'];\n`;
  }
  
  if (category.generateUpdate) {
    content += `export type ${pascalName}Update = Database['public']['Tables']['${tableName}']['Update'];\n`;
  }
  
  content += `\n`;
  
  // Derived types section
  content += `// =====================================================\n`;
  content += `// DERIVED TYPES\n`;
  content += `// =====================================================\n\n`;
  
  // Public interface
  if (category.generatePublicInterface && rowContent) {
    const publicInterface = generatePublicInterface(tableName, rowContent);
    if (publicInterface) {
      content += publicInterface + '\n';
    }
  }
  
  // Form data interface
  if (category.generateFormInterface && rowContent) {
    content += generateFormDataInterface(tableName, rowContent) + '\n';
  }
  
  // Validation result interface
  if (category.generateValidationInterface && rowContent) {
    content += generateValidationResultInterface(tableName, rowContent) + '\n';
  }
  
  return content;
}

/**
 * Format a table into a type file
 */
export function formatType(
  tableInfo: TableInfo,
  deityFolder: string,
  category: ObjectCategory,
  options?: FormatTypesOptions
): FormattedType {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug(`Formatting type: ${tableInfo.name} -> ${deityFolder} (${category.handlingLevel})`);
  }
  
  const content = formatTypeContent(tableInfo, deityFolder, category);
  const filePath = `src/types/generated/${deityFolder}/${tableInfo.name}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    tableName: tableInfo.name,
    category,
    deityFolder
  };
}

/**
 * Format multiple tables into type files
 */
export function formatTypes(
  tables: TableInfo[],
  getDeityFolder: (tableName: string) => string,
  getCategory: (tableName: string) => ObjectCategory,
  options?: FormatTypesOptions
): FormattedType[] {
  const { verbose = false } = options || {};
  const results: FormattedType[] = [];
  
  if (verbose) {
    logDebug(`Formatting ${tables.length} tables...`);
  }
  
  for (const tableInfo of tables) {
    const deityFolder = getDeityFolder(tableInfo.name);
    const category = getCategory(tableInfo.name);
    const formatted = formatType(tableInfo, deityFolder, category, options);
    results.push(formatted);
    
    if (verbose) {
      logDebug(`  Formatted: ${tableInfo.name} -> ${deityFolder} (${category.handlingLevel})`);
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} type files`);
  }
  
  return results;
}
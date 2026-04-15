// src/scripts/generators/gaia/format_validators.ts
// ============================================================================
// FORMAT VALIDATORS (GAIA)
// ============================================================================
// Purpose: Format table definitions into Zod validator files
// Dependencies: types from extractTables, config from object-categories
// ============================================================================

import type { TableInfo } from './extract_tables.js';
import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { needsValidators } from '@/config/object_categories.js';

export interface FormatValidatorsOptions {
  verbose?: boolean;
}

export interface FormattedValidator {
  content: string;
  filePath: string;
  tableName: string;
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
 * Convert database type to Zod schema type
 */

function dbTypeToZod(fieldType: string, fieldName: string, importedConstants: Set<string> = new Set()): string {
  // Handle nullable types
  const isNullable = fieldType.includes(' | null');
  const baseType = fieldType.replace(' | null', '').trim();
  
  let zodType = '';
  
  // Basic types
  if (baseType === 'string') {
    zodType = 'z.string()';
  } else if (baseType === 'number') {
    zodType = 'z.number()';
  } else if (baseType === 'boolean') {
    zodType = 'z.boolean()';
  } else if (baseType === 'Json') {
    zodType = 'z.any()';
  } else if (baseType.match(/^[A-Z]\w+$/)) {
    // Enum reference - convert to screaming case for constant import
    // e.g., UserTier → USER_TIER
    const constantName = toScreamingCase(baseType);
    const importName = baseType;  // Keep PascalCase for type import
    const constantRef = constantName;
    
    // Track that we need to import this constant
    importedConstants.add(constantName);
    
    zodType = `z.enum(Object.values(${constantRef}))`;
  } else if (baseType.includes('|')) {
    // Union type - treat as inline enum (no import needed)
    const values = baseType.split('|').map(v => v.trim().replace(/['"]/g, ''));
    zodType = `z.enum([${values.map(v => `'${v}'`).join(', ')}])`;
  } else {
    // Fallback
    zodType = 'z.any()';
  }
  
  // Add nullable if needed
  if (isNullable) {
    zodType = `${zodType}.nullable()`;
  }
  
  return zodType;
}

/**
 * Convert PascalCase to SCREAMING_SNAKE_CASE
 * Examples: UserTier → USER_TIER, CouncilHouse → COUNCIL_HOUSE
 */

function toScreamingCase(str: string): string {
  // Insert underscore before each capital letter and convert to uppercase
  return str.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
}

/**
 * Generate header comment for validator file
 */

function generateValidatorHeader(tableName: string, deityFolder: string, importedConstants: Set<string>): string {
  const timestamp = new Date().toISOString();
  const pascalName = toPascalCase(tableName);
  
  let content = `// =====================================================
// FILE: validators/generated/${deityFolder}/${tableName}.ts
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

`;

  // Add constant imports if needed
  if (importedConstants.size > 0) {
    const constantImports = Array.from(importedConstants).sort();
    content += `// Import constants for enum validation
`;
    for (const constant of constantImports) {
      // Determine import path based on constant name pattern
      // This assumes constants are in hestia-core (adjust as needed)
      content += `import { ${constant} } from '@/lib/constants/generated/hestia-core/${constant.toLowerCase()}';
`;
    }
    content += `\n`;
  }
  
  return content;
}

/**
 * Generate Row schema (all fields required as in database)
 */
/**
 * Generate Row schema (all fields required as in database)
 */
function generateRowSchema(tableName: string, rowContent: string, importedConstants: Set<string>): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+):\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      const zodType = dbTypeToZod(fieldType, fieldName, importedConstants);
      fields.push(`  ${fieldName}: ${zodType},`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Row schema`;
  }
  
  return `export const ${pascalName}RowSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Generate Insert schema (all fields optional for creation)
 */
function generateInsertSchema(tableName: string, insertContent: string, importedConstants: Set<string>): string {
  const lines = insertContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    // Insert fields often have ? for optional
    const fieldMatch = line.match(/^\s*(\w+)\??:\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      const zodType = dbTypeToZod(fieldType, fieldName, importedConstants);
      // Make optional for insert schema
      const optionalZod = `${zodType}.optional()`;
      fields.push(`  ${fieldName}: ${optionalZod},`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Insert schema\n`;
  }
  
  return `export const ${pascalName}InsertSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Generate Update schema (all fields optional)
 */
function generateUpdateSchema(tableName: string, updateContent: string, importedConstants: Set<string>): string {
  const lines = updateContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    // Update fields often have ? for optional
    const fieldMatch = line.match(/^\s*(\w+)\??:\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      const zodType = dbTypeToZod(fieldType, fieldName, importedConstants);
      // Make optional for update schema
      const optionalZod = `${zodType}.optional()`;
      fields.push(`  ${fieldName}: ${optionalZod},`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Update schema\n`;
  }
  
  return `export const ${pascalName}UpdateSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Format a table into a validator file content
 */
function formatValidatorContent(tableInfo: TableInfo, deityFolder: string, importedConstants: Set<string>): string {
  const { name: tableName, rowContent, insertContent, updateContent } = tableInfo;
  const pascalName = toPascalCase(tableName);
  
  // Validate we have content to work with
  if (!rowContent || rowContent.trim() === '') {
    return `// SKIPPED: No row content found for ${tableName}\n`;
  }
  
  let content = generateValidatorHeader(tableName, deityFolder, importedConstants);
  
  content += `// =====================================================\n`;
  content += `// ${pascalName} SCHEMAS\n`;
  content += `// =====================================================\n\n`;
  
  if (rowContent) {
    content += generateRowSchema(tableName, rowContent, importedConstants) + '\n\n';
  }
  
  if (insertContent) {
    content += generateInsertSchema(tableName, insertContent, importedConstants) + '\n\n';
  }
  
  if (updateContent) {
    content += generateUpdateSchema(tableName, updateContent, importedConstants) + '\n\n';
  }
  
  content += `// =====================================================\n`;
  content += `// TYPE INFERENCE\n`;
  content += `// =====================================================\n\n`;
  
  if (rowContent) {
    content += `export type ${pascalName}RowInput = z.infer<typeof ${pascalName}RowSchema>;\n`;
  }
  
  if (insertContent) {
    content += `export type ${pascalName}InsertInput = z.infer<typeof ${pascalName}InsertSchema>;\n`;
  }
  
  if (updateContent) {
    content += `export type ${pascalName}UpdateInput = z.infer<typeof ${pascalName}UpdateSchema>;\n`;
  }
  
  return content;
}

/**
 * Format a table into a validator file
 */
export function formatValidator(
  tableInfo: TableInfo,
  deityFolder: string,
  category: ObjectCategory,
  options?: FormatValidatorsOptions
): FormattedValidator | null {
  const { verbose = false } = options || {};
  
  // Check if this table needs validators
  if (!needsValidators(tableInfo.name)) {
    if (verbose) {
      logDebug(`Skipping validator for ${tableInfo.name} (not configured for validators)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Formatting validator: ${tableInfo.name} -> ${deityFolder} (${category.handlingLevel})`);
  }
  
  // Validate row content exists
  if (!tableInfo.rowContent || tableInfo.rowContent.trim() === '') {
    logWarning(`No row content for ${tableInfo.name}, skipping validator generation`);
    return null;
  }
  
  const content = formatValidatorContent(tableInfo, deityFolder, new Set<string>());
  const filePath = `src/lib/validators/generated/${deityFolder}/${tableInfo.name}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    tableName: tableInfo.name,
    deityFolder,
    category
  };
}

/**
 * Format multiple tables into validator files
 */
export function formatValidators(
  tables: TableInfo[],
  getDeityFolder: (tableName: string) => string,
  getCategory: (tableName: string) => ObjectCategory,
  options?: FormatValidatorsOptions
): FormattedValidator[] {
  const { verbose = false } = options || {};
  const results: FormattedValidator[] = [];
  
  if (verbose) {
    logDebug(`Formatting validators for ${tables.length} tables...`);
  }
  
  for (const tableInfo of tables) {
    // Skip if no row content
    if (!tableInfo.rowContent || tableInfo.rowContent.trim() === '') {
      if (verbose) {
        logDebug(`  Skipping validator for ${tableInfo.name} (no row content)`);
      }
      continue;
    }
    
    const deityFolder = getDeityFolder(tableInfo.name);
    const category = getCategory(tableInfo.name);
    
    // Check if this table needs validators (using config)
    if (!needsValidators(tableInfo.name)) {
      if (verbose) {
        logDebug(`  Skipping validator for ${tableInfo.name} (not full_crud or assessment)`);
      }
      continue;
    }
    
    const formatted = formatValidator(tableInfo, deityFolder, category, options);
    if (formatted) {
      results.push(formatted);
      
      if (verbose) {
        logDebug(`  Formatted: ${tableInfo.name} -> ${deityFolder}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} validator files`);
  }
  
  return results;
}
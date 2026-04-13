// @/scripts/system/gaia/formatValidators.ts
// ============================================================================
// FORMAT VALIDATORS (GAIA)
// ============================================================================
// Purpose: Format table definitions into Zod validator files
// Dependencies: types from extractTables
// ============================================================================

import type { TableInfo } from './extract_tables.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatValidatorsOptions {
  verbose?: boolean;
}

export interface FormattedValidator {
  content: string;
  filePath: string;
  tableName: string;
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
function dbTypeToZod(fieldType: string, fieldName: string): string {
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
    // Enum reference (PascalCase type name)
    zodType = `z.enum(Object.values(${baseType}))`;
  } else if (baseType.includes('|')) {
    // Union type - treat as enum
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
 * Generate header comment for validator file
 */
function generateHeader(tableName: string): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: validators/generated/${tableName}.ts
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

`;
}

/**
 * Generate Row schema (all fields required as in database)
 */
function generateRowSchema(tableName: string, rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const fieldMatch = line.match(/^\s*(\w+):\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      const zodType = dbTypeToZod(fieldType, fieldName);
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
function generateInsertSchema(tableName: string, insertContent: string): string {
  const lines = insertContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    // Insert fields often have ? for optional
    const fieldMatch = line.match(/^\s*(\w+)\??:\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      const zodType = dbTypeToZod(fieldType, fieldName);
      // Make optional for insert schema
      const optionalZod = `${zodType}.optional()`;
      fields.push(`  ${fieldName}: ${optionalZod},`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Insert schema`;
  }
  
  return `export const ${pascalName}InsertSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Generate Update schema (all fields optional)
 */
function generateUpdateSchema(tableName: string, updateContent: string): string {
  const lines = updateContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    // Update fields often have ? for optional
    const fieldMatch = line.match(/^\s*(\w+)\??:\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2].trim();
      const zodType = dbTypeToZod(fieldType, fieldName);
      // Make optional for update schema
      const optionalZod = `${zodType}.optional()`;
      fields.push(`  ${fieldName}: ${optionalZod},`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Update schema`;
  }
  
  return `export const ${pascalName}UpdateSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Format a table into a validator file content
 */
function formatValidatorContent(tableInfo: TableInfo): string {
  const { name: tableName, rowContent, insertContent, updateContent } = tableInfo;
  const pascalName = toPascalCase(tableName);
  
  let content = generateHeader(tableName);
  
  content += `// =====================================================\n`;
  content += `// ${pascalName} SCHEMAS\n`;
  content += `// =====================================================\n\n`;
  
  if (rowContent) {
    content += generateRowSchema(tableName, rowContent) + '\n\n';
  }
  
  if (insertContent) {
    content += generateInsertSchema(tableName, insertContent) + '\n\n';
  }
  
  if (updateContent) {
    content += generateUpdateSchema(tableName, updateContent) + '\n\n';
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
  options?: FormatValidatorsOptions
): FormattedValidator {
  const { verbose = false } = options || {};
  
  if (verbose) {
    logDebug(`Formatting validator: ${tableInfo.name}`);
  }
  
  const content = formatValidatorContent(tableInfo);
  const filePath = `lib/validators/generated/${tableInfo.name}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    tableName: tableInfo.name
  };
}

/**
 * Format multiple tables into validator files
 * Only formats tables with full_crud or assessment handling levels
 */
export function formatValidators(
  tables: TableInfo[],
  shouldGenerate: (tableName: string) => boolean,
  options?: FormatValidatorsOptions
): FormattedValidator[] {
  const { verbose = false } = options || {};
  const results: FormattedValidator[] = [];
  
  if (verbose) {
    logDebug(`Formatting validators for ${tables.length} tables...`);
  }
  
  for (const tableInfo of tables) {
    if (!shouldGenerate(tableInfo.name)) {
      if (verbose) {
        logDebug(`  Skipping validator for ${tableInfo.name} (not full_crud or assessment)`);
      }
      continue;
    }
    
    const formatted = formatValidator(tableInfo, options);
    results.push(formatted);
    
    if (verbose) {
      logDebug(`  Formatted: ${tableInfo.name}`);
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} validator files`);
  }
  
  return results;
}
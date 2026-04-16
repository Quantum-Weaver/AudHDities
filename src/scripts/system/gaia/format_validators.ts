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
 * Convert PascalCase to SCREAMING_SNAKE_CASE
 * Examples: UserTier → USER_TIER, CouncilHouse → COUNCIL_HOUSE
 * Also handles: BridgeStatus → BRIDGE_STATUS
 */
function toScreamingCase(str: string): string {
  // Handle special case: already screaming?
  if (str === str.toUpperCase() && str.includes('_')) {
    return str;
  }
  // Insert underscore before each capital letter and convert to uppercase
  return str.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
}

/**
 * Convert database type to Zod schema type
 * @param fieldType - The database field type
 * @param fieldName - The field name (unused but kept for context)
 * @param importedConstants - Set to track which constants need imports
 */
function dbTypeToZod(fieldType: string, fieldName: string, importedConstants: Set<string>): string {
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
    // e.g., BridgeStatus → BRIDGE_STATUS
    const constantName = toScreamingCase(baseType);
    
    // Track that we need to import this constant
    importedConstants.add(constantName);
    
    zodType = `z.enum(Object.values(${constantName}))`;
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
 * Generate header comment for validator file with constant imports
 */
function generateHeader(tableName: string, deityFolder: string, importedConstants: Set<string>): string {
  const timestamp = new Date().toISOString();
  let content = `// =====================================================
// FILE: validators/generated/${deityFolder}/${tableName}.ts
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

`;

  // Add constant imports if any enums were detected
  if (importedConstants.size > 0) {
    const sortedConstants = Array.from(importedConstants).sort();
    for (const constantName of sortedConstants) {
      // Convert constant name to kebab-case for file path
      // BRIDGE_STATUS → bridge_status
      const constantFileName = constantName.toLowerCase();
      content += `import { ${constantName} } from '@/lib/constants/generated/${deityFolder}/${constantFileName}';\n`;
    }
    content += `\n`;
  }
  
  return content;
}

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
    return `// No fields found for ${tableName} Row schema\n`;
  }
  
  return `export const ${pascalName}RowSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Generate Insert schema (respect database required/optional)
 */
function generateInsertSchema(tableName: string, insertContent: string, importedConstants: Set<string>): string {
  const lines = insertContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    // Capture field with optional marker (?) and type
    // Matches: "  field?: type" OR "  field: type"
    const fieldMatch = line.match(/^\s*(\w+)(\?)?:\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const isOptional = fieldMatch[2] === '?';  // ✅ DETECT if field has ? modifier
      const fieldType = fieldMatch[3].trim();
      const zodType = dbTypeToZod(fieldType, fieldName, importedConstants);
      
      // ✅ ONLY add .optional() if the database marks it optional
      const finalZod = isOptional ? `${zodType}.optional()` : zodType;
      fields.push(`  ${fieldName}: ${finalZod},`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Insert schema\n`;
  }
  
  return `export const ${pascalName}InsertSchema = z.object({\n${fields.join('\n')}\n});`;
}

function generateUpdateSchema(tableName: string, updateContent: string, importedConstants: Set<string>): string {
  const lines = updateContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    // Update fields also have ? for optional
    const fieldMatch = line.match(/^\s*(\w+)(\?)?:\s*(.+)/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const isOptional = fieldMatch[2] === '?';
      const fieldType = fieldMatch[3].trim();
      const zodType = dbTypeToZod(fieldType, fieldName, importedConstants);
      
      // Update schemas should ALWAYS be optional (they're partial updates)
      // But preserve the database's nullability
      const finalZod = `${zodType}.optional()`;
      fields.push(`  ${fieldName}: ${finalZod},`);
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
function formatValidatorContent(tableInfo: TableInfo, deityFolder: string): string {
  const { name: tableName, rowContent, insertContent, updateContent } = tableInfo;
  const pascalName = toPascalCase(tableName);
  const importedConstants = new Set<string>();
  
  // Validate we have content to work with
  if (!rowContent || rowContent.trim() === '') {
    return `// SKIPPED: No row content found for ${tableName}\n`;
  }
  
  // Generate schemas (they populate importedConstants)
  const rowSchema = generateRowSchema(tableName, rowContent, importedConstants);
  const insertSchema = insertContent ? generateInsertSchema(tableName, insertContent, importedConstants) : '';
  const updateSchema = updateContent ? generateUpdateSchema(tableName, updateContent, importedConstants) : '';
  
  // Generate header with imports
  let content = generateHeader(tableName, deityFolder, importedConstants);
  
  content += `// =====================================================\n`;
  content += `// ${pascalName} SCHEMAS\n`;
  content += `// =====================================================\n\n`;
  
  content += rowSchema + '\n\n';
  
  if (insertSchema) {
    content += insertSchema + '\n\n';
  }
  
  if (updateSchema) {
    content += updateSchema + '\n\n';
  }
  
  content += `// =====================================================\n`;
  content += `// TYPE INFERENCE\n`;
  content += `// =====================================================\n\n`;
  
  content += `export type ${pascalName}RowInput = z.infer<typeof ${pascalName}RowSchema>;\n`;
  
  if (insertSchema) {
    content += `export type ${pascalName}InsertInput = z.infer<typeof ${pascalName}InsertSchema>;\n`;
  }
  
  if (updateSchema) {
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
  
  const content = formatValidatorContent(tableInfo, deityFolder);
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
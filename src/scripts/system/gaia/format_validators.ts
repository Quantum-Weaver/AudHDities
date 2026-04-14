// src/scripts/system/gaia/format_validators.ts
// ============================================================================
// FORMAT VALIDATORS (GAIA)
// ============================================================================
// Purpose: Format table definitions into Zod validator files
// Dependencies: EnrichedTable from enrich_objects, shared utilities
// ============================================================================

import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { ImportManager } from '../../shared/import_manager.js';
import { formatFieldDeclaration, parseFieldLine } from '../../shared/quote_manager.js';
import type { EnrichedTable } from './enrich_objects.js';
import { getEnumFolder } from '@/config/enum_mapping.js';

export interface FormatValidatorsOptions {
  verbose?: boolean;
  dryRun?: boolean;
  forceOverwrite?: boolean;
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
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

/**
 * Convert PascalCase to snake_case for file names
 */
function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

/**
 * Extract enum names from a field type string
 * Example: "UserTier | null" → ["UserTier"]
 * Example: "CouncilHouse" → ["CouncilHouse"]
 * Example: "UserTier | CouncilHouse" → ["UserTier", "CouncilHouse"]
 */
function extractEnumNames(fieldType: string): string[] {
  const enumNames: string[] = [];
  // Match PascalCase words (starts with uppercase, followed by lowercase or uppercase)
  const pascalPattern = /\b([A-Z][a-zA-Z0-9]*)\b/g;
  let match;
  
  while ((match = pascalPattern.exec(fieldType)) !== null) {
    const candidate = match[1];
    // Skip common non-enum PascalCase types
    if (!['Json', 'Date', 'String', 'Number', 'Boolean', 'Array', 'Object'].includes(candidate)) {
      if (!enumNames.includes(candidate)) {
        enumNames.push(candidate);
      }
    }
  }
  
  return enumNames;
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
 * Generate header comment for validator file (no imports yet)
 */
function generateHeader(tableName: string, deityFolder: string): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: validators/generated/${deityFolder}/${tableName}.ts
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

`;
}

/**
 * Generate Row schema (all fields required as in database)
 */
function generateRowSchema(
  tableName: string, 
  rowContent: string, 
  importManager: ImportManager,
  table: EnrichedTable
): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  const collectedEnums: string[] = [];
  
  // Add zod import
  importManager.addDefaultImport('zod', 'z');
  
  for (const line of lines) {
    const parsed = parseFieldLine(line);
    if (parsed) {
      const { fieldName, fieldType } = parsed;
      
      // Extract enum names from field type (handles "UserTier | null" etc.)
      const enumNames = extractEnumNames(fieldType);
      for (const enumName of enumNames) {
        if (!collectedEnums.includes(enumName)) {
          collectedEnums.push(enumName);
          // Look up deity folder for this enum
          const enumDeityFolder = getEnumFolder(toSnakeCase(enumName));
          const snakeName = toSnakeCase(enumName);
          importManager.addImport(
            `@/lib/constants/generated/${enumDeityFolder}/${snakeName}`,
            enumName,
            true  // isType
          );
        }
      }
      
      const zodType = dbTypeToZod(fieldType, fieldName);
      const formattedField = formatFieldDeclaration(fieldName, zodType);
      fields.push(`  ${formattedField}`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Row schema\n`;
  }
  
  return `export const ${pascalName}RowSchema = z.object({\n${fields.join('\n')}\n}),`;
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
      const formattedField = formatFieldDeclaration(fieldName, optionalZod);
      fields.push(`  ${formattedField}`);
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
      const formattedField = formatFieldDeclaration(fieldName, optionalZod);
      fields.push(`  ${formattedField}`);
    }
  }
  
  if (fields.length === 0) {
    return `// No fields found for ${tableName} Update schema\n`;
  }
  
  return `export const ${pascalName}UpdateSchema = z.object({\n${fields.join('\n')}\n});`;
}

/**
 * Generate type inference exports
 */
function generateTypeInference(tableName: string, hasRow: boolean, hasInsert: boolean, hasUpdate: boolean): string {
  const pascalName = toPascalCase(tableName);
  const lines: string[] = [];
  
  lines.push(`// =====================================================`);
  lines.push(`// TYPE INFERENCE`);
  lines.push(`// =====================================================`);
  lines.push(``);
  
  if (hasRow) {
    lines.push(`export type ${pascalName}RowInput = z.infer<typeof ${pascalName}RowSchema>;`);
  }
  
  if (hasInsert) {
    lines.push(`export type ${pascalName}InsertInput = z.infer<typeof ${pascalName}InsertSchema>;`);
  }
  
  if (hasUpdate) {
    lines.push(`export type ${pascalName}UpdateInput = z.infer<typeof ${pascalName}UpdateSchema>;`);
  }
  
  return lines.join('\n');
}

/**
 * Format a table into a validator file content
 * Imports are handled LAST, after all content is generated
 */
function formatValidatorContent(table: EnrichedTable): string {
  const { name: tableName, deityFolder, rowContent, insertContent, updateContent } = table;
  const importManager = new ImportManager();
  
  // Validate we have content to work with
  if (!rowContent || rowContent.trim() === '') {
    return `// SKIPPED: No row content found for ${tableName}\n`;
  }
  
  // Generate header (no imports yet)
  let content = generateHeader(tableName, deityFolder);
  
  // Determine which schemas exist
  const hasRow = !!(rowContent && rowContent.trim());
  const hasInsert = !!(insertContent && insertContent.trim());
  const hasUpdate = !!(updateContent && updateContent.trim());
  
  // Generate all schemas FIRST (they add imports to the manager)
  let schemasContent = '';
  
  if (hasRow) {
    schemasContent += generateRowSchema(tableName, rowContent, importManager, table) + '\n\n';
  }
  
  if (hasInsert) {
    schemasContent += generateInsertSchema(tableName, insertContent) + '\n\n';
  }
  
  if (hasUpdate) {
    schemasContent += generateUpdateSchema(tableName, updateContent) + '\n\n';
  }
  
  schemasContent += generateTypeInference(tableName, hasRow, hasInsert, hasUpdate) + '\n';
  
  // NOW generate the import block (after all imports are collected)
  const importBlock = importManager.getImportBlock();
  if (importBlock) {
    content += importBlock + '\n\n';
  }
  
  // Add section header and schemas
  content += `// =====================================================\n`;
  content += `// ${toPascalCase(tableName)} SCHEMAS\n`;
  content += `// =====================================================\n\n`;
  
  content += schemasContent;
  
  return content;
}

/**
 * Format a table into a validator file
 * Accepts EnrichedTable (pre-resolved configuration)
 */
export function formatValidator(
  table: EnrichedTable,
  options?: FormatValidatorsOptions
): FormattedValidator | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, category, shouldGenerateValidators, rowContent } = table;
  
  // Check if this table needs validators (using pre-resolved flag from enrichment)
  if (!shouldGenerateValidators) {
    if (verbose) {
      logDebug(`Skipping validator for ${tableName} (not configured for validators)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Formatting validator: ${tableName} -> ${deityFolder} (${category.handlingLevel})`);
  }
  
  // Validate row content exists
  if (!rowContent || rowContent.trim() === '') {
    logWarning(`No row content for ${tableName}, skipping validator generation`);
    return null;
  }
  
  const content = formatValidatorContent(table);
  const filePath = `src/lib/validators/generated/${deityFolder}/${tableName}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    tableName,
    deityFolder,
    category
  };
}

/**
 * Format multiple tables into validator files
 * Accepts pre-enriched tables - no callbacks needed
 */
export function formatValidators(
  tables: EnrichedTable[],
  options?: FormatValidatorsOptions
): FormattedValidator[] {
  const { verbose = false } = options || {};
  const results: FormattedValidator[] = [];
  
  if (verbose) {
    logDebug(`Formatting validators for ${tables.length} tables...`);
  }
  
  for (const table of tables) {
    // Skip if no row content
    if (!table.rowContent || table.rowContent.trim() === '') {
      if (verbose) {
        logDebug(`  Skipping validator for ${table.name} (no row content)`);
      }
      continue;
    }
    
    const formatted = formatValidator(table, options);
    if (formatted) {
      results.push(formatted);
      
      if (verbose) {
        logDebug(`  Formatted: ${table.name} -> ${table.deityFolder}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} validator files`);
  }
  
  return results;
}
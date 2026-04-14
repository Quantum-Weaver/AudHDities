// src/scripts/generators/gaia/format_types.ts
// ============================================================================
// FORMAT TYPES (GAIA)
// ============================================================================
// Purpose: Format table definitions into TypeScript type files
// Dependencies: EnrichedTable from enrich_objects, config from object-categories
// ============================================================================

import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { ImportManager } from '../../shared/import_manager.js';
import { formatFieldDeclaration, parseFieldLine } from '../../shared/quote_manager.js';
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';
import type { EnrichedTable } from './enrich_objects.js';

export interface FormatTypesOptions {
  verbose?: boolean;
}

export interface FormattedType {
  content: string;
  filePath: string;
  tableName: string;
  category: ObjectCategory;
  deityFolder: string;
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
 * Uses formatFieldDeclaration for proper quote wrapping of time/date fields
 */
function generatePublicInterface(
  tableName: string,
  rowContent: string,
  sensitiveFields: string[] = SENSITIVE_FIELDS
): string {
  const lines = rowContent.split('\n');
  const publicFields: string[] = [];
  const excludedFields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const parsed = parseFieldLine(line);
    if (parsed) {
      const { fieldName, fieldType } = parsed;
      if (!sensitiveFields.includes(fieldName)) {
        publicFields.push(`  ${formatFieldDeclaration(fieldName, fieldType)}`);
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
 * Generate own profile interface (includes sensitive fields)
 * Only generated for 'profiles' table
 * Uses formatFieldDeclaration for proper quote wrapping
 */
function generateOwnProfileInterface(
  tableName: string,
  rowContent: string
): string {
  if (tableName !== 'profiles') return '';
  
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const parsed = parseFieldLine(line);
    if (parsed) {
      const { fieldName, fieldType } = parsed;
      fields.push(`  ${formatFieldDeclaration(fieldName, fieldType)}`);
    }
  }
  
  if (fields.length === 0) return '';
  
  let result = `/**\n`;
  result += ` * Own profile - includes all fields\n`;
  result += ` */\n`;
  result += `export interface Own${pascalName} extends Public${pascalName} {\n`;
  result += fields.join('\n');
  result += `\n}\n`;
  
  return result;
}

/**
 * Generate form data interface (all fields optional)
 * Uses formatFieldDeclaration for proper quote wrapping
 */
function generateFormDataInterface(tableName: string, rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  const pascalName = toPascalCase(tableName);
  
  for (const line of lines) {
    const parsed = parseFieldLine(line);
    if (parsed) {
      const { fieldName, fieldType } = parsed;
      // Make optional for form data
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
    const parsed = parseFieldLine(line);
    if (parsed) {
      const { fieldName } = parsed;
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

`;
}

/**
 * Format a table into a type file content
 */
function formatTypeContent(table: EnrichedTable): string {
  const { 
    name: tableName, 
    rowContent, 
    enumRefs, 
    hasJson, 
    startLine, 
    endLine,
    deityFolder,
    category
  } = table;
  const pascalName = toPascalCase(tableName);
  
  // Validate we have content to work with
  if (!rowContent || rowContent.trim() === '') {
    logWarning(`No row content for ${tableName}, skipping type generation`);
    return `// SKIPPED: No row content found for ${tableName}\n`;
  }
  
  // Use ImportManager to collect and deduplicate imports
  const importManager = new ImportManager();
  
  // Add Database import
  importManager.addImport('@/types/supabase/database.types', 'Database', true);
  
  // Add Json import if needed
  if (hasJson) {
    importManager.addImport('@/types/supabase/database.types', 'Json', true);
  }
  
  const importBlock = importManager.getImportBlock();
  
  let content = generateHeader(tableName, deityFolder, category, startLine, endLine);
  
  if (importBlock) {
    content += importBlock + '\n\n';
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
  
  // Own profile interface (special case for profiles table)
  if (tableName === 'profiles') {
    const ownProfile = generateOwnProfileInterface(tableName, rowContent);
    if (ownProfile) {
      content += ownProfile + '\n';
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
 * Accepts EnrichedTable directly - no need for additional callbacks
 */
export function formatType(
  table: EnrichedTable,
  options?: FormatTypesOptions
): FormattedType | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, category, rowContent } = table;
  
  if (verbose) {
    logDebug(`Formatting type: ${tableName} -> ${deityFolder} (${category.handlingLevel})`);
  }
  
  // Validate row content exists
  if (!rowContent || rowContent.trim() === '') {
    logWarning(`No row content for ${tableName}, skipping type generation`);
    return null;
  }
  
  const content = formatTypeContent(table);
  const filePath = `src/types/generated/${deityFolder}/${tableName}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    tableName,
    category,
    deityFolder
  };
}

/**
 * Format multiple tables into type files
 * Accepts EnrichedTable array directly - no callbacks needed
 */
export function formatTypes(
  tables: EnrichedTable[],
  options?: FormatTypesOptions
): FormattedType[] {
  const { verbose = false } = options || {};
  const results: FormattedType[] = [];
  
  if (verbose) {
    logDebug(`Formatting ${tables.length} tables...`);
  }
  
  for (const table of tables) {
    const formatted = formatType(table, options);
    if (formatted) {
      results.push(formatted);
      
      if (verbose) {
        logDebug(`  Formatted: ${table.name} -> ${table.deityFolder} (${table.category.handlingLevel})`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} type files`);
  }
  
  return results;
}
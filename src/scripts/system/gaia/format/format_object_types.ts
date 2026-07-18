/* src/scripts/system/gaia/format/format_object_types.ts */
// Format an extracted table object into TypeScript type definitions
// Extracts Row, Insert, Update types and generates derived interfaces

import type { ExtractedObject, ExtractedObjectWithDetails, FormattedTypeContent } from '@/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '@/scripts/shared/logger.js';
import { getObjectCategory, type ObjectCategory } from '@/config/object_categories.js';
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';
import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

export interface FormatObjectTypesOptions {
  verbose?: boolean;
  includeTimestamps?: boolean;
  sensitiveFields?: string[];     // Fields to exclude from public interfaces
  deityGroup?: string;             // For header comments
  outputFolder?: string;           // For header comments
}

// Sensitive fields to exclude from public interfaces — single source of
// truth is @/config/sensitive_fields (this file used to carry its own
// hardcoded copy, which silently drifted from the config; unified
// 2026-07-18 so a config edit reaches every generated Public interface).
const DEFAULT_SENSITIVE_FIELDS = [...SENSITIVE_FIELDS];

/**
 * Collapse multiline type declarations onto one line.
 * database.types.ts renders long union types like:
 *   emergency_contact:
 *     | Database["public"]["CompositeTypes"]["emergency_contact"]
 *     | null
 * The line-based field regexes below would otherwise emit an empty type
 * (`emergency_contact:;`) and drop the continuation lines — the exact
 * syntax error that suppressed the repo's whole typecheck until 2026-07-18.
 */
export function normalizeMultilineTypes(rowContent: string): string {
  const out: string[] = [];
  for (const raw of rowContent.split('\n')) {
    const line = raw.trimEnd();
    const startsContinuation = /^\s*\|/.test(line);
    const prev = out[out.length - 1];
    if (prev !== undefined && (startsContinuation || prev.trimEnd().endsWith(':'))) {
      out[out.length - 1] = `${prev} ${line.trim()}`;
    } else {
      out.push(line);
    }
  }
  return out.join('\n');
}

/**
 * Convert snake_case to PascalCase
 */
export function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

/**
 * Convert snake_case to UPPER_SNAKE_CASE
 */
export function toUpperSnakeCase(str: string): string {
  return str.toUpperCase();
}

/**
 * Parse an object's content to extract Row, Insert, Update definitions
 */
export function parseTableContent(content: string): {
  rowContent: string;
  insertContent: string;
  updateContent: string;
  enumRefs: string[];
  hasJson: boolean;
} {
  const enumRefs: string[] = [];
  let hasJson = false;
  
  const lines = content.split('\n');
  
  let rowStartLine = -1;
  let rowEndLine = -1;
  let insertStartLine = -1;
  let updateStartLine = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*Row:\s*\{/)) rowStartLine = i;
    if (line.match(/^\s*Insert:\s*\{/)) insertStartLine = i;
    if (line.match(/^\s*Update:\s*\{/)) updateStartLine = i;
  }
  
  if (rowStartLine !== -1 && insertStartLine !== -1) {
    rowEndLine = insertStartLine - 1;
    const rowLines = lines.slice(rowStartLine + 1, rowEndLine);
    let rowContent = normalizeMultilineTypes(rowLines.join('\n').trim());

    if (rowContent.endsWith('}')) {
      rowContent = rowContent.slice(0, -1).trim();
    }
    
    const enumPattern = /Database\["public"\]\["Enums"\]\["(\w+)"\]/g;
    let match;
    while ((match = enumPattern.exec(rowContent)) !== null) {
      if (!enumRefs.includes(match[1])) {
        enumRefs.push(match[1]);
      }
    }
    
    for (const enumRef of enumRefs) {
      const pascalCase = toPascalCase(enumRef);
      rowContent = rowContent.replace(new RegExp(`Database\\["public"\\]\\["Enums"\\]\\["${enumRef}"\\]`, 'g'), pascalCase);
    }
    
    hasJson = rowContent.includes('Json');
    
    return { rowContent, insertContent: '', updateContent: '', enumRefs, hasJson };
  }
  
  return { rowContent: '', insertContent: '', updateContent: '', enumRefs: [], hasJson: false };
}

/**
 * Generate enum exports from detected enum references
 */
export function generateEnumExports(enumRefs: string[]): string {
  if (enumRefs.length === 0) return '';
  
  const lines: string[] = [];
  lines.push(`// =====================================================`);
  lines.push(`// ENUM EXPORTS (from database enums)`);
  lines.push(`// =====================================================`);
  lines.push(``);
  
  for (const enumRef of enumRefs) {
    const exportName = toPascalCase(enumRef);
    lines.push(`export type ${exportName} = Enums<'${enumRef}'>;`);
  }
  
  return lines.join('\n');
}

/**
 * Generate public interface (excludes sensitive fields)
 */
export function generatePublicInterface(
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
  
  if (publicFields.length === 0) return '';
  
  const interfaceName = `Public${pascalName}`;
  
  let result = `/**\n * Public view of ${tableName}\n`;
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
export function generateFormDataInterface(tableName: string, rowContent: string): string {
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
    console.log(`  Warning: No fields found for ${tableName} form data interface`);
  }
  
  const interfaceName = `${pascalName}FormData`;
  
  let result = `/**\n * Form data for ${tableName}\n`;
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
export function generateValidationResultInterface(tableName: string, rowContent: string): string {
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
  
  const interfaceName = `${pascalName}ValidationResult`;
  
  let result = `/**\n * Validation result for ${tableName}\n */\n`;
  result += `export interface ${interfaceName} {\n`;
  result += `  valid: boolean;\n`;
  result += `  errors: {\n`;
  result += fields.join('\n');
  result += `\n  };\n`;
  result += `}\n`;
  
  return result;
}

/**
 * Generate the complete type file content for a table
 */
export function formatObjectTypes(
  object: ExtractedObjectWithDetails,
  category: ObjectCategory,
  options: FormatObjectTypesOptions = {}
): FormattedTypeContent {
  const {
    verbose = false,
    includeTimestamps = true,
    sensitiveFields = DEFAULT_SENSITIVE_FIELDS,
    deityGroup = 'unknown',
    outputFolder = 'unknown'
  } = options;
  
  const timestamp = new Date().toISOString();
  const tableName = object.name;
  const pascalName = toPascalCase(tableName);
  
  // Defensive normalization: rowContent may arrive from the extract phase
  // (bypassing parseTableContent) still carrying multiline type unions.
  let rowContent = normalizeMultilineTypes(object.rowContent || '');
  let insertContent = object.insertContent || '';
  let updateContent = object.updateContent || '';
  let enumRefs = object.enumRefs || [];
  let hasJson = object.hasJson || false;

  if (!rowContent && object.content) {
    const parsed = parseTableContent(object.content);
    rowContent = parsed.rowContent;
    insertContent = parsed.insertContent;
    updateContent = parsed.updateContent;
    enumRefs = parsed.enumRefs;
    hasJson = parsed.hasJson;
    
    object.rowContent = rowContent;
    object.enumRefs = enumRefs;
  }
  
  // Build header
  let header = `// =====================================================\n`;
  header += `// FILE: types/${outputFolder}/${tableName}.ts\n`;
  header += `// HANDLING: ${category.handlingLevel}\n`;
  header += `// DEITY: ${deityGroup}\n`;
  if (includeTimestamps) {
    header += `// GENERATED: ${timestamp}\n`;
  }
  header += `// SOURCE: database.types.ts lines ${object.startLine}-${object.endLine}\n`;
  header += `// =====================================================\n\n`;
  
  // Build imports
  const imports: string[] = [];
  imports.push(`import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';`);
  if (hasJson) {
    imports.push(`import type { Json } from '@/types/supabase/database.types.js';`);
  }
  // Composite-type columns reference Database[...] directly in the derived
  // interfaces (possible since the multiline normalization landed).
  if (rowContent.includes('Database[')) {
    imports.push(`import type { Database } from '@/types/supabase/database.types.js';`);
  }
  
  // Build core types section
  let coreTypes = `// =====================================================\n`;
  coreTypes += `// CORE TYPES\n`;
  coreTypes += `// =====================================================\n\n`;
  
  const enumExports = generateEnumExports(enumRefs);
  if (enumExports) {
    coreTypes += enumExports + '\n\n';
  }
  
  if (category.generateRow) {
    coreTypes += `export type ${pascalName}Row = Tables<'${tableName}'>;\n`;
  }
  
  if (category.generateInsert) {
    coreTypes += `export type ${pascalName}Insert = TablesInsert<'${tableName}'>;\n`;
  }
  
  if (category.generateUpdate) {
    coreTypes += `export type ${pascalName}Update = TablesUpdate<'${tableName}'>;\n`;
  }
  
  coreTypes += `\n`;
  
  // Build derived types section
  let derivedTypes = `// =====================================================\n`;
  derivedTypes += `// DERIVED TYPES\n`;
  derivedTypes += `// =====================================================\n\n`;
  
  if (category.generatePublicInterface) {
    const publicInterface = generatePublicInterface(tableName, rowContent, sensitiveFields);
    if (publicInterface) {
      derivedTypes += publicInterface + '\n';
    }
  }
  
  if (category.generateFormInterface) {
    derivedTypes += generateFormDataInterface(tableName, rowContent) + '\n';
  }
  
  if (category.generateValidationInterface) {
    derivedTypes += generateValidationResultInterface(tableName, rowContent) + '\n';
  }
  
  const fullContent = header + imports.join('\n') + '\n\n' + coreTypes + derivedTypes;
  
  return { header, imports, coreTypes, derivedTypes, fullContent };
}

/**
 * Format multiple objects at once
 */
export function formatMultipleObjectTypes(
  objects: ExtractedObjectWithDetails[],
  categories: Map<string, ObjectCategory>,
  options: FormatObjectTypesOptions = {}
): Map<string, FormattedTypeContent> {
  const results = new Map<string, FormattedTypeContent>();
  
  for (const object of objects) {
    const category = categories.get(object.name) || (getObjectCategory as any)('table', object.name);
    const formatted = formatObjectTypes(object, category, options);
    results.set(object.name, formatted);
  }
  
  return results;
}
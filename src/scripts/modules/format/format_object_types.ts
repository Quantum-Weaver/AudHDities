/* @/scripts/modules/format/formatObjectTypes.ts */
// Phase 3: Format an extracted table object into TypeScript type definitions
// Extracts Row, Insert, Update types and generates derived interfaces

import type { ExtractedObject, ExtractedObjectWithDetails, FormattedTypeContent } from '@/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '@/scripts/shared/logger.js';
import { getObjectCategory, type ObjectCategory } from '@/config/object_categories.js';

export interface FormatObjectTypesOptions {
  verbose?: boolean;
  includeTimestamps?: boolean;
  sensitiveFields?: string[];     // Fields to exclude from public interfaces
  deityGroup?: string;             // For header comments
  outputFolder?: string;           // For header comments
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
 * Convert snake_case to PascalCase
 * Examples: user_tier → UserTier, product_type → ProductType
 */
export function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

/**
 * Convert snake_case to UPPER_SNAKE_CASE
 * Examples: user_tier → USER_TIER, product_type → PRODUCT_TYPE
 */
export function toUpperSnakeCase(str: string): string {
  return str.toUpperCase();
}

/**
 * Parse an object's content to extract Row, Insert, Update definitions
 * 
 * @param content - Raw content of the table object
 * @returns Object with rowContent, insertContent, updateContent strings
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
  
  // Split content into lines for brace counting
  const lines = content.split('\n');
  
  // Find Row section
  let rowStartLine = -1;
  let rowEndLine = -1;
  let insertStartLine = -1;
  let updateStartLine = -1;
  
  // First pass: find the line numbers of each section
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*Row:\s*\{/)) {
      rowStartLine = i;
    }
    if (line.match(/^\s*Insert:\s*\{/)) {
      insertStartLine = i;
    }
    if (line.match(/^\s*Update:\s*\{/)) {
      updateStartLine = i;
    }
  }
  
  // Find closing brace for Row (ends one line before Insert starts)
  if (rowStartLine !== -1 && insertStartLine !== -1) {
    rowEndLine = insertStartLine - 1;
    const rowLines = lines.slice(rowStartLine + 1, rowEndLine);
    let rowContent = rowLines.join('\n').trim();
    
    // Remove the closing brace line if present
    if (rowContent.endsWith('}')) {
      rowContent = rowContent.slice(0, -1).trim();
    }
    
    // Find enum references
    const enumPattern = /Database\["public"\]\["Enums"\]\["(\w+)"\]/g;
    let match;
    while ((match = enumPattern.exec(rowContent)) !== null) {
      if (!enumRefs.includes(match[1])) {
        enumRefs.push(match[1]);
      }
    }
    
    // Clean up enum references
    for (const enumRef of enumRefs) {
      const pascalCase = toPascalCase(enumRef);
      rowContent = rowContent.replace(new RegExp(`Database\\["public"\\]\\["Enums"\\]\\["${enumRef}"\\]`, 'g'), pascalCase);
    }
    
    hasJson = rowContent.includes('Json');
    
    return {
      rowContent,
      insertContent: '',
      updateContent: '',
      enumRefs,
      hasJson
    };
  }
  
  return {
    rowContent: '',
    insertContent: '',
    updateContent: '',
    enumRefs: [],
    hasJson: false
  };
}

/**
 * Generate enum exports from detected enum references
 * 
 * @param enumRefs - Array of enum names found in the table
 * @returns String of enum export statements
 */
export function generateEnumExports(enumRefs: string[]): string {
  if (enumRefs.length === 0) return '';
  
  const lines: string[] = [];
  lines.push(`// =====================================================`);
  lines.push(`// ENUM EXPORTS (from database enums)`);
  lines.push(`// =====================================================`);
  lines.push(``);
  
  for (const enumRef of enumRefs) {
    // Convert snake_case to PascalCase for export name
    const exportName = toPascalCase(enumRef);
    lines.push(`export type ${exportName} = Database['public']['Enums']['${enumRef}'];`);
  }
  
  return lines.join('\n');
}

/**
 * Generate public interface (excludes sensitive fields)
 * 
 * @param tableName - Name of the table
 * @param rowContent - Row content as string (each line: "fieldName: type")
 * @param sensitiveFields - Fields to exclude
 * @returns Public interface definition as string
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
 * 
 * @param tableName - Name of the table
 * @param rowContent - Row content as string (each line: "fieldName: type")
 * @returns FormData interface definition as string
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
      // Make all fields optional for form data
      fields.push(`  ${fieldName}?: ${fieldType};`);
    }
  }
  
  // If no fields found, log a warning
  if (fields.length === 0) {
    console.log(`  Warning: No fields found for ${tableName} form data interface`);
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
 * 
 * @param tableName - Name of the table
 * @param rowContent - Row content as string (each line: "fieldName: type")
 * @returns ValidationResult interface definition as string
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
 * Generate the complete type file content for a table
 * 
 * @param object - ExtractedObject with details
 * @param category - ObjectCategory defining what to generate
 * @param options - Formatting options
 * @returns FormattedTypeContent with all parts
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
  
  // Parse content if not already parsed
  let rowContent = object.rowContent || '';
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
    
    // Store back for debugging
    object.rowContent = rowContent;
    object.enumRefs = enumRefs;
  }
  
  if (verbose) {
    logDebug(`Formatting types for table: ${tableName}`);
    logDebug(`  Pascal name: ${pascalName}`);
    logDebug(`  Enum refs: ${enumRefs.join(', ')}`);
    logDebug(`  Has Json: ${hasJson}`);
    logDebug(`Row content length: ${rowContent.length}`);
    logDebug(`Row content preview: ${rowContent.substring(0, 200)}`);
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
  imports.push(`import type { Database } from '@/types/supabase/database.types';`);
  if (hasJson) {
    imports.push(`import type { Json } from '@/types/supabase/database.types';`);
  }
  
  // Build core types section
  let coreTypes = `// =====================================================\n`;
  coreTypes += `// CORE TYPES\n`;
  coreTypes += `// =====================================================\n\n`;
  
  // Add enum exports if there are enum references
  const enumExports = generateEnumExports(enumRefs);
  if (enumExports) {
    coreTypes += enumExports + '\n\n';
  }
  
  // Add Row type if needed (with PascalCase)
  if (category.generateRow) {
    coreTypes += `export type ${pascalName}Row = Database['public']['Tables']['${tableName}']['Row'];\n`;
  }
  
  // Add Insert type if needed
  if (category.generateInsert) {
    coreTypes += `export type ${pascalName}Insert = Database['public']['Tables']['${tableName}']['Insert'];\n`;
  }
  
  // Add Update type if needed
  if (category.generateUpdate) {
    coreTypes += `export type ${pascalName}Update = Database['public']['Tables']['${tableName}']['Update'];\n`;
  }
  
  coreTypes += `\n`;
  
  // Build derived types section
  let derivedTypes = `// =====================================================\n`;
  derivedTypes += `// DERIVED TYPES\n`;
  derivedTypes += `// =====================================================\n\n`;
  
  // Public interface (if needed)
  if (category.generatePublicInterface) {
    const publicInterface = generatePublicInterface(tableName, rowContent, sensitiveFields);
    if (publicInterface) {
      derivedTypes += publicInterface + '\n';
    }
  }
  
  // Form data interface (if needed)
  if (category.generateFormInterface) {
    derivedTypes += generateFormDataInterface(tableName, rowContent) + '\n';
  }
  
  // Validation result interface (if needed)
  if (category.generateValidationInterface) {
    derivedTypes += generateValidationResultInterface(tableName, rowContent) + '\n';
  }
  
  // Combine everything
  const fullContent = header + imports.join('\n') + '\n\n' + coreTypes + derivedTypes;
  
  if (verbose) {
    logSuccess(`Formatted ${tableName} (${category.handlingLevel})`);
  }
  
  return {
    header,
    imports,
    coreTypes,
    derivedTypes,
    fullContent
  };
}

/**
 * Format multiple objects at once with their respective categories
 * 
 * @param objects - Array of ExtractedObjectWithDetails
 * @param categories - Map of object name to ObjectCategory
 * @param options - Formatting options
 * @returns Map of object name to FormattedTypeContent
 */
export function formatMultipleObjectTypes(
  objects: ExtractedObjectWithDetails[],
  categories: Map<string, ObjectCategory>,
  options: FormatObjectTypesOptions = {}
): Map<string, FormattedTypeContent> {
  const results = new Map<string, FormattedTypeContent>();
  
  for (const object of objects) {
    const category = categories.get(object.name) || getObjectCategory('table', object.name);
    const formatted = formatObjectTypes(object, category, options);
    results.set(object.name, formatted);
  }
  
  if (options.verbose) {
    logSuccess(`Formatted ${results.size} objects`);
  }
  
  return results;
}
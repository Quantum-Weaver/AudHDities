// src/scripts/system/gaia/format_types.ts
// ============================================================================
// FORMAT TYPES (GAIA) - SIMPLIFIED VERSION
// ============================================================================
// Purpose: Re-export types from Tables helper with custom derived types
// 
// This file NO LONGER parses database.types.ts manually.
// Instead, it re-exports from the Tables helper and adds derived types
// (Public interfaces with sensitive fields removed, Form interfaces, etc.)
// ============================================================================

import type { EnrichedTable } from './enrich_objects.js';
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatTypesOptions {
  verbose?: boolean;
}

export interface FormattedType {
  content: string;
  filePath: string;
  tableName: string;
  deityFolder: string;
  handlingLevel: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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
 * Get sensitive fields for a specific table (can be overridden per table)
 */
function getSensitiveFieldsForTable(tableName: string): string[] {
  // Default sensitive fields from config
  const baseFields = [...SENSITIVE_FIELDS];
  
  // Table-specific sensitive fields
  const tableOverrides: Record<string, string[]> = {
    'profiles': ['email', 'stripe_account_id', 'crisis_contact_email', 'crisis_contact_phone', 'crisis_contact_name', 'crisis_instructions'],
    'user_private': ['legal_name', 'date_of_birth', 'phone_number', 'address', 'government_id', 'emergency_contact', 'crisis_plan', 'notes'],
    'user_financial': ['stripe_account_id', 'paypal_email', 'bank_account_last4', 'bank_routing_last4', 'crypto_addresses'],
    'applications': ['form_data', 'admin_notes', 'review_notes', 'onboarding_doc_path'],
    'contact_submissions': ['email', 'message', 'notes'],
    'email_communications': ['recipient_email', 'body', 'metadata'],
  };
  
  const tableSpecific = tableOverrides[tableName] || [];
  return [...baseFields, ...tableSpecific];
}

/**
 * Generate header comment for type file
 */
function generateHeader(tableName: string, deityFolder: string, handlingLevel: string): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: types/generated/${deityFolder}/${tableName}.ts
// HANDLING: ${handlingLevel}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

`;
}

/**
 * Generate import statement for Tables helper
 */
function generateTablesImport(): string {
  return `import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/tables';\n`;
}

/**
 * Generate core type exports (Row, Insert, Update)
 */
function generateCoreTypes(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `// =====================================================
// CORE TYPES (from Tables helper)
// =====================================================

export type ${pascalName}Row = Tables<'${tableName}'>;
export type ${pascalName}Insert = TablesInsert<'${tableName}'>;
export type ${pascalName}Update = TablesUpdate<'${tableName}'>;
`;
}

/**
 * Generate Public interface (excludes sensitive fields)
 * Uses Omit to remove sensitive fields from Row type
 */
function generatePublicInterface(tableName: string, sensitiveFields: string[]): string {
  const pascalName = toPascalCase(tableName);
  const interfaceName = `Public${pascalName}`;
  
  if (sensitiveFields.length === 0) {
    return `// =====================================================
// PUBLIC INTERFACE (no sensitive fields to omit)
// =====================================================

export type ${interfaceName} = ${pascalName}Row;
`;
  }
  
  const omitFields = sensitiveFields.map(f => `'${f}'`).join(' | ');
  
  return `// =====================================================
// PUBLIC INTERFACE (excludes sensitive fields)
// =====================================================
// Excluded fields: ${sensitiveFields.join(', ')}

export type ${interfaceName} = Omit<${pascalName}Row, ${omitFields}>;
`;
}

/**
 * Generate Own Profile interface (includes all fields, only for profiles table)
 */
function generateOwnProfileInterface(tableName: string): string {
  if (tableName !== 'profiles') return '';
  
  const pascalName = toPascalCase(tableName);
  const interfaceName = `Own${pascalName}`;
  
  return `
// =====================================================
// OWN PROFILE INTERFACE (includes all fields)
// =====================================================
// For the authenticated user viewing their own profile

export type ${interfaceName} = ${pascalName}Row;
`;
}

/**
 * Generate Form Data interface (all fields optional)
 */
function generateFormDataInterface(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  const interfaceName = `${pascalName}FormData`;
  
  return `
// =====================================================
// FORM DATA INTERFACE (all fields optional)
// =====================================================

export type ${interfaceName} = Partial<${pascalName}Insert>;
`;
}

/**
 * Generate Validation Result interface
 */
function generateValidationResultInterface(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  const interfaceName = `${pascalName}ValidationResult`;
  
  // For validation result, we need to know which fields exist
  // Since we don't parse fields anymore, we use a generic approach
  return `
// =====================================================
// VALIDATION RESULT INTERFACE
// =====================================================

export interface ${interfaceName} {
  valid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
  touched: Record<string, boolean>;
}
`;
}

/**
 * Generate enum type re-exports for enums referenced by this table
 * Note: This is optional now since Enums<'name'> can be used directly
 */
function generateEnumReExports(tableName: string, enumRefs: string[]): string {
  if (enumRefs.length === 0) return '';
  
  const lines: string[] = [];
  lines.push(`// =====================================================`);
  lines.push(`// ENUM TYPE RE-EXPORTS (for convenience)`);
  lines.push(`// =====================================================`);
  lines.push(``);
  
  for (const enumRef of enumRefs) {
    const pascalName = toPascalCase(enumRef);
    lines.push(`export type ${pascalName} = Enums<'${enumRef}'>;`);
  }
  
  return lines.join('\n');
}

/**
 * Format a single table into a type file
 * Uses Tables helper for core types, adds derived types
 */
export function formatType(
  table: EnrichedTable,
  options?: FormatTypesOptions
): FormattedType | null {
  const { verbose = false } = options || {};
  const { 
    name: tableName, 
    deityFolder, 
    handlingLevel, 
    shouldGenerateTypes 
  } = table;
  
  // Check if this table needs type generation
  if (!shouldGenerateTypes) {
    if (verbose) {
      logDebug(`Skipping types for ${tableName} (not configured for type generation)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Formatting types: ${tableName} -> ${deityFolder} (${handlingLevel})`);
  }
  
  const sensitiveFields = getSensitiveFieldsForTable(tableName);
  
  // Build content
  let content = generateHeader(tableName, deityFolder, handlingLevel);
  content += generateTablesImport();
  content += `\n`;
  content += generateCoreTypes(tableName);
  content += `\n`;
  content += generatePublicInterface(tableName, sensitiveFields);
  
  const ownProfile = generateOwnProfileInterface(tableName);
  if (ownProfile) content += ownProfile;
  
  content += generateFormDataInterface(tableName);
  content += `\n`;
  content += generateValidationResultInterface(tableName);
  
  // Optional: Add enum re-exports (if we had enumRefs from enrichment)
  // For now, we skip since Enums<'name'> can be used directly
  // content += generateEnumReExports(tableName, table.enumRefs || []);
  
  const filePath = `src/types/generated/${deityFolder}/${tableName}.ts`;
  
  if (verbose) {
    logDebug(`  Generated ${content.length} characters`);
  }
  
  return {
    content,
    filePath,
    tableName,
    deityFolder,
    handlingLevel
  };
}

/**
 * Format multiple tables into type files
 */
export function formatTypes(
  tables: EnrichedTable[],
  options?: FormatTypesOptions
): FormattedType[] {
  const { verbose = false } = options || {};
  const results: FormattedType[] = [];
  
  if (verbose) {
    logDebug(`Formatting types for ${tables.length} tables...`);
  }
  
  for (const table of tables) {
    const formatted = formatType(table, options);
    if (formatted) {
      results.push(formatted);
      
      if (verbose) {
        logDebug(`  Formatted: ${table.name} -> ${table.deityFolder}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} type files`);
  }
  
  return results;
}
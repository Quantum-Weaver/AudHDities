// src/scripts/system/gaia/format_types.ts
// ============================================================================
// FORMAT TYPES (GAIA) - USING TABLES HELPER
// ============================================================================
// Purpose: Generate type files that re-export from Tables helper
// 
// This file NO LONGER needs rowContent, insertContent, updateContent, etc.
// All core types come directly from the Tables helper.
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

function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

function getSensitiveFieldsForTable(tableName: string): string[] {
  const baseFields = [...SENSITIVE_FIELDS];
  
  const tableOverrides: Record<string, string[]> = {
    'profiles': ['email', 'stripe_account_id', 'crisis_contact_email', 'crisis_contact_phone', 'crisis_contact_name', 'crisis_instructions'],
    'user_private': ['legal_name', 'date_of_birth', 'phone_number', 'address', 'government_id', 'emergency_contact', 'crisis_plan', 'notes'],
    'user_financial': ['stripe_account_id', 'paypal_email', 'bank_account_last4', 'bank_routing_last4', 'crypto_addresses'],
  };
  
  return [...baseFields, ...(tableOverrides[tableName] || [])];
}

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

function generateTablesImport(): string {
  return `import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/tables';\n`;
}

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

function generateOwnProfileInterface(tableName: string): string {
  if (tableName !== 'profiles') return '';
  
  const pascalName = toPascalCase(tableName);
  
  return `
// =====================================================
// OWN PROFILE INTERFACE (includes all fields)
// =====================================================
// For the authenticated user viewing their own profile

export type Own${pascalName} = ${pascalName}Row;
`;
}

function generateFormDataInterface(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `
// =====================================================
// FORM DATA INTERFACE (all fields optional)
// =====================================================

export type ${pascalName}FormData = Partial<${pascalName}Insert>;
`;
}

function generateValidationResultInterface(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `
// =====================================================
// VALIDATION RESULT INTERFACE
// =====================================================

export interface ${pascalName}ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
  touched: Record<string, boolean>;
}
`;
}

/**
 * Format a single table into a type file
 * Uses Tables helper — no parsing needed
 */
export function formatType(
  table: EnrichedTable,
  options?: FormatTypesOptions
): FormattedType | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, handlingLevel, shouldGenerateTypes } = table;
  
  if (!shouldGenerateTypes) {
    if (verbose) logDebug(`Skipping types for ${tableName} (not configured)`);
    return null;
  }
  
  if (verbose) logDebug(`Formatting types: ${tableName} -> ${deityFolder}`);
  
  const sensitiveFields = getSensitiveFieldsForTable(tableName);
  
  let content = generateHeader(tableName, deityFolder, handlingLevel);
  content += generateTablesImport();
  content += `\n`;
  content += generateCoreTypes(tableName);
  content += `\n`;
  content += generatePublicInterface(tableName, sensitiveFields);
  content += generateOwnProfileInterface(tableName);
  content += generateFormDataInterface(tableName);
  content += `\n`;
  content += generateValidationResultInterface(tableName);
  
  const filePath = `src/types/generated/${deityFolder}/${tableName}.ts`;
  
  if (verbose) logDebug(`  Generated ${content.length} characters`);
  
  return { content, filePath, tableName, deityFolder, handlingLevel };
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
  
  if (verbose) logDebug(`Formatting types for ${tables.length} tables...`);
  
  for (const table of tables) {
    const formatted = formatType(table, options);
    if (formatted) results.push(formatted);
  }
  
  if (verbose) logSuccess(`Formatted ${results.length} type files`);
  
  return results;
}
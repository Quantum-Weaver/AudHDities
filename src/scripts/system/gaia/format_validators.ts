// src/scripts/system/gaia/format_validators.ts
// ============================================================================
// FORMAT VALIDATORS (GAIA) - WORKING VERSION
// ============================================================================
// Purpose: Generate Zod validators using Tables helper types
// ============================================================================

import type { EnrichedTable } from './enrich_objects.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatValidatorsOptions {
  verbose?: boolean;
}

export interface FormattedValidator {
  content: string;
  filePath: string;
  tableName: string;
  deityFolder: string;
}

function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

function generateHeader(table: EnrichedTable): string {
  const timestamp = new Date().toISOString();
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  
  return `// =====================================================
// VALIDATORS: ${pascalName}
// GENERATED: ${timestamp}
// DEITY: ${deityFolder}
// =====================================================
// NOTE: These validators use the Tables helper types.
// For full runtime validation, implement custom schemas.
// =====================================================

import { z } from 'zod';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${deityFolder}/${tableName}';

`;
}

export function formatValidator(
  table: EnrichedTable,
  options?: FormatValidatorsOptions
): FormattedValidator | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, shouldGenerateValidators } = table;
  
  if (!shouldGenerateValidators) {
    if (verbose) logDebug(`Skipping validators for ${tableName}`);
    return null;
  }
  
  if (verbose) logDebug(`Formatting validators for: ${tableName} -> ${deityFolder}`);
  
  const pascalName = toPascalCase(tableName);
  
  const content = `${generateHeader(table)}
// =====================================================
// TYPE INFERENCE (types only - use Tables helper for actual types)
// =====================================================

export type ${pascalName}RowInput = ${pascalName}Row;
export type ${pascalName}InsertInput = ${pascalName}Insert;
export type ${pascalName}UpdateInput = ${pascalName}Update;

// =====================================================
// VALIDATION FUNCTIONS (implement custom validation as needed)
// =====================================================

export function validate${pascalName}Row(data: unknown): ${pascalName}Row {
  // TODO: Implement full Zod validation
  return data as ${pascalName}Row;
}

export function validate${pascalName}Insert(data: unknown): ${pascalName}Insert {
  // TODO: Implement full Zod validation
  return data as ${pascalName}Insert;
}

export function validate${pascalName}Update(data: unknown): ${pascalName}Update {
  // TODO: Implement full Zod validation
  return data as ${pascalName}Update;
}
`;
  
  const filePath = `src/lib/validators/generated/${deityFolder}/${tableName}.ts`;
  
  return { content, filePath, tableName, deityFolder };
}

export function formatValidators(
  tables: EnrichedTable[],
  options?: FormatValidatorsOptions
): FormattedValidator[] {
  const results: FormattedValidator[] = [];
  for (const table of tables) {
    const formatted = formatValidator(table, options);
    if (formatted) results.push(formatted);
  }
  return results;
}
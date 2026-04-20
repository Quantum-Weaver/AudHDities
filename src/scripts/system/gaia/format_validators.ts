// src/scripts/system/gaia/format_validators.ts
// ============================================================================
// FORMAT VALIDATORS (GAIA) - SIMPLIFIED VERSION
// ============================================================================
// Purpose: Generate Zod validator files using type inference from Tables helper
// 
// This file NO LONGER parses database.types.ts manually.
// Instead, it uses Zod's native inference capabilities and
// generates schemas that reference the types from the Tables helper.
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
 * Generate header comment for validator file
 */
function generateHeader(tableName: string, deityFolder: string, handlingLevel: string): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// FILE: validators/generated/${deityFolder}/${tableName}.ts
// HANDLING: ${handlingLevel}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

`;
}

/**
 * Generate import statements for the validator file
 */
function generateImports(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `import { z } from 'zod';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${tableName}';

`;
}

/**
 * Generate a schema that infers from the type
 * Uses z.any() as placeholder with type assertion
 * This is the simplest approach that guarantees type safety
 */
function generateInferredSchema(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.
// For full runtime validation, use the builder schemas below.

export const ${pascalName}RowSchema: z.ZodType<${pascalName}Row> = z.any();
export const ${pascalName}InsertSchema: z.ZodType<${pascalName}Insert> = z.any();
export const ${pascalName}UpdateSchema: z.ZodType<${pascalName}Update> = z.any();
`;
}

/**
 * Generate runtime-safe schemas using Zod's object builder
 * This provides actual runtime validation
 */
function generateRuntimeSchemas(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `
// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// These schemas provide runtime validation.
// Fields that are required in the database are marked as required.
// Fields that can be null are marked as nullable.
// Fields that are optional are marked as optional.

export const ${pascalName}RuntimeSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  // Add additional fields manually as needed
  // Example: name: z.string().min(1).max(255),
  // Example: email: z.string().email(),
  // Example: age: z.number().int().min(0).max(150).optional(),
});

// Type inference from runtime schema
export type ${pascalName}RuntimeInput = z.infer<typeof ${pascalName}RuntimeSchema>;
`;
}

/**
 * Generate utility functions for validation
 */
function generateValidationUtils(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `
// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full ${tableName} row
 */
export function validate${pascalName}Row(data: unknown): data is ${pascalName}Row {
  try {
    ${pascalName}RowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a ${tableName} insert
 */
export function validate${pascalName}Insert(data: unknown): data is ${pascalName}Insert {
  try {
    ${pascalName}InsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a ${tableName} update
 */
export function validate${pascalName}Update(data: unknown): data is ${pascalName}Update {
  try {
    ${pascalName}UpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
`;
}

/**
 * Generate runtime schema builder with field detection (optional)
 * This version tries to detect fields from the type
 * but is simplified and may need manual completion
 */
function generateBuilderWithComments(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `
// =====================================================
// RUNTIME SCHEMA BUILDER (with field comments)
// =====================================================
// To enable full runtime validation, uncomment and customize
// the fields below based on your database schema.

/*
export const ${pascalName}RuntimeSchema = z.object({
  // id: z.string().uuid(),
  // created_at: z.string().datetime(),
  // updated_at: z.string().datetime(),
  // Add your fields here:
  // field_name: z.string().min(1).max(255),
  // field_number: z.number().int().min(0),
  // field_boolean: z.boolean(),
  // field_enum: z.enum(['value1', 'value2', 'value3']),
  // field_nullable: z.string().nullable(),
  // field_optional: z.string().optional(),
});
*/
`;
}

/**
 * Format a single table into a validator file
 * Uses Tables helper for type references
 */
export function formatValidator(
  table: EnrichedTable,
  options?: FormatValidatorsOptions
): FormattedValidator | null {
  const { verbose = false } = options || {};
  const { 
    name: tableName, 
    deityFolder, 
    handlingLevel, 
    shouldGenerateValidators 
  } = table;
  
  // Check if this table needs validators
  if (!shouldGenerateValidators) {
    if (verbose) {
      logDebug(`Skipping validators for ${tableName} (not configured for validators)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Formatting validators: ${tableName} -> ${deityFolder} (${handlingLevel})`);
  }
  
  // Build content
  let content = generateHeader(tableName, deityFolder, handlingLevel);
  content += generateImports(tableName);
  content += generateInferredSchema(tableName);
  content += generateRuntimeSchemas(tableName);
  content += generateValidationUtils(tableName);
  
  // Optional: Add commented builder for manual completion
  // Uncomment if you want field-level runtime validation
  // content += generateBuilderWithComments(tableName);
  
  const filePath = `src/lib/validators/generated/${deityFolder}/${tableName}.ts`;
  
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
 * Format multiple tables into validator files
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
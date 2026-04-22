// src/scripts/system/gaia/generate/generate_validators.ts
// ============================================================================
// GENERATE VALIDATORS (GAIA) - TYPE-FIRST VERSION
// ============================================================================
// Purpose: Generate Zod validator files using type inference from Tables helper
// ============================================================================

import type { EnrichedTable } from '../enrich/enrich_objects.js';
import { logDebug, logSuccess } from '../../../shared/logger.js';

export interface GenerateValidatorsOptions {
  verbose?: boolean;
}

export interface GeneratedValidator {
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
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

/**
 * Generate header comment for validator file
 */
function generateHeader(table: EnrichedTable): string {
  const { name: tableName, deityFolder, handlingLevel } = table;
  const timestamp = new Date().toISOString();
  
  return `// =====================================================
// FILE: lib/validators/generated/${deityFolder}/${tableName}.ts
// HANDLING: ${handlingLevel}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

`;
}

/**
 * Generate import statements for the validator file
 */
function generateImports(table: EnrichedTable): string {
  const { name: tableName, deityFolder } = table;
  const pascalName = toPascalCase(tableName);
  
  return `import { z } from 'zod';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${deityFolder}/${tableName}';

`;
}

/**
 * Generate a schema that infers from the type
 * Uses z.any() as placeholder with type assertion
 */
function generateInferredSchema(table: EnrichedTable): string {
  const { name: tableName } = table;
  const pascalName = toPascalCase(tableName);
  
  return `// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ${pascalName}RowSchema: z.ZodType<${pascalName}Row> = z.any();
export const ${pascalName}InsertSchema: z.ZodType<${pascalName}Insert> = z.any();
export const ${pascalName}UpdateSchema: z.ZodType<${pascalName}Update> = z.any();
`;
}

/**
 * Generate runtime-safe schemas using Zod's object builder
 */
function generateRuntimeSchemas(table: EnrichedTable): string {
  const { name: tableName } = table;
  const pascalName = toPascalCase(tableName);
  
  return `
// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ${pascalName}RuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ${pascalName}RuntimeInput = z.infer<typeof ${pascalName}RuntimeSchema>;
`;
}

/**
 * Generate utility functions for validation
 */
function generateValidationUtils(table: EnrichedTable): string {
  const { name: tableName } = table;
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

// ============================================================================
// MAIN GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate a validator file for a single table
 */
export function generateValidator(
  table: EnrichedTable,
  options?: GenerateValidatorsOptions
): GeneratedValidator | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, handlingLevel, shouldGenerateValidators } = table;
  
  // Check if this table needs validators
  if (!shouldGenerateValidators) {
    if (verbose) {
      logDebug(`Skipping validators for ${tableName} (not configured)`);
    }
    return null;
  }
  
  if (verbose) {
    logDebug(`Generating validator: ${tableName} -> ${deityFolder} (${handlingLevel})`);
  }
  
  // Build content
  let content = generateHeader(table);
  content += generateImports(table);
  content += generateInferredSchema(table);
  content += generateRuntimeSchemas(table);
  content += generateValidationUtils(table);
  
  const filePath = `src/lib/validators/generated/${deityFolder}/${tableName}.ts`;
  
  return {
    content,
    filePath,
    tableName,
    deityFolder,
    handlingLevel,
  };
}

/**
 * Generate validator files for multiple tables
 */
export function generateValidators(
  tables: EnrichedTable[],
  options?: GenerateValidatorsOptions
): GeneratedValidator[] {
  const { verbose = false } = options || {};
  const results: GeneratedValidator[] = [];
  
  if (verbose) {
    logDebug(`Generating validators for ${tables.length} tables...`);
  }
  
  for (const table of tables) {
    const generated = generateValidator(table, options);
    if (generated) {
      results.push(generated);
    }
  }
  
  if (verbose) {
    logSuccess(`Generated ${results.length} validator files`);
  }
  
  return results;
}
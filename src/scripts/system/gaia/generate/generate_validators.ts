// src/scripts/system/gaia/generate/generate_validators.ts
import type { EnrichedTable } from '../enrich/enrich_objects.js';
import { logDebug, logSuccess } from '../../../shared/logger.js';
import { generateValidatorContent } from './validator_builder.js';

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

export function generateValidator(
  table: EnrichedTable,
  options?: GenerateValidatorsOptions
): GeneratedValidator | null {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, handlingLevel, shouldGenerateValidators } = table;
  
  if (!shouldGenerateValidators) {
    if (verbose) logDebug(`Skipping validators for ${tableName}`);
    return null;
  }
  
  if (verbose) logDebug(`Generating validator: ${tableName} -> ${deityFolder}`);
  
  // ✅ Call the builder to generate content from type file
  const content = generateValidatorContent(tableName, deityFolder, handlingLevel);
  
  if (!content) {
    if (verbose) logDebug(`Failed to build validator for ${tableName}`);
    return null;
  }
  
  return {
    content,
    filePath: `src/lib/validators/generated/${deityFolder}/${tableName}.ts`,
    tableName,
    deityFolder,
    handlingLevel,
  };
}

export function generateValidators(
  tables: EnrichedTable[],
  options?: GenerateValidatorsOptions
): GeneratedValidator[] {
  const { verbose = false } = options || {};
  const results: GeneratedValidator[] = [];
  
  for (const table of tables) {
    const generated = generateValidator(table, options);
    if (generated) results.push(generated);
  }
  
  if (verbose) logSuccess(`Generated ${results.length} validator files`);
  return results;
}
// scripts/system/gaia/phases/phase4_generate_types.ts
// PHASE 4: Generate TypeScript type file for a table

import { formatObjectTypes } from '../../../modules/format/format_object_types.js';
import { writeGeneratedFile } from './../write_generated_file.js';
import { logDebug, logSuccess, logError } from '../../../shared/logger.js';
import type { GaiaOptions } from '../index.js';
import type { EnrichedTable } from './phase3_enrich_table.js';

export async function phase4_generateTypes(
  table: EnrichedTable,
  options: GaiaOptions
): Promise<{ success: boolean; filePath: string }> {
  const { dryRun, verbose, force } = options;
  
  try {
    // Get category config (simplified - you can expand)
    const category = { generateApiGetList: false, generateApiPost: false, generateUtils: false, generateHooks: false };
    
    const typeFormatted = formatObjectTypes(
      { name: table.name, content: table.content, startLine: table.startLine, endLine: table.endLine, type: 'table' },
      category,
      {
        verbose,
        deityGroup: table.deityFolder,
        outputFolder: `generated/${table.deityFolder}`
      }
    );
    
    const typePath = `src/types/generated/${table.deityFolder}/${table.name}.ts`;
    
    const writeResult = await writeGeneratedFile(
      typePath,
      typeFormatted.fullContent,
      [`Database.public.Tables.${table.name}`],
      { dryRun, force, verbose }
    );
    
    if (verbose && writeResult.action !== 'skipped') {
      logSuccess(`      ✓ ${writeResult.action}: ${writeResult.filePath}`);
    }
    
    return { success: writeResult.success, filePath: writeResult.filePath };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logError(`      ✗ Failed to generate types: ${errMsg}`);
    return { success: false, filePath: '' };
  }
}
/* src/scripts/generators/cosmic/generateObjectConstants.ts */
// Phase 10: Generate runtime enum constant files with staging

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { FormattedConstantContent, GenerationResult } from 'src/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from 'src/scripts/shared/logger.js';
import { getDeityGroupForTable, getFolderNameForTable } from 'src/config/deity_groups.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface GenerateConstantsOptions {
  verbose?: boolean;
  dryRun?: boolean;           // Preview only, no writes
  stagingBase?: string;       // Default: 'src/lib/constants/staging'
  outputBase?: string;        // Default: 'src/lib/constants'
}

/**
 * Determine output folder for an enum
 * Uses deity group mapping, falls back to 'hestia-core'
 */
function getEnumOutputFolder(enumName: string): string {
  // Try to map enum to a deity group
  const deityGroup = getDeityGroupForTable(enumName);
  if (deityGroup) {
    return deityGroup.folderName;
  }
  
  // Default fallback
  return 'hestia-core';
}

/**
 * Generate constant object content from enum values
 */
function formatEnumConstant(enumName: string, values: string[]): string {
  const constName = enumName.toUpperCase();
  const typeName = enumName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  
  const lines: string[] = [];
  lines.push(`export const ${constName} = {`);
  
  for (const value of values) {
    const key = value.toUpperCase();
    lines.push(`  ${key}: '${value}',`);
  }
  
  lines.push(`} as const;`);
  lines.push(``);
  lines.push(`export type ${typeName} = typeof ${constName}[keyof typeof ${constName}];`);
  
  return lines.join('\n');
}

/**
 * Generate full constant file content
 */
function generateConstantFileContent(enumName: string, values: string[], sourceLines: string): string {
  const timestamp = new Date().toISOString();
  const folder = getEnumOutputFolder(enumName);
  
  let content = `// =====================================================\n`;
  content += `// FILE: src/lib/constants/${folder}/${enumName}.ts\n`;
  content += `// GENERATED: ${timestamp}\n`;
  content += `// SOURCE: Constants.public.Enums.${enumName}\n`;
  content += `// =====================================================\n\n`;
  
  content += formatEnumConstant(enumName, values);
  
  return content;
}

/**
 * Compare two files and generate diff summary
 */
function compareFiles(existingPath: string, newContent: string): { hasChanges: boolean; diffSummary: string } {
  if (!fs.existsSync(existingPath)) {
    return { hasChanges: true, diffSummary: 'New file (no existing version)' };
  }
  
  const existingContent = fs.readFileSync(existingPath, 'utf-8');
  
  if (existingContent === newContent) {
    return { hasChanges: false, diffSummary: 'No changes' };
  }
  
  // Simple diff summary - line count and first difference
  const existingLines = existingContent.split('\n');
  const newLines = newContent.split('\n');
  
  let firstDiffLine = -1;
  for (let i = 0; i < Math.min(existingLines.length, newLines.length); i++) {
    if (existingLines[i] !== newLines[i]) {
      firstDiffLine = i + 1;
      break;
    }
  }
  
  const diffSummary = `Changed: ${existingLines.length} lines → ${newLines.length} lines, first difference at line ${firstDiffLine}`;
  
  return { hasChanges: true, diffSummary };
}

/**
 * Log preview of constant generation (no writes)
 */
export async function previewConstantsGeneration(
  runtimeEnums: Map<string, string[]>,
  options: GenerateConstantsOptions = {}
): Promise<void> {
  const { verbose = true, outputBase = 'lib/constants', stagingBase = 'src/lib/constants/staging' } = options;
  
  logInfo('PREVIEW: Runtime Enum Constants Generation');
  logSeparator('─', 40);
  console.log('');
  
  let newCount = 0;
  let updateCount = 0;
  let unchangedCount = 0;
  
  for (const [enumName, values] of runtimeEnums) {
    const folder = getEnumOutputFolder(enumName);
    const targetPath = path.join(PROJECT_ROOT, outputBase, folder, `${enumName}.ts`);
    const stagingPath = path.join(PROJECT_ROOT, stagingBase, folder, `${enumName}.ts`);
    const exists = fs.existsSync(targetPath);
    
    const newContent = generateConstantFileContent(enumName, values, '');
    const comparison = exists ? compareFiles(targetPath, newContent) : { hasChanges: true, diffSummary: 'New file' };
    
    if (!exists) {
      newCount++;
      logInfo(`✨ NEW: ${enumName} → ${folder}/${enumName}.ts`);
      if (verbose) {
        console.log(`     Values: ${values.join(', ')}`);
        console.log(`     Preview: ${newContent.split('\n').slice(0, 5).join('\n     ')}...`);
      }
    } else if (comparison.hasChanges) {
      updateCount++;
      logWarning(`⚠️ UPDATE: ${enumName} → ${folder}/${enumName}.ts`);
      logInfo(`     ${comparison.diffSummary}`);
      if (verbose) {
        console.log(`     Staging: ${stagingPath}`);
        console.log(`     Target: ${targetPath}`);
      }
    } else {
      unchangedCount++;
      logDebug(`⏭️ UNCHANGED: ${enumName} → ${folder}/${enumName}.ts`);
    }
    
    console.log('');
  }
  
  logSeparator('─', 40);
  logInfo(`SUMMARY: ${runtimeEnums.size} total enums`);
  logInfo(`  ✨ New: ${newCount}`);
  logInfo(`  ⚠️ Updates needed: ${updateCount}`);
  logInfo(`  ⏭️ Unchanged: ${unchangedCount}`);
  
  if (updateCount > 0) {
    console.log('');
    logInfo('To apply updates:');
    logInfo('  1. Review staging files in src/lib/constants/staging/');
    logInfo('  2. Run with --apply-updates flag when ready');
  }
  
  logSeparator('─', 40);
}
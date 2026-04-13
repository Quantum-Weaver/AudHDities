/* @/scripts/generators/cosmic/generateConstants.ts */
// Phase 10: Write constant files to disk

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '@/scripts/shared/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface GenerateConstantsOptions {
  verbose?: boolean;
  dryRun?: boolean;
  forceOverwrite?: boolean;
  outputBase?: string;  // default: '@/lib/constants'
  askForApproval?: boolean;
}

/**
 * Ensure directory exists
 */
function ensureDirectory(dirPath: string, verbose: boolean = false): boolean {
  if (fs.existsSync(dirPath)) return true;
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    if (verbose) logDebug(`Created directory: ${dirPath}`);
    return true;
  } catch (error) {
    logError(`Failed to create directory: ${dirPath} - ${error}`);
    return false;
  }
}

/**
 * Write a constant file to disk (with staging for changes)
 */
async function writeConstantFile(
  filePath: string,
  content: string,
  options: GenerateConstantsOptions = {}
): Promise<{ success: boolean; message: string; action: 'created' | 'updated' | 'skipped' | 'staged' | 'dryrun' }> {
  const { verbose = false, dryRun = false, forceOverwrite = false, askForApproval = true } = options;
  
  const exists = fs.existsSync(filePath);
  
  if (dryRun) {
    if (verbose) logDebug(`[DRY RUN] Would write to: ${filePath}`);
    return { success: true, message: `Would write to ${filePath}`, action: 'dryrun' };
  }
  
  // New file - safe to create directly
  if (!exists) {
    ensureDirectory(path.dirname(filePath), verbose);
    fs.writeFileSync(filePath, content, 'utf-8');
    if (verbose) logSuccess(`Created: ${filePath}`);
    return { success: true, message: `Created ${filePath}`, action: 'created' };
  }
  
  // Check if content changed
  const existingContent = fs.readFileSync(filePath, 'utf-8');
  if (existingContent === content) {
    if (verbose) logDebug(`Unchanged: ${filePath}`);
    return { success: true, message: `Unchanged: ${filePath}`, action: 'skipped' };
  }
  
  // Content changed - stage the change
  if (!forceOverwrite) {
    const { stageFileChange } = await import('../../modules/system/staging.js');
    const result = stageFileChange(filePath, content, { verbose });
    
    if (result.staged) {
      if (verbose) {
        logWarning(`Changes staged: ${path.basename(filePath)}`);
        logInfo(`  Review: ${result.stagingPath}`);
        logInfo(`  Diff: ${result.diffPath}`);
      }
      return { success: true, message: `Staged changes for ${filePath}`, action: 'staged' };
    }
  }
  
  // Force overwrite
  fs.writeFileSync(filePath, content, 'utf-8');
  if (verbose) logWarning(`Overwrote (forced): ${filePath}`);
  return { success: true, message: `Overwrote ${filePath}`, action: 'updated' };
}

/**
 * Generate a constant file content
 */
export function generateConstantContent(enumName: string, values: string[]): string {
  const timestamp = new Date().toISOString();
  const constName = enumName.toUpperCase();
  const typeName = enumName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  
  let content = `// =====================================================\n`;
  content += `// FILE: constants/${enumName}.ts\n`;
  content += `// GENERATED: ${timestamp}\n`;
  content += `// SOURCE: Constants.public.Enums.${enumName}\n`;
  content += `// =====================================================\n\n`;
  
  content += `export const ${constName} = {\n`;
  for (const value of values) {
    content += `  ${value.toUpperCase()}: '${value}',\n`;
  }
  content += `} as const;\n\n`;
  content += `export type ${typeName} = typeof ${constName}[keyof typeof ${constName}];\n`;
  
  return content;
}

/**
 * Generate a constant file
 */
export async function generateConstantFile(
  enumName: string,
  values: string[],
  folderName: string,
  options: GenerateConstantsOptions = {}
): Promise<{ success: boolean; filePath: string; message: string; action: string }> {
  const { outputBase = '@/lib/constants', verbose = false } = options;
  
  const outputPath = path.join(PROJECT_ROOT, outputBase, folderName, `${enumName}.ts`);
  const content = generateConstantContent(enumName, values);
  
  if (verbose) logDebug(`Generating constant: ${enumName} → ${folderName}`);
  
  const result = await writeConstantFile(outputPath, content, options);
  
  return {
    success: result.success,
    filePath: outputPath,
    message: result.message,
    action: result.action
  };
}

/**
 * Generate multiple constant files
 */
export async function generateMultipleConstantFiles(
  constantsMap: Map<string, { values: string[]; folder: string }>,
  options: GenerateConstantsOptions = {}
): Promise<{ created: string[]; updated: string[]; skipped: string[]; errors: string[] }> {
  const { verbose = false } = options;
  
  const result = { created: [] as string[], updated: [] as string[], skipped: [] as string[], errors: [] as string[] };
  
  for (const [enumName, { values, folder }] of constantsMap) {
    const fileResult = await generateConstantFile(enumName, values, folder, options);
    if (fileResult.success) {
      if (fileResult.action === 'created') result.created.push(fileResult.filePath);
      else if (fileResult.action === 'updated') result.updated.push(fileResult.filePath);
      else if (fileResult.action === 'skipped') result.skipped.push(fileResult.filePath);
    } else {
      result.errors.push(fileResult.message);
    }
  }
  
  if (verbose) {
    console.log('');
    logSeparator();
    logInfo('CONSTANT GENERATION SUMMARY');
    logSeparator();
    logSuccess(`Created: ${result.created.length}`);
    if (result.updated.length > 0) logWarning(`Updated: ${result.updated.length}`);
    if (result.skipped.length > 0) logInfo(`Skipped: ${result.skipped.length}`);
    if (result.errors.length > 0) logError(`Errors: ${result.errors.length}`);
  }
  
  return result;
}
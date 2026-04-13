/* @/scripts/modules/generate/generate_type_files.ts */
// Phase 11: Write type files to disk with safety checks

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { FormattedTypeContent, GenerationResult } from '@/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '@/scripts/shared/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface GenerateTypeFilesOptions {
  verbose?: boolean;
  dryRun?: boolean;           // Simulate writing without actually writing
  forceOverwrite?: boolean;   // Overwrite existing files without asking
  outputBase?: string;        // Base output path (default: '@/types')
  askForApproval?: boolean;   // Ask before overwriting existing files
}

/**
 * Ensure directory exists (create if missing)
 */
function ensureDirectory(dirPath: string, verbose: boolean = false): boolean {
  if (fs.existsSync(dirPath)) {
    return true;
  }
  
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
 * Check if a file exists
 */
function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Read existing file content for comparison
 */
function readExistingFile(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Ask user for approval to overwrite a file
 */
async function askOverwriteApproval(filePath: string): Promise<boolean> {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    readline.question(`  Overwrite ${path.basename(filePath)}? (y/N): `, (answer: string) => {
      readline.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

/**
 * Write a single type file to disk (with staging for changes)
 */
async function writeTypeFile(
  filePath: string,
  content: string,
  options: GenerateTypeFilesOptions = {}
): Promise<{ success: boolean; message: string; action: 'created' | 'updated' | 'skipped' | 'staged' | 'dryrun' }> {
  const { verbose = false, dryRun = false, forceOverwrite = false } = options;
  
  const exists = fileExists(filePath);
  
  // Dry run mode
  if (dryRun) {
    if (verbose) logDebug(`[DRY RUN] Would write to: ${filePath}`);
    return { success: true, message: `Would write to ${filePath}`, action: 'dryrun' };
  }
  
  // File doesn't exist - safe to create directly
  if (!exists) {
    ensureDirectory(path.dirname(filePath), verbose);
    fs.writeFileSync(filePath, content, 'utf-8');
    if (verbose) logSuccess(`Created: ${filePath}`);
    return { success: true, message: `Created ${filePath}`, action: 'created' };
  }
  
  // File exists - check if content changed
  const existingContent = readExistingFile(filePath);
  if (existingContent === content) {
    if (verbose) logDebug(`Unchanged: ${filePath}`);
    return { success: true, message: `Unchanged: ${filePath}`, action: 'skipped' };
  }
  
  // Content changed - ALWAYS stage, never overwrite without force
  if (!forceOverwrite) {
    const { stageFileChange } = await import('../system/staging.js');
    const result = stageFileChange(filePath, content, { verbose });
    
    if (result.staged) {
      if (verbose) {
        logWarning(`Changes staged for: ${path.basename(filePath)}`);
        logInfo(`  Review: ${result.stagingPath}`);
        logInfo(`  Diff: ${result.diffPath}`);
      }
      return { success: true, message: `Staged changes for ${filePath}`, action: 'staged' };
    }
  }
  
  // Force overwrite mode (use with caution)
  fs.writeFileSync(filePath, content, 'utf-8');
  if (verbose) logWarning(`Overwrote (forced): ${filePath}`);
  return { success: true, message: `Overwrote ${filePath}`, action: 'updated' };
}

/**
 * Generate and write a single type file from formatted content
 */
export async function generateSingleTypeFile(
  tableName: string,
  formattedContent: FormattedTypeContent,
  folderName: string,
  options: GenerateTypeFilesOptions = {}
): Promise<{ success: boolean; filePath: string; message: string; action: string }> {
  const { outputBase = '@/types', verbose = false } = options;
  
  const outputPath = path.join(PROJECT_ROOT, outputBase, folderName, `${tableName}.ts`);
  
  if (verbose) {
    logDebug(`Generating type file for: ${tableName}`);
    logDebug(`  Output: ${outputPath}`);
  }
  
  const result = await writeTypeFile(outputPath, formattedContent.fullContent, options);
  
  return {
    success: result.success,
    filePath: outputPath,
    message: result.message,
    action: result.action
  };
}

/**
 * Generate multiple type files from formatted content map
 */
export async function generateMultipleTypeFiles(
  formattedMap: Map<string, FormattedTypeContent>,
  folderName: string,
  options: GenerateTypeFilesOptions = {}
): Promise<GenerationResult> {
  const { verbose = false, dryRun = false } = options;
  
  const result: GenerationResult = {
    success: true,
    filesCreated: [],
    filesSkipped: [],
    filesOverwritten: [],
    errors: [],
    warnings: []
  };
  
  const totalFiles = formattedMap.size;
  let processed = 0;
  
  if (verbose) {
    logInfo(`Generating ${totalFiles} type files for folder: ${folderName}`);
    if (dryRun) logWarning('DRY RUN MODE - No files will be written');
    console.log('');
  }
  
  for (const [tableName, formattedContent] of formattedMap) {
    const fileResult = await generateSingleTypeFile(tableName, formattedContent, folderName, options);
    
    if (fileResult.success) {
      if (fileResult.action === 'created') {
        result.filesCreated.push(fileResult.filePath);
      } else if (fileResult.action === 'updated') {
        result.filesOverwritten.push(fileResult.filePath);
      } else if (fileResult.action === 'skipped') {
        result.filesSkipped.push(fileResult.filePath);
      }
    } else {
      result.errors.push(fileResult.message);
    }
    
    processed++;
    if (verbose && processed % 5 === 0) {
      logDebug(`  Progress: ${processed}/${totalFiles}`);
    }
  }
  
  result.success = result.errors.length === 0;
  
  if (verbose) {
    console.log('');
    logSeparator();
    logInfo('TYPE GENERATION SUMMARY');
    logSeparator();
    logSuccess(`Created: ${result.filesCreated.length}`);
    if (result.filesOverwritten.length > 0) {
      logWarning(`Overwritten: ${result.filesOverwritten.length}`);
    }
    if (result.filesSkipped.length > 0) {
      logInfo(`Skipped: ${result.filesSkipped.length}`);
    }
    if (result.errors.length > 0) {
      logError(`Errors: ${result.errors.length}`);
    }
  }
  
  return result;
}
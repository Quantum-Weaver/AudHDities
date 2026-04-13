/* src/scripts/modules/generate/generate_object_types.ts */
// Phase 3: Write formatted type files to disk with safety checks
// Prevents accidental overwrites, logs all actions

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ExtractedObject, FormattedTypeContent, GenerationResult } from '@/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '@/scripts/shared/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface GenerateObjectTypesOptions {
  verbose?: boolean;
  dryRun?: boolean;           // Simulate writing without actually writing
  forceOverwrite?: boolean;   // Overwrite existing files without asking
  outputBase?: string;        // Base output path (default: 'src/types')
  askForApproval?: boolean;   // Ask before overwriting existing files
}

/**
 * Ensure directory exists (create if missing)
 * 
 * @param dirPath - Directory path
 */
function ensureDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    logDebug(`Created directory: ${dirPath}`);
  }
}

/**
 * Check if a file exists
 * 
 * @param filePath - Full path to file
 * @returns True if file exists
 */
function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Read existing file content for comparison
 * 
 * @param filePath - Full path to file
 * @returns File content or null if not exists
 */
function readExistingFile(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Ask user for approval to overwrite a file
 * 
 * @param filePath - Path of file to overwrite
 * @returns Promise<boolean> - True if approved
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
 * Write a single type file to disk
 * 
 * @param filePath - Full path where to write
 * @param content - File content to write
 * @param options - Generation options
 * @returns Object with success status and message
 */
async function writeTypeFile(
  filePath: string,
  content: string,
  options: GenerateObjectTypesOptions = {}
): Promise<{ success: boolean; message: string; action: 'created' | 'updated' | 'skipped' | 'dryrun' }> {
  const { verbose = false, dryRun = false, forceOverwrite = false, askForApproval = true } = options;
  
  const exists = fileExists(filePath);
  
  // Dry run mode
  if (dryRun) {
    if (verbose) {
      logDebug(`[DRY RUN] Would write to: ${filePath}`);
    }
    return { success: true, message: `Would write to ${filePath}`, action: 'dryrun' };
  }
  
  // File doesn't exist - safe to create
  if (!exists) {
    ensureDirectory(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf-8');
    if (verbose) {
      logSuccess(`Created: ${filePath}`);
    }
    return { success: true, message: `Created ${filePath}`, action: 'created' };
  }
  
  // File exists - check if content changed
  const existingContent = readExistingFile(filePath);
  if (existingContent === content) {
    if (verbose) {
      logDebug(`Unchanged: ${filePath}`);
    }
    return { success: true, message: `Unchanged: ${filePath}`, action: 'skipped' };
  }
  
  // Content changed - need to decide
  if (forceOverwrite) {
    fs.writeFileSync(filePath, content, 'utf-8');
    if (verbose) {
      logWarning(`Overwrote (forced): ${filePath}`);
    }
    return { success: true, message: `Overwrote ${filePath}`, action: 'updated' };
  }
  
  if (askForApproval) {
    const approved = await askOverwriteApproval(filePath);
    if (approved) {
      fs.writeFileSync(filePath, content, 'utf-8');
      if (verbose) {
        logWarning(`Overwrote (approved): ${filePath}`);
      }
      return { success: true, message: `Overwrote ${filePath}`, action: 'updated' };
    } else {
      if (verbose) {
        logInfo(`Skipped: ${filePath}`);
      }
      return { success: false, message: `Skipped ${filePath} (user declined)`, action: 'skipped' };
    }
  }
  
  // Default: skip
  if (verbose) {
    logInfo(`Skipped: ${filePath} (would overwrite)`);
  }
  return { success: false, message: `Skipped ${filePath} (would overwrite)`, action: 'skipped' };
}

/**
 * Generate and write a single type file from formatted content
 * 
 * @param tableName - Name of the table
 * @param formattedContent - FormattedTypeContent from formatObjectTypes
 * @param deityGroup - Deity group (for folder path)
 * @param options - Generation options
 * @returns Generation result for this file
 */
export async function generateSingleTypeFile(
  tableName: string,
  formattedContent: FormattedTypeContent,
  deityGroup: string,
  options: GenerateObjectTypesOptions = {}
): Promise<{ success: boolean; filePath: string; message: string; action: string }> {
  const { outputBase = 'src/types', verbose = false } = options;
  
  // Build output path
  const outputPath = path.join(PROJECT_ROOT, outputBase, deityGroup, `${tableName}.ts`);
  
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
 * 
 * @param formattedMap - Map of table name to FormattedTypeContent
 * @param deityGroup - Deity group for all tables (or use per-table config)
 * @param options - Generation options
 * @returns GenerationResult with summary
 */
export async function generateMultipleTypeFiles(
  formattedMap: Map<string, FormattedTypeContent>,
  deityGroup: string,
  options: GenerateObjectTypesOptions = {}
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
    logInfo(`Generating ${totalFiles} type files for deity: ${deityGroup}`);
    if (dryRun) logWarning('DRY RUN MODE - No files will be written');
    console.log('');
  }
  
  for (const [tableName, formattedContent] of formattedMap) {
    const fileResult = await generateSingleTypeFile(tableName, formattedContent, deityGroup, options);
    
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
    if (verbose && processed % 10 === 0) {
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

/**
 * Generate type files organized by deity group
 * 
 * @param groupedFormatted - Map of deity group to Map of table name to FormattedTypeContent
 * @param options - Generation options
 * @returns GenerationResult with summary
 */
export async function generateTypeFilesByDeity(
  groupedFormatted: Map<string, Map<string, FormattedTypeContent>>,
  options: GenerateObjectTypesOptions = {}
): Promise<GenerationResult> {
  const { verbose = false } = options;
  
  const overallResult: GenerationResult = {
    success: true,
    filesCreated: [],
    filesSkipped: [],
    filesOverwritten: [],
    errors: [],
    warnings: []
  };
  
  for (const [deityGroup, formattedMap] of groupedFormatted) {
    if (verbose) {
      logInfo(`Processing deity group: ${deityGroup} (${formattedMap.size} tables)`);
    }
    
    const result = await generateMultipleTypeFiles(formattedMap, deityGroup, options);
    
    // Aggregate results
    overallResult.filesCreated.push(...result.filesCreated);
    overallResult.filesSkipped.push(...result.filesSkipped);
    overallResult.filesOverwritten.push(...result.filesOverwritten);
    overallResult.errors.push(...result.errors);
    overallResult.warnings.push(...result.warnings);
  }
  
  overallResult.success = overallResult.errors.length === 0;
  
  return overallResult;
}

/**
 * Preview what would be generated (dry run with detailed output)
 * 
 * @param formattedMap - Map of table name to FormattedTypeContent
 * @param deityGroup - Deity group
 */
export async function previewTypeGeneration(
  formattedMap: Map<string, FormattedTypeContent>,
  deityGroup: string
): Promise<void> {
  const { outputBase = 'src/types' } = {};
  
  logInfo(`PREVIEW: Would generate ${formattedMap.size} type files for deity: ${deityGroup}`);
  console.log('');
  
  for (const [tableName, formattedContent] of formattedMap) {
    const outputPath = path.join(PROJECT_ROOT, outputBase, deityGroup, `${tableName}.ts`);
    const exists = fileExists(outputPath);
    const status = exists ? '⚠️ would overwrite' : '✅ would create';
    
    console.log(`  ${status}: ${outputPath}`);
    
    // Show first line of content
    const firstLine = formattedContent.fullContent.split('\n')[0];
    console.log(`      └─ ${firstLine.substring(0, 60)}...`);
  }
  
  console.log('');
  logInfo(`Total: ${formattedMap.size} files`);
}


// ============================================================================
// src/scripts/system/gaia/writeGeneratedFile.ts
// WRITE GENERATED FILE (GAIA)
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import type { SystemLogger } from '../../shared/system_logger.js';
import { logSuccess, logError, logInfo, logWarning, logDebug } from '../../shared/logger.js';

export interface WriteOptions {
  dryRun: boolean;
  force: boolean;
  verbose: boolean;
  logger?: SystemLogger;
}

export interface WriteResult {
  success: boolean;
  filePath: string;
  action: 'created' | 'updated' | 'skipped' | 'dryrun' | 'error';
  message: string;
  fileHash?: string;
}

const PROJECT_ROOT = path.resolve(process.cwd());

/**
 * Generate a hash of file content for change detection
 */
function generateContentHash(content: string): string {
  return createHash('sha256').update(content, 'utf-8').digest('hex');
}

/**
 * Build the full output path with generated subfolder.
 * If the path already contains a 'generated' segment, trust it as-is.
 */
function buildGeneratedPath(filePath: string): string {
  if (/[\\/]generated[\\/]/.test(filePath)) {
    return filePath;
  }

  // Insert '/generated/' after the first directory after src/
  // Example: src/types/hestia-core/profiles.ts → src/types/generated/hestia-core/profiles.ts
  const parts = filePath.split(/[\\/]/);
  const srcIndex = parts.indexOf('src');
  if (srcIndex !== -1 && parts.length > srcIndex + 2) {
    parts.splice(srcIndex + 2, 0, 'generated');
  }
  return parts.join('/');
}

/**
 * Ensure the output directory exists
 */
function ensureDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Compare existing and new content using hash
 */
function contentHasChanged(existingPath: string, newContent: string): boolean {
  if (!fs.existsSync(existingPath)) return true;
  const existingContent = fs.readFileSync(existingPath, 'utf-8');
  const existingHash = generateContentHash(existingContent);
  const newHash = generateContentHash(newContent);
  return existingHash !== newHash;
}

/**
 * Write a generated file to the generated/ folder
 */
export async function writeGeneratedFile(
  filePath: string,
  content: string,
  sourceFiles: string[],
  options: WriteOptions
): Promise<WriteResult> {
  const { dryRun, force, verbose, logger } = options;
  
  // Build the generated path
  const generatedPath = buildGeneratedPath(filePath);
  const fullPath = path.join(PROJECT_ROOT, generatedPath);
  const dir = path.dirname(fullPath);
  
  // Check if file exists
  const exists = fs.existsSync(fullPath);
  
  // Dry run mode
  if (dryRun) {
    if (verbose) {
      logInfo(`[DRY RUN] Would write to: ${fullPath}`);
      logDebug(`  Content length: ${content.length} characters`);
    }
    logger?.log('info', 'writeGeneratedFile', `Would write: ${generatedPath}`, { dryRun: true });
    return {
      success: true,
      filePath: generatedPath,
      action: 'dryrun',
      message: `Would write to ${generatedPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Ensure directory exists
  ensureDirectory(dir);
  
  // New file - safe to create
  if (!exists) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      logSuccess(`Created: ${generatedPath}`);
    }
    logger?.log('success', 'writeGeneratedFile', `Created: ${generatedPath}`, { sourceFiles });
    return {
      success: true,
      filePath: generatedPath,
      action: 'created',
      message: `Created ${generatedPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Existing file - check if content changed
  const hasChanged = contentHasChanged(fullPath, content);
  
  if (!hasChanged) {
    if (verbose) {
      logDebug(`Unchanged: ${generatedPath}`);
    }
    return {
      success: true,
      filePath: generatedPath,
      action: 'skipped',
      message: `Unchanged: ${generatedPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Content changed - handle based on force flag
  if (force) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      logWarning(`Overwrote (forced): ${generatedPath}`);
    }
    logger?.log('warning', 'writeGeneratedFile', `Overwrote: ${generatedPath}`, { sourceFiles, forced: true });
    return {
      success: true,
      filePath: generatedPath,
      action: 'updated',
      message: `Overwrote ${generatedPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Not forcing - skip with warning
  if (verbose) {
    logWarning(`Skipped (would overwrite): ${generatedPath}`);
    logInfo(`  Use --force to overwrite existing files`);
  }
  logger?.log('warning', 'writeGeneratedFile', `Skipped (would overwrite): ${generatedPath}`, { sourceFiles });
  
  return {
    success: false,
    filePath: generatedPath,
    action: 'skipped',
    message: `Skipped ${generatedPath} (would overwrite)`,
    fileHash: generateContentHash(content)
  };
}
// ============================================================================
// src/scripts/system/gaia/write_generated_file.ts
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
 * Write a generated file to disk
 * NOTE: filePath should be the COMPLETE relative path from project root
 * Example: 'src/types/generated/hestia-core/profiles.ts'
 */
export async function writeGeneratedFile(
  filePath: string,  // ← Now expects FULL relative path including 'generated'
  content: string,
  sourceFiles: string[],
  options: WriteOptions
): Promise<WriteResult> {
  const { dryRun, force, verbose, logger } = options;
  
  const fullPath = path.join(PROJECT_ROOT, filePath);
  const dir = path.dirname(fullPath);
  
  // Check if file exists
  const exists = fs.existsSync(fullPath);
  
  // Dry run mode
  if (dryRun) {
    if (verbose) {
      logInfo(`[DRY RUN] Would write to: ${fullPath}`);
      logDebug(`  Content length: ${content.length} characters`);
    }
    logger?.log('info', 'writeGeneratedFile', `Would write: ${filePath}`, { dryRun: true });
    return {
      success: true,
      filePath: filePath,
      action: 'dryrun',
      message: `Would write to ${filePath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Ensure directory exists
  ensureDirectory(dir);
  
  // New file - safe to create
  if (!exists) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      logSuccess(`Created: ${filePath}`);
    }
    logger?.log('success', 'writeGeneratedFile', `Created: ${filePath}`, { sourceFiles });
    return {
      success: true,
      filePath: filePath,
      action: 'created',
      message: `Created ${filePath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Existing file - check if content changed
  const hasChanged = contentHasChanged(fullPath, content);
  
  if (!hasChanged) {
    if (verbose) {
      logDebug(`Unchanged: ${filePath}`);
    }
    return {
      success: true,
      filePath: filePath,
      action: 'skipped',
      message: `Unchanged: ${filePath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Content changed - handle based on force flag
  if (force) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      logWarning(`Overwrote (forced): ${filePath}`);
    }
    logger?.log('warning', 'writeGeneratedFile', `Overwrote: ${filePath}`, { sourceFiles, forced: true });
    return {
      success: true,
      filePath: filePath,
      action: 'updated',
      message: `Overwrote ${filePath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Not forcing - skip with warning
  if (verbose) {
    logWarning(`Skipped (would overwrite): ${filePath}`);
    logInfo(`  Use --force to overwrite existing files`);
  }
  logger?.log('warning', 'writeGeneratedFile', `Skipped (would overwrite): ${filePath}`, { sourceFiles });
  
  return {
    success: false,
    filePath: filePath,
    action: 'skipped',
    message: `Skipped ${filePath} (would overwrite)`,
    fileHash: generateContentHash(content)
  };
}
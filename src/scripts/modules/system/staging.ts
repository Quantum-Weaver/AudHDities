/* src/scripts/modules/system/staging */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from 'src/scripts/shared/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface StagingOptions {
  verbose?: boolean;
  stagingBase?: string;
  diffBase?: string;
}

/**
 * Get staging path for a file
 */
export function getStagingPath(originalPath: string, options: StagingOptions = {}): string {
  const relativePath = path.relative(PROJECT_ROOT, originalPath);
  const parts = relativePath.split(path.sep);
  
  // Find the base directory (constants, types, utils, app, lib)
  const baseDirs = ['constants', 'types', 'utils', 'api', 'validators'];
  for (const baseDir of baseDirs) {
    const baseIndex = parts.indexOf(baseDir);
    if (baseIndex !== -1) {
      parts.splice(baseIndex + 1, 0, 'staging');
      break;
    }
  }
  
  return path.join(PROJECT_ROOT, ...parts);
}

/**
 * Get diff path for a file
 */
export function getDiffPath(originalPath: string, options: StagingOptions = {}): string {
  const relativePath = path.relative(PROJECT_ROOT, originalPath);
  const fileName = path.basename(relativePath);
  const diffFileName = fileName.replace(/\.ts$/, '.diff');
  
  return path.join(PROJECT_ROOT, 'slib/constants/staging/diffs', diffFileName);
}

/**
 * Generate a simple diff between two strings
 */
function generateDiff(original: string, proposed: string, filePath: string): string {
  const originalLines = original.split('\n');
  const proposedLines = proposed.split('\n');
  
  const diffLines: string[] = [];
  diffLines.push(`--- a/${filePath}`);
  diffLines.push(`+++ b/${filePath} (staged)`);
  
  let i = 0, j = 0;
  let inDiff = false;
  let contextCount = 0;
  
  while (i < originalLines.length || j < proposedLines.length) {
    if (i < originalLines.length && j < proposedLines.length && originalLines[i] === proposedLines[j]) {
      if (inDiff) {
        diffLines.push(` ${originalLines[i]}`);
        contextCount++;
        if (contextCount >= 3) {
          inDiff = false;
        }
      }
      i++;
      j++;
    } else {
      if (!inDiff) {
        diffLines.push(`@@ -${i + 1},${originalLines.length - i} +${j + 1},${proposedLines.length - j} @@`);
        inDiff = true;
        contextCount = 0;
      }
      if (i < originalLines.length && (j >= proposedLines.length || originalLines[i] !== proposedLines[j])) {
        diffLines.push(`-${originalLines[i]}`);
        i++;
      }
      if (j < proposedLines.length && (i >= originalLines.length || originalLines[i] !== proposedLines[j])) {
        diffLines.push(`+${proposedLines[j]}`);
        j++;
      }
    }
  }
  
  return diffLines.join('\n');
}

/**
 * Stage a file change
 */
export function stageFileChange(
  targetPath: string,
  newContent: string,
  options: StagingOptions = {}
): { staged: boolean; stagingPath: string; diffPath: string; hasChanges: boolean } {
  const { verbose = false } = options;
  
  const stagingPath = getStagingPath(targetPath);
  const diffPath = getDiffPath(targetPath);
  
  // Ensure staging directory exists
  const stagingDir = path.dirname(stagingPath);
  if (!fs.existsSync(stagingDir)) {
    fs.mkdirSync(stagingDir, { recursive: true });
    if (verbose) logDebug(`Created staging directory: ${stagingDir}`);
  }
  
  // Ensure diff directory exists
  const diffDir = path.dirname(diffPath);
  if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
    if (verbose) logDebug(`Created diff directory: ${diffDir}`);
  }
  
  // Read existing content if file exists
  let existingContent: string | null = null;
  let hasChanges = true;
  
  if (fs.existsSync(targetPath)) {
    existingContent = fs.readFileSync(targetPath, 'utf-8');
    hasChanges = existingContent !== newContent;
  }
  
  if (!hasChanges) {
    if (verbose) logDebug(`No changes detected for: ${path.basename(targetPath)}`);
    return { staged: false, stagingPath, diffPath, hasChanges: false };
  }
  
  // Write to staging
  fs.writeFileSync(stagingPath, newContent, 'utf-8');
  if (verbose) logDebug(`Staged: ${stagingPath}`);
  
  // Generate and write diff
  if (existingContent) {
    const diff = generateDiff(existingContent, newContent, path.relative(PROJECT_ROOT, targetPath));
    fs.writeFileSync(diffPath, diff, 'utf-8');
    if (verbose) logDebug(`Diff: ${diffPath}`);
  } else {
    const newFileDiff = `--- /dev/null\n+++ b/${path.relative(PROJECT_ROOT, targetPath)} (staged)\n` +
      `@@ -0,0 +1,${newContent.split('\n').length} @@\n` +
      newContent.split('\n').map(line => `+${line}`).join('\n');
    fs.writeFileSync(diffPath, newFileDiff, 'utf-8');
  }
  
  return { staged: true, stagingPath, diffPath, hasChanges: true };
}

/**
 * Approve a staged file
 */
export function approveStagedFile(stagingPath: string, options: StagingOptions = {}): boolean {
  const { verbose = false } = options;
  
  if (!fs.existsSync(stagingPath)) {
    logError(`Staging file not found: ${stagingPath}`);
    return false;
  }
  
  // Get target path by removing 'staging' from path
  const parts = stagingPath.split(path.sep);
  const stagingIndex = parts.indexOf('staging');
  if (stagingIndex !== -1) {
    parts.splice(stagingIndex, 1);
  }
  const targetPath = parts.join(path.sep);
  
  try {
    const content = fs.readFileSync(stagingPath, 'utf-8');
    const targetDir = path.dirname(targetPath);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    fs.writeFileSync(targetPath, content, 'utf-8');
    if (verbose) logSuccess(`Approved: ${targetPath}`);
    
    return true;
  } catch (error) {
    logError(`Failed to approve: ${targetPath} - ${error}`);
    return false;
  }
}

/**
 * List all staged files
 */
export function listStagedFiles(options: StagingOptions = {}): string[] {
  const stagingRoot = path.join(PROJECT_ROOT, 'lib/constants/staging');
  
  if (!fs.existsSync(stagingRoot)) {
    return [];
  }
  
  const stagedFiles: string[] = [];
  
  function walkDir(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        walkDir(fullPath);
      } else if (item.endsWith('.ts')) {
        stagedFiles.push(fullPath);
      }
    }
  }
  
  walkDir(stagingRoot);
  return stagedFiles;
}

/**
 * Approve all staged files
 */
export function approveAllStagedFiles(options: StagingOptions = {}): { approved: number; failed: number } {
  const stagedFiles = listStagedFiles(options);
  let approved = 0;
  let failed = 0;
  
  for (const stagingPath of stagedFiles) {
    if (approveStagedFile(stagingPath, options)) {
      approved++;
    } else {
      failed++;
    }
  }
  
  return { approved, failed };
}
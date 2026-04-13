/* @/scripts/modules/generate/generateIndexFiles.ts */
// Phase: Scan folders and create/maintain index.ts files with export * from each file

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '@/scripts/shared/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface GenerateIndexOptions {
  verbose?: boolean;
  dryRun?: boolean;
  forceOverwrite?: boolean;
  basePaths?: string[];  // Array of base paths to scan (e.g., ['src/lib/constants', 'src/types', 'src/utils'])
}

/**
 * Scan a directory for TypeScript files (excluding index.ts itself)
 */
function scanTsFiles(dirPath: string, excludeIndex: boolean = true): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  const files: string[] = [];
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      files.push(...scanTsFiles(fullPath, excludeIndex));
    } else if (item.endsWith('.ts') && !(excludeIndex && item === 'index.ts')) {
      // Remove .ts extension for export
      files.push(item.replace(/\.ts$/, ''));
    }
  }
  
  return files;
}

/**
 * Generate index.ts content for a directory
 */
function generateIndexContent(files: string[], folderName: string): string {
  const timestamp = new Date().toISOString();
  const folderDisplayName = folderName.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  let content = `// =====================================================\n`;
  content += `// FILE: index.ts\n`;
  content += `// LOCATION: ${folderName}\n`;
  content += `// ${folderDisplayName} Exports\n`;
  content += `// GENERATED: ${timestamp}\n`;
  content += `// =====================================================\n\n`;
  
  // Sort files alphabetically for consistent output
  const sortedFiles = [...files].sort();
  
  for (const file of sortedFiles) {
    content += `export * from './${file}';\n`;
  }
  
  return content;
}

/**
 * Generate index.ts for a single directory
 */
export async function generateIndexForDirectory(
  dirPath: string,
  options: GenerateIndexOptions = {}
): Promise<{ success: boolean; filePath: string; action: 'created' | 'updated' | 'skipped' | 'dryrun'; fileCount: number }> {
  const { verbose = false, dryRun = false, forceOverwrite = false } = options;
  
  const indexPath = path.join(dirPath, 'index.ts');
  const folderName = path.basename(dirPath);
  
  // Scan for TypeScript files
  const tsFiles = scanTsFiles(dirPath, true);
  
  if (tsFiles.length === 0) {
    if (verbose) {
      logDebug(`No TypeScript files found in ${dirPath}, skipping index.ts generation`);
    }
    return { success: true, filePath: indexPath, action: 'skipped', fileCount: 0 };
  }
  
  const newContent = generateIndexContent(tsFiles, folderName);
  
  // Check if index.ts already exists
  const exists = fs.existsSync(indexPath);
  
  if (dryRun) {
    if (verbose) {
      logInfo(`[DRY RUN] Would ${exists ? 'update' : 'create'} index.ts in ${dirPath} with ${tsFiles.length} exports`);
    }
    return { success: true, filePath: indexPath, action: 'dryrun', fileCount: tsFiles.length };
  }
  
  // If file exists and not forcing overwrite, check if content changed
  if (exists && !forceOverwrite) {
    const existingContent = fs.readFileSync(indexPath, 'utf-8');
    if (existingContent === newContent) {
      if (verbose) {
        logDebug(`Index.ts unchanged in ${dirPath}`);
      }
      return { success: true, filePath: indexPath, action: 'skipped', fileCount: tsFiles.length };
    }
  }
  
  // Write the file
  fs.writeFileSync(indexPath, newContent, 'utf-8');
  
  if (verbose) {
    if (exists) {
      logWarning(`Updated index.ts in ${dirPath} (${tsFiles.length} exports)`);
    } else {
      logSuccess(`Created index.ts in ${dirPath} (${tsFiles.length} exports)`);
    }
  }
  
  return {
    success: true,
    filePath: indexPath,
    action: exists ? 'updated' : 'created',
    fileCount: tsFiles.length
  };
}

/**
 * Recursively scan and generate index.ts files for all subdirectories
 */
export async function generateIndexesRecursively(
  basePath: string,
  options: GenerateIndexOptions = {}
): Promise<{ created: number; updated: number; skipped: number; errors: string[] }> {
  const { verbose = false } = options;
  
  const result = {
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [] as string[]
  };
  
  if (!fs.existsSync(basePath)) {
    if (verbose) {
      logWarning(`Directory does not exist: ${basePath}`);
    }
    return result;
  }
  
  const items = fs.readdirSync(basePath);
  
  for (const item of items) {
    const fullPath = path.join(basePath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Generate index for this directory
      const indexResult = await generateIndexForDirectory(fullPath, options);
      
      if (indexResult.action === 'created') {
        result.created++;
      } else if (indexResult.action === 'updated') {
        result.updated++;
      } else if (indexResult.action === 'skipped') {
        result.skipped++;
      }
      
      // Recursively process subdirectories
      const subResult = await generateIndexesRecursively(fullPath, options);
      result.created += subResult.created;
      result.updated += subResult.updated;
      result.skipped += subResult.skipped;
      result.errors.push(...subResult.errors);
    }
  }
  
  return result;
}

/**
 * Generate index.ts files for multiple base paths
 */
export async function generateIndexesForPaths(
  basePaths: string[],
  options: GenerateIndexOptions = {}
): Promise<{ created: number; updated: number; skipped: number; errors: string[] }> {
  const { verbose = false } = options;
  
  const totalResult = {
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [] as string[]
  };
  
  for (const basePath of basePaths) {
    const fullPath = path.join(PROJECT_ROOT, basePath);
    
    if (verbose) {
      logInfo(`Scanning: ${basePath}`);
    }
    
    const result = await generateIndexesRecursively(fullPath, options);
    
    totalResult.created += result.created;
    totalResult.updated += result.updated;
    totalResult.skipped += result.skipped;
    totalResult.errors.push(...result.errors);
    
    if (verbose && (result.created > 0 || result.updated > 0)) {
      logSuccess(`  ${basePath}: ${result.created} created, ${result.updated} updated, ${result.skipped} skipped`);
    }
  }
  
  return totalResult;
}
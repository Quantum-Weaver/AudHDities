/* src/scripts/modules/generate/generate_api_routes.ts */
// Phase: Generate API route files for tables based on workflow config
// Supports deity folder structure: app/api/generated/{deityFolder}/{tableName}/route.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '@/scripts/shared/logger.js';
import { stageFileChange } from '../system/staging.js';
import { API_BASE_PATH } from '@/scripts/shared/paths.js';
import {
  generateGetListRoute,
  generateGetSingleRoute,
  generatePostRoute,
  generatePutRoute,
  generateDeleteRoute,
  generateSpecialRoute,
  type GeneratedRoute
} from '../format/format_api_file.js';
import {
  assembleMainApiFile,
  assembleSingleApiFile,
  assembleSpecialApiFile
} from '../assemble/assemble_api_file.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface GenerateApiRoutesOptions {
  verbose?: boolean;
  dryRun?: boolean;
  forceOverwrite?: boolean;
  outputBase?: string;
}

/**
 * Write content to file with staging support
 */
async function writeApiFile(
  filePath: string,
  content: string,
  options: GenerateApiRoutesOptions = {}
): Promise<{ success: boolean; action: string }> {
  const { verbose = false, dryRun = false, forceOverwrite = false } = options;
  
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const exists = fs.existsSync(filePath);
  
  if (dryRun) {
    if (verbose) logDebug(`[DRY RUN] Would write to: ${filePath}`);
    return { success: true, action: 'dryrun' };
  }
  
  if (exists && !forceOverwrite) {
    const existingContent = fs.readFileSync(filePath, 'utf-8');
    if (existingContent === content) {
      return { success: true, action: 'skipped' };
    }
    const stageResult = stageFileChange(filePath, content, { verbose });
    if (stageResult.staged) {
      return { success: true, action: 'staged' };
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  return { success: true, action: exists ? 'updated' : 'created' };
}

/**
 * Generate API routes for a single table with deity folder support
 */
export async function generateApiRoutesForTable(
  tableName: string,
  config: {
    hasGetList: boolean;
    hasGetSingle: boolean;
    hasPost: boolean;
    hasPut: boolean;
    hasDelete: boolean;
    specialRoutes: string[];
    deityFolder?: string;  // NEW: deity folder for nested structure
  },
  options: GenerateApiRoutesOptions = {}
): Promise<{ main: string; single: string; special: string[] }> {
  const { outputBase = API_BASE_PATH, verbose = false } = options;
  const deityFolder = config.deityFolder;
  
  const result = { main: '', single: '', special: [] as string[] };
  
  // Collect main route handlers (route.ts)
  const mainRoutes: GeneratedRoute[] = [];
  if (config.hasGetList) mainRoutes.push(generateGetListRoute(tableName));
  if (config.hasPost) mainRoutes.push(generatePostRoute(tableName));
  
  if (mainRoutes.length > 0) {
    // Build path with deity folder if provided
    let filePath: string;
    if (deityFolder) {
      filePath = path.join(PROJECT_ROOT, outputBase, deityFolder, tableName, 'route.ts');
    } else {
      filePath = path.join(PROJECT_ROOT, outputBase, tableName, 'route.ts');
    }
    const content = assembleMainApiFile(tableName, mainRoutes, deityFolder);
    const writeResult = await writeApiFile(filePath, content, options);
    result.main = writeResult.action;
    if (verbose) logInfo(`Main API route for ${deityFolder ? `${deityFolder}/` : ''}${tableName}: ${writeResult.action}`);
  }
  
  // Collect single record route handlers ([id]/route.ts)
  const singleRoutes: GeneratedRoute[] = [];
  if (config.hasGetSingle) singleRoutes.push(generateGetSingleRoute(tableName));
  if (config.hasPut) singleRoutes.push(generatePutRoute(tableName));
  if (config.hasDelete) singleRoutes.push(generateDeleteRoute(tableName));
  
  if (singleRoutes.length > 0) {
    let filePath: string;
    if (deityFolder) {
      filePath = path.join(PROJECT_ROOT, outputBase, deityFolder, tableName, 'id', 'route.ts');
    } else {
      filePath = path.join(PROJECT_ROOT, outputBase, tableName, 'id', 'route.ts');
    }
    const content = assembleSingleApiFile(tableName, singleRoutes, deityFolder);
    const writeResult = await writeApiFile(filePath, content, options);
    result.single = writeResult.action;
    if (verbose) logInfo(`Single API route for ${deityFolder ? `${deityFolder}/` : ''}${tableName}: ${writeResult.action}`);
  }
  
  // Generate special routes
  for (const specialType of config.specialRoutes) {
    const route = generateSpecialRoute(tableName, specialType);
    let filePath: string;
    if (deityFolder) {
      filePath = path.join(PROJECT_ROOT, outputBase, deityFolder, tableName, specialType, 'route.ts');
    } else {
      filePath = path.join(PROJECT_ROOT, outputBase, tableName, specialType, 'route.ts');
    }
    const content = assembleSpecialApiFile(tableName, specialType, route, deityFolder);
    const writeResult = await writeApiFile(filePath, content, options);
    result.special.push(writeResult.action);
    if (verbose) logInfo(`Special API route ${deityFolder ? `${deityFolder}/` : ''}${tableName}/${specialType}: ${writeResult.action}`);
  }
  
  return result;
}

/**
 * Generate API routes for multiple tables
 */
export async function generateApiRoutesForTables(
  tables: Array<{
    name: string;
    hasGetList: boolean;
    hasGetSingle: boolean;
    hasPost: boolean;
    hasPut: boolean;
    hasDelete: boolean;
    specialRoutes: string[];
    deityFolder?: string;  // NEW: deity folder for each table
  }>,
  options: GenerateApiRoutesOptions = {}
): Promise<{ created: number; updated: number; staged: number; skipped: number; errors: string[] }> {
  const { verbose = false } = options;
  
  const result = {
    created: 0,
    updated: 0,
    staged: 0,
    skipped: 0,
    errors: [] as string[]
  };
  
  for (const table of tables) {
    try {
      const tableResult = await generateApiRoutesForTable(table.name, table, options);
      
      const countAction = (action: string) => {
        if (action === 'created') result.created++;
        else if (action === 'updated') result.updated++;
        else if (action === 'staged') result.staged++;
        else if (action === 'skipped') result.skipped++;
      };
      
      countAction(tableResult.main);
      countAction(tableResult.single);
      for (const special of tableResult.special) countAction(special);
      
    } catch (error) {
      result.errors.push(`${table.name}: ${error}`);
    }
  }
  
  if (verbose && !options.dryRun) {
    console.log('');
    logSeparator('─', 40);
    logInfo('API ROUTES GENERATION SUMMARY');
    logSeparator('─', 40);
    logSuccess(`Created: ${result.created}`);
    if (result.updated > 0) logWarning(`Updated: ${result.updated}`);
    if (result.staged > 0) logInfo(`Staged for review: ${result.staged}`);
    logInfo(`Skipped: ${result.skipped}`);
    if (result.errors.length > 0) logError(`Errors: ${result.errors.length}`);
  }
  
  return result;
}
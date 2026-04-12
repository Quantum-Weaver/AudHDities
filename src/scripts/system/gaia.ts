// src/scripts/system/gaia.ts
// ============================================================================
// GAIA - DATABASE TYPE GENERATOR
// ============================================================================
// Purpose: Read database.types.ts and generate all supporting files
// Dependencies: All gaia generator modules
// Output: src/*/generated/ files
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { readDatabaseTypes } from '../shared/fileReader.js';
import { findMarkers } from '../modules/extract/findMarkers.js';
import { findAllClosingBraces } from '../modules/extract/findClosingBraces.js';
import { countAllCollections } from '../modules/discover/countItems.js';
import { SystemLogger } from '../shared/systemLogger.js';
import { 
  logSuccess, logError, logInfo, logWarning, 
  logSeparator, logHeader, logDebug 
} from '../shared/logger.js';

import { extractTables, type TableInfo } from '../generators/gaia/extractTables.js';
import { extractViews, type ViewInfo } from '../generators/gaia/extractViews.js';
import { extractFunctions, type FunctionInfo } from '../generators/gaia/extractFunctions.js';
import { extractTypeEnums, type TypeEnumInfo } from '../generators/gaia/extractTypeEnums.js';
import { extractRuntimeEnums, type RuntimeEnumInfo } from '../generators/gaia/extractRuntimeEnums.js';
import { formatConstants, type FormattedConstant } from '../generators/gaia/formatConstants.js';
import { formatTypes, type FormattedType } from '../generators/gaia/formatTypes.js';
import { formatValidators, type FormattedValidator } from '../generators/gaia/formatValidators.js';
import { formatUtils, type FormattedUtility } from '../generators/gaia/formatUtils.js';
import { formatApiRoutes, type FormattedApiRoute } from '../generators/gaia/formatApiRoutes.js';
import { formatHooks, type FormattedHook } from '../generators/gaia/formatHooks.js';
import { getWorkflowConfig } from '@/config/workflow-config.js';
import { writeGeneratedFile, type WriteOptions } from '../generators/gaia/writeGeneratedFile.js';
import { getTableHandlingLevel, ObjectCategory } from '@/config/object-categories.js';
import { getDeityGroupForTable, getFolderNameForTable } from '@/config/deity-groups.js';
import { getTableCategory } from '@/config/object-categories.js';
import { getEnumFolder } from '@/config/enum-mapping.js';
import { saveRegistry, loadRegistry, updateSettings } from '@/config/system-registry.js';
import { saveDependencyMap, loadDependencyMap, findAffectedNodes } from '@/config/dependency-map.js';
import { addRecord, estimateRunTime } from '@/config/efficiency-records.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// ============================================================================
// CONFIGURATION
// ============================================================================

export interface GaiaOptions {
  dryRun?: boolean;
  force?: boolean;
  verbose?: boolean;
  quiet?: boolean;
  maxTables?: number;
}

const DEFAULT_OPTIONS: Required<GaiaOptions> = {
  dryRun: false,
  force: false,
  verbose: true,
  quiet: false,
  maxTables: 0  // 0 means no limit
};

// ============================================================================
// RESULT TRACKING
// ============================================================================

export interface GenerationSummary {
  constantsGenerated: number;
  typesGenerated: number;
  validatorsGenerated: number;
  utilsGenerated: number;
  apiRoutesGenerated: number;
  hooksGenerated: number;
  errors: string[];
  warnings: string[];
  startTime: Date;
  endTime: Date;
}

// ============================================================================
// MAIN ORCHESTRATOR FUNCTION
// ============================================================================

/**
 * Run the GAIA generator
 */
export async function runGaiaGenerator(options: GaiaOptions = {}): Promise<GenerationSummary> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const logger = new SystemLogger('GAIA');
  const summary: GenerationSummary = {
    constantsGenerated: 0,
    typesGenerated: 0,
    validatorsGenerated: 0,
    utilsGenerated: 0,
    apiRoutesGenerated: 0,
    hooksGenerated: 0,
    errors: [],
    warnings: [],
    startTime: new Date(),
    endTime: new Date()
  };
  
  logger.startRun();
  
  console.log('\n');
  logSeparator();
  logHeader('🌍 GAIA - DATABASE TYPE GENERATOR');
  logSeparator();
  console.log('');
  
  if (opts.dryRun) {
    logWarning('DRY RUN MODE - No files will be written');
    console.log('');
  }
  
// =====================================================
// PHASE 1: Read and Parse Database Types
// =====================================================

logInfo('Phase 1/9: Reading database.types.ts...');

// Read the file using existing fileReader
const fileResult = readDatabaseTypes();

if (!fileResult.success) {
  logError(`Failed to read database.types.ts: ${fileResult.error}`);
  summary.errors.push(`File read error: ${fileResult.error}`);
  logger.addNote(`File read failed: ${fileResult.error}`);
  logger.endRun('failed');
  return summary;
}

logSuccess(`File loaded: ${fileResult.encoding}, ${fileResult.content.length} characters`);

// Split into lines
const lines = fileResult.content.split(/\r?\n/);
logInfo(`  Total lines: ${lines.length}`);

// Find markers
const markers = findMarkers(lines, { verbose: opts.verbose });
logInfo(`  Database line: ${markers.databaseLine}`);
logInfo(`  Tables line: ${markers.tablesLine}`);
logInfo(`  Views line: ${markers.viewsLine}`);
logInfo(`  Functions line: ${markers.functionsLine}`);
logInfo(`  Enums line: ${markers.enumsLine}`);
logInfo(`  Constants line: ${markers.constantsLine}`);
logInfo(`  Constants.Enums line: ${markers.constantsEnumsLine}`);

// Find closing braces
const completeMarkers = findAllClosingBraces(lines, markers, { verbose: opts.verbose });
logInfo(`  Tables range: ${completeMarkers.tablesLine}-${completeMarkers.tablesEndLine}`);
logInfo(`  Views range: ${completeMarkers.viewsLine}-${completeMarkers.viewsEndLine}`);
logInfo(`  Functions range: ${completeMarkers.functionsLine}-${completeMarkers.functionsEndLine}`);
logInfo(`  Enums range: ${completeMarkers.enumsLine}-${completeMarkers.enumsEndLine}`);
logInfo(`  Constants range: ${completeMarkers.constantsLine}-${completeMarkers.constantsEndLine}`);
logInfo(`  Constants.Enums range: ${completeMarkers.constantsEnumsLine}-${completeMarkers.constantsEnumsEndLine}`);

// Count collections
const collections = countAllCollections(lines, completeMarkers, { verbose: opts.verbose });
logInfo(`  Tables: ${collections.tables.itemCount}`);
logInfo(`  Views: ${collections.views.itemCount}`);
logInfo(`  Functions: ${collections.functions.itemCount}`);
logInfo(`  Enums (type-level): ${collections.enums.itemCount}`);

logger.addNote(`Found ${collections.tables.itemCount} tables, ${collections.views.itemCount} views, ${collections.functions.itemCount} functions, ${collections.enums.itemCount} enums`);

// =====================================================
// PHASE 2: Extract All Objects
// =====================================================

logInfo('Phase 2/9: Extracting objects...');

// Extract runtime enums (Constants.public.Enums)
let runtimeEnums: RuntimeEnumInfo[] = [];
if (completeMarkers.constantsEnumsLine !== -1 && completeMarkers.constantsEnumsEndLine !== -1) {
  runtimeEnums = await extractRuntimeEnums(
    lines,
    completeMarkers.constantsEnumsLine,
    completeMarkers.constantsEnumsEndLine,
    { verbose: opts.verbose }
  );
  summary.constantsGenerated = runtimeEnums.length;
  logSuccess(`  Extracted ${runtimeEnums.length} runtime enums`);
} else {
  logWarning('  Constants.Enums section not found');
}

// Extract type enums (Database.public.Enums)
let typeEnums: TypeEnumInfo[] = [];
if (completeMarkers.enumsLine !== -1 && completeMarkers.enumsEndLine !== -1) {
  typeEnums = await extractTypeEnums(
    lines,
    completeMarkers.enumsLine,
    completeMarkers.enumsEndLine,
    { verbose: opts.verbose }
  );
  logSuccess(`  Extracted ${typeEnums.length} type enums`);
}

// Extract tables
let tables: TableInfo[] = [];
if (completeMarkers.tablesLine !== -1 && completeMarkers.tablesEndLine !== -1) {
  tables = await extractTables(
    lines,
    completeMarkers.tablesLine,
    completeMarkers.tablesEndLine,
    { verbose: opts.verbose, maxTables: opts.maxTables }
  );
  logSuccess(`  Extracted ${tables.length} tables`);
}

// Extract views
let views: ViewInfo[] = [];
if (completeMarkers.viewsLine !== -1 && completeMarkers.viewsEndLine !== -1) {
  views = await extractViews(
    lines,
    completeMarkers.viewsLine,
    completeMarkers.viewsEndLine,
    { verbose: opts.verbose }
  );
  logSuccess(`  Extracted ${views.length} views`);
}

// Extract functions
let functions: FunctionInfo[] = [];
if (completeMarkers.functionsLine !== -1 && completeMarkers.functionsEndLine !== -1) {
  functions = await extractFunctions(
    lines,
    completeMarkers.functionsLine,
    completeMarkers.functionsEndLine,
    { verbose: opts.verbose }
  );
  logSuccess(`  Extracted ${functions.length} functions`);
}

logger.addNote(`Extracted: ${tables.length} tables, ${views.length} views, ${functions.length} functions, ${runtimeEnums.length} runtime enums`);
  
// =====================================================
// PHASE 3: Generate Constants (Runtime Enums)
// =====================================================

logInfo('Phase 3/9: Generating constants...');

// Function to determine deity folder for an enum
function getEnumDeityFolder(enumName: string): string {
  // First try to get from enum-mapping config
  try {
    const { getEnumFolder } = require('@/config/enum-mapping.js');
    return getEnumFolder(enumName);
  } catch {
    // Fallback to hestia_core
    return 'hestia_core';
  }
}

// Format constants
const formattedConstants = formatConstants(
  runtimeEnums,
  getEnumDeityFolder,
  { verbose: opts.verbose }
);

// Write each constant file
for (const constant of formattedConstants) {
  const writeResult = await writeGeneratedFile(
    constant.filePath,
    constant.content,
    [`Constants.public.Enums.${constant.enumName}`],
    {
      dryRun: opts.dryRun,
      force: opts.force,
      verbose: opts.verbose,
      logger
    }
  );
  
  if (writeResult.success && writeResult.action === 'created') {
    summary.constantsGenerated++;
  } else if (writeResult.success && writeResult.action === 'updated') {
    summary.constantsGenerated++;
    summary.warnings.push(`Updated constant: ${constant.enumName}`);
  } else if (writeResult.action === 'skipped' && writeResult.success === false) {
    summary.warnings.push(`Skipped constant: ${constant.enumName} (would overwrite)`);
  }
}

logSuccess(`  Generated ${summary.constantsGenerated} constant files`);
  
// =====================================================
// PHASE 4: Generate Types (Tables)
// =====================================================

logInfo('Phase 4/9: Generating types...');

// Format types
const formattedTypes = formatTypes(
  tables,
  getTableDeityFolder,
  getTableCategory,
  { verbose: opts.verbose }
);

// Write each type file
for (const type of formattedTypes) {
  const writeResult = await writeGeneratedFile(
    type.filePath,
    type.content,
    [`Database.public.Tables.${type.tableName}`],
    {
      dryRun: opts.dryRun,
      force: opts.force,
      verbose: opts.verbose,
      logger
    }
  );
  
  if (writeResult.success && writeResult.action === 'created') {
    summary.typesGenerated++;
  } else if (writeResult.success && writeResult.action === 'updated') {
    summary.typesGenerated++;
    summary.warnings.push(`Updated type: ${type.tableName}`);
  } else if (writeResult.action === 'skipped' && writeResult.success === false) {
    summary.warnings.push(`Skipped type: ${type.tableName} (would overwrite)`);
  }
}

logSuccess(`  Generated ${summary.typesGenerated} type files`);
  
// =====================================================
// PHASE 5: Generate Validators (Tables)
// =====================================================

logInfo('Phase 5/9: Generating validators...');

// Function to determine if a table needs validators
function needsValidator(tableName: string): boolean {
  const level = getTableHandlingLevel(tableName);
  return level === 'full_crud' || level === 'assessment';
}

// Format validators
const formattedValidators = formatValidators(
  tables,
  needsValidator,
  { verbose: opts.verbose }
);

// Write each validator file
for (const validator of formattedValidators) {
  const writeResult = await writeGeneratedFile(
    validator.filePath,
    validator.content,
    [`Database.public.Tables.${validator.tableName}`],
    {
      dryRun: opts.dryRun,
      force: opts.force,
      verbose: opts.verbose,
      logger
    }
  );
  
  if (writeResult.success && writeResult.action === 'created') {
    summary.validatorsGenerated++;
  } else if (writeResult.success && writeResult.action === 'updated') {
    summary.validatorsGenerated++;
    summary.warnings.push(`Updated validator: ${validator.tableName}`);
  } else if (writeResult.action === 'skipped' && writeResult.success === false) {
    summary.warnings.push(`Skipped validator: ${validator.tableName} (would overwrite)`);
  }
}

logSuccess(`  Generated ${summary.validatorsGenerated} validator files`);
  
// =====================================================
// PHASE 6: Generate Utilities (Tables)
// =====================================================

logInfo('Phase 6/9: Generating utilities...');

// Function to determine if a table needs utilities (only full_crud)
function needsUtility(tableName: string): boolean {
  const level = getTableHandlingLevel(tableName);
  return level === 'full_crud';
}

// Function to get deity folder for a table
function getTableDeityFolder(tableName: string): string {
  const folder = getFolderNameForTable(tableName);
  return folder ? `${folder}` : 'hestia_core';
}

// Function to get category for a table
function getTableCategory(tableName: string): ObjectCategory {
  const { getTableCategory } = require('@/config/object-categories.js');
  return getTableCategory(tableName);
}

// Format utilities
const formattedUtils = formatUtils(
  tables,
  getTableDeityFolder,
  getTableCategory,
  needsUtility,
  { verbose: opts.verbose }
);

// Write each utility file
for (const util of formattedUtils) {
  const writeResult = await writeGeneratedFile(
    util.filePath,
    util.content,
    [`Database.public.Tables.${util.tableName}`],
    {
      dryRun: opts.dryRun,
      force: opts.force,
      verbose: opts.verbose,
      logger
    }
  );
  
  if (writeResult.success && writeResult.action === 'created') {
    summary.utilsGenerated++;
  } else if (writeResult.success && writeResult.action === 'updated') {
    summary.utilsGenerated++;
    summary.warnings.push(`Updated utility: ${util.tableName}`);
  } else if (writeResult.action === 'skipped' && writeResult.success === false) {
    summary.warnings.push(`Skipped utility: ${util.tableName} (would overwrite)`);
  }
}

logSuccess(`  Generated ${summary.utilsGenerated} utility files`);
  
// =====================================================
// PHASE 7: Generate API Routes (Tables)
// =====================================================

logInfo('Phase 7/9: Generating API routes...');

// Function to determine if a table needs API routes
function needsApiRoutes(tableName: string): boolean {
  const level = getTableHandlingLevel(tableName);
  return level === 'full_crud' || level === 'assessment' || level === 'join_table';
}

// Function to get workflow config for a table (for API flags)
function getTableWorkflowConfig(tableName: string) {
  return getWorkflowConfig(tableName);
}

// Format API routes
const formattedApiRoutes = formatMultipleApiRoutes(
  tables,
  getTableDeityFolder,
  getTableCategory,
  needsApiRoutes,
  { verbose: opts.verbose }
);

// Write each API route file
for (const route of formattedApiRoutes) {
  const sourceInfo = `Database.public.Tables.${route.tableName}${route.routeType === 'special' ? `.${route.specialType}` : ''}`;
  
  const writeResult = await writeGeneratedFile(
    route.filePath,
    route.content,
    [sourceInfo],
    {
      dryRun: opts.dryRun,
      force: opts.force,
      verbose: opts.verbose,
      logger
    }
  );
  
  if (writeResult.success && writeResult.action === 'created') {
    summary.apiRoutesGenerated++;
  } else if (writeResult.success && writeResult.action === 'updated') {
    summary.apiRoutesGenerated++;
    summary.warnings.push(`Updated API route: ${route.tableName}/${route.routeType}`);
  } else if (writeResult.action === 'skipped' && writeResult.success === false) {
    summary.warnings.push(`Skipped API route: ${route.tableName}/${route.routeType} (would overwrite)`);
  }
}

logSuccess(`  Generated ${summary.apiRoutesGenerated} API route files`);
  
  // =====================================================
  // PHASE 8: Generate Hooks (Tables)
  // =====================================================
  
  logInfo('Phase 8/9: Generating hooks...');
  // TODO: Format tables into React hooks (full_crud only)
  // TODO: Write each hook file
  // TODO: Track count in summary
  
  // =====================================================
  // PHASE 9: Update Registry and Maps
  // =====================================================
  
  logInfo('Phase 9/9: Updating registry and dependency maps...');
  // TODO: Save updated system registry
  // TODO: Save updated dependency map
  // TODO: Add efficiency record
  
  // =====================================================
  // SUMMARY
  // =====================================================
  
  summary.endTime = new Date();
  logger.endRun(summary.errors.length === 0 ? 'success' : 'partial');
  
  printSummary(summary, opts);
  
  return summary;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Print generation summary
 */
function printSummary(summary: GenerationSummary, options: Required<GaiaOptions>): void {
  const elapsed = (summary.endTime.getTime() - summary.startTime.getTime()) / 1000;
  
  console.log('\n');
  logSeparator();
  logHeader('GAIA GENERATION SUMMARY');
  logSeparator();
  console.log('');
  
  logInfo(`Total time: ${elapsed.toFixed(2)} seconds`);
  logInfo(`Constants generated: ${summary.constantsGenerated}`);
  logInfo(`Types generated: ${summary.typesGenerated}`);
  logInfo(`Validators generated: ${summary.validatorsGenerated}`);
  logInfo(`Utilities generated: ${summary.utilsGenerated}`);
  logInfo(`API routes generated: ${summary.apiRoutesGenerated}`);
  logInfo(`Hooks generated: ${summary.hooksGenerated}`);
  
  if (summary.warnings.length > 0) {
    console.log('');
    logWarning(`Warnings: ${summary.warnings.length}`);
    for (const warning of summary.warnings.slice(0, 5)) {
      logDebug(`  ⚠️ ${warning}`);
    }
  }
  
  if (summary.errors.length > 0) {
    console.log('');
    logError(`Errors: ${summary.errors.length}`);
    for (const error of summary.errors.slice(0, 5)) {
      logError(`  ❌ ${error}`);
    }
  }
  
  console.log('');
  logSeparator();
  if (options.dryRun) {
    logInfo('Dry run complete. Run without --dry-run to write files.');
  } else {
    logSuccess('GAIA generation complete!');
  }
  logSeparator();
  console.log('');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

if (require.main === module) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const force = args.includes('--force') || args.includes('-f');
  const quiet = args.includes('--quiet') || args.includes('-q');
  const verbose = !quiet;
  
  runGaiaGenerator({ dryRun, force, verbose, quiet })
    .then((summary) => {
      if (summary.errors.length > 0) {
        process.exit(1);
      }
    })
    .catch((error) => {
      logError(`GAIA generator failed: ${error.message}`);
      process.exit(1);
    });
}
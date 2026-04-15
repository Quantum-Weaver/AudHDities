// src/scripts/system/gaia/index.ts
// ============================================================================
// GAIA - DATABASE TYPE GENERATOR
// ============================================================================
// Purpose: Read database.types.ts and generate all supporting files
// Dependencies: All gaia generator modules
// Output: src/*/generated/ files
// ============================================================================
// PHASE 0: SKELETON ONLY
// All phases are placeholders - implement one at a time
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Import from config
import { getFolderNameForTable } from '@/config/deity_groups.js';
import { 
  getTableCategory, 
  needsUtils, 
  needsHooks,
  needsValidators,
  needsApiRoutes,
  type ObjectCategory
} from '@/config/object_categories.js';
import { 
  addRecord, 
  estimateRunTime, 
  getEfficiencyStats, 
  updateResourceProfile 
} from '@/config/efficiency_records.js';
import { validateName, transformName, detectContextFromPath } from '@/config/naming_guide.js';
import { saveDependencyMap, loadDependencyMap, findAffectedNodes } from '@/config/dependency_map.js';

// Import from shared
import { readDatabaseTypes } from '../../shared/file_reader.js';
import { SystemLogger } from '../../shared/system_logger.js';
import { 
  logSuccess, logError, logInfo, logWarning, 
  logSeparator, logHeader, logDebug 
} from '../../shared/logger.js';
import { intelligentPause, confirmAction } from '../../shared/pause.js';
import { 
  CONSTANTS_BASE_PATH, 
  TYPES_BASE_PATH, 
  VALIDATORS_BASE_PATH,
  UTILS_BASE_PATH,
  HOOKS_BASE_PATH,
  API_BASE_PATH,
  getDeityFilePath,
  getFlatFilePath
} from '../../shared/paths.js';

// Import from modules
import { analyzeDependencies } from '../../modules/analyze/analyze_dependencies.js';
import { findMarkers } from '../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../modules/system/find_closing_braces.js';
import { countAllCollections } from '../../modules/system/count_items.js';
import { discoverDirectories, ensureAllDirectories } from '../../modules/discover/discover_directories.js';

// Import from gaia generators (will be uncommented as phases are implemented)
// import { extractTables, type TableInfo } from './extract_tables.js';
// import { extractViews, type ViewInfo } from './extract_views.js';
// import { extractFunctions, type FunctionInfo } from './extract_functions.js';
// import { extractTypeEnums, type TypeEnumInfo } from './extract_type_enums.js';
// import { extractRuntimeEnums, type RuntimeEnumInfo } from './extract_runtime_enums.js';
// import { generateMultipleConstantFiles } from '../../modules/generate/generate_object_constants.js';
// import { generateMultipleTypeFiles } from '../../modules/generate/generate_object_types.js';
// import { generateValidatorsForTables } from '../../modules/generate/generate_validators.js';
// import { generateApiRoutesForTables } from '../../modules/generate/generate_api_routes.js';
// import { formatUtils, type FormattedUtility } from './format_utils.js';
// import { formatMultipleHooks, type FormattedHook } from './format_hooks.js';
// import { writeGeneratedFile, type WriteOptions } from './write_generated_file.js';

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
  autoApprove?: boolean;  // Skip pause prompts
}

const DEFAULT_OPTIONS: Required<GaiaOptions> = {
  dryRun: false,
  force: false,
  verbose: true,
  quiet: false,
  maxTables: 0,  // 0 means no limit
  autoApprove: false
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
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate a unique run ID
 */
function generateRunId(): string {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
}

/**
 * Get deity folder for a table
 */
function getTableDeityFolder(tableName: string): string {
  const folder = getFolderNameForTable(tableName);
  return folder ? folder : 'hestia-core';
}

/**
 * Get deity folder for an enum (derived from table references)
 * This is a placeholder - will be implemented when tables are extracted
 */
function getEnumDeityFolder(enumName: string, tables: any[]): string {
  // TODO: Implement when extractTables is active
  return 'hestia-core';
}

/**
 * Ask user for confirmation to write files
 */
async function askUserToWrite(): Promise<boolean> {
  return confirmAction('Write files to disk?', false);
}

// ============================================================================
// PLACEHOLDER FUNCTIONS FOR EACH PHASE
// ============================================================================

async function placeholderPhase(phaseName: string, message: string): Promise<void> {
  logInfo(`  [PLACEHOLDER] ${phaseName}: ${message}`);
}

// ============================================================================
// PHASE 1: Read and Parse Database Types
// ============================================================================

async function phase1ReadDatabase(
  lines: string[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger
): Promise<{ markers: any; completeMarkers: any; collections: any }> {
  if (opts.verbose) {
    logInfo('Phase 1/9: Reading database.types.ts...');
  }
  
  const fileResult = readDatabaseTypes();
  
  if (!fileResult.success) {
    throw new Error(`Failed to read database.types.ts: ${fileResult.error}`);
  }
  
  const newLines = fileResult.content.split(/\r?\n/);
  Object.assign(lines, newLines);
  
  if (opts.verbose) {
    logSuccess(`File loaded: ${fileResult.encoding}, ${lines.length} lines`);
  }
  
  const markers = findMarkers(lines, { verbose: opts.verbose });
  const completeMarkers = findAllClosingBraces(lines, markers, { verbose: opts.verbose });
  const collections = countAllCollections(lines, completeMarkers, { verbose: opts.verbose, maxItemsToList: 200 });
  
  if (opts.verbose) {
    logInfo(`  Tables: ${collections.tables.itemCount}`);
    logInfo(`  Views: ${collections.views.itemCount}`);
    logInfo(`  Functions: ${collections.functions.itemCount}`);
    logInfo(`  Enums: ${collections.enums.itemCount}`);
  }
  
  logger.addNote(`Found ${collections.tables.itemCount} tables, ${collections.views.itemCount} views, ${collections.functions.itemCount} functions, ${collections.enums.itemCount} enums`);
  
  return { markers, completeMarkers, collections };
}

// ============================================================================
// PHASE 1.5: Discover Directories
// ============================================================================

async function phase1point5DiscoverDirectories(
  opts: Required<GaiaOptions>,
  logger: SystemLogger
): Promise<any> {
  if (opts.verbose) {
    logInfo('Phase 1.5/9: Discovering directories...');
  }
  
  const directoryState = discoverDirectories({ verbose: opts.verbose });
  const ensuredState = ensureAllDirectories({ verbose: opts.verbose });
  
  if (opts.verbose) {
    logInfo(`Directory discovery complete:`);
    logInfo(`  Constants: ${directoryState.summary.components.constantsFiles} existing files`);
    logInfo(`  Types: ${directoryState.summary.components.typesFiles} existing files`);
    logInfo(`  Validators: ${directoryState.summary.components.validatorsFiles} existing files`);
    logInfo(`  Utils: ${directoryState.summary.components.utilsFiles} existing files`);
    logInfo(`  Hooks: ${directoryState.summary.components.hooksFiles} existing files`);
    logInfo(`  API: ${directoryState.summary.components.apiFiles} existing files`);
    logInfo(`  Total: ${directoryState.summary.totalExistingFiles} existing files`);
  }
  
  logger.addNote(`Directory discovery: ${directoryState.summary.totalExistingFiles} existing files found`);
  
  return directoryState;
}

// ============================================================================
// PHASE 2-9: Placeholders (to be implemented one at a time)
// ============================================================================

async function phase2ExtractObjects(
  lines: string[],
  completeMarkers: any,
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary
): Promise<{ runtimeEnums: any[]; typeEnums: any[]; tables: any[]; views: any[]; functions: any[] }> {
  await placeholderPhase('Phase 2', 'Extracting objects');
  return { runtimeEnums: [], typeEnums: [], tables: [], views: [], functions: [] };
}

async function phase3GenerateConstants(
  runtimeEnums: any[],
  tables: any[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary
): Promise<void> {
  await placeholderPhase('Phase 3', 'Generating constants');
}

async function phase4GenerateTypes(
  tables: any[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary
): Promise<void> {
  await placeholderPhase('Phase 4', 'Generating types');
}

async function phase5GenerateValidators(
  tables: any[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary
): Promise<void> {
  await placeholderPhase('Phase 5', 'Generating validators');
}

async function phase6GenerateUtilities(
  tables: any[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary
): Promise<void> {
  await placeholderPhase('Phase 6', 'Generating utilities');
}

async function phase7GenerateApiRoutes(
  tables: any[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary
): Promise<void> {
  await placeholderPhase('Phase 7', 'Generating API routes');
}

async function phase8GenerateHooks(
  tables: any[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary
): Promise<void> {
  await placeholderPhase('Phase 8', 'Generating hooks');
}

async function phase9UpdateRegistry(
  summary: GenerationSummary,
  opts: Required<GaiaOptions>,
  logger: SystemLogger
): Promise<void> {
  await placeholderPhase('Phase 9', 'Updating registry and maps');
}

// ============================================================================
// PRINT SUMMARY
// ============================================================================

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
// MAIN ORCHESTRATOR
// ============================================================================

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
  
  // Placeholder for lines array (will be populated in phase1)
  const lines: string[] = [];
  
  try {
    // =====================================================
    // PHASE 1: Read and Parse Database Types
    // =====================================================
    
    const { markers, completeMarkers, collections } = await phase1ReadDatabase(lines, opts, logger);
    
    if (!opts.autoApprove) {
      const pauseResult = await intelligentPause('Phase 1 - Database Parsing', {
        showSummary: true,
        summaryData: {
          tables: collections.tables.itemCount,
          views: collections.views.itemCount,
          functions: collections.functions.itemCount,
          enums: collections.enums.itemCount
        }
      });
      if (!pauseResult.shouldContinue) {
        logger.endRun('failed');
        return summary;
      }
    }
    
    // =====================================================
    // PHASE 1.5: Discover Directories
    // =====================================================
    
    const directoryState = await phase1point5DiscoverDirectories(opts, logger);
    
    if (!opts.autoApprove) {
      const pauseResult = await intelligentPause('Phase 1.5 - Directory Discovery', {
        showSummary: true,
        summaryData: {
          existingFiles: directoryState.summary.totalExistingFiles,
          constants: directoryState.summary.components.constantsFiles,
          types: directoryState.summary.components.typesFiles,
          validators: directoryState.summary.components.validatorsFiles
        }
      });
      if (!pauseResult.shouldContinue) {
        logger.endRun('failed');
        return summary;
      }
    }
    
    // =====================================================
    // PHASE 2: Extract Objects
    // =====================================================
    
    const { runtimeEnums, typeEnums, tables, views, functions } = await phase2ExtractObjects(
      lines, completeMarkers, opts, logger, summary
    );
    
    // =====================================================
    // PHASE 3: Generate Constants
    // =====================================================
    
    await phase3GenerateConstants(runtimeEnums, tables, opts, logger, summary);
    
    // =====================================================
    // PHASE 4: Generate Types
    // =====================================================
    
    await phase4GenerateTypes(tables, opts, logger, summary);
    
    // =====================================================
    // PHASE 5: Generate Validators
    // =====================================================
    
    await phase5GenerateValidators(tables, opts, logger, summary);
    
    // =====================================================
    // PHASE 6: Generate Utilities
    // =====================================================
    
    await phase6GenerateUtilities(tables, opts, logger, summary);
    
    // =====================================================
    // PHASE 7: Generate API Routes
    // =====================================================
    
    await phase7GenerateApiRoutes(tables, opts, logger, summary);
    
    // =====================================================
    // PHASE 8: Generate Hooks
    // =====================================================
    
    await phase8GenerateHooks(tables, opts, logger, summary);
    
    // =====================================================
    // PHASE 9: Update Registry
    // =====================================================
    
    await phase9UpdateRegistry(summary, opts, logger);
    
  } catch (error) {
    logError(`GAIA generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    summary.errors.push(`Fatal error: ${error}`);
    logger.endRun('failed');
    return summary;
  }
  
  summary.endTime = new Date();
  logger.endRun(summary.errors.length === 0 ? 'success' : 'partial');
  
  printSummary(summary, opts);
  
  return summary;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

if (require.main === module) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const force = args.includes('--force') || args.includes('-f');
  const autoApprove = args.includes('--auto-approve') || args.includes('-a');
  const quiet = args.includes('--quiet') || args.includes('-q');
  const verbose = !quiet;
  
  runGaiaGenerator({ dryRun, force, verbose, quiet, autoApprove })
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
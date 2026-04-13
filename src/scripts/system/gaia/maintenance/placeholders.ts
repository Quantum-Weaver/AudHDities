// src/scripts/system/gaia/index.ts
// ============================================================================
// GAIA - DATABASE TYPE GENERATOR
// ============================================================================
// PHASE 1 + 1.5 ONLY
// Purpose: Read database.types.ts and discover directories
// All other phases are placeholders for incremental building
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// import from config
import { getFolderNameForTable } from 'src/config/deity_groups.js';
import { 
  getTableCategory, 
  needsUtils, 
  needsHooks,
  needsValidators,
  needsApiRoutes,
  type ObjectCategory
} from 'src/config/object_categories.js';
import { 
  addRecord, 
  estimateRunTime, 
  getEfficiencyStats, 
  updateResourceProfile 
} from 'src/config/efficiency_records.js';
import { validateName, transformName, detectContextFromPath } from 'src/config/naming_guide.js';
import { saveDependencyMap, loadDependencyMap, findAffectedNodes } from 'src/config/dependency_map.js';

// import from shared
import { readDatabaseTypes } from '../../shared/file_reader.js';
import { SystemLogger } from '../../shared/system_logger.js';
import { 
  logSuccess, logError, logInfo, logWarning, 
  logSeparator, logHeader, logDebug 
} from '../../shared/logger.js';

// import from modules
import { analyzeDependencies } from '../../modules/analyze/analyze_dependencies.js';
import { findMarkers } from '../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../modules/system/find_closing_braces.js';
import { countAllCollections } from '../../modules/system/count_items.js';
import { discoverDirectories, ensureAllDirectories } from '../../modules/discover/discover_directories.js';

//Placeholder imports for future phases
import { extractTables, type TableInfo } from './extract_tables.js';
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
function getEnumDeityFolder(enumName: string, tables: TableInfo[]): string {
  for (const table of tables) {
    if (table.enumRefs && table.enumRefs.includes(enumName)) {
      const folder = getTableDeityFolder(table.name);
      if (folder) return folder;
    }
  }
  return 'hestia-core';
}

/**
 * Ask user for confirmation to write files
 */
async function askUserToWrite(): Promise<boolean> {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise<boolean>((resolve) => {
    readline.question('Write files to disk? (y/N): ', (answer: string) => {
      readline.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

// ============================================================================
// PLACEHOLDER FUNCTIONS FOR FUTURE PHASES
// ============================================================================

async function placeholderPhase(message: string): Promise<void> {
  logInfo(`  [PLACEHOLDER] ${message} - not yet implemented`);
}

// ============================================================================
// MAIN ORCHESTRATOR FUNCTION
// ============================================================================

/**
 * Run the GAIA generator (Phase 1 + 1.5 only)
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
  logHeader('🌍 GAIA - DATABASE TYPE GENERATOR (PHASE 1 + 1.5)');
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

const fileResult = readDatabaseTypes();

if (!fileResult.success) {
  logError(`Failed to read database.types.ts: ${fileResult.error}`);
  summary.errors.push(`File read error: ${fileResult.error}`);
  logger.addNote(`File read failed: ${fileResult.error}`);
  logger.endRun('failed');
  return summary;
}

logSuccess(`File loaded: ${fileResult.encoding}, ${fileResult.content.length} characters`);

const lines = fileResult.content.split(/\r?\n/);
logInfo(`  Total lines: ${lines.length}`);

const markers = findMarkers(lines, { verbose: opts.verbose });
logInfo(`  Database line: ${markers.databaseLine}`);
logInfo(`  Tables line: ${markers.tablesLine}`);
logInfo(`  Views line: ${markers.viewsLine}`);
logInfo(`  Functions line: ${markers.functionsLine}`);
logInfo(`  Enums line: ${markers.enumsLine}`);
logInfo(`  Constants line: ${markers.constantsLine}`);
logInfo(`  Constants.Enums line: ${markers.constantsEnumsLine}`);

const completeMarkers = findAllClosingBraces(lines, markers, { verbose: opts.verbose });
logInfo(`  Tables range: ${completeMarkers.tablesLine}-${completeMarkers.tablesEndLine}`);
logInfo(`  Views range: ${completeMarkers.viewsLine}-${completeMarkers.viewsEndLine}`);
logInfo(`  Functions range: ${completeMarkers.functionsLine}-${completeMarkers.functionsEndLine}`);
logInfo(`  Enums range: ${completeMarkers.enumsLine}-${completeMarkers.enumsEndLine}`);
logInfo(`  Constants range: ${completeMarkers.constantsLine}-${completeMarkers.constantsEndLine}`);
logInfo(`  Constants.Enums range: ${completeMarkers.constantsEnumsLine}-${completeMarkers.constantsEnumsEndLine}`);

const collections = countAllCollections(lines, completeMarkers, { verbose: opts.verbose });
logInfo(`  Tables: ${collections.tables.itemCount}`);
logInfo(`  Views: ${collections.views.itemCount}`);
logInfo(`  Functions: ${collections.functions.itemCount}`);
logInfo(`  Enums (type-level): ${collections.enums.itemCount}`);

logger.addNote(`Found ${collections.tables.itemCount} tables, ${collections.views.itemCount} views, ${collections.functions.itemCount} functions, ${collections.enums.itemCount} enums`);

logSuccess('Phase 1 complete');
console.log('');

// =====================================================
// PHASE 1.5: Discover Directories
// =====================================================

logInfo('Phase 1.5/9: Discovering directories...');

// Discover current directory state
const directoryState = discoverDirectories({ verbose: opts.verbose });

// Ensure all required directories exist
logInfo('Ensuring required directories exist...');
const ensuredState = ensureAllDirectories({ verbose: opts.verbose });

// Display summary of existing files
logInfo(`Directory discovery complete:`);
logInfo(`  Constants: ${directoryState.summary.components.constantsFiles} existing files`);
logInfo(`  Types: ${directoryState.summary.components.typesFiles} existing files`);
logInfo(`  Validators: ${directoryState.summary.components.validatorsFiles} existing files`);
logInfo(`  Utils: ${directoryState.summary.components.utilsFiles} existing files`);
logInfo(`  Hooks: ${directoryState.summary.components.hooksFiles} existing files`);
logInfo(`  API: ${directoryState.summary.components.apiFiles} existing files`);
logInfo(`  Total: ${directoryState.summary.totalExistingFiles} existing files`);

logger.addNote(`Directory discovery: ${directoryState.summary.totalExistingFiles} existing files found`);

logSuccess('Phase 1.5 complete');
console.log('');

// =====================================================
// PHASE 2: Extract All Objects (PLACEHOLDER)
// =====================================================

logInfo('Phase 2/9: Extracting objects...');
await placeholderPhase('Extraction of tables, views, functions, enums');
logInfo('  Would extract:');
logInfo(`    - ${collections.tables.itemCount} tables`);
logInfo(`    - ${collections.views.itemCount} views`);
logInfo(`    - ${collections.functions.itemCount} functions`);
logInfo(`    - ${collections.enums.itemCount} type enums`);
logInfo(`    - Runtime enums from Constants.public.Enums`);
logSuccess('Phase 2 placeholder complete');
console.log('');

// =====================================================
// PHASE 3: Generate Constants (PLACEHOLDER)
// =====================================================

logInfo('Phase 3/9: Generating constants...');
await placeholderPhase('Constants generation from runtime enums');
logInfo('  Would generate constant files for each runtime enum');
logInfo('  Would place in: src/lib/constants/generated/{deity}/{enum}.ts');
logSuccess('Phase 3 placeholder complete');
console.log('');

// =====================================================
// PHASE 4: Generate Types (PLACEHOLDER)
// =====================================================

logInfo('Phase 4/9: Generating types...');
await placeholderPhase('Type generation from tables');
logInfo('  Would generate type files for each table');
logInfo('  Would place in: src/types/generated/{deity}/{table}.ts');
logSuccess('Phase 4 placeholder complete');
console.log('');

// =====================================================
// PHASE 5: Generate Validators (PLACEHOLDER)
// =====================================================

logInfo('Phase 5/9: Generating validators...');
await placeholderPhase('Validator generation from tables');
logInfo('  Would generate validator files for tables that need them');
logInfo('  Would place in: src/lib/validators/generated/{table}.ts');
logSuccess('Phase 5 placeholder complete');
console.log('');

// =====================================================
// PHASE 6: Generate Utilities (PLACEHOLDER)
// =====================================================

logInfo('Phase 6/9: Generating utilities...');
await placeholderPhase('Utility generation from tables');
logInfo('  Would generate utility files for full_crud tables');
logInfo('  Would place in: src/utils/generated/{deity}/{table}.ts');
logSuccess('Phase 6 placeholder complete');
console.log('');

// =====================================================
// PHASE 7: Generate API Routes (PLACEHOLDER)
// =====================================================

logInfo('Phase 7/9: Generating API routes...');
await placeholderPhase('API route generation from tables');
logInfo('  Would generate API routes for tables that need them');
logInfo('  Would place in: src/app/api/generated/{deity}/{table}/route.ts');
logSuccess('Phase 7 placeholder complete');
console.log('');

// =====================================================
// PHASE 8: Generate Hooks (PLACEHOLDER)
// =====================================================

logInfo('Phase 8/9: Generating hooks...');
await placeholderPhase('Hook generation from tables');
logInfo('  Would generate React hooks for full_crud tables');
logInfo('  Would place in: src/hooks/generated/{deity}/{table}.ts');
logSuccess('Phase 8 placeholder complete');
console.log('');

// =====================================================
// PHASE 9: Update Registry and Maps (PLACEHOLDER)
// =====================================================

logInfo('Phase 9/9: Updating registry and dependency maps...');
await placeholderPhase('Registry and dependency map updates');
logInfo('  Would add efficiency record');
logInfo('  Would update system_registry.ts');
logInfo('  Would update dependency_map.ts');
logSuccess('Phase 9 placeholder complete');
console.log('');

// =====================================================
// SUMMARY
// =====================================================

summary.endTime = new Date();
logger.endRun('success');

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
  logHeader('GAIA GENERATION SUMMARY (PLACEHOLDER MODE)');
  logSeparator();
  console.log('');
  
  logInfo(`Total time: ${elapsed.toFixed(2)} seconds`);
  logInfo(`Phase 1 + 1.5 complete - ready for next phase`);
  
  console.log('');
  logSeparator();
  if (options.dryRun) {
    logInfo('Dry run complete. Run without --dry-run to test directory creation.');
  } else {
    logInfo('Directory discovery and creation complete.');
  }
  logInfo('Next: Implement Phase 2 - Object Extraction');
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
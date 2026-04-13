// src/scripts/system/gaia/index.ts
// ============================================================================
// GAIA - DATABASE TYPE GENERATOR
// ============================================================================
// Purpose: Read database.types.ts and generate all supporting files
// Dependencies: All gaia generator modules
// Output: @/*/generated/ files
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

// import from gaia generators (extraction only)
import { extractTables, type TableInfo } from './extract_tables.js';
import { extractViews, type ViewInfo } from './extract_views.js';
import { extractFunctions, type FunctionInfo } from './extract_functions.js';
import { extractTypeEnums, type TypeEnumInfo } from './extract_type_enums.js';
import { extractRuntimeEnums, type RuntimeEnumInfo } from './extract_runtime_enums.js';

// import from legacy modules (generation - CORRECT implementations)
import { generateMultipleConstantFiles } from '../../modules/generate/generate_object_constants.js';
import { generateMultipleTypeFiles } from '../../modules/generate/generate_object_types.js';
import { generateValidatorsForTables } from '../../modules/generate/generate_validators.js';
import { generateApiRoutesForTables } from '../../modules/generate/generate_api_routes.js';

// import from gaia generators (no legacy equivalent)
import { formatUtils, type FormattedUtility } from './format_utils.js';
import { formatMultipleHooks, type FormattedHook } from './format_hooks.js';
import { writeGeneratedFile, type WriteOptions } from './write_generated_file.js';


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

/**
 * Get deity folder for an enum (derived from table references)
 */
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

// =====================================================
// PHASE 2: Extract All Objects
// =====================================================

logInfo('Phase 2/9: Extracting objects...');

let runtimeEnums: RuntimeEnumInfo[] = [];
if (completeMarkers.constantsEnumsLine !== -1 && completeMarkers.constantsEnumsEndLine !== -1) {
  runtimeEnums = await extractRuntimeEnums(
    lines,
    completeMarkers.constantsEnumsLine,
    completeMarkers.constantsEnumsEndLine,
    { verbose: opts.verbose }
  );
  logSuccess(`  Extracted ${runtimeEnums.length} runtime enums`);
} else {
  logWarning('  Constants.Enums section not found');
}

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

// Build constants map for legacy generator
const constantsMap = new Map<string, { values: string[]; folder: string }>();
for (const enumInfo of runtimeEnums) {
  const folder = getEnumDeityFolder(enumInfo.name, tables);
  constantsMap.set(enumInfo.name, { values: enumInfo.values, folder });
}

// Use legacy generator
const constantsResult = await generateMultipleConstantFiles(constantsMap, {
  verbose: opts.verbose,
  dryRun: opts.dryRun,
  forceOverwrite: opts.force
});

summary.constantsGenerated = constantsResult.created.length + constantsResult.updated.length;
summary.warnings.push(...constantsResult.errors.map(e => `Constant: ${e}`));

logSuccess(`  Generated ${summary.constantsGenerated} constant files`);

for (const filePath of constantsResult.created) {
  logger.addGeneratedFile(filePath);
}
for (const filePath of constantsResult.updated) {
  logger.addGeneratedFile(filePath);
}
  
// =====================================================
// PHASE 4: Generate Types (Tables)
// =====================================================

logInfo('Phase 4/9: Generating types...');

// Group tables by deity folder
const tablesByDeity = new Map<string, TableInfo[]>();
for (const table of tables) {
  const deity = getTableDeityFolder(table.name);
  if (!tablesByDeity.has(deity)) {
    tablesByDeity.set(deity, []);
  }
  tablesByDeity.get(deity)!.push(table);
}

const allTypeResults = { 
  filesCreated: [] as string[], 
  filesOverwritten: [] as string[], 
  filesSkipped: [] as string[],
  errors: [] as string[] 
};

// Process each deity group separately
for (const [deity, deityTables] of tablesByDeity) {
  // Build content map for this deity using formatTypes
  const deityContentMap = new Map<string, any>();
  for (const table of deityTables) {
    const { formatTypes } = await import('./format_types.js');
    const formatted = formatTypes([table], getTableDeityFolder, getTableCategory, { verbose: false });
    for (const f of formatted) {
      deityContentMap.set(f.tableName, { fullContent: f.content });
    }
  }
  
  const deityResult = await generateMultipleTypeFiles(deityContentMap, deity, {
    verbose: opts.verbose,
    dryRun: opts.dryRun,
    forceOverwrite: opts.force
  });
  
  allTypeResults.filesCreated.push(...deityResult.filesCreated);
  allTypeResults.filesOverwritten.push(...deityResult.filesOverwritten);
  allTypeResults.filesSkipped.push(...deityResult.filesSkipped);
  allTypeResults.errors.push(...deityResult.errors);
}

summary.typesGenerated = allTypeResults.filesCreated.length + allTypeResults.filesOverwritten.length;
summary.warnings.push(...allTypeResults.errors);

logSuccess(`  Generated ${summary.typesGenerated} type files`);

for (const filePath of allTypeResults.filesCreated) {
  logger.addGeneratedFile(filePath);
}
for (const filePath of allTypeResults.filesOverwritten) {
  logger.addGeneratedFile(filePath);
}
  
// =====================================================
// PHASE 5: Generate Validators (Tables)
// =====================================================

logInfo('Phase 5/9: Generating validators...');

// Build table content list for legacy generator
const validatorTables = tables
  .filter(table => needsValidators(table.name))
  .map(table => ({
    name: table.name,
    content: table.content
  }));

// Use legacy generator
const validatorsResult = await generateValidatorsForTables(validatorTables, {
  verbose: opts.verbose,
  dryRun: opts.dryRun,
  forceOverwrite: opts.force
});

summary.validatorsGenerated = validatorsResult.created + validatorsResult.updated;
summary.warnings.push(...validatorsResult.errors);

logSuccess(`  Generated ${summary.validatorsGenerated} validator files`);
  
// =====================================================
// PHASE 6: Generate Utilities (Tables)
// =====================================================

logInfo('Phase 6/9: Generating utilities...');

const formattedUtils = formatUtils(
  tables.filter(table => needsUtils(table.name)),
  getTableDeityFolder,
  getTableCategory,
  () => true,
  { verbose: opts.verbose }
);

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
  
  if (writeResult.success && (writeResult.action === 'created' || writeResult.action === 'updated')) {
    summary.utilsGenerated++;
  } else if (writeResult.action === 'skipped' && writeResult.success === false) {
    summary.warnings.push(`Skipped utility: ${util.tableName} (would overwrite)`);
  }
}

logSuccess(`  Generated ${summary.utilsGenerated} utility files`);
  
// =====================================================
// PHASE 7: Generate API Routes (Tables)
// =====================================================

logInfo('Phase 7/9: Generating API routes...');

// Build API config list for legacy generator
const apiTables = tables
  .filter(table => needsApiRoutes(table.name))
  .map(table => {
    const category = getTableCategory(table.name);
    return {
      name: table.name,
      hasGetList: category.generateApiGetList,
      hasGetSingle: category.generateApiGetSingle,
      hasPost: category.generateApiPost,
      hasPut: category.generateApiPut,
      hasDelete: category.generateApiDelete,
      specialRoutes: category.generateApiSpecial
    };
  });

// Use legacy generator
const apiResult = await generateApiRoutesForTables(apiTables, {
  verbose: opts.verbose,
  dryRun: opts.dryRun,
  forceOverwrite: opts.force
});

summary.apiRoutesGenerated = apiResult.created + apiResult.updated;
summary.warnings.push(...apiResult.errors);

logSuccess(`  Generated ${summary.apiRoutesGenerated} API route files`);
  
// =====================================================
// PHASE 8: Generate Hooks (Tables)
// =====================================================

logInfo('Phase 8/9: Generating hooks...');

const formattedHooks = formatMultipleHooks(
  tables.filter(table => needsHooks(table.name)),
  getTableDeityFolder,
  getTableCategory,
  () => true,
  { verbose: opts.verbose }
);

for (const hook of formattedHooks) {
  const writeResult = await writeGeneratedFile(
    hook.filePath,
    hook.content,
    [`Database.public.Tables.${hook.tableName}`],
    {
      dryRun: opts.dryRun,
      force: opts.force,
      verbose: opts.verbose,
      logger
    }
  );
  
  if (writeResult.success && (writeResult.action === 'created' || writeResult.action === 'updated')) {
    summary.hooksGenerated++;
  } else if (writeResult.action === 'skipped' && writeResult.success === false) {
    summary.warnings.push(`Skipped hook: ${hook.tableName} (would overwrite)`);
  }
}

logSuccess(`  Generated ${summary.hooksGenerated} hook files`);
  
  // =====================================================
  // PHASE 9: Update Registry and Maps
  // =====================================================
  
  logInfo('Phase 9/9: Updating registry and dependency maps...');
  
  const totalFiles = summary.constantsGenerated + summary.typesGenerated + 
                     summary.validatorsGenerated + summary.utilsGenerated + 
                     summary.apiRoutesGenerated + summary.hooksGenerated;
  
  addRecord({
    id: generateRunId(),
    timestamp: new Date().toISOString(),
    system: 'GAIA',
    totalFilesGenerated: totalFiles,
    totalTimeMs: summary.endTime.getTime() - summary.startTime.getTime(),
    averageTimePerFile: totalFiles > 0 ? (summary.endTime.getTime() - summary.startTime.getTime()) / totalFiles : 0,
    cacheHits: 0,
    cacheMisses: totalFiles,
    memoryUsage: process.memoryUsage().heapUsed,
    fileTypeBreakdown: {
      constants: summary.constantsGenerated,
      types: summary.typesGenerated,
      validators: summary.validatorsGenerated,
      utils: summary.utilsGenerated,
      api: summary.apiRoutesGenerated,
      hooks: summary.hooksGenerated
    }
  });
  
  if (!opts.dryRun && opts.verbose) {
    logInfo('  Analyzing dependencies...');
    try {
      const analyzeResult = await analyzeDependencies({
        paths: ['src/types/generated', 'src/lib/constants/generated', 'src/lib/validators/generated', 
                'src/utils/generated', 'src/app/api/generated', 'src/hooks/generated'],
        recursive: true,
        maxDepth: 3,
        includeNodeModules: false,
        verbose: false
      });
      
      if (analyzeResult.success) {
        logDebug(`    Found ${analyzeResult.nodesFound} nodes, ${analyzeResult.edgesFound} edges`);
      }
    } catch (error) {
      logWarning(`    Dependency analysis failed: ${error}`);
    }
  }
  
  logSuccess('  Registry and maps updated');
  
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
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

// import from config
import { getFolderNameForTable } from '@/config/deity_groups.js';
import { 
  getTableCategory, 
  needsUtils, 
  needsHooks,
  needsValidators,
  needsApiRoutes,
  needsConstantGeneration,
  needsTypeGeneration,
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

// import from shared
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
import { ImportManager } from '../../shared/import_manager.js';
import { cleanEnumValue, formatFieldDeclaration, needsQuoteWrapping } from '../../shared/quote_manager.js';
import { ObjectCheckList } from '../../modules/system/object_checklist.js';

// import from modules
import { analyzeDependencies } from '../../modules/analyze/analyze_dependencies.js';
import { findMarkers } from '../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../modules/system/find_closing_braces.js';
import { countAllCollections } from '../../modules/system/count_items.js';
import { discoverDirectories, ensureAllDirectories } from '../../modules/discover/discover_directories.js';

// import from gaia generators
import { extractTables, type TableInfo } from '../gaia/extract_tables.js';
import { extractViews, type ViewInfo } from '../gaia/extract_views.js';
import { extractFunctions, type FunctionInfo } from '../gaia/extract_functions.js';
import { extractTypeEnums, type TypeEnumInfo } from '../gaia/extract_type_enums.js';
import { extractRuntimeEnums, type RuntimeEnumInfo } from '../gaia/extract_runtime_enums.js';
import { enrichAll, type EnrichedTable, type EnrichedRuntimeEnum } from '../gaia/enrich_objects.js';
import { generateEnumMapping, writeEnumMapping } from './enrich_objects.js';
import { formatConstant, type FormattedConstant } from '../gaia/format_constants.js';
import { formatType, type FormattedType } from '../gaia/format_types.js';
import { formatValidator, type FormattedValidator } from '../gaia/format_validators.js';
import { formatUtility, type FormattedUtility } from '../gaia/format_utils.js';
import { formatApiRoutes, type FormattedApiRoute } from '../gaia/format_api_routes.js';
import { formatHooks, type FormattedHook } from '../gaia/format_hooks.js';
import { writeGeneratedFile, type WriteOptions } from '../gaia/write_generated_file.js';
import { getEnumFolder } from '@/config/enum_mapping.js';
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
  autoApprove?: boolean;
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

function generateRunId(): string {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
}

function getTableDeityFolder(tableName: string): string {
  const folder = getFolderNameForTable(tableName);
  return folder ? folder : 'hestia-core';
}

function getEnumDeityFolder(enumName: string): string {
  try {
    const { getEnumFolder } = require('@/config/enum_mapping.js');
    return getEnumFolder(enumName);
  } catch {
    return 'hestia-core';
  }
}

async function askUserToWrite(): Promise<boolean> {
  return confirmAction('Write files to disk?', false);
}

// ============================================================================
// PHASE 1: Read and Parse Database Types
// ============================================================================

async function phase1ReadDatabase(
  opts: Required<GaiaOptions>,
  logger: SystemLogger
): Promise<{ lines: string[]; completeMarkers: any; collections: any }> {
  logInfo('Phase 1/9: Reading database.types.ts...');
  
  const fileResult = readDatabaseTypes();
  
  if (!fileResult.success) {
    throw new Error(`Failed to read database.types.ts: ${fileResult.error}`);
  }
  
  const lines = fileResult.content.split(/\r?\n/);
  logSuccess(`File loaded: ${fileResult.encoding}, ${lines.length} lines`);
  
  const markers = findMarkers(lines, { verbose: opts.verbose });
  const completeMarkers = findAllClosingBraces(lines, markers, { verbose: opts.verbose });
  const collections = countAllCollections(lines, completeMarkers, { verbose: opts.verbose, maxItemsToList: 200 });
  
  logInfo(`  Tables: ${collections.tables.itemCount}`);
  logInfo(`  Views: ${collections.views.itemCount}`);
  logInfo(`  Functions: ${collections.functions.itemCount}`);
  logInfo(`  Enums: ${collections.enums.itemCount}`);
  
  logger.addNote(`Found ${collections.tables.itemCount} tables, ${collections.views.itemCount} views, ${collections.functions.itemCount} functions, ${collections.enums.itemCount} enums`);
  
  return { lines, completeMarkers, collections };
}

// ============================================================================
// PHASE 1.5: Discover Directories
// ============================================================================

async function phase1point5DiscoverDirectories(
  opts: Required<GaiaOptions>,
  logger: SystemLogger
): Promise<any> {
  logInfo('Phase 1.5/9: Discovering directories...');
  
  const directoryState = discoverDirectories({ verbose: opts.verbose });
  ensureAllDirectories({ verbose: opts.verbose });
  
  logInfo(`Directory discovery complete:`);
  logInfo(`  Constants: ${directoryState.summary.components.constantsFiles} existing files`);
  logInfo(`  Types: ${directoryState.summary.components.typesFiles} existing files`);
  logInfo(`  Validators: ${directoryState.summary.components.validatorsFiles} existing files`);
  logInfo(`  Utils: ${directoryState.summary.components.utilsFiles} existing files`);
  logInfo(`  Hooks: ${directoryState.summary.components.hooksFiles} existing files`);
  logInfo(`  API: ${directoryState.summary.components.apiFiles} existing files`);
  logInfo(`  Total: ${directoryState.summary.totalExistingFiles} existing files`);
  
  logger.addNote(`Directory discovery: ${directoryState.summary.totalExistingFiles} existing files found`);
  
  return directoryState;
}

// ============================================================================
// PHASE 2: Extract Objects
// ============================================================================

async function phase2ExtractObjects(
  lines: string[],
  completeMarkers: any,
  opts: Required<GaiaOptions>,
  logger: SystemLogger
): Promise<{
  runtimeEnums: RuntimeEnumInfo[];
  typeEnums: TypeEnumInfo[];
  tables: TableInfo[];
  views: ViewInfo[];
  functions: FunctionInfo[];
}> {
  logInfo('Phase 2/9: Extracting objects...');
  
  let runtimeEnums: RuntimeEnumInfo[] = [];
  let typeEnums: TypeEnumInfo[] = [];
  let tables: TableInfo[] = [];
  let views: ViewInfo[] = [];
  let functions: FunctionInfo[] = [];
  
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
  
  if (completeMarkers.enumsLine !== -1 && completeMarkers.enumsEndLine !== -1) {
    typeEnums = await extractTypeEnums(
      lines,
      completeMarkers.enumsLine,
      completeMarkers.enumsEndLine,
      { verbose: opts.verbose }
    );
    logSuccess(`  Extracted ${typeEnums.length} type enums`);
  }
  
  if (completeMarkers.tablesLine !== -1 && completeMarkers.tablesEndLine !== -1) {
    tables = await extractTables(
      lines,
      completeMarkers.tablesLine,
      completeMarkers.tablesEndLine,
      { verbose: opts.verbose, maxTables: opts.maxTables }
    );
    logSuccess(`  Extracted ${tables.length} tables`);
  }
  
  if (completeMarkers.viewsLine !== -1 && completeMarkers.viewsEndLine !== -1) {
    views = await extractViews(
      lines,
      completeMarkers.viewsLine,
      completeMarkers.viewsEndLine,
      { verbose: opts.verbose }
    );
    logSuccess(`  Extracted ${views.length} views`);
  }
  
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
  
  return { runtimeEnums, typeEnums, tables, views, functions };
}

// ============================================================================
// PHASE 2.5: Enrich Objects
// ============================================================================

function phase2point5EnrichObjects(
  runtimeEnums: RuntimeEnumInfo[],
  typeEnums: TypeEnumInfo[],
  tables: TableInfo[],
  views: ViewInfo[],
  functions: FunctionInfo[],
  opts: Required<GaiaOptions>,
  checklist: ObjectCheckList
): {
  enrichedEnums: EnrichedRuntimeEnum[];
  enrichedTables: EnrichedTable[];
} {
  logInfo('Phase 2.5/9: Enriching objects with configuration...');
  
  // =====================================================
  // STEP 1: Generate enum mapping from tables
  // =====================================================
  
  logInfo('  Generating enum mapping from table references...');
  const enumMapping = generateEnumMapping(tables);
  writeEnumMapping(enumMapping);
  logSuccess(`    Mapped ${Object.keys(enumMapping).filter(k => k !== 'default').length} enums to deity folders`);
  
  // =====================================================
  // STEP 2: Enrich all objects (tables, views, functions, enums)
  // =====================================================
  
  const enriched = enrichAll(tables, views, functions, runtimeEnums, typeEnums, { verbose: opts.verbose });
  
  // =====================================================
  // STEP 3: Override runtime enum deity folders with mapping
  // =====================================================

  const enrichedEnumsWithMapping = enriched.runtimeEnums.map(enumInfo => ({
    ...enumInfo,
    deityFolder: getEnumFolder(enumInfo.name)
  }));
  
  // =====================================================
  // STEP 4: Register all enriched objects in checklist
  // =====================================================
  
  for (const table of enriched.tables) {
    checklist.registerObject({ name: table.name, type: 'table', content: '', startLine: 0, endLine: 0 });
    checklist.updateProgress(table.name, 'analyzed', true);
  }
  
  for (const enumInfo of enrichedEnumsWithMapping) {
    checklist.registerObject({ name: enumInfo.name, type: 'runtime_enum', content: '', startLine: 0, endLine: 0 });
    checklist.updateProgress(enumInfo.name, 'analyzed', true);
  }
  
  logSuccess(`  Enriched ${enriched.tables.length} tables, ${enrichedEnumsWithMapping.length} runtime enums (with mapping)`);
  
  return {
    enrichedEnums: enrichedEnumsWithMapping,
    enrichedTables: enriched.tables,
  };
}

// ============================================================================
// PHASE 3: Generate Constants
// ============================================================================

async function phase3GenerateConstants(
  enrichedEnums: EnrichedRuntimeEnum[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary,
  checklist: ObjectCheckList
): Promise<FormattedConstant[]> {
  logInfo('Phase 3/9: Generating constants...');
  
  const enumsToGenerate = enrichedEnums.filter(e => e.shouldGenerateConstants);
  const formattedConstants: FormattedConstant[] = [];
  
  if (enumsToGenerate.length === 0) {
    logInfo('  No enums need constant generation');
    return formattedConstants;
  }
  
  for (const enumInfo of enumsToGenerate) {
    const formatted = formatConstant(enumInfo);
    if (!formatted) {
      checklist.updateProgress(enumInfo.name, 'constantsGenerated', false, 'Formatting failed');
      continue;
    }
    
    formattedConstants.push(formatted);
    
    const writeResult = await writeGeneratedFile(
      formatted.filePath,
      formatted.content,
      [`Constants.public.Enums.${enumInfo.name}`],
      {
        dryRun: opts.dryRun,
        force: opts.force,
        verbose: opts.verbose,
        logger
      }
    );
    
    if (writeResult.success && writeResult.action !== 'skipped') {
      summary.constantsGenerated++;
      checklist.updateProgress(enumInfo.name, 'constantsGenerated', true);
    } else if (writeResult.action === 'skipped' && !writeResult.success) {
      checklist.updateProgress(enumInfo.name, 'constantsGenerated', false, writeResult.message);
    }
  }
  
  logSuccess(`  Generated ${summary.constantsGenerated} constant files`);
  return formattedConstants;
}

// ============================================================================
// PHASE 4: Generate Types
// ============================================================================

async function phase4GenerateTypes(
  enrichedTables: EnrichedTable[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary,
  checklist: ObjectCheckList
): Promise<FormattedType[]> {
  logInfo('Phase 4/9: Generating types...');
  
  const tablesToGenerate = enrichedTables.filter(t => t.shouldGenerateTypes);
  const formattedTypes: FormattedType[] = [];
  
  if (tablesToGenerate.length === 0) {
    logInfo('  No tables need type generation');
    return formattedTypes;
  }
  
  for (const table of tablesToGenerate) {
    const formatted = formatType(table);
    if (!formatted) {
      checklist.updateProgress(table.name, 'typesGenerated', false, 'Formatting failed');
      continue;
    }
    
    formattedTypes.push(formatted);
    
    const writeResult = await writeGeneratedFile(
      formatted.filePath,
      formatted.content,
      [`Database.public.Tables.${table.name}`],
      {
        dryRun: opts.dryRun,
        force: opts.force,
        verbose: opts.verbose,
        logger
      }
    );
    
    if (writeResult.success && writeResult.action !== 'skipped') {
      summary.typesGenerated++;
      checklist.updateProgress(table.name, 'typesGenerated', true);
    } else if (writeResult.action === 'skipped' && !writeResult.success) {
      checklist.updateProgress(table.name, 'typesGenerated', false, writeResult.message);
    }
  }
  
  logSuccess(`  Generated ${summary.typesGenerated} type files`);
  return formattedTypes;
}

// ============================================================================
// PHASE 5: Generate Validators
// ============================================================================

async function phase5GenerateValidators(
  enrichedTables: EnrichedTable[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary,
  checklist: ObjectCheckList
): Promise<FormattedValidator[]> {
  logInfo('Phase 5/9: Generating validators...');
  
  const tablesToValidate = enrichedTables.filter(t => t.shouldGenerateValidators);
  const formattedValidators: FormattedValidator[] = [];
  
  if (tablesToValidate.length === 0) {
    logInfo('  No tables need validators');
    return formattedValidators;
  }
  
  for (const table of tablesToValidate) {
    const formatted = formatValidator(table);
    if (!formatted) {
      continue;
    }
    
    formattedValidators.push(formatted);
    
    const writeResult = await writeGeneratedFile(
      formatted.filePath,
      formatted.content,
      [`Database.public.Tables.${table.name}`],
      {
        dryRun: opts.dryRun,
        force: opts.force,
        verbose: opts.verbose,
        logger
      }
    );
    
    if (writeResult.success && writeResult.action !== 'skipped') {
      summary.validatorsGenerated++;
    }
  }
  
  logSuccess(`  Generated ${summary.validatorsGenerated} validator files`);
  return formattedValidators;
}

// ============================================================================
// PHASE 6: Generate Utilities
// ============================================================================

async function phase6GenerateUtilities(
  enrichedTables: EnrichedTable[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary,
  checklist: ObjectCheckList
): Promise<FormattedUtility[]> {
  logInfo('Phase 6/9: Generating utilities...');
  
  const tablesWithUtils = enrichedTables.filter(t => t.shouldGenerateUtils);
  const formattedUtils: FormattedUtility[] = [];
  
  if (tablesWithUtils.length === 0) {
    logInfo('  No tables need utilities');
    return formattedUtils;
  }
  
  for (const table of tablesWithUtils) {
    const formatted = formatUtility(table);
    if (!formatted) {
      continue;
    }
    
    formattedUtils.push(formatted);
    
    const writeResult = await writeGeneratedFile(
      formatted.filePath,
      formatted.content,
      [`Database.public.Tables.${table.name}`],
      {
        dryRun: opts.dryRun,
        force: opts.force,
        verbose: opts.verbose,
        logger
      }
    );
    
    if (writeResult.success && writeResult.action !== 'skipped') {
      summary.utilsGenerated++;
    }
  }
  
  logSuccess(`  Generated ${summary.utilsGenerated} utility files`);
  return formattedUtils;
}

// ============================================================================
// PHASE 7: Generate API Routes
// ============================================================================

async function phase7GenerateApiRoutes(
  enrichedTables: EnrichedTable[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary,
  checklist: ObjectCheckList
): Promise<FormattedApiRoute[]> {
  logInfo('Phase 7/9: Generating API routes...');
  
  const tablesWithApi = enrichedTables.filter(t => t.shouldGenerateApiRoutes);
  const formattedApiRoutes: FormattedApiRoute[] = [];
  
  if (tablesWithApi.length === 0) {
    logInfo('  No tables need API routes');
    return formattedApiRoutes;
  }
  
  for (const table of tablesWithApi) {
    const routes = formatApiRoutes(table);
    for (const route of routes) {
      formattedApiRoutes.push(route);
      
      const writeResult = await writeGeneratedFile(
        route.filePath,
        route.content,
        [`Database.public.Tables.${table.name}`],
        {
          dryRun: opts.dryRun,
          force: opts.force,
          verbose: opts.verbose,
          logger
        }
      );
      
      if (writeResult.success && writeResult.action !== 'skipped') {
        summary.apiRoutesGenerated++;
      }
    }
  }
  
  logSuccess(`  Generated ${summary.apiRoutesGenerated} API route files`);
  return formattedApiRoutes;
}

// ============================================================================
// PHASE 8: Generate Hooks
// ============================================================================

async function phase8GenerateHooks(
  enrichedTables: EnrichedTable[],
  opts: Required<GaiaOptions>,
  logger: SystemLogger,
  summary: GenerationSummary,
  checklist: ObjectCheckList
): Promise<FormattedHook[]> {
  logInfo('Phase 8/9: Generating hooks...');
  
  const tablesWithHooks = enrichedTables.filter(t => t.shouldGenerateHooks);
  const formattedHooks: FormattedHook[] = [];
  
  if (tablesWithHooks.length === 0) {
    logInfo('  No tables need hooks');
    return formattedHooks;
  }
  
  for (const table of tablesWithHooks) {
    const hooks = formatHooks(table);
    for (const hook of hooks) {
      formattedHooks.push(hook);
      
      const writeResult = await writeGeneratedFile(
        hook.filePath,
        hook.content,
        [`Database.public.Tables.${table.name}`],
        {
          dryRun: opts.dryRun,
          force: opts.force,
          verbose: opts.verbose,
          logger
        }
      );
      
      if (writeResult.success && writeResult.action !== 'skipped') {
        summary.hooksGenerated++;
      }
    }
  }
  
  logSuccess(`  Generated ${summary.hooksGenerated} hook files`);
  return formattedHooks;
}

// ============================================================================
// PHASE 9: Update Registry and Maps
// ============================================================================

async function phase9UpdateRegistry(
  formattedConstants: FormattedConstant[],
  formattedTypes: FormattedType[],
  formattedValidators: FormattedValidator[],
  formattedUtils: FormattedUtility[],
  formattedApiRoutes: FormattedApiRoute[],
  formattedHooks: FormattedHook[],
  summary: GenerationSummary,
  opts: Required<GaiaOptions>,
  logger: SystemLogger
): Promise<void> {
  logInfo('Phase 9/9: Updating registry and dependency maps...');
  
  // Add each generated file to the logger
  for (const constant of formattedConstants) {
    logger.addGeneratedFile(constant.filePath);
  }
  for (const type of formattedTypes) {
    logger.addGeneratedFile(type.filePath);
  }
  for (const validator of formattedValidators) {
    logger.addGeneratedFile(validator.filePath);
  }
  for (const util of formattedUtils) {
    logger.addGeneratedFile(util.filePath);
  }
  for (const route of formattedApiRoutes) {
    logger.addGeneratedFile(route.filePath);
  }
  for (const hook of formattedHooks) {
    logger.addGeneratedFile(hook.filePath);
  }
  
  // Add efficiency record
  const totalFiles = summary.constantsGenerated + summary.typesGenerated + 
                     summary.validatorsGenerated + summary.utilsGenerated + 
                     summary.apiRoutesGenerated + summary.hooksGenerated;
  
  addRecord({
    id: logger.getCurrentRun()?.id || generateRunId(),
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
  
  // Analyze dependencies (optional, can be skipped for speed)
  if (!opts.dryRun && opts.verbose) {
    logInfo('  Analyzing dependencies...');
    try {
      const analyzeResult = await analyzeDependencies({
        paths: ['src/types/generated', 'src/lib/constants/generated', 'src/lib/validators/generated', 
                'src/lib/utils/generated', 'src/app/api/generated', 'src/hooks/generated'],
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
  const checklist = new ObjectCheckList({ verbose: opts.verbose });
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
  
  let formattedConstants: FormattedConstant[] = [];
  let formattedTypes: FormattedType[] = [];
  let formattedValidators: FormattedValidator[] = [];
  let formattedUtils: FormattedUtility[] = [];
  let formattedApiRoutes: FormattedApiRoute[] = [];
  let formattedHooks: FormattedHook[] = [];
  
  try {
    // Phase 1
    const { lines, completeMarkers, collections } = await phase1ReadDatabase(opts, logger);
    
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
    
    // Phase 1.5
    await phase1point5DiscoverDirectories(opts, logger);
    
    // Phase 2
    const { runtimeEnums, typeEnums, tables, views, functions } = await phase2ExtractObjects(
      lines, completeMarkers, opts, logger
    );
    
    // Phase 2.5
    const { enrichedEnums, enrichedTables } = phase2point5EnrichObjects(
      runtimeEnums, typeEnums, tables, views, functions, opts, checklist
    );
    
    // Phase 3
    formattedConstants = await phase3GenerateConstants(enrichedEnums, opts, logger, summary, checklist);
    
    // Phase 4
    formattedTypes = await phase4GenerateTypes(enrichedTables, opts, logger, summary, checklist);
    
    // Phase 5
    formattedValidators = await phase5GenerateValidators(enrichedTables, opts, logger, summary, checklist);
    
    // Phase 6
    formattedUtils = await phase6GenerateUtilities(enrichedTables, opts, logger, summary, checklist);
    
    // Phase 7
    formattedApiRoutes = await phase7GenerateApiRoutes(enrichedTables, opts, logger, summary, checklist);
    
    // Phase 8
    formattedHooks = await phase8GenerateHooks(enrichedTables, opts, logger, summary, checklist);
    
    // Phase 9
    await phase9UpdateRegistry(
      formattedConstants, formattedTypes, formattedValidators,
      formattedUtils, formattedApiRoutes, formattedHooks,
      summary, opts, logger
    );
    
  } catch (error) {
    logError(`GAIA generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    summary.errors.push(`Fatal error: ${error}`);
    logger.endRun('failed');
    return summary;
  }
  
  summary.endTime = new Date();
  logger.endRun(summary.errors.length === 0 ? 'success' : 'partial');
  
  checklist.printSummary();
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
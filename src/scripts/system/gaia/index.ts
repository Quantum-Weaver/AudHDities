// ============================================================================
// GAIA ORCHESTRATOR - Refined Type-First Generator
// ============================================================================
// Purpose: Orchestrate the complete generation pipeline
// Uses: Type-safe helpers, enrichment layer, modular generators
// ============================================================================

import * as fs from 'fs';
import * as readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

// Shared utilities
import { readDatabaseTypes } from '../../shared/file_reader.js';
import { logSuccess, logInfo, logError, logStep, logSeparator, logWarning, logDebug, logHeader } from '../../shared/logger.js';
import { SystemLogger } from '../../shared/system_logger.js';
import { intelligentPause } from '../../shared/pause.js';

// Core parsing
import { findMarkers } from '../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../modules/system/find_closing_braces.js';

// Extraction layer
import { extractAllNames } from './extract/extract_names.js';
import { extractRuntimeEnums } from './extract/extract_runtime_enums.js';
import { extractFunctions } from './extract/extract_functions.js';

// Enrichment layer
import { enrichAll, type EnrichedTable, type EnrichedView, type EnrichedFunction, type EnrichedRuntimeEnum, type EnrichedTypeEnum } from './enrich/enrich_objects.js';

// Generation layer
import { generateTableTypes, generateViewTypes, generateTypeEnumFile } from './generate/generate_types.js';
import { generateValidator } from './generate/generate_validators.js';
import { generateConstant } from './generate/generate_constants.js';
import { generateTableApiRoutes, generateViewApiRoutes, generateFunctionApiRoute } from './generate/generate_api_routes.js';
import { generateHooks } from './generate/generate_hooks.js';
import { generateUtils } from './generate/generate_utils.js';
// File writing
import { writeGeneratedFile, type WriteOptions } from './write_generated_file.js';

// Configuration
import { getAllTableNames, getAllViewNames, getFolderNameForTable, getFolderNameForView, DEITY_GROUPS } from '@/config/deity_groups.js';
import { ensureAllDirectories } from '../../modules/discover/discover_directories.js';
import type { PublicTableNames, PublicViewNames } from '@/types/supabase/database.helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// TYPES
// ============================================================================

interface GaiaOptions {
  dryRun: boolean;
  verbose: boolean;
  force: boolean;
  target: 'all' | 'deity' | 'table' | 'view' | 'function';
  targetValue: string | null;
  interactive: boolean;
}

interface GenerationPlan {
  tables: number;
  views: number;
  functions: number;
  runtimeEnums: number;
  typeEnums: number;
  
  typeFiles: number;
  validatorFiles: number;
  constantFiles: number;
  apiRouteFiles: number;
  hookFiles: number;
  utilFiles: number;
  
  totalFiles: number;
}

interface GenerationStats {
  tablesProcessed: number;
  viewsProcessed: number;
  functionsProcessed: number;
  runtimeEnumsProcessed: number;
  typeEnumsProcessed: number;
  
  filesWritten: string[];
  filesSkipped: string[];
  errors: Array<{ object: string; error: string }>;
  
  startTime: Date;
  endTime: Date;
}

// ============================================================================
// INTERACTIVE MODE
// ============================================================================

function askUser(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function getInteractiveOptions(): Promise<GaiaOptions> {
  console.log('\n');
  logSeparator('═', 60);
  logHeader('🌍 GAIA - Interactive Mode');
  logSeparator('═', 60);
  console.log('');
  
  console.log('What would you like to generate?');
  console.log('  1) Full schema (all tables, views, functions)');
  console.log('  2) Single table');
  console.log('  3) Single view');
  console.log('  4) Entire deity group');
  console.log('');
  
  const choice = await askUser('Enter choice (1-4): ');
  
  let target: GaiaOptions['target'] = 'all';
  let targetValue: string | null = null;
  
  if (choice === '2') {
    target = 'table';
    const allTables = getAllTableNames();
    console.log('\n📊 Available tables:');
    console.log(`  ${allTables.slice(0, 20).join(', ')}${allTables.length > 20 ? '...' : ''}`);
    console.log(`  (${allTables.length} total tables)`);
    console.log('');
    targetValue = await askUser('Enter table name: ');
    
    if (!allTables.includes(targetValue as PublicTableNames)) {
      logWarning(`Table "${targetValue}" not found in deity_groups.ts`);
      const confirm = await askUser('Continue anyway? (y/N): ');
      if (confirm.toLowerCase() !== 'y') {
        console.log('\n❌ Generation cancelled.');
        process.exit(0);
      }
    }
    
  } else if (choice === '3') {
    target = 'view';
    const allViews = getAllViewNames();
    console.log('\n📊 Available views:');
    console.log(`  ${allViews.join(', ')}`);
    console.log(`  (${allViews.length} total views)`);
    console.log('');
    targetValue = await askUser('Enter view name: ');
    
    if (!allViews.includes(targetValue as PublicViewNames)) {
      logWarning(`View "${targetValue}" not found`);
      const confirm = await askUser('Continue anyway? (y/N): ');
      if (confirm.toLowerCase() !== 'y') {
        console.log('\n❌ Generation cancelled.');
        process.exit(0);
      }
    }
    
  } else if (choice === '4') {
    target = 'deity';
    console.log('\n📊 Available deity groups:');
    DEITY_GROUPS.forEach((g, i) => {
      console.log(`  ${i + 1}) ${g.name} (${g.folderName})`);
      console.log(`     ${g.tables.length} tables, ${g.views?.length || 0} views`);
      console.log(`     ${g.description}`);
      console.log('');
    });
    const deityChoice = await askUser('Enter deity name or number: ');
    
    const num = parseInt(deityChoice);
    if (!isNaN(num) && num >= 1 && num <= DEITY_GROUPS.length) {
      targetValue = DEITY_GROUPS[num - 1].folderName;
    } else {
      targetValue = deityChoice;
    }
    
    const deityExists = DEITY_GROUPS.some(g => g.folderName === targetValue || g.name === targetValue);
    if (!deityExists) {
      logWarning(`Deity "${targetValue}" not found`);
      const confirm = await askUser('Continue anyway? (y/N): ');
      if (confirm.toLowerCase() !== 'y') {
        console.log('\n❌ Generation cancelled.');
        process.exit(0);
      }
    }
  }
  
  console.log('');
  const dryRunAnswer = await askUser('Dry run? (y/N): ');
  const dryRun = dryRunAnswer.toLowerCase() === 'y';
  
  const verboseAnswer = await askUser('Verbose output? (y/N): ');
  const verbose = verboseAnswer.toLowerCase() === 'y';
  
  const forceAnswer = await askUser('Force overwrite existing files? (y/N): ');
  const force = forceAnswer.toLowerCase() === 'y';
  
  return { dryRun, verbose, force, target, targetValue, interactive: true };
}

// ============================================================================
// CLI OPTIONS PARSING
// ============================================================================

function parseOptions(): GaiaOptions {
  const args = process.argv.slice(2);
  const interactive = args.includes('--interactive') || args.includes('-i');
  const force = args.includes('--force') || args.includes('-f');
  
  if (interactive) {
    return { dryRun: false, verbose: false, force, target: 'all', targetValue: null, interactive: true };
  }
  
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const verbose = args.includes('--verbose') || args.includes('-v');
  
  let target: GaiaOptions['target'] = 'all';
  let targetValue: string | null = null;
  
  const deityArg = args.find(a => a.startsWith('--deity='));
  if (deityArg) {
    target = 'deity';
    targetValue = deityArg.split('=')[1];
  }
  
  const tableArg = args.find(a => a.startsWith('--table='));
  if (tableArg) {
    target = 'table';
    targetValue = tableArg.split('=')[1];
  }
  
  const viewArg = args.find(a => a.startsWith('--view='));
  if (viewArg) {
    target = 'view';
    targetValue = viewArg.split('=')[1];
  }
  
  const functionArg = args.find(a => a.startsWith('--function='));
  if (functionArg) {
    target = 'function';
    targetValue = functionArg.split('=')[1];
  }
  
  return { dryRun, verbose, force, target, targetValue, interactive: false };
}

// ============================================================================
// FILTERING
// ============================================================================

interface FilteredObjects {
  tableNames: PublicTableNames[];
  viewNames: PublicViewNames[];
  functionNames: string[];
  typeEnumNames: string[];
  runtimeEnums: Array<{ name: string; values: string[] }>;
}

function filterObjects(
  allTables: PublicTableNames[],
  allViews: PublicViewNames[],
  allFunctions: string[],
  allTypeEnums: string[],
  allRuntimeEnums: Array<{ name: string; values: string[] }>,
  options: GaiaOptions
): FilteredObjects {
  const { target, targetValue } = options;
  
  if (target === 'all') {
    return {
      tableNames: allTables,
      viewNames: allViews,
      functionNames: allFunctions,
      typeEnumNames: allTypeEnums,
      runtimeEnums: allRuntimeEnums,
    };
  }
  
  if (target === 'deity' && targetValue) {
    const deityGroup = DEITY_GROUPS.find(
      g => g.folderName === targetValue || g.name === targetValue
    );
    
    if (!deityGroup) {
      logWarning(`Deity "${targetValue}" not found`);
      return { tableNames: [], viewNames: [], functionNames: [], typeEnumNames: [], runtimeEnums: [] };
    }
    
    return {
      tableNames: deityGroup.tables,
      viewNames: deityGroup.views || [],
      functionNames: allFunctions.filter(f => {
        for (const table of deityGroup.tables) {
          if (f.includes(table) || table.includes(f)) return true;
        }
        return false;
      }),
      typeEnumNames: allTypeEnums,
      runtimeEnums: allRuntimeEnums.filter(e => {
        const { getEnumFolder } = require('@/config/enum_mapping.js');
        return getEnumFolder(e.name) === deityGroup.folderName;
      }),
    };
  }
  
  if (target === 'table' && targetValue) {
    if (allTables.includes(targetValue as PublicTableNames)) {
      return {
        tableNames: [targetValue as PublicTableNames],
        viewNames: [],
        functionNames: [],
        typeEnumNames: [],
        runtimeEnums: [],
      };
    }
    logWarning(`Table "${targetValue}" not found`);
    return { tableNames: [], viewNames: [], functionNames: [], typeEnumNames: [], runtimeEnums: [] };
  }
  
  if (target === 'view' && targetValue) {
    if (allViews.includes(targetValue as PublicViewNames)) {
      return {
        tableNames: [],
        viewNames: [targetValue as PublicViewNames],
        functionNames: [],
        typeEnumNames: [],
        runtimeEnums: [],
      };
    }
    logWarning(`View "${targetValue}" not found`);
    return { tableNames: [], viewNames: [], functionNames: [], typeEnumNames: [], runtimeEnums: [] };
  }
  
  if (target === 'function' && targetValue) {
    if (allFunctions.includes(targetValue)) {
      return {
        tableNames: [],
        viewNames: [],
        functionNames: [targetValue],
        typeEnumNames: [],
        runtimeEnums: [],
      };
    }
    logWarning(`Function "${targetValue}" not found`);
    return { tableNames: [], viewNames: [], functionNames: [], typeEnumNames: [], runtimeEnums: [] };
  }
  
  return { tableNames: [], viewNames: [], functionNames: [], typeEnumNames: [], runtimeEnums: [] };
}

// ============================================================================
// GENERATION PLAN CALCULATION
// ============================================================================

function calculateGenerationPlan(
  tables: EnrichedTable[],
  views: EnrichedView[],
  functions: EnrichedFunction[],
  runtimeEnums: EnrichedRuntimeEnum[],
  typeEnums: EnrichedTypeEnum[]
): GenerationPlan {
  let typeFiles = 0;
  let validatorFiles = 0;
  let constantFiles = 0;
  let apiRouteFiles = 0;
  let hookFiles = 0;
  let utilFiles = 0;
  
  // Tables
  for (const table of tables) {
    if (table.shouldGenerateTypes) typeFiles++;
    if (table.shouldGenerateValidators) validatorFiles++;
    if (table.shouldGenerateApiRoutes) apiRouteFiles += 2; // list + single
    if (table.shouldGenerateHooks) hookFiles++;
    if (table.shouldGenerateUtils) utilFiles++;
  }
  
  // Views
  for (const view of views) {
    if (view.shouldGenerateTypes) typeFiles++;
    if (view.shouldGenerateViewApiRoutes) apiRouteFiles += 2;
  }
  
  // Functions
  for (const fn of functions) {
    if (fn.shouldGenerateApiRoutes) apiRouteFiles += 1;
  }
  
  // Runtime Enums
  for (const enum_ of runtimeEnums) {
    if (enum_.shouldGenerateConstants) constantFiles++;
  }
  
  // Type Enums
  typeFiles += typeEnums.length;
  
  const totalFiles = typeFiles + validatorFiles + constantFiles + apiRouteFiles + hookFiles + utilFiles;
  
  return {
    tables: tables.length,
    views: views.length,
    functions: functions.length,
    runtimeEnums: runtimeEnums.length,
    typeEnums: typeEnums.length,
    typeFiles,
    validatorFiles,
    constantFiles,
    apiRouteFiles,
    hookFiles,
    utilFiles,
    totalFiles,
  };
}

// ============================================================================
// GENERATION PLAN DISPLAY
// ============================================================================

async function showGenerationPlan(
  plan: GenerationPlan,
  options: GaiaOptions
): Promise<boolean> {
  console.log('\n');
  logSeparator('═', 60);
  logHeader('📋 GENERATION PLAN');
  logSeparator('═', 60);
  console.log('');
  
  logInfo(`📊 OBJECTS TO PROCESS:`);
  console.log(`     Tables:       ${plan.tables}`);
  console.log(`     Views:        ${plan.views}`);
  console.log(`     Functions:    ${plan.functions}`);
  console.log(`     Runtime Enums: ${plan.runtimeEnums}`);
  console.log(`     Type Enums:   ${plan.typeEnums}`);
  console.log('');
  
  logInfo(`📁 FILES TO GENERATE:`);
  console.log(`     Type files:      ${plan.typeFiles}`);
  console.log(`     Validator files: ${plan.validatorFiles}`);
  console.log(`     Constant files:  ${plan.constantFiles}`);
  console.log(`     API route files: ${plan.apiRouteFiles}`);
  console.log(`     Hook files:      ${plan.hookFiles}`);
  console.log(`     Util files:      ${plan.utilFiles}`);
  console.log(`     ────────────────────────────`);
  console.log(`     TOTAL FILES:     ${plan.totalFiles}`);
  console.log('');
  
  if (options.dryRun) {
    logWarning('DRY RUN MODE - No files will be written');
    console.log('');
  }
  
  logSeparator('─', 40);
  console.log('');
  console.log('Options:');
  console.log(`  [c] Continue - proceed with generation`);
  console.log(`  [n] Cancel - exit without generating`);
  console.log(`  [o] Cancel with notes - save notes and exit`);
  console.log('');
  
  const response = await askUser('Choose (c/n/o): ');
  
  if (response.toLowerCase() === 'c') return true;
  
  if (response.toLowerCase() === 'o') {
    console.log('\n📝 Enter your notes (press Enter twice to finish):');
    const notes: string[] = [];
    while (true) {
      const line = await askUser('');
      if (line === '') break;
      notes.push(line);
    }
    if (notes.length > 0) {
      const notesPath = `./gaia-notes-${Date.now()}.txt`;
      fs.writeFileSync(notesPath, notes.join('\n'));
      logInfo(`Notes saved to: ${notesPath}`);
    }
  }
  
  console.log('\n❌ Generation cancelled.');
  process.exit(0);
}

// ============================================================================
// ARTIFACT GENERATION
// ============================================================================

// In index.ts - This is the correct, aligned version

async function generateTableArtifacts(
  table: EnrichedTable,
  writeOptions: WriteOptions,
  stats: GenerationStats,
  logger: SystemLogger,
  lines: string[],
  markersWithBraces: any
): Promise<void> {
  const { name: tableName, deityFolder } = table;
  
  if (writeOptions.verbose) {
    logDebug(`\n  📦 Table: ${tableName} -> ${deityFolder}`);
  }
  
  // ====================================================
  // TYPES
  // ====================================================
if (table.shouldGenerateTypes) {
  try {
    // ✅ CHANGE THIS LINE - pass lines and markers
    const result = generateTableTypes(table, lines, markersWithBraces);
    const writeResult = await writeGeneratedFile(
      result.filePath,
      result.content,
      [`EnrichedTable:${tableName}`],
      writeOptions
    );
    
    if (writeResult.success && writeResult.action !== 'skipped') {
      stats.filesWritten.push(writeResult.filePath);
      logger.addGeneratedFile(writeResult.filePath);
      if (writeOptions.verbose) logSuccess(`      ✓ types: ${result.filePath}`);
    } else if (writeResult.action === 'skipped') {
      stats.filesSkipped.push(writeResult.filePath);
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    stats.errors.push({ object: tableName, error: `types: ${msg}` });
    logError(`      ✗ types: ${msg}`);
  }
}
  
  // ====================================================
  // VALIDATORS
  // ====================================================
  if (table.shouldGenerateValidators) {
    try {
      const result = await generateValidator(table);  // ✅ ADD await
      if (result) {
        const writeResult = await writeGeneratedFile(
          result.filePath,
          result.content,
          [`EnrichedTable:${tableName}`],
          writeOptions
        );
        
        if (writeResult.success && writeResult.action !== 'skipped') {
          stats.filesWritten.push(writeResult.filePath);
          logger.addGeneratedFile(writeResult.filePath);
          if (writeOptions.verbose) logSuccess(`      ✓ validator: ${result.filePath}`);
        } else if (writeResult.action === 'skipped') {
          stats.filesSkipped.push(writeResult.filePath);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      stats.errors.push({ object: tableName, error: `validator: ${msg}` });
      logError(`      ✗ validator: ${msg}`);
    }
  }
  
  // ====================================================
  // API ROUTES
  // ====================================================
  if (table.shouldGenerateApiRoutes) {
    try {
      const routes = generateTableApiRoutes(table);
      for (const route of routes) {
        const writeResult = await writeGeneratedFile(
          route.filePath,
          route.content,
          [`EnrichedTable:${tableName}`],
          writeOptions
        );
        
        if (writeResult.success && writeResult.action !== 'skipped') {
          stats.filesWritten.push(writeResult.filePath);
          logger.addGeneratedFile(writeResult.filePath);
          if (writeOptions.verbose) logSuccess(`      ✓ api: ${route.filePath}`);
        } else if (writeResult.action === 'skipped') {
          stats.filesSkipped.push(writeResult.filePath);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      stats.errors.push({ object: tableName, error: `api: ${msg}` });
      logError(`      ✗ api: ${msg}`);
    }
  }
  
  // ====================================================
  // HOOKS
  // ====================================================
  if (table.shouldGenerateHooks) {
    try {
      const result = generateHooks(table);
      if (result) {
        const writeResult = await writeGeneratedFile(
          result.filePath,
          result.content,
          [`EnrichedTable:${tableName}`],
          writeOptions
        );
        
        if (writeResult.success && writeResult.action !== 'skipped') {
          stats.filesWritten.push(writeResult.filePath);
          logger.addGeneratedFile(writeResult.filePath);
          if (writeOptions.verbose) logSuccess(`      ✓ hooks: ${result.filePath}`);
        } else if (writeResult.action === 'skipped') {
          stats.filesSkipped.push(writeResult.filePath);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      stats.errors.push({ object: tableName, error: `hooks: ${msg}` });
      logError(`      ✗ hooks: ${msg}`);
    }
  }
  
  // ====================================================
  // UTILS
  // ====================================================
  if (table.shouldGenerateUtils) {
    try {
      const result = generateUtils(table);
      if (result) {
        const writeResult = await writeGeneratedFile(
          result.filePath,
          result.content,
          [`EnrichedTable:${tableName}`],
          writeOptions
        );
        
        if (writeResult.success && writeResult.action !== 'skipped') {
          stats.filesWritten.push(writeResult.filePath);
          logger.addGeneratedFile(writeResult.filePath);
          if (writeOptions.verbose) logSuccess(`      ✓ utils: ${result.filePath}`);
        } else if (writeResult.action === 'skipped') {
          stats.filesSkipped.push(writeResult.filePath);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      stats.errors.push({ object: tableName, error: `utils: ${msg}` });
      logError(`      ✗ utils: ${msg}`);
    }
  }
  
  stats.tablesProcessed++;
}

async function generateViewArtifacts(
  view: EnrichedView,
  writeOptions: WriteOptions,
  stats: GenerationStats,
  logger: SystemLogger
): Promise<void> {
  const { name: viewName, deityFolder } = view;
  
  if (writeOptions.verbose) {
    logDebug(`\n  👁️  View: ${viewName} -> ${deityFolder}`);
  }
  
  // Types
  if (view.shouldGenerateTypes) {
    try {
      const result = generateViewTypes(view);
      const writeResult = await writeGeneratedFile(
        result.filePath,
        result.content,
        [`EnrichedView:${viewName}`],
        writeOptions
      );
      
      if (writeResult.success && writeResult.action !== 'skipped') {
        stats.filesWritten.push(writeResult.filePath);
        logger.addGeneratedFile(writeResult.filePath);
        if (writeOptions.verbose) logSuccess(`      ✓ types: ${result.filePath}`);
      } else if (writeResult.action === 'skipped') {
        stats.filesSkipped.push(writeResult.filePath);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      stats.errors.push({ object: viewName, error: `types: ${msg}` });
      logError(`      ✗ types: ${msg}`);
    }
  }
  
  // API Routes
  if (view.shouldGenerateViewApiRoutes) {
    try {
      const routes = generateViewApiRoutes(view);
      for (const route of routes) {
        const writeResult = await writeGeneratedFile(
          route.filePath,
          route.content,
          [`EnrichedView:${viewName}`],
          writeOptions
        );
        
        if (writeResult.success && writeResult.action !== 'skipped') {
          stats.filesWritten.push(writeResult.filePath);
          logger.addGeneratedFile(writeResult.filePath);
          if (writeOptions.verbose) logSuccess(`      ✓ api: ${route.filePath}`);
        } else if (writeResult.action === 'skipped') {
          stats.filesSkipped.push(writeResult.filePath);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      stats.errors.push({ object: viewName, error: `api: ${msg}` });
      logError(`      ✗ api: ${msg}`);
    }
  }
  
  stats.viewsProcessed++;
}

async function generateFunctionArtifacts(
  fn: EnrichedFunction,
  writeOptions: WriteOptions,
  stats: GenerationStats,
  logger: SystemLogger
): Promise<void> {
  const { name: functionName, deityFolder } = fn;
  
  if (writeOptions.verbose) {
    logDebug(`\n  ⚡ Function: ${functionName} -> ${deityFolder}`);
  }
  
  // API Route
  if (fn.shouldGenerateApiRoutes) {
    try {
      const route = generateFunctionApiRoute(fn);
      if (route) {
        const writeResult = await writeGeneratedFile(
          route.filePath,
          route.content,
          [`EnrichedFunction:${functionName}`],
          writeOptions
        );
        
        if (writeResult.success && writeResult.action !== 'skipped') {
          stats.filesWritten.push(writeResult.filePath);
          logger.addGeneratedFile(writeResult.filePath);
          if (writeOptions.verbose) logSuccess(`      ✓ api: ${route.filePath}`);
        } else if (writeResult.action === 'skipped') {
          stats.filesSkipped.push(writeResult.filePath);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      stats.errors.push({ object: functionName, error: `api: ${msg}` });
      logError(`      ✗ api: ${msg}`);
    }
  }
  
  stats.functionsProcessed++;
}

async function generateRuntimeEnumArtifacts(
  enum_: EnrichedRuntimeEnum,
  writeOptions: WriteOptions,
  stats: GenerationStats,
  logger: SystemLogger
): Promise<void> {
  const { name: enumName, deityFolder, values } = enum_;
  
  if (writeOptions.verbose) {
    logDebug(`\n  🔢 Runtime Enum: ${enumName} -> ${deityFolder}`);
  }
  
  if (enum_.shouldGenerateConstants) {
    try {
      const result = generateConstant(
        { name: enumName, values, content: '', startLine: 0, endLine: 0, type: 'runtime_enum' },
        deityFolder
      );
      
      if (result) {
        const writeResult = await writeGeneratedFile(
          result.filePath,
          result.content,
          [`RuntimeEnum:${enumName}`],
          writeOptions
        );
        
        if (writeResult.success && writeResult.action !== 'skipped') {
          stats.filesWritten.push(writeResult.filePath);
          logger.addGeneratedFile(writeResult.filePath);
          if (writeOptions.verbose) logSuccess(`      ✓ constants: ${result.filePath}`);
        } else if (writeResult.action === 'skipped') {
          stats.filesSkipped.push(writeResult.filePath);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      stats.errors.push({ object: enumName, error: `constants: ${msg}` });
      logError(`      ✗ constants: ${msg}`);
    }
  }
  
  stats.runtimeEnumsProcessed++;
}

async function generateTypeEnumArtifacts(
  enum_: EnrichedTypeEnum,
  writeOptions: WriteOptions,
  stats: GenerationStats,
  logger: SystemLogger
): Promise<void> {
  const { name: enumName, deityFolder } = enum_;
  
  if (writeOptions.verbose) {
    logDebug(`\n  📝 Type Enum: ${enumName} -> ${deityFolder}`);
  }
  
  try {
    const result = generateTypeEnumFile(enum_);
    const writeResult = await writeGeneratedFile(
      result.filePath,
      result.content,
      [`TypeEnum:${enumName}`],
      writeOptions
    );
    
    if (writeResult.success && writeResult.action !== 'skipped') {
      stats.filesWritten.push(writeResult.filePath);
      logger.addGeneratedFile(writeResult.filePath);
      if (writeOptions.verbose) logSuccess(`      ✓ types: ${result.filePath}`);
    } else if (writeResult.action === 'skipped') {
      stats.filesSkipped.push(writeResult.filePath);
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    stats.errors.push({ object: enumName, error: `types: ${msg}` });
    logError(`      ✗ types: ${msg}`);
  }
  
  stats.typeEnumsProcessed++;
}

// ============================================================================
// SUMMARY DISPLAY
// ============================================================================

function displaySummary(stats: GenerationStats, dryRun: boolean): void {
  console.log('\n');
  logSeparator('═', 60);
  logHeader('📊 GENERATION SUMMARY');
  logSeparator('═', 60);
  console.log('');
  
  const duration = stats.endTime.getTime() - stats.startTime.getTime();
  
  console.log(`  Objects Processed:`);
  console.log(`    Tables:       ${stats.tablesProcessed}`);
  console.log(`    Views:        ${stats.viewsProcessed}`);
  console.log(`    Functions:    ${stats.functionsProcessed}`);
  console.log(`    Runtime Enums: ${stats.runtimeEnumsProcessed}`);
  console.log(`    Type Enums:   ${stats.typeEnumsProcessed}`);
  console.log('');
  
  console.log(`  Files:`);
  console.log(`    Written:  ${stats.filesWritten.length}`);
  console.log(`    Skipped:  ${stats.filesSkipped.length}`);
  console.log(`    Errors:   ${stats.errors.length}`);
  console.log('');
  
  console.log(`  Duration: ${(duration / 1000).toFixed(2)} seconds`);
  
  if (dryRun) {
    console.log('');
    logWarning('  DRY RUN - No files were actually written');
  }
  
  if (stats.errors.length > 0) {
    console.log('');
    logError('  Errors encountered:');
    for (const err of stats.errors.slice(0, 10)) {
      console.log(`    - ${err.object}: ${err.error}`);
    }
    if (stats.errors.length > 10) {
      console.log(`    ... and ${stats.errors.length - 10} more`);
    }
  }
  
  console.log('');
  logSeparator('═', 60);
}

// ============================================================================
// MAIN ORCHESTRATOR
// ============================================================================

async function runGaia(options: GaiaOptions): Promise<GenerationStats> {
  const { dryRun, verbose, force, target, targetValue } = options;
  
  // Initialize
  const logger = new SystemLogger('GAIA');
  logger.startRun();
  
  const stats: GenerationStats = {
    tablesProcessed: 0,
    viewsProcessed: 0,
    functionsProcessed: 0,
    runtimeEnumsProcessed: 0,
    typeEnumsProcessed: 0,
    filesWritten: [],
    filesSkipped: [],
    errors: [],
    startTime: new Date(),
    endTime: new Date(),
  };
  
  const writeOptions: WriteOptions = { dryRun, force, verbose, logger };
  
  // Banner
  logSeparator('═', 60);
  logHeader('🌍 GAIA - Type-First Generator');
  logSeparator('═', 60);
  logInfo(`Mode: ${dryRun ? 'DRY RUN (preview only)' : 'WRITE MODE'}`);
  if (target === 'deity') logInfo(`Target: deity = ${targetValue}`);
  if (target === 'table') logInfo(`Target: table = ${targetValue}`);
  if (target === 'view') logInfo(`Target: view = ${targetValue}`);
  if (target === 'function') logInfo(`Target: function = ${targetValue}`);
  if (target === 'all') logInfo(`Target: ALL objects`);
  logSeparator('═', 60);
  console.log('');
  
  // ===== PHASE 1: DISCOVERY =====
  logStep('📖 Phase 1: Discovery');
  
  const { content, success } = readDatabaseTypes();
  if (!success) throw new Error('Failed to read database.types.ts');
  
  const lines = content.split('\n');
  logSuccess(`Read ${lines.length} lines`);
  
  const markers = findMarkers(lines, { verbose });
  const markersWithBraces = findAllClosingBraces(lines, markers, { verbose });
  
  const names = extractAllNames(lines, markersWithBraces, { verbose });
  logSuccess(`Found: ${names.tables.length} tables, ${names.views.length} views, ${names.functions.length} functions, ${names.typeEnums.length} type enums`);
  
  const runtimeEnums = await extractRuntimeEnums(
    lines,
    markersWithBraces.constantsEnumsLine,
    markersWithBraces.constantsEnumsEndLine,
    { verbose }
  );
  logSuccess(`Found ${runtimeEnums.length} runtime enums`);
  
  const functions = await extractFunctions(
    lines,
    markersWithBraces.functionsLine,
    markersWithBraces.functionsEndLine,
    { verbose }
  );
  
  // ===== PHASE 2: FILTER =====
  logStep('\n🎯 Phase 2: Filtering');
  
  const filtered = filterObjects(
    names.tables as PublicTableNames[],
    names.views as PublicViewNames[],
    names.functions,
    names.typeEnums,
    runtimeEnums.map(e => ({ name: e.name, values: e.values })),
    options
  );
  
  logInfo(`After filtering: ${filtered.tableNames.length} tables, ${filtered.viewNames.length} views, ${filtered.functionNames.length} functions`);
  
  if (filtered.tableNames.length === 0 && filtered.viewNames.length === 0 && filtered.functionNames.length === 0) {
    logWarning('No objects to process');
    logger.endRun('success');
    return stats;
  }
  
  // ===== PHASE 3: ENRICH =====
  logStep('\n⚙️  Phase 3: Enrichment');
  
  const enriched = await enrichAll(
    filtered.tableNames,
    filtered.viewNames,
    filtered.functionNames,
    filtered.runtimeEnums,
    filtered.typeEnumNames as any,
    { verbose }
  );
  
  logSuccess(`Enriched: ${enriched.tables.length} tables, ${enriched.views.length} views, ${enriched.functions.length} functions`);
  
  // ===== PHASE 4: PLAN =====
  logStep('\n📋 Phase 4: Generation Plan');
  
  const plan = calculateGenerationPlan(
    enriched.tables,
    enriched.views,
    enriched.functions,
    enriched.runtimeEnums,
    enriched.typeEnums
  );
  
  const shouldProceed = await showGenerationPlan(plan, options);
  if (!shouldProceed) {
    logger.endRun('success');
    return stats;
  }
  
  // ===== PHASE 5: DIRECTORIES =====
  logStep('\n📁 Phase 5: Directory Setup');
  
  if (!dryRun) {
    ensureAllDirectories({ verbose });
    logSuccess('Directories ensured');
  } else {
    logInfo('[DRY RUN] Would ensure directories');
  }
  
  // ===== PHASE 6: GENERATION =====
  logStep('\n🚀 Phase 6: Generation');
  logSeparator('─', 40);
  
  // Tables
  for (const table of enriched.tables) {
    await generateTableArtifacts(table, writeOptions, stats, logger, lines, markersWithBraces);
  }
  
  // Views
  for (const view of enriched.views) {
    await generateViewArtifacts(view, writeOptions, stats, logger);
  }
  
  // Functions
  for (const fn of enriched.functions) {
    await generateFunctionArtifacts(fn, writeOptions, stats, logger);
  }
  
  // Runtime Enums
  for (const enum_ of enriched.runtimeEnums) {
    await generateRuntimeEnumArtifacts(enum_, writeOptions, stats, logger);
  }
  
  // Type Enums
  for (const enum_ of enriched.typeEnums) {
    await generateTypeEnumArtifacts(enum_, writeOptions, stats, logger);
  }
  
  // ===== PHASE 7: SUMMARY =====
  stats.endTime = new Date();
  
  const runStatus = stats.errors.length === 0 ? 'success' : 'partial';
  logger.endRun(runStatus);
  
  displaySummary(stats, dryRun);
  
  return stats;
}

// ============================================================================
// MAIN ENTRY
// ============================================================================

async function main() {
  let options: GaiaOptions;
  
  // Check if interactive mode is requested via CLI
  const args = process.argv.slice(2);
  const interactiveFlag = args.includes('--interactive') || args.includes('-i');
  
  if (interactiveFlag || args.length === 0) {
    // ALWAYS show interactive prompt if no arguments or --interactive
    options = await getInteractiveOptions();
  } else {
    // Parse CLI options only if arguments provided and not interactive
    options = parseOptions();
  }
  
  try {
    await runGaia(options);
  } catch (error) {
    logError(`GAIA failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

main().catch(console.error);

export { runGaia, type GaiaOptions, type GenerationStats };
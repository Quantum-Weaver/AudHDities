// src/scripts/system/gaia/index.ts
// ============================================================================
// GAIA - DATABASE TYPE GENERATOR
// ============================================================================
// Purpose: Orchestrate the generation of all TypeScript artifacts from database.types.ts
// 
// Architecture:
//   1. READ → file_reader.ts, find_markers.ts
//   2. EXTRACT → extract_runtime_enums.ts (only runtime enums needed now)
//   3. ENRICH → deity_groups.ts, object_categories.ts, enum_mapping.ts
//   4. FORMAT → format_constants.ts, format_types.ts, format_validators.ts, 
//               format_utils.ts, format_api_routes.ts, format_hooks.ts
//   5. WRITE → writeGeneratedFile.ts
//   6. REGISTER → system_registry.ts, dependency_map.ts
//
// Usage: 
//   npm run gaia                     # Dry run (preview only)
//   npm run gaia -- --write          # Write files (no force)
//   npm run gaia -- --write --force  # Force overwrite
//   npm run gaia -- --scope=table:profiles  # Single table
//   npm run gaia -- --scope=deity:hestia    # All tables in Hestia
//   npm run gaia -- --scope=type:full_crud  # All full_crud tables
//   npm run gaia -- --verbose        # Verbose output
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ============================================================================
// PATHS
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// ============================================================================
// PHASE 1: READ (Shared utilities)
// ============================================================================

import { readDatabaseTypes, type FileReadResult } from '../../shared/file_reader.js';
import { findMarkers } from '../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../modules/system/find_closing_braces.js';
import { type CollectionInfo, MarkerResult } from '../../shared/types.js';
import { countItemsInCollection } from '../../modules/system/count_items.js';
import { logHeader, logSuccess, logError, logInfo, logWarning, logDebug, logSeparator, logStep } from '../../shared/logger.js';

// ============================================================================
// PHASE 2: EXTRACT (Runtime enums only — tables/views/type enums use Tables helper)
// ============================================================================

import { extractRuntimeEnums, type RuntimeEnumInfo } from './extract_runtime_enums.js';

// ============================================================================
// PHASE 3: ENRICH (Configuration)
// ============================================================================
import type { enrichRuntimeEnum } from './enrich_runtime_enums.js';
import { DEITY_GROUPS, getFolderNameForTable, type DeityGroup } from '@/config/deity_groups.js';
import { 
  getTableHandlingLevel, 
  getObjectCategory, 
  needsTypeGeneration,
  needsValidators,
  needsUtils,
  needsApiRoutes,
  needsHooks,
  needsConstantGeneration,
  type ObjectCategory,
  type HandlingLevel
} from '@/config/object_categories.js';
import { getEnumFolder, ENUM_MAPPING, type EnumMappingEntry } from '@/config/enum_mapping.js';
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';

// ============================================================================
// PHASE 4: FORMAT (Generators)
// ============================================================================

import { formatConstants, type FormattedConstant } from './format_constants.js';
import { formatTypes, type FormattedType } from './format_types.js';
import { formatValidators, type FormattedValidator } from './format_validators.js';
import { formatUtils, type FormattedUtility } from './format_utils.js';
import { formatApiRoutes, type FormattedApiRoute } from './format_api_routes.js';
import { formatHooks, type FormattedHook } from './format_hooks.js';

// ============================================================================
// PHASE 5: WRITE
// ============================================================================

import { writeGeneratedFile, type WriteOptions, type WriteResult } from './writeGeneratedFile.js';

// ============================================================================
// PHASE 6: REGISTRATION & MAINTENANCE
// ============================================================================

import { SystemLogger, type RunRecord } from '../../shared/system_logger.js';
import { saveDependencyMap, loadDependencyMap, addEdge, upsertNode, type DependencyMap, type DependencyNode } from '@/config/dependency_map.js';
import { addRecord, updateResourceProfile } from '@/config/efficiency_records.js';

// ============================================================================
// PHASE 7: USER INTERACTION
// ============================================================================

import { pauseForReview, intelligentPause, isAutomatedEnvironment, type PauseResult } from '../../shared/pause.js';
import { TableInfo } from '../../../../.temp/helpers/archive/extract_tables.js';
import { enrichSimpleTables } from './enrich_objects.js';

// ============================================================================
// TYPES
// ============================================================================

export type ScopeType = 'table' | 'deity' | 'type';
export type HandlingFilter = 'full_crud' | 'assessment' | 'join_table' | 'read_only_view' | 'all';

export interface GaiaOptions {
  dryRun: boolean;           // --dry-run (default: true)
  write: boolean;            // --write (overrides dryRun)
  force: boolean;            // --force (overwrite existing files)
  verbose: boolean;          // --verbose
  scope: ScopeType | null;   // --scope=table:profiles
  scopeValue: string | null; // Value after colon
  handlingFilter: HandlingFilter | null; // --filter=full_crud
  singleTable: string | null; // --table=profiles (legacy)
  singleDeity: string | null; // --deity=hestia (legacy)
  skipPauses: boolean;       // --skip-pauses (for CI)
  maxTables: number;         // --max=10 (limit for testing)
}

export interface EnrichedTable {
  name: string;
  deityFolder: string;
  deityGroup: DeityGroup | undefined;
  handlingLevel: HandlingLevel;
  category: ObjectCategory;
  // Generation flags
  shouldGenerateTypes: boolean;
  shouldGenerateValidators: boolean;
  shouldGenerateUtils: boolean;
  shouldGenerateApiRoutes: boolean;
  shouldGenerateHooks: boolean;
  // Row content (from Tables helper, not parsed)
  hasRow: boolean;
}

export interface EnrichedRuntimeEnum {
  name: string;
  values: string[];
  deityFolder: string;
  shouldGenerateConstants: boolean;
}

export interface GaiaResult {
  success: boolean;
  tablesProcessed: number;
  enumsProcessed: number;
  filesGenerated: number;
  filesSkipped: number;
  filesOverwritten: number;
  errors: string[];
  warnings: string[];
  durationMs: number;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Parse command line arguments into GaiaOptions
 */
function parseOptions(): GaiaOptions {
  const args = process.argv.slice(2);
  
  const hasWrite = args.includes('--write');
  const hasDryRun = args.includes('--dry-run');
  const force = args.includes('--force');
  const verbose = args.includes('--verbose');
  const skipPauses = args.includes('--skip-pauses');
  
  // Parse --scope=table:profiles
  let scope: ScopeType | null = null;
  let scopeValue: string | null = null;
  const scopeArg = args.find(a => a.startsWith('--scope='));
  if (scopeArg) {
    const [, value] = scopeArg.split('=');
    const [scopeType, scopeVal] = value.split(':');
    if (scopeType === 'table' || scopeType === 'deity' || scopeType === 'type') {
      scope = scopeType;
      scopeValue = scopeVal;
    }
  }
  
  // Legacy single table
  let singleTable: string | null = null;
  const tableArg = args.find(a => a.startsWith('--table='));
  if (tableArg) {
    singleTable = tableArg.split('=')[1];
  }
  
  // Legacy single deity
  let singleDeity: string | null = null;
  const deityArg = args.find(a => a.startsWith('--deity='));
  if (deityArg) {
    singleDeity = deityArg.split('=')[1];
  }
  
  // Parse --filter=full_crud
  let handlingFilter: HandlingFilter | null = null;
  const filterArg = args.find(a => a.startsWith('--filter='));
  if (filterArg) {
    const filter = filterArg.split('=')[1];
    if (filter === 'full_crud' || filter === 'assessment' || filter === 'join_table' || 
        filter === 'read_only_view' || filter === 'all') {
      handlingFilter = filter;
    }
  }
  
  // Parse --max=10
  let maxTables = 0;
  const maxArg = args.find(a => a.startsWith('--max='));
  if (maxArg) {
    maxTables = parseInt(maxArg.split('=')[1], 10);
  }
  
  // Dry run is default true unless --write is present
  const dryRun = hasWrite ? false : !hasDryRun;
  
  return {
    dryRun,
    write: hasWrite,
    force,
    verbose,
    scope,
    scopeValue,
    handlingFilter,
    singleTable,
    singleDeity,
    skipPauses,
    maxTables
  };
}

/**
 * Get all table names from deity_groups.ts (source of truth)
 */
function getAllTableNamesFromDeityGroups(): string[] {
  const tables: string[] = [];
  for (const group of DEITY_GROUPS) {
    tables.push(...group.tables);
  }
  return tables;
}

/**
 * Filter tables based on scope and options
 */
function filterTables(
  allTables: string[],
  options: GaiaOptions
): string[] {
  let filtered = [...allTables];
  
  // Scope: single table
  if (options.scope === 'table' && options.scopeValue) {
    filtered = filtered.filter(t => t === options.scopeValue);
  }
  // Scope: single deity
  else if (options.scope === 'deity' && options.scopeValue) {
    const deityGroup = DEITY_GROUPS.find(g => g.folderName === options.scopeValue || g.name === options.scopeValue);
    if (deityGroup) {
      filtered = filtered.filter(t => deityGroup.tables.includes(t));
    }
  }
  // Legacy single table
  else if (options.singleTable) {
    filtered = filtered.filter(t => t === options.singleTable);
  }
  // Legacy single deity
  else if (options.singleDeity) {
    const deityGroup = DEITY_GROUPS.find(g => g.folderName === options.singleDeity || g.name === options.singleDeity);
    if (deityGroup) {
      filtered = filtered.filter(t => deityGroup.tables.includes(t));
    }
  }
  
  // Filter by handling level
  if (options.handlingFilter && options.handlingFilter !== 'all') {
    filtered = filtered.filter(t => {
      const level = getTableHandlingLevel(t);
      return level === options.handlingFilter;
    });
  }
  
  // Limit for testing
  if (options.maxTables > 0) {
    filtered = filtered.slice(0, options.maxTables);
  }
  
  return filtered;
}

/**
 * Enrich a table with configuration
 */
function enrichTable(tableName: string): EnrichedTable {
  const deityFolder = getFolderNameForTable(tableName) || 'hestia-core';
  const deityGroup = DEITY_GROUPS.find(g => g.folderName === deityFolder);
  const handlingLevel = getTableHandlingLevel(tableName);
  const category = getObjectCategory('table', tableName);
  
  return {
    name: tableName,
    deityFolder,
    deityGroup,
    handlingLevel,
    category,
    shouldGenerateTypes: needsTypeGeneration(tableName),
    shouldGenerateValidators: needsValidators(tableName),
    shouldGenerateUtils: needsUtils(tableName),
    shouldGenerateApiRoutes: needsApiRoutes(tableName),
    shouldGenerateHooks: needsHooks(tableName),
    hasRow: true  // All tables have Row type via Tables helper
  };
}

/**
 * Enrich runtime enums (from extract_runtime_enums.ts)
 */
function enrichRuntimeEnums(
  tables: EnrichedTable[],
  runtimeEnums: RuntimeEnumInfo[],
  getDeityFolder: (tableName: string) => string,
  getCategory: (tableName: string) => ObjectCategory,
  options: GaiaOptions
): EnrichedRuntimeEnum[] {
  return runtimeEnums.map(enumInfo => ({
    name: enumInfo.name,
    values: enumInfo.values,
    deityFolder: getEnumFolder(enumInfo.name),
    shouldGenerateConstants: needsConstantGeneration(enumInfo.name)
  }));
}

/**
 * Generate all formatted outputs for a table
 */
async function generateTableOutputs(
  table: EnrichedTable,
  options: GaiaOptions
): Promise<Array<{ content: string; filePath: string; type: string }>> {
  const outputs: Array<{ content: string; filePath: string; type: string }> = [];
  
  // Types (always generated for tables)
  if (table.shouldGenerateTypes) {
    const types = formatTypes([table], { verbose: options.verbose });
    for (const t of types) {
      outputs.push({ content: t.content, filePath: t.filePath, type: 'types' });
    }
  }
  
  // Validators
  if (table.shouldGenerateValidators) {
    const validators = formatValidators([table], { verbose: options.verbose });
    for (const v of validators) {
      outputs.push({ content: v.content, filePath: v.filePath, type: 'validators' });
    }
  }
  
  // Utils
  if (table.shouldGenerateUtils) {
    const utils = formatUtils([table], { verbose: options.verbose });
    for (const u of utils) {
      outputs.push({ content: u.content, filePath: u.filePath, type: 'utils' });
    }
  }
  
  // API Routes
  if (table.shouldGenerateApiRoutes) {
    const apis = formatApiRoutes([table], { verbose: options.verbose });
    for (const api of apis) {
      outputs.push({ content: api.content, filePath: api.filePath, type: 'api' });
    }
  }
  
  // Hooks
  if (table.shouldGenerateHooks) {
    const hooks = formatHooks([table], { verbose: options.verbose });
    for (const h of hooks) {
      outputs.push({ content: h.content, filePath: h.filePath, type: 'hooks' });
    }
  }
  
  return outputs;
}

/**
 * Generate constant outputs for runtime enums
 */
async function generateConstantOutputs(
  enrichedEnums: ,
  options: GaiaOptions
): Promise<Array<{ content: string; filePath: string; type: string }>> {
  const outputs: Array<{ content: string; filePath: string; type: string }> = [];
  
  const constants = formatConstants(enrichedEnums, { verbose: options.verbose });
  for (const c of constants) {
    outputs.push({ content: c.content, filePath: c.filePath, type: 'constants' });
  }
  
  return outputs;
}

/**
 * Write outputs to disk
 */
async function writeOutputs(
  outputs: Array<{ content: string; filePath: string; type: string }>,
  options: GaiaOptions,
  logger: SystemLogger
): Promise<{ written: number; skipped: number; overwritten: number; errors: string[] }> {
  let written = 0;
  let skipped = 0;
  let overwritten = 0;
  const errors: string[] = [];
  
  const writeOptions: WriteOptions = {
    dryRun: options.dryRun,
    force: options.force,
    verbose: options.verbose,
    logger
  };
  
  for (const output of outputs) {
    const result = await writeGeneratedFile(output.filePath, output.content, [], writeOptions);
    
    if (result.success) {
      if (result.action === 'created') written++;
      else if (result.action === 'updated') overwritten++;
      else if (result.action === 'skipped') skipped++;
      else if (result.action === 'dryrun') {
        if (options.verbose) logDebug(`[DRY RUN] ${output.type}: ${output.filePath}`);
      }
      
      logger.addGeneratedFile(result.filePath);
    } else {
      errors.push(result.message);
      logger.log('error', 'writeOutputs', result.message);
    }
  }
  
  return { written, skipped, overwritten, errors };
}

/**
 * Update dependency map with generated files
 */
function updateDependencyMap(
  tables: EnrichedTable[],
  outputs: Array<{ filePath: string; type: string }>,
  options: GaiaOptions
): void {
  const map = loadDependencyMap();
  
  for (const table of tables) {
    const nodeId = `generated:table:${table.name}`;
    const node: DependencyNode = {
      id: nodeId,
      type: 'generated',
      exports: [`${table.name}Row`, `${table.name}Insert`, `${table.name}Update`],
      imports: [`@/types/supabase/tables`],
      usedBy: []
    };
    upsertNode(map, node);
  }
  
  for (const output of outputs) {
    const nodeId = `generated:${output.type}:${path.basename(output.filePath, '.ts')}`;
    const node: DependencyNode = {
      id: nodeId,
      type: 'generated',
      exports: [],
      imports: [],
      usedBy: []
    };
    upsertNode(map, node);
  }
  
  saveDependencyMap(map);
  if (options.verbose) {
    logDebug(`Updated dependency map with ${tables.length} tables and ${outputs.length} outputs`);
  }
}

// ============================================================================
// MAIN ORCHESTRATION
// ============================================================================

/**
 * Main GAIA orchestration function
 */
export async function runGaia(): Promise<GaiaResult> {
  const startTime = Date.now();
  const options = parseOptions();
  const logger = new SystemLogger('GAIA');
  
  const result: GaiaResult = {
    success: false,
    tablesProcessed: 0,
    enumsProcessed: 0,
    filesGenerated: 0,
    filesSkipped: 0,
    filesOverwritten: 0,
    errors: [],
    warnings: [],
    durationMs: 0
  };
  
  // Print header
  console.log('\n');
  logSeparator('═', 60);
  logHeader('🌍 GAIA - Database Type Generator');
  console.log('');
  logInfo(`Mode: ${options.dryRun ? 'DRY RUN (preview only)' : 'WRITE MODE'}`);
  if (options.force) logWarning('Force mode enabled - will overwrite existing files');
  if (options.scope) logInfo(`Scope: ${options.scope}:${options.scopeValue}`);
  if (options.handlingFilter) logInfo(`Filter: ${options.handlingFilter}`);
  if (options.maxTables > 0) logInfo(`Limit: ${options.maxTables} tables`);
  logSeparator('═', 60);
  console.log('\n');
  
  logger.startRun();
  
  try {
    // ============================================================================
    // PHASE 1: READ (once)
    // ============================================================================

    logStep('\n📖 PHASE 1: Reading database.types.ts');
    logSeparator('─', 40);

    const fileReadResult = readDatabaseTypes();
    if (!fileReadResult.success) {
      throw new Error(`Failed to read database.types.ts: ${fileReadResult.error}`);
    }

    const lines = fileReadResult.content.split('\n');
    logSuccess(`Read ${lines.length} lines (encoding: ${fileReadResult.encoding})`);

    // Find markers
    const markers = findMarkers(lines, { verbose: options.verbose });
    const markersWithBraces = findAllClosingBraces(lines, markers, { verbose: options.verbose });

    // ============================================================================
    // PHASE 2: EXTRACT RUNTIME ENUMS (once)
    // ============================================================================

    logStep('\n📦 PHASE 2: Extracting runtime enums');
    logSeparator('─', 40);

    let runtimeEnums: RuntimeEnumInfo[] = [];
    if (markersWithBraces.constantsEnumsLine !== -1 && markersWithBraces.constantsEnumsEndLine !== -1) {
      runtimeEnums = await extractRuntimeEnums(
        lines,
        markersWithBraces.constantsEnumsLine,
        markersWithBraces.constantsEnumsEndLine,
        { verbose: options.verbose }
      );
      logSuccess(`Extracted ${runtimeEnums.length} runtime enums`);
    } else {
      logWarning('Constants.Enums section not found');
    }

    // Build a map for quick lookup of runtime enum values
    const runtimeEnumMap = new Map<string, RuntimeEnumInfo>();
    for (const enumInfo of runtimeEnums) {
      runtimeEnumMap.set(enumInfo.name, enumInfo);
    }

    // ============================================================================
    // PHASE 3: GET TABLE LIST (once)
    // ============================================================================

    logStep('\n📋 PHASE 3: Building table list');
    logSeparator('─', 40);

    // Get all table names from deity_groups.ts (source of truth)
    const allTableNames = getAllTableNamesFromDeityGroups();
    logInfo(`Found ${allTableNames.length} tables in deity_groups.ts`);

    // Filter tables based on scope
    const filteredTableNames = filterTables(allTableNames, options);
    logInfo(`Filtered to ${filteredTableNames.length} tables`);

    // Build simple table objects with configuration (no parsing needed)
    const simpleTables = filteredTableNames.map(name => ({
      name,
      deityFolder: getFolderNameForTable(name) || 'hestia-core',
      handlingLevel: getTableHandlingLevel(name),
      category: getObjectCategory('table', name)
    }));

    // ============================================================================
    // PHASE 4: PROCESS EACH TABLE (one at a time)
    // ============================================================================

    logStep('\n🔧 PHASE 4: Processing tables (one at a time)');
    logSeparator('─', 40);
    console.log('');

    // Track results
    const tableResults: Array<{
      tableName: string;
      success: boolean;
      filesGenerated: number;
      filesSkipped: number;
      errors: string[];
    }> = [];

    let skipRemaining = false;

    for (let idx = 0; idx < simpleTables.length; idx++) {
      const table = simpleTables[idx];
      const progress = `[${idx + 1}/${simpleTables.length}]`;
      
      if (skipRemaining) {
        logInfo(`${progress} Skipping ${table.name} (user requested skip remaining)`);
        continue;
      }
      
      console.log('');
      logSeparator('─', 50);
      logStep(`${progress} Processing: ${table.name}`);
      logSeparator('─', 50);
      console.log('');
      
      // Display table configuration
      logInfo(`  Deity folder: ${table.deityFolder}`);
      logInfo(`  Handling level: ${table.handlingLevel}`);
      logInfo(`  Category: ${table.category.handlingLevel}`);
      logInfo(`  Should generate types: ${needsTypeGeneration(table.name)}`);
      logInfo(`  Should generate validators: ${needsValidators(table.name)}`);
      logInfo(`  Should generate utils: ${needsUtils(table.name)}`);
      logInfo(`  Should generate API routes: ${needsApiRoutes(table.name)}`);
      logInfo(`  Should generate hooks: ${needsHooks(table.name)}`);
      
      // Optional pause for inspection before generation
      if (!options.skipPauses && !isAutomatedEnvironment()) {
        const preGenPause = await pauseForReview(`Table: ${table.name}`, {
          prompt: 'Proceed with generation for this table?',
          showSummary: true,
          summaryData: {
            'Table': table.name,
            'Deity': table.deityFolder,
            'Handling': table.handlingLevel,
            'Types': needsTypeGeneration(table.name) ? '✓' : '✗',
            'Validators': needsValidators(table.name) ? '✓' : '✗',
            'Utils': needsUtils(table.name) ? '✓' : '✗',
            'API Routes': needsApiRoutes(table.name) ? '✓' : '✗',
            'Hooks': needsHooks(table.name) ? '✓' : '✗'
          }
        });
        
        if (!preGenPause.shouldContinue) {
          if (preGenPause.shouldRetry) {
            // Retry this table (decrement index to reprocess)
            idx--;
            continue;
          } else {
            // Stop completely
            logWarning(`Stopping at user request. Table: ${table.name}`);
            break;
          }
        }
      }
      
      // Enrich the table (simplified - no parsing)
      const enrichedTable: EnrichedTable = {
        name: table.name,
        deityFolder: table.deityFolder,
        deityGroup: DEITY_GROUPS.find(g => g.folderName === table.deityFolder),
        handlingLevel: table.handlingLevel,
        category: table.category,
        shouldGenerateTypes: needsTypeGeneration(table.name),
        shouldGenerateValidators: needsValidators(table.name),
        shouldGenerateUtils: needsUtils(table.name),
        shouldGenerateApiRoutes: needsApiRoutes(table.name),
        shouldGenerateHooks: needsHooks(table.name),
        hasRow: true
      };
      
      // Generate all outputs for this table
      const outputs: Array<{ content: string; filePath: string; type: string }> = [];
      
      // Types file
      if (enrichedTable.shouldGenerateTypes) {
        const types = formatTypes([enrichedTable], { verbose: options.verbose });
        outputs.push(...types.map(t => ({ ...t, type: 'types' })));
      }
      
      // Validators file
      if (enrichedTable.shouldGenerateValidators) {
        const validators = formatValidators([enrichedTable], { verbose: options.verbose });
        outputs.push(...validators.map(v => ({ ...v, type: 'validators' })));
      }
      
      // Utils file
      if (enrichedTable.shouldGenerateUtils) {
        const utils = formatUtils([enrichedTable], { verbose: options.verbose });
        outputs.push(...utils.map(u => ({ ...u, type: 'utils' })));
      }
      
      // API routes
      if (enrichedTable.shouldGenerateApiRoutes) {
        const apis = formatApiRoutes([enrichedTable], { verbose: options.verbose });
        outputs.push(...apis.map(a => ({ ...a, type: 'api' })));
      }
      
      // Hooks file
      if (enrichedTable.shouldGenerateHooks) {
        const hooks = formatHooks([enrichedTable], { verbose: options.verbose });
        outputs.push(...hooks.map(h => ({ ...h, type: 'hooks' })));
      }
      
      logInfo(`Generated ${outputs.length} outputs for ${table.name}`);
      
      // Write outputs if not dry run
      let writeResult = { written: 0, skipped: 0, overwritten: 0, errors: [] as string[] };
      
      if (!options.dryRun) {
        writeResult = await writeOutputs(outputs, options, logger);
        
        logSuccess(`  Written: ${writeResult.written} files`);
        if (writeResult.overwritten > 0) logWarning(`  Overwritten: ${writeResult.overwritten}`);
        if (writeResult.skipped > 0) logInfo(`  Skipped (unchanged): ${writeResult.skipped}`);
        if (writeResult.errors.length > 0) logError(`  Errors: ${writeResult.errors.length}`);
      } else {
        logInfo(`  [DRY RUN] Would write ${outputs.length} files`);
        // Preview files in dry run
        for (const output of outputs.slice(0, 3)) {
          logDebug(`    → ${output.type}: ${output.filePath}`);
        }
        if (outputs.length > 3) {
          logDebug(`    ... and ${outputs.length - 3} more`);
        }
      }
      
      // Store result
      tableResults.push({
        tableName: table.name,
        success: writeResult.errors.length === 0,
        filesGenerated: writeResult.written,
        filesSkipped: writeResult.skipped,
        errors: writeResult.errors
      });
      
      // ========================================================================
      // PAUSE AFTER TABLE (for inspection)
      // ========================================================================
      
      if (!options.skipPauses && !isAutomatedEnvironment()) {
        const isLastTable = idx === simpleTables.length - 1;
        const pauseResult = await pauseForReview(`Table Complete: ${table.name}`, {
          prompt: isLastTable ? 'All tables processed. Continue to final steps?' : 'Continue to next table?',
          showSummary: true,
          summaryData: {
            'Table': table.name,
            'Files generated': writeResult.written,
            'Files skipped': writeResult.skipped,
            'Errors': writeResult.errors.length,
            'Tables remaining': simpleTables.length - (idx + 1)
          }
        });
        
        if (!pauseResult.shouldContinue) {
          if (pauseResult.shouldRetry) {
            // Retry this table
            idx--;
            continue;
          } else {
            // Stop completely
            logWarning(`Stopping at user request after table: ${table.name}`);
            break;
          }
        }
      }
    }

    // ============================================================================
    // PHASE 5: GENERATE CONSTANTS FOR RUNTIME ENUMS (after tables)
    // ============================================================================

    logStep('\n🎨 PHASE 5: Generating runtime enum constants');
    logSeparator('─', 40);

    // Enrich runtime enums
    const enrichedEnums = enrichRuntimeEnums(runtimeEnums, { verbose: options.verbose });

    // Filter to only those that need constants
    const enumsToGenerate = enrichedEnums.filter(e => e.shouldGenerateConstants);

    if (enumsToGenerate.length > 0) {
      logInfo(`Generating constants for ${enumsToGenerate.length} runtime enums`);
      
      const constantOutputs = await generateConstantOutputs(enumsToGenerate, options);
      
      if (!options.dryRun) {
        const writeResult = await writeOutputs(constantOutputs, options, logger);
        logSuccess(`  Written: ${writeResult.written} constant files`);
        if (writeResult.overwritten > 0) logWarning(`  Overwritten: ${writeResult.overwritten}`);
        if (writeResult.skipped > 0) logInfo(`  Skipped (unchanged): ${writeResult.skipped}`);
      } else {
        logInfo(`  [DRY RUN] Would write ${constantOutputs.length} constant files`);
      }
      
      result.enumsProcessed = enumsToGenerate.length;
      result.filesGenerated += constantOutputs.length;
    } else {
      logInfo('No runtime enums need constant generation');
    }

    // ============================================================================
    // PHASE 6: UPDATE REGISTRY & DEPENDENCY MAP
    // ============================================================================

    logStep('\n📋 PHASE 6: Updating registry and dependency map');
    logSeparator('─', 40);

    if (!options.dryRun) {
      updateDependencyMap(simpleTables, tableResults, options);
      logSuccess('Updated dependency map');
    }
    
    // ========================================================================
    // COMPLETE
    // ========================================================================
    
    const durationMs = Date.now() - startTime;
    result.durationMs = durationMs;
    result.success = result.errors.length === 0;
    
    logger.endRun(result.success ? 'success' : result.errors.length > 0 ? 'partial' : 'failed');
    
    // Add efficiency record
    if (!options.dryRun) {
      addRecord({
        id: logger.getCurrentRun()?.id || `run_${Date.now()}`,
        timestamp: new Date().toISOString(),
        system: 'GAIA',
        totalFilesGenerated: result.filesGenerated,
        totalTimeMs: durationMs,
        averageTimePerFile: result.filesGenerated > 0 ? durationMs / result.filesGenerated : 0,
        cacheHits: 0,
        cacheMisses: result.filesGenerated,
        memoryUsage: process.memoryUsage().heapUsed,
        fileTypeBreakdown: allOutputs.reduce((acc, o) => {
          acc[o.type] = (acc[o.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      });
    }
    
    // Print final summary
    console.log('\n');
    logSeparator('═', 60);
    logHeader('📊 GAIA GENERATION SUMMARY');
    logSeparator('═', 60);
    console.log('');
    logInfo(`Status: ${result.success ? '✅ SUCCESS' : '⚠️ PARTIAL'}`);
    logInfo(`Duration: ${(durationMs / 1000).toFixed(2)} seconds`);
    logInfo(`Tables processed: ${result.tablesProcessed}`);
    logInfo(`Runtime enums processed: ${result.enumsProcessed}`);
    logInfo(`Files generated: ${result.filesGenerated}`);
    logInfo(`Files skipped (unchanged): ${result.filesSkipped}`);
    if (result.filesOverwritten > 0) logWarning(`Files overwritten: ${result.filesOverwritten}`);
    if (result.errors.length > 0) {
      logError(`Errors: ${result.errors.length}`);
      for (const err of result.errors.slice(0, 5)) {
        logDebug(`  - ${err}`);
      }
    }
    console.log('');
    logSeparator('═', 60);
    
    return result;
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    result.errors.push(errorMessage);
    result.success = false;
    
    logError(`GAIA failed: ${errorMessage}`);
    if (error instanceof Error && error.stack && options.verbose) {
      console.error(error.stack);
    }
    
    logger.endRun('failed');
    return result;
  }
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main(): Promise<void> {
  const result = await runGaia();
  
  if (!result.success) {
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  parseOptions,
  getAllTableNamesFromDeityGroups,
  filterTables,
  enrichTable,
  enrichRuntimeEnums,
  generateTableOutputs,
  generateConstantOutputs,
  writeOutputs,
  updateDependencyMap
};
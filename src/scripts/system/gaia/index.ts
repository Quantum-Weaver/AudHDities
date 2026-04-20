// src/scripts/system/gaia/index.ts
// ============================================================================
// GAIA - DATABASE TYPE GENERATOR (SIMPLIFIED)
// ============================================================================
// Purpose: Orchestrate the generation of TypeScript artifacts from database.types.ts
//
// Core insight: The Tables helper already provides Row/Insert/Update types.
// We only need to:
//   1. Extract runtime enum VALUES (for constants)
//   2. Generate re-export type files (using Tables helper)
//   3. Generate supporting files (validators, utils, API routes, hooks)
//
// Usage:
//   npm run gaia                     # Dry run (preview only)
//   npm run gaia -- --write          # Write files
//   npm run gaia -- --write --force  # Force overwrite
//   npm run gaia -- --scope=table:profiles  # Single table
//   npm run gaia -- --scope=deity:hestia    # All tables in Hestia
//   npm run gaia -- --verbose        # Verbose output
// ============================================================================

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

import { readDatabaseTypes } from '../../shared/file_reader.js';
import { findMarkers } from '../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../modules/system/find_closing_braces.js';
import { logHeader, logSuccess, logError, logInfo, logWarning, logDebug, logSeparator, logStep } from '../../shared/logger.js';

// ============================================================================
// PHASE 2: EXTRACT (Runtime enums only)
// ============================================================================

import { extractRuntimeEnums, type RuntimeEnumInfo } from './extract_runtime_enums.js';

// ============================================================================
// PHASE 3: ENRICH (Configuration)
// ============================================================================

import { DEITY_GROUPS, getFolderNameForTable } from '@/config/deity_groups.js';
import {
  getTableHandlingLevel,
  getObjectCategory,
  needsTypeGeneration,
  needsValidators,
  needsUtils,
  needsApiRoutes,
  needsHooks,
  needsConstantGeneration
} from '@/config/object_categories.js';
import { getEnumFolder } from '@/config/enum_mapping.js';

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

import { writeGeneratedFile, type WriteOptions } from './writeGeneratedFile.js';

// ============================================================================
// PHASE 6: REGISTRATION & MAINTENANCE
// ============================================================================

import { SystemLogger } from '../../shared/system_logger.js';
import { saveDependencyMap, loadDependencyMap, upsertNode, type DependencyNode } from '@/config/dependency_map.js';
import { addRecord } from '@/config/efficiency_records.js';

// ============================================================================
// PHASE 7: USER INTERACTION
// ============================================================================

import { pauseForReview, isAutomatedEnvironment } from '../../shared/pause.js';

// ============================================================================
// TYPES
// ============================================================================

export type ScopeType = 'table' | 'deity';
export type HandlingFilter = 'full_crud' | 'assessment' | 'join_table' | 'read_only_view' | 'all';

export interface GaiaOptions {
  dryRun: boolean;
  write: boolean;
  force: boolean;
  verbose: boolean;
  scope: ScopeType | null;
  scopeValue: string | null;
  handlingFilter: HandlingFilter | null;
  singleTable: string | null;
  singleDeity: string | null;
  skipPauses: boolean;
  maxTables: number;
}

export interface SimpleTable {
  name: string;
  deityFolder: string;
  handlingLevel: string;
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

function parseOptions(): GaiaOptions {
  const args = process.argv.slice(2);

  const hasWrite = args.includes('--write');
  const hasDryRun = args.includes('--dry-run');
  const force = args.includes('--force');
  const verbose = args.includes('--verbose');
  const skipPauses = args.includes('--skip-pauses');

  let scope: ScopeType | null = null;
  let scopeValue: string | null = null;
  const scopeArg = args.find(a => a.startsWith('--scope='));
  if (scopeArg) {
    const [, value] = scopeArg.split('=');
    const [scopeType, scopeVal] = value.split(':');
    if (scopeType === 'table' || scopeType === 'deity') {
      scope = scopeType;
      scopeValue = scopeVal;
    }
  }

  let singleTable: string | null = null;
  const tableArg = args.find(a => a.startsWith('--table='));
  if (tableArg) singleTable = tableArg.split('=')[1];

  let singleDeity: string | null = null;
  const deityArg = args.find(a => a.startsWith('--deity='));
  if (deityArg) singleDeity = deityArg.split('=')[1];

  let handlingFilter: HandlingFilter | null = null;
  const filterArg = args.find(a => a.startsWith('--filter='));
  if (filterArg) {
    const filter = filterArg.split('=')[1];
    if (['full_crud', 'assessment', 'join_table', 'read_only_view', 'all'].includes(filter)) {
      handlingFilter = filter as HandlingFilter;
    }
  }

  let maxTables = 0;
  const maxArg = args.find(a => a.startsWith('--max='));
  if (maxArg) maxTables = parseInt(maxArg.split('=')[1], 10);

  const dryRun = hasWrite ? false : !hasDryRun;

  return {
    dryRun, write: hasWrite, force, verbose, skipPauses,
    scope, scopeValue, handlingFilter, singleTable, singleDeity, maxTables
  };
}

function getAllTableNamesFromDeityGroups(): string[] {
  const tables: string[] = [];
  for (const group of DEITY_GROUPS) {
    tables.push(...group.tables);
  }
  return tables;
}

function filterTables(allTables: string[], options: GaiaOptions): string[] {
  let filtered = [...allTables];

  if (options.scope === 'table' && options.scopeValue) {
    filtered = filtered.filter(t => t === options.scopeValue);
  } else if (options.scope === 'deity' && options.scopeValue) {
    const deityGroup = DEITY_GROUPS.find(g => g.folderName === options.scopeValue || g.name === options.scopeValue);
    if (deityGroup) filtered = filtered.filter(t => deityGroup.tables.includes(t));
  } else if (options.singleTable) {
    filtered = filtered.filter(t => t === options.singleTable);
  } else if (options.singleDeity) {
    const deityGroup = DEITY_GROUPS.find(g => g.folderName === options.singleDeity || g.name === options.singleDeity);
    if (deityGroup) filtered = filtered.filter(t => deityGroup.tables.includes(t));
  }

  if (options.handlingFilter && options.handlingFilter !== 'all') {
    filtered = filtered.filter(t => getTableHandlingLevel(t) === options.handlingFilter);
  }

  if (options.maxTables > 0) filtered = filtered.slice(0, options.maxTables);

  return filtered;
}

function buildSimpleTables(tableNames: string[]): SimpleTable[] {
  return tableNames.map(name => ({
    name,
    deityFolder: getFolderNameForTable(name) || 'hestia-core',
    handlingLevel: getTableHandlingLevel(name)
  }));
}

// ============================================================================
// MAIN ORCHESTRATION
// ============================================================================

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
    // PHASE 1: READ database.types.ts (once)
    // ============================================================================

    logStep('📖 PHASE 1: Reading database.types.ts');
    logSeparator('─', 40);

    const fileReadResult = readDatabaseTypes();
    if (!fileReadResult.success) {
      throw new Error(`Failed to read database.types.ts: ${fileReadResult.error}`);
    }

    const lines = fileReadResult.content.split('\n');
    logSuccess(`Read ${lines.length} lines (encoding: ${fileReadResult.encoding})`);

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

    // ============================================================================
    // PHASE 3: BUILD TABLE LIST (once)
    // ============================================================================

    logStep('\n📋 PHASE 3: Building table list');
    logSeparator('─', 40);

    const allTableNames = getAllTableNamesFromDeityGroups();
    logInfo(`Found ${allTableNames.length} tables in deity_groups.ts`);

    const filteredTableNames = filterTables(allTableNames, options);
    logInfo(`Filtered to ${filteredTableNames.length} tables`);

    const simpleTables = buildSimpleTables(filteredTableNames);

    // Log handling level summary
    const handlingSummary: Record<string, number> = {};
    for (const table of simpleTables) {
      handlingSummary[table.handlingLevel] = (handlingSummary[table.handlingLevel] || 0) + 1;
    }
    logInfo('Tables by handling level:');
    for (const [level, count] of Object.entries(handlingSummary)) {
      logDebug(`  ${level}: ${count}`);
    }

    // ============================================================================
    // PHASE 4: PROCESS EACH TABLE (one at a time)
    // ============================================================================

    logStep('\n🔧 PHASE 4: Processing tables (one at a time)');
    logSeparator('─', 40);

    const allOutputs: Array<{ content: string; filePath: string; type: string }> = [];

    for (let idx = 0; idx < simpleTables.length; idx++) {
      const table = simpleTables[idx];
      const progress = `[${idx + 1}/${simpleTables.length}]`;

      console.log('');
      logSeparator('─', 50);
      logStep(`${progress} Processing: ${table.name}`);
      logSeparator('─', 50);

      logInfo(`  Deity: ${table.deityFolder}`);
      logInfo(`  Handling: ${table.handlingLevel}`);

      // Preview what will be generated
      const willGenerate = [];
      if (needsTypeGeneration(table.name)) willGenerate.push('types');
      if (needsValidators(table.name)) willGenerate.push('validators');
      if (needsUtils(table.name)) willGenerate.push('utils');
      if (needsApiRoutes(table.name)) willGenerate.push('api');
      if (needsHooks(table.name)) willGenerate.push('hooks');
      logInfo(`  Will generate: ${willGenerate.join(', ') || 'nothing'}`);

      // Optional pre-generation pause
      if (!options.skipPauses && !isAutomatedEnvironment()) {
        const prePause = await pauseForReview(`Table: ${table.name}`, {
          prompt: 'Generate this table?',
          showSummary: true,
          summaryData: {
            'Table': table.name,
            'Deity': table.deityFolder,
            'Handling': table.handlingLevel,
            'Will generate': willGenerate.join(', ') || 'nothing'
          }
        });
        if (!prePause.shouldContinue) {
          if (prePause.shouldRetry) { idx--; continue; }
          else break;
        }
      }

      // Generate outputs for this table
      const outputs: Array<{ content: string; filePath: string; type: string }> = [];

      const enrichedTable = {
        name: table.name,
        deityFolder: table.deityFolder,
        handlingLevel: table.handlingLevel,
        category: getObjectCategory('table', table.name),
        shouldGenerateTypes: needsTypeGeneration(table.name),
        shouldGenerateValidators: needsValidators(table.name),
        shouldGenerateUtils: needsUtils(table.name),
        shouldGenerateApiRoutes: needsApiRoutes(table.name),
        shouldGenerateHooks: needsHooks(table.name),
        hasRow: true
      };

      if (enrichedTable.shouldGenerateTypes) {
        const types = formatTypes([enrichedTable], { verbose: options.verbose });
        outputs.push(...types.map(t => ({ ...t, type: 'types' })));
      }
      if (enrichedTable.shouldGenerateValidators) {
        const validators = formatValidators([enrichedTable], { verbose: options.verbose });
        outputs.push(...validators.map(v => ({ ...v, type: 'validators' })));
      }
      if (enrichedTable.shouldGenerateUtils) {
        const utils = formatUtils([enrichedTable], { verbose: options.verbose });
        outputs.push(...utils.map(u => ({ ...u, type: 'utils' })));
      }
      if (enrichedTable.shouldGenerateApiRoutes) {
        const apis = formatApiRoutes([enrichedTable], { verbose: options.verbose });
        outputs.push(...apis.map(a => ({ ...a, type: 'api' })));
      }
      if (enrichedTable.shouldGenerateHooks) {
        const hooks = formatHooks([enrichedTable], { verbose: options.verbose });
        outputs.push(...hooks.map(h => ({ ...h, type: 'hooks' })));
      }

      allOutputs.push(...outputs);
      result.tablesProcessed++;

      // Write outputs
      if (!options.dryRun) {
        const writeOptions: WriteOptions = {
          dryRun: false,
          force: options.force,
          verbose: options.verbose,
          logger
        };
        for (const output of outputs) {
          const writeResult = await writeGeneratedFile(output.filePath, output.content, [], writeOptions);
          if (writeResult.success) {
            if (writeResult.action === 'created') result.filesGenerated++;
            else if (writeResult.action === 'updated') result.filesOverwritten++;
            else if (writeResult.action === 'skipped') result.filesSkipped++;
            logger.addGeneratedFile(writeResult.filePath);
          } else {
            result.errors.push(writeResult.message);
          }
        }
        logSuccess(`  Generated ${outputs.length} files for ${table.name}`);
      } else {
        logInfo(`  [DRY RUN] Would generate ${outputs.length} files`);
        if (options.verbose) {
          for (const output of outputs.slice(0, 3)) {
            logDebug(`    → ${output.type}: ${output.filePath}`);
          }
          if (outputs.length > 3) logDebug(`    ... and ${outputs.length - 3} more`);
        }
      }

      // Optional post-generation pause
      if (!options.skipPauses && !isAutomatedEnvironment()) {
        const postPause = await pauseForReview(`Table Complete: ${table.name}`, {
          prompt: idx === simpleTables.length - 1 ? 'All tables done. Continue?' : 'Continue to next table?',
          showSummary: true,
          summaryData: {
            'Table': table.name,
            'Files generated': outputs.length,
            'Tables remaining': simpleTables.length - (idx + 1)
          }
        });
        if (!postPause.shouldContinue) break;
      }
    }

    // ============================================================================
    // PHASE 5: GENERATE RUNTIME ENUM CONSTANTS
    // ============================================================================

    logStep('\n🎨 PHASE 5: Generating runtime enum constants');
    logSeparator('─', 40);

    const enrichedEnums = runtimeEnums.map(enumInfo => ({
      name: enumInfo.name,
      values: enumInfo.values,
      deityFolder: getEnumFolder(enumInfo.name),
      shouldGenerateConstants: needsConstantGeneration(enumInfo.name)
    })).filter(e => e.shouldGenerateConstants);

    if (enrichedEnums.length > 0) {
      logInfo(`Generating constants for ${enrichedEnums.length} runtime enums`);
      const constants = formatConstants(enrichedEnums, { verbose: options.verbose });

      if (!options.dryRun) {
        const writeOptions: WriteOptions = {
          dryRun: false,
          force: options.force,
          verbose: options.verbose,
          logger
        };
        for (const c of constants) {
          const writeResult = await writeGeneratedFile(c.filePath, c.content, [], writeOptions);
          if (writeResult.success) {
            if (writeResult.action === 'created') result.filesGenerated++;
            else if (writeResult.action === 'updated') result.filesOverwritten++;
            else if (writeResult.action === 'skipped') result.filesSkipped++;
            logger.addGeneratedFile(writeResult.filePath);
          } else {
            result.errors.push(writeResult.message);
          }
        }
        logSuccess(`Generated ${constants.length} constant files`);
      } else {
        logInfo(`[DRY RUN] Would generate ${constants.length} constant files`);
      }
      result.enumsProcessed = enrichedEnums.length;
    } else {
      logInfo('No runtime enums need constant generation');
    }

    // ============================================================================
    // PHASE 6: UPDATE DEPENDENCY MAP & REGISTRY
    // ============================================================================

    logStep('\n📋 PHASE 6: Updating registry and dependency map');
    logSeparator('─', 40);

    if (!options.dryRun) {
      const map = loadDependencyMap();
      for (const table of simpleTables) {
        const node: DependencyNode = {
          id: `generated:table:${table.name}`,
          type: 'generated',
          exports: [`${table.name}Row`, `${table.name}Insert`, `${table.name}Update`],
          imports: ['@/types/supabase/tables'],
          usedBy: []
        };
        upsertNode(map, node);
      }
      saveDependencyMap(map);
      logSuccess('Updated dependency map');
    }

    // ============================================================================
    // COMPLETE
    // ============================================================================

    const durationMs = Date.now() - startTime;
    result.durationMs = durationMs;
    result.success = result.errors.length === 0;

    logger.endRun(result.success ? 'success' : result.errors.length > 0 ? 'partial' : 'failed');

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
        fileTypeBreakdown: {}
      });
    }

    // Final summary
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
  if (!result.success) process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// ============================================================================
// EXPORTS
// ============================================================================

export { parseOptions, getAllTableNamesFromDeityGroups, filterTables, buildSimpleTables };
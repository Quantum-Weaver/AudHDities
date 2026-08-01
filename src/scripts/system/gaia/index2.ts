// ============================================================================
// GAIA v2 ORCHESTRATOR - Phases 0, 1, and 2 + Generation Gate
// ============================================================================
// Purpose: Foundation helpers, discovery, enrichment, then artifact generation.
// Phases:
//   0a. Generate src/types/supabase/database.helpers.ts
//   0b. Generate src/types/supabase/enums.ts
//   0c. Generate src/config/enum_mapping.ts from table enum references.
//   1.  Read database.types.ts and build the GaiaSchema model.
//   2.  Resolve deity folders, categories, and generation flags.
//   Gate: Ask the user what to generate (all / one table / one deity group)
//         and whether the next phase should run with force and verbose.
//   3a. Generate runtime enum constant files.
// Stops after phase 3a for review and testing.
// ============================================================================

import * as readline from 'readline';

import { generateTablesFile } from './maintenance/generate_tables_file.js';
import { generateEnumsFile } from './maintenance/generate_enums_file.js';
import { generateEnumMappingFile } from './maintenance/generate_enum_mapping.js';

import { readDatabaseTypes } from '../../shared/file_reader.js';
import { findMarkers } from '../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../modules/system/find_closing_braces.js';

import { extractAllNames } from './extract/extract_names.js';
import { extractTables, type TableInfo } from './extract/extract_tables.js';
import { extractFunctions, type FunctionInfo } from './extract/extract_functions.js';
import { extractRuntimeEnums, type RuntimeEnumInfo } from './extract/extract_runtime_enums.js';

import {
  enrichAll,
  type EnrichedTable,
  type EnrichedView,
  type EnrichedFunction,
  type EnrichedRuntimeEnum,
} from './enrich/enrich_objects.js';

import type { ExtractedObjectWithDetails } from '../../shared/types.js';

import { generateConstant } from './generate/generate_constants.js';
import { generateViewTypes } from './generate/generate_types.js';
import { formatObjectTypes } from './format/format_object_types.js';
import { writeGeneratedFile, type WriteOptions } from './write_generated_file.js';

import type { PublicTableNames, PublicViewNames } from '@/types/supabase/database.helpers.js';
import { DEITY_GROUPS, getAllTableNames, getAllViewNames } from '@/config/deity_groups.js';
import { getProjectRoot } from '../../shared/paths.js';   // same depth as the system_logger import
const PROJECT_ROOT = getProjectRoot();
// ============================================================================
// SCHEMA MODEL
// ============================================================================

interface GaiaSchema {
  sourcePath: string;
  tables: TableInfo[];
  views: string[];
  functions: FunctionInfo[];
  typeEnums: string[];
  compositeTypes: string[];
  runtimeEnums: RuntimeEnumInfo[];
}

interface EnrichedSchema {
  tables: EnrichedTable[];
  views: EnrichedView[];
  functions: EnrichedFunction[];
  runtimeEnums: EnrichedRuntimeEnum[];
}

// ============================================================================
// CLI OPTIONS
// ============================================================================

interface FoundationOptions {
  dryRun: boolean;
}

interface GenerationOptions {
  target: 'all' | 'table' | 'deity';
  targetValue: string | null;
  force: boolean;
  verbose: boolean;
}

function parseArgs(): { foundation: FoundationOptions; generation: GenerationOptions | null } {
  const args = process.argv.slice(2);

  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const forceFlag = args.includes('--force') || args.includes('-f');
  const verboseFlag = args.includes('--verbose') || args.includes('-v');

  const tableArg = args.find(a => a.startsWith('--table='));
  const deityArg = args.find(a => a.startsWith('--deity='));
  const allFlag = args.includes('--all');

  let target: GenerationOptions['target'] = 'all';
  let targetValue: string | null = null;
  let hasTargetFlag = false;

  if (tableArg) {
    hasTargetFlag = true;
    target = 'table';
    targetValue = tableArg.split('=')[1];
  } else if (deityArg) {
    hasTargetFlag = true;
    target = 'deity';
    targetValue = deityArg.split('=')[1];
  } else if (allFlag) {
    hasTargetFlag = true;
  }

  const generation: GenerationOptions | null = hasTargetFlag
    ? { target, targetValue, force: forceFlag, verbose: verboseFlag }
    : null;

  return {
    foundation: { dryRun },
    generation,
  };
}

// ============================================================================
// INTERACTIVE PROMPT
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

async function promptForGenerationPlan(enriched: EnrichedSchema): Promise<GenerationOptions> {
  console.log('\n' + '═'.repeat(60));
  console.log('🚦 GENERATION GATE');
  console.log('═'.repeat(60));
  console.log('\nWhat would you like to generate next?');
  console.log('  1) Full schema (all tables, views, functions)');
  console.log('  2) Single table');
  console.log('  3) Entire deity group');
  console.log('');

  const choice = await askUser('Enter choice (1-3): ');

  let target: GenerationOptions['target'] = 'all';
  let targetValue: string | null = null;

  if (choice === '2') {
    target = 'table';
    const allTables = getAllTableNames();
    console.log(`\n📊 Available tables (${allTables.length} total):`);
    console.log(`  ${allTables.slice(0, 20).join(', ')}${allTables.length > 20 ? '...' : ''}`);
    console.log('');
    targetValue = await askUser('Enter table name: ');

    if (!allTables.includes(targetValue as PublicTableNames)) {
      console.log(`\n⚠️  Table "${targetValue}" not found in deity_groups.ts`);
      const confirm = await askUser('Continue anyway? (y/N): ');
      if (confirm.toLowerCase() !== 'y') {
        console.log('\n❌ Generation cancelled.');
        process.exit(0);
      }
    }
  } else if (choice === '3') {
    target = 'deity';
    console.log('\n📊 Available deity groups:');
    DEITY_GROUPS.forEach((g, i) => {
      console.log(`  ${i + 1}) ${g.name} (${g.folderName})`);
      console.log(`     ${g.tables.length} tables, ${g.views?.length || 0} views`);
    });
    console.log('');
    const deityChoice = await askUser('Enter deity name or number: ');

    const num = parseInt(deityChoice);
    if (!isNaN(num) && num >= 1 && num <= DEITY_GROUPS.length) {
      targetValue = DEITY_GROUPS[num - 1].folderName;
    } else {
      targetValue = deityChoice;
    }

    const deityExists = DEITY_GROUPS.some(g => g.folderName === targetValue || g.name === targetValue);
    if (!deityExists) {
      console.log(`\n⚠️  Deity "${targetValue}" not found`);
      const confirm = await askUser('Continue anyway? (y/N): ');
      if (confirm.toLowerCase() !== 'y') {
        console.log('\n❌ Generation cancelled.');
        process.exit(0);
      }
    }
  }

  console.log('');
  const forceAnswer = await askUser('Force overwrite existing files? (y/N): ');
  const force = forceAnswer.toLowerCase() === 'y';

  const verboseAnswer = await askUser('Verbose output? (y/N): ');
  const verbose = verboseAnswer.toLowerCase() === 'y';

  return { target, targetValue, force, verbose };
}

// ============================================================================
// PHASE 0: FOUNDATION HELPERS
// ============================================================================

async function runPhase0(options: FoundationOptions): Promise<void> {
  const { dryRun } = options;

  // Foundation helpers always run force + verbose so they stay fresh.
  const foundationWriteOptions = { dryRun, force: true, verbose: true };

  console.log('\n' + '═'.repeat(60));
  console.log('🌍 GAIA v2 - Phase 0 (Foundation Helpers)');
  console.log('═'.repeat(60));

  if (dryRun) console.log('\n⚠️  DRY RUN MODE - No files will be written');

  // ── Phase 0a: Database Helpers ──
  console.log('\n📦 Phase 0a: Generate database.helpers.ts');
  const tablesResult = await generateTablesFile(foundationWriteOptions);
  if (!tablesResult.success) {
    console.error(`\n❌ Phase 0a failed: ${tablesResult.message}`);
    process.exit(1);
  }
  console.log(`   ${tablesResult.message}`);

  // ── Phase 0b: Enum Helpers ──
  console.log('\n📦 Phase 0b: Generate enums.ts');
  const enumsResult = await generateEnumsFile(foundationWriteOptions);
  if (!enumsResult.success) {
    console.error(`\n❌ Phase 0b failed: ${enumsResult.message}`);
    process.exit(1);
  }
  console.log(`   ${enumsResult.message}`);
  if (enumsResult.enumsCount > 0) {
    console.log(`   ${enumsResult.enumsCount} runtime enums exported`);
  }

  // ── Phase 0c: Enum Mapping ──
  console.log('\n📦 Phase 0c: Generate enum_mapping.ts');
  const enumMappingResult = await generateEnumMappingFile(foundationWriteOptions);
  if (!enumMappingResult.success) {
    console.error(`\n❌ Phase 0c failed: ${enumMappingResult.message}`);
    process.exit(1);
  }
  console.log(`   ${enumMappingResult.message}`);
  if (enumMappingResult.mappingCount > 0) {
    console.log(`   ${enumMappingResult.mappingCount} enums mapped`);
  }

  // ── Summary ──
  console.log('\n' + '─'.repeat(60));
  console.log('✅ Phase 0 complete');
  console.log(`   database.helpers.ts: ${tablesResult.action}`);
  console.log(`   enums.ts:            ${enumsResult.action}`);
  console.log(`   enum_mapping.ts:     ${enumMappingResult.action}`);
}

// ============================================================================
// PHASE 1: DISCOVERY
// ============================================================================

async function runPhase1(): Promise<GaiaSchema> {
  console.log('\n' + '═'.repeat(60));
  console.log('🔍 GAIA v2 - Phase 1 (Discovery)');
  console.log('═'.repeat(60));

  // Read source file
  const fileResult = readDatabaseTypes();
  if (!fileResult.success) {
    throw new Error(`Failed to read database.types.ts: ${fileResult.error}`);
  }

  const lines = fileResult.content.split('\n');
  console.log(`\n📖 Read ${lines.length} lines from database.types.ts`);

  // Find markers and closing braces
  const markers = findMarkers(lines, { verbose: true });
  const markersWithBraces = findAllClosingBraces(lines, markers, { verbose: true });

  // Extract names
  const names = extractAllNames(lines, markersWithBraces, { verbose: true });
  console.log(`\n🎯 Found:`);
  console.log(`   ${names.tables.length} tables`);
  console.log(`   ${names.views.length} views`);
  console.log(`   ${names.functions.length} functions`);
  console.log(`   ${names.typeEnums.length} type enums`);
  console.log(`   ${names.compositeTypes.length} composite types`);

  // Extract full table bodies
  const tables = await extractTables(
    lines,
    markersWithBraces.tablesLine,
    markersWithBraces.tablesEndLine,
    { verbose: true }
  );

  // Extract function signatures
  const functions = await extractFunctions(
    lines,
    markersWithBraces.functionsLine,
    markersWithBraces.functionsEndLine,
    { verbose: true }
  );

  // Extract runtime enum values
  const runtimeEnums = await extractRuntimeEnums(
    lines,
    markersWithBraces.constantsEnumsLine,
    markersWithBraces.constantsEnumsEndLine,
    { verbose: true }
  );

  const schema: GaiaSchema = {
    sourcePath: 'src/types/supabase/database.types.ts',
    tables,
    views: names.views,
    functions,
    typeEnums: names.typeEnums,
    compositeTypes: names.compositeTypes,
    runtimeEnums,
  };

  console.log(`\n📊 Extracted:`);
  console.log(`   ${schema.tables.length} tables with full bodies`);
  console.log(`   ${schema.functions.length} function signatures`);
  console.log(`   ${schema.runtimeEnums.length} runtime enums with values`);

  return schema;
}

// ============================================================================
// PHASE 2: ENRICHMENT
// ============================================================================

async function runPhase2(schema: GaiaSchema): Promise<EnrichedSchema> {
  console.log('\n' + '═'.repeat(60));
  console.log('⚙️  GAIA v2 - Phase 2 (Enrichment)');
  console.log('═'.repeat(60));

  // Build table lookup map
  const tableInfoMap = new Map(schema.tables.map(t => [t.name, t]));

  // Enrich all objects
  const enriched = await enrichAll(
    schema.tables.map(t => t.name as PublicTableNames),
    tableInfoMap,
    schema.views as PublicViewNames[],
    schema.functions.map(f => f.name),
    schema.runtimeEnums.map(e => ({ name: e.name, values: e.values })),
    { verbose: true }
  );

  console.log(`\n📊 Enriched:`);
  console.log(`   ${enriched.tables.length} tables`);
  console.log(`   ${enriched.views.length} views`);
  console.log(`   ${enriched.functions.length} functions`);
  console.log(`   ${enriched.runtimeEnums.length} runtime enums`);

  // Generation flag summary
  const tablesWithTypes = enriched.tables.filter(t => t.shouldGenerateTypes).length;
  const tablesWithValidators = enriched.tables.filter(t => t.shouldGenerateValidators).length;
  const tablesWithApi = enriched.tables.filter(t => t.shouldGenerateApiRoutes).length;
  const tablesWithHooks = enriched.tables.filter(t => t.shouldGenerateHooks).length;
  const tablesWithUtils = enriched.tables.filter(t => t.shouldGenerateUtils).length;
  const enumsWithConstants = enriched.runtimeEnums.filter(e => e.shouldGenerateConstants).length;

  console.log(`\n🎯 Full generation plan (before filtering):`);
  console.log(`   ${tablesWithTypes} table type files`);
  console.log(`   ${tablesWithValidators} validator files`);
  console.log(`   ${tablesWithApi} table API route pairs`);
  console.log(`   ${tablesWithHooks} hook files`);
  console.log(`   ${tablesWithUtils} util files`);
  console.log(`   ${enumsWithConstants} runtime enum constant files`);

  return enriched;
}

// ============================================================================
// GENERATION GATE
// ============================================================================

async function runGenerationGate(
  enriched: EnrichedSchema,
  cliPlan: GenerationOptions | null
): Promise<GenerationOptions> {
  const plan = cliPlan ?? (await promptForGenerationPlan(enriched));

  console.log('\n' + '─'.repeat(60));
  console.log(cliPlan ? '📝 Generation options from CLI flags:' : '📝 Generation gate response:');
  console.log(`   Target: ${plan.target}${plan.targetValue ? ` = ${plan.targetValue}` : ''}`);
  console.log(`   Force:  ${plan.force ? 'yes' : 'no'}`);
  console.log(`   Verbose: ${plan.verbose ? 'yes' : 'no'}`);
  console.log('─'.repeat(60));

  return plan;
}

// ============================================================================
// PHASE 3a: RUNTIME ENUM CONSTANTS
// ============================================================================

function filterEnumsForTarget(
  enums: EnrichedRuntimeEnum[],
  plan: GenerationOptions,
  tables: EnrichedTable[]
): EnrichedRuntimeEnum[] {
  if (plan.target === 'all') {
    return enums;
  }

  if (plan.target === 'deity' && plan.targetValue) {
    return enums.filter(e => e.deityFolder === plan.targetValue);
  }

  if (plan.target === 'table' && plan.targetValue) {
    const targetTable = tables.find(t => t.name === plan.targetValue);
    if (!targetTable) return [];
    return enums.filter(e => targetTable.enumRefs.includes(e.name));
  }

  return enums;
}

async function runPhase3a(
  enriched: EnrichedSchema,
  plan: GenerationOptions,
  dryRun: boolean
): Promise<{ generated: number; skipped: number; errors: number }> {
  console.log('\n' + '═'.repeat(60));
  console.log('🔢 GAIA v2 - Phase 3a (Runtime Enum Constants)');
  console.log('═'.repeat(60));

  const enumsToGenerate = filterEnumsForTarget(
    enriched.runtimeEnums.filter(e => e.shouldGenerateConstants),
    plan,
    enriched.tables
  );

  if (enumsToGenerate.length === 0) {
    console.log('\n⏭️  No runtime enum constants to generate for this target.');
    return { generated: 0, skipped: 0, errors: 0 };
  }

  console.log(`\n📦 Generating ${enumsToGenerate.length} runtime enum constant file(s)...`);

  const writeOptions: WriteOptions = {
    dryRun,
    force: plan.force,
    verbose: plan.verbose,
  };

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const enum_ of enumsToGenerate) {
    try {
      const runtimeEnumInfo: RuntimeEnumInfo = {
        name: enum_.name,
        values: enum_.values,
        content: '',
        startLine: 0,
        endLine: 0,
        type: 'runtime_enum',
      };

      const result = generateConstant(runtimeEnumInfo, enum_.deityFolder, {
        verbose: plan.verbose,
      });

      if (!result) {
        skipped++;
        continue;
      }

      const writeResult = await writeGeneratedFile(
        result.filePath,
        result.content,
        [`RuntimeEnum:${enum_.name}`],
        writeOptions
      );

      if (writeResult.success && writeResult.action !== 'skipped') {
        generated++;
        if (plan.verbose) {
          console.log(`   ✅ ${writeResult.action}: ${writeResult.filePath}`);
        }
      } else if (writeResult.action === 'skipped') {
        skipped++;
        if (plan.verbose) {
          console.log(`   ⏭️  skipped: ${writeResult.filePath}`);
        }
      }
    } catch (error) {
      errors++;
      console.error(
        `   ❌ ${enum_.name}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  console.log(`\n📊 Phase 3a summary:`);
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped:   ${skipped}`);
  console.log(`   Errors:    ${errors}`);

  return { generated, skipped, errors };
}

// ============================================================================
// PHASE 3b: TYPES
// ============================================================================

function filterTablesAndViewsForTarget(
  tables: EnrichedTable[],
  views: EnrichedView[],
  plan: GenerationOptions
): { tables: EnrichedTable[]; views: EnrichedView[] } {
  if (plan.target === 'all') {
    return { tables, views };
  }

  if (plan.target === 'deity' && plan.targetValue) {
    return {
      tables: tables.filter(t => t.deityFolder === plan.targetValue),
      views: views.filter(v => v.deityFolder === plan.targetValue),
    };
  }

  if (plan.target === 'table' && plan.targetValue) {
    return {
      tables: tables.filter(t => t.name === plan.targetValue),
      views: [],
    };
  }

  return { tables: [], views: [] };
}

async function runPhase3b(
  enriched: EnrichedSchema,
  plan: GenerationOptions,
  dryRun: boolean
): Promise<{ generated: number; skipped: number; errors: number }> {
  console.log('\n' + '═'.repeat(60));
  console.log('📝 GAIA v2 - Phase 3b (Types)');
  console.log('═'.repeat(60));

  const { tables, views } = filterTablesAndViewsForTarget(
    enriched.tables.filter(t => t.shouldGenerateTypes),
    enriched.views.filter(v => v.shouldGenerateTypes),
    plan
  );

  const total = tables.length + views.length;
  if (total === 0) {
    console.log('\n⏭️  No type files to generate for this target.');
    return { generated: 0, skipped: 0, errors: 0 };
  }

  console.log(`\n📦 Generating ${total} type file(s)...`);

  const writeOptions: WriteOptions = {
    dryRun,
    force: plan.force,
    verbose: plan.verbose,
  };

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  // Tables
  for (const table of tables) {
    try {
      const object: ExtractedObjectWithDetails = {
        name: table.name,
        type: 'table',
        content: '',
        startLine: 0,
        endLine: 0,
        rowContent: table.rowContent,
        insertContent: table.insertContent,
        updateContent: table.updateContent,
        enumRefs: table.enumRefs,
        hasJson: table.hasJson,
      };

      const formatted = formatObjectTypes(object, table.category, {
        deityGroup: table.deityFolder,
        outputFolder: `generated/${table.deityFolder}`,
        verbose: plan.verbose,
      });

      const filePath = `src/types/generated/${table.deityFolder}/${table.name}.ts`;
      const writeResult = await writeGeneratedFile(
        filePath,
        formatted.fullContent,
        [`EnrichedTable:${table.name}`],
        writeOptions
      );

      if (writeResult.success && writeResult.action !== 'skipped') {
        generated++;
        if (plan.verbose) {
          console.log(`   ✅ ${writeResult.action}: ${writeResult.filePath}`);
        }
      } else if (writeResult.action === 'skipped') {
        skipped++;
        if (plan.verbose) {
          console.log(`   ⏭️  skipped: ${writeResult.filePath}`);
        }
      }
    } catch (error) {
      errors++;
      console.error(
        `   ❌ ${table.name}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  // Views
  for (const view of views) {
    try {
      const result = generateViewTypes(view);
      const writeResult = await writeGeneratedFile(
        result.filePath,
        result.content,
        [`EnrichedView:${view.name}`],
        writeOptions
      );

      if (writeResult.success && writeResult.action !== 'skipped') {
        generated++;
        if (plan.verbose) {
          console.log(`   ✅ ${writeResult.action}: ${writeResult.filePath}`);
        }
      } else if (writeResult.action === 'skipped') {
        skipped++;
        if (plan.verbose) {
          console.log(`   ⏭️  skipped: ${writeResult.filePath}`);
        }
      }
    } catch (error) {
      errors++;
      console.error(
        `   ❌ ${view.name}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  console.log(`\n📊 Phase 3b summary:`);
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped:   ${skipped}`);
  console.log(`   Errors:    ${errors}`);

  return { generated, skipped, errors };
}

// ============================================================================
// ENTRY POINT
// ============================================================================

async function main() {
  const { foundation, generation } = parseArgs();

  try {
    await runPhase0(foundation);
    const schema = await runPhase1();
    const enriched = await runPhase2(schema);
    const plan = await runGenerationGate(enriched, generation);
    const phase3aStats = await runPhase3a(enriched, plan, foundation.dryRun);
    const phase3bStats = await runPhase3b(enriched, plan, foundation.dryRun);

    console.log('\n' + '═'.repeat(60));
    console.log('✅ GAIA v2 Phases 0, 1, 2, 3a, and 3b complete');
    console.log(`   Tables: ${enriched.tables.length}`);
    console.log(`   Views:  ${enriched.views.length}`);
    console.log(`   Functions: ${enriched.functions.length}`);
    console.log(`   Runtime Enums: ${enriched.runtimeEnums.length}`);
    console.log(`\n   Phase 3a constants: ${phase3aStats.generated} generated, ${phase3aStats.skipped} skipped, ${phase3aStats.errors} errors`);
    console.log(`   Phase 3b types:     ${phase3bStats.generated} generated, ${phase3bStats.skipped} skipped, ${phase3bStats.errors} errors`);
    console.log('═'.repeat(60) + '\n');
  } catch (error) {
    console.error(
      `\n❌ GAIA v2 failed: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
}

main().catch(console.error);

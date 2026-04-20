// scripts/system/gaia/index.ts - THE ORCHESTRATOR (uses your helpers)
import { readDatabaseTypes } from '../../shared/file_reader.js';
import { findMarkers } from '../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../modules/system/find_closing_braces.js';
import { countAllCollections } from '../../modules/system/count_items.js';
import { extractObject } from '../../modules/extract/extract_object.js';
import { parseTableContent } from '../../modules/format/format_object_types.js';
import { formatObjectTypes } from '../../modules/format/format_object_types.js';
import { formatObjectConstants } from '../../modules/format/format_object_constants.js';
import { generateMultipleTypeFiles } from '../../modules/generate/generate_object_types.js';
import { generateMultipleConstantFiles } from '../../modules/generate/generate_object_constants.js';
import { ensureAllDirectories } from '../../modules/discover/discover_directories.js';
import { getObjectCategory } from '../../../config/object_categories.js';

import { getAllTableNames, getFolderNameForTable, DEITY_GROUPS } from '@/config/deity_groups.js';
import { logSuccess, logInfo, logError, logStep, logSeparator, logWarning, logDebug } from '../../shared/logger.js';

import * as readline from 'readline';

interface GaiaOptions {
  dryRun: boolean;
  verbose: boolean;
  target: 'all' | 'deity' | 'table';
  targetValue: string | null;
  interactive: boolean;
  force: boolean;
}

interface TableInfo {
  name: string;
  deityFolder: string;
  enumRefs: string[];
  hasJson: boolean;
  rowContent: string;
}

interface TableDependencies {
  enums: string[];
  needsValidator: boolean;
  needsApi: boolean;
  needsUtils: boolean;
  needsHooks: boolean;
}

// ============================================================================
// HELPERS
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
  logInfo('🌍 GAIA - Interactive Mode');
  logSeparator('═', 60);
  console.log('');
  
  console.log('What would you like to generate?');
  console.log('  1) Full schema (all tables)');
  console.log('  2) Single table');
  console.log('  3) Entire deity group');
  console.log('');
  
  const choice = await askUser('Enter choice (1-3): ');
  
  let target: 'all' | 'deity' | 'table' = 'all';
  let targetValue: string | null = null;
  
  if (choice === '2') {
    target = 'table';
    const allTables = getAllTableNames();
    console.log('\nAvailable tables:');
    console.log(`  ${allTables.slice(0, 20).join(', ')}${allTables.length > 20 ? '...' : ''}`);
    console.log(`  (${allTables.length} total tables)`);
    console.log('');
    targetValue = await askUser('Enter table name: ');
    
    if (!allTables.includes(targetValue)) {
      logWarning(`Table "${targetValue}" not found in deity_groups.ts`);
      const confirm = await askUser('Continue anyway? (y/N): ');
      if (confirm.toLowerCase() !== 'y') {
        process.exit(0);
      }
    }
    
  } else if (choice === '3') {
    target = 'deity';
    console.log('\nAvailable deity groups:');
    DEITY_GROUPS.forEach((g, i) => {
      console.log(`  ${i + 1}) ${g.name} (${g.folderName}) - ${g.tables.length} tables`);
    });
    console.log('');
    const deityChoice = await askUser('Enter deity name or number: ');
    
    const num = parseInt(deityChoice);
    if (!isNaN(num) && num >= 1 && num <= DEITY_GROUPS.length) {
      targetValue = DEITY_GROUPS[num - 1].folderName;
    } else {
      targetValue = deityChoice;
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

function parseOptions(): GaiaOptions {
  const args = process.argv.slice(2);
  const interactive = args.includes('--interactive') || args.includes('-i');
  const force = args.includes('--force') || args.includes('-f'); 

  if (interactive) {
    return { dryRun: false, verbose: false, force, target: 'all', targetValue: null, interactive: true };
  }
  
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const verbose = args.includes('--verbose') || args.includes('-v');
  
  let target: 'all' | 'deity' | 'table' = 'all';
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
  
  return { dryRun, verbose, force, target, targetValue, interactive: true };
}

function filterTableNames(options: GaiaOptions): string[] {
  const allTableNames = getAllTableNames();
  
  if (options.target === 'table' && options.targetValue) {
    if (allTableNames.includes(options.targetValue)) {
      return [options.targetValue];
    }
    logWarning(`Table "${options.targetValue}" not found`);
    return [];
  }
  
  if (options.target === 'deity' && options.targetValue) {
    const deityGroup = DEITY_GROUPS.find(
      g => g.folderName === options.targetValue || g.name === options.targetValue
    );
    if (deityGroup) {
      return deityGroup.tables;
    }
    logWarning(`Deity "${options.targetValue}" not found`);
    return [];
  }
  
  return allTableNames;
}

function extractRuntimeEnums(lines: string[], markers: any): Map<string, string[]> {
  const enums = new Map<string, string[]>();
  
  if (markers.constantsEnumsLine === -1 || markers.constantsEnumsEndLine === -1) {
    return enums;
  }
  
  const startIdx = markers.constantsEnumsLine - 1;
  const endIdx = markers.constantsEnumsEndLine - 1;
  const enumPattern = /^\s{6}(\w+):/;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(enumPattern);
    
    if (match) {
      const enumName = match[1];
      let fullLine = line;
      let j = i + 1;
      while (j <= endIdx && !fullLine.includes('],')) {
        fullLine += ' ' + lines[j];
        j++;
      }
      
      const bracketMatch = fullLine.match(/\[([\s\S]*?)\]/);
      if (bracketMatch) {
        const values = bracketMatch[1]
          .split(',')
          .map(v => v.trim().replace(/^["']|["']$/g, ''))
          .filter(v => v.length > 0);
        
        if (values.length > 0) {
          enums.set(enumName, values);
        }
      }
    }
  }
  
  return enums;
}

// ============================================================================
// PROCESS SINGLE TABLE AND ITS DEPENDENCIES
// ============================================================================

async function processTable(
  tableName: string,
  lines: string[],
  markers: any,
  runtimeEnums: Map<string, string[]>,
  options: GaiaOptions
): Promise<{ tableInfo: TableInfo; enumRefs: string[] }> {
  const { verbose } = options;
  
  if (verbose) logInfo(`\n  📦 Processing: ${tableName}`);
  
  // Extract table object
  const tableObj = extractObject(
    lines,
    markers.tablesLine,
    markers.tablesEndLine,
    tableName,
    { verbose }
  );
  
  if (!tableObj) {
    logError(`    Failed to extract ${tableName}`);
    return { tableInfo: null as any, enumRefs: [] };
  }
  
  // Parse table content to get enum references
  const parsed = parseTableContent(tableObj.content);
  const deityFolder = getFolderNameForTable(tableName) || 'hestia-core';
  
  const tableInfo: TableInfo = {
    name: tableName,
    deityFolder,
    enumRefs: parsed.enumRefs,
    hasJson: parsed.hasJson,
    rowContent: parsed.rowContent
  };
  
  if (verbose) {
    logSuccess(`    ✓ Extracted ${tableName}`);
    if (tableInfo.enumRefs.length > 0) {
      logDebug(`      Enums: ${tableInfo.enumRefs.join(', ')}`);
    }
  }
  
  return { tableInfo, enumRefs: tableInfo.enumRefs };
}

// ============================================================================
// GENERATE ALL ARTIFACTS FOR A TABLE (USING writeGeneratedFile)
// ============================================================================

import { writeGeneratedFile, type WriteOptions } from './writeGeneratedFile.js';
import { SystemLogger } from '@/scripts/shared/system_logger.js';

async function generateArtifactsForTable(
  tableInfo: TableInfo,
  tableObj: any,
  category: any,
  options: GaiaOptions,
  logger?: SystemLogger
): Promise<{ filesGenerated: string[]; errors: string[] }> {
  const { dryRun, verbose, force } = options;
  const filesGenerated: string[] = [];
  const errors: string[] = [];
  
  const writeOptions: WriteOptions = {
    dryRun,
    force,
    verbose,
    logger
  };
  
  if (verbose) logDebug(`\n    📝 Generating artifacts for ${tableInfo.name}`);
  
  // ====================================================
  // 1. GENERATE TYPE FILE
  // ====================================================
  
  try {
    const typeFormatted = formatObjectTypes(tableObj, category, {
      verbose,
      deityGroup: tableInfo.deityFolder,
      outputFolder: `generated/${tableInfo.deityFolder}`
    });
    
    const typePath = `src/types/generated/${tableInfo.deityFolder}/${tableInfo.name}.ts`;
    
    const writeResult = await writeGeneratedFile(
      typePath,
      typeFormatted.fullContent,
      [`Database.public.Tables.${tableInfo.name}`],
      writeOptions
    );
    
    if (writeResult.success) {
      filesGenerated.push(writeResult.filePath);
      if (verbose && writeResult.action !== 'skipped') {
        logSuccess(`      ✓ ${writeResult.action}: ${writeResult.filePath}`);
      }
    } else {
      errors.push(`types: ${writeResult.message}`);
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logError(`      ✗ Failed to generate types: ${errMsg}`);
    errors.push(`types: ${errMsg}`);
  }
  
  // ====================================================
  // 2. GENERATE VALIDATOR (if needed)
  // ====================================================
  
  const needsValidator = tableInfo.hasJson || tableInfo.enumRefs.length > 0;
  
  if (needsValidator) {
    try {
      // TODO: Generate validator content
      const validatorContent = generateValidatorContent(tableInfo);
      const validatorPath = `src/lib/validators/generated/${tableInfo.deityFolder}/${tableInfo.name}.ts`;
      
      const writeResult = await writeGeneratedFile(
        validatorPath,
        validatorContent,
        [`Database.public.Tables.${tableInfo.name}`],
        writeOptions
      );
      
      if (writeResult.success) {
        filesGenerated.push(writeResult.filePath);
        if (verbose && writeResult.action !== 'skipped') {
          logSuccess(`      ✓ ${writeResult.action}: ${writeResult.filePath}`);
        }
      } else {
        errors.push(`validator: ${writeResult.message}`);
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logError(`      ✗ Failed to generate validator: ${errMsg}`);
      errors.push(`validator: ${errMsg}`);
    }
  }
  
  // ====================================================
  // 3. GENERATE API ROUTES (if needed)
  // ====================================================
  
  const needsApi = category.generateApiGetList || category.generateApiPost;
  
  if (needsApi) {
    try {
      // Main API route (list + create)
      const mainApiContent = generateMainApiRoute(tableInfo);
      const mainApiPath = `src/app/api/generated/${tableInfo.deityFolder}/${tableInfo.name}/route.ts`;
      
      const mainWriteResult = await writeGeneratedFile(
        mainApiPath,
        mainApiContent,
        [`Database.public.Tables.${tableInfo.name}`],
        writeOptions
      );
      
      if (mainWriteResult.success) {
        filesGenerated.push(mainWriteResult.filePath);
        if (verbose && mainWriteResult.action !== 'skipped') {
          logSuccess(`      ✓ ${mainWriteResult.action}: ${mainWriteResult.filePath}`);
        }
      }
      
      // Single record API route (get/put/delete)
      const singleApiContent = generateSingleApiRoute(tableInfo);
      const singleApiPath = `src/app/api/generated/${tableInfo.deityFolder}/${tableInfo.name}/[id]/route.ts`;
      
      const singleWriteResult = await writeGeneratedFile(
        singleApiPath,
        singleApiContent,
        [`Database.public.Tables.${tableInfo.name}`],
        writeOptions
      );
      
      if (singleWriteResult.success) {
        filesGenerated.push(singleWriteResult.filePath);
        if (verbose && singleWriteResult.action !== 'skipped') {
          logSuccess(`      ✓ ${singleWriteResult.action}: ${singleWriteResult.filePath}`);
        }
      }
      
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logError(`      ✗ Failed to generate API routes: ${errMsg}`);
      errors.push(`api: ${errMsg}`);
    }
  }
  
  // ====================================================
  // 4. GENERATE UTILS (if needed)
  // ====================================================
  
  const needsUtils = category.generateUtils;
  
  if (needsUtils) {
    try {
      const utilsContent = generateUtilsContent(tableInfo);
      const utilsPath = `src/utils/generated/${tableInfo.deityFolder}/${tableInfo.name}.ts`;
      
      const writeResult = await writeGeneratedFile(
        utilsPath,
        utilsContent,
        [`Database.public.Tables.${tableInfo.name}`],
        writeOptions
      );
      
      if (writeResult.success) {
        filesGenerated.push(writeResult.filePath);
        if (verbose && writeResult.action !== 'skipped') {
          logSuccess(`      ✓ ${writeResult.action}: ${writeResult.filePath}`);
        }
      } else {
        errors.push(`utils: ${writeResult.message}`);
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logError(`      ✗ Failed to generate utils: ${errMsg}`);
      errors.push(`utils: ${errMsg}`);
    }
  }
  
  // ====================================================
  // 5. GENERATE HOOKS (if needed)
  // ====================================================
  
  const needsHooks = category.generateHooks;
  
  if (needsHooks) {
    try {
      const hooksContent = generateHooksContent(tableInfo);
      const hooksPath = `src/hooks/generated/${tableInfo.deityFolder}/${tableInfo.name}.ts`;
      
      const writeResult = await writeGeneratedFile(
        hooksPath,
        hooksContent,
        [`Database.public.Tables.${tableInfo.name}`],
        writeOptions
      );
      
      if (writeResult.success) {
        filesGenerated.push(writeResult.filePath);
        if (verbose && writeResult.action !== 'skipped') {
          logSuccess(`      ✓ ${writeResult.action}: ${writeResult.filePath}`);
        }
      } else {
        errors.push(`hooks: ${writeResult.message}`);
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logError(`      ✗ Failed to generate hooks: ${errMsg}`);
      errors.push(`hooks: ${errMsg}`);
    }
  }
  
  if (verbose && filesGenerated.length > 0) {
    logDebug(`      Generated ${filesGenerated.length} files for ${tableInfo.name}`);
  }
  
  return { filesGenerated, errors };
}

// ============================================================================
// CONTENT GENERATION FUNCTIONS (Placeholders - implement as needed)
// ============================================================================

function generateValidatorContent(tableInfo: TableInfo): string {
  const pascalName = tableInfo.name.split('_').map(p => p[0].toUpperCase() + p.slice(1)).join('');
  
  return `// =====================================================
// VALIDATOR: ${pascalName}
// DEITY: ${tableInfo.deityFolder}
// =====================================================

import { z } from 'zod';

export const ${pascalName}RowSchema = z.object({
  // TODO: Implement based on table schema
});

export const ${pascalName}InsertSchema = z.object({
  // TODO: Implement based on table schema
});

export const ${pascalName}UpdateSchema = z.object({
  // TODO: Implement based on table schema
});
`;
}

function generateMainApiRoute(tableInfo: TableInfo): string {
  const pascalName = tableInfo.name.split('_').map(p => p[0].toUpperCase() + p.slice(1)).join('');
  
  return `// =====================================================
// API ROUTE: /api/${tableInfo.deityFolder}/${tableInfo.name}
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from('${tableInfo.name}').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabase();
  const body = await request.json();
  const { data, error } = await supabase.from('${tableInfo.name}').insert(body).select().single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data }, { status: 201 });
}
`;
}

function generateSingleApiRoute(tableInfo: TableInfo): string {
  return `// =====================================================
// API ROUTE: /api/${tableInfo.deityFolder}/${tableInfo.name}/[id]
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from('${tableInfo.name}').select('*').eq('id', id).single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const body = await request.json();
  const { data, error } = await supabase.from('${tableInfo.name}').update(body).eq('id', id).select().single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { error } = await supabase.from('${tableInfo.name}').delete().eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data: { deleted: true } });
}
`;
}

function generateUtilsContent(tableInfo: TableInfo): string {
  const pascalName = tableInfo.name.split('_').map(p => p[0].toUpperCase() + p.slice(1)).join('');
  
  return `// =====================================================
// UTILITIES: ${pascalName}
// DEITY: ${tableInfo.deityFolder}
// =====================================================

import { createClient } from '@/lib/supabase/client';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${tableInfo.deityFolder}/${tableInfo.name}';

export async function create${pascalName}(data: ${pascalName}Insert) {
  const supabase = createClient();
  const { data: result, error } = await supabase.from('${tableInfo.name}').insert(data).select().single();
  if (error) throw error;
  return result;
}

export async function get${pascalName}(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('${tableInfo.name}').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function list${pascalName}() {
  const supabase = createClient();
  const { data, error } = await supabase.from('${tableInfo.name}').select('*');
  if (error) throw error;
  return data;
}

export async function update${pascalName}(id: string, data: ${pascalName}Update) {
  const supabase = createClient();
  const { data: result, error } = await supabase.from('${tableInfo.name}').update(data).eq('id', id).select().single();
  if (error) throw error;
  return result;
}

export async function delete${pascalName}(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('${tableInfo.name}').delete().eq('id', id);
  if (error) throw error;
  return true;
}
`;
}

function generateHooksContent(tableInfo: TableInfo): string {
  const pascalName = tableInfo.name.split('_').map(p => p[0].toUpperCase() + p.slice(1)).join('');
  const hookName = `use${pascalName}`;
  
  return `// =====================================================
// HOOK: ${hookName}
// DEITY: ${tableInfo.deityFolder}
// =====================================================

import { useState, useEffect } from 'react';
import type { ${pascalName}Row } from '@/types/generated/${tableInfo.deityFolder}/${tableInfo.name}';

export function ${hookName}(id?: string) {
  const [data, setData] = useState<${pascalName}Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    fetch(\`/api/${tableInfo.deityFolder}/${tableInfo.name}/\${id}\`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { data, loading, error, refetch: () => {} };
}

export function use${pascalName}List() {
  const [data, setData] = useState<${pascalName}Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(\`/api/${tableInfo.deityFolder}/${tableInfo.name}\`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error, refetch: () => {} };
}
`;
}

// ============================================================================
// SHOW GENERATION PLAN
// ============================================================================

async function showGenerationPlan(
  tablesToProcess: string[],
  runtimeEnums: Map<string, string[]>,
  options: GaiaOptions
): Promise<boolean> {
  console.log('\n');
  logSeparator('═', 60);
  logInfo('📋 GENERATION PLAN');
  logSeparator('═', 60);
  console.log('');
  
  logInfo(`📊 TABLES: ${tablesToProcess.length}`);
  if (options.verbose) {
    const byDeity = new Map<string, number>();
    for (const table of tablesToProcess) {
      const deity = getFolderNameForTable(table) || 'hestia-core';
      byDeity.set(deity, (byDeity.get(deity) || 0) + 1);
    }
    for (const [deity, count] of byDeity) {
      console.log(`     ${deity}: ${count} tables`);
    }
  }
  console.log('');
  
  logInfo(`🔢 ENUMS: ${runtimeEnums.size}`);
  if (options.verbose && runtimeEnums.size > 0) {
    const first10 = Array.from(runtimeEnums.keys()).slice(0, 10);
    console.log(`     ${first10.join(', ')}${runtimeEnums.size > 10 ? '...' : ''}`);
  }
  console.log('');
  
  logInfo(`📁 FILES TO GENERATE (estimated):`);
  console.log(`  ✅ Types: ${tablesToProcess.length} files`);
  console.log(`  ✅ Constants: ${runtimeEnums.size} files`);
  console.log(`  ⚠️ Validators: ${tablesToProcess.length} files (if needed)`);
  console.log(`  ⚠️ API Routes: ${tablesToProcess.length * 2} files (if full_crud)`);
  console.log(`  ⚠️ Utils: ${tablesToProcess.length} files (if configured)`);
  console.log(`  ⚠️ Hooks: ${tablesToProcess.length} files (if configured)`);
  console.log('');
  
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
      const fs = require('fs');
      const notesPath = `./gaia-notes-${Date.now()}.txt`;
      fs.writeFileSync(notesPath, notes.join('\n'));
      logInfo(`Notes saved to: ${notesPath}`);
    }
  }
  
  console.log('\n❌ Generation cancelled.');
  process.exit(0);
  return false;
}

// ============================================================================
// MAIN ORCHESTRATOR
// ============================================================================

async function runGaia(options: GaiaOptions) {
  const { dryRun, verbose, target, targetValue } = options;
  
  logSeparator('═', 60);
  logInfo('🌍 GAIA - Type Generator');
  logSeparator('═', 60);
  logInfo(`Mode: ${dryRun ? 'DRY RUN (preview only)' : 'WRITE MODE'}`);
  if (target === 'deity') logInfo(`Target: deity = ${targetValue}`);
  if (target === 'table') logInfo(`Target: table = ${targetValue}`);
  if (target === 'all') logInfo(`Target: ALL tables`);
  logSeparator('═', 60);
  console.log('');
  
  // PHASE 1: Read file
  logStep('📖 Reading database.types.ts');
  const { content, success } = readDatabaseTypes();
  if (!success) throw new Error('Failed to read database.types.ts');
  
  const lines = content.split('\n');
  logSuccess(`Read ${lines.length} lines`);
  
  // PHASE 2: Find markers
  logStep('🔍 Finding markers');
  const markers = findMarkers(lines, { verbose });
  const markersWithBraces = findAllClosingBraces(lines, markers, { verbose });
  
  // PHASE 3: Extract runtime enums (available for all tables)
  logStep('🔢 Extracting runtime enums');
  const runtimeEnums = extractRuntimeEnums(lines, markersWithBraces);
  logSuccess(`Found ${runtimeEnums.size} runtime enums`);
  
  // PHASE 4: Get table list based on target
  const tableNamesToProcess = filterTableNames(options);
  
  if (tableNamesToProcess.length === 0) {
    logError('No tables to process');
    return;
  }
  
  logInfo(`Processing ${tableNamesToProcess.length} tables`);
  
  // PHASE 5: Show generation plan and confirm
  const shouldProceed = await showGenerationPlan(tableNamesToProcess, runtimeEnums, options);
  if (!shouldProceed) return;
  
  // PHASE 6: Ensure directories exist
  logStep('📁 Ensuring directories exist');
  if (!dryRun) {
    ensureAllDirectories({ verbose });
  }
  
  // PHASE 7: Process each table and its dependencies
  logStep('📝 Processing tables (one at a time)');
  logSeparator('─', 40);
  
  const allTableInfo: TableInfo[] = [];
  let processed = 0;
  
  for (const tableName of tableNamesToProcess) {
    processed++;
    console.log('');
    logSeparator('─', 40);
    logInfo(`[${processed}/${tableNamesToProcess.length}] Table: ${tableName}`);
    logSeparator('─', 40);
    
    // Extract table and its dependencies
    const { tableInfo, enumRefs } = await processTable(tableName, lines, markersWithBraces, runtimeEnums, options);
    
    if (!tableInfo) continue;
    
    // Store for later
    allTableInfo.push(tableInfo);
    
    // Get category config
    const category = getObjectCategory('table', tableName);
    
    // Get the extracted object for formatting
    const tableObj = extractObject(
      lines,
      markersWithBraces.tablesLine,
      markersWithBraces.tablesEndLine,
      tableName,
      { verbose }
    );
    
    if (!tableObj) continue;
    
    // Generate all artifacts for this table
    await generateArtifactsForTable(tableInfo, tableObj, category, options);
    
    if (verbose) {
      logSuccess(`  ✓ Completed ${tableName}`);
    }
  }
  
  // PHASE 8: Generate constant files for all referenced enums
  logStep('\n🔢 Generating constant files for enums');
  
  // Collect all unique enums referenced across tables
  const allReferencedEnums = new Set<string>();
  for (const table of allTableInfo) {
    for (const enumRef of table.enumRefs) {
      allReferencedEnums.add(enumRef);
    }
  }
  
  logInfo(`Found ${allReferencedEnums.size} unique enums referenced by tables`);
  
  // Generate constants only for enums that were referenced
  if (!dryRun) {
    const constantsMap = new Map();
    for (const enumName of allReferencedEnums) {
      const values = runtimeEnums.get(enumName);
      if (values) {
        // Determine deity folder for enum (based on tables that reference it)
        let deityFolder = 'hestia-core';
        for (const table of allTableInfo) {
          if (table.enumRefs.includes(enumName)) {
            deityFolder = table.deityFolder;
            break;
          }
        }
        constantsMap.set(enumName, { values, folder: deityFolder });
      }
    }
    
    if (constantsMap.size > 0) {
      await generateMultipleConstantFiles(constantsMap, { verbose, dryRun: false });
      logSuccess(`Generated ${constantsMap.size} constant files`);
    }
  } else {
    logInfo('[DRY RUN] Would generate constant files for referenced enums');
  }
  
  // FINAL SUMMARY
  logSeparator('═', 60);
  logSuccess(`GAIA Complete!`);
  logInfo(`  Tables processed: ${allTableInfo.length}`);
  logInfo(`  Enums referenced: ${allReferencedEnums.size}`);
  if (dryRun) logInfo('  (Dry run - no files were written)');
  logSeparator('═', 60);
  
  return { processedTables: allTableInfo, referencedEnums: allReferencedEnums };
}

// ============================================================================
// MAIN ENTRY
// ============================================================================

async function main() {
  let options = parseOptions();
  
  if (options.interactive) {
    options = await getInteractiveOptions();
  }
  
  await runGaia(options);
}

main().catch(console.error);

export { runGaia, type TableInfo };
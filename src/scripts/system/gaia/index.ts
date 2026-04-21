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
/**
 * Convert snake_case to PascalCase for type names
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}


/**
 * Generate runtime schema using Zod's native inference from the actual type
 * This requires importing the actual type at runtime
 */


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
// VALIDATOR GENERATOR - Using Runtime Type Information
// ============================================================================

function generateValidatorContent(tableInfo: TableInfo): string {
  const pascalName = toPascalCase(tableInfo.name);
  
  // Build the complete Zod schema based on parsed table content
  const zodFields = buildZodFields(tableInfo.name, tableInfo.enumRefs);
  
  return `// =====================================================
// VALIDATOR: ${pascalName}
// DEITY: ${tableInfo.deityFolder}
// GENERATED: ${new Date().toISOString()}
// =====================================================
// NOTE: Runtime validation using Zod with database type inference
// =====================================================

import { z } from 'zod';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${tableInfo.deityFolder}/${tableInfo.name}';

// Import runtime enums for validation
import { 
  ${tableInfo.enumRefs.map(e => e.toUpperCase()).join(', ')} 
} from '@/lib/constants/generated/${tableInfo.deityFolder}';

// =====================================================
// FIELD VALIDATION SCHEMAS
// =====================================================

${zodFields}

// =====================================================
// ROW SCHEMA (full database row)
// =====================================================

export const ${pascalName}RowSchema = z.object({
${generateRowFields(tableInfo.rowContent)}
});

// =====================================================
// INSERT SCHEMA (for creation - optional fields)
// =====================================================

export const ${pascalName}InsertSchema = z.object({
${generateInsertFields(tableInfo.rowContent)}
});

// =====================================================
// UPDATE SCHEMA (for updates - all optional)
// =====================================================

export const ${pascalName}UpdateSchema = z.object({
${generateUpdateFields(tableInfo.rowContent)}
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ${pascalName}RowInput = z.infer<typeof ${pascalName}RowSchema>;
export type ${pascalName}InsertInput = z.infer<typeof ${pascalName}InsertSchema>;
export type ${pascalName}UpdateInput = z.infer<typeof ${pascalName}UpdateSchema>;

// =====================================================
// VALIDATION HELPERS
// =====================================================

export function validate${pascalName}Row(data: unknown): ${pascalName}RowInput {
  return ${pascalName}RowSchema.parse(data);
}

export function validate${pascalName}Insert(data: unknown): ${pascalName}InsertInput {
  return ${pascalName}InsertSchema.parse(data);
}

export function validate${pascalName}Update(data: unknown): ${pascalName}UpdateInput {
  return ${pascalName}UpdateSchema.parse(data);
}

export function safeValidate${pascalName}Insert(data: unknown): {
  success: boolean;
  data?: ${pascalName}InsertInput;
  error?: z.ZodError;
} {
  const result = ${pascalName}InsertSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
`;
}

// ============================================================================
// HELPER FUNCTIONS FOR BUILDING ZOD SCHEMAS
// ============================================================================

function buildZodFields(rowContent: string, enumRefs: string[]): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  
  for (const line of lines) {
    const match = line.match(/^\s*(\w+):\s*(.+?)(;?)$/);
    if (match) {
      const fieldName = match[1];
      let fieldType = match[2].trim();
      const isNullable = fieldType.includes(' | null');
      
      // Clean up type
      fieldType = fieldType.replace(' | null', '').trim();
      
      let zodType = '';
      
      // Handle different type mappings
      if (fieldType === 'string') {
        zodType = 'z.string()';
        if (fieldName === 'email') zodType = 'z.string().email()';
        if (fieldName === 'username') zodType = 'z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/)';
      } else if (fieldType === 'number') {
        zodType = 'z.number()';
      } else if (fieldType === 'boolean') {
        zodType = 'z.boolean()';
      } else if (fieldType === 'Json') {
        zodType = 'z.any()';
      } else if (enumRefs.some(ref => fieldType.includes(ref))) {
        // Find which enum it is
        const enumRef = enumRefs.find(ref => fieldType.includes(ref));
        if (enumRef) {
          zodType = `z.enum(Object.values(${enumRef.toUpperCase()}))`;
        } else {
          zodType = 'z.string()';
        }
      } else {
        zodType = 'z.any()';
      }
      
      if (isNullable) {
        zodType = `${zodType}.nullable()`;
      }
      
      fields.push(`  ${fieldName}: ${zodType},`);
    }
  }
  
  return fields.join('\n');
}

function generateRowFields(rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  
  for (const line of lines) {
    const match = line.match(/^\s*(\w+):\s*(.+?)(;?)$/);
    if (match) {
      const fieldName = match[1];
      let fieldType = match[2].trim();
      const isNullable = fieldType.includes(' | null');
      
      fieldType = fieldType.replace(' | null', '').trim();
      
      let zodType = '';
      
      if (fieldType === 'string') {
        zodType = 'z.string()';
        if (fieldName === 'email') zodType = 'z.string().email()';
      } else if (fieldType === 'number') {
        zodType = 'z.number()';
      } else if (fieldType === 'boolean') {
        zodType = 'z.boolean()';
      } else if (fieldType === 'Json') {
        zodType = 'z.any()';
      } else if (fieldType.includes('Enums')) {
        zodType = 'z.string()';
      } else {
        zodType = 'z.any()';
      }
      
      if (isNullable) {
        zodType = `${zodType}.nullable()`;
      }
      
      fields.push(`  ${fieldName}: ${zodType},`);
    }
  }
  
  return fields.join('\n');
}

function generateInsertFields(rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  
  for (const line of lines) {
    const match = line.match(/^\s*(\w+):\s*(.+?)(;?)$/);
    if (match) {
      const fieldName = match[1];
      let fieldType = match[2].trim();
      const isNullable = fieldType.includes(' | null');
      
      fieldType = fieldType.replace(' | null', '').trim();
      
      let zodType = '';
      
      // For insert, id and email are required, others optional
      if (fieldName === 'id' || fieldName === 'email') {
        if (fieldType === 'string') {
          zodType = fieldName === 'email' ? 'z.string().email()' : 'z.string().uuid()';
        } else {
          zodType = 'z.string()';
        }
      } else {
        if (fieldType === 'string') {
          zodType = 'z.string()';
        } else if (fieldType === 'number') {
          zodType = 'z.number()';
        } else if (fieldType === 'boolean') {
          zodType = 'z.boolean()';
        } else if (fieldType === 'Json') {
          zodType = 'z.any()';
        } else {
          zodType = 'z.any()';
        }
        
        if (isNullable) {
          zodType = `${zodType}.nullable()`;
        }
        zodType = `${zodType}.optional()`;
      }
      
      fields.push(`  ${fieldName}: ${zodType},`);
    }
  }
  
  return fields.join('\n');
}

function generateUpdateFields(rowContent: string): string {
  const lines = rowContent.split('\n');
  const fields: string[] = [];
  
  for (const line of lines) {
    const match = line.match(/^\s*(\w+):\s*(.+?)(;?)$/);
    if (match) {
      const fieldName = match[1];
      let fieldType = match[2].trim();
      const isNullable = fieldType.includes(' | null');
      
      fieldType = fieldType.replace(' | null', '').trim();
      
      let zodType = '';
      
      if (fieldType === 'string') {
        zodType = 'z.string()';
      } else if (fieldType === 'number') {
        zodType = 'z.number()';
      } else if (fieldType === 'boolean') {
        zodType = 'z.boolean()';
      } else if (fieldType === 'Json') {
        zodType = 'z.any()';
      } else {
        zodType = 'z.any()';
      }
      
      if (isNullable) {
        zodType = `${zodType}.nullable()`;
      }
      zodType = `${zodType}.optional()`;
      
      fields.push(`  ${fieldName}: ${zodType},`);
    }
  }
  
  return fields.join('\n');
}

function generateMainApiRoute(tableInfo: TableInfo): string {
  const pascalName = toPascalCase(tableInfo.name);
  const hasEmail = tableInfo.rowContent.includes('email:');
  const hasCreatedBy = tableInfo.rowContent.includes('created_by:');
  
  // Build imports
  const imports = new Set<string>();
  imports.add(`import { NextRequest, NextResponse } from 'next/server';`);
  imports.add(`import { createServerSupabase } from '@/lib/supabase/server';`);
  imports.add(`import { ${pascalName}InsertSchema } from '@/lib/validators/generated/${tableInfo.deityFolder}/${tableInfo.name}';`);
  
  // Add enum imports if needed
  for (const enumRef of tableInfo.enumRefs) {
    imports.add(`import { ${enumRef.toUpperCase()} } from '@/lib/constants/generated/${tableInfo.deityFolder}/${enumRef}';`);
  }
  
  const importBlock = Array.from(imports).sort().join('\n');
  
  return `// =====================================================
// API ROUTE: /api/generated/${tableInfo.deityFolder}/${tableInfo.name}
// =====================================================

${importBlock}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = supabase.from('${tableInfo.name}').select('*', { count: 'exact' });
    
    // Apply filters with enum validation if needed
    for (const [key, value] of searchParams.entries()) {
      if (!['limit', 'offset', 'sort', 'order'].includes(key)) {
        // Check if this field is an enum
        const isEnumField = ${JSON.stringify(tableInfo.enumRefs)}.some(ref => 
          key === ref || key.endsWith('_' + ref)
        );
        if (isEnumField) {
          // Validate enum value before applying filter
          const enumValues = ${tableInfo.enumRefs.map(e => `${e.toUpperCase()}`).join(', ')};
          if (Object.values(enumValues).includes(value)) {
            query = query.eq(key, value);
          }
        } else {
          query = query.eq(key, value);
        }
      }
    }
    
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') === 'asc';
    query = query.order(sort, { ascending: order });
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    if (error) throw error;
    
    // Remove email for non-owners if present
    const { data: { user } } = await supabase.auth.getUser();
    const sanitizedData = data?.map(item => {
      if (${hasEmail} && item.email && item.id !== user?.id) {
        const { email, ...rest } = item;
        return rest;
      }
      return item;
    });
    
    return NextResponse.json({
      success: true,
      data: sanitizedData,
      pagination: { limit, offset, total: count || 0 }
    });
  } catch (error) {
    console.error('Error fetching ${tableInfo.name}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ${tableInfo.name}' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const body = await request.json();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const validated = ${pascalName}InsertSchema.parse(body);
    
    const insertData = ${hasCreatedBy} 
      ? { ...validated, created_by: user.id }
      : validated;
    
    const { data, error } = await supabase
      .from('${tableInfo.name}')
      .insert(insertData)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating ${tableInfo.name}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create ${tableInfo.name}' },
      { status: 500 }
    );
  }
}
`;
}

function generateSingleApiRoute(tableInfo: TableInfo): string {
  const pascalName = tableInfo.name.split('_').map(p => p[0].toUpperCase() + p.slice(1)).join('');
  
  // COLLECT IMPORTS FIRST
  const imports = new Set<string>();
  imports.add(`import { NextRequest, NextResponse } from 'next/server';`);
  imports.add(`import { createServerSupabase } from '@/lib/supabase/server';`);
  imports.add(`import { ${pascalName}UpdateSchema } from '@/lib/validators/generated/${tableInfo.deityFolder}/${tableInfo.name}';`);
  
  // BUILD IMPORT BLOCK
  const importBlock = Array.from(imports).sort().join('\n');
  
  return `// =====================================================
// API ROUTE: /api/generated/${tableInfo.deityFolder}/${tableInfo.name}/[id]
// =====================================================

${importBlock}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    
    const { data, error } = await supabase
      .from('${tableInfo.name}')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '${tableInfo.name} not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    // Remove email for non-owners (customize as needed)
    const { data: { user } } = await supabase.auth.getUser();
    const isOwner = user?.id === data.id;
    
    if (!isOwner && data.email) {
      const { email, ...rest } = data;
      return NextResponse.json({ success: true, data: rest });
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching ${tableInfo.name}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ${tableInfo.name}' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    const body = await request.json();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check ownership
    const { data: existing } = await supabase
      .from('${tableInfo.name}')
      .select('created_by')
      .eq('id', id)
      .single();
    
    if (existing && existing.created_by !== user.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (!profile?.is_admin) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    
    const validated = ${pascalName}UpdateSchema.parse(body);
    
    const { data, error } = await supabase
      .from('${tableInfo.name}')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '${tableInfo.name} not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating ${tableInfo.name}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update ${tableInfo.name}' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check ownership
    const { data: existing } = await supabase
      .from('${tableInfo.name}')
      .select('created_by')
      .eq('id', id)
      .single();
    
    if (existing && existing.created_by !== user.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (!profile?.is_admin) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    
    const { error } = await supabase
      .from('${tableInfo.name}')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '${tableInfo.name} not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting ${tableInfo.name}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete ${tableInfo.name}' },
      { status: 500 }
    );
  }
}
`;
}

function generateUtilsContent(tableInfo: TableInfo): string {
  const pascalName = toPascalCase(tableInfo.name);
  const hasCreatedBy = tableInfo.rowContent.includes('created_by:');
  
  return `// =====================================================
// UTILITIES: ${pascalName}
// DEITY: ${tableInfo.deityFolder}
// =====================================================

import { createClient } from '@/lib/supabase/client';
import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${tableInfo.deityFolder}/${tableInfo.name}';
import { ${pascalName}InsertSchema, ${pascalName}UpdateSchema } from '@/lib/validators/generated/${tableInfo.deityFolder}/${tableInfo.name}';

export async function create${pascalName}(data: ${pascalName}Insert): Promise<${pascalName}Row> {
  const validated = ${pascalName}InsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('${tableInfo.name}')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function get${pascalName}(id: string): Promise<${pascalName}Row> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('${tableInfo.name}')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function list${pascalName}(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ${pascalName}Row[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('${tableInfo.name}').select('*', { count: 'exact' });
  
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  
  query = query.order(sort, { ascending: order === 'asc' });
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  if (error) throw error;
  
  return { data: data || [], total: count || 0 };
}

export async function update${pascalName}(id: string, data: ${pascalName}Update): Promise<${pascalName}Row> {
  const validated = ${pascalName}UpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('${tableInfo.name}')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function delete${pascalName}(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('${tableInfo.name}')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
`;
}


function generateHooksContent(tableInfo: TableInfo): string {
  const pascalName = toPascalCase(tableInfo.name);
  const hasPagination = true; // All tables benefit from pagination
  const hasFilters = tableInfo.enumRefs.length > 0 || tableInfo.hasJson;
  
  return `// =====================================================
// HOOK: use${pascalName}
// DEITY: ${tableInfo.deityFolder}
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import type { ${pascalName}Row } from '@/types/generated/${tableInfo.deityFolder}/${tableInfo.name}';

${hasFilters ? `// Import enums for filter validation
import { 
  ${tableInfo.enumRefs.map(e => e.toUpperCase()).join(', ')} 
} from '@/lib/constants/generated/${tableInfo.deityFolder}';
` : ''}

export interface ${pascalName}Filters {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
${tableInfo.enumRefs.map(e => `  ${e}?: ${toPascalCase(e)};`).join('\n')}
}

export function use${pascalName}(id?: string) {
  const [data, setData] = useState<${pascalName}Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(\`/api/generated/${tableInfo.deityFolder}/${tableInfo.name}/\${id}\`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function use${pascalName}List(filters?: ${pascalName}Filters) {
  const [data, setData] = useState<${pascalName}Row[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (filters?.page) searchParams.set('page', String(filters.page));
      if (filters?.limit) searchParams.set('limit', String(filters.limit));
      if (filters?.sort) searchParams.set('sort', filters.sort);
      if (filters?.order) searchParams.set('order', filters.order);
      
      // Add enum filters with validation
      ${tableInfo.enumRefs.map(e => `
      if (filters?.${e}) {
        const validValues = Object.values(${e.toUpperCase()});
        if (validValues.includes(filters.${e})) {
          searchParams.set('${e}', filters.${e});
        }
      }`).join('\n')}
      
      const url = \`/api/generated/${tableInfo.deityFolder}/${tableInfo.name}?\${searchParams.toString()}\`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data.data || result.data || []);
        setTotal(result.data.pagination?.total || result.data.length || 0);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, loading, error, refetch: fetchData };
}

// Mutation hooks
export function useCreate${pascalName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ${pascalName}Insert) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generated/${tableInfo.deityFolder}/${tableInfo.name}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useUpdate${pascalName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, data: ${pascalName}Update) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(\`/api/generated/${tableInfo.deityFolder}/${tableInfo.name}/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

export function useDelete${pascalName}() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(\`/api/generated/${tableInfo.deityFolder}/${tableInfo.name}/\${id}\`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { delete: deleteRecord, loading, error };
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
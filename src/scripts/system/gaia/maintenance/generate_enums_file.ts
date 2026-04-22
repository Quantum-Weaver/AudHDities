// src/scripts/system/gaia/maintenance/generate_enums_file.ts
// ============================================================================
// GENERATE ENUMS.HELPERS.TS - Standalone script
// ============================================================================
// Purpose: Generate runtime enum helpers using existing extraction utilities
// Output: src/types/supabase/enums.helpers.ts
// Usage: tsx src/scripts/system/gaia/maintenance/generate_enums_file.ts [--dry-run] [--force] [--verbose]
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

// Use existing shared utilities
import { readDatabaseTypes } from '../../../shared/file_reader.js';
import { findMarkers } from '../../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../../modules/system/find_closing_braces.js';
import { extractRuntimeEnums } from '../extract/extract_runtime_enums.js';
import { logInfo, logSuccess, logError, logWarning, logDebug } from '../../../shared/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../../../..');

// ============================================================================
// PATHS
// ============================================================================

const OUTPUT_PATH = path.join(PROJECT_ROOT, 'types/supabase/enums.ts');

// ============================================================================
// TYPES
// ============================================================================

interface WriteOptions {
  dryRun: boolean;
  force: boolean;
  verbose: boolean;
}

interface WriteResult {
  success: boolean;
  filePath: string;
  action: 'created' | 'updated' | 'skipped' | 'dryrun' | 'error';
  message: string;
  fileHash?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function generateContentHash(content: string): string {
  return createHash('sha256').update(content, 'utf-8').digest('hex');
}

function contentHasChanged(existingPath: string, newContent: string): boolean {
  if (!fs.existsSync(existingPath)) return true;
  const existingContent = fs.readFileSync(existingPath, 'utf-8');
  return generateContentHash(existingContent) !== generateContentHash(newContent);
}

// ============================================================================
// EXTRACT ENUMS USING EXISTING UTILITIES
// ============================================================================

async function extractAllRuntimeEnums(verbose: boolean): Promise<Array<{ name: string; values: string[] }>> {
  // Step 1: Read the file using the robust file reader
  logInfo('Reading database.types.ts...');
  const fileResult = readDatabaseTypes();
  
  if (!fileResult.success) {
    throw new Error(`Failed to read database.types.ts: ${fileResult.error}`);
  }
  
  if (verbose) {
    logSuccess(`File read successfully (${fileResult.encoding}, ${fileResult.bomType} BOM)`);
  }
  
  const lines = fileResult.content.split('\n');
  
  // Step 2: Find markers
  logInfo('Finding markers...');
  const markers = findMarkers(lines, { verbose });
  
  if (markers.constantsEnumsLine === -1) {
    logWarning('Constants.Enums section not found');
    return [];
  }
  
  // Step 3: Find closing braces
  const markersWithBraces = findAllClosingBraces(lines, markers, { verbose });
  
  if (markersWithBraces.constantsEnumsEndLine === -1) {
    logWarning('Could not find closing brace for Constants.Enums');
    return [];
  }
  
  // Step 4: Extract runtime enums using the existing utility
  logInfo('Extracting runtime enums...');
  const runtimeEnums = await extractRuntimeEnums(
    lines,
    markersWithBraces.constantsEnumsLine,
    markersWithBraces.constantsEnumsEndLine,
    { verbose }
  );
  
  if (verbose) {
    logSuccess(`Extracted ${runtimeEnums.length} runtime enums`);
  }
  
  // Convert to simple format
  return runtimeEnums.map(e => ({
    name: e.name,
    values: e.values
  }));
}

// ============================================================================
// GENERATE ENUMS.HELPERS.TS CONTENT
// ============================================================================

function generateEnumsContent(enums: Array<{ name: string; values: string[] }>): string {
  const timestamp = new Date().toISOString();
  
  const lines = [
    '// =====================================================',
    '// GENERATED ENUMS HELPER - DO NOT EDIT MANUALLY',
    '// =====================================================',
    `// Generated: ${timestamp}`,
    '// Source: database.types.ts Constants.Enums',
    '// Purpose: Runtime enum values and type-safe helpers',
    '// =====================================================',
    '',
    'import type { Database } from \'./database.types\';',
    'import type { Enums } from \'./database.helpers\';',
    '',
    '// =====================================================',
    '// TYPE EXPORTS (using database.helpers)',
    '// =====================================================',
    '',
  ];
  
  // Export all enum types using the Enums<> helper
  for (const enumItem of enums) {
    const pascalName = toPascalCase(enumItem.name);
    lines.push(`export type ${pascalName} = Enums<'${enumItem.name}'>;`);
  }
  
  lines.push('');
  lines.push('// =====================================================');
  lines.push('// RUNTIME ENUM VALUES');
  lines.push('// =====================================================');
  lines.push('');
  lines.push('export const ENUM_VALUES = {');
  
  for (const enumItem of enums) {
    const camelName = toPascalCase(enumItem.name).charAt(0).toLowerCase() + toPascalCase(enumItem.name).slice(1);
    const valuesStr = enumItem.values.map(v => `'${v}'`).join(', ');
    lines.push(`  ${camelName}: [${valuesStr}] as const,`);
  }
  
  lines.push('} as const;');
  lines.push('');
  lines.push('// =====================================================');
  lines.push('// TYPE-SAFE VALIDATION HELPERS');
  lines.push('// =====================================================');
  lines.push('');
  
  // Generate type-safe validation functions
  for (const enumItem of enums) {
    const pascalName = toPascalCase(enumItem.name);
    const camelName = pascalName.charAt(0).toLowerCase() + pascalName.slice(1);
    lines.push(`export function isValid${pascalName}(value: string): value is ${pascalName} {`);
    lines.push(`  return ENUM_VALUES.${camelName}.includes(value as any);`);
    lines.push(`}`);
    lines.push('');
  }
  
  lines.push('// =====================================================');
  lines.push('// DISPLAY NAME HELPERS');
  lines.push('// =====================================================');
  lines.push('');
  
  // Generate display helpers for common enums
  const displayHelpers = [
    { pattern: /house/i, name: 'House' },
    { pattern: /product_type/i, name: 'ProductType' },
    { pattern: /contribution_type/i, name: 'ContributionType' },
    { pattern: /acid_persona/i, name: 'AcidPersona' },
    { pattern: /report_type/i, name: 'ReportType' },
    { pattern: /report_status/i, name: 'ReportStatus' },
    { pattern: /notification_type/i, name: 'NotificationType' },
    { pattern: /business_type/i, name: 'BusinessType' },
    { pattern: /user_tier/i, name: 'UserTier' },
    { pattern: /council_house/i, name: 'CouncilHouse' },
  ];
  
  for (const helper of displayHelpers) {
    const matchingEnum = enums.find(e => e.name.match(helper.pattern));
    if (matchingEnum) {
      const pascalName = toPascalCase(matchingEnum.name);
      lines.push(`export function get${helper.name}Display(value: ${pascalName} | string | null): string {`);
      lines.push(`  if (!value) return '';`);
      lines.push(`  return value.split('_').map(word =>`);
      lines.push(`    word.charAt(0).toUpperCase() + word.slice(1)`);
      lines.push(`  ).join(' ');`);
      lines.push(`}`);
      lines.push('');
    }
  }
  
  lines.push('// =====================================================');
  lines.push('// ALL ENUM NAMES (for iteration)');
  lines.push('// =====================================================');
  lines.push('');
  lines.push(`export const ALL_ENUM_NAMES = [`);

  for (const enumItem of enums) {
    lines.push(`  '${enumItem.name}',`);
  }
  
  lines.push('] as const;');
  lines.push('');
  lines.push('export type EnumName = typeof ALL_ENUM_NAMES[number];');
  
  return lines.join('\n');
}

// ============================================================================
// WRITE FILE
// ============================================================================

async function writeEnumsFile(
  content: string,
  options: WriteOptions
): Promise<WriteResult> {
  const { dryRun, force, verbose } = options;
  const fullPath = OUTPUT_PATH;
  const dir = path.dirname(fullPath);
  
  const exists = fs.existsSync(fullPath);
  
  if (dryRun) {
    if (verbose) {
      console.log(`[DRY RUN] Would write to: ${fullPath}`);
      console.log(`  Content length: ${content.length} characters`);
    }
    return {
      success: true,
      filePath: fullPath,
      action: 'dryrun',
      message: `Would write to ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!exists) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) console.log(`✅ Created: ${fullPath}`);
    return {
      success: true,
      filePath: fullPath,
      action: 'created',
      message: `Created ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  const hasChanged = contentHasChanged(fullPath, content);
  
  if (!hasChanged) {
    if (verbose) console.log(`⏭️  Unchanged: ${fullPath}`);
    return {
      success: true,
      filePath: fullPath,
      action: 'skipped',
      message: `Unchanged: ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  if (force) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) console.log(`⚠️  Overwrote (forced): ${fullPath}`);
    return {
      success: true,
      filePath: fullPath,
      action: 'updated',
      message: `Overwrote ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  if (verbose) {
    console.log(`⚠️  Skipped (would overwrite): ${fullPath}`);
    console.log(`   Use --force to overwrite existing files`);
  }
  
  return {
    success: false,
    filePath: fullPath,
    action: 'skipped',
    message: `Skipped ${fullPath} (would overwrite)`,
    fileHash: generateContentHash(content)
  };
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function generateEnumsFile(options: WriteOptions): Promise<{
  success: boolean;
  enumsCount: number;
  filePath: string;
  action: string;
  message: string;
}> {
  const { verbose = false } = options;
  
  console.log('\n📦 Generating enums.helpers.ts using existing utilities...\n');
  
  try {
    // Extract enums using the proven pipeline
    const enums = await extractAllRuntimeEnums(verbose);
    
    if (enums.length === 0) {
      console.warn('⚠️ No runtime enums found');
      return {
        success: false,
        enumsCount: 0,
        filePath: OUTPUT_PATH,
        action: 'skipped',
        message: 'No enums found to generate'
      };
    }
    
    if (verbose) {
      console.log(`\n   Found ${enums.length} runtime enums:`);
      for (const e of enums.slice(0, 10)) {
        console.log(`     - ${e.name} (${e.values.length} values)`);
      }
      if (enums.length > 10) console.log(`     ... and ${enums.length - 10} more`);
    }
    
    // Generate content
    const content = generateEnumsContent(enums);
    
    // Write the file
    const writeResult = await writeEnumsFile(content, options);
    
    console.log(`\n✅ ${writeResult.message}`);
    console.log(`   ${enums.length} enums exported`);
    
    return {
      success: writeResult.success,
      enumsCount: enums.length,
      filePath: OUTPUT_PATH,
      action: writeResult.action,
      message: writeResult.message
    };
    
  } catch (error) {
    console.error(`\n❌ Error generating enums.helpers.ts:`, error);
    return {
      success: false,
      enumsCount: 0,
      filePath: OUTPUT_PATH,
      action: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const force = args.includes('--force') || args.includes('-f');
  const verbose = args.includes('--verbose') || args.includes('-v');
  
  console.log('\n' + '='.repeat(60));
  console.log('🌍 GAIA - Enum Helpers Generator');
  console.log('='.repeat(60));
  
  if (dryRun) console.log('\n⚠️  DRY RUN MODE - No files will be written');
  if (force) console.log('\n⚠️  FORCE MODE - Will overwrite existing files');
  
  const result = await generateEnumsFile({ dryRun, force, verbose });
  
  console.log('\n' + '='.repeat(60));
  if (result.success) {
    console.log(`✅ Success: ${result.message}`);
  } else {
    console.log(`❌ Failed: ${result.message}`);
    process.exit(1);
  }
  console.log('='.repeat(60) + '\n');
}

// Run directly
main().catch(console.error);

export { generateEnumsFile };
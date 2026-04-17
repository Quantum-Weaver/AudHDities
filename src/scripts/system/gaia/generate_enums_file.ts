// src/scripts/system/gaia/generate_enums_file.ts
// ============================================================================
// GENERATE ENUMS.TS - Standalone script
// ============================================================================
// Purpose: Extract runtime enums from database.types.ts Constants.Enums
// Output: src/types/supabase/enums.ts
// Behavior: Idempotent - only writes when content changes
// Usage: tsx src/scripts/system/gaia/generate_enums_file.ts [--dry-run] [--force] [--verbose]
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// ============================================================================
// PATHS
// ============================================================================

const DB_TYPES_PATH = path.join(PROJECT_ROOT, 'src/types/supabase/database.types.ts');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'src/types/supabase/enums.ts');

// ============================================================================
// TYPES
// ============================================================================

interface RuntimeEnum {
  name: string;           // Original snake_case name from database
  values: string[];
}

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
// EXTRACT RUNTIME ENUMS
// ============================================================================

function extractRuntimeEnums(): RuntimeEnum[] {
  if (!fs.existsSync(DB_TYPES_PATH)) {
    throw new Error(`Database types file not found: ${DB_TYPES_PATH}`);
  }

  const content = fs.readFileSync(DB_TYPES_PATH, 'utf-8');
  
  // Find the Constants.Enums section
  const constantsMatch = content.match(/export const Constants = \{\s*[\s\S]*?Enums:\s*\{([\s\S]*?)\}\s*\}/);
  
  if (!constantsMatch) {
    console.warn('⚠️ Constants.Enums section not found in database.types.ts');
    return [];
  }

  const enumsSection = constantsMatch[1];
  const enums: RuntimeEnum[] = [];
  
  // Match pattern: "enum_name: [ "value1", "value2", ... ],"
  const enumPattern = /(\w+):\s*\[([\s\S]*?)\],/g;
  let match;
  
  while ((match = enumPattern.exec(enumsSection)) !== null) {
    const enumName = match[1];
    const valuesString = match[2];
    
    // Extract values from array
    const values: string[] = [];
    const valuePattern = /"([^"]+)"/g;
    let valueMatch;
    
    while ((valueMatch = valuePattern.exec(valuesString)) !== null) {
      values.push(valueMatch[1]);
    }
    
    if (values.length > 0) {
      enums.push({
        name: enumName,
        values,
      });
    }
  }
  
  return enums;
}

// ============================================================================
// GENERATE ENUMS.TS CONTENT
// ============================================================================

function generateEnumsContent(enums: RuntimeEnum[]): string {
  const timestamp = new Date().toISOString();
  
  const lines = [
    '// =====================================================',
    '// GENERATED ENUMS FILE - DO NOT EDIT MANUALLY',
    '// =====================================================',
    `// Generated: ${timestamp}`,
    '// Source: database.types.ts Constants.Enums',
    '// =====================================================',
    '',
    'import type { Database } from \'./database.types\';',
    '',
    '// =====================================================',
    '// TYPE EXPORTS (from Database)',
    '// =====================================================',
    '',
  ];
  
  // Export all enum types from Database
  for (const enumItem of enums) {
    const pascalName = toPascalCase(enumItem.name);
    lines.push(`export type ${pascalName} = Database['public']['Enums']['${enumItem.name}'];`);
  }
  
  lines.push('');
  lines.push('// =====================================================');
  lines.push('// RUNTIME ENUM VALUES');
  lines.push('// =====================================================');
  lines.push('');
  lines.push('export const ENUM_VALUES = {');
  
  for (const enumItem of enums) {
    const camelName = toPascalCase(enumItem.name).charAt(0).toLowerCase() + toPascalCase(enumItem.name).slice(1);
    const valuesStr = enumItem.values.map(v => `"${v}"`).join(', ');
    lines.push(`  ${camelName}: [${valuesStr}] as const,`);
  }
  
  lines.push('} as const;');
  lines.push('');
  lines.push('// =====================================================');
  lines.push('// VALIDATION HELPERS');
  lines.push('// =====================================================');
  lines.push('');
  
  // Generate validation functions for each enum
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
  
  return lines.join('\n');
}

// ============================================================================
// WRITE FILE USING THE SAME PATTERN AS writeGeneratedFile
// ============================================================================

async function writeEnumsFile(
  content: string,
  options: WriteOptions
): Promise<WriteResult> {
  const { dryRun, force, verbose } = options;
  const fullPath = OUTPUT_PATH;
  const dir = path.dirname(fullPath);
  
  // Check if file exists
  const exists = fs.existsSync(fullPath);
  
  // Dry run mode
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
  
  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // New file - safe to create
  if (!exists) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      console.log(`✅ Created: ${fullPath}`);
    }
    return {
      success: true,
      filePath: fullPath,
      action: 'created',
      message: `Created ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Existing file - check if content changed
  const hasChanged = contentHasChanged(fullPath, content);
  
  if (!hasChanged) {
    if (verbose) {
      console.log(`⏭️  Unchanged: ${fullPath}`);
    }
    return {
      success: true,
      filePath: fullPath,
      action: 'skipped',
      message: `Unchanged: ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Content changed - handle based on force flag
  if (force) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      console.log(`⚠️  Overwrote (forced): ${fullPath}`);
    }
    return {
      success: true,
      filePath: fullPath,
      action: 'updated',
      message: `Overwrote ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Not forcing - skip with warning
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
  
  console.log('\n📦 Generating enums.ts from runtime enums...\n');
  
  try {
    // Extract enums from database.types.ts
    const enums = extractRuntimeEnums();
    
    if (enums.length === 0) {
      console.warn('⚠️ No runtime enums found in database.types.ts');
      return {
        success: false,
        enumsCount: 0,
        filePath: OUTPUT_PATH,
        action: 'skipped',
        message: 'No enums found to generate'
      };
    }
    
    if (verbose) {
      console.log(`   Found ${enums.length} runtime enums:`);
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
    console.error(`\n❌ Error generating enums.ts:`, error);
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
  console.log('🌍 GAIA - Enum Types Generator');
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

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateEnumsFile };
// src/scripts/step2-count-enums.ts
// STEP 2: Count Enum Objects in Constants.public.Enums
// Builds on Step 1 - uses correct UTF-16 LE encoding

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_TYPES_PATH = path.join(process.cwd(), 'src/types/supabase/database.types.ts');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function logStep(message: string): void {
  console.log(`${colors.cyan}${message}${colors.reset}`);
}

function logSuccess(message: string): void {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message: string): void {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logInfo(message: string): void {
  console.log(`${colors.blue}📌 ${message}${colors.reset}`);
}

function logWarning(message: string): void {
  console.log(`${colors.yellow}⚠️ ${message}${colors.reset}`);
}

function logSeparator(): void {
  console.log(`${colors.yellow}─${'─'.repeat(60)}${colors.reset}`);
}

function readFileWithCorrectEncoding(): { content: string; encoding: string } {
  const buffer = fs.readFileSync(DB_TYPES_PATH);
  
  // Detect encoding from BOM
  let encoding = 'utf-8';
  let content = '';
  
  // UTF-16 LE BOM: FF FE
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    encoding = 'utf16le';
    content = buffer.toString('utf16le');
    // Strip BOM character
    content = content.slice(1);
  }
  // UTF-16 BE BOM: FE FF
  else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
    encoding = 'utf16be';
    content = buffer.toString('utf16le');
    content = content.slice(1);
  }
  // UTF-8 BOM: EF BB BF
  else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    encoding = 'utf-8';
    content = buffer.toString('utf-8');
    content = content.slice(1);
  }
  else {
    content = buffer.toString('utf-8');
  }
  
  return { content, encoding };
}

function main(): void {
  console.log('\n');
  logSeparator();
  logStep('STEP 2: Count Enum Objects');
  logSeparator();
  console.log('\n');

  // Read file with correct encoding
  const { content, encoding } = readFileWithCorrectEncoding();
  logSuccess(`File loaded (${encoding})`);
  logInfo(`Content length: ${content.length} characters`);
  console.log('\n');

  // =====================================================
  // FIND CONSTANTS SECTION
  // =====================================================
  
  logSeparator();
  logStep('📍 LOCATING Constants.public.Enums');
  logSeparator();
  console.log('\n');

  // Find Constants section
  const constantsMarker = 'export const Constants = {';
  const constantsStart = content.indexOf(constantsMarker);
  
  if (constantsStart === -1) {
    logError(`Could not find "${constantsMarker}"`);
    process.exit(1);
  }
  logSuccess(`Found Constants section at position ${constantsStart}`);
  
  // Find public.Enums within Constants
  const enumsMarker = 'public: { Enums: {';
  const afterConstantsStart = content.substring(constantsStart);
  const enumsStart = afterConstantsStart.indexOf(enumsMarker);
  
  if (enumsStart === -1) {
    logError(`Could not find "${enumsMarker}" within Constants`);
    process.exit(1);
  }
  logSuccess(`Found Enums section`);
  
  // =====================================================
  // EXTRACT ENUMS CONTENT
  // =====================================================
  
  logSeparator();
  logStep('📦 EXTRACTING Enum Objects');
  logSeparator();
  console.log('\n');
  
  // Start after the marker
  const fromEnumsStart = afterConstantsStart.substring(enumsStart + enumsMarker.length);
  
  // Count braces to find where Enums object ends
  let braceCount = 1;
  let position = 0;
  
  for (let i = 0; i < fromEnumsStart.length && braceCount > 0; i++) {
    if (fromEnumsStart[i] === '{') braceCount++;
    if (fromEnumsStart[i] === '}') braceCount--;
    position = i;
  }
  
  const enumsContent = fromEnumsStart.substring(0, position);
  logSuccess(`Extracted Enums content (${enumsContent.length} characters)`);
  console.log('\n');

  // =====================================================
  // COUNT ENUM NAMES
  // =====================================================
  
  logSeparator();
  logStep('🔢 COUNTING Enum Objects');
  logSeparator();
  console.log('\n');
  
  // Pattern to match enum names (lines with spaces/tabs followed by a word and colon)
  // Matches patterns like: "      acid_persona:"
  const enumNamePattern = /^\s{2,}(\w+):/gm;
  const matches = enumsContent.match(enumNamePattern);
  const enumCount = matches ? matches.length : 0;
  
  // Also collect just the names for verification
  const enumNames: string[] = [];
  let nameMatch;
  const nameRegex = /^\s{2,}(\w+):/gm;
  while ((nameMatch = nameRegex.exec(enumsContent)) !== null) {
    enumNames.push(nameMatch[1]);
  }
  
  console.log(`  📊 Total enum objects found: ${enumCount}`);
  console.log(`\n  First 10 enum names:`);
  for (let i = 0; i < Math.min(10, enumNames.length); i++) {
    console.log(`    • ${enumNames[i]}`);
  }
  if (enumNames.length > 10) {
    console.log(`    • ... and ${enumNames.length - 10} more`);
  }
  
  console.log('\n');

  // =====================================================
  // VERIFY EXPECTED ENUMS
  // =====================================================
  
  logSeparator();
  logStep('✓ VERIFYING Expected Enums');
  logSeparator();
  console.log('\n');
  
  const expectedEnums = [
    'user_tier',
    'council_house',
    'product_type',
    'post_visibility',
    'contribution_type',
    'payout_status',
    'quest_status',
    'report_type',
    'notification_type',
    'business_type',
  ];
  
  let foundCount = 0;
  for (const expected of expectedEnums) {
    if (enumNames.includes(expected)) {
      logSuccess(`  ✓ ${expected}`);
      foundCount++;
    } else {
      logError(`  ✗ ${expected} (not found)`);
    }
  }
  
  console.log(`\n  Expected enums found: ${foundCount}/${expectedEnums.length}`);
  console.log('\n');

  // =====================================================
  // SUMMARY
  // =====================================================
  
  logSeparator();
  logStep('STEP 2 SUMMARY');
  logSeparator();
  console.log('\n');
  
  logInfo(`Total enum objects: ${colors.yellow}${enumCount}${colors.reset}`);
  logInfo(`Enum names extracted: ${enumNames.length}`);
  
  if (foundCount === expectedEnums.length) {
    logSuccess('All expected enums present');
  } else {
    logWarning(`Missing ${expectedEnums.length - foundCount} expected enums`);
  }
  
  console.log('\n');
  logSeparator();
  logSuccess('Step 2 complete');
  logInfo('Ready for Step 3: List Enum Object Names');
  logSeparator();
  console.log('\n');
}

main();
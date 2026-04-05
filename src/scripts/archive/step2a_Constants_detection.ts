// src/scripts/step2a_Constants_detection.ts
// Step 2a: Extract the entire Constants object and save to types/supabase/constants.ts
// Goal: Capture everything from "export const Constants = {" to its matching closing brace

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_TYPES_PATH = path.join(process.cwd(), 'src/types/supabase/database.types.ts');
const OUTPUT_PATH = path.join(process.cwd(), 'src/types/supabase/constants.ts');

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

function detectEncoding(buffer: Buffer): { encoding: string; bomLength: number } {
  // UTF-16 LE BOM: FF FE
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    return { encoding: 'utf16le', bomLength: 2 };
  }
  // UTF-16 BE BOM: FE FF
  if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
    return { encoding: 'utf16be', bomLength: 2 };
  }
  // UTF-8 BOM: EF BB BF
  if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    return { encoding: 'utf-8', bomLength: 3 };
  }
  return { encoding: 'utf-8', bomLength: 0 };
}

function findMatchingBrace(content: string, startIndex: number): number {
  let braceCount = 1;
  let i = startIndex;
  
  while (i < content.length && braceCount > 0) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    i++;
  }
  
  return i - 1;
}

function main(): void {
  console.log('\n');
  logSeparator();
  logStep('STEP 2a: Extract Constants Object');
  logSeparator();
  console.log('\n');

  // Read raw buffer
  const buffer = fs.readFileSync(DB_TYPES_PATH);
  const { encoding, bomLength } = detectEncoding(buffer);
  
  logInfo(`Detected encoding: ${encoding}`);
  logInfo(`BOM length: ${bomLength} bytes`);
  
  // Decode content
  let content = buffer.toString(encoding as BufferEncoding);
  
  // Strip BOM if present
  if (bomLength > 0) {
    content = content.slice(1);
    logInfo('Stripped BOM from content');
  }
  
  logSuccess(`File loaded: ${content.length} characters`);
  console.log('\n');

  // Find Constants section
  const constantsMarker = 'export const Constants = {';
  const constantsStart = content.indexOf(constantsMarker);
  
  if (constantsStart === -1) {
    logError('Could not find "export const Constants = {"');
    process.exit(1);
  }
  
  // Find the opening brace position
  const bracePosition = content.indexOf('{', constantsStart);
  if (bracePosition === -1) {
    logError('Could not find opening brace after Constants declaration');
    process.exit(1);
  }
  
  // Find matching closing brace
  const closingBracePosition = findMatchingBrace(content, bracePosition + 1);
  
  // Extract the entire Constants object (including the declaration)
  const constantsContent = content.substring(constantsStart, closingBracePosition + 1);
  
  // Calculate line numbers for reporting
  const linesUpToStart = content.substring(0, constantsStart).split('\n').length;
  const linesUpToEnd = content.substring(0, closingBracePosition + 1).split('\n').length;
  
  console.log('\n');
  logSeparator();
  logStep('EXTRACTION RESULTS');
  logSeparator();
  console.log('\n');
  
  logInfo(`Constants start line: ${linesUpToStart}`);
  logInfo(`Constants end line: ${linesUpToEnd}`);
  logInfo(`Constants length: ${constantsContent.length} characters`);
  
  // Preview first few lines
  const firstLines = constantsContent.split('\n').slice(0, 5).join('\n');
  console.log('\n');
  logInfo('Preview (first 5 lines):');
  console.log(`${colors.yellow}${firstLines}${colors.reset}`);
  
  // Save to file
  console.log('\n');
  logSeparator();
  logStep('SAVING TO FILE');
  logSeparator();
  console.log('\n');
  
  // Ensure directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    logInfo(`Created directory: ${outputDir}`);
  }
  
  // Add a header comment to the output file
  const fileHeader = `// AUTO-GENERATED from database.types.ts
// Extracted on: ${new Date().toISOString()}
// Source: ${DB_TYPES_PATH}
// Do not edit manually. Run 'npm run step2a' to regenerate.

`;
  
  fs.writeFileSync(OUTPUT_PATH, fileHeader + constantsContent, 'utf-8');
  logSuccess(`Saved to: ${OUTPUT_PATH}`);
  
  console.log('\n');
  logSeparator();
  logSuccess('STEP 2a COMPLETE');
  logInfo('Constants object extracted and saved');
  logInfo('Ready for Step 2b: Constants.public detection');
  logSeparator();
  console.log('\n');
}

main();
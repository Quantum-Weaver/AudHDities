// @/scripts/1-raw_bytes.ts
// Corrected for UTF-16 LE encoding WITH LINE NUMBERS

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
  white: '\x1b[37m',
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

function logBom(message: string): void {
  console.log(`${colors.magenta}🔍 ${message}${colors.reset}`);
}

function logSeparator(): void {
  console.log(`${colors.yellow}─${'─'.repeat(60)}${colors.reset}`);
}

function main(): void {
  console.log('\n');
  logSeparator();
  logStep('STEP 1: Raw Byte Scanner - UTF-16 LE Detection');
  logSeparator();
  console.log('\n');

  // Read file as raw buffer
  const buffer = fs.readFileSync(DB_TYPES_PATH);
  
  logSuccess(`File size: ${buffer.length} bytes`);
  console.log('\n');

  // =====================================================
  // SHOW FIRST 50 BYTES
  // =====================================================
  
  logSeparator();
  logStep('📊 FIRST 50 BYTES (HEX + ASCII)');
  logSeparator();
  console.log('\n');
  
  const bytesToShow = Math.min(50, buffer.length);
  
  let hexLine = '';
  let asciiLine = '';
  
  for (let i = 0; i < bytesToShow; i++) {
    const byte = buffer[i];
    hexLine += byte.toString(16).toUpperCase().padStart(2, '0') + ' ';
    
    if (byte >= 32 && byte <= 126) {
      asciiLine += String.fromCharCode(byte);
    } else {
      asciiLine += '·';
    }
  }
  
  console.log(`  HEX:  ${hexLine}`);
  console.log(`  ASCII: ${asciiLine}`);
  console.log('\n');

  // =====================================================
  // DETECT ENCODING FROM BOM
  // =====================================================
  
  logSeparator();
  logStep('🔍 ENCODING DETECTION');
  logSeparator();
  console.log('\n');
  
  let encoding = 'utf-8';
  let bomMessage = '';
  
  // UTF-16 LE BOM: FF FE
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    encoding = 'utf16le';
    bomMessage = 'UTF-16 LE BOM detected (FF FE)';
    logBom(`✅ ${bomMessage}`);
  }
  // UTF-16 BE BOM: FE FF
  else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
    encoding = 'utf16be';
    bomMessage = 'UTF-16 BE BOM detected (FE FF)';
    logBom(`✅ ${bomMessage}`);
  }
  // UTF-8 BOM: EF BB BF
  else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    encoding = 'utf-8';
    bomMessage = 'UTF-8 BOM detected (EF BB BF)';
    logBom(`✅ ${bomMessage}`);
  } else {
    logInfo('No BOM detected. Assuming UTF-8.');
  }
  
  console.log('\n');
  logInfo(`Using encoding: ${encoding}`);
  console.log('\n');

  // =====================================================
  // READ FILE WITH CORRECT ENCODING
  // =====================================================
  
  logSeparator();
  logStep('📝 READING FILE WITH CORRECT ENCODING');
  logSeparator();
  console.log('\n');
  
  // Read the file using the detected encoding
  const content = buffer.toString(encoding as BufferEncoding);
  
  // Remove BOM from content if present (for easier searching)
  let cleanContent = content;
  if (encoding === 'utf16le' && buffer[0] === 0xFF && buffer[1] === 0xFE) {
    cleanContent = content.slice(1);
    logInfo('Stripped UTF-16 LE BOM from content for searching');
  } else if (encoding === 'utf-8' && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    cleanContent = content.slice(1);
    logInfo('Stripped UTF-8 BOM from content for searching');
  }
  
  // Split into lines for line number tracking
  const lines = cleanContent.split(/\r?\n/);
  const totalLines = lines.length;
  
  console.log('\n');
  logSuccess(`Content loaded: ${cleanContent.length} characters`);
  logSuccess(`Total lines: ${totalLines}`);
  
  // Show first few characters
  console.log(`\n  First 50 chars: "${cleanContent.substring(0, 50)}"`);
  console.log('\n');

  // =====================================================
  // VERIFY WE CAN FIND KEY STRINGS WITH LINE NUMBERS
  // =====================================================
  // =====================================================
  // FIND IN ORDER: Database, public, Tables, Views, Functions, Enums, CompositeTypes
  // =====================================================
  
  logSeparator();
  logStep('🎯 FINDING IN ORDER');
  logSeparator();
  console.log('\n');
  
  let databaseLine = -1;
  let dbWithoutInternalsLine = -1;
  let publicLine = -1;
  let tablesLine = -1;
  let viewsLine = -1;
  let functionsLine = -1;
  let enumsLine = -1;
  let compositeTypesLine = -1;
  
  // STEP 1: Find export type Database
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export type Database = {')) {
      databaseLine = i + 1;
      logSuccess(`1. export type Database = { at line ${databaseLine}`);
      break;
    }
  }
  
  // STEP 2: Find DatabaseWithoutInternals
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">')) {
      dbWithoutInternalsLine = i + 1;
      logSuccess(`2. DatabaseWithoutInternals at line ${dbWithoutInternalsLine}`);
      logInfo(`   db_slice.ts will be lines 1-${dbWithoutInternalsLine - 2}`);
      break;
    }
  }
  
  // STEP 3: Find '  public: {' after Database
  for (let i = databaseLine; i < lines.length; i++) {
    if (lines[i].match(/^\s{2}public:\s*\{/)) {
      publicLine = i + 1;
      logSuccess(`3. public: { at line ${publicLine}`);
      break;
    }
  }
  
  // STEP 4: Find '    Tables: {' after public
  for (let i = publicLine; i < lines.length; i++) {
    if (lines[i].match(/^\s{4}Tables:\s*\{/)) {
      tablesLine = i + 1;
      logSuccess(`4. Tables: { at line ${tablesLine}`);
      break;
    }
  }
  
  // STEP 5: Find '    Views: {' after Tables
  for (let i = tablesLine; i < lines.length; i++) {
    if (lines[i].match(/^\s{4}Views:\s*\{/)) {
      viewsLine = i + 1;
      logSuccess(`5. Views: { at line ${viewsLine}`);
      break;
    }
  }
  
  // STEP 6: Find '    Functions: {' after Views
  for (let i = viewsLine; i < lines.length; i++) {
    if (lines[i].match(/^\s{4}Functions:\s*\{/)) {
      functionsLine = i + 1;
      logSuccess(`6. Functions: { at line ${functionsLine}`);
      break;
    }
  }
  
  // STEP 7: Find '    Enums: {' after Functions
  for (let i = functionsLine; i < lines.length; i++) {
    if (lines[i].match(/^\s{4}Enums:\s*\{/)) {
      enumsLine = i + 1;
      logSuccess(`7. Enums: { at line ${enumsLine}`);
      break;
    }
  }
  
  // STEP 8: Find '    CompositeTypes: {' after Enums
  for (let i = enumsLine; i < lines.length; i++) {
    if (lines[i].match(/^\s{4}CompositeTypes:\s*\{/)) {
      compositeTypesLine = i + 1;
      logSuccess(`8. CompositeTypes: { at line ${compositeTypesLine}`);
      break;
    }
  }
  
  console.log('\n');
  // =====================================================
  // PEEK INTO EACH COLLECTION
  // =====================================================
  
  logSeparator();
  logStep('👁️ PEEKING INTO COLLECTIONS');
  logSeparator();
  console.log('\n');
  
  // Helper function to find closing brace line
  function findClosingBrace(lines: string[], startLine: number): number {
    let braceCount = 0;
    let foundOpen = false;
    
    for (let i = startLine; i < lines.length; i++) {
      for (let k = 0; k < lines[i].length; k++) {
        if (lines[i][k] === '{') {
          braceCount++;
          foundOpen = true;
        }
        if (lines[i][k] === '}') {
          braceCount--;
        }
      }
      if (foundOpen && braceCount === 0) {
        return i + 1; // 1-indexed line number of closing brace
      }
    }
    return -1;
  }
  
  // Helper to count items inside a collection
  function countItems(lines: string[], startLine: number, endLine: number, pattern: RegExp): number {
    let count = 0;
    for (let i = startLine; i < endLine; i++) {
      if (lines[i].match(pattern)) {
        count++;
      }
    }
    return count;
  }
  
  // Helper to show first few items
  function peekItems(lines: string[], startLine: number, endLine: number, pattern: RegExp, maxItems: number = 5): string[] {
    const items: string[] = [];
    for (let i = startLine; i < endLine && items.length < maxItems; i++) {
      const match = lines[i].match(pattern);
      if (match) {
        items.push(match[1]);
      }
    }
    return items;
  }
  
  // PEEK INTO Tables
  if (tablesLine !== -1) {
    const tablesClose = findClosingBrace(lines, tablesLine - 1);
    if (tablesClose !== -1) {
      const tableCount = countItems(lines, tablesLine, tablesClose - 1, /^\s{6}(\w+):/);
      const tableNames = peekItems(lines, tablesLine, tablesClose - 1, /^\s{6}(\w+):/, 10);
      logSuccess(`Tables: ${tableCount} tables (lines ${tablesLine}-${tablesClose})`);
      console.log(`   First ${tableNames.length}: ${tableNames.join(', ')}`);
    }
  }
  
  // PEEK INTO Views
  if (viewsLine !== -1) {
    const viewsClose = findClosingBrace(lines, viewsLine - 1);
    if (viewsClose !== -1) {
      const viewCount = countItems(lines, viewsLine, viewsClose - 1, /^\s{6}(\w+):/);
      const viewNames = peekItems(lines, viewsLine, viewsClose - 1, /^\s{6}(\w+):/, 10);
      logSuccess(`Views: ${viewCount} views (lines ${viewsLine}-${viewsClose})`);
      console.log(`   First ${viewNames.length}: ${viewNames.join(', ')}`);
    }
  }
  
  // PEEK INTO Functions
  if (functionsLine !== -1) {
    const functionsClose = findClosingBrace(lines, functionsLine - 1);
    if (functionsClose !== -1) {
      const functionCount = countItems(lines, functionsLine, functionsClose - 1, /^\s{6}(\w+):/);
      const functionNames = peekItems(lines, functionsLine, functionsClose - 1, /^\s{6}(\w+):/, 10);
      logSuccess(`Functions: ${functionCount} functions (lines ${functionsLine}-${functionsClose})`);
      console.log(`   First ${functionNames.length}: ${functionNames.join(', ')}`);
    }
  }
  
  // PEEK INTO Enums (type-level)
  if (enumsLine !== -1) {
    const enumsClose = findClosingBrace(lines, enumsLine - 1);
    if (enumsClose !== -1) {
      const enumCount = countItems(lines, enumsLine, enumsClose - 1, /^\s{6}(\w+):/);
      const enumNames = peekItems(lines, enumsLine, enumsClose - 1, /^\s{6}(\w+):/, 10);
      logSuccess(`Enums (type-level): ${enumCount} enums (lines ${enumsLine}-${enumsClose})`);
      console.log(`   First ${enumNames.length}: ${enumNames.join(', ')}`);
    }
  }
  
  // PEEK INTO CompositeTypes
  if (compositeTypesLine !== -1) {
    const compositeClose = findClosingBrace(lines, compositeTypesLine - 1);
    if (compositeClose !== -1) {
      logSuccess(`CompositeTypes: lines ${compositeTypesLine}-${compositeClose}`);
    }
  }
  
  console.log('\n');

    // =====================================================
  // PEEK AT FIRST OBJECT IN EACH COLLECTION
  // =====================================================
  
  logSeparator();
  logStep('🔬 FIRST OBJECT IN EACH COLLECTION');
  logSeparator();
  console.log('\n');
  
  // Helper to extract first object from a collection
  function extractFirstObject(lines: string[], startLine: number, endLine: number, pattern: RegExp): { name: string, content: string, start: number, end: number } | null {
    // Find first object line
    let firstObjectLine = -1;
    let objectName = '';
    
    for (let i = startLine; i < endLine; i++) {
      const match = lines[i].match(pattern);
      if (match) {
        firstObjectLine = i;
        objectName = match[1];
        break;
      }
    }
    
    if (firstObjectLine === -1) return null;
    
    // Find opening brace on this line or next line
    let braceStartLine = firstObjectLine;
    let braceFound = false;
    
    // Check current line for {
    if (lines[firstObjectLine].includes('{')) {
      braceFound = true;
    } else {
      // Check next line
      if (firstObjectLine + 1 < lines.length && lines[firstObjectLine + 1].includes('{')) {
        braceStartLine = firstObjectLine + 1;
        braceFound = true;
      }
    }
    
    if (!braceFound) return null;
    
    // Find closing brace
    let braceCount = 0;
    let foundOpen = false;
    let closingLine = -1;
    
    for (let i = braceStartLine; i < lines.length; i++) {
      for (let k = 0; k < lines[i].length; k++) {
        if (lines[i][k] === '{') {
          braceCount++;
          foundOpen = true;
        }
        if (lines[i][k] === '}') {
          braceCount--;
        }
      }
      if (foundOpen && braceCount === 0) {
        closingLine = i;
        break;
      }
    }
    
    if (closingLine === -1) return null;
    
    // Extract content
    const contentLines = lines.slice(firstObjectLine, closingLine + 1);
    const content = contentLines.join('\n');
    
    return {
      name: objectName,
      content: content,
      start: firstObjectLine + 1,
      end: closingLine + 1
    };
  }
  
  // Peek at first Table
  if (tablesLine !== -1) {
    const tablesClose = findClosingBrace(lines, tablesLine - 1);
    if (tablesClose !== -1) {
      const firstTable = extractFirstObject(lines, tablesLine, tablesClose - 1, /^\s{6}(\w+):/);
      if (firstTable) {
        logSuccess(`First Table: ${firstTable.name} (lines ${firstTable.start}-${firstTable.end})`);
        console.log(`\n  ${firstTable.content.split('\n').slice(0, 15).join('\n  ')}${firstTable.content.split('\n').length > 15 ? '\n  ...' : ''}`);
        console.log('');
      }
    }
  }
  
  // Peek at first View
  if (viewsLine !== -1) {
    const viewsClose = findClosingBrace(lines, viewsLine - 1);
    if (viewsClose !== -1) {
      const firstView = extractFirstObject(lines, viewsLine, viewsClose - 1, /^\s{6}(\w+):/);
      if (firstView) {
        logSuccess(`First View: ${firstView.name} (lines ${firstView.start}-${firstView.end})`);
        console.log(`\n  ${firstView.content.split('\n').slice(0, 10).join('\n  ')}${firstView.content.split('\n').length > 10 ? '\n  ...' : ''}`);
        console.log('');
      }
    }
  }
  
  // Peek at first Function
  if (functionsLine !== -1) {
    const functionsClose = findClosingBrace(lines, functionsLine - 1);
    if (functionsClose !== -1) {
      const firstFunction = extractFirstObject(lines, functionsLine, functionsClose - 1, /^\s{6}(\w+):/);
      if (firstFunction) {
        logSuccess(`First Function: ${firstFunction.name} (lines ${firstFunction.start}-${firstFunction.end})`);
        console.log(`\n  ${firstFunction.content.split('\n').slice(0, 10).join('\n  ')}${firstFunction.content.split('\n').length > 10 ? '\n  ...' : ''}`);
        console.log('');
      }
    }
  }
  
  // Peek at first Enum (type-level)
  if (enumsLine !== -1) {
    const enumsClose = findClosingBrace(lines, enumsLine - 1);
    if (enumsClose !== -1) {
      const firstEnum = extractFirstObject(lines, enumsLine, enumsClose - 1, /^\s{6}(\w+):/);
      if (firstEnum) {
        logSuccess(`First Enum (type-level): ${firstEnum.name} (lines ${firstEnum.start}-${firstEnum.end})`);
        console.log(`\n  ${firstEnum.content.split('\n').slice(0, 10).join('\n  ')}${firstEnum.content.split('\n').length > 10 ? '\n  ...' : ''}`);
        console.log('');
      }
    }
  }
  
  console.log('\n');

// =====================================================
// GENERATE TYPE FILE FROM FIRST TABLE
// =====================================================

function generateTypeFileFromTable(
  tableName: string, 
  tableContent: string,
  tableStartLine: number,
  tableEndLine: number
): string {
  const timestamp = new Date().toISOString();
  
  // Extract Row, Insert, Update definitions
  const rowMatch = tableContent.match(/Row:\s*\{([\s\S]*?)\n\s{4}\}/);
  const insertMatch = tableContent.match(/Insert:\s*\{([\s\S]*?)\n\s{4}\}/);
  const updateMatch = tableContent.match(/Update:\s*\{([\s\S]*?)\n\s{4}\}/);
  
  const rowContent = rowMatch ? rowMatch[1].trim() : '';
  const insertContent = insertMatch ? insertMatch[1].trim() : '';
  const updateContent = updateMatch ? updateMatch[1].trim() : '';
  
  // Detect enum references in Row content
  const enumPattern = /Database\["public"\]\["Enums"\]\["(\w+)"\]/g;
  const enumRefs: string[] = [];
  let match;
  while ((match = enumPattern.exec(rowContent)) !== null) {
    if (!enumRefs.includes(match[1])) {
      enumRefs.push(match[1]);
    }
  }
  
  // Detect Json references
  const hasJson = rowContent.includes('Json') || insertContent.includes('Json') || updateContent.includes('Json');
  
  // Build the file content
  let fileContent = `// =====================================================\n`;
  fileContent += `// FILE: types/${tableName}.ts\n`;
  fileContent += `// GENERATED FROM: database.types.ts lines ${tableStartLine}-${tableEndLine}\n`;
  fileContent += `// LAST UPDATED: ${timestamp}\n`;
  fileContent += `// =====================================================\n\n`;
  
  fileContent += `import type { Database } from '@/types/supabase/database.types';\n`;
  
  if (hasJson) {
    fileContent += `import type { Json } from '@/types/supabase/database.types';\n`;
  }
  
  if (enumRefs.length > 0) {
    fileContent += `\n// Enum imports\n`;
    for (const enumRef of enumRefs) {
      fileContent += `import type { ${enumRef} } from '@/types/supabase/enums';\n`;
    }
  }
  
  fileContent += `\n// =====================================================\n`;
  fileContent += `// CORE TYPES\n`;
  fileContent += `// =====================================================\n\n`;
  
  fileContent += `export type ${tableName}Row = Database['public']['Tables']['${tableName}']['Row'];\n`;
  fileContent += `export type ${tableName}Insert = Database['public']['Tables']['${tableName}']['Insert'];\n`;
  fileContent += `export type ${tableName}Update = Database['public']['Tables']['${tableName}']['Update'];\n\n`;
  
  fileContent += `// =====================================================\n`;
  fileContent += `// DERIVED TYPES\n`;
  fileContent += `// =====================================================\n\n`;
  
  // Generate Public interface (excluding sensitive fields)
  const publicFields: string[] = [];
  const sensitiveFields = ['email', 'password', 'stripe_account_id', 'crisis_contact'];
  
  const rowLines = rowContent.split('\n');
  for (const line of rowLines) {
    const fieldMatch = line.match(/^\s*(\w+):/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      if (!sensitiveFields.includes(fieldName)) {
        publicFields.push(`  ${line.trim()}`);
      }
    }
  }
  
  if (publicFields.length > 0) {
    fileContent += `export interface Public${tableName} {\n${publicFields.join('\n')}\n}\n\n`;
  }
  
  // Generate FormData interface
  fileContent += `export interface ${tableName}FormData {\n`;
  for (const line of rowLines) {
    const fieldMatch = line.match(/^\s*(\w+):/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      const fieldType = line.split(':')[1].trim();
      // Make optional for form
      fileContent += `  ${fieldName}?: ${fieldType};\n`;
    }
  }
  fileContent += `}\n\n`;
  
  // Generate ValidationResult interface
  fileContent += `export interface ${tableName}ValidationResult {\n`;
  fileContent += `  valid: boolean;\n`;
  fileContent += `  errors: {\n`;
  for (const line of rowLines) {
    const fieldMatch = line.match(/^\s*(\w+):/);
    if (fieldMatch) {
      const fieldName = fieldMatch[1];
      fileContent += `    ${fieldName}?: string;\n`;
    }
  }
  fileContent += `  };\n`;
  fileContent += `}\n`;
  
  return fileContent;
}

// =====================================================
// USE IT ON THE FIRST TABLE
// =====================================================

// After finding the first table, generate its type file
if (tablesLine !== -1) {
  const tablesClose = findClosingBrace(lines, tablesLine - 1);
  if (tablesClose !== -1) {
    const firstTable = extractFirstObject(lines, tablesLine, tablesClose - 1, /^\s{6}(\w+):/);
    if (firstTable) {
      logSuccess(`Generating type file for table: ${firstTable.name}`);
      
      const typeFileContent = generateTypeFileFromTable(
        firstTable.name,
        firstTable.content,
        firstTable.start,
        firstTable.end
      );
      
      // Show preview of generated file
      console.log('\n  Generated file preview:');
      console.log('  ' + '─'.repeat(50));
      const previewLines = typeFileContent.split('\n').slice(0, 30);
      for (const line of previewLines) {
        console.log(`  ${line}`);
      }
      if (typeFileContent.split('\n').length > 30) {
        console.log('  ...');
      }
      console.log('  ' + '─'.repeat(50));
      
      // Optional: Write to file (commented out for now)
      // const outputPath = path.join(process.cwd(), `src/types/${firstTable.name}.ts`);
      // fs.writeFileSync(outputPath, typeFileContent, 'utf-8');
      // logSuccess(`Written to: ${outputPath}`);
    }
  }
}

// =====================================================
// USE IT ON THE FIRST TABLE
// =====================================================

// After finding the first table, generate its type file
if (tablesLine !== -1) {
  const tablesClose = findClosingBrace(lines, tablesLine - 1);
  if (tablesClose !== -1) {
    const firstTable = extractFirstObject(lines, tablesLine, tablesClose - 1, /^\s{6}(\w+):/);
    if (firstTable) {
      logSuccess(`Generating type file for table: ${firstTable.name}`);
      
      const typeFileContent = generateTypeFileFromTable(
        firstTable.name,
        firstTable.content,
        firstTable.start,
        firstTable.end
      );
      
      // Show preview of generated file
      console.log('\n  Generated file preview:');
      console.log('  ' + '─'.repeat(50));
      const previewLines = typeFileContent.split('\n').slice(0, 30);
      for (const line of previewLines) {
        console.log(`  ${line}`);
      }
      if (typeFileContent.split('\n').length > 30) {
        console.log('  ...');
      }
      console.log('  ' + '─'.repeat(50));
      
      // Optional: Write to file (commented out for now)
      // const outputPath = path.join(process.cwd(), `src/types/${firstTable.name}.ts`);
      // fs.writeFileSync(outputPath, typeFileContent, 'utf-8');
      // logSuccess(`Written to: ${outputPath}`);
    }
  }
}
  // =====================================================
  // SUMMARY WITH LINE NUMBERS
  // =====================================================
  
  logSeparator();
  logStep('STEP 1 SUMMARY');
  logSeparator();
  console.log('\n');
  
  logInfo(`File: ${DB_TYPES_PATH}`);
  logInfo(`File size: ${buffer.length} bytes`);
  logInfo(`Detected encoding: ${encoding}`);
  logInfo(`Content length: ${cleanContent.length} characters`);
  logInfo(`Total lines in file: ${totalLines}`);
  
  if (encoding === 'utf16le') {
    logWarning('File is UTF-16 LE encoded');
    logInfo('All future parsers must read as UTF-16 LE or convert to UTF-8');
  }
  
  console.log('\n');
  logSeparator();
  logSuccess('Step 1 complete');
  logInfo(`Total lines: ${totalLines}`);
  logSeparator();
  console.log('\n');
}

main();
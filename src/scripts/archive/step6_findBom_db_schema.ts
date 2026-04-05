// src/scripts/step6_findBom_db_schema.ts
// STEP 6: Parse Database section for table names

import { readDatabaseTypes } from '../shared/fileReader.js';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
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

function logSeparator(): void {
  console.log(`${colors.yellow}─${'─'.repeat(60)}${colors.reset}`);
}

function extractSection(content: string, startMarker: string): string | null {
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return null;
  
  let braceCount = 0;
  let foundOpeningBrace = false;
  let endIndex = startIndex;
  
  for (let i = startIndex; i < content.length; i++) {
    const char = content[i];
    
    if (char === '{') {
      braceCount++;
      foundOpeningBrace = true;
    } else if (char === '}') {
      braceCount--;
    }
    
    if (foundOpeningBrace && braceCount === 0) {
      endIndex = i + 1;
      break;
    }
  }
  
  return content.substring(startIndex, endIndex);
}

function extractTableNames(databaseSection: string): string[] {
  const tableNames: string[] = [];
  
  // Find the Tables: { section
  const tablesMarker = 'Tables: {';
  const tablesStart = databaseSection.indexOf(tablesMarker);
  
  if (tablesStart === -1) return tableNames;
  
  // Find the closing brace of Tables
  let braceCount = 0;
  let foundOpening = false;
  let tablesEnd = tablesStart;
  
  for (let i = tablesStart; i < databaseSection.length; i++) {
    const char = databaseSection[i];
    if (char === '{') {
      braceCount++;
      foundOpening = true;
    } else if (char === '}') {
      braceCount--;
    }
    if (foundOpening && braceCount === 0) {
      tablesEnd = i;
      break;
    }
  }
  
  const tablesContent = databaseSection.substring(tablesStart, tablesEnd);
  
  // Match table names: pattern like "  table_name: {"
  const tablePattern = /^\s{2}(\w+):\s\{/gm;
  let match;
  while ((match = tablePattern.exec(tablesContent)) !== null) {
    tableNames.push(match[1]);
  }
  
  return tableNames;
}

function main(): void {
  console.log('\n');
  logSeparator();
  logStep('STEP 6: Parse Database for Tables');
  logSeparator();
  console.log('\n');
  
  const { success, content } = readDatabaseTypes();
  
  if (!success) {
    logError('Cannot proceed - file read failed');
    process.exit(1);
  }
  
  // Extract Database section
  const dbMarker = 'export type Database = {';
  const databaseSection = extractSection(content, dbMarker);
  
  if (!databaseSection) {
    logError('Failed to extract Database section');
    process.exit(1);
  }
  
  // Extract table names
  const tableNames = extractTableNames(databaseSection);
  
  logSuccess(`Found ${tableNames.length} tables`);
  console.log('\n');
  
  // Display first 20 tables
  logInfo('Table names (first 20):');
  for (let i = 0; i < Math.min(20, tableNames.length); i++) {
    console.log(`  📁 ${tableNames[i]}`);
  }
  
  if (tableNames.length > 20) {
    console.log(`  ... and ${tableNames.length - 20} more`);
  }
  
  console.log('\n');
  logSeparator();
  logStep('STEP 6 COMPLETE');
  logSeparator();
  console.log('\n');
}

main();
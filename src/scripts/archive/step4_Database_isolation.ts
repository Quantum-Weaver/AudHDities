// src/scripts/step4_Database_isolation.ts
// STEP 4: Extract Database section content

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

function main(): void {
  console.log('\n');
  logSeparator();
  logStep('STEP 4: Database Section Isolation');
  logSeparator();
  console.log('\n');
  
  const { success, content } = readDatabaseTypes();
  
  if (!success) {
    logError('Cannot proceed - file read failed');
    process.exit(1);
  }
  
  const marker = 'export type Database = {';
  const databaseSection = extractSection(content, marker);
  
  if (databaseSection) {
    logSuccess(`Extracted Database section`);
    logInfo(`Length: ${databaseSection.length} characters`);
    
    // Show preview
    const preview = databaseSection.substring(0, 200).replace(/\n/g, '\\n');
    logInfo(`Preview: ${preview}...`);
    
    // Optional: Save to file for inspection
    // fs.writeFileSync('database-section.txt', databaseSection);
  } else {
    logError('Failed to extract Database section');
    process.exit(1);
  }
  
  console.log('\n');
  logSeparator();
  logStep('STEP 4 COMPLETE');
  logSeparator();
  console.log('\n');
}

main();
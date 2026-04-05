// src/scripts/step3_Constants_detection.ts
// STEP 3: Verify Constants section exists

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

function main(): void {
  console.log('\n');
  logSeparator();
  logStep('STEP 3: Constants Section Detection');
  logSeparator();
  console.log('\n');
  
  const { success, content } = readDatabaseTypes();
  
  if (!success) {
    logError('Cannot proceed - file read failed');
    process.exit(1);
  }
  
  const marker = 'export const Constants = {';
  const found = content.includes(marker);
  
  if (found) {
    logSuccess(`Found: "${marker}"`);
    
    // Find its position
    const index = content.indexOf(marker);
    logInfo(`Position: character ${index}`);
  } else {
    logError(`Not found: "${marker}"`);
    process.exit(1);
  }
  
  console.log('\n');
  logSeparator();
  logStep('STEP 3 COMPLETE');
  logSeparator();
  console.log('\n');
}

main();
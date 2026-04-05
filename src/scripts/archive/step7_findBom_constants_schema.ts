// src/scripts/step7_findBom_constants_schema.ts
// STEP 7: Parse Constants section for enum names

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

function extractEnumNames(constantsSection: string): string[] {
  const enumNames: string[] = [];
  
  // Find the public.Enums section
  const enumsMarker = 'public: { Enums: {';
  const enumsStart = constantsSection.indexOf(enumsMarker);
  
  if (enumsStart === -1) return enumNames;
  
  // Find the closing brace of Enums
  let braceCount = 0;
  let foundOpening = false;
  let enumsEnd = enumsStart;
  
  for (let i = enumsStart; i < constantsSection.length; i++) {
    const char = constantsSection[i];
    if (char === '{') {
      braceCount++;
      foundOpening = true;
    } else if (char === '}') {
      braceCount--;
    }
    if (foundOpening && braceCount === 0) {
      enumsEnd = i;
      break;
    }
  }
  
  const enumsContent = constantsSection.substring(enumsStart, enumsEnd);
  
  // Match enum names: pattern like "  enum_name: ["
  const enumPattern = /^\s{2}(\w+):\s\[/gm;
  let match;
  while ((match = enumPattern.exec(enumsContent)) !== null) {
    enumNames.push(match[1]);
  }
  
  return enumNames;
}

function main(): void {
  console.log('\n');
  logSeparator();
  logStep('STEP 7: Parse Constants for Enums');
  logSeparator();
  console.log('\n');
  
  const { success, content } = readDatabaseTypes();
  
  if (!success) {
    logError('Cannot proceed - file read failed');
    process.exit(1);
  }
  
  // Extract Constants section
  const constantsMarker = 'export const Constants = {';
  const constantsSection = extractSection(content, constantsMarker);
  
  if (!constantsSection) {
    logError('Failed to extract Constants section');
    process.exit(1);
  }
  
  // Extract enum names
  const enumNames = extractEnumNames(constantsSection);
  
  logSuccess(`Found ${enumNames.length} enums`);
  console.log('\n');
  
  // Display first 20 enums
  logInfo('Enum names (first 20):');
  for (let i = 0; i < Math.min(20, enumNames.length); i++) {
    console.log(`  📋 ${enumNames[i]}`);
  }
  
  if (enumNames.length > 20) {
    console.log(`  ... and ${enumNames.length - 20} more`);
  }
  
  console.log('\n');
  logSeparator();
  logStep('STEP 7 COMPLETE');
  logSeparator();
  console.log('\n');
}

main();
// src/scripts/system/gaia/format/test_formatters.ts
// Temporary test script - run with: tsx src/scripts/system/gaia/format/test_formatters.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the formatters
import { formatRowContent } from './format_row_content.js';
import { formatInsertContent } from './format_insert_content.js';
import { formatUpdateContent } from './format_update_content.js';
import { formatPublicContent } from './format_public_content.js';
import { formatFormContent } from './format_form_content.js';

// ============================================================================
// TEST DATA - What parseRowContentToFields SHOULD produce
// ============================================================================

const testFields = [
  { name: 'id', type: 'string', isNullable: false },
  { name: 'email', type: 'string', isNullable: false },
  { name: 'username', type: 'string', isNullable: true },
  { name: 'created_at', type: 'string', isNullable: true },
  { name: 'user_tier', type: 'UserTier', isNullable: true },
];

// ============================================================================
// TEST EACH FORMATTER
// ============================================================================

console.log('\n' + '='.repeat(60));
console.log('TESTING FORMATTERS');
console.log('='.repeat(60));

console.log('\n--- formatRowContent ---');
console.log(formatRowContent('profiles', testFields));

console.log('\n--- formatInsertContent ---');
console.log(formatInsertContent('profiles', testFields));

console.log('\n--- formatUpdateContent ---');
console.log(formatUpdateContent('profiles', testFields));

console.log('\n--- formatPublicContent ---');
console.log(formatPublicContent('profiles', testFields));

console.log('\n--- formatFormContent ---');
console.log(formatFormContent('profiles', testFields));

// ============================================================================
// DEBUG: Why is parseRowContentToFields failing?
// ============================================================================

console.log('\n' + '='.repeat(60));
console.log('DEBUG: Testing parseRowContentToFields');
console.log('='.repeat(60));

// Simulate what rowContent looks like
const sampleRowContent = `  id: string;
  email: string;
  username: string | null;
  created_at: string | null;
  user_tier: UserTier | null;`;

console.log('\nSample rowContent:');
console.log(sampleRowContent);
console.log('\nParsed fields:');

function testParse(rowContent: string): void {
  const lines = rowContent.split('\n');
  
  for (const line of lines) {
    console.log(`\nLine: "${line}"`);
    
    const match = line.match(/^\s*(\w+):\s*(.+?)(;?)$/);
    if (!match) {
      console.log('  → NO MATCH');
      continue;
    }
    
    const fieldName = match[1];
    let fieldType = match[2].trim();
    const isNullable = fieldType.includes('| null');
    fieldType = fieldType.replace(/\| null/g, '').trim();
    
    console.log(`  → fieldName: "${fieldName}"`);
    console.log(`  → fieldType: "${fieldType}"`);
    console.log(`  → isNullable: ${isNullable}`);
  }
}

testParse(sampleRowContent);
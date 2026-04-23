// scripts/shared/list-tables.ts
// Extract all table names from database.types.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getProjectRoot } from './paths.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = getProjectRoot();

const DB_TYPES_PATH = path.join(PROJECT_ROOT, 'src/types/supabase/database.types.ts');

function stripBom(content: string): string {
  if (content.charCodeAt(0) === 0xFEFF) {
    return content.slice(1);
  }
  return content;
}

function main(): void {
  // Read file
  let content = fs.readFileSync(DB_TYPES_PATH, 'utf-8');
  content = stripBom(content);
  
  // Split into lines
  const lines = content.split(/\r?\n/);
  
  const tableNames: string[] = [];
  let inTables = false;
  
  // Pattern for table names (6 spaces, then word, then colon)
  const tablePattern = /^\s{6}(\w+):/;
  
  for (const line of lines) {
    // Find the Tables: { line
    if (line.includes('Tables: {')) {
      inTables = true;
      continue;
    }
    
    // Exit when we hit Views or another section
    if (inTables && (line.includes('Views: {') || line.includes('Functions: {') || line.includes('Enums: {'))) {
      break;
    }
    
    // Extract table names
    if (inTables) {
      const match = line.match(tablePattern);
      if (match) {
        tableNames.push(match[1]);
      }
    }
  }
  
  // Output results
  console.log(`\n📊 Total tables found: ${tableNames.length}\n`);
  console.log('─'.repeat(50));
  
  // Group by first letter
  const byLetter: Record<string, string[]> = {};
  for (const name of tableNames) {
    const firstLetter = name[0].toUpperCase();
    if (!byLetter[firstLetter]) byLetter[firstLetter] = [];
    byLetter[firstLetter].push(name);
  }
  
  for (const [letter, names] of Object.entries(byLetter).sort()) {
    console.log(`\n${letter}: ${names.length} tables`);
    for (const name of names) {
      console.log(`  - ${name}`);
    }
  }
  
  console.log('\n' + '─'.repeat(50));
  console.log(`\n✅ Total: ${tableNames.length} tables\n`);
  
  // Optional: Save to file
  const outputPath = path.join(PROJECT_ROOT, 'scripts/table-names.json');
  fs.writeFileSync(outputPath, JSON.stringify(tableNames, null, 2));
  console.log(`📁 Saved to: ${outputPath}\n`);
}

main();
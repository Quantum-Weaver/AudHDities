// src/scripts/peek-lines.ts
// Simple line peeker - shows raw content of specific line ranges
// Now with BOM removal

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================================================
// CONFIGURATION - EDIT THESE VALUES
// =====================================================

const FILE_PATH = path.join(process.cwd(), 'src/types/supabase/database.types.ts');

// CHANGE THESE NUMBERS TO SEE DIFFERENT LINES
const START_LINE = 1;
const END_LINE = 7;

// =====================================================
// SCRIPT
// =====================================================

function main(): void {
  console.log('\n');
  console.log('─'.repeat(70));
  console.log('📄 LINE PEEKER');
  console.log('─'.repeat(70));
  console.log(`\n📁 File: ${FILE_PATH}`);
  console.log(`📍 Lines: ${START_LINE} - ${END_LINE}`);
  console.log('\n' + '─'.repeat(70));
  console.log('📝 RAW CONTENT:');
  console.log('─'.repeat(70) + '\n');

  // Check if file exists
  if (!fs.existsSync(FILE_PATH)) {
    console.log(`❌ File not found: ${FILE_PATH}`);
    process.exit(1);
  }

  // Read file
  let content = fs.readFileSync(FILE_PATH, 'utf-8');
  
  // 🔧 FIX: Remove UTF-8 BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
    console.log('🔧 UTF-8 BOM detected and removed\n');
  }

  const lines = content.split(/\r?\n/);
  
  console.log(`Total lines in file: ${lines.length}\n`);
  console.log('─'.repeat(70));
  console.log(`LINES ${START_LINE} - ${END_LINE}:`);
  console.log('─'.repeat(70) + '\n');

  // Display requested lines
  for (let i = START_LINE - 1; i <= END_LINE - 1 && i < lines.length; i++) {
    const lineNum = i + 1;
    const rawLine = lines[i];
    
    // Show line number and raw content
    console.log(`${String(lineNum).padStart(5, ' ')} | ${rawLine}`);
  }

  console.log('\n' + '─'.repeat(70));
  console.log('✅ Done');
  console.log('─'.repeat(70) + '\n');
}

main();
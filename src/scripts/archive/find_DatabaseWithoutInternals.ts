// scripts/2-find_DatabaseWithoutInternals.ts
// Find line number of 'type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">'

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_TYPES_PATH = path.join(process.cwd(), 'src/types/supabase/database.types.ts');

function stripBom(content: string): string {
  if (content.charCodeAt(0) === 0xFEFF) {
    return content.slice(1);
  }
  return content;
}

function main(): void {
  let content = fs.readFileSync(DB_TYPES_PATH, 'utf-8');
  content = stripBom(content);
  
  const lines = content.split(/\r?\n/);
  const targetLine = 'type DatabaseWithoutInternals =';
  
  let lineNumber = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(targetLine)) {
      lineNumber = i + 1; // 1-indexed
      break;
    }
  }
  
  console.log(lineNumber);
}

main();
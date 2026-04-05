// scripts/1-file_line_count.ts
// Count total lines in database.types.ts

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
  let content = fs.readFileSync(DB_TYPES_PATH, 'UTF-16');
  content = stripBom(content);
  
  const lines = content.split(/\r?\n/);
  console.log(lines.length);
}

main();
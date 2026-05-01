// scripts/generate/test-parser.ts
import { parseDatabaseTypes } from './parser';
import * as path from 'path';

const DATABASE_TYPES_PATH = path.join(process.cwd(), 'src', 'types', 'supabase', 'database.types.ts');

async function test() {
  console.log('Testing parser...\n');
  
  const result = parseDatabaseTypes(DATABASE_TYPES_PATH);
  
  console.log(`Found ${result.tables.length} tables:`);
  result.tables.slice(0, 10).forEach(t => {
    console.log(`  - ${t.name} (${t.columns.length} columns, ${t.relationships.length} relations)`);
  });
  
  if (result.tables.length > 10) {
    console.log(`  ... and ${result.tables.length - 10} more`);
  }
  
  console.log(`\nFound ${result.enums.length} enums:`);
  result.enums.slice(0, 10).forEach(e => {
    console.log(`  - ${e.name} (${e.values.length} values)`);
  });
  
  if (result.enums.length > 10) {
    console.log(`  ... and ${result.enums.length - 10} more`);
  }
  
  console.log(`\nFound ${result.views.length} views:`);
  result.views.forEach(v => {
    console.log(`  - ${v.name} (${v.columns.length} columns)`);
  });
}

test().catch(console.error);
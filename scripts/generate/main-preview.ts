// scripts/generate/main-preview.ts
import { parseDatabaseTypes } from './parser';
import { previewTypeFile } from './type-generator';
import { previewHookFile } from './hook-generator';
import { previewApiFiles } from './api-generator';
import * as path from 'path';

const DATABASE_TYPES_PATH = path.join(process.cwd(), 'src', 'types', 'supabase', 'database.types.ts');

// Tables to skip (already have custom implementations)
const SKIP_TABLES = [
  'profiles',
  'creator_profiles',
  'vendor_profiles',
  'community_profiles',
  'products',
  'sales',
  'contributions',
  'residual_payouts',
  'applications',
  'contact_submissions',
  'admin_logs',
  'user_badges',
];

// Tables that need custom hooks (skip auto-generation)
const CUSTOM_HOOK_TABLES = [
  'profiles',
  'creator_profiles',
  'vendor_profiles',
  'products',
  'sales',
];

function shouldSkipTable(tableName: string): boolean {
  return SKIP_TABLES.includes(tableName);
}

function needsCustomHook(tableName: string): boolean {
  return CUSTOM_HOOK_TABLES.includes(tableName);
}

async function main() {
  console.log('\n🏛️  AUDHDITIES GENERATOR PREVIEW\n');
  console.log('═'.repeat(60));
  
  // Parse database types
  console.log('\n📊 Parsing database.types.ts...');
  const { tables, enums, views } = parseDatabaseTypes(DATABASE_TYPES_PATH);
  
  console.log(`   Found ${tables.length} tables, ${enums.length} enums, ${views.length} views`);
  
  // Preview Type Files
  console.log('\n📁 TYPE FILES PREVIEW:');
  console.log('─'.repeat(60));
  
  for (const table of tables) {
    if (shouldSkipTable(table.name)) {
      console.log(`   ⏭️  ${table.name}.ts → SKIP (already exists)`);
      continue;
    }
    
    const preview = previewTypeFile(table);
    console.log(`   📄 ${preview.filePath}`);
    console.log(`      Action: ${preview.action}`);
    if (preview.reason) console.log(`      Reason: ${preview.reason}`);
  }
  
  // Preview Hook Files
  console.log('\n🪝 HOOK FILES PREVIEW:');
  console.log('─'.repeat(60));
  
  for (const table of tables) {
    if (shouldSkipTable(table.name)) {
      console.log(`   ⏭️  use${toPascalCase(table.name)}.ts → SKIP (already exists)`);
      continue;
    }
    
    if (needsCustomHook(table.name)) {
      console.log(`   ✨ use${toPascalCase(table.name)}.ts → CUSTOM (manual implementation)`);
      continue;
    }
    
    const preview = previewHookFile(table);
    console.log(`   🪝 ${preview.filePath}`);
    console.log(`      Action: ${preview.action}`);
  }
  
  // Preview API Routes
  console.log('\n🌐 API ROUTES PREVIEW:');
  console.log('─'.repeat(60));
  
  for (const table of tables) {
    if (shouldSkipTable(table.name)) {
      console.log(`   ⏭️  /api/${table.name} → SKIP (custom implementation exists)`);
      continue;
    }
    
    const preview = previewApiFiles(table);
    console.log(`   📡 /api/${table.name}/route.ts`);
    console.log(`      Action: ${preview.action}`);
    console.log(`   📡 /api/${table.name}/[id]/route.ts`);
    console.log(`      Action: ${preview.action}`);
  }
  
  // Enums Preview
  console.log('\n🏷️  ENUMS (Reference):');
  console.log('─'.repeat(60));
  
  for (const enumInfo of enums) {
    console.log(`   • ${enumInfo.name} (${enumInfo.values.length} values)`);
  }
  
  // Summary
  console.log('\n📊 SUMMARY:');
  console.log('─'.repeat(60));
  
  const typeFilesToCreate = tables.filter(t => !shouldSkipTable(t.name)).length;
  const hookFilesToCreate = tables.filter(t => !shouldSkipTable(t.name) && !needsCustomHook(t.name)).length;
  const apiRoutesToCreate = tables.filter(t => !shouldSkipTable(t.name)).length;
  
  console.log(`   📁 Type Files to Create: ${typeFilesToCreate}`);
  console.log(`   🪝 Hook Files to Create: ${hookFilesToCreate}`);
  console.log(`   🌐 API Routes to Create: ${apiRoutesToCreate}`);
  
  console.log('\n⚠️  This is a DRY RUN. No files were created.');
  console.log('   To generate files, run: npm run generate:files\n');
}

function toPascalCase(str: string): string {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

main().catch(console.error);
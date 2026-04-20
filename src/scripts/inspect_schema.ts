// scripts/inspect-schema.ts
// Run with: npx tsx scripts/inspect-schema.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use service role for full access
);

async function inspectSchema() {
  console.log('\n📊 Fetching schema...\n');

  // 1. Get all tables
  const { data: tables, error: tablesError } = await supabase
    .rpc('get_schema_tables');
  
  if (tablesError) {
    console.log('❌ RPC get_schema_tables failed:', tablesError.message);
    console.log('   You need to create this function in your database first.\n');
  } else {
    console.log(`✅ Found ${tables?.length || 0} columns across tables`);
    const tableNames = [...new Set(tables?.map((t: { table_name: any; }) => t.table_name))];
    console.log(`   Tables: ${tableNames.join(', ')}`);
  }

  // 2. Get all enums
  const { data: enums, error: enumsError } = await supabase
    .rpc('get_schema_enums');
  
  if (enumsError) {
    console.log('❌ RPC get_schema_enums failed:', enumsError.message);
  } else {
    const enumNames = [...new Set(enums?.map((e: { enum_name: any; }) => e.enum_name))];
    console.log(`✅ Found ${enumNames.length} enums: ${enumNames.join(', ')}`);
  }

  // 3. Get all functions
  const { data: functions, error: functionsError } = await supabase
    .rpc('get_schema_functions');
  
  if (functionsError) {
    console.log('❌ RPC get_schema_functions failed:', functionsError.message);
  } else {
    console.log(`✅ Found ${functions?.length || 0} functions`);
  }

  console.log('\n✨ Done.\n');
}

inspectSchema().catch(console.error);
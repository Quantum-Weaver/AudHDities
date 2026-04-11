// app/api/schema/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { Database } from '@/types/supabase/database.types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    
    // Fetch table information from Postgres system catalogs
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_schema_tables');
    
    if (tablesError) throw tablesError;
    
    // Fetch enum information
    const { data: enums, error: enumsError } = await supabase
      .rpc('get_schema_enums');
    
    if (enumsError) throw enumsError;
    
    // Fetch function information
    const { data: functions, error: functionsError } = await supabase
      .rpc('get_schema_functions');
    
    if (functionsError) throw functionsError;
    
    return NextResponse.json({
      success: true,
      data: {
        tables,
        enums,
        functions,
        generatedAt: new Date().toISOString(),
        totalTables: tables?.length || 0,
        totalEnums: enums?.length || 0,
        totalFunctions: functions?.length || 0,
      }
    });
  } catch (error) {
    console.error('Schema API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schema' },
      { status: 500 }
    );
  }
}
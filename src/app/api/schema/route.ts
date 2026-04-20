// app/api/schema/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    
    // Fetch table information
    const { data: tables, error: tablesError } = await supabase.rpc('get_schema_tables');
    
    if (tablesError) {
      console.error('Tables RPC error:', tablesError);
      return NextResponse.json({ 
        success: false, 
        error: `Tables RPC failed: ${tablesError.message}` 
      }, { status: 500 });
    }
    
    // Fetch enum information
    const { data: enums, error: enumsError } = await supabase.rpc('get_schema_enums');
    
    if (enumsError) {
      console.error('Enums RPC error:', enumsError);
      return NextResponse.json({ 
        success: false, 
        error: `Enums RPC failed: ${enumsError.message}` 
      }, { status: 500 });
    }
    
    // Fetch function information
    const { data: functions, error: functionsError } = await supabase.rpc('get_schema_functions');
    
    if (functionsError) {
      console.error('Functions RPC error:', functionsError);
      return NextResponse.json({ 
        success: false, 
        error: `Functions RPC failed: ${functionsError.message}` 
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        tables: tables || [],
        enums: enums || [],
        functions: functions || [],
        generatedAt: new Date().toISOString(),
        totalTables: tables?.length || 0,
        totalEnums: enums?.length || 0,
        totalFunctions: functions?.length || 0,
      }
    });
    
  } catch (error) {
    console.error('Schema API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch schema' 
      },
      { status: 500 }
    );
  }
}
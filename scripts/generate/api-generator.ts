// scripts/generate/api-generator.ts
import { TableInfo } from './parser';

export interface ApiFilePreview {
  tableName: string;
  listFilePath: string;
  singleFilePath: string;
  listContent: string;
  singleContent: string;
  action: 'create' | 'skip';
  reason?: string;
}

export function previewApiFiles(table: TableInfo): ApiFilePreview {
  const listFilePath = `src/app/api/${table.name}/route.ts`;
  const singleFilePath = `src/app/api/${table.name}/[id]/route.ts`;
  
  const listContent = generateListApiContent(table);
  const singleContent = generateSingleApiContent(table);
  
  return {
    tableName: table.name,
    listFilePath,
    singleFilePath,
    listContent,
    singleContent,
    action: 'create',
  };
}

function generateListApiContent(table: TableInfo): string {
  return `// app/api/${table.name}/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = supabase
      .from('${table.name}')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({
      data,
      pagination: { limit, offset, total: count || 0 },
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('${table.name}')
      .insert(body)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
`;
}

function generateSingleApiContent(table: TableInfo): string {
  return `// app/api/${table.name}/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('${table.name}')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    
    return NextResponse.json({ data });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('${table.name}')
      .update(body)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { error } = await supabase
      .from('${table.name}')
      .delete()
      .eq('id', id);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
`;
}
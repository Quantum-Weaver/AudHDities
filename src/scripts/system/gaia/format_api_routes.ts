// src/scripts/system/gaia/format_api_routes.ts
// ============================================================================
// FORMAT API ROUTES (GAIA) - COMPLETE WORKING VERSION
// ============================================================================
// Purpose: Format table definitions into Next.js API routes
// Dependencies: ApiRouteTableInput interface
// Output: src/app/api/generated/{deityFolder}/{tableName}/route.ts
// ============================================================================

import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface ApiRouteTableInput {
  name: string;
  deityFolder: string;
  handlingLevel: string;
  category: ObjectCategory;
  shouldGenerateApiRoutes: boolean;
}

export interface FormatApiRoutesOptions {
  verbose?: boolean;
}

export interface FormattedApiRoute {
  content: string;
  filePath: string;
  tableName: string;
  routeType: 'list' | 'single' | 'special';
  specialType?: string;
  deityFolder: string;
}

/**
 * Convert snake_case to PascalCase
 */
function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

/**
 * Generate header comment for API route file
 */
function generateHeader(tableName: string, deityFolder: string, routeType: string, methods: string[]): string {
  const timestamp = new Date().toISOString();
  const pascalName = toPascalCase(tableName);
  const routePath = routeType === 'single' ? `/${deityFolder}/${tableName}/[id]` : `/${deityFolder}/${tableName}`;
  
  return `// =====================================================
// API ROUTE: /api/generated${routePath}
// METHODS: ${methods.join(', ')}
// GENERATED: ${timestamp}
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { ${pascalName}InsertSchema, ${pascalName}UpdateSchema } from '@/lib/validators/generated/${deityFolder}/${tableName}';

`;
}

/**
 * Generate GET list route
 */
function generateGetListRoute(tableName: string): string {
  return `
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = supabase.from('${tableName}').select('*', { count: 'exact' });
    
    // Apply filters from query params
    for (const [key, value] of searchParams.entries()) {
      if (!['limit', 'offset', 'sort', 'order'].includes(key)) {
        query = query.eq(key, value);
      }
    }
    
    // Apply sorting
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') === 'asc';
    query = query.order(sort, { ascending: order });
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data,
      pagination: { limit, offset, total: count || 0 }
    });
  } catch (error) {
    console.error('Error fetching ${tableName}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ${tableName}' },
      { status: 500 }
    );
  }
}`;
}

/**
 * Generate GET single route
 */
function generateGetSingleRoute(tableName: string): string {
  return `
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    
    const { data, error } = await supabase
      .from('${tableName}')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '${tableName} not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching ${tableName}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ${tableName}' },
      { status: 500 }
    );
  }
}`;
}

/**
 * Generate POST route
 */
function generatePostRoute(tableName: string, deityFolder: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const body = await request.json();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const validated = ${pascalName}InsertSchema.parse(body);
    
    const { data, error } = await supabase
      .from('${tableName}')
      .insert({ ...validated, created_by: user.id })
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating ${tableName}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create ${tableName}' },
      { status: 500 }
    );
  }
}`;
}

/**
 * Generate PUT route
 */
function generatePutRoute(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    const body = await request.json();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user owns this record
    const { data: existing } = await supabase
      .from('${tableName}')
      .select('created_by')
      .eq('id', id)
      .single();
    
    if (existing && existing.created_by !== user.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (!profile?.is_admin) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    
    const validated = ${pascalName}UpdateSchema.parse(body);
    
    const { data, error } = await supabase
      .from('${tableName}')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '${tableName} not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating ${tableName}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update ${tableName}' },
      { status: 500 }
    );
  }
}`;
}

/**
 * Generate DELETE route
 */
function generateDeleteRoute(tableName: string): string {
  return `
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabase();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user owns this record
    const { data: existing } = await supabase
      .from('${tableName}')
      .select('created_by')
      .eq('id', id)
      .single();
    
    if (existing && existing.created_by !== user.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (!profile?.is_admin) {
        return NextResponse.json(
          { success: false, error: 'Forbidden' },
          { status: 403 }
        );
      }
    }
    
    const { error } = await supabase
      .from('${tableName}')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: '${tableName} not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting ${tableName}:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete ${tableName}' },
      { status: 500 }
    );
  }
}`;
}

/**
 * Format all API routes for a table
 */
export function formatApiRoutes(
  table: ApiRouteTableInput,
  options?: FormatApiRoutesOptions
): FormattedApiRoute[] {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, category } = table;
  const results: FormattedApiRoute[] = [];
  
  if (verbose) {
    logDebug(`Formatting API routes for: ${tableName} -> ${deityFolder}`);
  }
  
  // Main route (list + create)
  if (category.generateApiGetList || category.generateApiPost) {
    const methods: string[] = [];
    let content = generateHeader(tableName, deityFolder, 'list', 
      [...(category.generateApiGetList ? ['GET'] : []), ...(category.generateApiPost ? ['POST'] : [])]);
    
    if (category.generateApiGetList) {
      content += generateGetListRoute(tableName);
      methods.push('GET');
    }
    
    if (category.generateApiPost) {
      content += generatePostRoute(tableName, deityFolder);
      methods.push('POST');
    }
    
    const filePath = `src/app/api/generated/${deityFolder}/${tableName}/route.ts`;
    
    results.push({
      content,
      filePath,
      tableName,
      routeType: 'list',
      deityFolder
    });
    
    if (verbose) logDebug(`  Formatted main route for ${tableName}`);
  }
  
  // Single record route (get/put/delete)
  if (category.generateApiGetSingle || category.generateApiPut || category.generateApiDelete) {
    const methods: string[] = [];
    let content = generateHeader(tableName, deityFolder, 'single',
      [...(category.generateApiGetSingle ? ['GET'] : []), 
       ...(category.generateApiPut ? ['PUT'] : []), 
       ...(category.generateApiDelete ? ['DELETE'] : [])]);
    
    if (category.generateApiGetSingle) {
      content += generateGetSingleRoute(tableName);
      methods.push('GET');
    }
    
    if (category.generateApiPut) {
      content += generatePutRoute(tableName);
      methods.push('PUT');
    }
    
    if (category.generateApiDelete) {
      content += generateDeleteRoute(tableName);
      methods.push('DELETE');
    }
    
    const filePath = `src/app/api/generated/${deityFolder}/${tableName}/[id]/route.ts`;
    
    results.push({
      content,
      filePath,
      tableName,
      routeType: 'single',
      deityFolder
    });
    
    if (verbose) logDebug(`  Formatted single route for ${tableName}`);
  }
  
  return results;
}

/**
 * Format multiple tables into API routes
 */
export function formatMultipleApiRoutes(
  tables: ApiRouteTableInput[],
  options?: FormatApiRoutesOptions
): FormattedApiRoute[] {
  const { verbose = false } = options || {};
  const results: FormattedApiRoute[] = [];
  
  for (const table of tables) {
    const routes = formatApiRoutes(table, options);
    results.push(...routes);
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} API route files`);
  }
  
  return results;
}
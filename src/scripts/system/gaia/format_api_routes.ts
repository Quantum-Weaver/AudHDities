// src/scripts/system/gaia/formatApiRoutes.ts
// ============================================================================
// FORMAT API ROUTES (GAIA)
// ============================================================================
// Purpose: Format table definitions into Next.js API routes
// Dependencies: types from extractTables, workflow_config
// ============================================================================

import type { TableInfo } from './extract_tables.js';
import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface FormatApiRoutesOptions {
  verbose?: boolean;
  category?: ObjectCategory;
}

export interface FormattedApiRoute {
  content: string;
  filePath: string;
  tableName: string;
  routeType: 'list' | 'single' | 'special';
  specialType?: string;
  deityFolder: string;
  category: ObjectCategory;
}

/**
 * Convert snake_case to PascalCase for type names
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Generate header comment for API route file
 */
function generateHeader(tableName: string, routeType: string, methods: string[]): string {
  const timestamp = new Date().toISOString();
  return `// =====================================================
// API ROUTE: /api/${tableName}${routeType === 'single' ? '/[id]' : routeType === 'special' ? '/[special]' : ''}
// METHODS: ${methods.join(', ')}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

`;
}

/**
 * Generate GET /api/[table] route (list)
 */
function generateGetListRoute(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams, getOptionalUser } from '@/lib/api/auth';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { userId } = await getOptionalUser(request);
    const { page, limit } = getPaginationParams(request.nextUrl);
    const filters = getFilters(request.nextUrl);
    const { column: sortColumn, ascending } = getSortParams(request.nextUrl);
    
    let query = supabase.from('${tableName}').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sortColumn, { ascending });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return successResponse({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: page < Math.ceil((count || 0) / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching ${tableName}:', error);
    return errorResponse('Failed to fetch ${tableName}', 500);
  }
}
`;
}

/**
 * Generate GET /api/[table]/[id] route (single)
 */
function generateGetSingleRoute(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, notFound } from '@/lib/api/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('${tableName}')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('${tableName}');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching ${tableName}:', error);
    return errorResponse('Failed to fetch ${tableName}', 500);
  }
}
`;
}

/**
 * Generate POST /api/[table] route (create)
 */
function generatePostRoute(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized } from '@/lib/api/auth';
import { getAuthenticatedUser } from '@/lib/api/auth';
import { ${pascalName}InsertSchema } from '@/lib/validators/generated/${tableName}';

export async function POST(request: NextRequest) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    const body = await request.json();
    const validated = ${pascalName}InsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('${tableName}')
      .insert({ ...validated, created_by: userId })
      .select()
      .single();
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error creating ${tableName}:', error);
    return errorResponse('Failed to create ${tableName}', 500);
  }
}
`;
}

/**
 * Generate PUT /api/[table]/[id] route (update)
 */
function generatePutRoute(tableName: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from '@/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from '@/lib/api/auth';
import { ${pascalName}UpdateSchema } from '@/lib/validators/generated/${tableName}';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, '${tableName}', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = ${pascalName}UpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('${tableName}')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('${tableName}');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating ${tableName}:', error);
    return errorResponse('Failed to update ${tableName}', 500);
  }
}
`;
}

/**
 * Generate DELETE /api/[table]/[id] route
 */
function generateDeleteRoute(tableName: string): string {
  return `import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from '@/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from '@/lib/api/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, '${tableName}', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('${tableName}')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('${tableName}');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting ${tableName}:', error);
    return errorResponse('Failed to delete ${tableName}', 500);
  }
}
`;
}

/**
 * Generate special route (e.g., submit, results, link, unlink)
 */
function generateSpecialRoute(tableName: string, specialType: string): string {
  const pascalName = toPascalCase(tableName);
  
  return `import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized } from '@/lib/api/auth';
import { getAuthenticatedUser } from '@/lib/api/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id?: string }> }
) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    const body = await request.json();
    const supabase = await createApiSupabase();
    
    // Special route logic for ${specialType}
    const { data, error } = await supabase
      .rpc('${tableName}_${specialType}', { ...body, p_user_id: userId });
    
    if (error) throw error;
    
    return successResponse(data, 201);
  } catch (error) {
    console.error('Error in ${specialType}:', error);
    return errorResponse('Failed to process ${specialType}', 500);
  }
}
`;
}

/**
 * Format main API route file (list + create)
 */
function formatMainApiRoute(tableName: string, hasGetList: boolean, hasPost: boolean): string {
  const methods: string[] = [];
  let content = generateHeader(tableName, 'list', 
    [...(hasGetList ? ['GET'] : []), ...(hasPost ? ['POST'] : [])]);
  
  if (hasGetList) {
    content += generateGetListRoute(tableName);
    methods.push('GET');
  }
  
  if (hasPost) {
    content += generatePostRoute(tableName);
    methods.push('POST');
  }
  
  return content;
}

/**
 * Format single record API route file (get/put/delete)
 */
function formatSingleApiRoute(tableName: string, hasGetSingle: boolean, hasPut: boolean, hasDelete: boolean): string {
  const methods: string[] = [];
  let content = generateHeader(tableName, 'single',
    [...(hasGetSingle ? ['GET'] : []), ...(hasPut ? ['PUT'] : []), ...(hasDelete ? ['DELETE'] : [])]);
  
  if (hasGetSingle) {
    content += generateGetSingleRoute(tableName);
    methods.push('GET');
  }
  
  if (hasPut) {
    content += generatePutRoute(tableName);
    methods.push('PUT');
  }
  
  if (hasDelete) {
    content += generateDeleteRoute(tableName);
    methods.push('DELETE');
  }
  
  return content;
}

/**
 * Format special API route file
 */
function formatSpecialApiRoute(tableName: string, specialType: string): string {
  const content = generateHeader(tableName, 'special', ['POST']);
  return content + generateSpecialRoute(tableName, specialType);
}

/**
 * Format all API routes for a table
 */
export function formatApiRoutes(
  tableInfo: TableInfo,
  category: ObjectCategory,
  deityFolder: string,
  options?: FormatApiRoutesOptions
): FormattedApiRoute[] {
  const { verbose = false } = options || {};
  const { name: tableName } = tableInfo;
  const results: FormattedApiRoute[] = [];
  
  if (verbose) {
    logDebug(`Formatting API routes for: ${tableName} (${category.handlingLevel})`);
  }
  
  // Main route (list + create)
  if (category.generateApiGetList || category.generateApiPost) {
    const content = formatMainApiRoute(tableName, category.generateApiGetList, category.generateApiPost);
    const filePath = `app/api/generated/${tableName}/route.ts`;
    
    results.push({
      content,
      filePath,
      tableName,
      routeType: 'list',
      deityFolder,
      category
    });
    
    if (verbose) {
      logDebug(`  Formatted main route for ${tableName}`);
    }
  }
  
  // Single record route (get/put/delete)
  if (category.generateApiGetSingle || category.generateApiPut || category.generateApiDelete) {
    const content = formatSingleApiRoute(tableName, category.generateApiGetSingle, category.generateApiPut, category.generateApiDelete);
    const filePath = `app/api/generated/${tableName}/[id]/route.ts`;
    
    results.push({
      content,
      filePath,
      tableName,
      routeType: 'single',
      deityFolder,
      category
    });
    
    if (verbose) {
      logDebug(`  Formatted single route for ${tableName}`);
    }
  }
  
  // Special routes
  if (category.generateApiSpecial && category.generateApiSpecial.length > 0) {
    for (const specialType of category.generateApiSpecial) {
      const content = formatSpecialApiRoute(tableName, specialType);
      const filePath = `app/api/generated/${tableName}/${specialType}/route.ts`;
      
      results.push({
        content,
        filePath,
        tableName,
        routeType: 'special',
        specialType,
        deityFolder,
        category
      });
      
      if (verbose) {
        logDebug(`  Formatted special route ${specialType} for ${tableName}`);
      }
    }
  }
  
  return results;
}

/**
 * Format multiple tables into API routes
 */
export function formatMultipleApiRoutes(
  tables: TableInfo[],
  getDeityFolder: (tableName: string) => string,
  getCategory: (tableName: string) => ObjectCategory,
  shouldGenerate: (tableName: string) => boolean,
  options?: FormatApiRoutesOptions
): FormattedApiRoute[] {
  const { verbose = false } = options || {};
  const results: FormattedApiRoute[] = [];
  
  if (verbose) {
    logDebug(`Formatting API routes for ${tables.length} tables...`);
  }
  
  for (const tableInfo of tables) {
    if (!shouldGenerate(tableInfo.name)) {
      if (verbose) {
        logDebug(`  Skipping API routes for ${tableInfo.name} (not full_crud, assessment, or join_table)`);
      }
      continue;
    }
    
    const deityFolder = getDeityFolder(tableInfo.name);
    const category = getCategory(tableInfo.name);
    const routes = formatApiRoutes(tableInfo, category, deityFolder, options);
    results.push(...routes);
    
    if (verbose) {
      logDebug(`  Formatted ${routes.length} API routes for ${tableInfo.name}`);
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} API route files`);
  }
  
  return results;
}
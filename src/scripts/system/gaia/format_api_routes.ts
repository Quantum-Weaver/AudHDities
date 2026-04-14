// src/scripts/generators/gaia/format_api_routes.ts
// ============================================================================
// FORMAT API ROUTES (GAIA)
// ============================================================================
// Purpose: Format table definitions into Next.js API routes
// Dependencies: EnrichedTable from enrich_objects, shared utilities
// Output: src/app/api/generated/{deityFolder}/{tableName}/route.ts
// ============================================================================

import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';
import { ImportManager } from '../../shared/import_manager.js';
import type { EnrichedTable } from './enrich_objects.js';

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
function generateHeader(tableName: string, deityFolder: string, routeType: string, methods: string[]): string {
  const timestamp = new Date().toISOString();
  const routePath = routeType === 'single' 
    ? `/${deityFolder}/${tableName}/[id]` 
    : routeType === 'special' 
    ? `/${deityFolder}/${tableName}/[special]`
    : `/${deityFolder}/${tableName}`;
    
  return `// =====================================================
// API ROUTE: /api/generated${routePath}
// METHODS: ${methods.join(', ')}
// GENERATED: ${timestamp}
// SOURCE: database.types.ts
// =====================================================

`;
}

/**
 * Generate GET /api/generated/{deity}/{table} route (list)
 */
function generateGetListRoute(tableName: string, deityFolder: string, importManager: ImportManager): string {
  // Add required imports
  importManager.addImport('next/server', 'NextRequest');
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase');
  importManager.addImport('@/lib/api/auth', 'successResponse');
  importManager.addImport('@/lib/api/auth', 'errorResponse');
  importManager.addImport('@/lib/api/auth', 'getPaginationParams');
  importManager.addImport('@/lib/api/auth', 'getFilters');
  importManager.addImport('@/lib/api/auth', 'getSortParams');
  importManager.addImport('@/lib/api/auth', 'getOptionalUser');
  
  return `export async function GET(request: NextRequest) {
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
}`;
}

/**
 * Generate GET /api/generated/{deity}/{table}/[id] route (single)
 */
function generateGetSingleRoute(tableName: string, deityFolder: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest');
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase');
  importManager.addImport('@/lib/api/auth', 'successResponse');
  importManager.addImport('@/lib/api/auth', 'errorResponse');
  importManager.addImport('@/lib/api/auth', 'notFound');
  
  return `export async function GET(
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
}`;
}

/**
 * Generate POST /api/generated/{deity}/{table} route (create)
 */
function generatePostRoute(tableName: string, deityFolder: string, importManager: ImportManager): string {
  const pascalName = toPascalCase(tableName);
  
  importManager.addImport('next/server', 'NextRequest');
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase');
  importManager.addImport('@/lib/api/auth', 'successResponse');
  importManager.addImport('@/lib/api/auth', 'errorResponse');
  importManager.addImport('@/lib/api/auth', 'unauthorized');
  importManager.addImport('@/lib/api/auth', 'getAuthenticatedUser');
  importManager.addImport('@/lib/validators/generated', `${pascalName}InsertSchema`, true);
  
  return `export async function POST(request: NextRequest) {
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
}`;
}

/**
 * Generate PUT /api/generated/{deity}/{table}/[id] route (update)
 */
function generatePutRoute(tableName: string, deityFolder: string, importManager: ImportManager): string {
  const pascalName = toPascalCase(tableName);
  
  importManager.addImport('next/server', 'NextRequest');
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase');
  importManager.addImport('@/lib/api/auth', 'successResponse');
  importManager.addImport('@/lib/api/auth', 'errorResponse');
  importManager.addImport('@/lib/api/auth', 'unauthorized');
  importManager.addImport('@/lib/api/auth', 'notFound');
  importManager.addImport('@/lib/api/auth', 'forbidden');
  importManager.addImport('@/lib/api/auth', 'getAuthenticatedUser');
  importManager.addImport('@/lib/api/auth', 'checkOwnership');
  importManager.addImport('@/lib/api/auth', 'isAdmin');
  importManager.addImport('@/lib/validators/generated', `${pascalName}UpdateSchema`, true);
  
  return `export async function PUT(
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
}`;
}

/**
 * Generate DELETE /api/generated/{deity}/{table}/[id] route
 */
function generateDeleteRoute(tableName: string, deityFolder: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest');
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase');
  importManager.addImport('@/lib/api/auth', 'successResponse');
  importManager.addImport('@/lib/api/auth', 'errorResponse');
  importManager.addImport('@/lib/api/auth', 'unauthorized');
  importManager.addImport('@/lib/api/auth', 'notFound');
  importManager.addImport('@/lib/api/auth', 'forbidden');
  importManager.addImport('@/lib/api/auth', 'getAuthenticatedUser');
  importManager.addImport('@/lib/api/auth', 'checkOwnership');
  importManager.addImport('@/lib/api/auth', 'isAdmin');
  
  return `export async function DELETE(
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
}`;
}

/**
 * Generate special route (e.g., submit, results, link, unlink)
 */
function generateSpecialRoute(tableName: string, specialType: string, deityFolder: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest');
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase');
  importManager.addImport('@/lib/api/auth', 'successResponse');
  importManager.addImport('@/lib/api/auth', 'errorResponse');
  importManager.addImport('@/lib/api/auth', 'unauthorized');
  importManager.addImport('@/lib/api/auth', 'getAuthenticatedUser');
  
  return `export async function POST(
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
}`;
}

/**
 * Format main API route file (list + create)
 */
function formatMainApiRoute(
  table: EnrichedTable, 
  hasGetList: boolean, 
  hasPost: boolean
): { content: string; methods: string[] } {
  const { name: tableName, deityFolder } = table;
  const importManager = new ImportManager();
  const methods: string[] = [];
  let content = generateHeader(tableName, deityFolder, 'list', 
    [...(hasGetList ? ['GET'] : []), ...(hasPost ? ['POST'] : [])]);
  
  if (hasGetList) {
    content += generateGetListRoute(tableName, deityFolder, importManager);
    methods.push('GET');
    content += '\n';
  }
  
  if (hasPost) {
    content += generatePostRoute(tableName, deityFolder, importManager);
    methods.push('POST');
    content += '\n';
  }
  
  // Add imports at the top
  const importBlock = importManager.getImportBlock();
  const fullContent = importBlock + '\n\n' + content;
  
  return { content: fullContent, methods };
}

/**
 * Format single record API route file (get/put/delete)
 */
function formatSingleApiRoute(
  table: EnrichedTable,
  hasGetSingle: boolean,
  hasPut: boolean,
  hasDelete: boolean
): { content: string; methods: string[] } {
  const { name: tableName, deityFolder } = table;
  const importManager = new ImportManager();
  const methods: string[] = [];
  let content = generateHeader(tableName, deityFolder, 'single',
    [...(hasGetSingle ? ['GET'] : []), ...(hasPut ? ['PUT'] : []), ...(hasDelete ? ['DELETE'] : [])]);
  
  if (hasGetSingle) {
    content += generateGetSingleRoute(tableName, deityFolder, importManager);
    methods.push('GET');
    content += '\n';
  }
  
  if (hasPut) {
    content += generatePutRoute(tableName, deityFolder, importManager);
    methods.push('PUT');
    content += '\n';
  }
  
  if (hasDelete) {
    content += generateDeleteRoute(tableName, deityFolder, importManager);
    methods.push('DELETE');
    content += '\n';
  }
  
  const importBlock = importManager.getImportBlock();
  const fullContent = importBlock + '\n\n' + content;
  
  return { content: fullContent, methods };
}

/**
 * Format special API route file
 */
function formatSpecialApiRoute(
  table: EnrichedTable,
  specialType: string
): { content: string; methods: string[] } {
  const { name: tableName, deityFolder } = table;
  const importManager = new ImportManager();
  const content = generateHeader(tableName, deityFolder, 'special', ['POST']);
  const routeContent = content + generateSpecialRoute(tableName, specialType, deityFolder, importManager);
  const importBlock = importManager.getImportBlock();
  const fullContent = importBlock + '\n\n' + routeContent;
  
  return { content: fullContent, methods: ['POST'] };
}

/**
 * Format all API routes for a table
 * Accepts EnrichedTable (pre-resolved configuration)
 */
export function formatApiRoutes(
  table: EnrichedTable,
  options?: FormatApiRoutesOptions
): FormattedApiRoute[] {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, category } = table;
  const results: FormattedApiRoute[] = [];
  
  if (verbose) {
    logDebug(`Formatting API routes for: ${tableName} -> ${deityFolder} (${category.handlingLevel})`);
  }
  
  // Main route (list + create)
  if (category.generateApiGetList || category.generateApiPost) {
    const { content, methods } = formatMainApiRoute(table, category.generateApiGetList, category.generateApiPost);
    const filePath = `src/app/api/generated/${deityFolder}/${tableName}/route.ts`;
    
    results.push({
      content,
      filePath,
      routeType: 'list',
      tableName,
      deityFolder,
      category
    });
    
    if (verbose) {
      logDebug(`  Formatted main route for ${tableName} -> ${deityFolder}`);
    }
  }
  
  // Single record route (get/put/delete)
  if (category.generateApiGetSingle || category.generateApiPut || category.generateApiDelete) {
    const { content, methods } = formatSingleApiRoute(table, category.generateApiGetSingle, category.generateApiPut, category.generateApiDelete);
    const filePath = `src/app/api/generated/${deityFolder}/${tableName}/[id]/route.ts`;
    
    results.push({
      content,
      filePath,
      routeType: 'single',
      tableName,
      deityFolder,
      category
    });
    
    if (verbose) {
      logDebug(`  Formatted single route for ${tableName} -> ${deityFolder}`);
    }
  }
  
  // Special routes
  if (category.generateApiSpecial && category.generateApiSpecial.length > 0) {
    for (const specialType of category.generateApiSpecial) {
      const { content, methods } = formatSpecialApiRoute(table, specialType);
      const filePath = `src/app/api/generated/${deityFolder}/${tableName}/${specialType}/route.ts`;
      
      results.push({
        content,
        filePath,
        routeType: 'special',
        specialType,
        tableName,
        deityFolder,
        category
      });
      
      if (verbose) {
        logDebug(`  Formatted special route ${specialType} for ${tableName} -> ${deityFolder}`);
      }
    }
  }
  
  return results;
}

/**
 * Format multiple tables into API routes
 * Accepts pre-enriched tables - no callbacks needed
 */
export function formatMultipleApiRoutes(
  tables: EnrichedTable[],
  options?: FormatApiRoutesOptions
): FormattedApiRoute[] {
  const { verbose = false } = options || {};
  const results: FormattedApiRoute[] = [];
  
  if (verbose) {
    logDebug(`Formatting API routes for ${tables.length} tables...`);
  }
  
  for (const table of tables) {
    const routes = formatApiRoutes(table, options);
    results.push(...routes);
    
    if (verbose) {
      logDebug(`  Formatted ${routes.length} API routes for ${table.name} -> ${table.deityFolder}`);
    }
  }
  
  if (verbose) {
    logSuccess(`Formatted ${results.length} API route files`);
  }
  
  return results;
}
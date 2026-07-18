// src/scripts/system/gaia/generate/generate_api_routes.ts
// ============================================================================
// GENERATE API ROUTES (GAIA) - Type-First Version
// ============================================================================
// Purpose: Generate Next.js API routes for tables, views, and functions
// ============================================================================

import type { ObjectCategory } from '@/config/object_categories.js';
import { logDebug, logSuccess } from '../../../shared/logger.js';
import { ImportManager } from '../../../shared/import_manager.js';
import type { EnrichedTable, EnrichedView, EnrichedFunction } from '../enrich/enrich_objects.js';

export interface GenerateApiRoutesOptions {
  verbose?: boolean;
}

export interface GeneratedApiRoute {
  content: string;
  filePath: string;
  objectName: string;
  objectType: 'table' | 'view' | 'function';
  routeType: 'list' | 'single' | 'special' | 'invoke';
  specialType?: string;
  deityFolder: string;
  category?: ObjectCategory;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

// ============================================================================
// TABLE API ROUTES (Full CRUD)
// ============================================================================

function generateGetListRoute(tableName: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest', false);
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase', false);
  importManager.addImport('@/lib/api/auth', 'successResponse', false);
  importManager.addImport('@/lib/api/auth', 'errorResponse', false);
  importManager.addImport('@/lib/api/auth', 'getPaginationParams', false);
  importManager.addImport('@/lib/api/auth', 'getFilters', false);
  importManager.addImport('@/lib/api/auth', 'getSortParams', false);
  importManager.addImport('@/lib/api/auth', 'getOptionalUser', false);

  return `export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { page, limit } = getPaginationParams(request.nextUrl);
    const filters = getFilters(request.nextUrl);
    const { column: sortColumn, ascending } = getSortParams(request.nextUrl);
    
    let query = supabase.from('${tableName}').select('*', { count: 'exact' });
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    query = query.order(sortColumn, { ascending });
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    if (error) throw error;
    
    return successResponse({
      data,
      pagination: { page, limit, total: count || 0 }
    });
  } catch (error) {
    console.error('Error fetching ${tableName}:', error);
    return errorResponse('Failed to fetch ${tableName}', 500);
  }
}`;
}

function generateGetSingleRoute(tableName: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest', false);
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase', false);
  importManager.addImport('@/lib/api/auth', 'successResponse', false);
  importManager.addImport('@/lib/api/auth', 'errorResponse', false);
  importManager.addImport('@/lib/api/auth', 'notFound', false);

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
      if (error.code === 'PGRST116') return notFound('${tableName}');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching ${tableName}:', error);
    return errorResponse('Failed to fetch ${tableName}', 500);
  }
}`;
}

function generatePostRoute(tableName: string, deityFolder: string, importManager: ImportManager, hasCreatedBy: boolean = true): string {
  const pascalName = toPascalCase(tableName);
  
  importManager.addImport('next/server', 'NextRequest', false);
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase', false);
  importManager.addImport('@/lib/api/auth', 'successResponse', false);
  importManager.addImport('@/lib/api/auth', 'errorResponse', false);
  importManager.addImport('@/lib/api/auth', 'unauthorized', false);
  importManager.addImport('@/lib/api/auth', 'getAuthenticatedUser', false);
  importManager.addImport(`@/lib/validators/generated/${deityFolder}/${tableName}`, `${pascalName}InsertSchema`, false);

  return `export async function POST(request: NextRequest) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const body = await request.json();
    const validated = ${pascalName}InsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('${tableName}')
      .insert(${hasCreatedBy ? '{ ...validated, created_by: userId }' : 'validated'})
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

function generatePutRoute(tableName: string, deityFolder: string, importManager: ImportManager): string {
  const pascalName = toPascalCase(tableName);
  
  importManager.addImport('next/server', 'NextRequest', false);
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase', false);
  importManager.addImport('@/lib/api/auth', 'successResponse', false);
  importManager.addImport('@/lib/api/auth', 'errorResponse', false);
  importManager.addImport('@/lib/api/auth', 'unauthorized', false);
  importManager.addImport('@/lib/api/auth', 'notFound', false);
  importManager.addImport('@/lib/api/auth', 'forbidden', false);
  importManager.addImport('@/lib/api/auth', 'getAuthenticatedUser', false);
  importManager.addImport('@/lib/api/auth', 'checkOwnership', false);
  importManager.addImport('@/lib/api/auth', 'isAdmin', false);
  importManager.addImport(`@/lib/validators/generated/${deityFolder}/${tableName}`, `${pascalName}UpdateSchema`, false);

  return `export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const ownsRecord = await checkOwnership(userId, '${tableName}', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
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
      if (error.code === 'PGRST116') return notFound('${tableName}');
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

function generateDeleteRoute(tableName: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest', false);
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase', false);
  importManager.addImport('@/lib/api/auth', 'successResponse', false);
  importManager.addImport('@/lib/api/auth', 'errorResponse', false);
  importManager.addImport('@/lib/api/auth', 'unauthorized', false);
  importManager.addImport('@/lib/api/auth', 'notFound', false);
  importManager.addImport('@/lib/api/auth', 'forbidden', false);
  importManager.addImport('@/lib/api/auth', 'getAuthenticatedUser', false);
  importManager.addImport('@/lib/api/auth', 'checkOwnership', false);
  importManager.addImport('@/lib/api/auth', 'isAdmin', false);

  return `export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const ownsRecord = await checkOwnership(userId, '${tableName}', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('${tableName}').delete().eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('${tableName}');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting ${tableName}:', error);
    return errorResponse('Failed to delete ${tableName}', 500);
  }
}`;
}

// ============================================================================
// VIEW API ROUTES (Read-only)
// ============================================================================

function generateViewGetListRoute(viewName: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest', false);
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase', false);
  importManager.addImport('@/lib/api/auth', 'successResponse', false);
  importManager.addImport('@/lib/api/auth', 'errorResponse', false);
  importManager.addImport('@/lib/api/auth', 'getPaginationParams', false);

  return `export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { page, limit } = getPaginationParams(request.nextUrl);
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await supabase
      .from('${viewName}')
      .select('*', { count: 'exact' })
      .range(from, to);
    
    if (error) throw error;
    
    return successResponse({
      data,
      pagination: { page, limit, total: count || 0 }
    });
  } catch (error) {
    console.error('Error fetching ${viewName}:', error);
    return errorResponse('Failed to fetch ${viewName}', 500);
  }
}`;
}

function generateViewGetSingleRoute(viewName: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest', false);
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase', false);
  importManager.addImport('@/lib/api/auth', 'successResponse', false);
  importManager.addImport('@/lib/api/auth', 'errorResponse', false);
  importManager.addImport('@/lib/api/auth', 'notFound', false);

  return `export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('${viewName}')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('${viewName}');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching ${viewName}:', error);
    return errorResponse('Failed to fetch ${viewName}', 500);
  }
}`;
}

// ============================================================================
// FUNCTION API ROUTES (RPC Invoke)
// ============================================================================

function generateFunctionInvokeRoute(functionName: string, importManager: ImportManager): string {
  importManager.addImport('next/server', 'NextRequest', false);
  importManager.addImport('@/lib/api/supabase', 'createApiSupabase', false);
  importManager.addImport('@/lib/api/auth', 'successResponse', false);
  importManager.addImport('@/lib/api/auth', 'errorResponse', false);
  importManager.addImport('@/lib/api/auth', 'unauthorized', false);
  importManager.addImport('@/lib/api/auth', 'getAuthenticatedUser', false);

  return `export async function POST(request: NextRequest) {
  try {
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();

    const body = await request.json();
    const supabase = await createApiSupabase();

    // p_user_id is offered to every function; if this function's signature
    // doesn't accept it, retry without (PGRST202 = no matching function).
    let { data, error } = await supabase.rpc('${functionName}', {
      ...body,
      p_user_id: userId
    });
    if (error && (error.code === 'PGRST202' || (error.message || '').includes('p_user_id'))) {
      ({ data, error } = await supabase.rpc('${functionName}', body));
    }

    if (error) throw error;
    return successResponse(data);
  } catch (error) {
    console.error('Error invoking ${functionName}:', error);
    return errorResponse('Failed to invoke ${functionName}', 500);
  }
}`;
}

// ============================================================================
// MAIN GENERATION FUNCTIONS
// ============================================================================

export function generateTableApiRoutes(
  table: EnrichedTable,
  options?: GenerateApiRoutesOptions
): GeneratedApiRoute[] {
  const { verbose = false } = options || {};
  const { name: tableName, deityFolder, category, shouldGenerateApiRoutes } = table;
  const results: GeneratedApiRoute[] = [];
  
  if (!shouldGenerateApiRoutes) return results;
  
  if (verbose) {
    logDebug(`Generating API routes for table: ${tableName} -> ${deityFolder}`);
  }
  
  // Main route (list + create)
  if (category.generateApiGetList || category.generateApiPost) {
    const importManager = new ImportManager();
    let content = `// Generated: ${new Date().toISOString()}\n// Table: ${tableName}\n\n`;
    
    if (category.generateApiGetList) {
      content += generateGetListRoute(tableName, importManager) + '\n\n';
    }
    if (category.generateApiPost) {
      // Some tables (current, ledger, analytics…) have no created_by column;
      // stamping it there was a type error and would be a runtime error too.
      const hasCreatedBy = /\bcreated_by\??:/.test(table.rowContent || '');
      content += generatePostRoute(tableName, deityFolder, importManager, hasCreatedBy) + '\n';
    }
    
    const importBlock = importManager.getImportBlock();
    const fullContent = importBlock + '\n\n' + content;
    
    results.push({
      content: fullContent,
      filePath: `src/app/api/generated/${deityFolder}/${tableName}/route.ts`,
      objectName: tableName,
      objectType: 'table',
      routeType: 'list',
      deityFolder,
      category,
    });
  }
  
  // Single route (get/put/delete)
  if (category.generateApiGetSingle || category.generateApiPut || category.generateApiDelete) {
    const importManager = new ImportManager();
    let content = `// Generated: ${new Date().toISOString()}\n// Table: ${tableName}\n\n`;
    
    if (category.generateApiGetSingle) {
      content += generateGetSingleRoute(tableName, importManager) + '\n\n';
    }
    if (category.generateApiPut) {
      content += generatePutRoute(tableName, deityFolder, importManager) + '\n\n';
    }
    if (category.generateApiDelete) {
      content += generateDeleteRoute(tableName, importManager) + '\n';
    }
    
    const importBlock = importManager.getImportBlock();
    const fullContent = importBlock + '\n\n' + content;
    
    results.push({
      content: fullContent,
      filePath: `src/app/api/generated/${deityFolder}/${tableName}/[id]/route.ts`,
      objectName: tableName,
      objectType: 'table',
      routeType: 'single',
      deityFolder,
      category,
    });
  }
  
  return results;
}

export function generateViewApiRoutes(
  view: EnrichedView,
  options?: GenerateApiRoutesOptions
): GeneratedApiRoute[] {
  const { verbose = false } = options || {};
  const { name: viewName, deityFolder, category, shouldGenerateViewApiRoutes } = view;
  const results: GeneratedApiRoute[] = [];
  
  if (!shouldGenerateViewApiRoutes) return results;
  
  if (verbose) {
    logDebug(`Generating API routes for view: ${viewName} -> ${deityFolder}`);
  }
  
  // Main route (list only - no POST for views)
  if (category.generateApiGetList) {
    const importManager = new ImportManager();
    const content = generateViewGetListRoute(viewName, importManager);
    const importBlock = importManager.getImportBlock();
    
    results.push({
      content: importBlock + '\n\n' + content,
      filePath: `src/app/api/generated/${deityFolder}/${viewName}/route.ts`,
      objectName: viewName,
      objectType: 'view',
      routeType: 'list',
      deityFolder,
      category,
    });
  }
  
  // Single route (GET only)
  if (category.generateApiGetSingle) {
    const importManager = new ImportManager();
    const content = generateViewGetSingleRoute(viewName, importManager);
    const importBlock = importManager.getImportBlock();
    
    results.push({
      content: importBlock + '\n\n' + content,
      filePath: `src/app/api/generated/${deityFolder}/${viewName}/[id]/route.ts`,
      objectName: viewName,
      objectType: 'view',
      routeType: 'single',
      deityFolder,
      category,
    });
  }
  
  return results;
}

export function generateFunctionApiRoute(
  fn: EnrichedFunction,
  options?: GenerateApiRoutesOptions
): GeneratedApiRoute | null {
  const { verbose = false } = options || {};
  const { name: functionName, deityFolder, shouldGenerateApiRoutes } = fn;
  
  if (!shouldGenerateApiRoutes) return null;
  
  if (verbose) {
    logDebug(`Generating API route for function: ${functionName} -> ${deityFolder}`);
  }
  
  const importManager = new ImportManager();
  const content = generateFunctionInvokeRoute(functionName, importManager);
  const importBlock = importManager.getImportBlock();
  
  return {
    content: importBlock + '\n\n' + content,
    filePath: `src/app/api/generated/${deityFolder}/${functionName}/route.ts`,
    objectName: functionName,
    objectType: 'function',
    routeType: 'invoke',
    deityFolder,
  };
}

// ============================================================================
// BULK GENERATION
// ============================================================================

export function generateAllTableApiRoutes(
  tables: EnrichedTable[],
  options?: GenerateApiRoutesOptions
): GeneratedApiRoute[] {
  const results: GeneratedApiRoute[] = [];
  for (const table of tables) {
    results.push(...generateTableApiRoutes(table, options));
  }
  return results;
}

export function generateAllViewApiRoutes(
  views: EnrichedView[],
  options?: GenerateApiRoutesOptions
): GeneratedApiRoute[] {
  const results: GeneratedApiRoute[] = [];
  for (const view of views) {
    results.push(...generateViewApiRoutes(view, options));
  }
  return results;
}

export function generateAllFunctionApiRoutes(
  functions: EnrichedFunction[],
  options?: GenerateApiRoutesOptions
): GeneratedApiRoute[] {
  const results: GeneratedApiRoute[] = [];
  for (const fn of functions) {
    const route = generateFunctionApiRoute(fn, options);
    if (route) results.push(route);
  }
  return results;
}
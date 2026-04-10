// src/scripts/modules/generateApiRoutes.ts
// Phase: Generate API route files for tables based on workflow config

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '../shared/logger.js';
import { toPascalCase } from './formatObjectTypes.js';
import { stageFileChange } from './staging.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export interface GenerateApiRoutesOptions {
  verbose?: boolean;
  dryRun?: boolean;
  forceOverwrite?: boolean;
  outputBase?: string;
}

/**
 * Generate GET /api/[table] route (list)
 */
function generateGetListRoute(tableName: string, pascalName: string): string {
  return `// =====================================================
// GET /api/${tableName} - List ${tableName}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { 
  successResponse, 
  errorResponse, 
  getPaginationParams, 
  getFilters, 
  getSortParams,
  getOptionalUser 
} from '@/lib/api/auth';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiSupabase();
    const { userId } = await getOptionalUser(request);
    const { page, limit } = getPaginationParams(request.nextUrl);
    const filters = getFilters(request.nextUrl);
    const { column: sortColumn, ascending } = getSortParams(request.nextUrl);
    
    let query = supabase.from('${tableName}' as any).select('*', { count: 'exact' });
    
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
function generateGetSingleRoute(tableName: string, pascalName: string): string {
  return `// =====================================================
// GET /api/${tableName}/[id] - Get single ${tableName}
// =====================================================

import { NextRequest } from 'next/server';
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
      .from('${tableName}' as any)
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
function generatePostRoute(tableName: string, pascalName: string): string {
  return `// =====================================================
// POST /api/${tableName} - Create ${tableName}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { 
  successResponse, 
  errorResponse, 
  unauthorized,
  getAuthenticatedUser 
} from '@/lib/api/auth';
import { ${pascalName}InsertSchema } from '@/lib/validators/${tableName}';

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
      .from('${tableName}' as any)
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
function generatePutRoute(tableName: string, pascalName: string): string {
  return `// =====================================================
// PUT /api/${tableName}/[id] - Update ${tableName}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { 
  successResponse, 
  errorResponse, 
  unauthorized, 
  notFound, 
  forbidden,
  getAuthenticatedUser,
  checkOwnership,
  isAdmin
} from '@/lib/api/auth';
import { ${pascalName}InsertSchema } from '@/lib/validators/${tableName}';

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
    
    const ownsRecord = await checkOwnership(userId, '${tableName}', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = ${pascalName}InsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('${tableName}' as any)
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
function generateDeleteRoute(tableName: string, pascalName: string): string {
  return `// =====================================================
// DELETE /api/${tableName}/[id] - Delete ${tableName}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { 
  successResponse, 
  errorResponse, 
  unauthorized, 
  notFound, 
  forbidden,
  getAuthenticatedUser,
  checkOwnership,
  isAdmin
} from '@/lib/api/auth';

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
    
    const ownsRecord = await checkOwnership(userId, '${tableName}', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('${tableName}' as any)
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
function generateSpecialRoute(tableName: string, pascalName: string, specialType: string): string {
  return `// =====================================================
// POST /api/${tableName}/${specialType} - ${specialType.toUpperCase()} ${tableName}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, getAuthenticatedUser } from '@/lib/api/auth';

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
 * Generate and write main API route file
 */
async function writeMainApiRoute(
  tableName: string,
  methods: string[],
  options: GenerateApiRoutesOptions = {}
): Promise<{ success: boolean; filePath: string; action: string }> {
  const { verbose = false, dryRun = false, forceOverwrite = false, outputBase = 'src/app/api' } = options;
  const pascalName = toPascalCase(tableName);
  const timestamp = new Date().toISOString();
  
  let content = `// =====================================================
// FILE: app/api/${tableName}/route.ts
// GENERATED: ${timestamp}
// METHODS: ${methods.join(', ')}
// =====================================================

`;
  
  if (methods.includes('GET_LIST')) {
    content += generateGetListRoute(tableName, pascalName);
    content += '\n';
  }
  
  if (methods.includes('POST')) {
    content += generatePostRoute(tableName, pascalName);
    content += '\n';
  }
  
  const outputPath = path.join(PROJECT_ROOT, outputBase, tableName, 'route.ts');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const exists = fs.existsSync(outputPath);
  
  if (dryRun) {
    if (verbose) logDebug(`[DRY RUN] Would write to: ${outputPath}`);
    return { success: true, filePath: outputPath, action: 'dryrun' };
  }
  
  if (exists && !forceOverwrite) {
    const existingContent = fs.readFileSync(outputPath, 'utf-8');
    if (existingContent === content) {
      return { success: true, filePath: outputPath, action: 'skipped' };
    }
    const stageResult = stageFileChange(outputPath, content, { verbose });
    if (stageResult.staged) {
      if (verbose) logWarning(`Staged API route: ${tableName}`);
      return { success: true, filePath: outputPath, action: 'staged' };
    }
  }
  
  fs.writeFileSync(outputPath, content, 'utf-8');
  if (exists) {
    logWarning(`Updated API route: ${tableName}`);
    return { success: true, filePath: outputPath, action: 'updated' };
  } else {
    logSuccess(`Created API route: ${tableName}`);
    return { success: true, filePath: outputPath, action: 'created' };
  }
}

/**
 * Generate and write single-record API route file
 */
async function writeSingleApiRoute(
  tableName: string,
  methods: string[],
  options: GenerateApiRoutesOptions = {}
): Promise<{ success: boolean; filePath: string; action: string }> {
  const { verbose = false, dryRun = false, forceOverwrite = false, outputBase = 'src/app/api' } = options;
  const pascalName = toPascalCase(tableName);
  const timestamp = new Date().toISOString();
  
  let content = `// =====================================================
// FILE: app/api/${tableName}/[id]/route.ts
// GENERATED: ${timestamp}
// METHODS: ${methods.join(', ')}
// =====================================================

`;
  
  if (methods.includes('GET_SINGLE')) {
    content += generateGetSingleRoute(tableName, pascalName);
    content += '\n';
  }
  
  if (methods.includes('PUT')) {
    content += generatePutRoute(tableName, pascalName);
    content += '\n';
  }
  
  if (methods.includes('DELETE')) {
    content += generateDeleteRoute(tableName, pascalName);
    content += '\n';
  }
  
  const outputPath = path.join(PROJECT_ROOT, outputBase, tableName, 'id', 'route.ts');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const exists = fs.existsSync(outputPath);
  
  if (dryRun) {
    if (verbose) logDebug(`[DRY RUN] Would write to: ${outputPath}`);
    return { success: true, filePath: outputPath, action: 'dryrun' };
  }
  
  if (exists && !forceOverwrite) {
    const existingContent = fs.readFileSync(outputPath, 'utf-8');
    if (existingContent === content) {
      return { success: true, filePath: outputPath, action: 'skipped' };
    }
    const stageResult = stageFileChange(outputPath, content, { verbose });
    if (stageResult.staged) {
      if (verbose) logWarning(`Staged single API route: ${tableName}`);
      return { success: true, filePath: outputPath, action: 'staged' };
    }
  }
  
  fs.writeFileSync(outputPath, content, 'utf-8');
  if (exists) {
    logWarning(`Updated single API route: ${tableName}`);
    return { success: true, filePath: outputPath, action: 'updated' };
  } else {
    logSuccess(`Created single API route: ${tableName}`);
    return { success: true, filePath: outputPath, action: 'created' };
  }
}

/**
 * Generate and write special API route
 */
async function writeSpecialApiRoute(
  tableName: string,
  specialType: string,
  options: GenerateApiRoutesOptions = {}
): Promise<{ success: boolean; filePath: string; action: string }> {
  const { verbose = false, dryRun = false, forceOverwrite = false, outputBase = 'src/app/api' } = options;
  const pascalName = toPascalCase(tableName);
  const content = generateSpecialRoute(tableName, pascalName, specialType);
  
  const outputPath = path.join(PROJECT_ROOT, outputBase, tableName, specialType, 'route.ts');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const exists = fs.existsSync(outputPath);
  
  if (dryRun) {
    if (verbose) logDebug(`[DRY RUN] Would write to: ${outputPath}`);
    return { success: true, filePath: outputPath, action: 'dryrun' };
  }
  
  if (exists && !forceOverwrite) {
    const existingContent = fs.readFileSync(outputPath, 'utf-8');
    if (existingContent === content) {
      return { success: true, filePath: outputPath, action: 'skipped' };
    }
    const stageResult = stageFileChange(outputPath, content, { verbose });
    if (stageResult.staged) {
      if (verbose) logWarning(`Staged special API route: ${tableName}/${specialType}`);
      return { success: true, filePath: outputPath, action: 'staged' };
    }
  }
  
  fs.writeFileSync(outputPath, content, 'utf-8');
  if (exists) {
    logWarning(`Updated special API route: ${tableName}/${specialType}`);
    return { success: true, filePath: outputPath, action: 'updated' };
  } else {
    logSuccess(`Created special API route: ${tableName}/${specialType}`);
    return { success: true, filePath: outputPath, action: 'created' };
  }
}

/**
 * Generate all API routes for a table based on workflow config
 */
export async function generateApiRoutesForTable(
  tableName: string,
  config: {
    hasGetList: boolean;
    hasGetSingle: boolean;
    hasPost: boolean;
    hasPut: boolean;
    hasDelete: boolean;
    specialRoutes: string[];
  },
  options: GenerateApiRoutesOptions = {}
): Promise<{ mainRoute: string; singleRoute: string; specialRoutes: string[] }> {
  const { verbose = false } = options;
  
  const mainMethods: string[] = [];
  if (config.hasGetList) mainMethods.push('GET_LIST');
  if (config.hasPost) mainMethods.push('POST');
  
  const singleMethods: string[] = [];
  if (config.hasGetSingle) singleMethods.push('GET_SINGLE');
  if (config.hasPut) singleMethods.push('PUT');
  if (config.hasDelete) singleMethods.push('DELETE');
  
  const result = {
    mainRoute: '',
    singleRoute: '',
    specialRoutes: [] as string[]
  };
  
  if (mainMethods.length > 0) {
    const mainResult = await writeMainApiRoute(tableName, mainMethods, options);
    result.mainRoute = mainResult.action;
  }
  
  if (singleMethods.length > 0) {
    const singleResult = await writeSingleApiRoute(tableName, singleMethods, options);
    result.singleRoute = singleResult.action;
  }
  
  for (const special of config.specialRoutes) {
    const specialResult = await writeSpecialApiRoute(tableName, special, options);
    result.specialRoutes.push(specialResult.action);
  }
  
  if (verbose && (mainMethods.length > 0 || singleMethods.length > 0 || config.specialRoutes.length > 0)) {
    logInfo(`API routes for ${tableName}: main=${result.mainRoute}, single=${result.singleRoute}, special=${result.specialRoutes.join(',')}`);
  }
  
  return result;
}

/**
 * Generate API routes for multiple tables
 */
export async function generateApiRoutesForTables(
  tables: Array<{
    name: string;
    hasGetList: boolean;
    hasGetSingle: boolean;
    hasPost: boolean;
    hasPut: boolean;
    hasDelete: boolean;
    specialRoutes: string[];
  }>,
  options: GenerateApiRoutesOptions = {}
): Promise<{ created: number; updated: number; staged: number; skipped: number; errors: string[] }> {
  const { verbose = false, dryRun = false } = options;
  
  const result = {
    created: 0,
    updated: 0,
    staged: 0,
    skipped: 0,
    errors: [] as string[]
  };
  
  for (const table of tables) {
    const tableResult = await generateApiRoutesForTable(table.name, table, options);
    
    if (tableResult.mainRoute === 'created') result.created++;
    if (tableResult.mainRoute === 'updated') result.updated++;
    if (tableResult.mainRoute === 'staged') result.staged++;
    if (tableResult.mainRoute === 'skipped') result.skipped++;
    
    if (tableResult.singleRoute === 'created') result.created++;
    if (tableResult.singleRoute === 'updated') result.updated++;
    if (tableResult.singleRoute === 'staged') result.staged++;
    if (tableResult.singleRoute === 'skipped') result.skipped++;
    
    for (const special of tableResult.specialRoutes) {
      if (special === 'created') result.created++;
      if (special === 'updated') result.updated++;
      if (special === 'staged') result.staged++;
      if (special === 'skipped') result.skipped++;
    }
  }
  
  if (verbose && !dryRun) {
    console.log('');
    logSeparator('─', 40);
    logInfo('API ROUTES GENERATION SUMMARY');
    logSeparator('─', 40);
    logSuccess(`Created: ${result.created}`);
    if (result.updated > 0) logWarning(`Updated: ${result.updated}`);
    if (result.staged > 0) logInfo(`Staged for review: ${result.staged}`);
    logInfo(`Skipped: ${result.skipped}`);
    if (result.errors.length > 0) logError(`Errors: ${result.errors.length}`);
  }
  
  return result;
}
/* @/scripts/modules/format/formatApiFile.ts */
// Generates individual API route content with import tracking

import { toPascalCase } from './format_object_types.js';

export interface GeneratedRoute {
  imports: string[];
  code: string;
}

/**
 * Generate GET /api/[table] route (list)
 */
export function generateGetListRoute(tableName: string): GeneratedRoute {
  const pascalName = toPascalCase(tableName);
  
  const imports = [
    'successResponse',
    'errorResponse',
    'getPaginationParams',
    'getFilters',
    'getSortParams',
    'getOptionalUser'
  ];
  
  const code = `export async function GET(request: NextRequest) {
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
}`;
  
  return { imports, code };
}

/**
 * Generate GET /api/[table]/[id] route (single)
 */
export function generateGetSingleRoute(tableName: string): GeneratedRoute {
  const imports = ['successResponse', 'errorResponse', 'notFound'];
  
  const code = `export async function GET(
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
}`;
  
  return { imports, code };
}

/**
 * Generate POST /api/[table] route (create)
 */
export function generatePostRoute(tableName: string): GeneratedRoute {
  const pascalName = toPascalCase(tableName);
  
  const imports = [
    'successResponse',
    'errorResponse',
    'unauthorized',
    'getAuthenticatedUser'
  ];
  
  const code = `export async function POST(request: NextRequest) {
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
}`;
  
  return { imports, code };
}

/**
 * Generate PUT /api/[table]/[id] route (update)
 */
export function generatePutRoute(tableName: string): GeneratedRoute {
  const pascalName = toPascalCase(tableName);
  
  const imports = [
    'successResponse',
    'errorResponse',
    'unauthorized',
    'notFound',
    'forbidden',
    'getAuthenticatedUser',
    'checkOwnership',
    'isAdmin'
  ];
  
  const code = `export async function PUT(
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
}`;
  
  return { imports, code };
}

/**
 * Generate DELETE /api/[table]/[id] route
 */
export function generateDeleteRoute(tableName: string): GeneratedRoute {
  const imports = [
    'successResponse',
    'errorResponse',
    'unauthorized',
    'notFound',
    'forbidden',
    'getAuthenticatedUser',
    'checkOwnership',
    'isAdmin'
  ];
  
  const code = `export async function DELETE(
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
}`;
  
  return { imports, code };
}

/**
 * Generate special route (e.g., submit, results, link, unlink)
 */
export function generateSpecialRoute(tableName: string, specialType: string): GeneratedRoute {
  const imports = [
    'successResponse',
    'errorResponse',
    'unauthorized',
    'getAuthenticatedUser'
  ];
  
  const code = `export async function POST(
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
}`;
  
  return { imports, code };
}
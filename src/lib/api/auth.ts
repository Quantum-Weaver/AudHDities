// lib/api/auth.ts
// Shared authentication utilities for API routes

import { createServerSupabase } from '@/lib/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';

export type AuthSuccess = {
  success: true;
  userId: string;
  error?: never;
  status?: never;
};

export type AuthFailure = {
  success: false;
  userId?: never;
  error: string;
  status: number;
};

export type AuthResult = AuthSuccess | AuthFailure;

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Get authenticated user from request
 * Returns user ID if authenticated, otherwise error response
 */
export async function getAuthenticatedUser(request: NextRequest): Promise<AuthResult> {
  const supabase = await createServerSupabase();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return {
      success: false,
      error: 'Unauthorized',
      status: 401
    };
  }
  
  return {
    success: true,
    userId: user.id
  };
}

/**
 * Optional auth - get user if authenticated, don't error if not
 */
export async function getOptionalUser(request: NextRequest): Promise<{ userId?: string }> {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  return { userId: user?.id };
}

/**
 * Check if user is admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = await createServerSupabase();
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();
  
  return profile?.is_admin === true;
}

/**
 * Check if user owns a record
 */
export async function checkOwnership(
  userId: string,
  tableName: string,
  recordId: string,
  ownerField: string = 'created_by'
): Promise<boolean> {
  const supabase = await createServerSupabase();
  // Cast tableName to any to bypass TypeScript's strict table union check
  // This is safe because the table name comes from our database schema
  const { data: record } = await supabase
    .from(tableName as any)
    .select(ownerField)
    .eq('id', recordId)
    .single();
  
    return (record as any)?.[ownerField] === userId;
}

/**
 * Create success response
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Create error response
 */
export function errorResponse(message: string, status: number = 400, details?: unknown): NextResponse {
  return NextResponse.json({ success: false, error: message, details }, { status });
}

/**
 * Create paginated response
 */
export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
}

/**
 * Parse pagination params from request URL
 */
export function getPaginationParams(url: URL): { page: number; limit: number } {
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '20');
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit))
  };
}

/**
 * Parse filter params from request URL
 * Converts query params to object (excluding pagination/sort params)
 */
export function getFilters(url: URL): Record<string, string> {
  const filters: Record<string, string> = {};
  const excludeParams = ['page', 'limit', 'sort', 'order'];
  
  for (const [key, value] of url.searchParams.entries()) {
    if (!excludeParams.includes(key)) {
      filters[key] = value;
    }
  }
  
  return filters;
}

/**
 * Parse sort params from request URL
 */
export function getSortParams(url: URL): { column: string; ascending: boolean } {
  const column = url.searchParams.get('sort') || 'created_at';
  const order = url.searchParams.get('order') || 'desc';
  return {
    column,
    ascending: order === 'asc'
  };
}

/**
 * Not found response
 */
export function notFound(resource: string): NextResponse {
  return errorResponse(`${resource} not found`, 404);
}

/**
 * Unauthorized response
 */
export function unauthorized(): NextResponse {
  return errorResponse('Unauthorized', 401);
}

/**
 * Forbidden response
 */
export function forbidden(): NextResponse {
  return errorResponse('Forbidden', 403);
}
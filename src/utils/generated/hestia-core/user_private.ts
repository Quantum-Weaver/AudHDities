// =====================================================
// FILE: utils/generated/hestia-core/user_private.ts
// GENERATED: 2026-04-13T15:29:51.060Z
// SOURCE: database.types.ts
// =====================================================

import type { UserPrivateRow, UserPrivateInsert, UserPrivateUpdate } from 'src/types/generated/hestia-core/user_private.ts';
import { UserPrivateInsertSchema, UserPrivateUpdateSchema } from 'src/lib/validators/generated/user_private.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// UserPrivate CRUD OPERATIONS
// =====================================================

/**
 * Create a new user_private record
 */
export async function createUserPrivate(data: UserPrivateInsert): Promise<{ data: UserPrivateRow | null; error: string | null }> {
  try {
    const validated = UserPrivateInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('user_private')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating user_private:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a user_private record by ID
 */
export async function getUserPrivate(id: string): Promise<{ data: UserPrivateRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('user_private')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user_private:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List user_private records with pagination and filters
 */
export async function listUserPrivate(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: UserPrivateRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('user_private').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], total: count || 0, error: null };
  } catch (error) {
    console.error('Error listing user_private:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a user_private record
 */
export async function updateUserPrivate(id: string, data: UserPrivateUpdate): Promise<{ data: UserPrivateRow | null; error: string | null }> {
  try {
    const validated = UserPrivateUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('user_private')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating user_private:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a user_private record
 */
export async function deleteUserPrivate(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('user_private')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting user_private:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


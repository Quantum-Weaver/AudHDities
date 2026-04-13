// =====================================================
// FILE: utils/generated/hestia-core/user_financial.ts
// GENERATED: 2026-04-13T21:47:21.136Z
// SOURCE: database.types.ts
// =====================================================

import type { UserFinancialRow, UserFinancialInsert, UserFinancialUpdate } from 'src/types/generated/hestia-core/user_financial.ts';
import { UserFinancialInsertSchema, UserFinancialUpdateSchema } from 'src/lib/validators/generated/user_financial.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// UserFinancial CRUD OPERATIONS
// =====================================================

/**
 * Create a new user_financial record
 */
export async function createUserFinancial(data: UserFinancialInsert): Promise<{ data: UserFinancialRow | null; error: string | null }> {
  try {
    const validated = UserFinancialInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('user_financial')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating user_financial:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a user_financial record by ID
 */
export async function getUserFinancial(id: string): Promise<{ data: UserFinancialRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('user_financial')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user_financial:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List user_financial records with pagination and filters
 */
export async function listUserFinancial(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: UserFinancialRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('user_financial').select('*', { count: 'exact' });
    
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
    console.error('Error listing user_financial:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a user_financial record
 */
export async function updateUserFinancial(id: string, data: UserFinancialUpdate): Promise<{ data: UserFinancialRow | null; error: string | null }> {
  try {
    const validated = UserFinancialUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('user_financial')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating user_financial:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a user_financial record
 */
export async function deleteUserFinancial(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('user_financial')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting user_financial:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


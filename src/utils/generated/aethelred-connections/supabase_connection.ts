// =====================================================
// FILE: utils/generated/aethelred-connections/supabase_connection.ts
// GENERATED: 2026-04-15T16:39:24.110Z
// SOURCE: database.types.ts
// =====================================================

import type { SupabaseConnectionRow, SupabaseConnectionInsert, SupabaseConnectionUpdate } from '@/types/generated/aethelred-connections/supabase_connection';
import { SupabaseConnectionInsertSchema, SupabaseConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/supabase_connection';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// SupabaseConnection CRUD OPERATIONS
// =====================================================

/**
 * Create a new supabase_connection record
 */
export async function createSupabaseConnection(data: SupabaseConnectionInsert): Promise<{ data: SupabaseConnectionRow | null; error: string | null }> {
  try {
    const validated = SupabaseConnectionInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('supabase_connection')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating supabase_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a supabase_connection record by ID
 */
export async function getSupabaseConnection(id: string): Promise<{ data: SupabaseConnectionRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('supabase_connection')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching supabase_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List supabase_connection records with pagination and filters
 */
export async function listSupabaseConnection(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SupabaseConnectionRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('supabase_connection').select('*', { count: 'exact' });
    
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
    console.error('Error listing supabase_connection:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a supabase_connection record
 */
export async function updateSupabaseConnection(id: string, data: SupabaseConnectionUpdate): Promise<{ data: SupabaseConnectionRow | null; error: string | null }> {
  try {
    const validated = SupabaseConnectionUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('supabase_connection')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating supabase_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a supabase_connection record
 */
export async function deleteSupabaseConnection(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('supabase_connection')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting supabase_connection:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


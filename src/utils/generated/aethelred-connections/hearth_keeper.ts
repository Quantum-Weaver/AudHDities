// =====================================================
// FILE: utils/generated/aethelred-connections/hearth_keeper.ts
// GENERATED: 2026-04-14T21:18:08.964Z
// SOURCE: database.types.ts
// =====================================================

import type { HearthKeeperRow, HearthKeeperInsert, HearthKeeperUpdate } from '@/types/generated/aethelred-connections/hearth_keeper.ts';
import { HearthKeeperInsertSchema, HearthKeeperUpdateSchema } from '@/lib/validators/generated/aethelred-connections/hearth_keeper.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// HearthKeeper CRUD OPERATIONS
// =====================================================

/**
 * Create a new hearth_keeper record
 */
export async function createHearthKeeper(data: HearthKeeperInsert): Promise<{ data: HearthKeeperRow | null; error: string | null }> {
  try {
    const validated = HearthKeeperInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('hearth_keeper')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating hearth_keeper:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a hearth_keeper record by ID
 */
export async function getHearthKeeper(id: string): Promise<{ data: HearthKeeperRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('hearth_keeper')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching hearth_keeper:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List hearth_keeper records with pagination and filters
 */
export async function listHearthKeeper(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: HearthKeeperRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('hearth_keeper').select('*', { count: 'exact' });
    
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
    console.error('Error listing hearth_keeper:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a hearth_keeper record
 */
export async function updateHearthKeeper(id: string, data: HearthKeeperUpdate): Promise<{ data: HearthKeeperRow | null; error: string | null }> {
  try {
    const validated = HearthKeeperUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('hearth_keeper')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating hearth_keeper:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a hearth_keeper record
 */
export async function deleteHearthKeeper(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('hearth_keeper')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting hearth_keeper:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


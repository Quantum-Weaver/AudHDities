// =====================================================
// FILE: utils/generated/aethelred-connections/chancellor.ts
// GENERATED: 2026-04-13T06:13:42.179Z
// SOURCE: database.types.ts
// =====================================================

import type { ChancellorRow, ChancellorInsert, ChancellorUpdate } from 'src/types/aethelred-connections/chancellor';
import { ChancellorInsertSchema, ChancellorUpdateSchema } from 'src/lib/validators/chancellor';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// Chancellor CRUD OPERATIONS
// =====================================================

/**
 * Create a new chancellor record
 */
export async function createChancellor(data: ChancellorInsert): Promise<{ data: ChancellorRow | null; error: string | null }> {
  try {
    const validated = ChancellorInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('chancellor')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating chancellor:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a chancellor record by ID
 */
export async function getChancellor(id: string): Promise<{ data: ChancellorRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('chancellor')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching chancellor:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List chancellor records with pagination and filters
 */
export async function listChancellor(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ChancellorRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('chancellor').select('*', { count: 'exact' });
    
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
    console.error('Error listing chancellor:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a chancellor record
 */
export async function updateChancellor(id: string, data: ChancellorUpdate): Promise<{ data: ChancellorRow | null; error: string | null }> {
  try {
    const validated = ChancellorUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('chancellor')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating chancellor:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a chancellor record
 */
export async function deleteChancellor(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('chancellor')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting chancellor:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


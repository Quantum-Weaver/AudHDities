// =====================================================
// FILE: utils/generated/plutus-economics/residual_pool.ts
// GENERATED: 2026-04-17T22:45:09.976Z
// SOURCE: database.types.ts
// =====================================================

import type { ResidualPoolRow, ResidualPoolInsert, ResidualPoolUpdate } from '@/types/generated/plutus-economics/residual_pool';
import { ResidualPoolRowSchema, ResidualPoolInsertSchema, ResidualPoolUpdateSchema } from '@/lib/validators/generated/plutus-economics/residual_pool';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// ResidualPool CRUD OPERATIONS
// =====================================================

/**
 * Create a new residual_pool record
 */
export async function createResidualPool(data: ResidualPoolInsert): Promise<{ data: ResidualPoolRow | null; error: string | null }> {
  try {
    const validated = ResidualPoolRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('residual_pool')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating residual_pool:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a residual_pool record by ID
 */
export async function getResidualPool(id: string): Promise<{ data: ResidualPoolRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('residual_pool')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching residual_pool:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List residual_pool records with pagination and filters
 */
export async function listResidualPool(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ResidualPoolRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('residual_pool').select('*', { count: 'exact' });
    
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
    console.error('Error listing residual_pool:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a residual_pool record
 */
export async function updateResidualPool(id: string, data: ResidualPoolUpdate): Promise<{ data: ResidualPoolRow | null; error: string | null }> {
  try {
    const validated = ResidualPoolUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('residual_pool')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating residual_pool:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a residual_pool record
 */
export async function deleteResidualPool(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('residual_pool')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting residual_pool:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


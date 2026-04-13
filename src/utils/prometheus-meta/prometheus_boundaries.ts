// =====================================================
// FILE: utils/generated/prometheus-meta/prometheus_boundaries.ts
// GENERATED: 2026-04-13T06:13:42.194Z
// SOURCE: database.types.ts
// =====================================================

import type { PrometheusBoundariesRow, PrometheusBoundariesInsert, PrometheusBoundariesUpdate } from 'src/types/prometheus-meta/prometheus_boundaries';
import { PrometheusBoundariesInsertSchema, PrometheusBoundariesUpdateSchema } from 'src/lib/validators/prometheus_boundaries';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// PrometheusBoundaries CRUD OPERATIONS
// =====================================================

/**
 * Create a new prometheus_boundaries record
 */
export async function createPrometheusBoundaries(data: PrometheusBoundariesInsert): Promise<{ data: PrometheusBoundariesRow | null; error: string | null }> {
  try {
    const validated = PrometheusBoundariesInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_boundaries')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating prometheus_boundaries:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a prometheus_boundaries record by ID
 */
export async function getPrometheusBoundaries(id: string): Promise<{ data: PrometheusBoundariesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_boundaries')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching prometheus_boundaries:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List prometheus_boundaries records with pagination and filters
 */
export async function listPrometheusBoundaries(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusBoundariesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('prometheus_boundaries').select('*', { count: 'exact' });
    
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
    console.error('Error listing prometheus_boundaries:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a prometheus_boundaries record
 */
export async function updatePrometheusBoundaries(id: string, data: PrometheusBoundariesUpdate): Promise<{ data: PrometheusBoundariesRow | null; error: string | null }> {
  try {
    const validated = PrometheusBoundariesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_boundaries')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating prometheus_boundaries:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a prometheus_boundaries record
 */
export async function deletePrometheusBoundaries(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('prometheus_boundaries')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting prometheus_boundaries:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


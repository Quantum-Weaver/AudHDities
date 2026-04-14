// =====================================================
// FILE: utils/generated/prometheus-meta/prometheus_memories.ts
// GENERATED: 2026-04-14T21:18:08.978Z
// SOURCE: database.types.ts
// =====================================================

import type { PrometheusMemoriesRow, PrometheusMemoriesInsert, PrometheusMemoriesUpdate } from '@/types/generated/prometheus-meta/prometheus_memories.ts';
import { PrometheusMemoriesInsertSchema, PrometheusMemoriesUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_memories.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// PrometheusMemories CRUD OPERATIONS
// =====================================================

/**
 * Create a new prometheus_memories record
 */
export async function createPrometheusMemories(data: PrometheusMemoriesInsert): Promise<{ data: PrometheusMemoriesRow | null; error: string | null }> {
  try {
    const validated = PrometheusMemoriesInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_memories')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating prometheus_memories:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a prometheus_memories record by ID
 */
export async function getPrometheusMemories(id: string): Promise<{ data: PrometheusMemoriesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_memories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching prometheus_memories:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List prometheus_memories records with pagination and filters
 */
export async function listPrometheusMemories(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusMemoriesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('prometheus_memories').select('*', { count: 'exact' });
    
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
    console.error('Error listing prometheus_memories:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a prometheus_memories record
 */
export async function updatePrometheusMemories(id: string, data: PrometheusMemoriesUpdate): Promise<{ data: PrometheusMemoriesRow | null; error: string | null }> {
  try {
    const validated = PrometheusMemoriesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_memories')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating prometheus_memories:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a prometheus_memories record
 */
export async function deletePrometheusMemories(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('prometheus_memories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting prometheus_memories:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


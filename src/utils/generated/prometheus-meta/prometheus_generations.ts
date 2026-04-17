// =====================================================
// FILE: utils/generated/prometheus-meta/prometheus_generations.ts
// GENERATED: 2026-04-17T22:45:09.950Z
// SOURCE: database.types.ts
// =====================================================

import type { PrometheusGenerationsRow, PrometheusGenerationsInsert, PrometheusGenerationsUpdate } from '@/types/generated/prometheus-meta/prometheus_generations';
import { PrometheusGenerationsRowSchema, PrometheusGenerationsInsertSchema, PrometheusGenerationsUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_generations';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// PrometheusGenerations CRUD OPERATIONS
// =====================================================

/**
 * Create a new prometheus_generations record
 */
export async function createPrometheusGenerations(data: PrometheusGenerationsInsert): Promise<{ data: PrometheusGenerationsRow | null; error: string | null }> {
  try {
    const validated = PrometheusGenerationsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_generations')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating prometheus_generations:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a prometheus_generations record by ID
 */
export async function getPrometheusGenerations(id: string): Promise<{ data: PrometheusGenerationsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_generations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching prometheus_generations:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List prometheus_generations records with pagination and filters
 */
export async function listPrometheusGenerations(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusGenerationsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('prometheus_generations').select('*', { count: 'exact' });
    
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
    console.error('Error listing prometheus_generations:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a prometheus_generations record
 */
export async function updatePrometheusGenerations(id: string, data: PrometheusGenerationsUpdate): Promise<{ data: PrometheusGenerationsRow | null; error: string | null }> {
  try {
    const validated = PrometheusGenerationsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_generations')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating prometheus_generations:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a prometheus_generations record
 */
export async function deletePrometheusGenerations(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('prometheus_generations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting prometheus_generations:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


// =====================================================
// FILE: utils/generated/prometheus-meta/prometheus_patterns.ts
// GENERATED: 2026-04-15T19:06:11.652Z
// SOURCE: database.types.ts
// =====================================================

import type { PrometheusPatternsRow, PrometheusPatternsInsert, PrometheusPatternsUpdate } from '@/types/generated/prometheus-meta/prometheus_patterns';
import { PrometheusPatternsRowSchema, PrometheusPatternsInsertSchema, PrometheusPatternsUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_patterns';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// PrometheusPatterns CRUD OPERATIONS
// =====================================================

/**
 * Create a new prometheus_patterns record
 */
export async function createPrometheusPatterns(data: PrometheusPatternsInsert): Promise<{ data: PrometheusPatternsRow | null; error: string | null }> {
  try {
    const validated = PrometheusPatternsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_patterns')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating prometheus_patterns:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a prometheus_patterns record by ID
 */
export async function getPrometheusPatterns(id: string): Promise<{ data: PrometheusPatternsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_patterns')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching prometheus_patterns:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List prometheus_patterns records with pagination and filters
 */
export async function listPrometheusPatterns(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusPatternsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('prometheus_patterns').select('*', { count: 'exact' });
    
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
    console.error('Error listing prometheus_patterns:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a prometheus_patterns record
 */
export async function updatePrometheusPatterns(id: string, data: PrometheusPatternsUpdate): Promise<{ data: PrometheusPatternsRow | null; error: string | null }> {
  try {
    const validated = PrometheusPatternsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_patterns')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating prometheus_patterns:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a prometheus_patterns record
 */
export async function deletePrometheusPatterns(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('prometheus_patterns')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting prometheus_patterns:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


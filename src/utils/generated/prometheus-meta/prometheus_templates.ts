// =====================================================
// FILE: utils/generated/prometheus-meta/prometheus_templates.ts
// GENERATED: 2026-04-15T05:16:18.095Z
// SOURCE: database.types.ts
// =====================================================

import type { PrometheusTemplatesRow, PrometheusTemplatesInsert, PrometheusTemplatesUpdate } from '@/types/generated/prometheus-meta/prometheus_templates.ts';
import { PrometheusTemplatesInsertSchema, PrometheusTemplatesUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_templates.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// PrometheusTemplates CRUD OPERATIONS
// =====================================================

/**
 * Create a new prometheus_templates record
 */
export async function createPrometheusTemplates(data: PrometheusTemplatesInsert): Promise<{ data: PrometheusTemplatesRow | null; error: string | null }> {
  try {
    const validated = PrometheusTemplatesInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_templates')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating prometheus_templates:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a prometheus_templates record by ID
 */
export async function getPrometheusTemplates(id: string): Promise<{ data: PrometheusTemplatesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_templates')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching prometheus_templates:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List prometheus_templates records with pagination and filters
 */
export async function listPrometheusTemplates(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusTemplatesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('prometheus_templates').select('*', { count: 'exact' });
    
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
    console.error('Error listing prometheus_templates:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a prometheus_templates record
 */
export async function updatePrometheusTemplates(id: string, data: PrometheusTemplatesUpdate): Promise<{ data: PrometheusTemplatesRow | null; error: string | null }> {
  try {
    const validated = PrometheusTemplatesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_templates')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating prometheus_templates:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a prometheus_templates record
 */
export async function deletePrometheusTemplates(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('prometheus_templates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting prometheus_templates:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


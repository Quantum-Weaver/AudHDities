// =====================================================
// FILE: utils/generated/prometheus-meta/prometheus_blueprints.ts
// GENERATED: 2026-04-13T15:29:51.052Z
// SOURCE: database.types.ts
// =====================================================

import type { PrometheusBlueprintsRow, PrometheusBlueprintsInsert, PrometheusBlueprintsUpdate } from '@/types/generated/prometheus-meta/prometheus_blueprints.ts';
import { PrometheusBlueprintsInsertSchema, PrometheusBlueprintsUpdateSchema } from '@/lib/validators/generated/prometheus_blueprints.ts';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';

// =====================================================
// PrometheusBlueprints CRUD OPERATIONS
// =====================================================

/**
 * Create a new prometheus_blueprints record
 */
export async function createPrometheusBlueprints(data: PrometheusBlueprintsInsert): Promise<{ data: PrometheusBlueprintsRow | null; error: string | null }> {
  try {
    const validated = PrometheusBlueprintsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_blueprints')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating prometheus_blueprints:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a prometheus_blueprints record by ID
 */
export async function getPrometheusBlueprints(id: string): Promise<{ data: PrometheusBlueprintsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('prometheus_blueprints')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching prometheus_blueprints:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List prometheus_blueprints records with pagination and filters
 */
export async function listPrometheusBlueprints(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusBlueprintsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('prometheus_blueprints').select('*', { count: 'exact' });
    
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
    console.error('Error listing prometheus_blueprints:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a prometheus_blueprints record
 */
export async function updatePrometheusBlueprints(id: string, data: PrometheusBlueprintsUpdate): Promise<{ data: PrometheusBlueprintsRow | null; error: string | null }> {
  try {
    const validated = PrometheusBlueprintsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('prometheus_blueprints')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating prometheus_blueprints:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a prometheus_blueprints record
 */
export async function deletePrometheusBlueprints(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('prometheus_blueprints')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting prometheus_blueprints:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


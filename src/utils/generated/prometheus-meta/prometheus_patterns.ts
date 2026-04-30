// =====================================================
// UTILITIES: PrometheusPatterns
// DEITY: prometheus-meta
// GENERATED: 2026-04-30T00:26:46.371Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PrometheusPatternsInsertSchema, PrometheusPatternsUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_patterns';
import type { PrometheusPatternsInsert, PrometheusPatternsRow, PrometheusPatternsUpdate } from '@/types/generated/prometheus-meta/prometheus_patterns';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new prometheus_patterns record
 */
export async function createPrometheusPatterns(data: PrometheusPatternsInsert): Promise<PrometheusPatternsRow> {
  const validated = PrometheusPatternsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_patterns')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single prometheus_patterns record by ID
 */
export async function getPrometheusPatterns(id: string): Promise<PrometheusPatternsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prometheus_patterns')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of prometheus_patterns records with pagination
 */
export async function listPrometheusPatterns(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusPatternsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('prometheus_patterns').select('*', { count: 'exact' });
  
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  
  query = query.order(sort, { ascending: order === 'asc' });
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  if (error) throw error;
  
  return { data: data || [], total: count || 0 };
}

/**
 * Update a prometheus_patterns record
 */
export async function updatePrometheusPatterns(id: string, data: PrometheusPatternsUpdate): Promise<PrometheusPatternsRow> {
  const validated = PrometheusPatternsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_patterns')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a prometheus_patterns record
 */
export async function deletePrometheusPatterns(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('prometheus_patterns')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

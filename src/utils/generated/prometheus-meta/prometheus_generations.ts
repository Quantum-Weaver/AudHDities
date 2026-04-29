// =====================================================
// UTILITIES: PrometheusGenerations
// DEITY: prometheus-meta
// GENERATED: 2026-04-29T20:53:53.439Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PrometheusGenerationsInsertSchema, PrometheusGenerationsUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_generations';
import type { PrometheusGenerationsInsert, PrometheusGenerationsRow, PrometheusGenerationsUpdate } from '@/types/generated/prometheus-meta/prometheus_generations';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new prometheus_generations record
 */
export async function createPrometheusGenerations(data: PrometheusGenerationsInsert): Promise<PrometheusGenerationsRow> {
  const validated = PrometheusGenerationsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_generations')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single prometheus_generations record by ID
 */
export async function getPrometheusGenerations(id: string): Promise<PrometheusGenerationsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prometheus_generations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of prometheus_generations records with pagination
 */
export async function listPrometheusGenerations(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusGenerationsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('prometheus_generations').select('*', { count: 'exact' });
  
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
 * Update a prometheus_generations record
 */
export async function updatePrometheusGenerations(id: string, data: PrometheusGenerationsUpdate): Promise<PrometheusGenerationsRow> {
  const validated = PrometheusGenerationsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_generations')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a prometheus_generations record
 */
export async function deletePrometheusGenerations(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('prometheus_generations')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

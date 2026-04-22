// =====================================================
// UTILITIES: PrometheusMemories
// DEITY: prometheus-meta
// GENERATED: 2026-04-22T05:15:35.224Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PrometheusMemoriesInsertSchema, PrometheusMemoriesUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_memories';
import type { PrometheusMemoriesInsert, PrometheusMemoriesRow, PrometheusMemoriesUpdate } from '@/types/generated/prometheus-meta/prometheus_memories';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new prometheus_memories record
 */
export async function createPrometheusMemories(data: PrometheusMemoriesInsert): Promise<PrometheusMemoriesRow> {
  const validated = PrometheusMemoriesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_memories')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single prometheus_memories record by ID
 */
export async function getPrometheusMemories(id: string): Promise<PrometheusMemoriesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prometheus_memories')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of prometheus_memories records with pagination
 */
export async function listPrometheusMemories(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusMemoriesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('prometheus_memories').select('*', { count: 'exact' });
  
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
 * Update a prometheus_memories record
 */
export async function updatePrometheusMemories(id: string, data: PrometheusMemoriesUpdate): Promise<PrometheusMemoriesRow> {
  const validated = PrometheusMemoriesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_memories')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a prometheus_memories record
 */
export async function deletePrometheusMemories(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('prometheus_memories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// =====================================================
// UTILITIES: PrometheusBoundaries
// DEITY: prometheus-meta
// GENERATED: 2026-04-23T02:16:58.721Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PrometheusBoundariesInsertSchema, PrometheusBoundariesUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_boundaries';
import type { PrometheusBoundariesInsert, PrometheusBoundariesRow, PrometheusBoundariesUpdate } from '@/types/generated/prometheus-meta/prometheus_boundaries';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new prometheus_boundaries record
 */
export async function createPrometheusBoundaries(data: PrometheusBoundariesInsert): Promise<PrometheusBoundariesRow> {
  const validated = PrometheusBoundariesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_boundaries')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single prometheus_boundaries record by ID
 */
export async function getPrometheusBoundaries(id: string): Promise<PrometheusBoundariesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prometheus_boundaries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of prometheus_boundaries records with pagination
 */
export async function listPrometheusBoundaries(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusBoundariesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('prometheus_boundaries').select('*', { count: 'exact' });
  
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
 * Update a prometheus_boundaries record
 */
export async function updatePrometheusBoundaries(id: string, data: PrometheusBoundariesUpdate): Promise<PrometheusBoundariesRow> {
  const validated = PrometheusBoundariesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_boundaries')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a prometheus_boundaries record
 */
export async function deletePrometheusBoundaries(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('prometheus_boundaries')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

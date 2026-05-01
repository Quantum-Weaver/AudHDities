// =====================================================
// UTILITIES: PrometheusBlueprints
// DEITY: prometheus-meta
// GENERATED: 2026-05-01T03:24:41.788Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PrometheusBlueprintsInsertSchema, PrometheusBlueprintsUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_blueprints';
import type { PrometheusBlueprintsInsert, PrometheusBlueprintsRow, PrometheusBlueprintsUpdate } from '@/types/generated/prometheus-meta/prometheus_blueprints';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new prometheus_blueprints record
 */
export async function createPrometheusBlueprints(data: PrometheusBlueprintsInsert): Promise<PrometheusBlueprintsRow> {
  const validated = PrometheusBlueprintsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_blueprints')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single prometheus_blueprints record by ID
 */
export async function getPrometheusBlueprints(id: string): Promise<PrometheusBlueprintsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prometheus_blueprints')
    .select('*')
    .eq('prometheus_blueprints_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of prometheus_blueprints records with pagination
 */
export async function listPrometheusBlueprints(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusBlueprintsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('prometheus_blueprints').select('*', { count: 'exact' });
  
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
 * Update a prometheus_blueprints record
 */
export async function updatePrometheusBlueprints(id: string, data: PrometheusBlueprintsUpdate): Promise<PrometheusBlueprintsRow> {
  const validated = PrometheusBlueprintsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_blueprints')
    .update(validated)
    .eq('prometheus_blueprints_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a prometheus_blueprints record
 */
export async function deletePrometheusBlueprints(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('prometheus_blueprints')
    .delete()
    .eq('prometheus_blueprints_id', id);
  
  if (error) throw error;
  return true;
}

// =====================================================
// UTILITIES: PrometheusTemplates
// DEITY: prometheus-meta
// GENERATED: 2026-04-30T04:17:47.984Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PrometheusTemplatesInsertSchema, PrometheusTemplatesUpdateSchema } from '@/lib/validators/generated/prometheus-meta/prometheus_templates';
import type { PrometheusTemplatesInsert, PrometheusTemplatesRow, PrometheusTemplatesUpdate } from '@/types/generated/prometheus-meta/prometheus_templates';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new prometheus_templates record
 */
export async function createPrometheusTemplates(data: PrometheusTemplatesInsert): Promise<PrometheusTemplatesRow> {
  const validated = PrometheusTemplatesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_templates')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single prometheus_templates record by ID
 */
export async function getPrometheusTemplates(id: string): Promise<PrometheusTemplatesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('prometheus_templates')
    .select('*')
    .eq('prometheus_templates_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of prometheus_templates records with pagination
 */
export async function listPrometheusTemplates(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PrometheusTemplatesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('prometheus_templates').select('*', { count: 'exact' });
  
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
 * Update a prometheus_templates record
 */
export async function updatePrometheusTemplates(id: string, data: PrometheusTemplatesUpdate): Promise<PrometheusTemplatesRow> {
  const validated = PrometheusTemplatesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('prometheus_templates')
    .update(validated)
    .eq('prometheus_templates_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a prometheus_templates record
 */
export async function deletePrometheusTemplates(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('prometheus_templates')
    .delete()
    .eq('prometheus_templates_id', id);
  
  if (error) throw error;
  return true;
}

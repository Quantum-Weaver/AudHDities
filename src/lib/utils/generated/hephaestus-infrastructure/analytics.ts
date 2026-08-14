// =====================================================
// UTILITIES: Analytics
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T21:41:40.762Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AnalyticsInsertSchema, AnalyticsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/analytics';
import type { AnalyticsInsert, AnalyticsRow, AnalyticsUpdate } from '@/types/generated/hephaestus-infrastructure/analytics';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new analytics record
 */
export async function createAnalytics(data: AnalyticsInsert): Promise<AnalyticsRow> {
  const validated = AnalyticsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('analytics')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single analytics record by ID
 */
export async function getAnalytics(id: string): Promise<AnalyticsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of analytics records with pagination
 */
export async function listAnalytics(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AnalyticsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('analytics').select('*', { count: 'exact' });
  
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
 * Update a analytics record
 */
export async function updateAnalytics(id: string, data: AnalyticsUpdate): Promise<AnalyticsRow> {
  const validated = AnalyticsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('analytics')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a analytics record
 */
export async function deleteAnalytics(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('analytics')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

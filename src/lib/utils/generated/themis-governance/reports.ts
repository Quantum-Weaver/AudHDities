// =====================================================
// UTILITIES: Reports
// DEITY: themis-governance
// GENERATED: 2026-07-28T05:07:04.461Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ReportsInsertSchema, ReportsUpdateSchema } from '@/lib/validators/generated/themis-governance/reports';
import type { ReportsInsert, ReportsRow, ReportsUpdate } from '@/types/generated/themis-governance/reports';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new reports record
 */
export async function createReports(data: ReportsInsert): Promise<ReportsRow> {
  const validated = ReportsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('reports')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single reports record by ID
 */
export async function getReports(id: string): Promise<ReportsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of reports records with pagination
 */
export async function listReports(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ReportsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('reports').select('*', { count: 'exact' });
  
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
 * Update a reports record
 */
export async function updateReports(id: string, data: ReportsUpdate): Promise<ReportsRow> {
  const validated = ReportsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('reports')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a reports record
 */
export async function deleteReports(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('reports')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

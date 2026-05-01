// =====================================================
// UTILITIES: AdminLogs
// DEITY: themis-governance
// GENERATED: 2026-05-01T03:24:41.031Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AdminLogsInsertSchema, AdminLogsUpdateSchema } from '@/lib/validators/generated/themis-governance/admin_logs';
import type { AdminLogsInsert, AdminLogsRow, AdminLogsUpdate } from '@/types/generated/themis-governance/admin_logs';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new admin_logs record
 */
export async function createAdminLogs(data: AdminLogsInsert): Promise<AdminLogsRow> {
  const validated = AdminLogsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('admin_logs')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single admin_logs record by ID
 */
export async function getAdminLogs(id: string): Promise<AdminLogsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('admin_logs')
    .select('*')
    .eq('admin_logs_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of admin_logs records with pagination
 */
export async function listAdminLogs(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AdminLogsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('admin_logs').select('*', { count: 'exact' });
  
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
 * Update a admin_logs record
 */
export async function updateAdminLogs(id: string, data: AdminLogsUpdate): Promise<AdminLogsRow> {
  const validated = AdminLogsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('admin_logs')
    .update(validated)
    .eq('admin_logs_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a admin_logs record
 */
export async function deleteAdminLogs(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('admin_logs')
    .delete()
    .eq('admin_logs_id', id);
  
  if (error) throw error;
  return true;
}

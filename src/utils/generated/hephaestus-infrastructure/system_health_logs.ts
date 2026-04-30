// =====================================================
// UTILITIES: SystemHealthLogs
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-30T00:26:46.751Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SystemHealthLogsInsertSchema, SystemHealthLogsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/system_health_logs';
import type { SystemHealthLogsInsert, SystemHealthLogsRow, SystemHealthLogsUpdate } from '@/types/generated/hephaestus-infrastructure/system_health_logs';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new system_health_logs record
 */
export async function createSystemHealthLogs(data: SystemHealthLogsInsert): Promise<SystemHealthLogsRow> {
  const validated = SystemHealthLogsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('system_health_logs')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single system_health_logs record by ID
 */
export async function getSystemHealthLogs(id: string): Promise<SystemHealthLogsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('system_health_logs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of system_health_logs records with pagination
 */
export async function listSystemHealthLogs(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SystemHealthLogsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('system_health_logs').select('*', { count: 'exact' });
  
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
 * Update a system_health_logs record
 */
export async function updateSystemHealthLogs(id: string, data: SystemHealthLogsUpdate): Promise<SystemHealthLogsRow> {
  const validated = SystemHealthLogsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('system_health_logs')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a system_health_logs record
 */
export async function deleteSystemHealthLogs(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('system_health_logs')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

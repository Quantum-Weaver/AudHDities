// =====================================================
// UTILITIES: EnergyLogs
// DEITY: hestia-core
// GENERATED: 2026-05-01T15:31:59.579Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { EnergyLogsInsertSchema, EnergyLogsUpdateSchema } from '@/lib/validators/generated/hestia-core/energy_logs';
import type { EnergyLogsInsert, EnergyLogsRow, EnergyLogsUpdate } from '@/types/generated/hestia-core/energy_logs';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new energy_logs record
 */
export async function createEnergyLogs(data: EnergyLogsInsert): Promise<EnergyLogsRow> {
  const validated = EnergyLogsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('energy_logs')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single energy_logs record by ID
 */
export async function getEnergyLogs(id: string): Promise<EnergyLogsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('energy_logs')
    .select('*')
    .eq('energy_logs_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of energy_logs records with pagination
 */
export async function listEnergyLogs(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EnergyLogsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('energy_logs').select('*', { count: 'exact' });
  
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
 * Update a energy_logs record
 */
export async function updateEnergyLogs(id: string, data: EnergyLogsUpdate): Promise<EnergyLogsRow> {
  const validated = EnergyLogsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('energy_logs')
    .update(validated)
    .eq('energy_logs_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a energy_logs record
 */
export async function deleteEnergyLogs(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('energy_logs')
    .delete()
    .eq('energy_logs_id', id);
  
  if (error) throw error;
  return true;
}

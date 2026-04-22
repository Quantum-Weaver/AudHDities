// =====================================================
// UTILITIES: ScriptExecutionLogs
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-22T05:15:35.512Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ScriptExecutionLogsInsertSchema, ScriptExecutionLogsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/script_execution_logs';
import type { ScriptExecutionLogsInsert, ScriptExecutionLogsRow, ScriptExecutionLogsUpdate } from '@/types/generated/hephaestus-infrastructure/script_execution_logs';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new script_execution_logs record
 */
export async function createScriptExecutionLogs(data: ScriptExecutionLogsInsert): Promise<ScriptExecutionLogsRow> {
  const validated = ScriptExecutionLogsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('script_execution_logs')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single script_execution_logs record by ID
 */
export async function getScriptExecutionLogs(id: string): Promise<ScriptExecutionLogsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('script_execution_logs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of script_execution_logs records with pagination
 */
export async function listScriptExecutionLogs(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ScriptExecutionLogsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('script_execution_logs').select('*', { count: 'exact' });
  
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
 * Update a script_execution_logs record
 */
export async function updateScriptExecutionLogs(id: string, data: ScriptExecutionLogsUpdate): Promise<ScriptExecutionLogsRow> {
  const validated = ScriptExecutionLogsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('script_execution_logs')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a script_execution_logs record
 */
export async function deleteScriptExecutionLogs(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('script_execution_logs')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

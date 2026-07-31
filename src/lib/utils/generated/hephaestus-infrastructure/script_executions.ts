// =====================================================
// UTILITIES: ScriptExecutions
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-07-31T23:16:54.816Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ScriptExecutionsInsertSchema, ScriptExecutionsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/script_executions';
import type { ScriptExecutionsInsert, ScriptExecutionsRow, ScriptExecutionsUpdate } from '@/types/generated/hephaestus-infrastructure/script_executions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new script_executions record
 */
export async function createScriptExecutions(data: ScriptExecutionsInsert): Promise<ScriptExecutionsRow> {
  const validated = ScriptExecutionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('script_executions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single script_executions record by ID
 */
export async function getScriptExecutions(id: string): Promise<ScriptExecutionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('script_executions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of script_executions records with pagination
 */
export async function listScriptExecutions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ScriptExecutionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('script_executions').select('*', { count: 'exact' });
  
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
 * Update a script_executions record
 */
export async function updateScriptExecutions(id: string, data: ScriptExecutionsUpdate): Promise<ScriptExecutionsRow> {
  const validated = ScriptExecutionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('script_executions')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a script_executions record
 */
export async function deleteScriptExecutions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('script_executions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

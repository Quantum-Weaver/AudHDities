// =====================================================
// UTILITIES: Processes
// DEITY: themis-governance
// GENERATED: 2026-04-23T02:16:58.666Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ProcessesInsertSchema, ProcessesUpdateSchema } from '@/lib/validators/generated/themis-governance/processes';
import type { ProcessesInsert, ProcessesRow, ProcessesUpdate } from '@/types/generated/themis-governance/processes';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new processes record
 */
export async function createProcesses(data: ProcessesInsert): Promise<ProcessesRow> {
  const validated = ProcessesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('processes')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single processes record by ID
 */
export async function getProcesses(id: string): Promise<ProcessesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('processes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of processes records with pagination
 */
export async function listProcesses(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProcessesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('processes').select('*', { count: 'exact' });
  
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
 * Update a processes record
 */
export async function updateProcesses(id: string, data: ProcessesUpdate): Promise<ProcessesRow> {
  const validated = ProcessesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('processes')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a processes record
 */
export async function deleteProcesses(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('processes')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

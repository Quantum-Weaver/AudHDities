// =====================================================
// UTILITIES: Executioner
// DEITY: aethelred-connections
// GENERATED: 2026-04-23T02:16:58.426Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ExecutionerInsertSchema, ExecutionerUpdateSchema } from '@/lib/validators/generated/aethelred-connections/executioner';
import type { ExecutionerInsert, ExecutionerRow, ExecutionerUpdate } from '@/types/generated/aethelred-connections/executioner';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new executioner record
 */
export async function createExecutioner(data: ExecutionerInsert): Promise<ExecutionerRow> {
  const validated = ExecutionerInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('executioner')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single executioner record by ID
 */
export async function getExecutioner(id: string): Promise<ExecutionerRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('executioner')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of executioner records with pagination
 */
export async function listExecutioner(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ExecutionerRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('executioner').select('*', { count: 'exact' });
  
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
 * Update a executioner record
 */
export async function updateExecutioner(id: string, data: ExecutionerUpdate): Promise<ExecutionerRow> {
  const validated = ExecutionerUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('executioner')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a executioner record
 */
export async function deleteExecutioner(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('executioner')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

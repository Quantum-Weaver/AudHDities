// =====================================================
// UTILITIES: Signals
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:17:11.136Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SignalsInsertSchema, SignalsUpdateSchema } from '@/lib/validators/generated/iris-communications/signals';
import type { SignalsInsert, SignalsRow, SignalsUpdate } from '@/types/generated/iris-communications/signals';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new signals record
 */
export async function createSignals(data: SignalsInsert): Promise<SignalsRow> {
  const validated = SignalsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('signals')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single signals record by ID
 */
export async function getSignals(id: string): Promise<SignalsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('signals')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of signals records with pagination
 */
export async function listSignals(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SignalsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('signals').select('*', { count: 'exact' });
  
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
 * Update a signals record
 */
export async function updateSignals(id: string, data: SignalsUpdate): Promise<SignalsRow> {
  const validated = SignalsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('signals')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a signals record
 */
export async function deleteSignals(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('signals')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// =====================================================
// UTILITIES: Heralds
// DEITY: hestia-core
// GENERATED: 2026-07-28T05:07:04.282Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { HeraldsInsertSchema, HeraldsUpdateSchema } from '@/lib/validators/generated/hestia-core/heralds';
import type { HeraldsInsert, HeraldsRow, HeraldsUpdate } from '@/types/generated/hestia-core/heralds';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new heralds record
 */
export async function createHeralds(data: HeraldsInsert): Promise<HeraldsRow> {
  const validated = HeraldsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('heralds')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single heralds record by ID
 */
export async function getHeralds(id: string): Promise<HeraldsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('heralds')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of heralds records with pagination
 */
export async function listHeralds(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: HeraldsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('heralds').select('*', { count: 'exact' });
  
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
 * Update a heralds record
 */
export async function updateHeralds(id: string, data: HeraldsUpdate): Promise<HeraldsRow> {
  const validated = HeraldsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('heralds')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a heralds record
 */
export async function deleteHeralds(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('heralds')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

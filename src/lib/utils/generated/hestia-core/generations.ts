// =====================================================
// UTILITIES: Generations
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.461Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GenerationsInsertSchema, GenerationsUpdateSchema } from '@/lib/validators/generated/hestia-core/generations';
import type { GenerationsInsert, GenerationsRow, GenerationsUpdate } from '@/types/generated/hestia-core/generations';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new generations record
 */
export async function createGenerations(data: GenerationsInsert): Promise<GenerationsRow> {
  const validated = GenerationsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('generations')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single generations record by ID
 */
export async function getGenerations(id: string): Promise<GenerationsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('generations_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of generations records with pagination
 */
export async function listGenerations(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GenerationsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('generations').select('*', { count: 'exact' });
  
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
 * Update a generations record
 */
export async function updateGenerations(id: string, data: GenerationsUpdate): Promise<GenerationsRow> {
  const validated = GenerationsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('generations')
    .update(validated)
    .eq('generations_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a generations record
 */
export async function deleteGenerations(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('generations')
    .delete()
    .eq('generations_id', id);
  
  if (error) throw error;
  return true;
}

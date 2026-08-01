// =====================================================
// UTILITIES: Chancellor
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T18:34:04.331Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ChancellorInsertSchema, ChancellorUpdateSchema } from '@/lib/validators/generated/aethelred-connections/chancellor';
import type { ChancellorInsert, ChancellorRow, ChancellorUpdate } from '@/types/generated/aethelred-connections/chancellor';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new chancellor record
 */
export async function createChancellor(data: ChancellorInsert): Promise<ChancellorRow> {
  const validated = ChancellorInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('chancellor')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single chancellor record by ID
 */
export async function getChancellor(id: string): Promise<ChancellorRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('chancellor')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of chancellor records with pagination
 */
export async function listChancellor(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ChancellorRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('chancellor').select('*', { count: 'exact' });
  
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
 * Update a chancellor record
 */
export async function updateChancellor(id: string, data: ChancellorUpdate): Promise<ChancellorRow> {
  const validated = ChancellorUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('chancellor')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a chancellor record
 */
export async function deleteChancellor(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('chancellor')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

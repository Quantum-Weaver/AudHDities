// =====================================================
// UTILITIES: Memories
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-31T00:35:01.564Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { MemoriesInsertSchema, MemoriesUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/memories';
import type { MemoriesInsert, MemoriesRow, MemoriesUpdate } from '@/types/generated/mnemosyne-assessment/memories';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new memories record
 */
export async function createMemories(data: MemoriesInsert): Promise<MemoriesRow> {
  const validated = MemoriesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('memories')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single memories record by ID
 */
export async function getMemories(id: string): Promise<MemoriesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of memories records with pagination
 */
export async function listMemories(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: MemoriesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('memories').select('*', { count: 'exact' });
  
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
 * Update a memories record
 */
export async function updateMemories(id: string, data: MemoriesUpdate): Promise<MemoriesRow> {
  const validated = MemoriesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('memories')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a memories record
 */
export async function deleteMemories(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('memories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

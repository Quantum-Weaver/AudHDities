// =====================================================
// UTILITIES: Gifts
// DEITY: plutus-economics
// GENERATED: 2026-08-01T16:03:06.590Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GiftsInsertSchema, GiftsUpdateSchema } from '@/lib/validators/generated/plutus-economics/gifts';
import type { GiftsInsert, GiftsRow, GiftsUpdate } from '@/types/generated/plutus-economics/gifts';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new gifts record
 */
export async function createGifts(data: GiftsInsert): Promise<GiftsRow> {
  const validated = GiftsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('gifts')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single gifts record by ID
 */
export async function getGifts(id: string): Promise<GiftsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gifts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of gifts records with pagination
 */
export async function listGifts(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GiftsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('gifts').select('*', { count: 'exact' });
  
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
 * Update a gifts record
 */
export async function updateGifts(id: string, data: GiftsUpdate): Promise<GiftsRow> {
  const validated = GiftsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('gifts')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a gifts record
 */
export async function deleteGifts(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('gifts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

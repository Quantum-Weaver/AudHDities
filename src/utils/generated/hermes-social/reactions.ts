// =====================================================
// UTILITIES: Reactions
// DEITY: hermes-social
// GENERATED: 2026-04-29T20:53:53.466Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ReactionsInsertSchema, ReactionsUpdateSchema } from '@/lib/validators/generated/hermes-social/reactions';
import type { ReactionsInsert, ReactionsRow, ReactionsUpdate } from '@/types/generated/hermes-social/reactions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new reactions record
 */
export async function createReactions(data: ReactionsInsert): Promise<ReactionsRow> {
  const validated = ReactionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('reactions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single reactions record by ID
 */
export async function getReactions(id: string): Promise<ReactionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reactions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of reactions records with pagination
 */
export async function listReactions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ReactionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('reactions').select('*', { count: 'exact' });
  
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
 * Update a reactions record
 */
export async function updateReactions(id: string, data: ReactionsUpdate): Promise<ReactionsRow> {
  const validated = ReactionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('reactions')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a reactions record
 */
export async function deleteReactions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('reactions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

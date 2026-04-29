// =====================================================
// UTILITIES: Replies
// DEITY: hermes-social
// GENERATED: 2026-04-29T20:53:53.473Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { RepliesInsertSchema, RepliesUpdateSchema } from '@/lib/validators/generated/hermes-social/replies';
import type { RepliesInsert, RepliesRow, RepliesUpdate } from '@/types/generated/hermes-social/replies';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new replies record
 */
export async function createReplies(data: RepliesInsert): Promise<RepliesRow> {
  const validated = RepliesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('replies')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single replies record by ID
 */
export async function getReplies(id: string): Promise<RepliesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('replies')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of replies records with pagination
 */
export async function listReplies(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: RepliesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('replies').select('*', { count: 'exact' });
  
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
 * Update a replies record
 */
export async function updateReplies(id: string, data: RepliesUpdate): Promise<RepliesRow> {
  const validated = RepliesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('replies')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a replies record
 */
export async function deleteReplies(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('replies')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// =====================================================
// UTILITIES: Comments
// DEITY: hermes-social
// GENERATED: 2026-05-01T03:24:41.217Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CommentsInsertSchema, CommentsUpdateSchema } from '@/lib/validators/generated/hermes-social/comments';
import type { CommentsInsert, CommentsRow, CommentsUpdate } from '@/types/generated/hermes-social/comments';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new comments record
 */
export async function createComments(data: CommentsInsert): Promise<CommentsRow> {
  const validated = CommentsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('comments')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single comments record by ID
 */
export async function getComments(id: string): Promise<CommentsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('comments_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of comments records with pagination
 */
export async function listComments(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CommentsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('comments').select('*', { count: 'exact' });
  
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
 * Update a comments record
 */
export async function updateComments(id: string, data: CommentsUpdate): Promise<CommentsRow> {
  const validated = CommentsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('comments')
    .update(validated)
    .eq('comments_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a comments record
 */
export async function deleteComments(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('comments_id', id);
  
  if (error) throw error;
  return true;
}

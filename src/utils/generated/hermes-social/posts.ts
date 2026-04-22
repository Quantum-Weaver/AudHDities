// =====================================================
// UTILITIES: Posts
// DEITY: hermes-social
// GENERATED: 2026-04-22T05:48:50.470Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PostsInsertSchema, PostsUpdateSchema } from '@/lib/validators/generated/hermes-social/posts';
import type { PostsInsert, PostsRow, PostsUpdate } from '@/types/generated/hermes-social/posts';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new posts record
 */
export async function createPosts(data: PostsInsert): Promise<PostsRow> {
  const validated = PostsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('posts')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single posts record by ID
 */
export async function getPosts(id: string): Promise<PostsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of posts records with pagination
 */
export async function listPosts(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PostsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('posts').select('*', { count: 'exact' });
  
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
 * Update a posts record
 */
export async function updatePosts(id: string, data: PostsUpdate): Promise<PostsRow> {
  const validated = PostsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('posts')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a posts record
 */
export async function deletePosts(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

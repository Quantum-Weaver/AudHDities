// =====================================================
// UTILITIES: GithubConnection
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:17:10.847Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GithubConnectionInsertSchema, GithubConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/github_connection';
import type { GithubConnectionInsert, GithubConnectionRow, GithubConnectionUpdate } from '@/types/generated/aethelred-connections/github_connection';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new github_connection record
 */
export async function createGithubConnection(data: GithubConnectionInsert): Promise<GithubConnectionRow> {
  const validated = GithubConnectionInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('github_connection')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single github_connection record by ID
 */
export async function getGithubConnection(id: string): Promise<GithubConnectionRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('github_connection')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of github_connection records with pagination
 */
export async function listGithubConnection(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GithubConnectionRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('github_connection').select('*', { count: 'exact' });
  
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
 * Update a github_connection record
 */
export async function updateGithubConnection(id: string, data: GithubConnectionUpdate): Promise<GithubConnectionRow> {
  const validated = GithubConnectionUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('github_connection')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a github_connection record
 */
export async function deleteGithubConnection(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('github_connection')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

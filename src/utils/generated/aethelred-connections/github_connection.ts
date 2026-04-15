// =====================================================
// FILE: utils/generated/aethelred-connections/github_connection.ts
// GENERATED: 2026-04-15T18:11:44.461Z
// SOURCE: database.types.ts
// =====================================================

import type { GithubConnectionRow, GithubConnectionInsert, GithubConnectionUpdate } from '@/types/generated/aethelred-connections/github_connection';
import { GithubConnectionRowSchema, GithubConnectionInsertSchema, GithubConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/github_connection';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// GithubConnection CRUD OPERATIONS
// =====================================================

/**
 * Create a new github_connection record
 */
export async function createGithubConnection(data: GithubConnectionInsert): Promise<{ data: GithubConnectionRow | null; error: string | null }> {
  try {
    const validated = GithubConnectionRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('github_connection')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating github_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a github_connection record by ID
 */
export async function getGithubConnection(id: string): Promise<{ data: GithubConnectionRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('github_connection')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching github_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List github_connection records with pagination and filters
 */
export async function listGithubConnection(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GithubConnectionRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('github_connection').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], total: count || 0, error: null };
  } catch (error) {
    console.error('Error listing github_connection:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a github_connection record
 */
export async function updateGithubConnection(id: string, data: GithubConnectionUpdate): Promise<{ data: GithubConnectionRow | null; error: string | null }> {
  try {
    const validated = GithubConnectionUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('github_connection')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating github_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a github_connection record
 */
export async function deleteGithubConnection(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('github_connection')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting github_connection:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


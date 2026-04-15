// =====================================================
// FILE: utils/generated/hermes-social/replies.ts
// GENERATED: 2026-04-15T19:06:11.656Z
// SOURCE: database.types.ts
// =====================================================

import type { RepliesRow, RepliesInsert, RepliesUpdate } from '@/types/generated/hermes-social/replies';
import { RepliesRowSchema, RepliesInsertSchema, RepliesUpdateSchema } from '@/lib/validators/generated/hermes-social/replies';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Replies CRUD OPERATIONS
// =====================================================

/**
 * Create a new replies record
 */
export async function createReplies(data: RepliesInsert): Promise<{ data: RepliesRow | null; error: string | null }> {
  try {
    const validated = RepliesRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('replies')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating replies:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a replies record by ID
 */
export async function getReplies(id: string): Promise<{ data: RepliesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('replies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching replies:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List replies records with pagination and filters
 */
export async function listReplies(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: RepliesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('replies').select('*', { count: 'exact' });
    
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
    console.error('Error listing replies:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a replies record
 */
export async function updateReplies(id: string, data: RepliesUpdate): Promise<{ data: RepliesRow | null; error: string | null }> {
  try {
    const validated = RepliesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('replies')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating replies:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a replies record
 */
export async function deleteReplies(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('replies')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting replies:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


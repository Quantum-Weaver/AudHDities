// =====================================================
// FILE: utils/generated/hermes-social/reactions.ts
// GENERATED: 2026-04-15T19:30:35.583Z
// SOURCE: database.types.ts
// =====================================================

import type { ReactionsRow, ReactionsInsert, ReactionsUpdate } from '@/types/generated/hermes-social/reactions';
import { ReactionsRowSchema, ReactionsInsertSchema, ReactionsUpdateSchema } from '@/lib/validators/generated/hermes-social/reactions';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Reactions CRUD OPERATIONS
// =====================================================

/**
 * Create a new reactions record
 */
export async function createReactions(data: ReactionsInsert): Promise<{ data: ReactionsRow | null; error: string | null }> {
  try {
    const validated = ReactionsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('reactions')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating reactions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a reactions record by ID
 */
export async function getReactions(id: string): Promise<{ data: ReactionsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('reactions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List reactions records with pagination and filters
 */
export async function listReactions(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ReactionsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('reactions').select('*', { count: 'exact' });
    
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
    console.error('Error listing reactions:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a reactions record
 */
export async function updateReactions(id: string, data: ReactionsUpdate): Promise<{ data: ReactionsRow | null; error: string | null }> {
  try {
    const validated = ReactionsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('reactions')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating reactions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a reactions record
 */
export async function deleteReactions(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('reactions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting reactions:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


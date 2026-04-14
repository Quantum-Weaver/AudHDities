// =====================================================
// FILE: utils/generated/mnemosyne-assessment/folksonomy.ts
// GENERATED: 2026-04-14T19:39:30.156Z
// SOURCE: database.types.ts
// =====================================================

import type { FolksonomyRow, FolksonomyInsert, FolksonomyUpdate } from '@/types/generated/mnemosyne-assessment/folksonomy.ts';
import { FolksonomyInsertSchema, FolksonomyUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/folksonomy.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Folksonomy CRUD OPERATIONS
// =====================================================

/**
 * Create a new folksonomy record
 */
export async function createFolksonomy(data: FolksonomyInsert): Promise<{ data: FolksonomyRow | null; error: string | null }> {
  try {
    const validated = FolksonomyInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('folksonomy')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating folksonomy:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a folksonomy record by ID
 */
export async function getFolksonomy(id: string): Promise<{ data: FolksonomyRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('folksonomy')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching folksonomy:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List folksonomy records with pagination and filters
 */
export async function listFolksonomy(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: FolksonomyRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('folksonomy').select('*', { count: 'exact' });
    
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
    console.error('Error listing folksonomy:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a folksonomy record
 */
export async function updateFolksonomy(id: string, data: FolksonomyUpdate): Promise<{ data: FolksonomyRow | null; error: string | null }> {
  try {
    const validated = FolksonomyUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('folksonomy')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating folksonomy:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a folksonomy record
 */
export async function deleteFolksonomy(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('folksonomy')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting folksonomy:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


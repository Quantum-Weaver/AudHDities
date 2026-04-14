// =====================================================
// FILE: utils/generated/hermes-social/creative_categories.ts
// GENERATED: 2026-04-14T21:18:08.957Z
// SOURCE: database.types.ts
// =====================================================

import type { CreativeCategoriesRow, CreativeCategoriesInsert, CreativeCategoriesUpdate } from '@/types/generated/hermes-social/creative_categories.ts';
import { CreativeCategoriesInsertSchema, CreativeCategoriesUpdateSchema } from '@/lib/validators/generated/hermes-social/creative_categories.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// CreativeCategories CRUD OPERATIONS
// =====================================================

/**
 * Create a new creative_categories record
 */
export async function createCreativeCategories(data: CreativeCategoriesInsert): Promise<{ data: CreativeCategoriesRow | null; error: string | null }> {
  try {
    const validated = CreativeCategoriesInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('creative_categories')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating creative_categories:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a creative_categories record by ID
 */
export async function getCreativeCategories(id: string): Promise<{ data: CreativeCategoriesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('creative_categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching creative_categories:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List creative_categories records with pagination and filters
 */
export async function listCreativeCategories(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CreativeCategoriesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('creative_categories').select('*', { count: 'exact' });
    
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
    console.error('Error listing creative_categories:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a creative_categories record
 */
export async function updateCreativeCategories(id: string, data: CreativeCategoriesUpdate): Promise<{ data: CreativeCategoriesRow | null; error: string | null }> {
  try {
    const validated = CreativeCategoriesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('creative_categories')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating creative_categories:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a creative_categories record
 */
export async function deleteCreativeCategories(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('creative_categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting creative_categories:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


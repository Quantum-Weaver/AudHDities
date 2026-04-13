// =====================================================
// FILE: utils/generated/hestia-core/creator_category_links.ts
// GENERATED: 2026-04-13T15:29:51.045Z
// SOURCE: database.types.ts
// =====================================================

import type { CreatorCategoryLinksRow, CreatorCategoryLinksInsert, CreatorCategoryLinksUpdate } from 'src/types/generated/hestia-core/creator_category_links.ts';
import { CreatorCategoryLinksInsertSchema, CreatorCategoryLinksUpdateSchema } from 'src/lib/validators/generated/creator_category_links.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// CreatorCategoryLinks CRUD OPERATIONS
// =====================================================

/**
 * Create a new creator_category_links record
 */
export async function createCreatorCategoryLinks(data: CreatorCategoryLinksInsert): Promise<{ data: CreatorCategoryLinksRow | null; error: string | null }> {
  try {
    const validated = CreatorCategoryLinksInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('creator_category_links')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating creator_category_links:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a creator_category_links record by ID
 */
export async function getCreatorCategoryLinks(id: string): Promise<{ data: CreatorCategoryLinksRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('creator_category_links')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching creator_category_links:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List creator_category_links records with pagination and filters
 */
export async function listCreatorCategoryLinks(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CreatorCategoryLinksRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('creator_category_links').select('*', { count: 'exact' });
    
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
    console.error('Error listing creator_category_links:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a creator_category_links record
 */
export async function updateCreatorCategoryLinks(id: string, data: CreatorCategoryLinksUpdate): Promise<{ data: CreatorCategoryLinksRow | null; error: string | null }> {
  try {
    const validated = CreatorCategoryLinksUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('creator_category_links')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating creator_category_links:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a creator_category_links record
 */
export async function deleteCreatorCategoryLinks(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('creator_category_links')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting creator_category_links:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


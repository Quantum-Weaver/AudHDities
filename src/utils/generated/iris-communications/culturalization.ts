// =====================================================
// FILE: utils/generated/iris-communications/culturalization.ts
// GENERATED: 2026-04-14T21:18:08.958Z
// SOURCE: database.types.ts
// =====================================================

import type { CulturalizationRow, CulturalizationInsert, CulturalizationUpdate } from '@/types/generated/iris-communications/culturalization.ts';
import { CulturalizationInsertSchema, CulturalizationUpdateSchema } from '@/lib/validators/generated/iris-communications/culturalization.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Culturalization CRUD OPERATIONS
// =====================================================

/**
 * Create a new culturalization record
 */
export async function createCulturalization(data: CulturalizationInsert): Promise<{ data: CulturalizationRow | null; error: string | null }> {
  try {
    const validated = CulturalizationInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('culturalization')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating culturalization:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a culturalization record by ID
 */
export async function getCulturalization(id: string): Promise<{ data: CulturalizationRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('culturalization')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching culturalization:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List culturalization records with pagination and filters
 */
export async function listCulturalization(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CulturalizationRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('culturalization').select('*', { count: 'exact' });
    
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
    console.error('Error listing culturalization:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a culturalization record
 */
export async function updateCulturalization(id: string, data: CulturalizationUpdate): Promise<{ data: CulturalizationRow | null; error: string | null }> {
  try {
    const validated = CulturalizationUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('culturalization')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating culturalization:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a culturalization record
 */
export async function deleteCulturalization(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('culturalization')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting culturalization:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


// =====================================================
// FILE: utils/generated/iris-communications/localization.ts
// GENERATED: 2026-04-17T17:34:19.871Z
// SOURCE: database.types.ts
// =====================================================

import type { LocalizationRow, LocalizationInsert, LocalizationUpdate } from '@/types/generated/iris-communications/localization';
import { LocalizationRowSchema, LocalizationInsertSchema, LocalizationUpdateSchema } from '@/lib/validators/generated/iris-communications/localization';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Localization CRUD OPERATIONS
// =====================================================

/**
 * Create a new localization record
 */
export async function createLocalization(data: LocalizationInsert): Promise<{ data: LocalizationRow | null; error: string | null }> {
  try {
    const validated = LocalizationRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('localization')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating localization:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a localization record by ID
 */
export async function getLocalization(id: string): Promise<{ data: LocalizationRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('localization')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching localization:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List localization records with pagination and filters
 */
export async function listLocalization(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LocalizationRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('localization').select('*', { count: 'exact' });
    
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
    console.error('Error listing localization:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a localization record
 */
export async function updateLocalization(id: string, data: LocalizationUpdate): Promise<{ data: LocalizationRow | null; error: string | null }> {
  try {
    const validated = LocalizationUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('localization')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating localization:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a localization record
 */
export async function deleteLocalization(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('localization')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting localization:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


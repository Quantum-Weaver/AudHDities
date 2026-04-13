// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/scripts.ts
// GENERATED: 2026-04-13T23:49:00.117Z
// SOURCE: database.types.ts
// =====================================================

import type { ScriptsRow, ScriptsInsert, ScriptsUpdate } from '@/types/generated/hephaestus-infrastructure/scripts.ts';
import { ScriptsInsertSchema, ScriptsUpdateSchema } from '@/lib/validators/generated/scripts.ts';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';

// =====================================================
// Scripts CRUD OPERATIONS
// =====================================================

/**
 * Create a new scripts record
 */
export async function createScripts(data: ScriptsInsert): Promise<{ data: ScriptsRow | null; error: string | null }> {
  try {
    const validated = ScriptsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('scripts')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating scripts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a scripts record by ID
 */
export async function getScripts(id: string): Promise<{ data: ScriptsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching scripts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List scripts records with pagination and filters
 */
export async function listScripts(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ScriptsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('scripts').select('*', { count: 'exact' });
    
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
    console.error('Error listing scripts:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a scripts record
 */
export async function updateScripts(id: string, data: ScriptsUpdate): Promise<{ data: ScriptsRow | null; error: string | null }> {
  try {
    const validated = ScriptsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('scripts')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating scripts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a scripts record
 */
export async function deleteScripts(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('scripts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting scripts:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


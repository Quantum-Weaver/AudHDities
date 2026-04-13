// =====================================================
// FILE: utils/generated/athena-gamification/mythology.ts
// GENERATED: 2026-04-13T15:29:51.050Z
// SOURCE: database.types.ts
// =====================================================

import type { MythologyRow, MythologyInsert, MythologyUpdate } from '@/types/generated/athena-gamification/mythology.ts';
import { MythologyInsertSchema, MythologyUpdateSchema } from '@/lib/validators/generated/mythology.ts';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';

// =====================================================
// Mythology CRUD OPERATIONS
// =====================================================

/**
 * Create a new mythology record
 */
export async function createMythology(data: MythologyInsert): Promise<{ data: MythologyRow | null; error: string | null }> {
  try {
    const validated = MythologyInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('mythology')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating mythology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a mythology record by ID
 */
export async function getMythology(id: string): Promise<{ data: MythologyRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('mythology')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching mythology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List mythology records with pagination and filters
 */
export async function listMythology(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: MythologyRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('mythology').select('*', { count: 'exact' });
    
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
    console.error('Error listing mythology:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a mythology record
 */
export async function updateMythology(id: string, data: MythologyUpdate): Promise<{ data: MythologyRow | null; error: string | null }> {
  try {
    const validated = MythologyUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('mythology')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating mythology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a mythology record
 */
export async function deleteMythology(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('mythology')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting mythology:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


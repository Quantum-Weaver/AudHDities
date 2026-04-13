// =====================================================
// FILE: utils/generated/aethelred-connections/executioner.ts
// GENERATED: 2026-04-13T15:29:51.047Z
// SOURCE: database.types.ts
// =====================================================

import type { ExecutionerRow, ExecutionerInsert, ExecutionerUpdate } from 'src/types/generated/aethelred-connections/executioner.ts';
import { ExecutionerInsertSchema, ExecutionerUpdateSchema } from 'src/lib/validators/generated/executioner.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// Executioner CRUD OPERATIONS
// =====================================================

/**
 * Create a new executioner record
 */
export async function createExecutioner(data: ExecutionerInsert): Promise<{ data: ExecutionerRow | null; error: string | null }> {
  try {
    const validated = ExecutionerInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('executioner')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating executioner:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a executioner record by ID
 */
export async function getExecutioner(id: string): Promise<{ data: ExecutionerRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('executioner')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching executioner:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List executioner records with pagination and filters
 */
export async function listExecutioner(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ExecutionerRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('executioner').select('*', { count: 'exact' });
    
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
    console.error('Error listing executioner:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a executioner record
 */
export async function updateExecutioner(id: string, data: ExecutionerUpdate): Promise<{ data: ExecutionerRow | null; error: string | null }> {
  try {
    const validated = ExecutionerUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('executioner')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating executioner:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a executioner record
 */
export async function deleteExecutioner(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('executioner')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting executioner:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


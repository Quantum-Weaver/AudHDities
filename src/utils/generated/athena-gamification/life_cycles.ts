// =====================================================
// FILE: utils/generated/athena-gamification/life_cycles.ts
// GENERATED: 2026-04-15T19:06:11.640Z
// SOURCE: database.types.ts
// =====================================================

import type { LifeCyclesRow, LifeCyclesInsert, LifeCyclesUpdate } from '@/types/generated/athena-gamification/life_cycles';
import { LifeCyclesRowSchema, LifeCyclesInsertSchema, LifeCyclesUpdateSchema } from '@/lib/validators/generated/athena-gamification/life_cycles';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// LifeCycles CRUD OPERATIONS
// =====================================================

/**
 * Create a new life_cycles record
 */
export async function createLifeCycles(data: LifeCyclesInsert): Promise<{ data: LifeCyclesRow | null; error: string | null }> {
  try {
    const validated = LifeCyclesRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('life_cycles')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating life_cycles:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a life_cycles record by ID
 */
export async function getLifeCycles(id: string): Promise<{ data: LifeCyclesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('life_cycles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching life_cycles:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List life_cycles records with pagination and filters
 */
export async function listLifeCycles(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LifeCyclesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('life_cycles').select('*', { count: 'exact' });
    
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
    console.error('Error listing life_cycles:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a life_cycles record
 */
export async function updateLifeCycles(id: string, data: LifeCyclesUpdate): Promise<{ data: LifeCyclesRow | null; error: string | null }> {
  try {
    const validated = LifeCyclesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('life_cycles')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating life_cycles:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a life_cycles record
 */
export async function deleteLifeCycles(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('life_cycles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting life_cycles:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


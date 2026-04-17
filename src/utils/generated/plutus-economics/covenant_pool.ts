// =====================================================
// FILE: utils/generated/plutus-economics/covenant_pool.ts
// GENERATED: 2026-04-17T20:50:06.657Z
// SOURCE: database.types.ts
// =====================================================

import type { CovenantPoolRow, CovenantPoolInsert, CovenantPoolUpdate } from '@/types/generated/plutus-economics/covenant_pool';
import { CovenantPoolRowSchema, CovenantPoolInsertSchema, CovenantPoolUpdateSchema } from '@/lib/validators/generated/plutus-economics/covenant_pool';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// CovenantPool CRUD OPERATIONS
// =====================================================

/**
 * Create a new covenant_pool record
 */
export async function createCovenantPool(data: CovenantPoolInsert): Promise<{ data: CovenantPoolRow | null; error: string | null }> {
  try {
    const validated = CovenantPoolRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('covenant_pool')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating covenant_pool:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a covenant_pool record by ID
 */
export async function getCovenantPool(id: string): Promise<{ data: CovenantPoolRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('covenant_pool')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching covenant_pool:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List covenant_pool records with pagination and filters
 */
export async function listCovenantPool(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CovenantPoolRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('covenant_pool').select('*', { count: 'exact' });
    
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
    console.error('Error listing covenant_pool:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a covenant_pool record
 */
export async function updateCovenantPool(id: string, data: CovenantPoolUpdate): Promise<{ data: CovenantPoolRow | null; error: string | null }> {
  try {
    const validated = CovenantPoolUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('covenant_pool')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating covenant_pool:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a covenant_pool record
 */
export async function deleteCovenantPool(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('covenant_pool')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting covenant_pool:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


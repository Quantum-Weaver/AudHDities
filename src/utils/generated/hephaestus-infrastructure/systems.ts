// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/systems.ts
// GENERATED: 2026-04-13T21:47:21.135Z
// SOURCE: database.types.ts
// =====================================================

import type { SystemsRow, SystemsInsert, SystemsUpdate } from 'src/types/generated/hephaestus-infrastructure/systems.ts';
import { SystemsInsertSchema, SystemsUpdateSchema } from 'src/lib/validators/generated/systems.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// Systems CRUD OPERATIONS
// =====================================================

/**
 * Create a new systems record
 */
export async function createSystems(data: SystemsInsert): Promise<{ data: SystemsRow | null; error: string | null }> {
  try {
    const validated = SystemsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('systems')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating systems:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a systems record by ID
 */
export async function getSystems(id: string): Promise<{ data: SystemsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('systems')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching systems:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List systems records with pagination and filters
 */
export async function listSystems(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SystemsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('systems').select('*', { count: 'exact' });
    
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
    console.error('Error listing systems:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a systems record
 */
export async function updateSystems(id: string, data: SystemsUpdate): Promise<{ data: SystemsRow | null; error: string | null }> {
  try {
    const validated = SystemsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('systems')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating systems:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a systems record
 */
export async function deleteSystems(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('systems')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting systems:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


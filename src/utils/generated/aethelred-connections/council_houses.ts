// =====================================================
// FILE: utils/generated/aethelred-connections/council_houses.ts
// GENERATED: 2026-04-15T18:11:44.453Z
// SOURCE: database.types.ts
// =====================================================

import type { CouncilHousesRow, CouncilHousesInsert, CouncilHousesUpdate } from '@/types/generated/aethelred-connections/council_houses';
import { CouncilHousesRowSchema, CouncilHousesInsertSchema, CouncilHousesUpdateSchema } from '@/lib/validators/generated/aethelred-connections/council_houses';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// CouncilHouses CRUD OPERATIONS
// =====================================================

/**
 * Create a new council_houses record
 */
export async function createCouncilHouses(data: CouncilHousesInsert): Promise<{ data: CouncilHousesRow | null; error: string | null }> {
  try {
    const validated = CouncilHousesRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('council_houses')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating council_houses:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a council_houses record by ID
 */
export async function getCouncilHouses(id: string): Promise<{ data: CouncilHousesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('council_houses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching council_houses:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List council_houses records with pagination and filters
 */
export async function listCouncilHouses(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CouncilHousesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('council_houses').select('*', { count: 'exact' });
    
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
    console.error('Error listing council_houses:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a council_houses record
 */
export async function updateCouncilHouses(id: string, data: CouncilHousesUpdate): Promise<{ data: CouncilHousesRow | null; error: string | null }> {
  try {
    const validated = CouncilHousesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('council_houses')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating council_houses:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a council_houses record
 */
export async function deleteCouncilHouses(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('council_houses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting council_houses:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


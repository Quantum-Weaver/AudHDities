// =====================================================
// FILE: utils/generated/aethelred-connections/aethelred_house.ts
// GENERATED: 2026-04-15T19:06:11.620Z
// SOURCE: database.types.ts
// =====================================================

import type { AethelredHouseRow, AethelredHouseInsert, AethelredHouseUpdate } from '@/types/generated/aethelred-connections/aethelred_house';
import { AethelredHouseRowSchema, AethelredHouseInsertSchema, AethelredHouseUpdateSchema } from '@/lib/validators/generated/aethelred-connections/aethelred_house';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// AethelredHouse CRUD OPERATIONS
// =====================================================

/**
 * Create a new aethelred_house record
 */
export async function createAethelredHouse(data: AethelredHouseInsert): Promise<{ data: AethelredHouseRow | null; error: string | null }> {
  try {
    const validated = AethelredHouseRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('aethelred_house')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating aethelred_house:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a aethelred_house record by ID
 */
export async function getAethelredHouse(id: string): Promise<{ data: AethelredHouseRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('aethelred_house')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching aethelred_house:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List aethelred_house records with pagination and filters
 */
export async function listAethelredHouse(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AethelredHouseRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('aethelred_house').select('*', { count: 'exact' });
    
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
    console.error('Error listing aethelred_house:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a aethelred_house record
 */
export async function updateAethelredHouse(id: string, data: AethelredHouseUpdate): Promise<{ data: AethelredHouseRow | null; error: string | null }> {
  try {
    const validated = AethelredHouseUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('aethelred_house')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating aethelred_house:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a aethelred_house record
 */
export async function deleteAethelredHouse(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('aethelred_house')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting aethelred_house:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


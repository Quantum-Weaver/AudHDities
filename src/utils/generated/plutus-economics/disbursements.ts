// =====================================================
// FILE: utils/generated/plutus-economics/disbursements.ts
// GENERATED: 2026-04-13T21:47:21.122Z
// SOURCE: database.types.ts
// =====================================================

import type { DisbursementsRow, DisbursementsInsert, DisbursementsUpdate } from 'src/types/generated/plutus-economics/disbursements.ts';
import { DisbursementsInsertSchema, DisbursementsUpdateSchema } from 'src/lib/validators/generated/disbursements.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// Disbursements CRUD OPERATIONS
// =====================================================

/**
 * Create a new disbursements record
 */
export async function createDisbursements(data: DisbursementsInsert): Promise<{ data: DisbursementsRow | null; error: string | null }> {
  try {
    const validated = DisbursementsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('disbursements')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating disbursements:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a disbursements record by ID
 */
export async function getDisbursements(id: string): Promise<{ data: DisbursementsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('disbursements')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching disbursements:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List disbursements records with pagination and filters
 */
export async function listDisbursements(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: DisbursementsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('disbursements').select('*', { count: 'exact' });
    
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
    console.error('Error listing disbursements:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a disbursements record
 */
export async function updateDisbursements(id: string, data: DisbursementsUpdate): Promise<{ data: DisbursementsRow | null; error: string | null }> {
  try {
    const validated = DisbursementsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('disbursements')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating disbursements:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a disbursements record
 */
export async function deleteDisbursements(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('disbursements')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting disbursements:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


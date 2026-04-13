// =====================================================
// FILE: utils/generated/plutus-economics/residual_payouts.ts
// GENERATED: 2026-04-13T15:29:51.055Z
// SOURCE: database.types.ts
// =====================================================

import type { ResidualPayoutsRow, ResidualPayoutsInsert, ResidualPayoutsUpdate } from 'src/types/generated/plutus-economics/residual_payouts.ts';
import { ResidualPayoutsInsertSchema, ResidualPayoutsUpdateSchema } from 'src/lib/validators/generated/residual_payouts.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// ResidualPayouts CRUD OPERATIONS
// =====================================================

/**
 * Create a new residual_payouts record
 */
export async function createResidualPayouts(data: ResidualPayoutsInsert): Promise<{ data: ResidualPayoutsRow | null; error: string | null }> {
  try {
    const validated = ResidualPayoutsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('residual_payouts')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating residual_payouts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a residual_payouts record by ID
 */
export async function getResidualPayouts(id: string): Promise<{ data: ResidualPayoutsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('residual_payouts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching residual_payouts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List residual_payouts records with pagination and filters
 */
export async function listResidualPayouts(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ResidualPayoutsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('residual_payouts').select('*', { count: 'exact' });
    
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
    console.error('Error listing residual_payouts:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a residual_payouts record
 */
export async function updateResidualPayouts(id: string, data: ResidualPayoutsUpdate): Promise<{ data: ResidualPayoutsRow | null; error: string | null }> {
  try {
    const validated = ResidualPayoutsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('residual_payouts')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating residual_payouts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a residual_payouts record
 */
export async function deleteResidualPayouts(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('residual_payouts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting residual_payouts:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


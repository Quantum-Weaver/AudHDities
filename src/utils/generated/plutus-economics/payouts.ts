// =====================================================
// FILE: utils/generated/plutus-economics/payouts.ts
// GENERATED: 2026-04-15T19:06:11.645Z
// SOURCE: database.types.ts
// =====================================================

import type { PayoutsRow, PayoutsInsert, PayoutsUpdate } from '@/types/generated/plutus-economics/payouts';
import { PayoutsRowSchema, PayoutsInsertSchema, PayoutsUpdateSchema } from '@/lib/validators/generated/plutus-economics/payouts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Payouts CRUD OPERATIONS
// =====================================================

/**
 * Create a new payouts record
 */
export async function createPayouts(data: PayoutsInsert): Promise<{ data: PayoutsRow | null; error: string | null }> {
  try {
    const validated = PayoutsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('payouts')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating payouts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a payouts record by ID
 */
export async function getPayouts(id: string): Promise<{ data: PayoutsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('payouts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching payouts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List payouts records with pagination and filters
 */
export async function listPayouts(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PayoutsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('payouts').select('*', { count: 'exact' });
    
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
    console.error('Error listing payouts:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a payouts record
 */
export async function updatePayouts(id: string, data: PayoutsUpdate): Promise<{ data: PayoutsRow | null; error: string | null }> {
  try {
    const validated = PayoutsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('payouts')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating payouts:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a payouts record
 */
export async function deletePayouts(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('payouts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting payouts:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


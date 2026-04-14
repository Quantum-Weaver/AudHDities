// =====================================================
// FILE: utils/generated/plutus-economics/advertising.ts
// GENERATED: 2026-04-14T19:39:30.139Z
// SOURCE: database.types.ts
// =====================================================

import type { AdvertisingRow, AdvertisingInsert, AdvertisingUpdate } from '@/types/generated/plutus-economics/advertising.ts';
import { AdvertisingInsertSchema, AdvertisingUpdateSchema } from '@/lib/validators/generated/plutus-economics/advertising.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Advertising CRUD OPERATIONS
// =====================================================

/**
 * Create a new advertising record
 */
export async function createAdvertising(data: AdvertisingInsert): Promise<{ data: AdvertisingRow | null; error: string | null }> {
  try {
    const validated = AdvertisingInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('advertising')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating advertising:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a advertising record by ID
 */
export async function getAdvertising(id: string): Promise<{ data: AdvertisingRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('advertising')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching advertising:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List advertising records with pagination and filters
 */
export async function listAdvertising(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AdvertisingRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('advertising').select('*', { count: 'exact' });
    
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
    console.error('Error listing advertising:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a advertising record
 */
export async function updateAdvertising(id: string, data: AdvertisingUpdate): Promise<{ data: AdvertisingRow | null; error: string | null }> {
  try {
    const validated = AdvertisingUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('advertising')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating advertising:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a advertising record
 */
export async function deleteAdvertising(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('advertising')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting advertising:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


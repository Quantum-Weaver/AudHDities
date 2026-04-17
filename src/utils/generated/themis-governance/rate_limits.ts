// =====================================================
// FILE: utils/generated/themis-governance/rate_limits.ts
// GENERATED: 2026-04-17T22:45:09.964Z
// SOURCE: database.types.ts
// =====================================================

import type { RateLimitsRow, RateLimitsInsert, RateLimitsUpdate } from '@/types/generated/themis-governance/rate_limits';
import { RateLimitsRowSchema, RateLimitsInsertSchema, RateLimitsUpdateSchema } from '@/lib/validators/generated/themis-governance/rate_limits';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// RateLimits CRUD OPERATIONS
// =====================================================

/**
 * Create a new rate_limits record
 */
export async function createRateLimits(data: RateLimitsInsert): Promise<{ data: RateLimitsRow | null; error: string | null }> {
  try {
    const validated = RateLimitsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('rate_limits')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating rate_limits:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a rate_limits record by ID
 */
export async function getRateLimits(id: string): Promise<{ data: RateLimitsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching rate_limits:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List rate_limits records with pagination and filters
 */
export async function listRateLimits(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: RateLimitsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('rate_limits').select('*', { count: 'exact' });
    
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
    console.error('Error listing rate_limits:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a rate_limits record
 */
export async function updateRateLimits(id: string, data: RateLimitsUpdate): Promise<{ data: RateLimitsRow | null; error: string | null }> {
  try {
    const validated = RateLimitsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('rate_limits')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating rate_limits:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a rate_limits record
 */
export async function deleteRateLimits(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('rate_limits')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting rate_limits:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


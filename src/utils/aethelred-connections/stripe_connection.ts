// =====================================================
// FILE: utils/generated/aethelred-connections/stripe_connection.ts
// GENERATED: 2026-04-13T06:13:42.203Z
// SOURCE: database.types.ts
// =====================================================

import type { StripeConnectionRow, StripeConnectionInsert, StripeConnectionUpdate } from 'src/types/aethelred-connections/stripe_connection';
import { StripeConnectionInsertSchema, StripeConnectionUpdateSchema } from 'src/lib/validators/stripe_connection';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// StripeConnection CRUD OPERATIONS
// =====================================================

/**
 * Create a new stripe_connection record
 */
export async function createStripeConnection(data: StripeConnectionInsert): Promise<{ data: StripeConnectionRow | null; error: string | null }> {
  try {
    const validated = StripeConnectionInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('stripe_connection')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating stripe_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a stripe_connection record by ID
 */
export async function getStripeConnection(id: string): Promise<{ data: StripeConnectionRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('stripe_connection')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching stripe_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List stripe_connection records with pagination and filters
 */
export async function listStripeConnection(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: StripeConnectionRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('stripe_connection').select('*', { count: 'exact' });
    
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
    console.error('Error listing stripe_connection:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a stripe_connection record
 */
export async function updateStripeConnection(id: string, data: StripeConnectionUpdate): Promise<{ data: StripeConnectionRow | null; error: string | null }> {
  try {
    const validated = StripeConnectionUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('stripe_connection')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating stripe_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a stripe_connection record
 */
export async function deleteStripeConnection(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('stripe_connection')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting stripe_connection:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


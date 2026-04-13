// =====================================================
// FILE: utils/generated/plutus-economics/subscriptions.ts
// GENERATED: 2026-04-13T06:13:42.203Z
// SOURCE: database.types.ts
// =====================================================

import type { SubscriptionsRow, SubscriptionsInsert, SubscriptionsUpdate } from 'src/types/plutus-economics/subscriptions';
import { SubscriptionsInsertSchema, SubscriptionsUpdateSchema } from 'src/lib/validators/subscriptions';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// Subscriptions CRUD OPERATIONS
// =====================================================

/**
 * Create a new subscriptions record
 */
export async function createSubscriptions(data: SubscriptionsInsert): Promise<{ data: SubscriptionsRow | null; error: string | null }> {
  try {
    const validated = SubscriptionsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('subscriptions')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating subscriptions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a subscriptions record by ID
 */
export async function getSubscriptions(id: string): Promise<{ data: SubscriptionsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List subscriptions records with pagination and filters
 */
export async function listSubscriptions(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SubscriptionsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('subscriptions').select('*', { count: 'exact' });
    
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
    console.error('Error listing subscriptions:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a subscriptions record
 */
export async function updateSubscriptions(id: string, data: SubscriptionsUpdate): Promise<{ data: SubscriptionsRow | null; error: string | null }> {
  try {
    const validated = SubscriptionsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('subscriptions')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating subscriptions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a subscriptions record
 */
export async function deleteSubscriptions(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting subscriptions:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


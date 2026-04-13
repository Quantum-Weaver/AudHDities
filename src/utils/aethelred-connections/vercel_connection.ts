// =====================================================
// FILE: utils/generated/aethelred-connections/vercel_connection.ts
// GENERATED: 2026-04-13T06:13:42.209Z
// SOURCE: database.types.ts
// =====================================================

import type { VercelConnectionRow, VercelConnectionInsert, VercelConnectionUpdate } from '@/types/aethelred-connections/vercel_connection';
import { VercelConnectionInsertSchema, VercelConnectionUpdateSchema } from '@/lib/validators/vercel_connection';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';

// =====================================================
// VercelConnection CRUD OPERATIONS
// =====================================================

/**
 * Create a new vercel_connection record
 */
export async function createVercelConnection(data: VercelConnectionInsert): Promise<{ data: VercelConnectionRow | null; error: string | null }> {
  try {
    const validated = VercelConnectionInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('vercel_connection')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating vercel_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a vercel_connection record by ID
 */
export async function getVercelConnection(id: string): Promise<{ data: VercelConnectionRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('vercel_connection')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching vercel_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List vercel_connection records with pagination and filters
 */
export async function listVercelConnection(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VercelConnectionRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('vercel_connection').select('*', { count: 'exact' });
    
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
    console.error('Error listing vercel_connection:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a vercel_connection record
 */
export async function updateVercelConnection(id: string, data: VercelConnectionUpdate): Promise<{ data: VercelConnectionRow | null; error: string | null }> {
  try {
    const validated = VercelConnectionUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('vercel_connection')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating vercel_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a vercel_connection record
 */
export async function deleteVercelConnection(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('vercel_connection')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting vercel_connection:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


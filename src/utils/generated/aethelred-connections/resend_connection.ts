// =====================================================
// FILE: utils/generated/aethelred-connections/resend_connection.ts
// GENERATED: 2026-04-13T15:29:51.055Z
// SOURCE: database.types.ts
// =====================================================

import type { ResendConnectionRow, ResendConnectionInsert, ResendConnectionUpdate } from 'src/types/generated/aethelred-connections/resend_connection.ts';
import { ResendConnectionInsertSchema, ResendConnectionUpdateSchema } from 'src/lib/validators/generated/resend_connection.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// ResendConnection CRUD OPERATIONS
// =====================================================

/**
 * Create a new resend_connection record
 */
export async function createResendConnection(data: ResendConnectionInsert): Promise<{ data: ResendConnectionRow | null; error: string | null }> {
  try {
    const validated = ResendConnectionInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('resend_connection')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating resend_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a resend_connection record by ID
 */
export async function getResendConnection(id: string): Promise<{ data: ResendConnectionRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('resend_connection')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching resend_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List resend_connection records with pagination and filters
 */
export async function listResendConnection(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ResendConnectionRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('resend_connection').select('*', { count: 'exact' });
    
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
    console.error('Error listing resend_connection:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a resend_connection record
 */
export async function updateResendConnection(id: string, data: ResendConnectionUpdate): Promise<{ data: ResendConnectionRow | null; error: string | null }> {
  try {
    const validated = ResendConnectionUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('resend_connection')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating resend_connection:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a resend_connection record
 */
export async function deleteResendConnection(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('resend_connection')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting resend_connection:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


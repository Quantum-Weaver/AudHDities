// =====================================================
// FILE: utils/generated/hestia-core/profiles.ts
// GENERATED: 2026-04-15T01:41:08.319Z
// SOURCE: database.types.ts
// =====================================================

import type { ProfilesRow, ProfilesInsert, ProfilesUpdate } from '@/types/generated/hestia-core/profiles.ts';
import { ProfilesInsertSchema, ProfilesUpdateSchema } from '@/lib/validators/generated/hestia-core/profiles.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Profiles CRUD OPERATIONS
// =====================================================

/**
 * Create a new profiles record
 */
export async function createProfiles(data: ProfilesInsert): Promise<{ data: ProfilesRow | null; error: string | null }> {
  try {
    const validated = ProfilesInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('profiles')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating profiles:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a profiles record by ID
 */
export async function getProfiles(id: string): Promise<{ data: ProfilesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List profiles records with pagination and filters
 */
export async function listProfiles(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProfilesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('profiles').select('*', { count: 'exact' });
    
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
    console.error('Error listing profiles:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a profiles record
 */
export async function updateProfiles(id: string, data: ProfilesUpdate): Promise<{ data: ProfilesRow | null; error: string | null }> {
  try {
    const validated = ProfilesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('profiles')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating profiles:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a profiles record
 */
export async function deleteProfiles(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting profiles:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


// =====================================================
// FILE: utils/generated/aethelred-connections/audhdities_platform.ts
// GENERATED: 2026-04-15T01:41:08.208Z
// SOURCE: database.types.ts
// =====================================================

import type { AudhditiesPlatformRow, AudhditiesPlatformInsert, AudhditiesPlatformUpdate } from '@/types/generated/aethelred-connections/audhdities_platform.ts';
import { AudhditiesPlatformInsertSchema, AudhditiesPlatformUpdateSchema } from '@/lib/validators/generated/aethelred-connections/audhdities_platform.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// AudhditiesPlatform CRUD OPERATIONS
// =====================================================

/**
 * Create a new audhdities_platform record
 */
export async function createAudhditiesPlatform(data: AudhditiesPlatformInsert): Promise<{ data: AudhditiesPlatformRow | null; error: string | null }> {
  try {
    const validated = AudhditiesPlatformInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('audhdities_platform')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating audhdities_platform:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a audhdities_platform record by ID
 */
export async function getAudhditiesPlatform(id: string): Promise<{ data: AudhditiesPlatformRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('audhdities_platform')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching audhdities_platform:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List audhdities_platform records with pagination and filters
 */
export async function listAudhditiesPlatform(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AudhditiesPlatformRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('audhdities_platform').select('*', { count: 'exact' });
    
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
    console.error('Error listing audhdities_platform:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a audhdities_platform record
 */
export async function updateAudhditiesPlatform(id: string, data: AudhditiesPlatformUpdate): Promise<{ data: AudhditiesPlatformRow | null; error: string | null }> {
  try {
    const validated = AudhditiesPlatformUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('audhdities_platform')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating audhdities_platform:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a audhdities_platform record
 */
export async function deleteAudhditiesPlatform(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('audhdities_platform')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting audhdities_platform:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


// =====================================================
// FILE: utils/generated/aethelred-connections/archivist.ts
// GENERATED: 2026-04-14T19:39:30.142Z
// SOURCE: database.types.ts
// =====================================================

import type { ArchivistRow, ArchivistInsert, ArchivistUpdate } from '@/types/generated/aethelred-connections/archivist.ts';
import { ArchivistInsertSchema, ArchivistUpdateSchema } from '@/lib/validators/generated/aethelred-connections/archivist.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Archivist CRUD OPERATIONS
// =====================================================

/**
 * Create a new archivist record
 */
export async function createArchivist(data: ArchivistInsert): Promise<{ data: ArchivistRow | null; error: string | null }> {
  try {
    const validated = ArchivistInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('archivist')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating archivist:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a archivist record by ID
 */
export async function getArchivist(id: string): Promise<{ data: ArchivistRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('archivist')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching archivist:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List archivist records with pagination and filters
 */
export async function listArchivist(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ArchivistRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('archivist').select('*', { count: 'exact' });
    
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
    console.error('Error listing archivist:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a archivist record
 */
export async function updateArchivist(id: string, data: ArchivistUpdate): Promise<{ data: ArchivistRow | null; error: string | null }> {
  try {
    const validated = ArchivistUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('archivist')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating archivist:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a archivist record
 */
export async function deleteArchivist(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('archivist')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting archivist:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


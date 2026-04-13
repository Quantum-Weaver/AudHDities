// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/file_registry.ts
// GENERATED: 2026-04-13T15:29:51.047Z
// SOURCE: database.types.ts
// =====================================================

import type { FileRegistryRow, FileRegistryInsert, FileRegistryUpdate } from 'src/types/generated/hephaestus-infrastructure/file_registry.ts';
import { FileRegistryInsertSchema, FileRegistryUpdateSchema } from 'src/lib/validators/generated/file_registry.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// FileRegistry CRUD OPERATIONS
// =====================================================

/**
 * Create a new file_registry record
 */
export async function createFileRegistry(data: FileRegistryInsert): Promise<{ data: FileRegistryRow | null; error: string | null }> {
  try {
    const validated = FileRegistryInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('file_registry')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating file_registry:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a file_registry record by ID
 */
export async function getFileRegistry(id: string): Promise<{ data: FileRegistryRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('file_registry')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching file_registry:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List file_registry records with pagination and filters
 */
export async function listFileRegistry(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: FileRegistryRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('file_registry').select('*', { count: 'exact' });
    
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
    console.error('Error listing file_registry:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a file_registry record
 */
export async function updateFileRegistry(id: string, data: FileRegistryUpdate): Promise<{ data: FileRegistryRow | null; error: string | null }> {
  try {
    const validated = FileRegistryUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('file_registry')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating file_registry:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a file_registry record
 */
export async function deleteFileRegistry(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('file_registry')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting file_registry:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


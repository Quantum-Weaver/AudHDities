// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/file_type_standards.ts
// GENERATED: 2026-04-14T19:39:30.156Z
// SOURCE: database.types.ts
// =====================================================

import type { FileTypeStandardsRow, FileTypeStandardsInsert, FileTypeStandardsUpdate } from '@/types/generated/hephaestus-infrastructure/file_type_standards.ts';
import { FileTypeStandardsInsertSchema, FileTypeStandardsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/file_type_standards.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// FileTypeStandards CRUD OPERATIONS
// =====================================================

/**
 * Create a new file_type_standards record
 */
export async function createFileTypeStandards(data: FileTypeStandardsInsert): Promise<{ data: FileTypeStandardsRow | null; error: string | null }> {
  try {
    const validated = FileTypeStandardsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('file_type_standards')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating file_type_standards:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a file_type_standards record by ID
 */
export async function getFileTypeStandards(id: string): Promise<{ data: FileTypeStandardsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('file_type_standards')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching file_type_standards:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List file_type_standards records with pagination and filters
 */
export async function listFileTypeStandards(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: FileTypeStandardsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('file_type_standards').select('*', { count: 'exact' });
    
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
    console.error('Error listing file_type_standards:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a file_type_standards record
 */
export async function updateFileTypeStandards(id: string, data: FileTypeStandardsUpdate): Promise<{ data: FileTypeStandardsRow | null; error: string | null }> {
  try {
    const validated = FileTypeStandardsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('file_type_standards')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating file_type_standards:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a file_type_standards record
 */
export async function deleteFileTypeStandards(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('file_type_standards')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting file_type_standards:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


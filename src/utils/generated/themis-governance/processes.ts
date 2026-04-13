// =====================================================
// FILE: utils/generated/themis-governance/processes.ts
// GENERATED: 2026-04-13T21:47:21.128Z
// SOURCE: database.types.ts
// =====================================================

import type { ProcessesRow, ProcessesInsert, ProcessesUpdate } from 'src/types/generated/themis-governance/processes.ts';
import { ProcessesInsertSchema, ProcessesUpdateSchema } from 'src/lib/validators/generated/processes.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// Processes CRUD OPERATIONS
// =====================================================

/**
 * Create a new processes record
 */
export async function createProcesses(data: ProcessesInsert): Promise<{ data: ProcessesRow | null; error: string | null }> {
  try {
    const validated = ProcessesInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('processes')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating processes:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a processes record by ID
 */
export async function getProcesses(id: string): Promise<{ data: ProcessesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('processes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching processes:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List processes records with pagination and filters
 */
export async function listProcesses(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProcessesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('processes').select('*', { count: 'exact' });
    
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
    console.error('Error listing processes:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a processes record
 */
export async function updateProcesses(id: string, data: ProcessesUpdate): Promise<{ data: ProcessesRow | null; error: string | null }> {
  try {
    const validated = ProcessesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('processes')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating processes:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a processes record
 */
export async function deleteProcesses(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('processes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting processes:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


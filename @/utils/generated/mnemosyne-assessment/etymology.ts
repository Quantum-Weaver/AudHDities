// =====================================================
// FILE: utils/generated/mnemosyne-assessment/etymology.ts
// GENERATED: 2026-04-13T23:49:00.107Z
// SOURCE: database.types.ts
// =====================================================

import type { EtymologyRow, EtymologyInsert, EtymologyUpdate } from '@/types/generated/mnemosyne-assessment/etymology.ts';
import { EtymologyInsertSchema, EtymologyUpdateSchema } from '@/lib/validators/generated/etymology.ts';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from '@/lib/api/auth';

// =====================================================
// Etymology CRUD OPERATIONS
// =====================================================

/**
 * Create a new etymology record
 */
export async function createEtymology(data: EtymologyInsert): Promise<{ data: EtymologyRow | null; error: string | null }> {
  try {
    const validated = EtymologyInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('etymology')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating etymology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a etymology record by ID
 */
export async function getEtymology(id: string): Promise<{ data: EtymologyRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('etymology')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching etymology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List etymology records with pagination and filters
 */
export async function listEtymology(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EtymologyRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('etymology').select('*', { count: 'exact' });
    
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
    console.error('Error listing etymology:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a etymology record
 */
export async function updateEtymology(id: string, data: EtymologyUpdate): Promise<{ data: EtymologyRow | null; error: string | null }> {
  try {
    const validated = EtymologyUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('etymology')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating etymology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a etymology record
 */
export async function deleteEtymology(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('etymology')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting etymology:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


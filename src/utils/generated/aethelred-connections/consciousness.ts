// =====================================================
// FILE: utils/generated/aethelred-connections/consciousness.ts
// GENERATED: 2026-04-14T19:39:30.146Z
// SOURCE: database.types.ts
// =====================================================

import type { ConsciousnessRow, ConsciousnessInsert, ConsciousnessUpdate } from '@/types/generated/aethelred-connections/consciousness.ts';
import { ConsciousnessInsertSchema, ConsciousnessUpdateSchema } from '@/lib/validators/generated/aethelred-connections/consciousness.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Consciousness CRUD OPERATIONS
// =====================================================

/**
 * Create a new consciousness record
 */
export async function createConsciousness(data: ConsciousnessInsert): Promise<{ data: ConsciousnessRow | null; error: string | null }> {
  try {
    const validated = ConsciousnessInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('consciousness')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating consciousness:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a consciousness record by ID
 */
export async function getConsciousness(id: string): Promise<{ data: ConsciousnessRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('consciousness')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching consciousness:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List consciousness records with pagination and filters
 */
export async function listConsciousness(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ConsciousnessRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('consciousness').select('*', { count: 'exact' });
    
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
    console.error('Error listing consciousness:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a consciousness record
 */
export async function updateConsciousness(id: string, data: ConsciousnessUpdate): Promise<{ data: ConsciousnessRow | null; error: string | null }> {
  try {
    const validated = ConsciousnessUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('consciousness')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating consciousness:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a consciousness record
 */
export async function deleteConsciousness(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('consciousness')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting consciousness:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


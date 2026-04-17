// =====================================================
// FILE: utils/generated/mnemosyne-assessment/taxonomy.ts
// GENERATED: 2026-04-17T20:50:06.712Z
// SOURCE: database.types.ts
// =====================================================

import type { TaxonomyRow, TaxonomyInsert, TaxonomyUpdate } from '@/types/generated/mnemosyne-assessment/taxonomy';
import { TaxonomyRowSchema, TaxonomyInsertSchema, TaxonomyUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/taxonomy';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Taxonomy CRUD OPERATIONS
// =====================================================

/**
 * Create a new taxonomy record
 */
export async function createTaxonomy(data: TaxonomyInsert): Promise<{ data: TaxonomyRow | null; error: string | null }> {
  try {
    const validated = TaxonomyRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('taxonomy')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating taxonomy:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a taxonomy record by ID
 */
export async function getTaxonomy(id: string): Promise<{ data: TaxonomyRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('taxonomy')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching taxonomy:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List taxonomy records with pagination and filters
 */
export async function listTaxonomy(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: TaxonomyRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('taxonomy').select('*', { count: 'exact' });
    
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
    console.error('Error listing taxonomy:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a taxonomy record
 */
export async function updateTaxonomy(id: string, data: TaxonomyUpdate): Promise<{ data: TaxonomyRow | null; error: string | null }> {
  try {
    const validated = TaxonomyUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('taxonomy')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating taxonomy:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a taxonomy record
 */
export async function deleteTaxonomy(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('taxonomy')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting taxonomy:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


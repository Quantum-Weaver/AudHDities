// =====================================================
// FILE: utils/generated/mnemosyne-assessment/ontology.ts
// GENERATED: 2026-04-15T18:11:44.468Z
// SOURCE: database.types.ts
// =====================================================

import type { OntologyRow, OntologyInsert, OntologyUpdate } from '@/types/generated/mnemosyne-assessment/ontology';
import { OntologyRowSchema, OntologyInsertSchema, OntologyUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/ontology';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Ontology CRUD OPERATIONS
// =====================================================

/**
 * Create a new ontology record
 */
export async function createOntology(data: OntologyInsert): Promise<{ data: OntologyRow | null; error: string | null }> {
  try {
    const validated = OntologyRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('ontology')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating ontology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a ontology record by ID
 */
export async function getOntology(id: string): Promise<{ data: OntologyRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('ontology')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching ontology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List ontology records with pagination and filters
 */
export async function listOntology(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: OntologyRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('ontology').select('*', { count: 'exact' });
    
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
    console.error('Error listing ontology:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a ontology record
 */
export async function updateOntology(id: string, data: OntologyUpdate): Promise<{ data: OntologyRow | null; error: string | null }> {
  try {
    const validated = OntologyUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('ontology')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating ontology:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a ontology record
 */
export async function deleteOntology(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('ontology')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting ontology:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


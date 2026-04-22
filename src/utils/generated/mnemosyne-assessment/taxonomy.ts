// =====================================================
// UTILITIES: Taxonomy
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-22T05:15:35.827Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { TaxonomyInsertSchema, TaxonomyUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/taxonomy';
import type { TaxonomyInsert, TaxonomyRow, TaxonomyUpdate } from '@/types/generated/mnemosyne-assessment/taxonomy';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new taxonomy record
 */
export async function createTaxonomy(data: TaxonomyInsert): Promise<TaxonomyRow> {
  const validated = TaxonomyInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('taxonomy')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single taxonomy record by ID
 */
export async function getTaxonomy(id: string): Promise<TaxonomyRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('taxonomy')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of taxonomy records with pagination
 */
export async function listTaxonomy(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: TaxonomyRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('taxonomy').select('*', { count: 'exact' });
  
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  
  query = query.order(sort, { ascending: order === 'asc' });
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  if (error) throw error;
  
  return { data: data || [], total: count || 0 };
}

/**
 * Update a taxonomy record
 */
export async function updateTaxonomy(id: string, data: TaxonomyUpdate): Promise<TaxonomyRow> {
  const validated = TaxonomyUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('taxonomy')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a taxonomy record
 */
export async function deleteTaxonomy(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('taxonomy')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// =====================================================
// UTILITIES: Ontology
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T21:42:54.341Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { OntologyInsertSchema, OntologyUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/ontology';
import type { OntologyInsert, OntologyRow, OntologyUpdate } from '@/types/generated/mnemosyne-assessment/ontology';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new ontology record
 */
export async function createOntology(data: OntologyInsert): Promise<OntologyRow> {
  const validated = OntologyInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('ontology')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single ontology record by ID
 */
export async function getOntology(id: string): Promise<OntologyRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ontology')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of ontology records with pagination
 */
export async function listOntology(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: OntologyRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('ontology').select('*', { count: 'exact' });
  
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
 * Update a ontology record
 */
export async function updateOntology(id: string, data: OntologyUpdate): Promise<OntologyRow> {
  const validated = OntologyUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('ontology')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a ontology record
 */
export async function deleteOntology(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('ontology')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

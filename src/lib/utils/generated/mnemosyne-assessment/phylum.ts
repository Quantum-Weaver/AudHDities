// =====================================================
// UTILITIES: Phylum
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:17:11.001Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PhylumInsertSchema, PhylumUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/phylum';
import type { PhylumInsert, PhylumRow, PhylumUpdate } from '@/types/generated/mnemosyne-assessment/phylum';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new phylum record
 */
export async function createPhylum(data: PhylumInsert): Promise<PhylumRow> {
  const validated = PhylumInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('phylum')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single phylum record by ID
 */
export async function getPhylum(id: string): Promise<PhylumRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('phylum')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of phylum records with pagination
 */
export async function listPhylum(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PhylumRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('phylum').select('*', { count: 'exact' });
  
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
 * Update a phylum record
 */
export async function updatePhylum(id: string, data: PhylumUpdate): Promise<PhylumRow> {
  const validated = PhylumUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('phylum')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a phylum record
 */
export async function deletePhylum(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('phylum')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

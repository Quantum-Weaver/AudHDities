// =====================================================
// UTILITIES: Patronage
// DEITY: plutus-economics
// GENERATED: 2026-07-31T01:03:41.424Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PatronageInsertSchema, PatronageUpdateSchema } from '@/lib/validators/generated/plutus-economics/patronage';
import type { PatronageInsert, PatronageRow, PatronageUpdate } from '@/types/generated/plutus-economics/patronage';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new patronage record
 */
export async function createPatronage(data: PatronageInsert): Promise<PatronageRow> {
  const validated = PatronageInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('patronage')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single patronage record by ID
 */
export async function getPatronage(id: string): Promise<PatronageRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('patronage')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of patronage records with pagination
 */
export async function listPatronage(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PatronageRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('patronage').select('*', { count: 'exact' });
  
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
 * Update a patronage record
 */
export async function updatePatronage(id: string, data: PatronageUpdate): Promise<PatronageRow> {
  const validated = PatronageUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('patronage')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a patronage record
 */
export async function deletePatronage(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('patronage')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

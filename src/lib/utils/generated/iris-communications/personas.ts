// =====================================================
// UTILITIES: Personas
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:17:10.996Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PersonasInsertSchema, PersonasUpdateSchema } from '@/lib/validators/generated/iris-communications/personas';
import type { PersonasInsert, PersonasRow, PersonasUpdate } from '@/types/generated/iris-communications/personas';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new personas record
 */
export async function createPersonas(data: PersonasInsert): Promise<PersonasRow> {
  const validated = PersonasInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('personas')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single personas record by ID
 */
export async function getPersonas(id: string): Promise<PersonasRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of personas records with pagination
 */
export async function listPersonas(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PersonasRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('personas').select('*', { count: 'exact' });
  
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
 * Update a personas record
 */
export async function updatePersonas(id: string, data: PersonasUpdate): Promise<PersonasRow> {
  const validated = PersonasUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('personas')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a personas record
 */
export async function deletePersonas(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('personas')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

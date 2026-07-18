// =====================================================
// UTILITIES: Family
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:09:31.185Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { FamilyInsertSchema, FamilyUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/family';
import type { FamilyInsert, FamilyRow, FamilyUpdate } from '@/types/generated/mnemosyne-assessment/family';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new family record
 */
export async function createFamily(data: FamilyInsert): Promise<FamilyRow> {
  const validated = FamilyInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('family')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single family record by ID
 */
export async function getFamily(id: string): Promise<FamilyRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('family')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of family records with pagination
 */
export async function listFamily(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: FamilyRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('family').select('*', { count: 'exact' });
  
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
 * Update a family record
 */
export async function updateFamily(id: string, data: FamilyUpdate): Promise<FamilyRow> {
  const validated = FamilyUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('family')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a family record
 */
export async function deleteFamily(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('family')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

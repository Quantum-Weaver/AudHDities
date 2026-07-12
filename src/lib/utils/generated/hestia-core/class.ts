// =====================================================
// UTILITIES: Class
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.297Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ClassInsertSchema, ClassUpdateSchema } from '@/lib/validators/generated/hestia-core/class';
import type { ClassInsert, ClassRow, ClassUpdate } from '@/types/generated/hestia-core/class';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new class record
 */
export async function createClass(data: ClassInsert): Promise<ClassRow> {
  const validated = ClassInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('class')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single class record by ID
 */
export async function getClass(id: string): Promise<ClassRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('class')
    .select('*')
    .eq('class_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of class records with pagination
 */
export async function listClass(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ClassRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('class').select('*', { count: 'exact' });
  
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
 * Update a class record
 */
export async function updateClass(id: string, data: ClassUpdate): Promise<ClassRow> {
  const validated = ClassUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('class')
    .update(validated)
    .eq('class_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a class record
 */
export async function deleteClass(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('class')
    .delete()
    .eq('class_id', id);
  
  if (error) throw error;
  return true;
}

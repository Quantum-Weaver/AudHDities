// =====================================================
// UTILITIES: Codex
// DEITY: aethelred-connections
// GENERATED: 2026-04-22T18:15:09.677Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CodexInsertSchema, CodexUpdateSchema } from '@/lib/validators/generated/aethelred-connections/codex';
import type { CodexInsert, CodexRow, CodexUpdate } from '@/types/generated/aethelred-connections/codex';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new codex record
 */
export async function createCodex(data: CodexInsert): Promise<CodexRow> {
  const validated = CodexInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('codex')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single codex record by ID
 */
export async function getCodex(id: string): Promise<CodexRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('codex')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of codex records with pagination
 */
export async function listCodex(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CodexRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('codex').select('*', { count: 'exact' });
  
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
 * Update a codex record
 */
export async function updateCodex(id: string, data: CodexUpdate): Promise<CodexRow> {
  const validated = CodexUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('codex')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a codex record
 */
export async function deleteCodex(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('codex')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

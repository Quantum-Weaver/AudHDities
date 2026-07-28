// =====================================================
// UTILITIES: TestPatterns
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-28T05:07:04.582Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { TestPatternsInsertSchema, TestPatternsUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/test_patterns';
import type { TestPatternsInsert, TestPatternsRow, TestPatternsUpdate } from '@/types/generated/mnemosyne-assessment/test_patterns';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new test_patterns record
 */
export async function createTestPatterns(data: TestPatternsInsert): Promise<TestPatternsRow> {
  const validated = TestPatternsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('test_patterns')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single test_patterns record by ID
 */
export async function getTestPatterns(id: string): Promise<TestPatternsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('test_patterns')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of test_patterns records with pagination
 */
export async function listTestPatterns(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: TestPatternsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('test_patterns').select('*', { count: 'exact' });
  
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
 * Update a test_patterns record
 */
export async function updateTestPatterns(id: string, data: TestPatternsUpdate): Promise<TestPatternsRow> {
  const validated = TestPatternsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('test_patterns')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a test_patterns record
 */
export async function deleteTestPatterns(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('test_patterns')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

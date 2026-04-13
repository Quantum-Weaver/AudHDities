// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/scheduling.ts
// GENERATED: 2026-04-13T15:29:51.056Z
// SOURCE: database.types.ts
// =====================================================

import type { SchedulingRow, SchedulingInsert, SchedulingUpdate } from 'src/types/generated/hephaestus-infrastructure/scheduling.ts';
import { SchedulingInsertSchema, SchedulingUpdateSchema } from 'src/lib/validators/generated/scheduling.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// Scheduling CRUD OPERATIONS
// =====================================================

/**
 * Create a new scheduling record
 */
export async function createScheduling(data: SchedulingInsert): Promise<{ data: SchedulingRow | null; error: string | null }> {
  try {
    const validated = SchedulingInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('scheduling')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating scheduling:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a scheduling record by ID
 */
export async function getScheduling(id: string): Promise<{ data: SchedulingRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('scheduling')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching scheduling:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List scheduling records with pagination and filters
 */
export async function listScheduling(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SchedulingRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('scheduling').select('*', { count: 'exact' });
    
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
    console.error('Error listing scheduling:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a scheduling record
 */
export async function updateScheduling(id: string, data: SchedulingUpdate): Promise<{ data: SchedulingRow | null; error: string | null }> {
  try {
    const validated = SchedulingUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('scheduling')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating scheduling:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a scheduling record
 */
export async function deleteScheduling(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('scheduling')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting scheduling:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


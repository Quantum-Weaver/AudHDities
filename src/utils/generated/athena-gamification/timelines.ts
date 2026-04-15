// =====================================================
// FILE: utils/generated/athena-gamification/timelines.ts
// GENERATED: 2026-04-15T19:06:11.668Z
// SOURCE: database.types.ts
// =====================================================

import type { TimelinesRow, TimelinesInsert, TimelinesUpdate } from '@/types/generated/athena-gamification/timelines';
import { TimelinesRowSchema, TimelinesInsertSchema, TimelinesUpdateSchema } from '@/lib/validators/generated/athena-gamification/timelines';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Timelines CRUD OPERATIONS
// =====================================================

/**
 * Create a new timelines record
 */
export async function createTimelines(data: TimelinesInsert): Promise<{ data: TimelinesRow | null; error: string | null }> {
  try {
    const validated = TimelinesRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('timelines')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating timelines:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a timelines record by ID
 */
export async function getTimelines(id: string): Promise<{ data: TimelinesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('timelines')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching timelines:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List timelines records with pagination and filters
 */
export async function listTimelines(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: TimelinesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('timelines').select('*', { count: 'exact' });
    
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
    console.error('Error listing timelines:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a timelines record
 */
export async function updateTimelines(id: string, data: TimelinesUpdate): Promise<{ data: TimelinesRow | null; error: string | null }> {
  try {
    const validated = TimelinesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('timelines')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating timelines:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a timelines record
 */
export async function deleteTimelines(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('timelines')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting timelines:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


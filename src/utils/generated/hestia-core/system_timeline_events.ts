// =====================================================
// FILE: utils/generated/hestia-core/system_timeline_events.ts
// GENERATED: 2026-04-17T17:34:19.909Z
// SOURCE: database.types.ts
// =====================================================

import type { SystemTimelineEventsRow, SystemTimelineEventsInsert, SystemTimelineEventsUpdate } from '@/types/generated/hestia-core/system_timeline_events';
import { SystemTimelineEventsRowSchema, SystemTimelineEventsInsertSchema, SystemTimelineEventsUpdateSchema } from '@/lib/validators/generated/hestia-core/system_timeline_events';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// SystemTimelineEvents CRUD OPERATIONS
// =====================================================

/**
 * Create a new system_timeline_events record
 */
export async function createSystemTimelineEvents(data: SystemTimelineEventsInsert): Promise<{ data: SystemTimelineEventsRow | null; error: string | null }> {
  try {
    const validated = SystemTimelineEventsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('system_timeline_events')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating system_timeline_events:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a system_timeline_events record by ID
 */
export async function getSystemTimelineEvents(id: string): Promise<{ data: SystemTimelineEventsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('system_timeline_events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching system_timeline_events:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List system_timeline_events records with pagination and filters
 */
export async function listSystemTimelineEvents(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SystemTimelineEventsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('system_timeline_events').select('*', { count: 'exact' });
    
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
    console.error('Error listing system_timeline_events:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a system_timeline_events record
 */
export async function updateSystemTimelineEvents(id: string, data: SystemTimelineEventsUpdate): Promise<{ data: SystemTimelineEventsRow | null; error: string | null }> {
  try {
    const validated = SystemTimelineEventsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('system_timeline_events')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating system_timeline_events:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a system_timeline_events record
 */
export async function deleteSystemTimelineEvents(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('system_timeline_events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting system_timeline_events:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


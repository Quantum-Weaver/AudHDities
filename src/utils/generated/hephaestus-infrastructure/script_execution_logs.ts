// =====================================================
// FILE: utils/generated/hephaestus-infrastructure/script_execution_logs.ts
// GENERATED: 2026-04-15T05:16:18.128Z
// SOURCE: database.types.ts
// =====================================================

import type { ScriptExecutionLogsRow, ScriptExecutionLogsInsert, ScriptExecutionLogsUpdate } from '@/types/generated/hephaestus-infrastructure/script_execution_logs.ts';
import { ScriptExecutionLogsInsertSchema, ScriptExecutionLogsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/script_execution_logs.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// ScriptExecutionLogs CRUD OPERATIONS
// =====================================================

/**
 * Create a new script_execution_logs record
 */
export async function createScriptExecutionLogs(data: ScriptExecutionLogsInsert): Promise<{ data: ScriptExecutionLogsRow | null; error: string | null }> {
  try {
    const validated = ScriptExecutionLogsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('script_execution_logs')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating script_execution_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a script_execution_logs record by ID
 */
export async function getScriptExecutionLogs(id: string): Promise<{ data: ScriptExecutionLogsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('script_execution_logs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching script_execution_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List script_execution_logs records with pagination and filters
 */
export async function listScriptExecutionLogs(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ScriptExecutionLogsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('script_execution_logs').select('*', { count: 'exact' });
    
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
    console.error('Error listing script_execution_logs:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a script_execution_logs record
 */
export async function updateScriptExecutionLogs(id: string, data: ScriptExecutionLogsUpdate): Promise<{ data: ScriptExecutionLogsRow | null; error: string | null }> {
  try {
    const validated = ScriptExecutionLogsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('script_execution_logs')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating script_execution_logs:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a script_execution_logs record
 */
export async function deleteScriptExecutionLogs(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('script_execution_logs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting script_execution_logs:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


// =====================================================
// FILE: types/generated/hephaestus-infrastructure/script_execution_logs.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T22:45:09.559Z
// SOURCE: database.types.ts lines 5620-5680
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ScriptExecutionLogsRow = Database['public']['Tables']['script_execution_logs']['Row'];
export type ScriptExecutionLogsInsert = Database['public']['Tables']['script_execution_logs']['Insert'];
export type ScriptExecutionLogsUpdate = Database['public']['Tables']['script_execution_logs']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of script_execution_logs
 */
export interface PublicScriptExecutionLogs {
  completed_at: string | null;
  created_by: string | null;
  error_message: string | null;
  executed_by: string | null;
  id: string;
  output: string | null;
  parameters_used: Json | null;
  script_id: string;
  started_at: string | null;
  status: string | null;
}

/**
 * Form data for script_execution_logs
 * All fields are optional for partial updates
 */
export interface ScriptExecutionLogsFormData {
  completed_at?: string | null;
  created_by?: string | null;
  error_message?: string | null;
  executed_by?: string | null;
  id?: string;
  output?: string | null;
  parameters_used?: Json | null;
  script_id?: string;
  started_at?: string | null;
  status?: string | null;
}

/**
 * Validation result for script_execution_logs
 */
export interface ScriptExecutionLogsValidationResult {
  valid: boolean;
  errors: {
    completed_at?: string;
    created_by?: string;
    error_message?: string;
    executed_by?: string;
    id?: string;
    output?: string;
    parameters_used?: string;
    script_id?: string;
    started_at?: string;
    status?: string;
  };
}


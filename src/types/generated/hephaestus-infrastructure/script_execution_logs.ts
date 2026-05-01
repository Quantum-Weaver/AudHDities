// =====================================================
// FILE: types/generated/hephaestus-infrastructure/script_execution_logs.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-05-01T15:31:59.844Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ScriptExecutionLogsRow = Tables<'script_execution_logs'>;
export type ScriptExecutionLogsInsert = TablesInsert<'script_execution_logs'>;
export type ScriptExecutionLogsUpdate = TablesUpdate<'script_execution_logs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of script_execution_logs
 */
export interface PublicScriptExecutionLogs {
  completed_at: string | null;
  created_at: string;
  created_by: string | null;
  error_message: string | null;
  executed_by: string | null;
  output: string | null;
  parameters_used: Json | null;
  script_execution_logs_id: string;
  script_id: string;
  started_at: string | null;
  status: string | null;
  updated_at: string | null;
}

/**
 * Form data for script_execution_logs
 * All fields are optional for partial updates
 */
export interface ScriptExecutionLogsFormData {
  completed_at?: string | null;
  created_at?: string;
  created_by?: string | null;
  error_message?: string | null;
  executed_by?: string | null;
  output?: string | null;
  parameters_used?: Json | null;
  script_execution_logs_id?: string;
  script_id?: string;
  started_at?: string | null;
  status?: string | null;
  updated_at?: string | null;
}

/**
 * Validation result for script_execution_logs
 */
export interface ScriptExecutionLogsValidationResult {
  valid: boolean;
  errors: {
    completed_at?: string;
    created_at?: string;
    created_by?: string;
    error_message?: string;
    executed_by?: string;
    output?: string;
    parameters_used?: string;
    script_execution_logs_id?: string;
    script_id?: string;
    started_at?: string;
    status?: string;
    updated_at?: string;
  };
}


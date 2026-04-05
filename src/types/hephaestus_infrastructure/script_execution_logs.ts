// =====================================================
// FILE: types/hephaestus_infrastructure/script_execution_logs.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T18:12:44.832Z
// SOURCE: database.types.ts lines 4395-4445
// =====================================================

import type { Database } from '@/types/supabase/database.types';

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
 * Form data for script_execution_logs
 * All fields are optional for partial updates
 */
export interface ScriptExecutionLogsFormData {

}

/**
 * Validation result for script_execution_logs
 */
export interface ScriptExecutionLogsValidationResult {
  valid: boolean;
  errors: {

  };
}


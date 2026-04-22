// =====================================================
// FILE: types/generated/hephaestus-infrastructure/script_execution_logs.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.660Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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


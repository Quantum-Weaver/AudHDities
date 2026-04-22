// =====================================================
// FILE: types/generated/hephaestus-infrastructure/script_execution_logs.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.215Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ScriptExecutionLogsRow = Tables<'script_execution_logs'>;
export type ScriptExecutionLogsInsert = TablesInsert<'script_execution_logs'>;
export type ScriptExecutionLogsUpdate = TablesUpdate<'script_execution_logs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicScriptExecutionLogs = Omit<ScriptExecutionLogsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ScriptExecutionLogsFormData = Partial<ScriptExecutionLogsInsert>;


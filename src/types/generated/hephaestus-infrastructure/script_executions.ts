// =====================================================
// FILE: types/generated/hephaestus-infrastructure/script_executions.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T18:15:38.632Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ScriptExecutionsRow = Tables<'script_executions'>;
export type ScriptExecutionsInsert = TablesInsert<'script_executions'>;
export type ScriptExecutionsUpdate = TablesUpdate<'script_executions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of script_executions
 */
export interface PublicScriptExecutions {
  completed_at: string | null;
  created_at: string;
  duration_ms: number | null;
  executed_by: string | null;
  id: string;
  parameters: Json | null;
  result: Json | null;
  script_id: string | null;
  started_at: string;
  status: string;
}

/**
 * Form data for script_executions
 * All fields are optional for partial updates
 */
export interface ScriptExecutionsFormData {
  completed_at?: string | null;
  created_at?: string;
  duration_ms?: number | null;
  executed_by?: string | null;
  id?: string;
  parameters?: Json | null;
  result?: Json | null;
  script_id?: string | null;
  started_at?: string;
  status?: string;
}

/**
 * Validation result for script_executions
 */
export interface ScriptExecutionsValidationResult {
  valid: boolean;
  errors: {
    completed_at?: string;
    created_at?: string;
    duration_ms?: string;
    executed_by?: string;
    id?: string;
    parameters?: string;
    result?: string;
    script_id?: string;
    started_at?: string;
    status?: string;
  };
}


// =====================================================
// FILE: types/generated/themis-governance/processes.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-04-23T02:14:53.169Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EscalationTarget = Enums<'escalation_target'>;
export type ProcessType = Enums<'process_type'>;

export type ProcessesRow = Tables<'processes'>;
export type ProcessesInsert = TablesInsert<'processes'>;
export type ProcessesUpdate = TablesUpdate<'processes'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of processes
 */
export interface PublicProcesses {
  created_at: string | null;
  created_by: string;
  description: string | null;
  escalation_target:;
  id: string;
  is_active: boolean | null;
  name: string;
  process_type: ProcessType;
  slug: string;
  steps: Json;
  timeout_days: number | null;
  updated_at: string | null;
}

/**
 * Form data for processes
 * All fields are optional for partial updates
 */
export interface ProcessesFormData {
  created_at?: string | null;
  created_by?: string;
  description?: string | null;
  id?: string;
  is_active?: boolean | null;
  name?: string;
  process_type?: ProcessType;
  slug?: string;
  steps?: Json;
  timeout_days?: number | null;
  updated_at?: string | null;
}

/**
 * Validation result for processes
 */
export interface ProcessesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    escalation_target?: string;
    id?: string;
    is_active?: string;
    name?: string;
    process_type?: string;
    slug?: string;
    steps?: string;
    timeout_days?: string;
    updated_at?: string;
  };
}


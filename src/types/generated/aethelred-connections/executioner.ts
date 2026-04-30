// =====================================================
// FILE: types/generated/aethelred-connections/executioner.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T00:26:45.962Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ExecutionerRow = Tables<'executioner'>;
export type ExecutionerInsert = TablesInsert<'executioner'>;
export type ExecutionerUpdate = TablesUpdate<'executioner'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of executioner
 */
export interface PublicExecutioner {
  appeal_queue: Json | null;
  banned_users: string[] | null;
  boundary_violations: Json | null;
  created_at: string | null;
  created_by: string | null;
  execution_count: number | null;
  id: string;
  justice_log: Json | null;
  suspended_users: string[] | null;
  updated_at: string | null;
}

/**
 * Form data for executioner
 * All fields are optional for partial updates
 */
export interface ExecutionerFormData {
  appeal_queue?: Json | null;
  banned_users?: string[] | null;
  boundary_violations?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  execution_count?: number | null;
  id?: string;
  justice_log?: Json | null;
  suspended_users?: string[] | null;
  updated_at?: string | null;
}

/**
 * Validation result for executioner
 */
export interface ExecutionerValidationResult {
  valid: boolean;
  errors: {
    appeal_queue?: string;
    banned_users?: string;
    boundary_violations?: string;
    created_at?: string;
    created_by?: string;
    execution_count?: string;
    id?: string;
    justice_log?: string;
    suspended_users?: string;
    updated_at?: string;
  };
}


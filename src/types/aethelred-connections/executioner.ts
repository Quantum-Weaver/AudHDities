// =====================================================
// FILE: types/generated/aethelred-connections/executioner.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.733Z
// SOURCE: database.types.ts lines 2294-2347
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

import type { Json } from 'src/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ExecutionerRow = Database['public']['Tables']['executioner']['Row'];
export type ExecutionerInsert = Database['public']['Tables']['executioner']['Insert'];
export type ExecutionerUpdate = Database['public']['Tables']['executioner']['Update'];

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


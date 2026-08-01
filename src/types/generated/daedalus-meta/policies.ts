// =====================================================
// FILE: types/generated/daedalus-meta/policies.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T18:15:38.619Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type PoliciesRow = Tables<'policies'>;
export type PoliciesInsert = TablesInsert<'policies'>;
export type PoliciesUpdate = TablesUpdate<'policies'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of policies
 */
export interface PublicPolicies {
  archived_at: string | null;
  cmd: string;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  last_seen_at: string | null;
  log: Json;
  policy_name: string;
  qual: string | null;
  table_name: string;
  updated_at: string;
  updated_by: string | null;
  with_check: string | null;
}

/**
 * Form data for policies
 * All fields are optional for partial updates
 */
export interface PoliciesFormData {
  archived_at?: string | null;
  cmd?: string;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  last_seen_at?: string | null;
  log?: Json;
  policy_name?: string;
  qual?: string | null;
  table_name?: string;
  updated_at?: string;
  updated_by?: string | null;
  with_check?: string | null;
}

/**
 * Validation result for policies
 */
export interface PoliciesValidationResult {
  valid: boolean;
  errors: {
    archived_at?: string;
    cmd?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    last_seen_at?: string;
    log?: string;
    policy_name?: string;
    qual?: string;
    table_name?: string;
    updated_at?: string;
    updated_by?: string;
    with_check?: string;
  };
}


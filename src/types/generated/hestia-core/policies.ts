// =====================================================
// FILE: types/generated/hestia-core/policies.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-29T16:16:53.924Z
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
  cmd: string;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
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
  cmd?: string;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
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
    cmd?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    log?: string;
    policy_name?: string;
    qual?: string;
    table_name?: string;
    updated_at?: string;
    updated_by?: string;
    with_check?: string;
  };
}


// =====================================================
// FILE: types/generated/themis-governance/rate_limits.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-04-30T04:17:48.033Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type RateLimitsRow = Tables<'rate_limits'>;
export type RateLimitsInsert = TablesInsert<'rate_limits'>;
export type RateLimitsUpdate = TablesUpdate<'rate_limits'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of rate_limits
 */
export interface PublicRateLimits {
  created_at: string | null;
  created_by: string | null;
  endpoint: string;
  identifier: string;
  rate_limits_id: string;
  request_count: number | null;
  updated_at: string | null;
  window_start: string | null;
}

/**
 * Form data for rate_limits
 * All fields are optional for partial updates
 */
export interface RateLimitsFormData {
  created_at?: string | null;
  created_by?: string | null;
  endpoint?: string;
  identifier?: string;
  rate_limits_id?: string;
  request_count?: number | null;
  updated_at?: string | null;
  window_start?: string | null;
}

/**
 * Validation result for rate_limits
 */
export interface RateLimitsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    endpoint?: string;
    identifier?: string;
    rate_limits_id?: string;
    request_count?: string;
    updated_at?: string;
    window_start?: string;
  };
}


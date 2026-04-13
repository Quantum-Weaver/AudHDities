// =====================================================
// FILE: types/generated/themis-governance/rate_limits.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T06:13:41.747Z
// SOURCE: database.types.ts lines 4593-4630
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type RateLimitsRow = Database['public']['Tables']['rate_limits']['Row'];
export type RateLimitsInsert = Database['public']['Tables']['rate_limits']['Insert'];
export type RateLimitsUpdate = Database['public']['Tables']['rate_limits']['Update'];

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
  id: string;
  identifier: string;
  request_count: number | null;
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
  id?: string;
  identifier?: string;
  request_count?: number | null;
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
    id?: string;
    identifier?: string;
    request_count?: string;
    window_start?: string;
  };
}


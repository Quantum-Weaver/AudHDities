// =====================================================
// FILE: types/generated/themis-governance/rate_limits.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.661Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

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


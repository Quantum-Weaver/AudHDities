// =====================================================
// FILE: types/generated/themis-governance/rate_limits.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-07-18T23:17:11.043Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  action_on_exceed: string;
  cooldown_seconds: number;
  created_at: string;
  created_by: string | null;
  description: string | null;
  endpoint_type: string;
  id: string;
  is_enabled: boolean;
  max_requests: number;
  name: string;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
  window_seconds: number;
}

/**
 * Form data for rate_limits
 * All fields are optional for partial updates
 */
export interface RateLimitsFormData {
  action_on_exceed?: string;
  cooldown_seconds?: number;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  endpoint_type?: string;
  id?: string;
  is_enabled?: boolean;
  max_requests?: number;
  name?: string;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
  window_seconds?: number;
}

/**
 * Validation result for rate_limits
 */
export interface RateLimitsValidationResult {
  valid: boolean;
  errors: {
    action_on_exceed?: string;
    cooldown_seconds?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    endpoint_type?: string;
    id?: string;
    is_enabled?: string;
    max_requests?: string;
    name?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    window_seconds?: string;
  };
}


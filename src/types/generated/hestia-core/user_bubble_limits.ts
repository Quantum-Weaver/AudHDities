// =====================================================
// FILE: types/generated/hestia-core/user_bubble_limits.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-29T20:53:53.564Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type UserBubbleLimitsRow = Tables<'user_bubble_limits'>;
export type UserBubbleLimitsInsert = TablesInsert<'user_bubble_limits'>;
export type UserBubbleLimitsUpdate = TablesUpdate<'user_bubble_limits'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of user_bubble_limits
 */
export interface PublicUserBubbleLimits {
  created_at: string;
  created_by: string | null;
  daily_points: number | null;
  hourly_pops: number | null;
  last_pop_at: string | null;
  reset_date: string | null;
  user_id: string;
}

/**
 * Form data for user_bubble_limits
 * All fields are optional for partial updates
 */
export interface UserBubbleLimitsFormData {
  created_at?: string;
  created_by?: string | null;
  daily_points?: number | null;
  hourly_pops?: number | null;
  last_pop_at?: string | null;
  reset_date?: string | null;
  user_id?: string;
}

/**
 * Validation result for user_bubble_limits
 */
export interface UserBubbleLimitsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    daily_points?: string;
    hourly_pops?: string;
    last_pop_at?: string;
    reset_date?: string;
    user_id?: string;
  };
}


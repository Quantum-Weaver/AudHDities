// =====================================================
// FILE: types/generated/hestia-core/user_bubble_pops.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T04:17:48.460Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type UserBubblePopsRow = Tables<'user_bubble_pops'>;
export type UserBubblePopsInsert = TablesInsert<'user_bubble_pops'>;
export type UserBubblePopsUpdate = TablesUpdate<'user_bubble_pops'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of user_bubble_pops
 */
export interface PublicUserBubblePops {
  bubble_id: string;
  created_at: string;
  created_by: string | null;
  environment: string | null;
  points_awarded: number;
  popped_at: string | null;
  updated_at: string | null;
  user_bubble_pops_id: string;
  user_id: string;
}

/**
 * Form data for user_bubble_pops
 * All fields are optional for partial updates
 */
export interface UserBubblePopsFormData {
  bubble_id?: string;
  created_at?: string;
  created_by?: string | null;
  environment?: string | null;
  points_awarded?: number;
  popped_at?: string | null;
  updated_at?: string | null;
  user_bubble_pops_id?: string;
  user_id?: string;
}

/**
 * Validation result for user_bubble_pops
 */
export interface UserBubblePopsValidationResult {
  valid: boolean;
  errors: {
    bubble_id?: string;
    created_at?: string;
    created_by?: string;
    environment?: string;
    points_awarded?: string;
    popped_at?: string;
    updated_at?: string;
    user_bubble_pops_id?: string;
    user_id?: string;
  };
}


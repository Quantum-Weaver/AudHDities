// =====================================================
// FILE: types/generated/hermes-social/emeralds.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-05-01T15:31:59.570Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EmeraldStatus = Enums<'emerald_status'>;

export type EmeraldsRow = Tables<'emeralds'>;
export type EmeraldsInsert = TablesInsert<'emeralds'>;
export type EmeraldsUpdate = TablesUpdate<'emeralds'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of emeralds
 */
export interface PublicEmeralds {
  amount: number;
  comment_id: string | null;
  created_at: string | null;
  created_by: string | null;
  emeralds_id: string;
  giver_id: string;
  is_residual_eligible: boolean | null;
  message: string | null;
  post_id: string | null;
  receiver_id: string;
  reply_id: string | null;
  status: EmeraldStatus | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for emeralds
 * All fields are optional for partial updates
 */
export interface EmeraldsFormData {
  amount?: number;
  comment_id?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  emeralds_id?: string;
  giver_id?: string;
  is_residual_eligible?: boolean | null;
  message?: string | null;
  post_id?: string | null;
  receiver_id?: string;
  reply_id?: string | null;
  status?: EmeraldStatus | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for emeralds
 */
export interface EmeraldsValidationResult {
  valid: boolean;
  errors: {
    amount?: string;
    comment_id?: string;
    created_at?: string;
    created_by?: string;
    emeralds_id?: string;
    giver_id?: string;
    is_residual_eligible?: string;
    message?: string;
    post_id?: string;
    receiver_id?: string;
    reply_id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}


// =====================================================
// FILE: types/generated/hermes-social/emeralds.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T18:11:44.198Z
// SOURCE: database.types.ts lines 2120-2214
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EmeraldStatus = Database['public']['Enums']['emerald_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type EmeraldsRow = Database['public']['Tables']['emeralds']['Row'];
export type EmeraldsInsert = Database['public']['Tables']['emeralds']['Insert'];
export type EmeraldsUpdate = Database['public']['Tables']['emeralds']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of emeralds
 */
export interface PublicEmeralds {
  amount: number;
  comment_id: string | null;
  "created_at": "string | null";
  created_by: string | null;
  giver_id: string;
  id: string;
  is_residual_eligible: boolean | null;
  message: string | null;
  post_id: string | null;
  receiver_id: string;
  reply_id: string | null;
  status: EmeraldStatus | null;
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
  giver_id?: string;
  id?: string;
  is_residual_eligible?: boolean | null;
  message?: string | null;
  post_id?: string | null;
  receiver_id?: string;
  reply_id?: string | null;
  status?: EmeraldStatus | null;
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
    giver_id?: string;
    id?: string;
    is_residual_eligible?: string;
    message?: string;
    post_id?: string;
    receiver_id?: string;
    reply_id?: string;
    status?: string;
  };
}


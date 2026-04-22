// =====================================================
// FILE: types/generated/hermes-social/emeralds.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.861Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EmeraldStatus = Database['public']['Enums']['emerald_status'];
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


// =====================================================
// FILE: types/generated/plutus-economics/gifts.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-08-01T17:49:54.573Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type GiftsRow = Tables<'gifts'>;
export type GiftsInsert = TablesInsert<'gifts'>;
export type GiftsUpdate = TablesUpdate<'gifts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of gifts
 */
export interface PublicGifts {
  created_at: string;
  created_by: string | null;
  gift_type: string | null;
  id: string;
  is_anonymous: boolean;
  message: string | null;
  opened_at: string | null;
  recipient_id: string;
  reference_id: string | null;
  sender_id: string;
  status: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for gifts
 * All fields are optional for partial updates
 */
export interface GiftsFormData {
  created_at?: string;
  created_by?: string | null;
  gift_type?: string | null;
  id?: string;
  is_anonymous?: boolean;
  message?: string | null;
  opened_at?: string | null;
  recipient_id?: string;
  reference_id?: string | null;
  sender_id?: string;
  status?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for gifts
 */
export interface GiftsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    gift_type?: string;
    id?: string;
    is_anonymous?: string;
    message?: string;
    opened_at?: string;
    recipient_id?: string;
    reference_id?: string;
    sender_id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}


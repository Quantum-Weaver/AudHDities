// =====================================================
// FILE: types/generated/hestia-core/user_private.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-23T02:14:53.781Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type UserPrivateRow = Tables<'user_private'>;
export type UserPrivateInsert = TablesInsert<'user_private'>;
export type UserPrivateUpdate = TablesUpdate<'user_private'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of user_private
 */
export interface PublicUserPrivate {
  address: Json | null;
  created_at: string | null;
  created_by: string | null;
  crisis_plan: string | null;
  date_of_birth: string | null;
  emergency_contact: Json | null;
  government_id: string | null;
  id: string;
  legal_name: string | null;
  notes: string | null;
  phone_number: string | null;
  updated_at: string | null;
}

/**
 * Form data for user_private
 * All fields are optional for partial updates
 */
export interface UserPrivateFormData {
  address?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  crisis_plan?: string | null;
  date_of_birth?: string | null;
  emergency_contact?: Json | null;
  government_id?: string | null;
  id?: string;
  legal_name?: string | null;
  notes?: string | null;
  phone_number?: string | null;
  updated_at?: string | null;
}

/**
 * Validation result for user_private
 */
export interface UserPrivateValidationResult {
  valid: boolean;
  errors: {
    address?: string;
    created_at?: string;
    created_by?: string;
    crisis_plan?: string;
    date_of_birth?: string;
    emergency_contact?: string;
    government_id?: string;
    id?: string;
    legal_name?: string;
    notes?: string;
    phone_number?: string;
    updated_at?: string;
  };
}


// =====================================================
// FILE: types/hestia_core/user_private.ts
// HANDLING: full_crud
// DEITY: hestia_core
// GENERATED: 2026-04-05T21:55:13.120Z
// SOURCE: database.types.ts lines 5392-5441
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type UserPrivateRow = Database['public']['Tables']['user_private']['Row'];
export type UserPrivateInsert = Database['public']['Tables']['user_private']['Insert'];
export type UserPrivateUpdate = Database['public']['Tables']['user_private']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of user_private
 */
export interface PublicUserPrivate {
  address: Json | null;
  created_at: string | null;
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


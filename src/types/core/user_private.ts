// =====================================================
/* @/types/core/user_private.ts */
// USER PRIVATE - Pure Type Definitions
// Sensitive data - encrypted at rest
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE UserPrivate TYPES
// =====================================================

export type UserPrivateRow = Database['public']['Tables']['user_private']['Row'];
export type UserPrivateInsert = Database['public']['Tables']['user_private']['Insert'];
export type UserPrivateUpdate = Database['public']['Tables']['user_private']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

export interface UserPrivate {
  id: string;
  legal_name: string | null;
  date_of_birth: string | null;
  phone_number: string | null;
  address: Json | null;
  government_id: string | null;
  emergency_contact: Json | null;
  crisis_plan: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface UserPrivateFormData {
  legal_name?: string | null;
  date_of_birth?: string | null;
  phone_number?: string | null;
  address?: Json | null;
  emergency_contact?: Json | null;
  crisis_plan?: string | null;
}

export interface UserPrivateValidationResult {
  valid: boolean;
  errors: {
    legal_name?: string;
    phone_number?: string;
  };
}
// =====================================================
// FILE: types/generated/hestia-core/user_private.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:20.104Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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


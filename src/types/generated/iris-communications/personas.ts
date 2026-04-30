// =====================================================
// FILE: types/generated/iris-communications/personas.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-30T00:26:46.225Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type PersonasRow = Tables<'personas'>;
export type PersonasInsert = TablesInsert<'personas'>;
export type PersonasUpdate = TablesUpdate<'personas'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of personas
 */
export interface PublicPersonas {
  avatar_url: string | null;
  characteristics: Json | null;
  color: string | null;
  created_at: string | null;
  created_by: string;
  description: string;
  id: string;
  is_active: boolean | null;
  name: string;
  slug: string;
  updated_at: string | null;
}

/**
 * Form data for personas
 * All fields are optional for partial updates
 */
export interface PersonasFormData {
  avatar_url?: string | null;
  characteristics?: Json | null;
  color?: string | null;
  created_at?: string | null;
  created_by?: string;
  description?: string;
  id?: string;
  is_active?: boolean | null;
  name?: string;
  slug?: string;
  updated_at?: string | null;
}

/**
 * Validation result for personas
 */
export interface PersonasValidationResult {
  valid: boolean;
  errors: {
    avatar_url?: string;
    characteristics?: string;
    color?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    name?: string;
    slug?: string;
    updated_at?: string;
  };
}


// =====================================================
// FILE: types/generated/iris-communications/personas.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T17:34:19.693Z
// SOURCE: database.types.ts lines 3802-3851
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type PersonasRow = Database['public']['Tables']['personas']['Row'];
export type PersonasInsert = Database['public']['Tables']['personas']['Insert'];
export type PersonasUpdate = Database['public']['Tables']['personas']['Update'];

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


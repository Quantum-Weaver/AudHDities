// =====================================================
// FILE: types/generated/iris-communications/personas.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.262Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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


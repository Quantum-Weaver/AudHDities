// =====================================================
// FILE: types/generated/daedalus-meta/composite_types.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T17:46:58.396Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type CompositeTypesRow = Tables<'composite_types'>;
export type CompositeTypesInsert = TablesInsert<'composite_types'>;
export type CompositeTypesUpdate = TablesUpdate<'composite_types'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of composite_types
 */
export interface PublicCompositeTypes {
  archived_at: string | null;
  attributes: Json | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  last_seen_at: string | null;
  log: Json;
  name: string;
  updated_at: string;
  updated_by: string | null;
  used_by: Json | null;
}

/**
 * Form data for composite_types
 * All fields are optional for partial updates
 */
export interface CompositeTypesFormData {
  archived_at?: string | null;
  attributes?: Json | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  last_seen_at?: string | null;
  log?: Json;
  name?: string;
  updated_at?: string;
  updated_by?: string | null;
  used_by?: Json | null;
}

/**
 * Validation result for composite_types
 */
export interface CompositeTypesValidationResult {
  valid: boolean;
  errors: {
    archived_at?: string;
    attributes?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    last_seen_at?: string;
    log?: string;
    name?: string;
    updated_at?: string;
    updated_by?: string;
    used_by?: string;
  };
}


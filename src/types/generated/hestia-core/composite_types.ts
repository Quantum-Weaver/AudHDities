// =====================================================
// FILE: types/generated/hestia-core/composite_types.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-31T01:03:40.971Z
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
  attributes: Json | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
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
  attributes?: Json | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
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
    attributes?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    log?: string;
    name?: string;
    updated_at?: string;
    updated_by?: string;
    used_by?: string;
  };
}


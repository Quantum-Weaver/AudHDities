// =====================================================
// FILE: types/generated/hestia-core/enums.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-31T00:35:01.367Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type EnumsRow = Tables<'enums'>;
export type EnumsInsert = TablesInsert<'enums'>;
export type EnumsUpdate = TablesUpdate<'enums'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of enums
 */
export interface PublicEnums {
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  labels: Json | null;
  log: Json;
  name: string;
  updated_at: string;
  updated_by: string | null;
  used_by: Json | null;
}

/**
 * Form data for enums
 * All fields are optional for partial updates
 */
export interface EnumsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  labels?: Json | null;
  log?: Json;
  name?: string;
  updated_at?: string;
  updated_by?: string | null;
  used_by?: Json | null;
}

/**
 * Validation result for enums
 */
export interface EnumsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    labels?: string;
    log?: string;
    name?: string;
    updated_at?: string;
    updated_by?: string;
    used_by?: string;
  };
}


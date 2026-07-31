// =====================================================
// FILE: types/generated/hestia-core/functions.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-31T00:35:01.406Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type FunctionsRow = Tables<'functions'>;
export type FunctionsInsert = TablesInsert<'functions'>;
export type FunctionsUpdate = TablesUpdate<'functions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of functions
 */
export interface PublicFunctions {
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  language: string | null;
  log: Json;
  name: string;
  purpose: string | null;
  signature: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for functions
 * All fields are optional for partial updates
 */
export interface FunctionsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  language?: string | null;
  log?: Json;
  name?: string;
  purpose?: string | null;
  signature?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for functions
 */
export interface FunctionsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    language?: string;
    log?: string;
    name?: string;
    purpose?: string;
    signature?: string;
    updated_at?: string;
    updated_by?: string;
  };
}


// =====================================================
// FILE: types/generated/daedalus-meta/functions.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T21:41:40.265Z
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
  archived_at: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  language: string | null;
  last_seen_at: string | null;
  log: Json;
  name: string;
  purpose: string | null;
  returns: string | null;
  signature: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for functions
 * All fields are optional for partial updates
 */
export interface FunctionsFormData {
  archived_at?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  language?: string | null;
  last_seen_at?: string | null;
  log?: Json;
  name?: string;
  purpose?: string | null;
  returns?: string | null;
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
    archived_at?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    language?: string;
    last_seen_at?: string;
    log?: string;
    name?: string;
    purpose?: string;
    returns?: string;
    signature?: string;
    updated_at?: string;
    updated_by?: string;
  };
}


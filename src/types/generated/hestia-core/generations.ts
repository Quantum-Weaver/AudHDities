// =====================================================
// FILE: types/generated/hestia-core/generations.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.457Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type GenerationsRow = Tables<'generations'>;
export type GenerationsInsert = TablesInsert<'generations'>;
export type GenerationsUpdate = TablesUpdate<'generations'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of generations
 */
export interface PublicGenerations {
  completed_at: string | null;
  created_at: string;
  duration_ms: number | null;
  errors: Json | null;
  files_generated: string[] | null;
  id: string;
  script_id: string | null;
  started_at: string;
  status: string;
  summary: string | null;
  table_name: string | null;
}

/**
 * Form data for generations
 * All fields are optional for partial updates
 */
export interface GenerationsFormData {
  completed_at?: string | null;
  created_at?: string;
  duration_ms?: number | null;
  errors?: Json | null;
  files_generated?: string[] | null;
  id?: string;
  script_id?: string | null;
  started_at?: string;
  status?: string;
  summary?: string | null;
  table_name?: string | null;
}

/**
 * Validation result for generations
 */
export interface GenerationsValidationResult {
  valid: boolean;
  errors: {
    completed_at?: string;
    created_at?: string;
    duration_ms?: string;
    errors?: string;
    files_generated?: string;
    id?: string;
    script_id?: string;
    started_at?: string;
    status?: string;
    summary?: string;
    table_name?: string;
  };
}


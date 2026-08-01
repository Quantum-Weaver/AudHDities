// =====================================================
// FILE: types/generated/plutus-economics/patronage.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-08-01T18:15:38.615Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type PatronageRow = Tables<'patronage'>;
export type PatronageInsert = TablesInsert<'patronage'>;
export type PatronageUpdate = TablesUpdate<'patronage'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of patronage
 */
export interface PublicPatronage {
  artisan_id: string;
  created_at: string;
  id: string;
  notes: string | null;
  patron_id: string;
  started_at: string;
  tier: string | null;
  updated_at: string;
}

/**
 * Form data for patronage
 * All fields are optional for partial updates
 */
export interface PatronageFormData {
  artisan_id?: string;
  created_at?: string;
  id?: string;
  notes?: string | null;
  patron_id?: string;
  started_at?: string;
  tier?: string | null;
  updated_at?: string;
}

/**
 * Validation result for patronage
 */
export interface PatronageValidationResult {
  valid: boolean;
  errors: {
    artisan_id?: string;
    created_at?: string;
    id?: string;
    notes?: string;
    patron_id?: string;
    started_at?: string;
    tier?: string;
    updated_at?: string;
  };
}


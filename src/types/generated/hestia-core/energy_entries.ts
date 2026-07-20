// =====================================================
// FILE: types/generated/hestia-core/energy_entries.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-20T04:39:10.490Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type EnergyEntriesRow = Tables<'energy_entries'>;
export type EnergyEntriesInsert = TablesInsert<'energy_entries'>;
export type EnergyEntriesUpdate = TablesUpdate<'energy_entries'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of energy_entries
 */
export interface PublicEnergyEntries {
  created_at: string;
  created_by: string;
  energy_level: number | null;
  id: string;
  logged_at: string;
  mood: string | null;
  mood_tags: string[] | null;
  notes: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
  visibility: string;
}

/**
 * Form data for energy_entries
 * All fields are optional for partial updates
 */
export interface EnergyEntriesFormData {
  created_at?: string;
  created_by?: string;
  energy_level?: number | null;
  id?: string;
  logged_at?: string;
  mood?: string | null;
  mood_tags?: string[] | null;
  notes?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
  visibility?: string;
}

/**
 * Validation result for energy_entries
 */
export interface EnergyEntriesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    energy_level?: string;
    id?: string;
    logged_at?: string;
    mood?: string;
    mood_tags?: string;
    notes?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    visibility?: string;
  };
}


// =====================================================
// FILE: types/generated/iris-communications/continents.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:09:31.108Z
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

export type ContinentsRow = Tables<'continents'>;
export type ContinentsInsert = TablesInsert<'continents'>;
export type ContinentsUpdate = TablesUpdate<'continents'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of continents
 */
export interface PublicContinents {
  code: string | null;
  created_at: string;
  created_by: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  name: string;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for continents
 * All fields are optional for partial updates
 */
export interface ContinentsFormData {
  code?: string | null;
  created_at?: string;
  created_by?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  name?: string;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for continents
 */
export interface ContinentsValidationResult {
  valid: boolean;
  errors: {
    code?: string;
    created_at?: string;
    created_by?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

